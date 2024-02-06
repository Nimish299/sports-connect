import {Route,Routes,BrowserRouter} from 'react-router-dom'


import Home from './pages/Home';
import PlayerLogin from './pages/player/PlayerLogin';
import PlayerSignup from './pages/player/PlayerSignup';
import PlayerHome from './pages/player/PlayerHome';
import CoachWelcome from './pages/coach/CoachWelcome';
import CoachLogin from './pages/coach/CoachLogin';
import CoachSignup from './pages/coach/CoachSignup';
import CoachHome from './pages/coach/CoachHome';
import AcademyDetailsPage from './pages/academy/AcademyDetailsPage';
import PlayerCoach from './pages/player/PlayerCoach';
import PlayerPlayer from './pages/player/PlayerPlayer';
import AppliedAcademys from './pages/player/AppliedAcademys';
import StarredPosts from './pages/player/StarredPosts';
import PlayerPostDetailsPage from './pages/playerPost/PlayerPostDetailsPage';
import MyPosts from './pages/player/MyPosts';


function App() {
  return (
    <div>
      <h3>navbar here right side it gives login option if already logged in display ur username</h3>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/player/login' element={<PlayerLogin/>}/>
            <Route path='/player/signup' element={<PlayerSignup/>}/>
            <Route path='/player/home' element={<PlayerHome/>}/>
            <Route path ='/player/playercoach' element={<PlayerCoach/>}/>
            <Route path ='/player/applied' element={<AppliedAcademys/>}/> 
            <Route path ='/player/playerplayer' element={<PlayerPlayer/>}/>
            <Route path ='/player/myposts' element={<MyPosts/>}/>

            <Route path ='/player/starred' element ={<StarredPosts/>}/>
            <Route path='/playerpost/:name' element={<PlayerPostDetailsPage/>}/>

            <Route path='/academy/:name' element={<AcademyDetailsPage/>}/>

            <Route path='/coach' element={<CoachWelcome />}/>
            <Route path='/coach/login' element={<CoachLogin/>}/>
            <Route path='/coach/signup' element={<CoachSignup/>}/>
            <Route path='/coach/home' element={<CoachHome/>}/>

          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
