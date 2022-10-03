# Starter React

Ce projet est un projet personnel me permettant d'avoir un starter avec des dépendances que j'utilise qui sont préconfigurés.
Ce projet évoluera au fil du temps, il est prévu d'y intégrer dans le futur nextjs.

On retrouve dans le service de route qui me permettra à terme de gérer mes privates routes
On retrouve aussi un component avec un crud via l'api : "Type". Il n'est pas appelé dans les routes, il sert de référence pour avoir un preset de formulaire + validator compatible avec material UI.

il y a une starter CRA et un starter NEXT

On retrouve sur toutes les branches : 
- #### **REACT : 18.2.0**
- emotion/cache
- mui/material
- immutability-helper
- react-hook-form
- sass
- axios

On retrouve sur les branches **master** et **react** : 
- react-router-dom

On retrouve sur la branche **nextjs** : 
- sass
- next-auth
- swr

Il est possible de modifier le theme dans `component/partials/_theme` et les deux fichiers de theme, dark et light theme.

CRA : Les fichiers de css sont dans `assets/css`, au format `scss` compilé avec `sass`
NEXT : Les fichiers de css sont dans `styles`, au format `scss` compilé avec `sass`

Tous les starters sont en WIP
