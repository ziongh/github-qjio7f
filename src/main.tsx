import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { MantineProvider, localStorageColorSchemeManager } from '@mantine/core';
import { AuthProvider, useAuth } from './AuthProvider';
import '@mantine/core/styles.css';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!,
  },
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;

function InnerApp() {
  const auth = useAuth();
  console.log('rerendered InnerApp');
  return (
    <>
      <MantineProvider defaultColorScheme="auto">
        <RouterProvider router={router} context={{ auth }} />
      </MantineProvider>
    </>
  );
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
