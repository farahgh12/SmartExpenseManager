import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Components/Layout';

export default function History() {
  return (
    <AppLayout title="Historique">
      <Head title="Historique" />
      <div className="p-8 text-center bg-earth-100/30 rounded-xl border border-dashed border-earth-200">
        Historique des transactions en cours de développement...
      </div>
    </AppLayout>
  );
}
