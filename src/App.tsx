import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { IPublicClientApplication } from '@azure/msal-browser';
import { CustomNavigationClient } from './utils/NavigationClient';
import { isMobile } from 'react-device-detect';
import Auth from './components/global/Auth'
import Header from './components/global/Header';
import Navigation from './components/global/Navigation';
import Dashboard from './components/Dashboard';
import Domain from './components/tools/Domain';
import TimeLogs from './components/tools/TimeLogs';
import Option43 from './components/tools/Option43';
import Option125 from './components/tools/Option125';
import NotFound from './components/global/NotFound';
import MobileError from './components/global/MobileError';
import 'bootstrap/dist/css/bootstrap.css';
import Smdr from './components/tools/Smdr';

type AppProps = {
  pca: IPublicClientApplication;
}

export default function App({ pca }: AppProps) {
  const history = useNavigate()
  // @ts-ignore
  const navigationClient = new CustomNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  if (isMobile) {
    return (
      <MobileError />
    );
  } else {
    return (
      <MsalProvider instance={pca}>
        <UnauthenticatedTemplate>
          <Auth />
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <Navigation />
          <Header />
          <Routes>
            <Route path="/" element={ <Dashboard /> } />
            <Route path="/tools/domain" element={ <Domain /> } />
            <Route path="/tools/timelogs" element={ <TimeLogs /> } />
            <Route path="/tools/opt43" element={ <Option43 /> } />
            <Route path="/tools/opt125" element={ <Option125 /> } />
            <Route path="/tools/smdr" element={ <Smdr /> } />
            <Route path="*" element={ <NotFound />} />
          </Routes>
        </AuthenticatedTemplate>
      </MsalProvider>
    );
  }
}
