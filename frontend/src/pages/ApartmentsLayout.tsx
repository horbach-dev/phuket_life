import { Outlet } from 'react-router-dom';
import { ApartmentsProvider } from '@/context/ApartmentsContext';

export default function ApartmentsLayout() {
  return (
    <ApartmentsProvider>
      <Outlet />
    </ApartmentsProvider>
  );
}
