
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Master from './component/Master'
import Home from './component/pages/Home'
import Blog from './component/pages/Blog'
import Inspire from './component/pages/Inspire'
import Contact from './component/pages/Contact'
import News from './component/pages/News'
import Podcasts from './component/pages/Podcasts'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Master/>}>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/blog/:slug' element={<Blog/>}></Route>
      <Route path='/news' element={<News/>}></Route>
      <Route path='/podcast' element={<Podcasts/>}></Route>
      <Route path='/inspire' element={<Inspire/>}></Route>
      <Route path='/Contact' element={<Contact/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
