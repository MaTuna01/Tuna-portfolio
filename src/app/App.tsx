import styles from './App.module.css'
import {Link, Route, Routes} from "react-router-dom";
import LandingPage from "../pages/LandingPage.tsx";
import ProjectPage from "../pages/ProjectPage.tsx"
import CareerPage from "../pages/CareerPage.tsx"
import ProjectPost from "../pages/ProjectPost.tsx"

export default function App() {

  return (
      <div className={styles.app}>
          <header className={styles.header}>
              <h2>Tuna's Portfolio</h2>
              <nav>
                  <ul className={styles.menus}>
                      <li><Link to='/'>About</Link></li>
                      <li><Link to='/projects'>Projects</Link></li>
                      <li><Link to='/career'>Career</Link></li>
                  </ul>
              </nav>
          </header>

          <Routes>
              <Route path='/' element={<LandingPage/>}/>
              <Route path='/projects' element={<ProjectPage/>}/>
              <Route path='/projects/:slug' element={<ProjectPost/>}/>
              <Route path='/career' element={<CareerPage/>}/>
          </Routes>
      </div>
  )
}
