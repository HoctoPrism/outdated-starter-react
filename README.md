# Starter React

Ce projet est un projet personnel me permettant d'avoir un starter avec des dépendances que j'utilise qui sont préconfigurés.
Ce projet évoluera au fil du temps, il est prévu d'y intégrer dans le futur nextjs.

On retrouve dans le service de route qui me permettra à terme de gérer mes privates routes
On retrouve aussi un component avec un crud via l'api : "Type". Il n'est pas appelé dans les routes, il sert de référence pour avoir un preset de formulaire + validator compatible avec material UI.

On retrouve : 
- #### **REACT : 18.1.0**
- emotion/cache : **11.9.3**
- mui/material : **5.8.4**
- reduxjs/toolkit : **1.8.2**
- immutability-helper : **3.1.1**
- react-hook-form : **7.33.1**
- react-redux : **8.0.2**
- react-router-dom : **6.3.0**
- redux-thunk : **2.4.1**
- sass : **1.52.3**
- axios: **0.27.2**,


Il est possible de modifier le theme dans `component/partials/_theme` et les deux fichiers de theme, dark et light theme.

Les fichiers de css sont dans `assets/css/component`, au format `scss` compilé avec `sass`