'use client';

import { useState, type FormEvent } from 'react';

export function ContactForm({ kind }: { kind: 'demo' | 'inquiry' }) {
  const [prepared, setPrepared] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const subject = kind === 'demo' ? `INVO demoaja soov — ${company || name}` : `INVO päring — ${company || name}`;
    const body = `Nimi: ${name}\nE-post: ${email}\nEttevõte: ${company || '—'}\n\n${message}`;
    setPrepared(true);
    window.location.href = `mailto:tere@invo.ee?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return <form className="contact-form" onSubmit={submit}><p className="form-note">Täida väljad. Nupu vajutamisel avaneb sinu e-posti rakendus valmis kirjaga. Päring läheb teele siis, kui saadad kirja sealt.</p><div className="form-grid"><label>Nimi <input name="name" type="text" autoComplete="name" required maxLength={100} /></label><label>E-post <input name="email" type="email" autoComplete="email" required maxLength={200} /></label></div><label>Ettevõte <input name="company" type="text" autoComplete="organization" maxLength={150} /></label><label>{kind === 'demo' ? 'Mida soovid demos näha?' : 'Kuidas saame aidata?'} <textarea name="message" rows={5} required maxLength={2000} /></label><button className="button" type="submit">{kind === 'demo' ? 'Koosta demoaja soov' : 'Koosta päring'}</button>{prepared && <p role="status">E-posti rakendus peaks avanema. Kui seda ei juhtunud, kirjuta aadressile <a href="mailto:tere@invo.ee">tere@invo.ee</a>.</p>}</form>;
}

