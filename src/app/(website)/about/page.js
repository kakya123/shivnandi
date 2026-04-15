import { getDbData } from '@/lib/db';

export const metadata = {
  title: 'About Us | Shivnandi Pure Veg',
};

export default async function About() {
  const data = await getDbData();
  const content = data?.content || {};
  const gallery = data?.gallery || [];

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      <div style={{ 
        background: 'var(--primary-dark)', 
        color: 'white', 
        padding: '6rem 0 4rem', 
        textAlign: 'center',
        borderBottom: '5px solid var(--accent-color)'
      }}>
        <h1 style={{ color: 'var(--accent-color)', fontSize: '3rem', marginBottom: '1rem' }}>Our Heritage</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
          The story behind Shivnandi Pure Veg.
        </p>
      </div>

      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <img src={gallery[1]?.url || 'https://via.placeholder.com/600x400'} alt="Our Restaurant" style={{ width: '100%', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)' }} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Rooted in Tradition</h2>
            <div style={{ width: '80px', height: '4px', background: 'var(--accent-color)', marginBottom: '2rem' }}></div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {content.aboutText}
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              From sourcing the freshest local ingredients to carefully curating recipes passed down through generations, our mission is to offer you a dining experience that feels like coming home. Every dish we serve is made with love and devotion to the culinary arts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
