'use client';

import { useState } from 'react';

export default function SmartWorkerButton() {
  const [out, setOut] = useState<string>('');

  const call = async () => {
    const res = await fetch(
      'https://ujbnqyeqrkheflvbrwat.supabase.co/functions/v1/smart-worker',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Lovable' }),
      }
    );
    const json = await res.json();
    setOut(JSON.stringify(json));
  };

  return (
    <div className="space-y-2">
      <button onClick={call} className="rounded px-3 py-2 border">
        Probar smart-worker
      </button>
      <pre className="text-sm">{out}</pre>
    </div>
  );
}