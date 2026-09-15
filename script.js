let aside_btn = document.querySelector("#aside-btn");
let aside = document.querySelector("#aside");
let content = document.querySelector("#content");

aside_btn.onclick = () => {
    aside.classList.toggle("active-aside");
    content.classList.toggle("active-content");

    aside_btn.classList.toggle("active");

    if (aside_btn.classList.contains("active")) {
        aside_btn.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
    } else {
        aside_btn.innerHTML = '<i class="fa-solid fa-bars"></i>'
    }
};

//clock
function updateDateTime() {

    const now = new Date();

    // Time
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");

    // Date
    const day = now.getDate();

    const months = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];

    const month = months[now.getMonth()];
    const year = now.getFullYear();

    // Day name
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const dayName = days[now.getDay()];

    // Display
    document.querySelector(".time").textContent =
        `${hours}:${minutes}:${seconds}`;

    document.querySelector(".date").textContent =
        `${day} ${month} ${year}`;

    document.querySelector(".day").textContent =
        dayName;
}

updateDateTime();

setInterval(updateDateTime, 1000);
//login 
/* ========== LOGIN / SIGNUP ELEMENTS==================== */
// ===============================
// AUTH ELEMENTS
// ===============================

const authSection = document.querySelector("#auth-section");
const loginBox = document.querySelector("#login-box");
const signupBox = document.querySelector("#signup-box");

const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");

const showSignup = document.querySelector("#show-signup");
const showLogin = document.querySelector("#show-login");


// ===============================
// SHOW USER DATA
// ===============================

function showUserData(user) {

    document.querySelector("#user-name").childNodes[0].nodeValue =
        user.name;

    document.querySelector("#user-profession").textContent =
        user.category;

    document.querySelector("#user-pic").src =
        user.image;

    document.querySelector(".urname").textContent =
        user.name;

    document.querySelector("#user-email").textContent =
        user.email;
}


// ===============================
// CHECK LOGIN STATUS
// ===============================

const savedUser =
    JSON.parse(localStorage.getItem("user"));

const loggedIn =
    localStorage.getItem("loggedIn");


// Agar user already logged in hai
if (savedUser && loggedIn === "true") {

    showUserData(savedUser);

    document.body.classList.add("logged-in");

} else {

    document.body.classList.remove("logged-in");

}


// ===============================
// LOGIN / SIGNUP SWITCH
// ===============================

showSignup.onclick = () => {

    loginBox.style.display = "none";
    signupBox.style.display = "block";

};


showLogin.onclick = () => {

    signupBox.style.display = "none";
    loginBox.style.display = "block";

};


// ===============================
// SIGNUP
// ===============================

signupForm.onsubmit = (event) => {

    event.preventDefault();

    const name =
        document.querySelector("#signup-name").value;

    const category =
        document.querySelector("#signup-category").value;

    const email =
        document.querySelector("#signup-email").value;

    const password =
        document.querySelector("#signup-password").value;

    const imageFile =
        document.querySelector("#signup-image").files[0];


    if (!imageFile) {

        alert("Please select a profile picture.");
        return;

    }


    const reader = new FileReader();


    reader.onload = () => {

        const user = {

            name: name,
            category: category,
            email: email,
            password: password,
            image: reader.result

        };


        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        alert("Account created successfully!");


        signupForm.reset();

        signupBox.style.display = "none";
        loginBox.style.display = "block";

    };


    reader.readAsDataURL(imageFile);

};


// ===============================
// LOGIN
// ===============================

loginForm.onsubmit = (event) => {

    event.preventDefault();


    const email =
        document.querySelector("#login-email").value;

    const password =
        document.querySelector("#login-password").value;


    const savedUser =
        JSON.parse(localStorage.getItem("user"));


    if (!savedUser) {

        alert("Please create an account first.");
        return;

    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        // Login status save
        localStorage.setItem(
            "loggedIn",
            "true"
        );


        // User information show
        showUserData(savedUser);


        // Dashboard show
        document.body.classList.add("logged-in");


    } else {

        alert("Incorrect email or password.");

    }

};


// ===============================
// LOGOUT
// ===============================

const logoutLink =
    document.querySelector('a[href="logout.html"]');


if (logoutLink) {

    logoutLink.addEventListener("click", (event) => {

        event.preventDefault();


        localStorage.removeItem("loggedIn");


        document.body.classList.remove("logged-in");


        loginBox.style.display = "block";
        signupBox.style.display = "none";

    });

}
/* ================= PERFORMANCE CHART ================= */

