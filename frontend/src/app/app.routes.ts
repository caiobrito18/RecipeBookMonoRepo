import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'receitas', pathMatch: 'full' },
  {
    path: 'receitas',
    loadComponent: () => import('./pages/recipe-list/recipe-list').then(m => m.RecipeList)
  },
  {
    path: 'receitas/nova',
    loadComponent: () => import('./pages/recipe-form/recipe-form').then(m => m.RecipeForm)
  },
  {
    path: 'receitas/:id',
    loadComponent: () => import('./pages/recipe-detail/recipe-detail').then(m => m.RecipeDetail)
  }
];
