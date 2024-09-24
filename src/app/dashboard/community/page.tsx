import { CommunityCards } from '@/components/CommunityCards';

export default function DashboardCommunityPage() {
  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold text-dark mb-6'>Community</h1>
      <CommunityCards />
    </div>
  );
}
