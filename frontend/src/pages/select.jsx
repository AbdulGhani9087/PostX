import React from 'react'
import { useNavigate } from 'react-router-dom'

const Select = () => {
  const navigate = useNavigate()

  // Safe parse user from localStorage
  let user = null
  try {
    const raw = localStorage.getItem('user')
    if (raw) user = JSON.parse(raw)
  } catch (e) {
    console.error('Failed to parse user from localStorage', e)
  }

  const displayName = user?.username || user?.name || user?.email || 'User'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <section className="select-section">
      <div className="select-container">
        <div className="select-header">
          {/* Left: Logo + Title */}
          <div className="select-header-left">
            <div className="select-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <h1 className="select-title">PostHub</h1>
              <p className="select-subtitle">What would you like to do today?</p>
            </div>
          </div>

          {/* Right: User info + Logout */}
          <div className="select-header-right">
            <div className="select-user-badge">
              <div className="select-user-avatar">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="select-user-info">
                <span className="select-user-label">Logged in as</span>
                <span className="select-user-name">{displayName}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="select-logout-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        <div className="select-grid">
          {/* Create Post */}
          <div className="select-card" onClick={() => navigate('/createpost')}>
            <div className="select-card-icon create">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <h2 className="select-card-title">Create Post</h2>
            <p className="select-card-desc">Upload an image and share it with the world</p>
            <span className="select-card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>

          {/* View Feed */}
          <div className="select-card" onClick={() => navigate('/feed')}>
            <div className="select-card-icon feed">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" />
              </svg>
            </div>
            <h2 className="select-card-title">View Feed</h2>
            <p className="select-card-desc">Browse all posts and discover amazing content</p>
            <span className="select-card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>

          {/* Update Caption */}
          <div className="select-card" onClick={() => navigate('/updatecaption')}>
            <div className="select-card-icon update">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <h2 className="select-card-title">Update Caption</h2>
            <p className="select-card-desc">Edit the caption of your existing posts</p>
            <span className="select-card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>

          {/* Delete Post */}
          <div className="select-card" onClick={() => navigate('/delete')}>
            <div className="select-card-icon delete">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>
            <h2 className="select-card-title">Delete Post</h2>
            <p className="select-card-desc">Remove posts you no longer want to keep</p>
            <span className="select-card-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Select