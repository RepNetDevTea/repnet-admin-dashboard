import {
  RouterProvider, createBrowserRouter, createRoutesFromElements, Route
} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignIn from '@/pages/accounts/SignIn'
import LogIn from '@/pages/accounts/LogIn'
import NotFoundPage from '@/pages/NotFoundPage'
import AdminLayout from '@/layouts/AdminLayout'
import SitesPage from './pages/admins/sites/SitesPage'
import Site from './pages/admins/sites/Site'
import ReportsPage from './pages/admins/reports/ReportsPage'
import Report from './pages/admins/reports/Report'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={ <LandingPage /> } />
      <Route path="accounts">
        <Route path="sign-in" element={ <SignIn /> } />
        <Route path='log-in' element={ <LogIn /> } />
      </Route>
      <Route path='admins' element={ <AdminLayout /> } > 
        <Route path='search'>
          <Route path='sites' element={<SitesPage />} />
          <Route path='sites/:siteId' element={<Site />} />
          <Route path='reports' element = {<ReportsPage />} />
          <Route path='reports/:reporId'element={<Report />} />
        </Route>
      </Route>
      <Route path="*" element={ <NotFoundPage /> } />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={ router } /> 
  );
}

export default App
