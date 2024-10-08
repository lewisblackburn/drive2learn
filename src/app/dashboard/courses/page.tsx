import { CourseCards } from '@/components/CourseCards';

export default function DashboardCoursesPage() {
  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold text-dark mb-6'>Courses</h1>
      <CourseCards />
    </div>
  );
}
