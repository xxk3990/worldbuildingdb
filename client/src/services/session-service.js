import { Navigate } from "react-router-dom";
import React from "react";
import { handleLogout } from "./auth-service";

export const minsTillLogout = (now) => { 
    const loginTime = localStorage.getItem("loginTime")
    const expiration = localStorage.getItem("expiration")
    const msecsSince = now - loginTime; //get milliseconds since user logged in
    const minsSince = msecsSince / 60000; //convert it to minutes
    const minsLeft = expiration - minsSince; //subtract # of minutes logged in from token exp time
    return Math.round(minsLeft); //round off decimals
}

export const sessionInterval = (minutes, setMinutes) => {
    window.interval = setInterval(() => {
        const newMinute = minutes - 1;
        console.log("time left: ", newMinute)
        setMinutes(newMinute);
        if(newMinute === 0) {
            endInterval()
            return 0;
        }
    }, 60000)
    if(minutes <= 0) {
        console.log("clear interval condition reached");
        handleLogout()
        window.location.href = "/login"
    }
    const endInterval = () => {
        clearInterval(window.interval)
    }
}

