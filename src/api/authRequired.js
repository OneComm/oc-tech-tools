import React from 'react';
import { Navigate } from 'react-router-dom';

export class AuthRequired extends React.Component {

  constructor(props) {
    super(props);

    const { cookies } = props;
    if(typeof props.redirectTo !== 'undefined') {
      cookies.set('authRedirectTo', props.redirectTo, { path: '/', expires: new Date(Date.now()+10000)}); 
    }
  }
  
  render() {

    if(typeof this.props.validAuthToken === "undefined") {
      return(<Navigate to='/auth' /> );
		
    } else {
      return (this.props.orRender);
    }
  }
}

export default AuthRequired;