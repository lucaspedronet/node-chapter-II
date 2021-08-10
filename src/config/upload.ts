import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

type Return = {
  storage: multer.StorageEngine;
};

const uploadConfig = {
  update(folder: string): Return {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(8).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};

export { uploadConfig };
