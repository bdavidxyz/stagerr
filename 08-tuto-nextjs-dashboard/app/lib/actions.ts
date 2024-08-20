'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; // vider le cache et déclencher une nouvelle requête au serveur. Peu être fait avec la revalidatePathfonction de Next.js
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// 1. Extraction des données de formData.
// 2. Validation des types avec Zod.
// 3. Conversion du montant en cents.
// 4. Passer les variables à votre requête SQL.
// 5. Appel revalidatePathpour vider le cache client et effectuer une nouvelle demande serveur.
// 6. Appel redirectpour rediriger l'utilisateur vers la page de la facture.

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

// customerId - Zod génère déjà une erreur si le champ client est vide car il attend un type string. Mais ajoutons un message convivial si l'utilisateur ne sélectionne pas de client.
// amount- Étant donné que vous forcez le type de montant de stringà number, il sera par défaut égal à zéro si la chaîne est vide. Disons à Zod que nous voulons toujours que le montant soit supérieur à 0 avec la .gt()fonction.
// status - Zod génère déjà une erreur si le champ de statut est vide car il attend « en attente » ou « payé ». Ajoutons également un message convivial si l'utilisateur ne sélectionne pas de statut.

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });


export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

// Action d'ajout d'une facture en BDD
export async function createInvoice(prevState: State, formData: FormData) {

    // prevState - contient l'état transmis depuis le useActionStatehook. Vous ne l'utiliserez pas dans l'action de cet exemple, mais c'est un accessoire obligatoire.

    const validatedFields = CreateInvoice.safeParse({

        // safeParse() renverra un objet contenant soit un champ successou error. Cela permettra de gérer la validation de manière plus élégante sans avoir à mettre cette logique à l'intérieur du try/catchbloc.

        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
        };
    } // Si validatedFieldscela n'aboutit pas, nous renvoyons la fonction plus tôt avec les messages d'erreur de Zod.


    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    
    const amountInCents = amount * 100; // Convertion en centimes, pour éliminer les erreurs de virgule flottante JavaScript et garantir une plus grande précision.
    const date = new Date().toISOString().split('T')[0];

    try {

        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;

    } catch( error ){
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };   
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
    // Redirect est appelé en dehors du try/catch bloc. Car cela génére une erreur, qui est interceptée par le catch bloc. 

}

// Action de modification d'une facture en BDD
export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

// Action de suppresion d'une facture en BDD
export async function deleteInvoice(id: string) {

    // throw new Error('Failed to Delete Invoice');
    // Bloc de code inaccessible du a l'erreur généré

    try{
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}

// Action de connexion
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return 'Something went wrong.';
            }
        }
        throw error;
    }
}