import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import React from "react";
import { calculateBiorhythm } from "../Lib/biorhythm";
import { calculateBiorhythmSeries } from "../Lib/biorhythm";
import BiorhythmChart from "../Lib/BiorhythmChart";

interface BiorhythmCardProps {
    birthDate: string;
    targetDate: string;
    formatDate: (isoString: string) => string;
    darkMode: boolean;
}
const BiorhythmCard: React.FC<BiorhythmCardProps> = ({ birthDate, targetDate, formatDate, darkMode }) => {
    if (!birthDate || !targetDate) return null;



    return (
        <IonCard className={darkMode ? "dark-theme ion-card" : "light-theme ion-card"}>
            <IonCardHeader className="ion-text-center"> 
                <IonCardTitle className="card-title">{formatDate(targetDate)}</IonCardTitle>
                <BiorhythmChart birthDate={birthDate} targetDate={targetDate} calculateBiorhythmSeries={calculateBiorhythmSeries} />
            </IonCardHeader>
            <IonCardContent>
                {birthDate && targetDate && (
                    <>
                        
                        <p style={{color:"red"}}>Physical: {calculateBiorhythm(birthDate, targetDate).physical.toFixed(4)}</p>
                        <p style={{color:"blue"}}>Emotional: {calculateBiorhythm(birthDate, targetDate).emotional.toFixed(4)}</p>
                        <p style={{color:"green"}}>Intellectual: {calculateBiorhythm(birthDate, targetDate).intellectual.toFixed(4)}</p>
                    </>
                )}
            </IonCardContent>
        </IonCard>
    );
}

export default BiorhythmCard;