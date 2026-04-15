"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/data', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    setSaving(false);
    alert('Changes saved successfully!');
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  if (!data) return <div style={{ padding: '2rem' }}>Loading CMS Dashboard...</div>;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div style={{ padding: '0 2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--accent-color)', fontSize: '1.5rem', margin: 0 }}>Shivnandi CMS</h2>
        </div>
        <nav>
          {['content', 'menu', 'pages', 'gallery'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ 
                width: '100%', base: 'none', background: activeTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: activeTab === tab ? 'var(--accent-light)' : 'white',
                padding: '1rem 2rem', textAlign: 'left', borderLeft: activeTab === tab ? '4px solid var(--accent-color)' : '4px solid transparent',
                textTransform: 'capitalize'
              }}
            >
              {tab} Manager
            </button>
          ))}
          <button 
            onClick={handleLogout}
            style={{ width: '100%', background: 'transparent', color: '#ff8a80', padding: '1rem 2rem', textAlign: 'left', borderLeft: '4px solid transparent', marginTop: '2rem' }}
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', textTransform: 'capitalize', margin: 0 }}>{activeTab} Manager</h1>
          <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>

        {activeTab === 'content' && (
          <div className="admin-card animate-fade-in">
            <h3>Homepage Content</h3>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label>Hero Title</label>
                <input className="admin-input" value={data.content.heroTitle} onChange={e => setData({...data, content: {...data.content, heroTitle: e.target.value}})} />
              </div>
              <div>
                <label>Hero Subtitle</label>
                <input className="admin-input" value={data.content.heroSubtitle} onChange={e => setData({...data, content: {...data.content, heroSubtitle: e.target.value}})} />
              </div>
              <div>
                <label>About Us Text</label>
                <textarea className="admin-input" rows="4" value={data.content.aboutText} onChange={e => setData({...data, content: {...data.content, aboutText: e.target.value}})} />
              </div>
              
              <h3 style={{ marginTop: '2rem' }}>Contact Information</h3>
              <div>
                <label>Email</label>
                <input className="admin-input" value={data.content.contactEmail} onChange={e => setData({...data, content: {...data.content, contactEmail: e.target.value}})} />
              </div>
              <div>
                <label>Phone</label>
                <input className="admin-input" value={data.content.contactPhone} onChange={e => setData({...data, content: {...data.content, contactPhone: e.target.value}})} />
              </div>
              <div>
                <label>Address</label>
                <input className="admin-input" value={data.content.contactAddress} onChange={e => setData({...data, content: {...data.content, contactAddress: e.target.value}})} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="admin-card animate-fade-in">
            <button className="btn btn-primary" style={{ marginBottom: '1.5rem' }} onClick={() => setData({...data, menu: [{id: 'm'+Date.now(), name: 'New Item', category: 'General', price: 0, description: '', image: 'https://via.placeholder.com/300x200'}, ...data.menu]})}>+ Add Menu Item</button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {data.menu.map((item, idx) => (
                <div key={item.id} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label>Item Name</label>
                    <input className="admin-input" value={item.name} onChange={e => { const m = [...data.menu]; m[idx].name = e.target.value; setData({...data, menu: m}) }} />
                  </div>
                  <div>
                    <label>Price (₹)</label>
                    <input className="admin-input" value={item.price} onChange={e => { const m = [...data.menu]; m[idx].price = e.target.value; setData({...data, menu: m}) }} />
                  </div>
                  <div>
                    <label>Category</label>
                    <input className="admin-input" value={item.category} onChange={e => { const m = [...data.menu]; m[idx].category = e.target.value; setData({...data, menu: m}) }} />
                  </div>
                  <div>
                    <label>Image URL</label>
                    <input className="admin-input" value={item.image} onChange={e => { const m = [...data.menu]; m[idx].image = e.target.value; setData({...data, menu: m}) }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label>Description</label>
                    <input className="admin-input" value={item.description} onChange={e => { const m = [...data.menu]; m[idx].description = e.target.value; setData({...data, menu: m}) }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
                    <button className="btn" style={{ background: '#ffebee', color: '#c62828', padding: '0.5rem 1rem' }} onClick={() => { const m = data.menu.filter(i => i.id !== item.id); setData({...data, menu: m}) }}>Delete Item</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="admin-card animate-fade-in">
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Manage which pages appear in the dynamic navigation menu.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                  <th style={{ padding: '1rem 0' }}>Page Title</th>
                  <th>URL Slug</th>
                  <th>Show in Nav</th>
                </tr>
              </thead>
              <tbody>
                {data.pages.map((page, idx) => (
                  <tr key={page.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem 0' }}>
                      <input className="admin-input" style={{ marginBottom: 0 }} value={page.title} onChange={e => { const p = [...data.pages]; p[idx].title = e.target.value; setData({...data, pages: p}) }} />
                    </td>
                    <td>{page.slug}</td>
                    <td>
                      <input type="checkbox" style={{ transform: 'scale(1.5)', marginLeft: '1rem' }} checked={page.visibleInNav} onChange={e => { const p = [...data.pages]; p[idx].visibleInNav = e.target.checked; setData({...data, pages: p}) }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="admin-card animate-fade-in">
            <button className="btn btn-primary" style={{ marginBottom: '1.5rem' }} onClick={() => setData({...data, gallery: [{id: 'g'+Date.now(), url: 'https://via.placeholder.com/400x300'}, ...data.gallery]})}>+ Add Image</button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {data.gallery.map((img, idx) => (
                <div key={img.id} style={{ position: 'relative', border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem' }}>
                  <img src={img.url} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }} />
                  <input className="admin-input" style={{ fontSize: '0.8rem', padding: '0.4rem' }} value={img.url} onChange={e => { const g = [...data.gallery]; g[idx].url = e.target.value; setData({...data, gallery: g}) }} placeholder="Image URL" />
                  <button style={{ width: '100%', background: '#ff8a80', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer' }} onClick={() => { const g = data.gallery.filter(i => i.id !== img.id); setData({...data, gallery: g}) }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
