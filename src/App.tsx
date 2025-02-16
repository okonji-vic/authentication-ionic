
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonSkeletonText,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Navbar from "./Navigation/Navbar";
import ForgotPassword from "./components/ForgotPassword";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/flex-utils.css";
import "./theme/variables.css";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./Lib/hooks";
import { lazy, Suspense } from "react";
import ErrorComponent from "./components/ErrorComponent";
import Page404 from "./components/Page404";
import { ErrorBoundary } from "react-error-boundary";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

setupIonicReact();

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);

  return (
    <IonApp className={darkMode ? "dark-theme" : "light-theme"}>
      <IonReactRouter>
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          <AuthHandler darkMode={darkMode} setDarkMode={setDarkMode} />
        </ErrorBoundary>
      </IonReactRouter>
    </IonApp>
  );
};

const AuthHandler: React.FC<{ darkMode: boolean; setDarkMode: (val: boolean) => void }> = ({
  darkMode,
  setDarkMode,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // const [checkAuth, setCheckAuth] = useState<boolean>(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    // setCheckAuth(true);

    // ion-router-outlet doesn't re-render on route change so we need to check here as well
    if (token) {
       const restrictedRoutes = ["/login", "/register", "/forgot-password"];
      if (restrictedRoutes.includes(location.pathname)) {
        history.replace("/home"); // Prevent flashing
       }
    }
  }, [location.pathname, history]);

  if (isAuthenticated === null) {
    return (
      <>
        <div>
          <IonSkeletonText animated style={{ width: "60%" }} />
          <IonSkeletonText animated style={{ width: "80%" }} />
          <IonSkeletonText animated style={{ width: "40%" }} />
        </div>
      </>
    );
   }
  // if (!checkAuth) {
  //   return <LoadingSkeleton />;
  // }

  const logout = () => {
    // localStorage.removeItem("token");
    // window.location.href = "/login";
    localStorage.removeItem("token"); // Clear authentication token
    history.replace("/login"); // Redirect to login page
    // window.location.reload();
  };

  return isAuthenticated ? (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} logout={logout} />
      <IonRouterOutlet>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home">
          <Suspense fallback={<LoadingSkeleton />}>
            <Home darkMode={darkMode} setDarkMode={setDarkMode} logout={logout} />
          </Suspense>
        </Route>
        <Route exact path="/about">
          <Suspense fallback={<LoadingSkeleton />}>
            <About />
          </Suspense>
        </Route>
        <Route component={Page404} />
      </IonRouterOutlet>
    </>
  ) : (
    <IonRouterOutlet>
      <Route exact path="/">
        <Redirect to="/login" />
        </Route>
        <Route exact path="/home">
          <Redirect to="/login" />
        </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/register">
        <RegisterPage />
      </Route>
      <Route exact path="/forgot-password">
        <ForgotPassword />
        </Route>
        <Route component={Page404} />


    </IonRouterOutlet>
  );
};

const LoadingSkeleton = () => (
  <div>
    <IonSkeletonText animated style={{ width: "60%" }} />
    <IonSkeletonText animated style={{ width: "80%" }} />
    <IonSkeletonText animated style={{ width: "40%" }} />
  </div>
);

export default App;
