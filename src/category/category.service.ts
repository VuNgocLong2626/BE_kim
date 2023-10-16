import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  categoryCreateDTO,
  categoryDTO,
  categoryUpdateDTO,
} from 'src/dto/category.dto';
import { PrismaService } from 'src/until';
import { S3Service } from 'src/until/handle.s3';

@Injectable()
export class CategoryService {
  constructor(
    private readonly S3Service: S3Service,
    private prisma: PrismaService,
  ) {}

  async createCategory(
    files: Express.Multer.File,
    data: categoryCreateDTO,
  ): Promise<categoryDTO> {
    const fileName = await this.S3Service.upload(files);
    const dataCategory = await this.prisma.category.create({
      data: {
        name: data.name,
        url: fileName,
      },
    });
    const url = await this.S3Service.getLinkMediaKey(dataCategory.url);
    const res = { ...dataCategory, url };
    return categoryDTO.plainToClass(res);
  }

  async getAllCategory(): Promise<categoryDTO[]> {
    const dataCategory = await this.prisma.category.findMany();
    dataCategory.map((element) => {
      element.url = this.S3Service.getLinkMediaKey(element.url);
    });

    return dataCategory;
  }

  async updateAllCategory(files: Express.Multer.File, data: categoryUpdateDTO) {
    const category = await this.prisma.category.findFirst({
      where: {
        id: data.id,
      },
    });

    // const fileName = await this.S3Service.upload(files);
    const [fileName, _] = await Promise.all([
      this.S3Service.upload(files),
      this.S3Service.deleteFileS3(category.url),
    ]);
    const _1 = await this.prisma.category.updateMany({
      where: {
        id: category.id,
      },
      data: {
        name: data.name,
        url: fileName,
      },
    });
    const url = await this.S3Service.getLinkMediaKey(fileName);
    const res = { ...data, url };
    return categoryDTO.plainToClass(res);
  }
}
