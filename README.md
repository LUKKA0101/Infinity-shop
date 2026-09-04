# Infinity Shop

> ⚠️ **Projeto em desenvolvimento.** Construído para portfólio e estudo, não é destinado a produção. Estrutura, funcionalidades e endpoints ainda estão sendo implementados.

API REST de e-commerce construída com NestJS, com foco em boas práticas de validação, arquitetura modular e segurança (regras de negócio sensíveis — como preço e permissões — protegidas no backend, nunca confiando em dados vindos do cliente).

## Stack

- **NestJS** + TypeScript
- **TypeORM** (PostgreSQL)
- **class-validator** / **class-transformer** para validação de DTOs
- **Docker** + Docker Compose
- **Jest** para testes
- ESLint + Prettier
## Status do projeto

Em desenvolvimento inicial. Até o momento:

- [x] Modelagem das entities (User, Address, Product, Category, Cart, CartItem, Order, OrderItem, Payment, Coupon)
- [x] DTOs de validação (Create/Update/Response) para os módulos principais
- [ ] Configuração do `ValidationPipe` global
- [ ] Conexão do TypeORM à aplicação
- [ ] Implementação dos services e regras de negócio
- [ ] Implementação dos controllers e endpoints
- [ ] Autenticação (JWT)
- [ ] Carrinho de compras
- [ ] Criação de pedidos e cálculo de total
- [ ] Pagamento simulado (Pix / crédito / débito)
- [ ] Cupons de desconto
- [ ] Cálculo de frete
- [ ] Notificação por e-mail
- [ ] Testes automatizados
## Rodando o projeto

### Com Docker

```bash
docker-compose up
```

### Localmente

```bash
npm install
npm run start:dev
```

### Testes

```bash
npm run test
npm run test:e2e
```

## Estrutura

Organizado por módulos (`src/modules`), cada um com sua entity e DTOs (Create/Update/Response): `user`, `address`, `product`, `category`, `cart`, `cart-item`, `order`, `order-item`, `payment`, `coupon`.

## Autor

Lucas — [GitHub](https://github.com/LUKKA0101)
