'use client';
import { useState } from 'react';

export default function Page() {
  const [out, setOut] = useState('');
  const call = async () => {
    const res = await fetch('https://ujbnqyeqrkheflvbrwat.supabase.co/functions/v1/smart-worker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Lovable' }),
    });
    const json = await res.json();
    setOut(JSON.stringify(json));
  };
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Smart Worker test</h1>
      <button onClick={call} className="rounded px-3 py-2 border">Probar smart-worker</button>
      <pre className="text-sm mt-4">{out}</pre>
    </main>
  );
}