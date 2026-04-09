import { useEffect, useState } from 'react';
import { listPosts } from './features/auth/services/Publicacion.service';
import PublicacionForm from './features/auth/components/PublicacionForm';
import PublicacionList from './features/auth/components/PublicacionList';
import { Myaccount } from './features/auth/components/Myaccount';
import { useAuth } from './features/auth/context/AuthContext';

export default function App() {

  const { isAuth, logout } = useAuth();

  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  // 🔄 Cargar datos
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await listPosts({ q });
      setItems(res.data.items ?? res.data);
    } catch (err) {
      console.error('Error cargando publicaciones', err);
      alert('No se pudo cargar la lista');
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Solo carga si está autenticado
  useEffect(() => {
    if (isAuth) {
      loadData();
    }
  }, [isAuth]);

  // 🔍 Buscar
  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  // 🔐 Si no está logueado → mostrar Myaccount
  if (!isAuth) return <Myaccount />;

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '140px 16px 16px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Gestor de Publicaciones</h1>
        {/* 🔓 Logout */}
        <button
          onClick={logout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Salir
        </button>
      </div>

      {/* 🔍 Búsqueda */}
      <form onSubmit={handleSearch} style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          placeholder="Buscar por título o contenido"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 16px',
            backgroundColor: '#0eaa23',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Buscar
        </button>
        <button
          type="button"
          style={{
            padding: '10px 16px',
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onClick={() => {
            setQ('');
            loadData();
          }}
        >
          Limpiar
        </button>
      </form>

      {/* ➕ Crear */}
      <PublicacionForm onSaved={loadData} />

      {/* 📋 Lista */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <PublicacionList items={items} onChange={loadData} />
      )}
    </main>
  );
}