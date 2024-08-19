'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; // vider le cache et déclencher une nouvelle requête au serveur. Peu être fait avec la revalidatePathfonction de Next.js
import { redirect } from 'next/navigation';

// 1. Extraction des données de formData.
// 2. Validation des types avec Zod.
// 3. Conversion du montant en cents.
// 4. Passer les variables à votre requête SQL.
// 5. Appel revalidatePathpour vider le cache client et effectuer une nouvelle demande serveur.
// 6. Appel redirectpour rediriger l'utilisateur vers la page de la facture.

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// Action d'ajout d'une facture en BDD
export async function createInvoice(formData: FormData) {

    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100; // Convertion en centimes, pour éliminer les erreurs de virgule flottante JavaScript et garantir une plus grande précision.
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

}

// Action de modification d'une facture en BDD
export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    
    const amountInCents = amount * 100;
    
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
    `;
    
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

// Action de suppresion d'une facture en BDD
export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}