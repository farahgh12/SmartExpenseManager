import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Components/Layout';

export default function Notifications() {
  return (
    <AppLayout title="Notifications">
      <Head title="Notifications" />
      <div className="p-8 text-center bg-earth-100/30 rounded-xl border border-dashed border-earth-200">
        Notifications et alertes en cours de développement...
      </div>
    </AppLayout>
  );
}
