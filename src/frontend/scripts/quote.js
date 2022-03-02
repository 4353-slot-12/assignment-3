const todaysDateUTC = new Date();
const timezoneOffset = todaysDateUTC.getTimezoneOffset();
const todayDate = new Date(
    todaysDateUTC.getTime() - timezoneOffset * 60 * 1000
);
const stringDate = todayDate.toISOString().split("T")[0];

const datePicker = document.getElementById("delivery-date");
datePicker.value = stringDate;
datePicker.min = stringDate;