import '@App.css';
import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import AppRoutes from '@routes';

const App = () => {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
};

export default App;
