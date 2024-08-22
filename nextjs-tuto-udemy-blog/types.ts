import { Prisma } from "@prisma/client";

export type Category = {
    id: number;
    name: string;
    slug: string;
}

export type Post = {
    id: number;
    category: string;
    title: string;
    image: string;
    caption: string;
    date: string | Date;
    minutesToRead: number;
    author: string;
    nbViews: number;
    nbComments: number;
    slug: string;
    content?: string;
};

// Prisma.PostGetPayload est une fonction utilitaire fournie par Prisma pour générer un type correspondant à un modèle Prisma, en tenant compte de certaines options (comme include, select, etc.).

export type PostWithCategory = Prisma.PostGetPayload<{
    include: {cat: true}
    // Dans Prisma, l'option include permet de spécifier les relations que l'on souhaites inclure lorsqu'on récupères un enregistrement.
}>