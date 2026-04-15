import { getDbData } from '@/lib/db';

export const metadata = {
  title: 'Gallery | Shivnandi Pure Veg',
};

export default async function Gallery() {
  const data = await getDbData();
  const gallery = data?.gallery || [];

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div style={{ 
        background: 'var(--primary-dark)', 
        color: 'white', 
        padding: '6rem 0 4rem', 
        textAlign: 'center',
        borderBottom: '5px solid var(--accent-color)'
      }}>
        <h1 style={{ color: 'var(--accent-color)', fontSize: '3rem', marginBottom: '1rem' }}>Gallery</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
          A glimpse into the Shivnandi experience.
        </p>
      </div>

      <div className="container" style={{ marginTop: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {gallery.map((img, idx) => (
            <div key={img.id} className="animate-fade-in glass-panel" style={{ animationDelay: `${idx * 0.1}s`, overflow: 'hidden', borderRadius: 'var(--radius)', height: '250px', cursor: 'pointer' }}>
              <img 
                src={img.url} 
                alt="Gallery Item" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', ':hover': { transform: 'scale(1.1)' } }} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
