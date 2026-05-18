export interface Recipe {
  id?: number;
  nome: string;
  categoria: 'DOCE' | 'SALGADO' | 'BEBIDA' | 'SOBREMESA';
  tempoPreparo: number;
  porcoes: number;
  ingredientes: string[];
  modoPreparo: string;
  dataCadastro?: string;
}
