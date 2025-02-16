import React from "react";
import { useHistory } from "react-router";
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon,IonCard } from "@ionic/react";
import { refresh } from "ionicons/icons";


const ErrorComponent: React.FC = () => {
    const history = useHistory();

    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <IonPage>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Error</IonTitle>
    </IonToolbar>
  </IonHeader>

  <IonContent>
    <IonCard className="ion-padding">
      <h2>Error Page</h2>
      <p className="er">An error occurred. Please try again.</p>
      <IonButton onClick={() => refreshPage()}>
        <IonIcon icon={refresh} /> Refresh
      </IonButton>
    </IonCard>
  </IonContent>
</IonPage>

        
    );
}

export default ErrorComponent;