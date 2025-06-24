import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { FileUploader } from './uploader';

export const vercelUploader: FileUploader = {
  async upload(formData) {
    const files = formData.getAll('files') as File[];
    if (!files.length) return { success: false, message: 'No files provided' };

    const urls = await Promise.all(
      files.map(async (file) => {
        const blob = await put(file.name, file, {
          access: 'public',
          addRandomSuffix: true,
        });
        revalidatePath('/');
        return blob.url;
      })
    );

    return { success: true, message: `Uploaded ${files.length} file(s)`, urls };
  },
};
