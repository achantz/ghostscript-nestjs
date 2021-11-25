/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bind, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as crypto from 'crypto';
import multer = require('multer');

import { AppService } from './app.service';
import { FileCompressionInterceptor } from './interceptors/file-compression.interceptor';

const FILE_DIR = './files';
export const multerOptions = {
  dest: FILE_DIR,
  storage: multer.diskStorage({
    destination: FILE_DIR,
    filename: (req, file, cb) => {
      const ext = file.originalname.substring(
        file.originalname.lastIndexOf('.', file.originalname.length)
      );
      const name = crypto.randomBytes(10).toString('hex');
      cb(null, name + ext);
    },
  }),
} as MulterOptions;

@Controller('file')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', multerOptions),
    FileCompressionInterceptor
  )
  @Bind(UploadedFile())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async single(@UploadedFile() file: Express.Multer.File): Promise<void> {
    return;
  }
}
