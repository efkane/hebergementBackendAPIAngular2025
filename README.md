# Assignment API - Backend

API REST pour la gestion des assignments (devoirs à rendre).

## 🚀 Déploiement sur Render.com

### Prérequis
- Compte GitHub
- Compte Render.com (gratuit)
- Base de données MongoDB Atlas configurée

### Configuration du projet

#### 1. Scripts package.json
Le projet contient les scripts suivants :
```json
{
  "scripts": {
    "build": "npm install",
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

#### 2. Variables d'environnement
Le serveur écoute sur le port défini par `process.env.PORT` (fourni par Render) ou 8010 en local.

### Étapes de déploiement

#### 1. Tester localement
```bash
# Supprimer node_modules
rm -rf node_modules

# Installer les dépendances
npm install

# Ou utiliser le script build
npm run build

# Démarrer le serveur
npm run start
```

Le serveur devrait démarrer sur `http://localhost:8010`

#### 2. Pousser sur GitHub
```bash
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

#### 3. Créer un Web Service sur Render.com

1. Se connecter sur [render.com](https://render.com)
2. Cliquer sur **"New +"** → **"Web Service"**
3. Connecter votre repository GitHub
4. Sélectionner le repository du backend

**Configuration du Web Service :**
- **Name** : `assignments-api` (ou votre choix)
- **Environment** : `Node`
- **Region** : Choisir la région la plus proche
- **Branch** : `main`
- **Root Directory** : Laisser vide (ou spécifier le chemin si nécessaire)
- **Build Command** : `npm run build` ou `npm install`
- **Start Command** : `npm run start` ou `node server.js`
- **Plan** : Free

#### 4. Variables d'environnement (si nécessaire)

Dans les paramètres du Web Service, ajouter les variables d'environnement :
- `MONGODB_URI` : URI de connexion MongoDB (si vous l'externalisez)
- Autres variables selon vos besoins

#### 5. Déployer

Cliquer sur **"Create Web Service"**. Render va :
1. Cloner votre repo
2. Exécuter `npm run build`
3. Exécuter `npm run start`
4. Exposer votre API sur une URL publique

### URL de l'API déployée

Une fois déployé, votre API sera accessible à :
```
https://[nom-de-votre-service].onrender.com
```

### Endpoints disponibles

- `GET /api/assignments?page=1&limit=10` - Liste paginée des assignments
- `GET /api/assignments/:id` - Un assignment par ID
- `POST /api/assignments` - Créer un assignment
- `PUT /api/assignments` - Modifier un assignment
- `DELETE /api/assignments/:id` - Supprimer un assignment

## 📝 Structure du projet

```
api/
├── model/
│   └── assignment.js       # Modèle Mongoose
├── routes/
│   └── assignments.js      # Routes de l'API
├── .gitignore             # Fichiers à ignorer
├── package.json           # Dépendances et scripts
└── server.js             # Point d'entrée
```

## 🔧 Technologies

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **mongoose-aggregate-paginate-v2** - Plugin de pagination

## 📦 Dépendances

```json
{
  "express": "^4.18.2",
  "mongodb": "^4.1.0",
  "mongoose": "^5.11.2",
  "mongoose-aggregate-paginate-v2": "^1.1.4",
  "multer": "1.4.5-lts.1"
}
```

## ⚠️ Notes importantes

- Le serveur écoute sur `0.0.0.0` pour être accessible depuis l'extérieur
- CORS est activé pour accepter les requêtes cross-domain
- La base de données MongoDB doit être accessible depuis Internet (MongoDB Atlas recommandé)
- Le fichier `.gitignore` exclut `node_modules` et les fichiers sensibles

## 🔄 Mises à jour

Pour mettre à jour l'application déployée :
1. Faire vos modifications localement
2. Commit et push sur GitHub
3. Render redéploiera automatiquement

## 🐛 Dépannage

### Le serveur ne démarre pas
- Vérifier les logs dans le dashboard Render
- Vérifier que `npm run start` fonctionne localement
- Vérifier que toutes les dépendances sont dans `package.json`

### Erreur de connexion MongoDB
- Vérifier l'URI de connexion MongoDB
- Vérifier que l'IP de Render est autorisée dans MongoDB Atlas (autoriser 0.0.0.0/0)
- Vérifier les credentials MongoDB

### Port déjà utilisé en local
- Changer le port par défaut dans `server.js` (ligne `let port = process.env.PORT || 8010;`)
