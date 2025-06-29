'use server';

import { r2Uploader } from './upload/r2-uploader';
import { vercelUploader } from './upload/vercel-uploader';
import type { FileUploader } from './upload/uploader';

const strategies: Record<string, FileUploader> = {
  r2: r2Uploader,
  vercel: vercelUploader,
};

export async function uploadFiles(formData: FormData, provider: string) {
  const uploader = strategies[provider];
  if (!uploader) {
    return { success: false, message: `Unknown provider: ${provider}` };
  }
  return uploader.upload(formData);
}
