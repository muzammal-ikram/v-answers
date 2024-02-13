import { 
  createBrowserRouter,
  RouterProvider,
  Navigate} from "react-router-dom";
import { SearchView } from "./views/search/SearchView";
import { SearchContextProvider } from "./contexts/SearchContext";
import {
  AuthenticationContextProvider,
} from "./contexts/AuthenticationContext";
import { ConfigContextProvider } from "./contexts/ConfigurationContext";
import "./App.scss";
import { LandingPageView } from "./views/landingPage/landingPage";
import { LoggedOutView } from "./views/loggedOut/LoggedOutView";

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

 
export const App = () => (
  <ConfigContextProvider>
    <AuthenticationContextProvider>
      <RouterProvider router={router} />
    </AuthenticationContextProvider>
  </ConfigContextProvider>
);
