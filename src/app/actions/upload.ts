'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Configure the S3 client to work with Cloudflare R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export async function uploadFilesToR2(formData: FormData) {
  try {
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return {
        success: false,
        message: 'No files provided',
      };
    }

    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: fileName,
          Body: buffer,
          ContentType: file.type,
          Metadata: {
            'Cache-Control': 'public, max-age=31536000',
          },
        })
      );

      return `${process.env.R2_PUBLIC_URL}/${fileName}`;
    });

    const urls = await Promise.all(uploadPromises);

    return {
      success: true,
      message: `Successfully uploaded ${files.length} file(s)`,
      urls,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      message: 'Failed to upload files',
    };
  }
}
