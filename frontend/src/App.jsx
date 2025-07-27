import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import SinglePage from './pages/SinglePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './components/PrivateRoute';

function App() {
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path='/' element={<MainLayout />}>
  //       <Route index element={<LandingPage />} />
  //       <Route path='/home' element={<HomePage />} />
  //       <Route path='/show' element={<SinglePage />} />
  //       <Route path='/login' element={<Login />} />
  //       <Route path='/register' element={<Register />} />
  //       <Route path='/dashboard' element={<Dashboard />} />
  //     </Route>
  //   )
  // );
  // <RouterProvider router={router} />

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/show' element={<SinglePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
