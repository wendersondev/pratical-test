import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProcessOrderUseCase } from '../../domain/usecase/process-order.usecase';
import { Order } from '../../domain/model/order.model';

@Controller()
export class OrdersController {
  constructor(private readonly processOrderUseCase: ProcessOrderUseCase) {}

  @EventPattern(undefined)
  async handleOrderCreated(@Payload() data: any) {
    const order: Order = {
      id: data.id,
      amount: data.amount, 
      status: data.status,
    };
    await this.processOrderUseCase.execute(order);
  }
}
