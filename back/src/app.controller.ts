import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() createImageDto: CreateDto): Promise<any> {
    return await this.appService.create(createImageDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return await this.appService.findAll();
  }
}
