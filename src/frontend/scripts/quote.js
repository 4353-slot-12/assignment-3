const todaysDateUTC = new Date();
const timezoneOffset = todaysDateUTC.getTimezoneOffset();
const todayDate = new Date(
    todaysDateUTC.getTime() - timezoneOffset * 60 * 1000
);
const stringDate = todayDate.toISOString().split("T")[0];

const datePicker = document.getElementById("delivery-date");
datePicker.value = stringDate;
datePicker.min = stringDate;



fetch('http://localhost:8000/api/profile', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
})
	.then(response => response.json())
	.then(data => console.log(JSON.stringify(data, null, 4)))
	.catch(err => console.error(err));