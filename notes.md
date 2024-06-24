**Notes**

Le fichier notes.md est un document essentiel de notre projet. Il est conçu pour centraliser des rappels, des éléments importants, ainsi que des informations pertinentes qui seront utiles pour la préparation des dossiers professionnels et de projet. Voici quelques-unes de ses utilisations principales :

Rappels Importants : Noter des tâches cruciales, des deadlines, ou des idées à ne pas oublier.
Éléments Clés : Enregistrer des informations clés qui doivent être facilement accessibles et partagées avec l'équipe.
Documentation du Projet : Ajouter des détails spécifiques au projet, tels que des configurations, des décisions techniques, et des bonnes pratiques.
Historique et Références : Conserver un historique des décisions importantes et des références qui pourraient être nécessaires pour le futur développement ou pour des présentations professionnelles.

Lors de la création d'une application React, il est courant d'avoir certains composants qui doivent apparaître sur chaque page, tels que la Navbar et le Footer. La question ici est de savoir s'il vaut mieux instancier ces composants dans chaque page individuellement ou de les inclure directement dans le composant App.

**Bonne pratique :**

Il est généralement recommandé de placer les composants qui doivent apparaître sur chaque page de votre application directement dans le composant App. Cela offre plusieurs avantages :

**Code DRY (Don't Repeat Yourself) :**

En plaçant la Navbar et le Footer dans App.jsx, vous évitez de répéter le code sur chaque page, ce qui rend le code plus propre et plus facile à maintenir.
Gestion globale du layout :

En centralisant ces composants dans App.jsx, vous pouvez gérer plus facilement la structure globale de votre application. Cela facilite également les modifications futures du layout global.

**Meilleure performance :**

Placer des composants de layout dans App.jsx réduit le besoin de les recréer à chaque changement de page, ce qui peut améliorer les performances de votre application.