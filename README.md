# Infinity Shop

API REST de e-commerce em desenvolvimento, construída com NestJS, TypeScript e PostgreSQL. O projeto explora arquitetura modular, validação de entrada, autenticação e modelagem de domínio.

> **Status:** projeto de portfólio em desenvolvimento. Nem todos os fluxos de e-commerce estão implementados; não use em produção.

## Tecnologias

- NestJS e TypeScript
- PostgreSQL e TypeORM
- DTOs com `class-validator` e `class-transformer`
- Autenticação com JWT
- Hash de senha com bcrypt
- Docker Compose
- Jest

## Funcionalidades implementadas

- Cadastro e login de usuários
- Validação global dos dados recebidos
- CRUD de produtos e categorias
- Cadastro e gerenciamento de endereços do usuário
- Carrinho associado ao usuário autenticado
- Armazenamento do preço do produto no item do carrinho

## Em desenvolvimento

- Autorização por perfil e propriedade dos recursos
- Criação de pedidos a partir do carrinho
- Atualização de estoque e cálculo do total do pedido
- Fluxo de pagamento simulado
- Aplicação de cupons e cálculo de frete
- Testes unitários e de integração
- Migrations para versionamento do banco de dados

## Requisitos

- Node.js e npm
- Docker e Docker Compose, ou uma instância local de PostgreSQL

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=infinity_shop

JWT_SECRET=troque-por-um-segredo-longo-e-aleatorio
