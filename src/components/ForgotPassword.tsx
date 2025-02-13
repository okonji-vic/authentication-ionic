import { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton, IonLabel, IonItem, IonList, IonToast } from "@ionic/react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("https://your-api.com/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Reset link sent! Check your email.");
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Error sending reset link.");
    }
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Forgot Password</h2>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>
        </IonList>
        <IonButton expand="full" onClick={handleForgotPassword}>
          Send Reset Link
        </IonButton>
        <IonToast isOpen={showToast} message={message} duration={3000} />
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
