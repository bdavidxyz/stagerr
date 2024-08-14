// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if(req.method === "GET"){
        const { prenom, nom } = req.query
        res.status(200).json({ name: nom, firstName: prenom });
    }else {
        res.status(500).json({ message: "Method Not Allowed" });
    }
}
