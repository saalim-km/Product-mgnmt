import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}

  @Get('top-products')
  topProducts(@Query('limit') limit: string) {
    const n = limit ? parseInt(limit) : 5;
    return this.reportService.getTopProducts(n)
  }
}