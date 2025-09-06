'use client';
import { useState } from 'react';

export default function Page() {
  const [out, setOut] = useState('');
  const [loading, setLoading] = useState(false);

  const testContact = async () => {
    setLoading(true);
    setOut('Testing...');
    
    try {
      const testData = {
        name: 'Test User', 
        email: 'test@example.com', 
        message: 'Test message',
        privacy: true,
        policyVersion: '2025-09-01',
        policyUrl: `${window.location.origin}/privacidad`,
        policyText: 'He leído y acepto la Política de Privacidad'
      };

      console.log('Testing with data:', testData);
      
      const res = await fetch('https://ujbnqyeqrkheflvbrwat.supabase.co/functions/v1/smart-worker', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(testData),
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      
      const json = await res.json();
      console.log('Response body:', json);
      
      setOut(JSON.stringify({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: json
      }, null, 2));
      
    } catch (error) {
      console.error('Test error:', error);
      setOut(`Error: ${error.message}\nStack: ${error.stack}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Smart Worker test</h1>
      <button 
        onClick={testContact} 
        disabled={loading}
        className="rounded px-4 py-2 border bg-blue-500 text-white disabled:opacity-50"
      >
        {loading ? 'Probando...' : 'Probar formulario contacto completo'}
      </button>
      <pre className="text-sm mt-4">{out}</pre>
    </main>
  );
}