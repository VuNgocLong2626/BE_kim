import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  categoryCreateDTO,
  categoryDTO,
  categoryUpdateDTO,
  categorydeleteDTO,
} from 'src/dto/category.dto';
import { MealService } from 'src/meal/meal.service';
import { PrismaService, S3Service } from 'src/until';

@Injectable()
export class CategoryService {
  constructor(
    private readonly S3Service: S3Service,
    private prisma: PrismaService,
    private mealService: MealService,
  ) {}

  async createCategory(
    files: Express.Multer.File,
    data: categoryCreateDTO,
  ): Promise<categoryDTO> {
    const findCategory = await this.prisma.category.findFirst({
      where: {
        name: data.name,
      },
    });
    if (findCategory) {
      throw new HttpException(
        { message: 'Category already exists' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
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

  async deleteAllCategory(data: string) {
    //check id category
    const category = await this.prisma.category.findFirst({
      where: {
        id: data,
      },
    });

    if (!category) {
      throw new HttpException(
        { message: 'Category not found' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    // //get all meal
    // const mealAll = await this.prisma.meal.findMany({
    //   where: {
    //     id_category: category.id,
    //   },
    // });
    // //delete all meal
    // mealAll.map(async (element) => {
    //   await this.mealService.deleteMeal({ id: element.id });
    // });
    const categoryDelete = await this.prisma.category.delete({
      where: {
        id: data,
      },
    });

    return categoryDelete;
  }
}
