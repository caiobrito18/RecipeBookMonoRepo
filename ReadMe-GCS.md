```markdown
# 📘 Manual de GCS & Instruções para o Agente de IA — RecipeBook

Este documento serve como a **especificação oficial** e o **guia de execução** para o desenvolvimento do sistema **RecipeBook**. Ele integra os conceitos de Construção de Software (Spring Boot backend + Angular frontend) com os 4 pilares da Gerência de Configuração de Software (GCS): **Identificação, Controle de Mudanças, Registro de Status e Auditoria**.

---

## 🎯 Objetivo e Diretrizes de Operação do Agente
Você (Agente de IA) deve agir como um Engenheiro de Software Sênior e Especialista em GCS. 
1. **Nenhum código é escrito sem rastreabilidade:** Toda alteração de código deve estar associada a uma Issue (Change Request).
2. **Commits Atômicos e Padronizados:** Siga estritamente o padrão *Conventional Commits*.
3. **Isolamento de Branches:** Nunca trabalhe diretamente nos branches `main` ou `develop`. Use branches de suporte (`feature/` ou `hotfix/`).

---

## 🏗️ 1. Infraestrutura e Arquitetura do Projeto

O projeto adota uma estrutura de **Monorepo**, dividida da seguinte forma:
*   `/backend`: API Restful com **Spring Boot 3.x, Java 17 e banco H2**.
*   `/frontend`: SPA com **Angular 17+ usando Standalone Components**.

### Fluxo de Branches (Git Flow Adaptado)
*   `main`: Representa o código estável em produção.
*   `develop`: Área de integração diária de novas funcionalidades.
*   `feature/*`: Branches temporários para implementação de requisitos (saem de `develop`).
*   `hotfix/*`: Branches urgentes para correção de bugs em produção (saem de `main`).

---

## ⏱️ 2. Ciclo de Vida do Projeto: Execução Passo a Passo

### 🛠️ Fase 1: Configuração Inicial e Baseline (`v0.1.0`)
**Pilar GCS: Identificação**

1. **Estrutura de Pastas:**
   ```bash
   mkdir backend frontend
   touch CHANGELOG.md
   

```

2. **Atualização do `.gitignore`:** Garanta que o final do arquivo contenha:

```text
# === ANGULAR / NODE ===
node_modules/
dist/
.angular/
*.env
.DS_Store


```

```
3. **Estratégia de Ramificação:** Criar o branch `develop` a partir do `main` e enviá-lo ao servidor:
   ```bash
   git checkout -b develop
   git push origin develop
   

```

4. **Proteção de Branch (GitHub Settings):** O branch `main` deve exigir Pull Request e checagens de status do CI antes do merge.
5. **Baseline Inicial:**

```bash
git add .
git commit -m "chore: configuracao inicial do projeto recipebook"
git tag -a v0.1.0 -m "Baseline inicial - estrutura do projeto configurada"
git push origin main develop v0.1.0


```

```

---

### 📝 Fase 2: Feature RF01 — Listar Receitas
**Pilar GCS: Controle de Mudanças**

1. **Change Request (Issue #1):**
   *   **Título:** `[FEATURE] RF01 - Listar Receitas`
   *   **Labels:** `enhancement`, `approved`
   *   **Critérios de Aceite (CA):**
       *   *CA01.1:* Exibir nome, categoria e tempo de preparo nos cards.
       *   *CA01.2:* Ordenar por data de cadastro (mais recentes primeiro).
       *   *CA01.3:* Exibir mensagem "Nenhuma receita cadastrada" se lista vazia.
       *   *CA01.4:* Card com link para detalhes.
2. **Desenvolvimento Isolado:**
   ```bash
   git checkout develop && git pull origin develop
   git checkout -b feature/listar-receitas
   

```

3. **Commits Atômicos Mandatórios (Exemplos):**

* `feat(backend): adicionar entidade Recipe e enum Categoria (#1)`
* `feat(backend): implementar GET /api/receitas ordenado por data (#1)`
* `feat(frontend): criar RecipeService com metodo listar (#1)`
* `feat(frontend): implementar componente recipe-list com cards (#1)`
* `chore(backend): adicionar DataLoader com 3 receitas iniciais (#1)`

4. **Pull Request (PR #1):** Base `develop` $\leftarrow$ Compare `feature/listar-receitas`.

* *Obrigatório conter na descrição:* `Closes #1` para fechamento automatizado.

---

### 📝 Fase 3: Feature RF03 — Cadastrar Receita

**Pilar GCS: Controle de Mudanças**

1. **Change Request (Issue #2):**

* **Título:** `[FEATURE] RF03 - Cadastrar Receita`
* **Labels:** `enhancement`, `approved`
* **Critérios de Aceite (CA) & Regras de Negócio (RN):**
* *CA03.1 a CA03.3:* Formulário Angular (`ReactiveFormsModule`) com validações e mensagens de erro por campo.
* *CA03.4:* Botão 'Salvar' desabilitado se inválido.
* *CA03.5 e CA03.6:* Redirecionar após salvar com mensagem de sucesso.
* *RN01:* Nome único | *RN05:* `tempoPreparo >= 1` | *RN06:* `porcoes >= 1`.

2. **Desenvolvimento Isolado:**

```bash
git checkout develop && git pull origin develop
git checkout -b feature/cadastrar-receita


```

```
3. **Commits Padronizados:**
   *   `feat(backend): endpoint POST /api/receitas com @Valid (#2)`
   *   `feat(backend): adicionar validacoes Bean Validation na entidade Recipe (#2)`
   *   `feat(frontend): criar recipe-form com reactive forms (#2)`
   *   `feat(frontend): exibir mensagens de erro por campo (#2)`
4. **Pull Request (PR #2):** Base `develop` $\leftarrow$ Compare `feature/cadastrar-receita`. Contendo `Closes #2`.

---

### 🧪 Fase 4: Pipeline de CI (GitHub Actions)
**Pilar GCS: Auditoria**

O arquivo `.github/workflows/ci.yml` deve ser criado no branch `develop` para auditar de forma independente cada push ou PR:

```yaml
name: CI - RecipeBook

on:
  push:
    branches: [ develop, 'feature/**', 'hotfix/**' ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build-backend:
    name: "Build Backend (Spring Boot + Java 17)"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: "Configurar Java 17"
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: maven
      - name: "Build e testes com Maven"
        run: cd backend && mvn verify --no-transfer-progress

  build-frontend:
    name: "Build Frontend (Angular + Node 20)"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: "Configurar Node.js 20"
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      - name: "Instalar dependencias (npm ci)"
        run: cd frontend && npm ci
      - name: "Build Angular (prod)"
        run: cd frontend && npm run build

```

> **Regra de Integração:** O merge dos PRs #1 e #2 no GitHub só poderá ser realizado após as duas esteiras de build (`build-backend` e `build-frontend`) apresentarem status **verde (Passing)**.

---

### 📦 Fase 5: Release `v1.0.0` — Primeira Versão Estável

**Pilar GCS: Registro de Status & Identificação**

1. **Preparação no Branch de Release:**

```bash
git checkout develop && git pull origin develop
git checkout -b release/v1.0.0


```

```
2. **Atualização do `CHANGELOG.md`:** Documentar as seções `## [1.0.0] - YYYY-MM-DD` e `## [0.1.0] - YYYY-MM-DD` utilizando o padrão *Keep a Changelog*.
3. **Fusão e Tag Imutável:**
   ```bash
   # Integração em Produção (main)
   git checkout main && git pull origin main
   git merge release/v1.0.0 --no-ff -m "chore: merge release/v1.0.0 into main"
   git tag -a v1.0.0 -m "Release 1.0.0 | RF01 Listar Receitas + RF03 Cadastrar | Issues: #1, #2"
   git push origin main v1.0.0

   # Retroalimentação em desenvolvimento (develop)
   git checkout develop
   git merge release/v1.0.0 --no-ff -m "chore: merge release/v1.0.0 into develop"
   git push origin develop
   
   # Limpeza
   git branch -d release/v1.0.0
   

```

4. **GitHub Release:** Publicar a release na interface do GitHub vinculada à tag `v1.0.0`.

---

### 🚨 Fase 6: Hotfix `v1.0.1` — Correção Urgente em Produção

**Pilar GCS: Integração dos 4 Pilares**

* **Problema detectado:** Formulário aceita `porcoes = 0`, quebrando a regra de negócio `RN06`.
* **Regra de Ouro:** O Hotfix **DEVE** nascer do `main`, nunca de `develop`.

1. **Issue de Bug (#3):** Criar a issue detalhando o comportamento incorreto com as labels `bug`, `hotfix`, `production`.
2. **Isolamento do Erro:**

```bash
git checkout main && git pull origin main
git checkout -b hotfix/validacao-porcoes


```

```
3. **Correção e Commit:** Corrigir a validação no frontend e backend.
   ```bash
   git add .
   git commit -m "fix(frontend): corrigir validacao de porcoes minimo 1 (#3)"
   git push origin hotfix/validacao-porcoes
   

```

4. **Fechamento e Propagação Dupla (Obrigatória):**

```bash
# 1. Aplicar em Produção (main)
git checkout main
git merge hotfix/validacao-porcoes --no-ff -m "fix: merge hotfix/validacao-porcoes into main"
git tag -a v1.0.1 -m "Hotfix 1.0.1 | corrigida validacao de porcoes minimo 1 (#3)"
git push origin main v1.0.1

# 2. Propagar para Desenvolvimento (develop)
git checkout develop
git merge hotfix/validacao-porcoes --no-ff -m "fix: merge hotfix/validacao-porcoes into develop"

# 3. Registrar a alteração no status
# Atualizar o CHANGELOG.md adicionando a seção [1.0.1]
git add CHANGELOG.md
git commit -m "docs: atualizar CHANGELOG com hotfix v1.0.1"
git push origin develop

# Limpeza
git branch -d hotfix/validacao-porcoes


```

```

---

## 🗺️ 3. Matriz de Rastreabilidade

| Requisito / Bug | Issue | Branch de Origem | Destino do Merge | Baseline (Tag) |
| :--- | :---: | :--- | :--- | :---: |
| **RF01** – Listar Receitas | `#1` | `feature/listar-receitas` | `develop` | `v1.0.0` |
| **RF03** – Cadastrar Receita | `#2` | `feature/cadastrar-receita` | `develop` | `v1.0.0` |
| **RN06** – Bug Porções = 0 | `#3` | `hotfix/validacao-porcoes` | `main` e `develop` | `v1.0.1` |

---

## 🎒 4. Checklist de Entregáveis para Validação (Auditoria Final)

Antes de finalizar, verifique se todos os itens estão visíveis no repositório remoto:
- [ ] Monorepo estruturado com as pastas `/backend` e `/frontend`.
- [ ] Branches `main` e `develop` publicados.
- [ ] Regra de *Branch Protection* configurada no `main`.
- [ ] Issues `#1`, `#2` e `#3` devidamente registradas, rotuladas e fechadas.
- [ ] Pull Requests `#1` e `#2` mergeados com sucesso para o `develop` exibindo a validação **verde** do GitHub Actions.
- [ ] Arquivo `.github/workflows/ci.yml` funcional na raiz.
- [ ] Tags de versão anotadas: `v0.1.0`, `v1.0.0` e `v1.0.1`.
- [ ] `CHANGELOG.md` preenchido com o histórico completo de modificações.
- [ ] Interface do GitHub Releases contendo a publicação oficial da `v1.0.0`.
- [ ] Documento `README.md` principal com instruções claras de execução locais para o ecossistema Spring Boot e Angular.

```
