import { getDbData } from '@/lib/db';

export const metadata = {
  title: 'Menu | Shivnandi Pure Veg',
};

export default async function Menu() {
  const data = await getDbData();
  const menu = data?.menu || [];

  // Group menu by category
  const categories = [...new Set(menu.map(item => item.category))];

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div style={{ 
        background: 'var(--primary-dark)', 
        color: 'white', 
        padding: '6rem 0 4rem', 
        textAlign: 'center',
        borderBottom: '5px solid var(--accent-color)'
      }}>
        <h1 style={{ color: 'var(--accent-color)', fontSize: '3rem', marginBottom: '1rem' }}>Our Menu</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
          Discover our rich variety of authentic vegetarian dishes, prepared fresh daily with the finest ingredients.
        </p>
      </div>

      <div className="container" style={{ marginTop: '3rem' }}>
        {categories.map((category, idx) => (
          <div key={category} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s`, marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2rem', borderBottom: '2px solid var(--accent-light)', paddingBottom: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--primary-color)' }}>{category}</span>
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {menu.filter(item => item.category === category).map(item => (
                <div key={item.id} className="glass-panel" style={{ display: 'flex', gap: '1rem', padding: '1rem', transition: 'transform 0.3s', cursor: 'default' }}>
                  <div style={{ width: '100px', height: '100px', flexShrink: 0, borderRadius: 'var(--radius)', background: `url(${item.image}) center/cover` }}></div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)' }}>{item.name}</h3>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>₹{item.price}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
