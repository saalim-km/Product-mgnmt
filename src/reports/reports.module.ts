import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ProductModule } from '../product/product.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [ProductModule,OrdersModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
