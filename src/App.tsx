import { useEffect } from "react";
import { 
  RouterProvider,
  createBrowserRouter,
  Navigate
} from "react-router-dom";

import { SearchView } from "./views/search/SearchView";
import { LoggedOutView } from "./views/loggedOut/LoggedOutView";
import { useConfigContext } from "./contexts/ConfigurationContext";
import { SearchContextProvider } from "./contexts/SearchContext";
import {
  AuthenticationContextProvider,
  useAuthenticationContext,
} from "./contexts/AuthenticationContext";
import { ConfigContextProvider } from "./contexts/ConfigurationContext";
import "./App.scss";
import { LandingPageView } from "./views/landingPage/landingPage";

const AppRoutes = () => {
  const { isConfigLoaded } = useConfigContext();
  const { isAuthEnabled, logIn } = useAuthenticationContext();
  
  
  const isAuthenticated = () => {
    return !!localStorage.getItem('AuthToken');
  };

  const RequireAuth = ({children}: any) => {
    if (isAuthenticated()) {
      return children;
    }

    return <Navigate to="/signin" replace />;
  };

  const PublicOnlyRoute = ({ children }: any) => {
    if (isAuthenticated()) {
      return <Navigate to="/search" replace />;
    }

    return children;
  };

  useEffect(() => {
    if (isAuthEnabled) {
      const authToken = localStorage.getItem("AuthToken");
      logIn(authToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfigLoaded]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPageView />,
    },
    {
      path: "/signin",
      element: (
              <PublicOnlyRoute>
                <LoggedOutView />
              </PublicOnlyRoute>
      ),
    },
    {
      path: "/search",
      element: (
        <RequireAuth>
          <SearchContextProvider>
            <SearchView />
          </SearchContextProvider>
        </RequireAuth>
      ),
    }
  ]);

  return <RouterProvider router={router} />
};

export const App = () => (
  <ConfigContextProvider>
    <AuthenticationContextProvider>
      <AppRoutes />
    </AuthenticationContextProvider>
  </ConfigContextProvider>
);
