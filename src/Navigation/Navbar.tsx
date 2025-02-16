import React, { useEffect, useState } from "react";
import { IonButton, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonToggle } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useLocalStorage } from "../Lib/hooks";


interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
    logout: () => void;
}


const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, logout }) => {
    //  const [title, setTitle] = useLocalStorage("title", "Home");
    const [title, setTitle] = useState("Home");
    // const [activePage, setActivePage] = useLocalStorage("activePage", "home");
    const [activePage, setActivePage] = useState(title);
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
    
    

    

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>{title}</IonTitle>
                <IonButtons slot="end">
                    <IonButton className={activePage === "home" ? "active" : ""} onClick={() => { history.push("/home"); setActivePage("home"); }}>
                        Home
                    </IonButton>
                    <IonButton className={activePage === "about" ? "active" : ""} onClick={() => { history.push("/about"); setActivePage("about"); }}>
                        About
                    </IonButton>
                    {token ? (
                        <IonButton onClick={() => logout()}>
                            Logout
                        </IonButton>
                    ) : (
                        <IonButton className={activePage === "login" ? "active" : ""} onClick={() => { history.push("/login"); setActivePage("login"); }}>
                            Login
                        </IonButton>
                    )}
                    {/* <IonButton className={activePage === "register" ? "active" : ""} onClick={() => { history.push("/register"); setActivePage("register"); }}
                    
                    
                    {/* <IonButton onClick={toggleDarkMode}>
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </IonButton> */}
                    
                </IonButtons>
                <IonToggle 
            checked={darkMode} 
            onIonChange={() => setDarkMode(!darkMode)}
            slot="end"
            className={darkMode ? "dark-theme toggle" : "light-theme toggle"}
          />
            </IonToolbar>
        </IonHeader>
    );
};

export default Navbar;