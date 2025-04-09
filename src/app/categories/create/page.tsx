import { CategoryForm } from '@/components/categories/category-form';

export const metadata = {
  title: 'Create Category',
  description: 'Create a new food category',
};

export default function NewCategoryPage() {
  return (
    <div className='container py-10'>
      <h1 className='text-3xl font-bold mb-8'>Create Category</h1>
      <CategoryForm />
    </div>
  );
}
