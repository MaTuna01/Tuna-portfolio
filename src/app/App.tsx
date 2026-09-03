import styles from './App.module.css'
import {Link, Route, Routes, useLocation} from "react-router-dom";
import LandingPage from "../pages/LandingPage.tsx";
import ProjectPage from "../pages/ProjectPage.tsx"
import CareerPage from "../pages/CareerPage.tsx"
import ProjectPost from "../pages/ProjectPost.tsx"
import ProjectPostModal from "../pages/ProjectPostModal.tsx";

export default function App() {

    const location = useLocation()
    const state = location.state as { backgroundLocation?: Location } | null

  return (
      <div className={styles.app}>
          <header className={styles.header}>
              <Link to='/'><h2>Tuna's Portfolio</h2></Link>
              <nav>
                  <ul className={styles.menus}>
                      <li><Link to='/'>About</Link></li>
                      <li><Link to='/projects'>Projects</Link></li>
                      <li><Link to='/career'>Career</Link></li>
                  </ul>
              </nav>
          </header>

          <main>
              <Routes location={state?.backgroundLocation ?? location}>
                  <Route path='/' element={<LandingPage/>}/>
                  <Route path='/projects' element={<ProjectPage/>}/>
                  <Route path='/projects/:slug' element={<ProjectPost/>}/>
                  <Route path='/career' element={<CareerPage/>}/>
              </Routes>

              {state?.backgroundLocation && (
                  <Routes>
                      <Route path='/projects/:slug' element={<ProjectPostModal/>}></Route>
                  </Routes>
              )}
          </main>

      </div>
  )
}
