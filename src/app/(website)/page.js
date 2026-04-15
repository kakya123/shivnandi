import { getDbData } from '@/lib/db';
import Link from 'next/link';

export default async function Home() {
  const data = await getDbData();
  const content = data?.content || {};
  const menu = data?.menu || [];
  const gallery = data?.gallery || [];

  return (
    <>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center',
        background: 'linear-gradient(rgba(18, 56, 41, 0.7), rgba(18, 56, 41, 0.8)), url("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80") center/cover',
        color: 'white',
        borderRadius: '0 0 40px 40px',
        overflow: 'hidden',
        marginTop: '-100px', // Compensate for nav padding
        paddingTop: '100px'
      }}>
        <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 10 }}>
          <span style={{ color: 'var(--accent-color)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>Welcome to</span>
          <h1 style={{ color: 'white', fontSize: 'clamps(3rem, 5vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '800px' }}>
            {content.heroTitle}
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2.5rem', opacity: 0.9 }}>
            {content.heroSubtitle}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/menu" className="btn btn-accent">Explore Menu</Link>
            <Link href="/contact" className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>Book a Table</Link>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="section bg-main">
        <div className="container">
          <h2 className="section-title">Our Signature Dishes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {menu.slice(0, 3).map((item, i) => (
              <div key={item.id} className="glass-panel animate-fade-in" style={{ animationDelay: `${i * 0.2}s`, overflow: 'hidden' }}>
                <div style={{ height: '200px', background: `url(${item.image}) center/cover`, borderRadius: 'var(--radius) var(--radius) 0 0' }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{item.name}</h3>
                    <span style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.2rem' }}>₹{item.price}</span>
                  </div>
                  <span style={{ display: 'inline-block', padding: '0.2rem 0.8rem', background: 'var(--accent-light)', color: 'var(--primary-dark)', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '1rem' }}>{item.category}</span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/menu" className="btn btn-primary">View Full Menu</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div className="animate-slide-left">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Story</h2>
            <div style={{ width: '60px', height: '3px', background: 'var(--accent-color)', marginBottom: '1.5rem' }}></div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              {content.aboutText}
            </p>
            <Link href="/about" className="btn btn-primary" style={{ marginTop: '2rem' }}>Read More</Link>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100%', height: '100%', border: '2px solid var(--accent-color)', borderRadius: 'var(--radius)' }}></div>
            <img src={gallery[0]?.url || 'https://via.placeholder.com/600x400'} alt="Our Restaurant" style={{ width: '100%', borderRadius: 'var(--radius)', position: 'relative', zIndex: 2, boxShadow: 'var(--shadow-lg)' }} />
          </div>
        </div>
      </section>
    </>
  );
}
