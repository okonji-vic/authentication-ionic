import React, { useState } from "react";
import { IonButton, IonInput, IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonIcon } from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { register } from "../api";
import "./RegisterPage.css";

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState<string>("");

  

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Debug: Log form data
    console.log("Form Data before sending:", JSON.stringify(formData, null, 2));

    // ✅ Validate all fields
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        setError(`All fields are required! Missing: ${key}`);
        return;
      }
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await register(formData);
      console.log("API Response:", response); // ✅ Debug API response

      if (response.status) {
        history.push("/login"); // Redirect to login after successful registration
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };



  return (
    <IonPage className="register-page">
      <IonContent className="ion-padding">
        <form onSubmit={handleRegister}>
          <div className="register-container">
            <IonCard className="register-card">
            <IonCardHeader>
                <IonCardTitle className="ion-text-center" style={{color:"blue"}}>BioRhythym Register</IonCardTitle>
              </IonCardHeader>
            </IonCard>
            <IonInput
              className="input-field"
              placeholder="First Name"
              autocomplete="given-name"
              onIonChange={(e) =>
                setFormData({ ...formData, first_name: e.detail.value || "" })
              }
            />
            <IonInput
              className="input-field"
              placeholder="Middle Name"
              autocomplete="additional-name"
              onIonChange={(e) =>
                setFormData({ ...formData, middle_name: e.detail.value || "" })
              }
            />
            <IonInput
              className="input-field"
              placeholder="Last Name"
              autocomplete="family-name"
              onIonChange={(e) =>
                setFormData({ ...formData, last_name: e.detail.value || "" })
              }
            />
            <IonInput
              className="input-field"
              placeholder="Email"
              autocomplete="email"
              type="email"
              onIonChange={(e) =>
                setFormData({ ...formData, email: e.detail.value || "" })
              }
            />
            <IonInput
              className="input-field"
              placeholder="Phone Number"
              autocomplete="tel"
              onIonChange={(e) =>
                setFormData({ ...formData, phone_number: e.detail.value || "" })
              }
            />
            <IonInput
              className="input-field"
              placeholder="Password"
              autocomplete="new-password"
              type="password"
              onIonChange={(e) =>
                setFormData({ ...formData, password: e.detail.value || "" })
              }
            />
            <IonInput
              className="input-field"
              placeholder="Confirm Password"
              autocomplete="new-password"
              type="password"
              onIonChange={(e) =>
                setFormData({
                  ...formData,
                  confirm_password: e.detail.value || "",
                })
              }
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <IonButton className="button-register" type="submit">
              Register
            </IonButton>
            <p className="login-parag">Already have an account?</p>
            <IonIcon icon={arrowForwardOutline} className="bounce-forward" />

            <IonButton
              className="button-login"
              onClick={() => history.push("/login")}
            >
              Login
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
