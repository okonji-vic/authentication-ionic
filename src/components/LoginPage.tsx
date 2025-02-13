import React, { useState } from "react";
import { IonButton, IonInput, IonContent, IonPage, IonIcon } from "@ionic/react";
import { arrowDownOutline, arrowForwardOutline } from "ionicons/icons";
import { useHistory } from "react-router";

import { login } from "../api"; // Import API functions
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  2
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }
  
    try {
      console.log("Submitting login request...");
      const data = await login(email, password);
  
      console.log("Login successful! Response:", data);
  
      if (data?.token) {
        localStorage.setItem("token", data.token); // ✅ Store token correctly
        setError(""); // ✅ Clear errors if login succeeds
        window.location.href = "/home"; // Redirect to home page
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Login error:", err);
    }
  };

  
  


  
  
  

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <form onSubmit={handleLogin}>
          <div className="login-container">
            <IonInput
              className="input-field email"
              placeholder="Email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value || "")}
            />
            <IonInput
              className="input-field password"
              placeholder="Password"
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value || "")}
            />
            {error && <p className="error-parag">{error}</p>}
            <p className="forgot-password" onClick={() => history.push("/forgot-password")}>
              Forgot password?
            </p>
            <IonButton className="button" type="submit">
              Login
            </IonButton>
            
            <p className="register-parag">
              Don't have an account?
              <IonIcon icon={arrowForwardOutline} className="bounce-forward" /><span onClick={() => history.push("/register")} className="register-span">Register here</span>
            </p> 
            

          
            {/* <IonButton
             className="button-regis"
            onClick={() => history.push("/register")}
            >
            Register
            </IonButton> */}
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
