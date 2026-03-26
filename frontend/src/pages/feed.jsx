import React, { useEffect, useState } from 'react'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/posts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      setPosts(data.posts)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts. Make sure the server is running.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="feed-section">
        <div className="feed-container">
          <div className="feed-header">
            <div className="feed-header-content">
              <div className="feed-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
              </div>
              <div>
                <h1 className="feed-title">Feed</h1>
                <p className="feed-subtitle">Loading posts...</p>
              </div>
            </div>
          </div>
          <div className="feed-loading">
            <div className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
            <div className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="feed-section">
        <div className="feed-container">
          <div className="feed-error">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchPosts}>Try Again</button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="feed-section">
      <div className="feed-container">
        {/* Header */}
        <div className="feed-header">
          <div className="feed-header-content">
            <div className="feed-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" />
              </svg>
            </div>
            <div>
              <h1 className="feed-title">Feed</h1>
              <p className="feed-subtitle">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
            </div>
          </div>
          <button className="refresh-btn" onClick={fetchPosts} title="Refresh">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="feed-empty">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <h2 className="empty-title">No posts yet</h2>
            <p className="empty-text">Create your first post to see it here!</p>
            <a href="/createpost" className="empty-cta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Post
            </a>
          </div>
        ) : (
          <div className="feed-posts">
            {posts.map((post, index) => (
              <article
                key={post._id}
                className="post-card"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="post-image-wrapper">
                  <img
                    src={post.image}
                    alt={post.caption || 'Post image'}
                    className="post-image"
                    loading="lazy"
                  />
                </div>
                {post.caption && (
                  <div className="post-body">
                    <p className="post-caption">{post.caption}</p>
                  </div>
                )}
                <div className="post-footer">
                  <div className="post-actions">
                    <button className="action-btn" title="Like">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                    <button className="action-btn" title="Comment">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </button>
                    <button className="action-btn" title="Share">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Feed