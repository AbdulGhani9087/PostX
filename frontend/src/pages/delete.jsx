import React, { useEffect, useState } from 'react'

const Delete = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      setPosts(data.posts)
    } catch (err) {
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      setDeletingId(id)
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/deletepost/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (res.ok) {
        setSuccess(id)
        setTimeout(() => {
          setPosts(posts.filter(p => p._id !== id))
          setSuccess(null)
          setConfirmId(null)
        }, 600)
      }
    } catch (err) {
      console.error('Error deleting post:', err)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="delete-section">
      <div className="delete-container">
        {/* Header */}
        <div className="delete-header">
          <a href="/" className="back-btn" title="Back to home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </a>
          <div className="delete-header-content">
            <div className="delete-icon-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <div>
              <h1 className="delete-title">Delete Posts</h1>
              <p className="delete-subtitle">Remove posts permanently</p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="delete-loading">
            <div className="spinner"></div>
            <p>Loading posts...</p>
          </div>
        )}

        {/* No posts */}
        {!loading && posts.length === 0 && (
          <div className="delete-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p>No posts to delete.</p>
            <a href="/createpost" className="empty-cta">Create Post</a>
          </div>
        )}

        {/* Posts list */}
        {!loading && posts.length > 0 && (
          <div className="delete-posts">
            {posts.map((post, index) => (
              <div
                key={post._id}
                className={`delete-post-card ${success === post._id ? 'deleting-out' : ''}`}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="delete-post-row">
                  <img src={post.image} alt={post.caption || 'Post'} className="delete-post-thumb" />
                  <div className="delete-post-info">
                    <p className="delete-post-caption">{post.caption || <span className="no-caption">No caption</span>}</p>
                  </div>

                  {confirmId === post._id ? (
                    <div className="confirm-actions">
                      <button
                        className="confirm-delete-btn"
                        onClick={() => handleDelete(post._id)}
                        disabled={deletingId === post._id}
                      >
                        {deletingId === post._id ? (
                          <span className="spinner-small"></span>
                        ) : (
                          'Yes, Delete'
                        )}
                      </button>
                      <button className="cancel-delete-btn" onClick={() => setConfirmId(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="delete-btn"
                      onClick={() => setConfirmId(post._id)}
                      title="Delete post"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Delete
