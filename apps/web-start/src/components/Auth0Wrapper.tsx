import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { setGetAccessToken } from '../lib/api';
import { setTokenGetterReady } from '../lib/auth-ready';

interface Auth0WrapperProps {
  children: React.ReactNode;
}

export function Auth0Wrapper({ children }: Auth0WrapperProps) {
  const { getAccessTokenSilently, isAuthenticated, isLoading, error } = useAuth0();

  useEffect(() => {
    console.log('[Auth0Wrapper] Auth state:', { 
      isAuthenticated, 
      isLoading, 
      hasError: !!error,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID ? 'SET' : 'MISSING'
    });

    if (error) {
      console.error('[Auth0Wrapper] Auth0 Error:', error);
      setTokenGetterReady(false);
    }

    if (isAuthenticated) {
      console.log('[Auth0Wrapper] User is authenticated, setting up token getter');
      setGetAccessToken(async () => {
        try {
          console.log('[Auth0Wrapper] Requesting access token...');
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            },
          });
          console.log('[Auth0Wrapper] Token retrieved successfully:', token ? `${token.substring(0, 20)}...` : 'EMPTY');
          return token;
        } catch (err) {
          console.error('[Auth0Wrapper] Failed to get access token:', err);
          throw err;
        }
      });
      // IMPORTANT: Signal that the token getter is ready AFTER setting it
      setTokenGetterReady(true);
    } else {
      console.log('[Auth0Wrapper] User not authenticated yet');
      setTokenGetterReady(false);
    }
  }, [isAuthenticated, isLoading, error, getAccessTokenSilently]);

  return <>{children}</>;
}

