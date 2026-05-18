# 🍳 RecipeBook v1.0

Sistema de Gestão de Receitas Culinárias — Trabalho Prático
**Stack:** Spring Boot 3 + Angular 17

---

## 📁 Estrutura do Projeto

```
recipebook/
├── recipebook-backend/    ← API REST (Spring Boot + H2)
└── recipebook-frontend/   ← SPA (Angular 17 Standalone)
```

---

## ▶️ Como Executar

### Pré-requisitos

| Ferramenta  | Versão mínima |
| ----------- | --------------- |
| Java        | 17+             |
| Maven       | 3.8+            |
| Node.js     | 18+             |
| Angular CLI | 17+             |

---

### 1. Backend (porta 8080)

```bash
cd recipebook-backend

# Compilar e executar
mvn spring-boot:run
```

A API estará disponível em: `http://localhost:8080/api/receitas`
Console H2 (banco em memória): `http://localhost:8080/h2-console`

---

### 2. Frontend (porta 4200)

```bash
cd recipebook-frontend

# Instalar dependências
npm install

# Instalar Angular CLI globalmente (se necessário)
npm install -g @angular/cli

# Executar
ng serve
```

A aplicação estará disponível em: `http://localhost:4200`

---

## 🔗 Endpoints da API

| Método | Endpoint           | Descrição     | Status      |
| ------- | ------------------ | --------------- | ----------- |
| GET     | /api/receitas      | Listar todas    | 200         |
| GET     | /api/receitas/{id} | Buscar por ID   | 200/404     |
| POST    | /api/receitas      | Criar receita   | 201/400/409 |
| DELETE  | /api/receitas/{id} | Excluir receita | 204/404     |

---

## 📋 Exemplo de Payload (POST)

```json
{
  "nome": "Brigadeiro",
  "categoria": "DOCE",
  "tempoPreparo": 30,
  "porcoes": 20,
  "ingredientes": [
    "1 lata de leite condensado",
    "1 colher de sopa de manteiga",
    "3 colheres de sopa de chocolate em pó",
    "Chocolate granulado"
  ],
  "modoPreparo": "Em uma panela, misture o leite condensado, a manteiga e o chocolate em pó. Mexa em fogo médio até desgrudar do fundo. Deixe esfriar e faça bolinhas. Passe no granulado."
}
```

---

## ✅ Requisitos Funcionais Implementados

- ✅ **RF01** — Listar receitas em cards (ordenado por data desc)
- ✅ **RF02** — Busca em tempo real por nome (case-insensitive)
- ✅ **RF03** — Cadastrar receita com validações por campo
- ✅ **RF04** — Visualizar detalhes completos
- ✅ **RF05** — Excluir com confirmação

---

## 🏗️ Arquitetura Backend

```
src/main/java/com/recipebook/
├── RecipeBookApplication.java    ← Entry point
├── entity/
│   ├── Recipe.java               ← Entidade JPA
│   └── Categoria.java            ← Enum (DOCE, SALGADO, BEBIDA, SOBREMESA)
├── repository/
│   └── RecipeRepository.java     ← Spring Data JPA
├── controller/
│   └── RecipeController.java     ← REST endpoints
└── config/
    ├── CorsConfig.java           ← CORS para Angular
    └── GlobalExceptionHandler.java ← Tratamento de erros
```

## 🏗️ Arquitetura Frontend

```
src/app/
├── app.component.ts              ← Root component
├── app.config.ts                 ← Providers (HTTP, Router)
├── app.routes.ts                 ← Rotas lazy-loaded
├── models/
│   └── recipe.model.ts           ← Interfaces e tipos
├── services/
│   └── recipe.service.ts         ← Chamadas HTTP
└── pages/
    ├── recipe-list/              ← RF01 + RF02
    ├── recipe-form/              ← RF03
    └── recipe-detail/            ← RF04 + RF05
```
