## Prérequis

* Node.js (version 18.17.0 ou supérieure)
* Systèmes d'exploitation : macOS, Windows (y compris WSL) ou Linux.
* Un compte GitHub et un compte Vercel
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

    - Pour commencer, transférez votre dépôt sur Github si vous ne l'avez pas déjà fait. Cela facilitera la configuration et le déploiement de votre base de données.

    - Créer un compte Vercel. Sélectionnez Continuer avec GitHub pour connecter vos comptes GitHub et Vercel.

    - Sélectionner et importer le référentiel GitHub, nommez votre projet et cliquez sur Déployer.

    - Pour configurer une base de données, sélectionnez l' onglet Stockage dans le tableau de bord de votre projet. Sélectionnez Create Database → Postgres → Continue.

    - Acceptez les conditions, attribuez un nom à votre base de données et choisir un région.

    - Une fois créer accédez à .env.local cliqué sur Show secret pour affiché les information de connexion a la BDD

    - Accédez à votre éditeur de code et renommez le **.env.example** fichier en **.env** Collez le contenu copié depuis Vercel.

```bash
POSTGRES_URL="postgres://default:brmXZNp1fI9W@ep-odd-night-a2ym56z4-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_PRISMA_URL="postgres://default:brmXZNp1fI9W@ep-odd-night-a2ym56z4-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NO_SSL="postgres://default:brmXZNp1fI9W@ep-odd-night-a2ym56z4-pooler.eu-central-1.aws.neon.tech:5432/verceldb"
POSTGRES_URL_NON_POOLING="postgres://default:brmXZNp1fI9W@ep-odd-night-a2ym56z4.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_USER="default"
POSTGRES_HOST="ep-odd-night-a2ym56z4-pooler.eu-central-1.aws.neon.tech"
POSTGRES_PASSWORD="PASSWORD"
POSTGRES_DATABASE="verceldb"
```

Profitons d'être dans le fichier **.env** pour générez une clé secrète pour notre application qui sera utilisé pour l'authentification.

Vous pouvez le faire en exécutant la commande suivante dans votre terminal :

```bash
openssl rand -base64 32
```

Ensuite, dans votre fichier **.env**, ajoutez votre clé générée à la variable AUTH_SECRET :

```bash
AUTH_SECRET=your-secret-key
```

## Démarrage du serveur

```bash
yarn dev
# ou
npm run dev
```
