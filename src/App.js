import Header from './components/Header/Header';
import AuthRequired from './api/authRequired';
import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import Option43 from './containers/Option43/Option43';
import Dhcp from './containers/Dhcp/Dhcp';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // const { cookies } = this.props;

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route exact path="/opt43" element= { <Option43 /> }
          // render={() => (
          //   <AuthRequired
          //     cookies={cookies}
          //     redirectTo='/opt43' 
          //     orRender={<Option43 />}
          //   />)}
        />
        <Route exact path="/dhcp" element= { <Dhcp /> } 
        />
        <Route exact path="/auth" element={ <Auth /> } 
        />
      </Routes>
    </Router>
  );
}

export default App;
