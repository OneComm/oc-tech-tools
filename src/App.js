import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import Auth from './components/Global/Auth'
import Header from './components/Global/Header';
import Footer from './components/Global/Footer';
import Home from './components/Home';
import Option43 from './components/Utils/Option43';
import Dhcp from './components/Utils/Dhcp';
import NotFound from './components/Global/NotFound';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function SignIn() {
  const { instance } = useMsal();
  return <Auth msal={instance} />
}

function GetHeader() {
  const { instance, accounts } = useMsal();

  return <Header instance={instance} accounts={accounts} />;
}

export default function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <Router>
          <GetHeader />
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route exact path="/utils/opt43" element={ <Option43 /> } />
            <Route exact path="/utils/dhcp" element={ <Dhcp /> } />
            <Route path="*" element={ <NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
    </>
  );
}
