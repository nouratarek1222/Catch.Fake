// ================= SOUNDS =================
const successSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
const errorSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3");
successSound.volume = 0.3;
errorSound.volume = 0.3;

// LOGIN 
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      showToast("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      showToast("Invalid email format");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters");
      return;
    }

    loginBtn.textContent = "Loading...";
    loginBtn.disabled = true;

    setTimeout(() => {

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const storedUser = users.find(
        u =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );

      if (!storedUser) {
        showToast("Invalid email or password");
        resetBtn();
        return;
      }

      showToast("Login successful ✔️", "success");

      localStorage.setItem("isLoggedIn", true);

      //  NEW
      localStorage.setItem("user", JSON.stringify(storedUser));

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);

      resetBtn();

    }, 1500);
  });
}
function resetBtn() {
  loginBtn.textContent = "SIGN IN";
  loginBtn.disabled = false;
}

//  SIGNUP 
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!name || !email || !password || !confirmPassword) {
      showToast("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      showToast("Invalid email format");
      return;
    }

    if (!validateStrongPassword(password)) {
      showToast("Password must contain uppercase, lowercase, number, symbol");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    //  منع التكرار
    const emailExists = users.some(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      showToast("Email already exists");
      return;
    }
    const user = { name, email, password };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", true);
    showToast("Account created successfully ✔️", "success");
    
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);
  });
}


// ================= HELPERS =================
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
}

function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}


// ================= TOAST =================
function showToast(message, type = "error") {

  Toastify({
    text: `
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:18px;">
          ${type === "success" ? "✔️" : "⚠️"}
        </span>
        <span>${message}</span>
      </div>
    `,
    duration: 3000,
    gravity: "top",
    position: "center",
    escapeMarkup: false,



style: {
  background:
    type === "success"
      ? "linear-gradient(135deg, #00c9ff, #92fe9d)"
      : "linear-gradient(135deg, #ff416c, #ff4b2b)",
  borderRadius: "15px",
  padding: "14px 25px",
  fontSize: "15px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
}


  }).showToast();

  if (type === "success") {
    successSound.currentTime = 0;
    successSound.play();
  } else {
    errorSound.currentTime = 0;
    errorSound.play();
  }
}

// LOGOUT 
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

//  NAVBAR 
const isLoggedIn = localStorage.getItem("isLoggedIn");

const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");

if (isLoggedIn) {
  if (loginLink) loginLink.style.display = "none";
  if (signupLink) signupLink.style.display = "none";
}


//  USER 
const user = JSON.parse(localStorage.getItem("user"));

const userName = document.getElementById("userName");
const userImg = document.querySelector(".user-img");
if (user) {
  if (userName) {
    userName.textContent = user.name;
  }
  if (userImg) {
    userImg.src = `https://ui-avatars.com/api/?name=${user.name}&background=00cfff&color=fff`;
  }
}

function goToDashboard() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
showToast("Access denied — please login first ", "error");
    return;
  }
  window.location.href = "dashboard.html";
}

