# SmartExpenseManager 💰

> Une application web professionnelle et sécurisée de gestion financière personnelle, développée avec **Laravel 12** et **React 19** (Inertia.js).

---

## 🎨 Design Premium — Thème "Earthy"

L'interface intègre un design **Premium Earthy** avec une palette de couleurs harmonieuse (vert sauge, brun terre, sable) et des micro-animations pour une expérience utilisateur moderne et élégante.

---

## 🔐 Authentification & Accès par Rôle

L'accès à la plateforme est **universel et intelligent** — aucune inscription manuelle requise.

| Rôle | Accès |
|------|-------|
| **Admin** | Se connecter avec le nom `farah gh` → Accès complet à la plateforme |
| **Utilisateur** | N'importe quel nom → Espace personnel (dépenses, revenus, budgets) |

> Le système crée automatiquement le compte si l'email n'existe pas encore.

---

## 📊 Espace Utilisateur

### Tableau de Bord — Vue Financière Globale
Vue d'ensemble en temps réel : **Revenu Total**, **Dépenses Totales** et **Solde Net** avec graphiques interactifs (Recharts).  
- Graphique circulaire des **dépenses par catégorie**
- Graphique de **tendance mensuelle** des revenus et dépenses
- Liste des **transactions récentes**

### Module Dépenses
Ajout de dépenses avec montant, description, date et catégorie. Le système vérifie automatiquement si le budget est dépassé et envoie une **notification d'alerte** en temps réel.

### Module Revenus
Enregistrement de toutes les sources de revenus (salaire, bonus, freelance...) avec consultation de l'historique complet.

### Module Catégories
Création de catégories personnalisées avec **code couleur** pour organiser vos finances selon vos habitudes.

### Module Budgets
Définition d'un budget mensuel par catégorie avec **barre de progression visuelle**. Une alerte est déclenchée automatiquement dès que le budget est dépassé.

| Vue Budgets | Alerte Dépassement |
|-------------|-------------------|
| Barre de progression par catégorie | Notification automatique en temps réel |

### Module Historique & Exports
Consultation de l'ensemble des transactions avec possibilité d'export :

| Format | Description |
|--------|-------------|
| 📥 **CSV (Excel)** | Export complet pour traitement externe |
| 🖨️ **PDF** | Rapport imprimable stylisé directement depuis le navigateur |

### Module Rapports & Financial Coach
Analyse financière avancée mois par mois :
- Comparaison **dépenses actuelles vs mois précédent**
- Calcul du **taux d'épargne**
- **Financial Coach** : conseils personnalisés générés automatiquement selon les habitudes de dépense

### Module Notifications
- Alertes automatiques de **dépassement de budget**
- Badge dynamique indiquant les **notifications non lues**
- Marquage en masse comme "lues"

### Module Paramètres
- Modification du **nom et email** du profil
- **Changement de mot de passe** sécurisé avec vérification de l'ancien mot de passe

---

## 🛡️ Espace Administrateur (Admin uniquement)

L'administrateur dispose d'un **panneau sécurisé à double authentification** (session + code PIN).

### Accès Sécurisé par PIN
Même un administrateur connecté doit saisir le **code PIN secret** pour accéder au panneau de contrôle — ajoutant une couche de sécurité supplémentaire.

### Statistiques Globales de la Plateforme
Vue d'ensemble en temps réel :
- Nombre total d'**utilisateurs actifs**
- Volume global des **dépenses** de la plateforme
- Volume global des **revenus** de la plateforme

### Gestion des Comptes Utilisateurs
- Consultation de tous les comptes inscrits
- **Modification des rôles** (User ↔ Admin) en un clic
- **Suppression** de comptes (avec protection contre l'auto-suppression)

---

## 🔑 Identifiants de Démonstration

| Rôle | Nom à saisir | Email | Code PIN Admin |
|------|-------------|-------|---------------|
| **Administrateur** | `farah ghilan` | n'importe lequel | `1234` |
| **Utilisateur** | n'importe lequel | n'importe lequel | — |

---

## ⚙️ Fonctionnalités Clés

### 💰 Gestion Financière
- Suivi complet revenus & dépenses avec catégorisation
- Budgets mensuels avec alertes automatiques
- Historique filtrable avec export multi-format

### 📈 Analyse & Intelligence
- Rapports mensuels comparatifs (mois actuel vs précédent)
- Financial Coach avec conseils personnalisés
- Graphiques interactifs et tableaux de bord dynamiques

### 🛡️ Sécurité & Administration
- Authentification universelle avec attribution automatique des rôles
- RBAC (Role-Based Access Control) via Middlewares Laravel
- Double authentification pour le panneau Admin (Session + PIN)
- Protection CSRF sur tous les formulaires
- Mots de passe hachés (Bcrypt)

### 📤 Mobilité des Données
- Export CSV compatible Excel
- Impression PDF stylisée directement depuis le navigateur

---

## 🛠️ Stack Technologique

| Composant | Technologie |
|-----------|-------------|
| **Backend** | Laravel 12 / PHP 8.2 |
| **Frontend** | React 19 + Inertia.js |
| **Base de données** | MySQL |
| **UI Composants** | Ant Design 6 |
| **Graphiques** | Recharts |
| **Styling** | TailwindCSS 4 + CSS personnalisé |
| **Build Tool** | Vite 7 |
| **Versioning** | Git / GitHub |

---

## 🏗️ Architecture

- **MVC** (Model-View-Controller) côté Backend Laravel
- **SPA** (Single Page Application) côté Frontend React/Inertia
- **RBAC** pour la gestion des permissions et des rôles

---

## 🚀 Installation

### Prérequis
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/farahgh12/SmartExpenseManager.git
cd SmartExpenseManager

# 2. Installer les dépendances PHP
composer install

# 3. Installer les dépendances JavaScript
npm install

# 4. Configuration de l'environnement
cp .env.example .env
# Modifier .env : DB_DATABASE, DB_USERNAME, DB_PASSWORD

# 5. Générer la clé d'application
php artisan key:generate

# 6. Créer les tables
php artisan migrate

# 7. Peupler avec des données de démonstration
php artisan db:seed --class=DemoDataSeeder
php artisan seed:notifications

# 8. Lancer l'application (2 terminaux)
php artisan serve
npm run dev
```

### Accès
- Application : `http://localhost:8000`
- Se connecter avec le nom **`farah gh`** + n'importe quel email pour accéder en tant qu'Admin

---

## 📁 Structure du Projet

```
app/
├── Http/Controllers/        # Logique métier (Expenses, Incomes, Reports, Admin...)
├── Http/Middleware/          # AdminMiddleware (RBAC)
├── Models/                   # User, Expense, Income, Category, Budget
├── Notifications/            # BudgetExceeded (alertes automatiques)
database/
├── migrations/               # Structure de la base de données
├── seeders/                  # Données de démonstration
resources/js/
├── Pages/                    # Composants React (Dashboard, Reports, Admin...)
├── Components/               # Layout, Navigation
routes/
└── web.php                   # Routes protégées par middleware
```

---

## 👤 Auteur

**Farah Ghilan**  
Institut Spécialisé en Nouvelles Technologies de l'Information et de la Communication — SAFI  
OFPPT | Année 2025–2026

---

*Développé dans le cadre d'un projet de fin de formation.*
