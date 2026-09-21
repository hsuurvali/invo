'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

export function PartnerForm() {
  const [prepared, setPrepared] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const company = String(data.get('company') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const clients = String(data.get('clients') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const updates = data.get('updates') === 'on' ? 'Jah, soovin infot võimaliku uudiskirja kohta.' : 'Ei';
    const body = `Ettevõte: ${company}\nE-post: ${email}\nKlientide arv: ${clients}\nUudiskirja huvi: ${updates}\n\nKüsimus: ${message || '—'}`;
    setPrepared(true);
    window.location.href = `mailto:tere@invo.ee?subject=${encodeURIComponent(`INVO raamatupidajate koostööpäring — ${company}`)}&body=${encodeURIComponent(body)}`;
  }

  return <form className="partner-form" onSubmit={submit}><div className="partner-form-grid"><label>Raamatupidamisteenuse pakkuja <span aria-hidden="true">*</span><input name="company" autoComplete="organization" placeholder="Ettevõtte nimi" required maxLength={150}/></label><label className="partner-message">Küsimused või soovid<textarea name="message" placeholder="Kirjelda oma vajadust" rows={5} maxLength={2000}/></label><label>E-post <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" placeholder="E-posti aadress" required maxLength={200}/></label><label>Mitmele ettevõttele teenust pakud? <span aria-hidden="true">*</span><select name="clients" required defaultValue=""><option value="" disabled>Vali vahemik</option><option value="1–10">1–10</option><option value="11–30">11–30</option><option value="31–100">31–100</option><option value="Üle 100">Üle 100</option></select></label></div><div className="partner-consents"><label><input type="checkbox" name="privacy" required/><span>Nõustun <Link href="/privaatsus" className="partner-privacy-link">kasutustingimustega ja olen tutvunud privaatsusteabega</Link>. <small>Kasutustingimuste eraldi link on privaatsuslehel.</small></span></label><label><input type="checkbox" name="updates"/><span>Soovin saada infot INVO uudiskirja avamise kohta. <small>Praegu uudiskirja automaatselt ei saadeta; see valik lisatakse koostööpäringu kirja.</small></span></label></div><div className="partner-form-bottom"><p>Nupu vajutamisel avaneb sinu e-posti rakendus valmis kirjaga. Päring läheb teele, kui saadad kirja sealt.</p><button className="button" type="submit">Saada päring e-postiga</button></div>{prepared && <p className="partner-prepared" role="status">E-posti rakendus peaks avanema. Kui seda ei juhtunud, kirjuta aadressile <a href="mailto:tere@invo.ee">tere@invo.ee</a>.</p>}</form>;
}

