import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { LoadingSpinner } from '../layouts/Utils/LoadingSpinner';
import OktaSignInWidget from './OktaSignInWidget';

// from the documentation
//@ts-ignore
const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens: any) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err: any) => {
    console.log('error logging in', err);
  };

  // this is because it takes sometime to start up
  if (!authState) {
    return <LoadingSpinner />;
  }
  // once its true
  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: '/' }} />
  ) : (
    //@ts-ignore
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default LoginWidget;
