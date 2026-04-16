import React, { useEffect, useState } from 'react'

const UpdateCaption = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [newCaption, setNewCaption] = useState('')
  const [updating, setUpdating] = useState(false)
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

  const startEditing = (post) => {
    setEditingId(post._id)
    setNewCaption(post.caption || '')
    setSuccess(null)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setNewCaption('')
  }

  const handleUpdate = async (id) => {
    try {
      setUpdating(true)
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/updatecaption/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ caption: newCaption })
      })
      const data = await res.json()

      if (res.ok) {
        setPosts(posts.map(p => p._id === id ? data.post : p))
        setEditingId(null)
        setNewCaption('')
        setSuccess(id)
        setTimeout(() => setSuccess(null), 3000)
      }
    } catch (err) {
      console.error('Error updating caption:', err)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <section className="update-section">
      <div className="update-container">
        {/* Header */}
        <div className="update-header">
          <a href="/" className="back-btn" title="Back to home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </a>
          <div className="update-header-content">
            <div className="update-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <div>
              <h1 className="update-title">Update Caption</h1>
              <p className="update-subtitle">Click on a post to edit its caption</p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="update-loading">
            <div className="spinner"></div>
            <p>Loading posts...</p>
          </div>
        )}

        {/* No posts */}
        {!loading && posts.length === 0 && (
          <div className="update-empty">
            <p>No posts found. Create some posts first!</p>
            <a href="/createpost" className="empty-cta">Create Post</a>
          </div>
        )}

        {/* Posts list */}
        {!loading && posts.length > 0 && (
          <div className="update-posts">
            {posts.map((post, index) => (
              <div
                key={post._id}
                className={`update-post-card ${editingId === post._id ? 'editing' : ''} ${success === post._id ? 'updated' : ''}`}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="update-post-row">
                  <img src={post.image} alt={post.caption || 'Post'} className="update-post-thumb" />
                  <div className="update-post-info">
                    {editingId === post._id ? (
                      <div className="edit-form">
                        <textarea
                          className="edit-caption-input"
                          value={newCaption}
                          onChange={(e) => setNewCaption(e.target.value)}
                          placeholder="Enter new caption..."
                          rows={2}
                          autoFocus
                        />
                        <div className="edit-actions">
                          <button
                            className="save-btn"
                            onClick={() => handleUpdate(post._id)}
                            disabled={updating}
                          >
                            {updating ? (
                              <><span className="spinner-small"></span> Saving...</>
                            ) : (
                              <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Save
                              </>
                            )}
                          </button>
                          <button className="cancel-btn" onClick={cancelEditing}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="update-post-caption">{post.caption || <span className="no-caption">No caption</span>}</p>
                        {success === post._id && (
                          <span className="update-success-badge">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Updated!
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  {editingId !== post._id && (
                    <button className="edit-btn" onClick={() => startEditing(post)} title="Edit caption">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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

export default UpdateCaption
