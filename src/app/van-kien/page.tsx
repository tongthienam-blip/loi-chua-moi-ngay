import { redirect } from 'next/navigation';

export default function VanKienPage() {
  redirect('/nghien-cuu?tab=documents');
}
