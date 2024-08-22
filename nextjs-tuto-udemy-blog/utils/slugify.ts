// Fonction pour transformer une chaîne de caractères en "slug" (une version lisible par les URLs)
export function slugify(str: string) {
    return String(str) // Convertit l'entrée en chaîne de caractères si ce n'est pas déjà le cas
        .normalize('NFKD') // Normalise la chaîne pour séparer les lettres des accents diacritiques (ex : é devient e + `)
        .replace(/[\u0300-\u036f]/g, '') // Supprime les accents en enlevant les caractères combinés générés par la normalisation
        .trim() // Supprime les espaces en début et fin de chaîne
        .toLowerCase() // Convertit toute la chaîne en minuscules
        .replace(/[^a-z0-9 ]/g, '') // Supprime tous les caractères non alphanumériques (sauf les espaces)
        .replace(/\s+/g, '-') // Remplace tous les espaces (y compris multiples) par un tiret "-"
        .replace(/-+/g, '-') // Remplace les tirets multiples par un seul tiret
}
