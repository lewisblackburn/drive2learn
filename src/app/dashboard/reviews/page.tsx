import { DataTableDemo } from '@/app/dashboard/reviews/data-table';

export default function DashboardReviewsPage() {
  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold text-dark mb-6'>Reviews</h1>
      {/* <ReviewForm /> */}
      <DataTableDemo />
    </div>
  );
}
