import React from 'react';
import { isMobile } from 'react-device-detect';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import Auth from './components/Global/Auth'
import Header from './components/Global/Header';
import Navigation from './components/Global/Navigation';
import Dashboard from './components/Dashboard';
import Domain from './components/Utils/Domain';
import Email from './components/Utils/Email';
import TimeLogs from './components/Utils/TimeLogs';
import Option43 from './components/Utils/Option43';
import Option125 from './components/Utils/Option125';
import NotFound from './components/Global/NotFound';
import MobileError from './components/Global/MobileError';
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
  if (isMobile) {
    return (
      <MobileError />
    );
  } else {
    return (
      <>
        <AuthenticatedTemplate>
          <Router>
            <Navigation />
            <GetHeader />
            <Routes>
              <Route exact path="/" element={ <Dashboard /> } />
              <Route path="/utils/domain" element={ <Domain /> } />
              <Route path="/utils/email" element={ <Email /> } />
              <Route path="/utils/timelogs" element={ <TimeLogs /> } />
              <Route path="/utils/opt43" element={ <Option43 /> } />
              <Route path="/utils/opt125" element={ <Option125 /> } />
              <Route path="*" element={ <NotFound />} />
            </Routes>
          </Router>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <SignIn />
        </UnauthenticatedTemplate>
      </>
    );
  }
}
