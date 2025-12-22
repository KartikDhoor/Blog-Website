import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Master from './component/Master'
import Home from './component/pages/Home'
import Blog from './component/pages/Blog'
import Inspire from './component/pages/Inspire'
import Contact from './component/pages/Contact'
import News from './component/pages/News'
import Podcasts from './component/pages/Podcasts'
import DashboardMaster from './component/dashboard/DashboardMaster'
import DashboardHome from './component/dashboard/pages/DashboardHome'
import DashboardBlog from './component/dashboard/pages/DashboardBlog'
import DashboardCategory from './component/dashboard/pages/DashboardCategory'
import DashboardComments from './component/dashboard/pages/DashboardComments'
import DashboardUser from './component/dashboard/pages/DashboardUser'
import DashboardAnnouncement from './component/dashboard/pages/DashboardAnnouncement'
import Login from './component/pages/Login'
import Register from './component/pages/Register'
import OtpConformation from './component/pages/OtpConformation'
import ProtectedDashboard from './component/dashboard/ProtectedDashboard'
import Profile from './component/pages/Profile'
import Security from './component/pages/Security'
import { AuthProvider } from './component/AuthContext'
import BlogSearch from './component/pages/BlogSearch'

// ANALYTICS IMPORTS
import { AnalyticsProvider } from './component/analytics/AnalyticsProvider'
import AnalyticsDashboard from './component/dashboard/AnalyticsDashboard'

function App() {
  return (
    <>
      {/* ✅ ROUTER WRAPS EVERYTHING - FIRST */}
      <BrowserRouter>
        {/* ✅ AUTH PROVIDER - SECOND */}
        <AuthProvider>
          {/* ✅ ANALYTICS PROVIDER - THIRD (INSIDE ROUTER) */}
          <AnalyticsProvider>
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path='/' element={<Master/>}>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/blog/:slug' element={<Blog/>}></Route>
                <Route path='/news' element={<News/>}></Route>
                <Route path='/podcast' element={<Podcasts/>}></Route>
                <Route path='/blog/search' element={<BlogSearch/>}></Route>
                <Route path='/inspire' element={<Inspire/>}></Route>
                <Route path='/contact' element={<Contact/>}></Route>
                <Route path='/profile' element={<Profile/>}></Route>
                <Route path='/security' element={<Security/>}></Route>
              </Route>

              {/* ADMIN DASHBOARD ROUTES */}
              <Route path='/dashboard' element={<ProtectedDashboard/>}>
                <Route element={<DashboardMaster/>}>
                  <Route path='' element={<DashboardHome/>}></Route>
                  <Route path='blog' element={<DashboardBlog/>}></Route>
                  <Route path='category' element={<DashboardCategory/>}></Route>
                  <Route path='comment' element={<DashboardComments/>}></Route>
                  <Route path='user' element={<DashboardUser/>}></Route>
                  <Route path='announcement' element={<DashboardAnnouncement/>}></Route>
                  <Route path='analytics' element={<AnalyticsDashboard/>}></Route>
                </Route>
              </Route>

              {/* AUTH ROUTES */}
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/register' element={<Register/>}></Route>
              <Route path='/otp' element={<OtpConformation/>}></Route>
            </Routes>
          </AnalyticsProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
