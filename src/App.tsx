import { useEffect } from "react";
import { 
  RouterProvider,
  createBrowserRouter,
  Navigate
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
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
import { Dashboard } from "./views/Pages/Dashboard";
import { Users } from "./views/Pages/Users";
import { UsersHistory } from "./views/Pages/UsersHistory";
import AdminLayout from "./components/Layout";
const queryClient = new QueryClient()
const AppRoutes = () => {
  const { isConfigLoaded, admins } = useConfigContext();
  const { isAuthEnabled, logIn, parseJwt } = useAuthenticationContext();
  
  
  const isAuthenticated = () => {
    return !!localStorage.getItem('AuthToken');
  };

  const AdminAuth = ({children}: any) => {
    if (!isAuthenticated()) {
      return <Navigate to="/signin" replace />;
    }
    const user = parseJwt(localStorage.getItem('AuthToken') || '');
    const isAdmin = admins?.includes(user?.email || ''); 
    if(isAdmin){
      return children;
    }
    return <Navigate to="/search" replace />;
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
    },
    {
      path: "/dashboard",
      element: (
        <AdminAuth>
          <AdminLayout>
            <Dashboard />
            </AdminLayout>
        </AdminAuth>
      ),
    },
    {
      path: "/users",
      element: (
        <AdminAuth>
          <AdminLayout>
            <Users />
          </AdminLayout>
        </AdminAuth>
      ),
    },
    {
      path: "/usersHistory",
      element: (
        <RequireAuth>
          <AdminLayout>
            <UsersHistory />
            </AdminLayout>
        </RequireAuth>
      ),
    }
  ]);

  return <RouterProvider router={router} />
};

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigContextProvider>
      <AuthenticationContextProvider>
        <AppRoutes />
        {/*  */}
      </AuthenticationContextProvider>
    </ConfigContextProvider>
  </QueryClientProvider>
);
