import { Injectable } from '@nestjs/common';
import { mealDTO, mealResDTO } from 'src/dto';
import { PrismaService, S3Service } from 'src/until';

export interface meal {
  name: string;
  id_category: number;
  price: number;
}
@Injectable()
export class MealService {
  constructor(
    private readonly S3Service: S3Service,
    private prisma: PrismaService,
  ) {}

  async createMeal(
    files: Express.Multer.File[],
    data: mealDTO,
  ): Promise<mealResDTO> {
    const dataMeal = await this.prisma.meal.create({
      data: {
        name: data.name,
        id_category: data.id_category,
        price: data.price,
      },
    });

    const result = await files.map(async (element) => {
      const fileName = await this.S3Service.upload(element);
      const [url, _] = await Promise.all([
        this.S3Service.getLinkMediaKey(fileName),
        this.prisma.image.create({
          data: {
            url: fileName,
            id_meal: dataMeal.id,
          },
        }),
      ]);
      return url;
    });
    const res = { ...dataMeal, url: await Promise.all(result) };

    return mealResDTO.plainToClass(res);
  }

  async getAllMeal(): Promise<mealResDTO[]> {
    const dataMeal = await this.prisma.meal.findMany();
    const res = await Promise.all(
      dataMeal.map(async (element) => {
        const image = await this.prisma.image.findMany({
          where: {
            id_meal: element.id,
          },
        });
        const result = image.map((element) => {
          return this.S3Service.getLinkMediaKey(element.url);
        });

        const res = { ...element, url: await Promise.all(result) };
        return res;
      }),
    );

    return res;
  }
}
