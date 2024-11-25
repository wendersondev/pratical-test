import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { ProcessOrderUseCase } from '../../domain/usecase/process-order.usecase';
import { Order } from '../../domain/model/order.model';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let processOrderUseCase: ProcessOrderUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: ProcessOrderUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    ordersController = module.get<OrdersController>(OrdersController);
    processOrderUseCase = module.get<ProcessOrderUseCase>(ProcessOrderUseCase);
  });

  it('should handle order created event', async () => {
    const data = { id: 11, amount: 1000, status: 'CONFIRMADO' };

    await ordersController.handleOrderCreated(data);

    expect(processOrderUseCase.execute).toHaveBeenCalledWith({
      id: data.id,
      amount: data.amount,
      status: data.status,
    });
  });
});
