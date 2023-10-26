import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { mealDTO, mealDeleteDTO } from 'src/dto';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get('get-all')
  async getAll() {
    return this.mealService.getAllMeal();
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  async createMeal(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5242880 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
    @Body() data: mealDTO,
  ) {
    return this.mealService.createMeal(files, data);
  }

  @Put('update')
  @UseInterceptors(FilesInterceptor('files'))
  async updateCategory(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5242880 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
    @Body() data: mealDTO,
  ) {}

  @Delete('delete')
  async deleteCategory(@Param('id') id: string) {
    return this.mealService.deleteMeal({ id });
  }
}
