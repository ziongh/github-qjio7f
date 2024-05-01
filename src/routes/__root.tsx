import * as React from 'react';
import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AuthContext } from '../AuthProvider';

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated && location.pathname !== '/login') {
      console.log('Redirecting to /login');
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      });
    }

    if (
      context.auth.isAuthenticated &&
      (location.pathname === '/login' || location.pathname === '/')
    ) {
      console.log('Redirecting to /dashboard');
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  errorComponent: () => <div>Dashboard Error</div>,
  pendingComponent: () => <div>Loading...</div>,
  notFoundComponent: () => <div>Dashboard Not Found</div>,
  component: DefaultRoute,
});

function DefaultRoute() {
  console.log('DefaultRoute Rendered!');
  return (
    <>
      <Outlet />
    </>
  );
}
