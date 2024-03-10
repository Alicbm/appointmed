import { HashRouter, Route, Routes } from 'react-router-dom'
import { MainStructure } from '../pages'
import { ListRequest } from '../pages/MedicinaGeneral/components/ListRequest'
import { NewRequest } from '../pages/MedicinaGeneral/components/NewRequest'
import { Inicio } from '../pages/Inicio'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function Router() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path='/dashboard' element={<MainStructure />} >
          <Route index path='' element={<Inicio />}/>
          <Route path='medicina-general' element={<ListRequest />}/>
          <Route path='medicina-general/create' element={<NewRequest />}/>
          <Route path='odontologia' element={<p>Este es odontologia</p>}/>
          <Route path='ginecologia' element={<p>Este es ginecologia</p>}/>
          <Route path='psiquiatria' element={<p>Este es psiquiatria</p>}/>
          <Route path='pediatria' element={<p>Este es pediatria</p>}/>
          <Route path='optometria' element={<p>Este es optometria</p>}/>
        </Route>
      </Routes>
      <Footer />
    </HashRouter>
  )
}