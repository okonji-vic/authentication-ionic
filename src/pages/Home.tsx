// import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSkeletonText, IonInput, IonItem, IonLabel, IonList, } from '@ionic/react';
// import React, { useEffect, useState } from "react";
// import { fetchProfile } from "../api";
// import { useHistory } from 'react-router';
// import BiorhythmCard from '../components/BiorhythmCard';
// import './Home.css';
// import dayjs from 'dayjs';
// import { useLocalStorage } from '../Lib/hooks';

// const Home: React.FC = () => {
//   const [profile, setProfile] = useState<any>(null);
//   const [loaded, setLoaded] = useState<boolean>(false);
//   const [birthDate, setBirthDate] = useLocalStorage('birthDate', '');
//   const [Name, setName] = useLocalStorage('Name', '');
//   const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().slice(0, 10));
//   // const [targetDate, setTargetDate] = useState(new Date(2022, 11, 32).toISOString().slice(0, 10));  // 2022-12-31
//   const token = localStorage.getItem("token");
//   const history = useHistory();

//   const formatDate = (isoString: string) => {
//     return dayjs(isoString).format('ddd, MMM D, YYYY');
//   }

//   const calculateAge = (dob: string) => {
//     let today = new Date();
//     let birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     let m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   }

//   const calculateAge2 = (dob: string) => {
//     let today = new Date();
//     let birthDate = new Date(dob);
    
//     let age = today.getFullYear() - birthDate.getFullYear();
    
//     // Create a "birthday" for the current year
//     let birthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
//     // If today is before the birthday, subtract 1 from age
//     if (today < birthdayThisYear) {
//         age--;
//     }

//     return age;
//   };
  
//   const calculateAge3 = (dob: string) => {
//     let birthday = dayjs(dob);
//     let today = dayjs();
//     let age = today.diff(birthday, 'year');
//     return age;
//   }


//   useEffect(() => {
//     const loadProfile = async () => {
//       if (!token) return;

//       try {
//         const userProfile = await fetchProfile(token);
//         console.log("Fetched Profile:", userProfile); // ✅ Log profile data
//         setProfile(userProfile.data);
//         setLoaded(true);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     loadProfile();
//   }, [token]);

//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/home";
//   }
//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>BioRhythms Calculator</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       {loaded ? (
//         <IonContent fullscreen className="ion-padding">
//           <h1>{profile ? `Welcome ${profile.user.middle_name}!` : "Loading..."}</h1>
//           <BiorhythmCard birthDate={birthDate} targetDate={targetDate} formatDate={formatDate} />
//           <IonList>
//           <IonItem>
//             <IonLabel position="floating">Date of Birth</IonLabel>
//             <IonInput placeholder="Enter your birthdate" type="date" value={birthDate} onIonChange={e => setBirthDate(e.detail.value)}></IonInput>
//           </IonItem>
//         </IonList>
//         <IonList>
//           <IonItem>
//             <IonLabel position="floating">Name</IonLabel>
//             <IonInput placeholder="Enter your Name" type="text" value={Name} onIonChange={e => setName(e.detail.value)}></IonInput>
//           </IonItem>
//         </IonList>
//         <IonList>
//           <IonItem>
//             <IonLabel position="floating">Target Date</IonLabel>
//             <IonInput placeholder="Enter your target date" type="date" value={targetDate} onIonChange={e => setTargetDate(e.detail.value)}></IonInput>
//           </IonItem>
//         </IonList>
//           {birthDate && Name && <p>Hello {Name}, your birthdate is {formatDate(birthDate)} and you are {calculateAge3(birthDate)}yrs old!</p>}
//           <IonButton onClick={logout}>Logout</IonButton>
        
//       </IonContent>
//       ) : (
//         <IonContent fullscreen>
//         <IonHeader collapse="condense">
//           <IonToolbar>
//             <IonTitle size="large"></IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         {/* <h1>Welcome {profile?.user.middle_name || "User"}!</h1> */}
//         <h1>
//         <IonSkeletonText animated={true} style={{ width: '30%', height: "50%" }}></IonSkeletonText>
//         </h1>
//         <p>
//         <IonSkeletonText animated={true} style={{ width: '50%' }}></IonSkeletonText>
//         </p>
//         <p>
//         <IonSkeletonText animated={true} style={{ width: '40%' }}></IonSkeletonText>
//         </p>
        
//         <IonSkeletonText animated={true} style={{ width: '20%', height: "10%" }}></IonSkeletonText>
        
//       </IonContent>
//       )}
//     </IonPage>
//   );
// };

// export default Home;

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
}

const Home: React.FC<HomeProps> = ({ darkMode, setDarkMode }) => {
  const [profile, setProfile] = useState<any>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useLocalStorage('birthDate', '');
  const [Name, setName] = useLocalStorage('Name', '');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().slice(0, 10));
  // const [darkMode, setDarkMode] = useState<boolean>(false);

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

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/home";
  };
  // const username = profile.user.first_name.charAt(0).toUpperCase() + profile.user.first_name.slice(1).toLowerCase();

  return (
    <IonPage className={darkMode ? "dark-theme" : "light-theme"}>
      <IonHeader className={darkMode ? "dark-theme header" : "light-theme header"}>
        <IonToolbar className={darkMode ? "dark-theme toolbar" : "light-theme toolbar"}>
          <IonTitle>BioRhythms Calculator</IonTitle>
          <IonToggle 
            checked={darkMode} 
            onIonChange={() => setDarkMode(!darkMode)}
            slot="end"
            className={darkMode ? "dark-theme toggle" : "light-theme toggle"}
          />
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
            <BiorhythmCard birthDate={birthDate} targetDate={targetDate} formatDate={formatDate} />
            
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
                <p>
  Hello {Name.charAt(0).toUpperCase() + Name.slice(1).toLowerCase()}, your birthdate is {formatDate(birthDate)} and you are {calculateAge(birthDate)} years old!
</p>

            )}
            
            <IonButton expand="block" onClick={logout} className='button-logout' >Logout</IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
