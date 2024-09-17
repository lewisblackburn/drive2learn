import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';

export default function CommunityPage() {
  return (
    <main className='flex flex-col min-h-screen'>
      <header>
        <Navbar />
      </header>

      <section>
        <PageHeader
          title='Communtiy'
          description='Look at our community'
          image='/images/headers/5.jpg'
        />
      </section>
    </main>
  );
}
