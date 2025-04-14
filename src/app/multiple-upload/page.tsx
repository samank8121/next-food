import FileUploader from '@/components/file-uploader';
import { uploadFilesToR2 } from '../actions/upload';

export default function MultipleUpload() {
  return (
    <main className='container mx-auto py-10 px-4'>
      <h1 className='text-2xl font-bold mb-6'>File Uploader</h1>

      <div className='max-w-xl mx-auto'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Upload Files to R2</h2>
          <FileUploader
            multiple={true}
            maxSize={5}
            acceptedTypes={['image/*', 'application/pdf']}
            onUpload={uploadFilesToR2}
          />
        </div>
      </div>
    </main>
  );
}
