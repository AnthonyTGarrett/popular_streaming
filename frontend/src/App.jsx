import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import SinglePage from './pages/SinglePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/show' element={<SinglePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
