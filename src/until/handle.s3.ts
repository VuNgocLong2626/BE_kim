import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
    async upload(file): Promise<string> {
        const { originalname } = file; //originalname: '138591.png',
        const fileName = originalname.toString().split('.');
        fileName[0] = uuid();
        const bucketS3 = 'retaurant';
        await this.uploadS3(file.buffer, bucketS3, fileName.join('.'));
        return fileName.join('.')
    }

    async uploadS3(file, bucket, name) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
            if (err) {
                Logger.error(err);
                reject(err.message);
            }
            resolve(data);
            });
        });
    }

    getS3() {
        return new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    getLinkMediaKey(media_key: string = '138591.png') {
      const s3 = this.getS3();
      return s3.getSignedUrl('getObject', {
        Key: media_key,
        Bucket: 'retaurant',
        Expires: 60 * 60 * 12,
      });
    }

    async deleteFileS3(media_key: string = '138591.png') {

      const s3 = this.getS3();
      const params = {
        Bucket: 'retaurant',
        Key: media_key,
      };
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      s3.deleteObject(params, (err, data) => {});
      return true;
    }
}