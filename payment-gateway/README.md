# Payment Gateway API

A Payment Gateway API é uma aplicação em NestJS que consome mensagens de pedidos, valida o pagamento e publica o status do pedido de volta no RabbitMQ.

## Pré-requisitos

- Node.js
- npm
- NestJS
- Docker (para RabbitMQ)

## Configuração

### Configurar RabbitMQ

1. Certifique-se de que o Docker está instalado e em execução.
2. Inicie um contêiner RabbitMQ:

   ```sh
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```

## Construção, Execução e Testes

   ```sh
   npm install
   ```

   ```sh
   npm start
   ```

  ```sh
   npm run test
   ```
