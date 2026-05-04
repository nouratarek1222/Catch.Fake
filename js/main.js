
(() => {
const userName = document.getElementById("userName");
const user = JSON.parse(localStorage.getItem("user"));

if (userName && user) {
  userName.textContent = "👤 " + user.name;
}
// ================= SOUNDS =================
const successSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
successSound.volume = 0.3;

// ================= CONTACT FORM =================
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 🔄 Loading state
    sendBtn.textContent = "Sending...";
    sendBtn.disabled = true;

    setTimeout(() => {

      successSound.currentTime = 0;
      successSound.play();

      showToast("Message sent successfully! We’ll contact you soon 💌", "success");

      contactForm.reset();

      sendBtn.textContent = "Send message";
      sendBtn.disabled = false;

    }, 1500); 
  });
}


// ================= TOAST =================
function showToast(message, type = "success") {

  Toastify({
    text: `
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:20px;">
          ${type === "success" ? "✅" : "⚠️"}
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
          ? "linear-gradient(135deg, #00f5a0, #00d9f5)"
          : "linear-gradient(135deg, #ff416c, #ff4b2b)",
      borderRadius: "15px",
      padding: "15px 25px",
      fontSize: "15px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
    }

  }).showToast();
}
const forgotForm = document.getElementById("forgotForm");
const resetBtn = document.getElementById("resetBtn");

if (forgotForm) {
  forgotForm.addEventListener("submit", function (e) {
    e.preventDefault();

    resetBtn.textContent = "Sending...";
    resetBtn.disabled = true;
    setTimeout(() => {
      showToast(" Reset link sent! Check your email 💌", "success");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    }, 1500);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const closeBtn = document.getElementById("close-btn");
  const overlay = document.getElementById("overlay");

  if (menuToggle && navLinks && closeBtn && overlay) {

    menuToggle.addEventListener("click", () => {
      navLinks.classList.add("active");
      overlay.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
      navLinks.classList.remove("active");
      overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
      navLinks.classList.remove("active");
      overlay.classList.remove("active");
    });

  }

});
})();



