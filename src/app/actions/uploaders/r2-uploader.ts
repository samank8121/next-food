import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FileUploader } from './uploader';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export const r2Uploader: FileUploader = {
  async upload(formData) {
    const files = formData.getAll('files') as File[];
    if (!files.length) return { success: false, message: 'No files provided' };

    const urls = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

        await s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
            Metadata: { 'Cache-Control': 'public, max-age=31536000' },
          })
        );

        return `${process.env.R2_PUBLIC_URL}/${fileName}`;
      })
    );

    return { success: true, message: `Uploaded ${files.length} file(s)`, urls };
  },
};
