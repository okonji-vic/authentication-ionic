import React, { useEffect, useRef, useState } from "react";
import { IonButton, IonInput, IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import { register } from "../api";
import "./RegisterPage.css";

const RegisterPage2: React.FC = () => {
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

  // 🔍 Refs for inputs to detect autofill
  const firstNameRef = useRef<HTMLIonInputElement>(null);
  const middleNameRef = useRef<HTMLIonInputElement>(null);
  const lastNameRef = useRef<HTMLIonInputElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const phoneRef = useRef<HTMLIonInputElement>(null);

  // 🛠 Detect autofill using MutationObserver
  useEffect(() => {
    const observer = new MutationObserver(async () => {
      const firstNameInput = await firstNameRef.current?.getInputElement();
      const middleNameInput = await middleNameRef.current?.getInputElement();
      const lastNameInput = await lastNameRef.current?.getInputElement();
      const emailInput = await emailRef.current?.getInputElement();
      const phoneInput = await phoneRef.current?.getInputElement();

      setFormData((prev) => ({
        ...prev,
        first_name: firstNameInput?.value || "",
        middle_name: middleNameInput?.value || "",
        last_name: lastNameInput?.value || "",
        email: emailInput?.value || "",
        phone_number: phoneInput?.value || "",
      }));
    });

    const observeInputs = async () => {
      const inputs = [
        await firstNameRef.current?.getInputElement(),
        await middleNameRef.current?.getInputElement(),
        await lastNameRef.current?.getInputElement(),
        await emailRef.current?.getInputElement(),
        await phoneRef.current?.getInputElement(),
      ];

      inputs.forEach((input) => {
        if (input) observer.observe(input, { attributes: true, childList: true, subtree: true });
      });
    };

    observeInputs();

    return () => observer.disconnect();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Data before sending:", JSON.stringify(formData, null, 2));

    // ✅ Validate fields
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
      console.log("API Response:", response);

      if (response.status) {
        history.push("/login");
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <IonPage>
      {/* <IonContent className="ion-padding"> */}
        {/* <form onSubmit={handleRegister}> */}
          {/* <div className="register-container">
            <IonInput ref={firstNameRef} className="input-field" placeholder="First Name" autoComplete="given-name"
              onIonChange={(e) => setFormData({ ...formData, first_name: e.detail.value || "" })} />
            
            <IonInput ref={middleNameRef} className="input-field" placeholder="Middle Name" autoComplete="additional-name"
              onIonChange={(e) => setFormData({ ...formData, middle_name: e.detail.value || "" })} />
            
            <IonInput ref={lastNameRef} className="input-field" placeholder="Last Name" autoComplete="family-name"
              onIonChange={(e) => setFormData({ ...formData, last_name: e.detail.value || "" })} />
            
            <IonInput ref={emailRef} className="input-field" placeholder="Email" autoComplete="email" type="email"
              onIonChange={(e) => setFormData({ ...formData, email: e.detail.value || "" })} />
            
            <IonInput ref={phoneRef} className="input-field" placeholder="Phone Number" autoComplete="tel"
              onIonChange={(e) => setFormData({ ...formData, phone_number: e.detail.value || "" })} />
            
            <IonInput className="input-field" placeholder="Password" autoComplete="new-password" type="password"
              onIonChange={(e) => setFormData({ ...formData, password: e.detail.value || "" })} />
            
            <IonInput className="input-field" placeholder="Confirm Password" autoComplete="new-password" type="password"
              onIonChange={(e) => setFormData({ ...formData, confirm_password: e.detail.value || "" })} />
            
            {error && <p style={{ color: "red" }}>{error}</p>} */}
            
            <IonButton className="button-register" type="submit">Register</IonButton>
            <p className="login-parag">Already have an account?</p>
            <IonButton className="button-login" onClick={() => history.push("/login")}>Login</IonButton>
          {/* </div>
        </form>
      </IonContent> */}
    </IonPage>
  );
};

export default RegisterPage2;
