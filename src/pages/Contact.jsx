import { useState } from 'react'
const blank = { name: '', email: '', subject: '', message: '' }
export default function Contact() {
  const [f, setF] = useState(blank), [err, setErr] = useState({}), [done, setDone] = useState(false)
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setDone(false) }
  const submit = (e) => {
    e.preventDefault()
    const n = {}
    if (!f.name.trim()) n.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) n.email = 'Enter a valid email address.'
    if (!f.subject.trim()) n.subject = 'Enter a subject.'
    if (f.message.trim().length < 10) n.message = 'Message must be at least 10 characters.'
    setErr(n)
    if (!Object.keys(n).length) { setDone(true); setF(blank) }
  }
  const row = (k, label, el = 'input', p = {}) => { const Tag = el; return <label className={el === 'textarea' ? 'wide' : ''}>{label}<Tag value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} {...p} />{err[k] && <span className="err" role="alert">{err[k]}</span>}</label> }
  return (
    <main className="page">
      <h1>Contact</h1>
      <form className="form" onSubmit={submit} noValidate>
        {row('name', 'Name')}{row('email', 'Email', 'input', { type: 'email' })}{row('subject', 'Subject')}{row('message', 'Message', 'textarea', { rows: 5 })}
        <button className="btn wide" type="submit">Send message</button>
        {done && <p className="ok wide" role="status">Form validated. This demo has no backend, so nothing was sent.</p>}
      </form>
    </main>
  )
}
