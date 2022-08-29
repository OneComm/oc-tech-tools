import React, { useState, useEffect } from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import Auth from './components/Global/Auth'
import Header from './components/Global/Header';
import Navigation from './components/Global/Navigation';
import Dashboard from './components/Dashboard';
import Sows from './components/Sows';
import Sow from './components/Sow';
import Option43 from './components/Utils/Option43';
import Dhcp from './components/Utils/Dhcp';
import NotFound from './components/Global/NotFound';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Global/Loading';

function SignIn() {
  const { instance } = useMsal();
  return <Auth msal={instance} />
}

function GetHeader() {
  const { instance, accounts } = useMsal();

  return <Header instance={instance} accounts={accounts} />;
}

export default function App() {
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    // Loading function to load data or 
    // fake it using setTimeout;
    const loadData = async () => {

      // Wait for two second
      await new Promise((r) => setTimeout(r, 2000));

      // Toggle loading state
      setLoading(false);
    };
      
    loadData();
  }, [])

  return (
    <>
      <AuthenticatedTemplate>
        <Router>
          <Navigation />
          <GetHeader />
          {loading ?
            <Loading />
          :
            <Routes>
              <Route exact path="/" element={ <Dashboard /> } />
              <Route exact path="/sow" element={ <Sows /> } />
              <Route exact path="/sow/:id" element={ <Sow /> } />
              <Route exact path="/utils/opt43" element={ <Option43 /> } />
              <Route exact path="/utils/dhcp" element={ <Dhcp /> } />
              <Route path="*" element={ <NotFound />} />
            </Routes>
          }
        </Router>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
    </>
  );
}
