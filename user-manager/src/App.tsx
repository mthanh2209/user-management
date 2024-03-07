import '@App.css';
import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import AppRoutes from '@routes';

// Stores
import { AppProvider } from '@stores';

const App = () => {
  return (
    <>
      <AppProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AppProvider>
    </>
  );
};

export default App;
