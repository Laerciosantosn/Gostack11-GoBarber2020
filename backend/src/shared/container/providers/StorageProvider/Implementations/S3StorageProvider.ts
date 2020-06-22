import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';
import uploadCofig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiakStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.REGION,
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadCofig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileCOntent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadCofig.config.aws.bucket, // Nome da pasta criada no AWS
        Key: file,
        ACL: 'public-read',
        Body: fileCOntent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadCofig.config.aws.bucket, // Nome dado no AWS
        Key: file,
      })
      .promise();
  }
}

export default DiakStorageProvider;
