import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/until/handle.s3';
import { UserService } from './user.service';
import { Request } from 'express';
import { UserUpdatePasswordDTO } from 'src/dto/user.dto';


@Controller('user')
export class UserController {
  constructor(
    private readonly S3Service: S3Service,
    private readonly UserService: UserService,
) {}

  @Get('user-info')
  async getUser(@Req() req: Request,) {
    return await this.UserService.getUser(req);
  }
  @Put('user-change-password')
  async getUsersChangePassword(
    @Req() req: Request,
    @Body() userUpdate: UserUpdatePasswordDTO,
  ) : Promise<void> {
    return await this.UserService.getUsersChangePassword(req, userUpdate);
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    console.log(file);
    return await this.S3Service.upload(file);
  }

  @Get('url')
  async getUrl() {
    return await this.S3Service.getLinkMediaKey();
  }

  @Delete('delete-file')
  async deleteFile() {
    return await this.S3Service.deleteFileS3();
  }
}
