import React from "react";
import dayjs from "dayjs";

// calculate using new Date method in javascript
export const calculateBiorhythm = (birthDate:string, targetDate:string) => {
    const birthDay = new Date(birthDate).getTime();
    const targetDay = new Date(targetDate).getTime();
    console.log(birthDay, targetDay);
    const diff = targetDay - birthDay;
    console.log(diff);
    const days = diff / 1000 / 60 / 60 / 24;
    console.log(days);
    return {
        physical: Math.sin(2 * Math.PI * days / 23) ,
        emotional: Math.sin(2 * Math.PI * days / 28),
        intellectual: Math.sin(2 * Math.PI * days / 33)
    };
}
// calculate using dayjs
export const calculateBiorhythm2 = (birthDate:string, targetDate:string) => {
    const birthDay = dayjs(birthDate).startOf('day');
    const targetDay = dayjs(targetDate).startOf('day');
    const diff = targetDay.diff(birthDay, 'days');
    return {
        physical: Math.sin(2 * Math.PI * diff / 23),
        emotional: Math.sin(2 * Math.PI * diff / 28),
        intellectual: Math.sin(2 * Math.PI * diff / 33)
    };
}

export const calculateBiorhythmSeries = (birthDate:string, startDate:string, size:number) => {
    const series = [];
    const startDay = dayjs(startDate).startOf('day');
    for (let i = 0; i < size; i += 4) {
        const targetDate = startDay.add(i, 'days');
        const biorhythms = calculateBiorhythm(birthDate, targetDate.format('YYYY-MM-DD'));
        // series.push(calculateBiorhythm2(birthDate, targetDate));
        series.push({
            date: targetDate.format('D MMM'),
            ...biorhythms
        });
    }
    return series;
}
