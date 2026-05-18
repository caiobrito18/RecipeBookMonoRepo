import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container" *ngIf="recipe">
      <div class="header">
        <h2>{{ recipe.nome }}</h2>
        <div class="actions">
          <button (click)="excluir()" class="btn-delete">Excluir Receita</button>
          <a routerLink="/receitas" class="btn-back">Voltar</a>
        </div>
      </div>

      <div class="details-card">
        <p><strong>Categoria:</strong> {{ recipe.categoria }}</p>
        <p><strong>Tempo de Preparo:</strong> {{ recipe.tempoPreparo }} minutos</p>
        <p><strong>Porções:</strong> {{ recipe.porcoes }}</p>
        <p><strong>Data de Cadastro:</strong> {{ recipe.dataCadastro | date:'dd/MM/yyyy HH:mm' }}</p>

        <h3>Ingredientes</h3>
        <ul>
          <li *ngFor="let ingrediente of recipe.ingredientes">{{ ingrediente }}</li>
        </ul>

        <h3>Modo de Preparo</h3>
        <p class="preparo">{{ recipe.modoPreparo }}</p>
      </div>
    </div>
    <div class="container" *ngIf="!recipe && !loading">
      <p>Receita não encontrada.</p>
      <a routerLink="/receitas" class="btn-back">Voltar</a>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 800px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    .actions { display: flex; gap: 10px; }
    .btn-back { background-color: #6c757d; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; }
    .btn-delete { background-color: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; }
    .details-card { background: #f9f9f9; padding: 20px; border-radius: 8px; }
    .preparo { white-space: pre-wrap; line-height: 1.5; }
    ul { padding-left: 20px; }
  `]
})
export class RecipeDetail implements OnInit {
  recipe: Recipe | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.buscarPorId(+id).subscribe({
        next: (data) => {
          this.recipe = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  excluir(): void {
    if (this.recipe && this.recipe.id) {
      if (confirm('Tem certeza que deseja excluir esta receita?')) {
        this.recipeService.excluir(this.recipe.id).subscribe({
          next: () => {
            alert('Receita excluída com sucesso!');
            this.router.navigate(['/receitas']);
          },
          error: () => {
            alert('Erro ao excluir receita.');
          }
        });
      }
    }
  }
}
