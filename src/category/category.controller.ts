import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipeBuilder,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  categoryCreateDTO,
  categoryDTO,
  categoryUpdateDTO,
} from 'src/dto/category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5242880 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() data: categoryCreateDTO,
  ): Promise<categoryDTO> {
    // this.categoryService.createCategory(files, data);
    return await this.categoryService.createCategory(file, data);
  }

  @Put('update-all')
  @UseInterceptors(FileInterceptor('file'))
  async updateCategory(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5242880 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() data: categoryUpdateDTO,
  ) {
    return await this.categoryService.updateAllCategory(file, data);
    // console.log(file);
  }

  @Get('get-all')
  async getAllCategory() {
    return this.categoryService.getAllCategory();
  }
}
