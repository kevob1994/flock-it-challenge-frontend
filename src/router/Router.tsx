
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from '../pages';
import { ProtectedRoute } from './ProtectedRoute';

const RouterPath = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
export default RouterPath;
