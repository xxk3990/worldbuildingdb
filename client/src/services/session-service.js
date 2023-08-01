export const minutesRemaining = (now) => { 
    const loginTime = localStorage.getItem("loginTime")
    const expiration = localStorage.getItem("expiration")
    const timeSinceLogin = now - loginTime; //get milliseconds since user logged in
    const minutesSince = timeSinceLogin / 60000; //convert it to minutes
    const minsLeft = expiration - minutesSince; //subtract # of minutes logged in from token exp time
    const rounded = Math.round(minsLeft)
    return rounded;
}

