import { PrismaClient } from "@prisma/client"

// Déclaration globale pour ajouter la variable `prisma` à l'objet global
// Cela permet de conserver une seule instance de Prisma dans l'environnement de développement.
declare global {
    var prisma: PrismaClient // Déclare une variable globale `prisma` de type `PrismaClient`
}

// Déclaration de la variable locale `prisma` qui contiendra l'instance de PrismaClient
let prisma: PrismaClient

// Vérification si l'environnement d'exécution est en production
if (process.env.NODE_ENV == "production") {
    // En production, on crée une nouvelle instance de PrismaClient
    prisma = new PrismaClient()
} else {
    // En développement, on vérifie si `global.prisma` n'est pas encore défini
    if (!global.prisma) {
        // Si ce n'est pas le cas, on crée une nouvelle instance et on l'assigne à `global.prisma`
        global.prisma = new PrismaClient()
    }
    // On assigne la variable locale `prisma` à l'instance globale pour la réutiliser
    prisma = global.prisma
}

// Exportation de l'instance PrismaClient pour l'utiliser dans d'autres fichiers
export default prisma