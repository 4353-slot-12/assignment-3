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
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(err => console.error(err));