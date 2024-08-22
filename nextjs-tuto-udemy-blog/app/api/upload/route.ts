import { writeFile } from "fs/promises" // Importation de la fonction writeFile pour écrire des fichiers de manière asynchrone
import { NextResponse } from "next/server" // Importation de NextResponse pour gérer les réponses HTTP dans Next.js
import path from "path" // Importation du module path pour gérer les chemins de fichiers

// Fonction handler pour la méthode POST, utilisée pour traiter les requêtes HTTP POST
export const POST = async (req: Request) => {
    // Récupération des données du formulaire envoyées dans la requête
    const data = await req.formData();
    
    // Récupération du fichier depuis les données du formulaire
    // Ici, on suppose que le champ de formulaire s'appelle "file"
    const file: File | null = data.get("file") as unknown as File;

    // Vérification si un fichier a été fourni dans la requête
    if (!file) {
        // Si aucun fichier n'a été trouvé, renvoie une réponse JSON avec un message d'erreur et un statut HTTP 500
        return NextResponse.json(
            { message: "No file!" },
            { status: 500 }
        );
    }

    // Conversion du fichier en tableau d'octets (ArrayBuffer)
    const bytes = await file.arrayBuffer();
    
    // Création d'un buffer Node.js à partir des octets du fichier
    const buffer = Buffer.from(bytes);

    // Création d'un chemin URL pour stocker le fichier, avec un nom unique basé sur le timestamp actuel
    const imageUrl = `/img/upload/${new Date().getTime()}_${file.name}`;
    
    // Création du chemin absolu pour le stockage du fichier, basé sur le chemin courant du processus
    const imagePath = path.join(process.cwd(), `/public${imageUrl}`);

    try {
        // Écriture du fichier sur le disque à l'emplacement spécifié
        await writeFile(imagePath, buffer);
        
        // Si l'écriture est réussie, renvoie l'URL de l'image avec un statut HTTP 200
        return NextResponse.json(imageUrl, { status: 200 });
    } catch (error) {
        // En cas d'erreur lors de l'écriture du fichier, renvoie une réponse JSON avec un message d'erreur et un statut HTTP 500
        return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
    }
}
