import { ProductCards } from '@/components/ProductCards';

export default function DashboardServicesPage() {
  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold text-dark mb-6'>Products</h1>
      <ProductCards />
    </div>
  );
}
