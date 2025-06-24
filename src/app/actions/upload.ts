'use server';

import { r2Uploader } from './uploaders/r2-uploader';
import { vercelUploader } from './uploaders/vercel-uploader';
import type { FileUploader } from './uploaders/uploader';

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
