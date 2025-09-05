import { useState } from 'react';

const WORKER_URL = 'https://ujbnqyeqrkheflvbrwat.supabase.co/functions/v1/smart-worker';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [serverId, setServerId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    setServerId(null);
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const message = String(fd.get('message') || '').trim();
    const privacy = (form.querySelector('input[name="privacy"]') as HTMLInputElement)?.checked;
    if (!privacy) { setLoading(false); setErrorMsg('Debes aceptar la privacidad'); return; }
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const json = await res.json();
      if (!res.ok || json.ok === false) throw new Error(json.error || 'Fallo al enviar');
      setServerId(json.id);
      // Si existe estado de éxito (submitted/showSuccess), actívalo aquí:
      // setSubmitted?.(true); setShowSuccess?.(true);
    } catch (err:any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 640, margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Contacto</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
        <input
          required
          name="name"
          placeholder="Tu nombre"
          style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: 8 }}
        />
        <input
          required
          name="email"
          type="email"
          placeholder="tu@email.com"
          style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: 8 }}
        />
        <textarea
          required
          name="message"
          placeholder="Tu mensaje"
          rows={5}
          style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: 8 }}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" name="privacy" required />
          Acepto la política de privacidad
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '0.7rem 1rem', borderRadius: 8, border: '1px solid #000', background: '#000', color: '#fff' }}
        >
          {loading ? 'Enviando…' : 'Enviar'}
        </button>
      </form>
      {serverId && <p style={{marginTop:8,fontFamily:'monospace'}}>ID: {serverId}</p>}
      {errorMsg && <p style={{marginTop:8,color:'red',fontFamily:'monospace'}}>Error: {errorMsg}</p>}
    </main>
  );
}