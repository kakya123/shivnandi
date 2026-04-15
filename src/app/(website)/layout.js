import Link from 'next/link';
import { getDbData } from '@/lib/db';

export default async function WebsiteLayout({ children }) {
  const data = await getDbData();
  const pages = data?.pages || [];
  const content = data?.content || {};

  return (
    <>
      <header className="glass-panel" style={{ margin: '1rem', borderRadius: '50px', position: 'fixed', width: 'calc(100% - 2rem)', zIndex: 1000 }}>
        <div className="container" style={{ padding: '0.8rem 2rem' }}>
          <div className="nav-container">
            <Link href="/" className="logo">
              🌿 <span>Shivnandi</span>
            </Link>
            
            <nav className="nav-links">
              {pages.filter(p => p.visibleInNav).map(page => (
                <Link key={page.id} href={page.slug} className="nav-link">
                  {page.title}
                </Link>
              ))}
            </nav>
            
            <Link href="/contact" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
              Book Table
            </Link>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: '100px' }}>
        {children}
      </main>

      <footer style={{ background: 'var(--primary-dark)', color: 'white', padding: '4rem 0 2rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ color: 'var(--accent-color)' }}>Shivnandi Pure Veg</h3>
            <p style={{ color: 'var(--text-light)', opacity: 0.8 }}>{content.aboutText?.substring(0, 100)}...</p>
          </div>
          <div>
            <h3 style={{ color: 'white' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {pages.filter(p => p.visibleInNav).map(page => (
                <li key={page.id}>
                  <Link href={page.slug} style={{ color: 'var(--text-light)', opacity: 0.8, transition: '0.3s' }}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ color: 'white' }}>Contact Us</h3>
            <p style={{ color: 'var(--text-light)', opacity: 0.8, marginBottom: '0.5rem' }}>Email: {content.contactEmail}</p>
            <p style={{ color: 'var(--text-light)', opacity: 0.8, marginBottom: '0.5rem' }}>Phone: {content.contactPhone}</p>
            <p style={{ color: 'var(--text-light)', opacity: 0.8 }}>Address: {content.contactAddress}</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
          <p>© {new Date().getFullYear()} Shivnandi Pure Veg. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
