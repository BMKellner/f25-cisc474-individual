import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { Auth0Provider } from '@auth0/auth0-react';
import * as TanstackQuery from './integrations/root-provider';
import { Auth0Wrapper } from './components/Auth0Wrapper';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  // Debug: Log Auth0 configuration
  console.log('[Router] Auth0 Configuration:', {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID ? 'SET' : 'MISSING',
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    redirect_uri: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : 'SSR',
  });

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined,
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          }}
          cacheLocation="localstorage"
          useRefreshTokens={true}
        >
          <Auth0Wrapper>
            <TanstackQuery.Provider {...rqContext}>
              {props.children}
            </TanstackQuery.Provider>
          </Auth0Wrapper>
        </Auth0Provider>
      );
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  return router;
};
