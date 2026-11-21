import { Link } from 'react-router-dom'
export default function EmptyState({ title, text, to, cta }) {
  return <div className="empty"><h2>{title}</h2><p>{text}</p>{to && <Link className="btn" to={to}>{cta}</Link>}</div>
}
