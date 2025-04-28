import HomePage from './pages/HomePage';
import { Outlet } from 'react-router-dom';
import Footer from './components/common/Footer';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet /> {/* Nested routes will render here */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
