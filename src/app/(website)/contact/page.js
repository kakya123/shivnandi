import { getDbData } from '@/lib/db';

export const metadata = {
  title: 'Contact Us | Shivnandi Pure Veg',
};

export default async function Contact() {
  const data = await getDbData();
  const content = data?.content || {};

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      <div style={{ 
        background: 'var(--primary-dark)', 
        color: 'white', 
        padding: '6rem 0 4rem', 
        textAlign: 'center',
        borderBottom: '5px solid var(--accent-color)'
      }}>
        <h1 style={{ color: 'var(--accent-color)', fontSize: '3rem', marginBottom: '1rem' }}>Contact Us</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
          We'd love to hear from you or help you reserve a table.
        </p>
      </div>

      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
          
          <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Get In Touch</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                <input type="text" placeholder="Your Name" className="admin-input" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                <input type="email" placeholder="Your Email" className="admin-input" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                <textarea rows="4" placeholder="Your Message" className="admin-input" style={{ resize: 'vertical' }}></textarea>
              </div>
              <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }}>Send Message</button>
            </form>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)', fontWeight: 'bold' }}>📍</div>
                  <div>
                    <span style={{ display: 'block', fontWeight: 500 }}>Address</span>
                    <span style={{ color: 'var(--text-muted)' }}>{content.contactAddress}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)', fontWeight: 'bold' }}>📞</div>
                  <div>
                    <span style={{ display: 'block', fontWeight: 500 }}>Phone</span>
                    <span style={{ color: 'var(--text-muted)' }}>{content.contactPhone}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)', fontWeight: 'bold' }}>✉️</div>
                  <div>
                    <span style={{ display: 'block', fontWeight: 500 }}>Email</span>
                    <span style={{ color: 'var(--text-muted)' }}>{content.contactEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ececec' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '3rem' }}>🗺️</span>
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Google Maps Placeholder</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Real map integration goes here</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
