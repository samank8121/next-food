import { notFound } from 'next/navigation';
import { CategoryForm } from '@/components/categories/category-form';
import { getCategoryById } from '@/app/actions/category';

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: 'Edit Category',
  description: 'Edit an existing food category',
};

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const category = await getCategoryById(params.id);

  if (!category) {
    notFound();
  }

  return (
    <div className='container py-10'>
      <h1 className='text-3xl font-bold mb-8'>Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
