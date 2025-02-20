import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonToggle,
  IonPopover,
  IonContent,
  IonMenu,
  IonPage,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useLocalStorage } from "../Lib/hooks";
import { menuController } from "@ionic/core";
import "./Navbar.css";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, logout }) => {
  const [title, setTitle] = useState("Home");
    const [activePage, setActivePage] = useState(title);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 668);
  // const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // switch (location.pathname) {
    //   case "/home":
    //     setTitle("Home");
    //     break;
    //   case "/about":
    //     setTitle("About");
    //     break;
    //   case "/login":
    //     setTitle("Login");
    //     break;
    //   case "/register":
    //     setTitle("Register");
    //     break;
    //   case "/forgot-password":
    //     setTitle("Forgot Password");
    //     break;
    //   default:
    //     setTitle("BioRhythms Calculator");
    // }
    const titles: { [key: string]: string } = {
      "/home": "Home",
      "/about": "About",
      "/login": "Login",
      "/register": "Register",
      "/forgot-password": "Forgot Password",
    };
    setTitle(titles[location.pathname] || "BioRhythms Calculator");
  }, [location.pathname]);

    useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 668);
    };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    console.log("isMobile", isMobile);

  return (
    <>
          {isMobile ? (
              <>
          <IonMenu contentId="main-content" id="main-menu">
              <IonHeader>
                  <IonToolbar>
                      <IonButtons slot="start">
                          <IonMenuButton style={{ color: "red" }}>X</IonMenuButton>
                      </IonButtons>
                      <IonTitle>Menu</IonTitle>
                  </IonToolbar>
              </IonHeader>
              <IonContent>
                  {/* <IonButtons slot="end"> */}
                  <IonButton
                      size="large"
                      expand="full"
                      fill="clear"
                      className={location.pathname === "/home" ? "active" : ""}
                      onClick={async () => {
                          history.push("/home");
                          setActivePage("home");
                          //   await menuController.enable(true, "main-menu");
                          //     await menuController.close("main-menu"); // Close the IonMenu
                          document.querySelector("ion-menu")?.close();
                      }}
                  >
                      Home
                  </IonButton>
                  <IonButton
                      size="large"
                      expand="full"
                      fill="clear"
                      className={location.pathname === "/about" ? "active" : ""}
                      onClick={async () => {
                          history.push("/about");
                          setActivePage("about");
                          //   await menuController.enable(true, "main-menu");
                          //     await menuController.close("main-menu"); // Close the IonMenu
                          document.querySelector("ion-menu")?.close();
                      }}
                  >
                      About
                  </IonButton>
                  <IonButton
                      size="large"
                      expand="full"
                      fill="clear"
                      onClick={() => logout()}
                  >
                      Logout
                  </IonButton>

                  {/* </IonButtons> */}
              </IonContent>
          </IonMenu>
      <IonHeader id="main-content">
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          
          <IonToggle
            checked={darkMode}
            onIonChange={() => setDarkMode(!darkMode)}
            slot="end"
            className={darkMode ? "dark-theme toggle" : "light-theme toggle"}
          />
        </IonToolbar>
              
                  </IonHeader>
                </>
                  ) : (
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
          <IonButton
                      fill="clear"
                      className={location.pathname === "/home" ? "active" : ""}
                      onClick={async () => {
                          history.push("/home");
                          setActivePage("home");
                          document.querySelector("ion-menu")?.close();
                      }}
                  >
                      Home
                  </IonButton>
                  <IonButton
                      fill="clear"
                      className={location.pathname === "/about" ? "active" : ""}
                      onClick={async () => {
                          history.push("/about");
                          setActivePage("about");
                          document.querySelector("ion-menu")?.close();
                      }}
                  >
                      About
                  </IonButton>
                  <IonButton
                      fill="clear"
                      onClick={() => logout()}
                  >
                      Logout
                  </IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          
          <IonToggle
            checked={darkMode}
            onIonChange={() => setDarkMode(!darkMode)}
            slot="end"
            className={darkMode ? "dark-theme toggle" : "light-theme toggle"}
          />
        </IonToolbar>
      </IonHeader>)}
    </>
  );
};

export default Navbar;
