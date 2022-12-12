export const oktaConfig: any = {
  clientId: '0oa7l3b92w8TPhBET5d7',
  issuer: 'https://dev-08712788.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true,
};
