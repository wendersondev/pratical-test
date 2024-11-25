import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersService } from '../../application/service/orders.service';
import { OrdersController } from '../../application/controller/orders.controller';
import { ProcessOrderUseCase } from '../../domain/usecase/process-order.usecase';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'checkout-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'RESULT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'result-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [OrdersService, ProcessOrderUseCase],
  controllers: [OrdersController],
  exports: [ClientsModule],
})
export class MessagingModule {}
