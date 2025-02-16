import React from "react";
import { useHistory } from "react-router";
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";


const Page404: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>404</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h1>404 Page</h1>
                <p>Oops! Page not found.</p>
                <IonButton onClick={() => history.push("/home")}>Go to Home</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Page404;