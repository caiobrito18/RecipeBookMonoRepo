import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Cadastrar Receita</h2>
      
      <div *ngIf="successMessage" class="success-msg">{{ successMessage }}</div>
      
      <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Nome:</label>
          <input type="text" formControlName="nome">
          <div *ngIf="recipeForm.get('nome')?.invalid && recipeForm.get('nome')?.touched" class="error">
            Nome é obrigatório
          </div>
        </div>

        <div class="form-group">
          <label>Categoria:</label>
          <select formControlName="categoria">
            <option value="DOCE">Doce</option>
            <option value="SALGADO">Salgado</option>
            <option value="BEBIDA">Bebida</option>
            <option value="SOBREMESA">Sobremesa</option>
          </select>
          <div *ngIf="recipeForm.get('categoria')?.invalid && recipeForm.get('categoria')?.touched" class="error">
            Categoria é obrigatória
          </div>
        </div>

        <div class="form-group">
          <label>Tempo de Preparo (min):</label>
          <input type="number" formControlName="tempoPreparo">
          <div *ngIf="recipeForm.get('tempoPreparo')?.invalid && recipeForm.get('tempoPreparo')?.touched" class="error">
            Tempo de preparo deve ser maior ou igual a 1
          </div>
        </div>

        <div class="form-group">
          <label>Porções:</label>
          <input type="number" formControlName="porcoes">
          <div *ngIf="recipeForm.get('porcoes')?.invalid && recipeForm.get('porcoes')?.touched" class="error">
            Deve render pelo menos 1 porção
          </div>
        </div>

        <div class="form-group">
          <label>Ingredientes (separados por vírgula):</label>
          <textarea formControlName="ingredientes"></textarea>
          <div *ngIf="recipeForm.get('ingredientes')?.invalid && recipeForm.get('ingredientes')?.touched" class="error">
            Ingredientes são obrigatórios
          </div>
        </div>

        <div class="form-group">
          <label>Modo de Preparo:</label>
          <textarea formControlName="modoPreparo"></textarea>
          <div *ngIf="recipeForm.get('modoPreparo')?.invalid && recipeForm.get('modoPreparo')?.touched" class="error">
            Modo de preparo é obrigatório
          </div>
        </div>

        <button type="submit" [disabled]="recipeForm.invalid">Salvar</button>
      </form>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 600px; margin: 0 auto; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input, select, textarea { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    .error { color: red; font-size: 0.8em; margin-top: 5px; }
    .success-msg { background: #d4edda; color: #155724; padding: 10px; margin-bottom: 15px; border-radius: 4px; }
    button { padding: 10px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:disabled { background: #ccc; cursor: not-allowed; }
  `]
})
export class RecipeForm {
  recipeForm: FormGroup;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      tempoPreparo: ['', [Validators.required, Validators.min(1)]],
      porcoes: ['', [Validators.required, Validators.min(1)]],
      ingredientes: ['', Validators.required],
      modoPreparo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;
      const recipe: Recipe = {
        ...formValue,
        ingredientes: formValue.ingredientes.split(',').map((i: string) => i.trim()),
      };

      this.recipeService.criar(recipe).subscribe({
        next: () => {
          this.successMessage = 'Receita salva com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/receitas']);
          }, 2000);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao salvar receita. ' + (err.error?.nome || err.error || ''));
        }
      });
    }
  }
}
