import { Body, Controller, Get, Post } from '@nestjs/common';
import { AboutService } from './about.service';
import { aboutDTO } from 'src/dto/about';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post('create')
  async createAbout(@Body() data: aboutDTO): Promise<aboutDTO> {
    return await this.aboutService.createAbout(data);
  }

  @Get('getAll')
  async getAllAbout(): Promise<aboutDTO> {
    return aboutDTO.plainToClass(await this.aboutService.getAllAbout());
  }
}
