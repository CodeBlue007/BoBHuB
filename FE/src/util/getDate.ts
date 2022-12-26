

export const getHourmin = (ISOstring:string, timeLimit:number) => {
    const date = new Date(ISOstring);
    let hour = date.getHours();
    let minute = date.getMinutes() + timeLimit;
    if(minute >= 60){
        hour += 1;
        minute-=60;
    }  

    return [hour, minute];
} 