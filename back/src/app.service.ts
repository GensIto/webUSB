import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { PrismaService } from './prisma/prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
@UseInterceptors(FileInterceptor('image'))
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDto) {
    const { images } = dto;

    const imagePromises = images.map(async (image) => {
      return await this.prisma.image.create({
        data: {
          url: image.url,
        },
      });
    });

    return await Promise.all(imagePromises);
  }

  findAll() {
    return this.prisma.image.findMany({});
  }
}
