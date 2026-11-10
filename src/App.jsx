import { useState } from 'react'

const profiles = [
  { id: 'doggo', name: 'Secure Doggo', role: 'Lead Security Engineer', emoji: '🐺', posts: '512', followers: '9.1M', following: '102', c1: '#00e5ff', c2: '#ff2d55' },
  { id: 'cat', name: 'Cyber Cat', role: 'Lead Robotics Engineer', emoji: '🐱', posts: '412', followers: '5.3M', following: '301', c1: '#ff2d55', c2: '#00e5ff' },
]

function ProfileCard({ p, active, onToggle }) {
  const [chat, setChat] = useState(false)
  const [msg, setMsg] = useState('')
  const [toast, setToast] = useState('')

  const flash = (html) => {
    setToast(html)
    setTimeout(() => setToast(''), 1800)
  }
  const stop = (e) => e.stopPropagation()

  const follow = (e) => {
    stop(e)
    flash(`You are now following <b>${p.name}</b>`)
  }
  const send = (e) => {
    stop(e)
    setChat(false)
    setMsg('')
    flash(`Message sent to <b>${p.name}</b>`)
  }

  return (
    <div
      className={`profile-card ${active ? 'active' : ''}`}
      style={{ '--c1': p.c1, '--c2': p.c2 }}
      onClick={onToggle}
    >
      <div className="card-bg" />
      <div className="avatar">
        <span>{p.emoji}</span>
      </div>

      <div className="card-content">
        <h3 className="profile-name">{p.name}</h3>
        <p className="profile-role">{p.role}</p>

        <div className="extra">
          <div className="stats">
            <div><b>{p.posts}</b><span>Posts</span></div>
            <div><b>{p.followers}</b><span>Followers</span></div>
            <div><b>{p.following}</b><span>Following</span></div>
          </div>
          <div className="actions">
            <button className="btn follow" onClick={follow}>Follow</button>
            <button className="btn message" onClick={(e) => { stop(e); setChat(true) }}>Message</button>
          </div>
        </div>
      </div>

      {chat && (
        <div className="chat" onClick={stop}>
          <div className="chat-head">
            <span>{p.name}</span>
            <button onClick={() => setChat(false)}>✕</button>
          </div>
          <div className="chat-body">Hey! How can I help you?</div>
          <div className="chat-input">
            <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message..." />
            <button onClick={send}>Send</button>
          </div>
        </div>
      )}

      {toast && <div className="toast" dangerouslySetInnerHTML={{ __html: toast }} />}
    </div>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState('doggo')
  return (
    <main className="stage">
      {profiles.map((p) => (
        <ProfileCard
          key={p.id}
          p={p}
          active={activeId === p.id}
          onToggle={() => setActiveId(activeId === p.id ? null : p.id)}
        />
      ))}
    </main>
  )
}