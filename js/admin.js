
//  ADMIN PROTECTION 
const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {
  window.location.href = "../pages/dashboard.html";
}


// ================= USER NAME =================
const userName = document.getElementById("userName");

if (userName && user) {
  userName.textContent = "👑 " + user.name;
}


// ================= USERS COUNT =================
const users = JSON.parse(localStorage.getItem("users")) || [];
const usersCount = document.getElementById("usersCount");

if (usersCount) {
  usersCount.textContent = users.length;
}


// ================= LOGIN ACTIVITY =================
const logs = JSON.parse(localStorage.getItem("logs")) || [];

const table = document.getElementById("activityTable");

let failedCount = 0;

logs.forEach((log, index) => {

  if (log.status === "Failed") {
    failedCount++;
  }

  if (table) {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${log.email}</td>
        <td>${log.time}</td>
        <td class="${log.status === "Success" ? "real" : "fake"}">
          ${log.status}
        </td>
      </tr>
    `;
  }

});

//  STATS 
const loginsCount = document.getElementById("loginsCount");
const failedEl = document.getElementById("failedCount");

if (loginsCount) loginsCount.textContent = logs.length;
if (failedEl) failedEl.textContent = failedCount;



