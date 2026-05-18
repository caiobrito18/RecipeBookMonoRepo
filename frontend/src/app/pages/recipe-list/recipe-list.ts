import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Lista de Receitas</h2>
        <a routerLink="/receitas/nova" class="btn-new">Nova Receita</a>
      </div>
      <div *ngIf="recipes.length === 0" class="empty-state">
        Nenhuma receita cadastrada
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
    .recipe-grid { display: flex; gap: 15px; flex-wrap: wrap; }
    .recipe-card { border: 1px solid #ccc; padding: 15px; border-radius: 5px; min-width: 200px; }
    .empty-state { color: #888; font-style: italic; }
  `]
})
export class RecipeList implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.listar().subscribe(data => {
      this.recipes = data;
    });
  }
}
