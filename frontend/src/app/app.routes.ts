import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'receitas', pathMatch: 'full' },
  { 
    path: 'receitas', 
    loadComponent: () => import('./pages/recipe-list/recipe-list').then(m => m.RecipeList)
  }
];
