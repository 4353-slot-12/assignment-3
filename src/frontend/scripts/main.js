// Auth user view
// const anonNavBar = document.getElementById('nav-anonymous-user');
// anonNavBar.style.display = "none";

// const callToAction = document.getElementById('call-to-action');
// if (callToAction) callToAction.style.display = "none";


// Anon user view 
const authNavBar = document.getElementById('nav-authenticated-user');
authNavBar.style.display = "none";

// Logout function
async function logout() {
    const resp = await fetch({
        method: "POST",
        url: "/api/logout",
    })
}
