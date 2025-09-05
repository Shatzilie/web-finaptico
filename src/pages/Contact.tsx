import { useState } from 'react';

const WORKER_URL = 'https://ujbnqyeqrkheflvbrwat.supabase.co/functions/v1/smart-worker';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOut(null);
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const json = await res.json();
      if (!res.ok || json.ok === false) {
        throw new Error(json.error || 'Error al enviar');
      }
      setOut('¡Mensaje enviado! ID: ' + json.id);
      setName(''); setEmail(''); setMessage('');
    } catch (err:any) {
      setOut('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 640, margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Contacto</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
        <input
          required
          placeholder="Tu nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: 8 }}
        />
        <input
          required
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: 8 }}
        />
        <textarea
          required
          placeholder="Tu mensaje"
          rows={5}
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: 8 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '0.7rem 1rem', borderRadius: 8, border: '1px solid #000', background: '#000', color: '#fff' }}
        >
          {loading ? 'Enviando…' : 'Enviar'}
        </button>
      </form>
      {out && <p style={{ marginTop: '1rem', fontFamily: 'monospace' }}>{out}</p>}
    </main>
  );
}