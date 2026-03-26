import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Components/Layout';

export default function Budgets() {
  return (
    <AppLayout title="Gestion du Budget">
      <Head title="Budgets" />
      <div className="p-8 text-center bg-earth-100/30 rounded-xl border border-dashed border-earth-200">
        Gestion du Budget en cours de développement...
      </div>
    </AppLayout>
  );
}
