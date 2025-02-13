import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Home from './pages/Home';
import ForgotPassword from './components/ForgotPassword';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is authenticated (e.g., token exists)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <IonApp className={darkMode ? "dark-theme" : "light-theme"}>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Redirect to home if logged in, otherwise show login */}
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/home" /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/home" /> : <LoginPage />}
          </Route>

          <Route exact path="/home">
            {/* {isAuthenticated ? <Home /> : <Redirect to="/login" />} */}
            {isAuthenticated ? <Home darkMode={darkMode} setDarkMode={setDarkMode} /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/register">
            {isAuthenticated ? <Redirect to="/home" /> : <RegisterPage />}
          </Route>
          <Route exact path="/forgot-password">
            {isAuthenticated ? <Redirect to="/home" /> : <ForgotPassword />}
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
