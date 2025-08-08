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
import WatchProvider from './hooks/WatchProvider';

/**
 * Main app setup for the routes of the app. Creates the path for each of the pages that lets the app render each route inside the same html file. The Auth and WatchProviders are context APIs that wrap the app routes to make them available to the whole app

 */
function App() {
  return (
    <AuthProvider>
      <WatchProvider>
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
      </WatchProvider>
    </AuthProvider>
  );
}

export default App;
