import fs from 'fs';
import path from 'path';
import uploadCofig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiakStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadCofig.tmpFolder, file),
      path.resolve(uploadCofig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadCofig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}

export default DiakStorageProvider;
