import '@App.css';
import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import AppRoutes from '@routes';
import { AppProvider } from '@stores/context';

const App = () => {
  return (
    <>
      <Router>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </Router>
    </>
  );
};

export default App;
