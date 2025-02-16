import { 
  IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSkeletonText, 
  IonInput, IonItem, IonLabel, IonList, IonToggle, useIonViewWillEnter 
} from '@ionic/react';
import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api";
import { useHistory } from 'react-router';
import BiorhythmCard from '../components/BiorhythmCard';
import './Home.css';
import dayjs from 'dayjs';
import { useLocalStorage } from '../Lib/hooks';

interface HomeProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  logout: () => void;
}

const Home: React.FC<HomeProps> = ({ darkMode, setDarkMode, logout }) => {
  const [profile, setProfile] = useState<any>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useLocalStorage('birthDate', '');
  const [Name, setName] = useLocalStorage('Name', '');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().slice(0, 10));
  

  const token = localStorage.getItem("token");
  const history = useHistory();

  const formatDate = (isoString: string) => dayjs(isoString).format('ddd, MMM D, YYYY');

  const calculateAge = (dob: string) => {
    return dayjs().diff(dayjs(dob), 'year');
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;

      try {
        const userProfile = await fetchProfile(token);
        console.log("Fetched Profile:", userProfile); // ✅ Log profile data
        setProfile(userProfile.data);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    loadProfile();
  }, [token]);

  // const username = profile.user.first_name.charAt(0).toUpperCase() + profile.user.first_name.slice(1).toLowerCase();

  return (
    <IonPage   className={darkMode ? "dark-theme" : "light-theme"}>
      <IonHeader className={darkMode ? "dark-theme header " : "light-theme header"}>
        <IonToolbar className={darkMode ? "dark-theme toolbar" : "light-theme toolbar "}>
          <IonTitle className='ion-text-center' style={{marginTop:"70px"}} >BioRhythms Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={darkMode ? "dark-theme ion-padding" : "light-theme ion-padding"}>
        {!loaded ? (
          <div className="skeleton-container">
            <IonSkeletonText animated={true} style={{ width: '60%', height: '40px', marginBottom: '20px' }} />
            <IonSkeletonText animated={true} style={{ width: '90%', height: '250px', marginBottom: '20px' }} />
            <IonSkeletonText animated={true} style={{ width: '100%', height: '50px', marginBottom: '10px' }} />
            <IonSkeletonText animated={true} style={{ width: '100%', height: '50px', marginBottom: '10px' }} />
            <IonSkeletonText animated={true} style={{ width: '100%', height: '50px', marginBottom: '20px' }} />
          </div>
        ) : (
          <>
            <h1>{profile ? `Welcome ${profile.user.first_name.charAt(0).toUpperCase() + profile.user.first_name.slice(1).toLowerCase()}!` : "Welcome!"}</h1>
            <BiorhythmCard birthDate={birthDate} targetDate={targetDate} formatDate={formatDate} darkMode={darkMode} />
            
            <form className="form-container">
              <IonItem className="form-item">
                <IonLabel position="floating" className='form-label'>Date of Birth</IonLabel>
                <IonInput 
                  placeholder="Enter your birthdate" 
                  type="date" 
                  value={birthDate} 
                    onIonChange={e => setBirthDate(e.detail.value!)}
                  className='form-input'  
                />
              </IonItem>
            </form>

            <IonList>
              <IonItem>
                <IonLabel position="floating" className='form-label'>Name</IonLabel>
                <IonInput 
                  placeholder="Enter your Name" 
                  type="text" 
                  value={Name} 
                  onIonInput={e => setName(e.detail.value!)} 
                />
              </IonItem>
            </IonList>

            <IonList>
              <IonItem>
                <IonLabel position="floating" className='form-label'>Target Date</IonLabel>
                <IonInput 
                  placeholder="Enter your target date" 
                  type="date" 
                  value={targetDate} 
                  onIonChange={e => setTargetDate(e.detail.value!)} 
                />
              </IonItem>
            </IonList>

            {birthDate && Name && (
                // <p>Hello {Name.toUpperCase()}, your birthdate is {formatDate(birthDate)} and you are {calculateAge(birthDate)} years old!</p>
                <p className='ion-padding'>
  Hello {Name.charAt(0).toUpperCase() + Name.slice(1).toLowerCase()}, your birthdate is {formatDate(birthDate)} and you are {calculateAge(birthDate)} years old!
</p>

            )}
            
            <IonButton expand="block" onClick={logout} className='ion-padding' >Logout</IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
