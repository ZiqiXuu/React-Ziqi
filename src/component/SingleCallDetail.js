import React from 'react';
import './callDetailPage.css'


const SingleCallDetail = (props) => {
    const call = props?.call
    console.log(call)
    const [date, timeAndRest = ""] = call?.created_at?.split("T") || []
    const [hours = "", minutes = ""] = timeAndRest.split(":")
    const time = `${hours}:${minutes}`

    const secondsToHms = (seconds) => {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor(seconds % 3600 / 60);
        let secs = seconds % 60;
        let output = '';
        if (hours > 0) {
            output += hours + "h ";
        }
        if (minutes > 0) {
            output += minutes + "m ";
        }
        output += secs + "s";
        return output.trim();
    }

    return (
        <div>
            <div className='content'>
                <div>From: {call?.from}</div>
                <div>To: {call?.to}</div>
                <div>Duration: {secondsToHms(call?.duration)}</div>
                <div>Call At: {date} {time}</div>
                <div>Type: {call?.call_type} call</div>
                <div>Aircall number: {call?.via}</div>
            </div>
        </div>

    );
};

export default SingleCallDetail;