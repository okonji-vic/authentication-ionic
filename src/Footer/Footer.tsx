import React from "react";
import { IonContent, IonFooter, IonMenu, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "./Footer.css";


interface FooterProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}
    
const Footer: React.FC<FooterProps> = ({ darkMode, setDarkMode }) => {
    


    return (
        <IonFooter translucent={true} className={darkMode ? "dark-theme" : "light-theme"}>
        <IonToolbar >
                <IonTitle>
                    <p className="footer-parag" >&copy; 2025 BioRhythms Calculator by <a href="https://my-portfolio0012.netlify.app">Emeka</a></p>
                </IonTitle>
        </IonToolbar>
      </IonFooter>
    );
}

export default Footer;

