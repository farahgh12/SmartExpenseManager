import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Components/Layout';

export default function Settings() {
  return (
    <AppLayout title="Paramètres">
      <Head title="Paramètres" />
      <div className="p-8 text-center bg-earth-100/30 rounded-xl border border-dashed border-earth-200">
        Paramètres du compte en cours de développement...
      </div>
    </AppLayout>
  );
}
