import {Redirect} from 'react-router-dom';
import {useOktaAuth} from '@okta/okta-react';
import {LoadingSpinner} from '../layouts/Utils/LoadingSpinner';
import OktaSignInWidget from './OktaSignInWidget';


//@ts-ignore
const LoginWidget = ({config}) => {
    const {oktaAuth, authState} = useOktaAuth();
    const onSuccess = (tokens: any) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err: any) => {
        console.log('error logging in', err);
    };


    if (!authState) {
        return <LoadingSpinner/>;
    }

    return authState.isAuthenticated ? (
        <Redirect to={{pathname: '/'}}/>
    ) : (
        //@ts-ignore
        <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>
    );
};

export default LoginWidget;
