import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Spinner from './shared/components/Spinner/Spinner';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const TweetsPage = lazy(() => import('./pages/TweetsPage/TweetsPage'));

const UserRoutes = () => {
  return (
    <Suspense fallback={<Spinner width="50" />}>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/tweets" element={<TweetsPage />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
