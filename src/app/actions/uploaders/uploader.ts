// uploaders/uploader.ts
export interface FileUploader {
  upload(formData: FormData): Promise<{
    success: boolean;
    message: string;
    urls?: string[];
  }>;
}
