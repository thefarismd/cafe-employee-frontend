import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import CafesPage from './pages/CafesPage';
import AddCafePage from './pages/AddCafePage';
import EditCafePage from './pages/EditCafePage';
import EmployeesPage from './pages/EmployeesPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';

// Define routes using createBrowserRouter and createRoutesFromElements
const router = createBrowserRouter(
  createRoutesFromElements(
    // Main layout route for the application
    <Route path='/' element={<App />}>
      {/* Public routes */}
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/cafes' element={<CafesPage />} />
      <Route path='/cafes/add' element={<AddCafePage />} />
      <Route path='/cafes/edit' element={<EditCafePage />} />
      <Route path='/employees' element={<EmployeesPage />} />
      <Route path='/employees/add' element={<AddEmployeePage />} />
      <Route path='/employees/edit' element={<EditEmployeePage />} />
    </Route>
  )
);

export default router;