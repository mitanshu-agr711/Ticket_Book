import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(new Error(error.message));
        if (!result) return reject(new Error('Upload failed'));
        resolve(result);
      });

      (toStream(file.buffer) as NodeJS.ReadableStream).pipe(upload);
    });
  }
}
