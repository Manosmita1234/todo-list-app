
export function getDateData(){
    let date = new Date();

    let day = date.getDate();
    let monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2,"0");
    let amPm = hours>=12? "PM":"AM";
    hours = hours % 12 || 12;
    return `${day} ${month} ${year} , ${hours}:${minutes} ${amPm}`;   
}


