/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as fs from 'fs';
import { Multer } from 'multer';
import * as path from 'path';
import { Observable } from 'rxjs';

import { multerOptions } from '../app.controller';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Injectable()
export class FileCompressionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();

      if (req.file) {
        const file = req.file as Express.Multer.File;

        if (fs.existsSync(file.path)) {
          if (file.mimetype === 'application/pdf') {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const gs = require('ghostscript4js');
            const version = gs.version();
            const fileName = file.filename;
            const outputPath = path.join(
              multerOptions.dest,
              'compressed',
              fileName
            );
            console.log;
            const args = `-q -dNOPAUSE -dBATCH -dSAFER -sDEVICE=pdfwrite -dCompatibilityLevel=1.3 -dPDFSETTINGS=/ebook -dEmbedAllFonts=true -dSubsetFonts=true -dAutoRotatePages=/None -dColorImageDownsampleType=/Bicubic -dColorImageResolution=72 -dGrayImageDownsampleType=/Bicubic -dGrayImageResolution=72 -dMonoImageDownsampleType=/Subsample -dMonoImageResolution=72 -sOutputFile=${outputPath} ${file.path}`;
            console.log(`Starting: GhostScript v${version}`);
            console.log(`Input File: ${file.path}`);
            console.log(`Output File: ${outputPath}`);

            gs.execute(args, (err) => {
              if (err) {
                console.log(`GhostScript Error: ${err}`);
              }
            });
          }
        }
      }
    }

    return next.handle();
  }
}
