import React from "react";
import { useHistory } from "react-router";
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";


const About: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>About</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h1>About Page</h1>
                <p>This is a simple authentication app built with Ionic React.</p>
                <IonButton onClick={() => history.push("/home")}>Go to Home</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default About;


