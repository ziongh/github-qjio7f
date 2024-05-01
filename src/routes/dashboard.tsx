import { createFileRoute } from '@tanstack/react-router';
import { DashBoardLayout } from '../components/DashboardLayout';

export const Route = createFileRoute('/dashboard')({
  component: DashBoardLayout,
});
