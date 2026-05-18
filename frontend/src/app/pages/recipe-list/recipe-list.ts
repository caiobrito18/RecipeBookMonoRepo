import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Lista de Receitas</h2>
        <a routerLink="/receitas/nova" class="btn-new">Nova Receita</a>
      </div>
      
      <div class="search-bar">
        <input type="text" [(ngModel)]="termoBusca" (input)="onSearch()" placeholder="Buscar receita por nome..." />
      </div>

      <div *ngIf="recipes.length === 0" class="empty-state">
        Nenhuma receita encontrada
      </div>
      <div class="recipe-grid">

        <div *ngFor="let r of recipes" class="recipe-card">
          <h3>{{ r.nome }}</h3>
          <p>Categoria: {{ r.categoria }}</p>
          <p>Tempo: {{ r.tempoPreparo }} min</p>
          <a [routerLink]="['/receitas', r.id]">Ver detalhes</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .btn-new { background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; }
    .search-bar { margin-bottom: 20px; }
    .search-bar input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
    .recipe-grid { display: flex; gap: 15px; flex-wrap: wrap; }
    .recipe-card { border: 1px solid #ccc; padding: 15px; border-radius: 5px; min-width: 200px; }
    .empty-state { color: #888; font-style: italic; margin-bottom: 20px; }
  `]
})
export class RecipeList implements OnInit {
  recipes: Recipe[] = [];
  termoBusca: string = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.carregarReceitas();
  }

  carregarReceitas() {
    this.recipeService.listar(this.termoBusca).subscribe(data => {
      this.recipes = data;
    });
  }

  onSearch() {
    this.carregarReceitas();
  }
}
