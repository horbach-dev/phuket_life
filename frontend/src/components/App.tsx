import { useMemo } from 'react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { retrieveLaunchParams, useSignal, isMiniAppDark } from '@telegram-apps/sdk-react';
import ScrollToTop from "@/components/ScrollToTop";
import RedirectController from "@/navigation/RedirectController";
import { AppRoot } from '@telegram-apps/telegram-ui';
import { routes } from '@/navigation/routes.tsx';

export function App() {
  const launchParams = useMemo<any>(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(launchParams.tgWebAppPlatform) ? 'ios' : 'base'}
    >
        <HashRouter>
          <ScrollToTop />
          <Routes>
            {routes.map((route) => {
              if (route.children) {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    Component={route.Component}
                  >
                    {route.children.map((child) => (
                      <Route
                        key={child.path}
                        path={child.path}
                        Component={child.Component}
                      />
                    ))}
                  </Route>
                );
              }

              return (
                <Route
                  key={route.path}
                  path={route.path}
                  Component={route.Component}
                />
              );
            })}
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
          <RedirectController launchParams={launchParams} />
        </HashRouter>
    </AppRoot>
  );
}
