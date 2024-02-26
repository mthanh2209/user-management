import { Routes, Route } from 'react-router-dom';

// Pages
import {
  Layout,
  HomePage,
  RolePage,
  RulePage
} from '@pages';

// Constants
import { PATH } from '@constants';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={PATH.HOME_PATH} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={PATH.ROLES_PATH} element={<RolePage />} />
          <Route path={PATH.RULES_PATH} element={<RulePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
