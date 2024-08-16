// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {

  // Method POST uniquement
  if(req.method === "POST") {
    try{
      // récupération de tout les post
      const posts = await prisma.post.findMany()
      res.status(200).json({posts});
    } catch (error){ // Gestion des erreurs
      res.status(500).json({message: "Data recovery failed", error: error.message})
  }
  } else {
    res.status(405).json({message: "Method not allowed"})
  } 

}
