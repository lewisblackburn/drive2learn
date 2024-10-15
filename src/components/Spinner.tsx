import { Loader } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function Spinner({ className }: { className?: string }) {
  return (
    <Loader className={cn('text-gray-500 animate-spin', className)} size={20} />
  );
}
