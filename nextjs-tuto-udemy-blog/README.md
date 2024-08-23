## Prérequis

* Node.js (version 20.15.0 ou supérieure)
* PostgreSQL 16 (installé et configuré)
* Yarn ou npm

## Installation

1. Clonez le repository :

```bash
git clone https://github.com/bdavidxyz/stagerr.git
cd monapp
```
2. Installez les dépendances :

```bash
yarn install
# ou
npm install
```

3. Configurez la base de données :

Assurez-vous que PostgreSQL est en cours d'exécution et **créez une nouvelle base de données** pour ce projet.

Mettez à jour les informations de connexion à la base de données dans le fichier **.env** :

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/nom_de_la_base?schema=public"
```

4. Initialisez Prisma :

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Création des tables dans votre base de données et généreration du client Prisma.

5. Récupération de l'ID Client et du code secret client pour Oauth:

Après avoir créer un compte Google Cloud et Github remplir dans le **.env** les informations récupérer.

```bash
AUTH_GOOGLE_ID=********
AUTH_GOOGLE_SECRET=********

GITHUB_ID=********
GITHUB_SECRET=********
```
6. Génération d'une clé secret pour votre application:

Il est possible de générer une clé secrète complète à l'aide de cette commande.

```bash
openssl rand -hex 32
```

Ce qui donne une clé de ce type :

```bash
a741780a07abf781649558929ac656278d1421a77d3acaab475c8fb534811837
```

Ajoutez la clé dans le fichier **.env**

```bash
NEXTAUTH_SECRET="a741780a07abf781649558929ac656278d1421a77d3acaab475c8fb534811837"
```

7. Ajouter l'URL de base de votre application

```bash
NEXTAUTH_URL=http://localhost:3000
```

## Démarrage du serveur

```bash
yarn dev
# ou
npm run dev
```
