import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import React from "react";
import { calculateBiorhythm } from "../Lib/biorhythm";
import { calculateBiorhythmSeries } from "../Lib/biorhythm";
import BiorhythmChart from "../Lib/BiorhythmChart";

interface BiorhythmCardProps {
    birthDate: string;
    targetDate: string;
    formatDate: (isoString: string) => string;
}
const BiorhythmCard: React.FC<BiorhythmCardProps> = ({ birthDate, targetDate, formatDate }) => {
    if (!birthDate || !targetDate) return null;



    return (
        <IonCard>
            <IonCardHeader>
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