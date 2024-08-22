import { useQuery } from "react-query"; // Importation du hook `useQuery` de React Query pour gérer les requêtes de données.
import axios from "axios"; // Importation d'axios pour effectuer des requêtes HTTP.
import { Post } from "@prisma/client"; // Importation du type Post de Prisma pour typer les données renvoyées.

// Fonction asynchrone pour récupérer un post en fonction de son slug.
// Remarque : Pas besoin de try/catch car React Query gère les erreurs nativement.
const getPostBySlug = async (slug: string) => {
    // Effectue une requête GET à l'API pour obtenir le post avec le slug spécifié.
    const { data } = await axios.get(`/api/posts/${slug}`);
    
    // Retourne les données typées comme un objet `Post`.
    return data as Post;
}

// Hook personnalisé pour récupérer les données d'un post en utilisant React Query.
// Il prend en paramètre un `slug` qui identifie le post.
export function usePost(slug: string) {
    return useQuery({
        // `queryKey` permet à React Query de gérer le cache pour cette requête spécifique.
        // Le cache est basé sur cette clé, composée de "post" et du slug.
        queryKey: ["post", slug],

        // `queryFn` est la fonction qui sera exécutée pour récupérer les données.
        // Ici, on appelle la fonction `getPostBySlug` en lui passant le slug.
        queryFn: () => getPostBySlug(slug),

        // `enabled` permet de conditionner l'exécution de la requête.
        // La requête ne s'exécute que si le slug est non nul ou non vide (`!!slug`).
        enabled: !!slug,
    });
}