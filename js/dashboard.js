const username = "User";

document.getElementById("welcomeText").textContent =
  `Welcome back, ${username}`;
  (() => {

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "login.html";
    return;
  }

  //  بيانات المستخدم
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const userName = document.getElementById("userName");
  const userImg = document.querySelector(".user-img");
  const welcomeText = document.getElementById("welcomeText");

  if (currentUser) {
    if (userName) userName.textContent = currentUser.name;
    
    if (welcomeText) {
      welcomeText.textContent = "Welcome back, " + currentUser.name;
    }
    if (userImg) {
      userImg.src = `https://ui-avatars.com/api/?name=${currentUser.name}&background=00cfff&color=fff`;
    }
  }
  window.logout = function () {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  };

  // MENU 
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

})();