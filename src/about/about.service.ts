import { Injectable } from '@nestjs/common';
import { aboutDTO } from 'src/dto/about';
import { PrismaService } from 'src/until';

@Injectable()
export class AboutService {
  constructor(private prisma: PrismaService) {}

  async createAbout(data: aboutDTO): Promise<aboutDTO> {
    const findAbout = await this.prisma.about.findFirst({
      where: {
        id_account: data.id,
      },
    });
    if (!findAbout) {
      return await this.prisma.about.create({
        data: {
          content: data.content,
          id_account: data.id,
        },
      });
    }
    return await this.prisma.about.update({
      where: {
        id_account: data.id,
      },
      data: {
        content: data.content,
      },
    });
  }

  async getAllAbout(): Promise<aboutDTO> {
    return await this.prisma.about.findFirst();
  }
}
