let user = [];
let btn = document.getElementById("btn-login");
let input = document.getElementById("inp-log");
let btnLogout = document.getElementById("logout");

localStorage.user = "";
localStorage.qty = "";
localStorage.lastAcc = "";
if (!localStorage.windowLog) localStorage.windowLog = "login";

window.onload = () => {
  localStorage.windowLog == "welcome" ? showUser() : showLogin();
};

function showLogin() {
  document.getElementById("welcome").style.visibility = "hidden";
  document.getElementById("login").style.visibility = "visible";
  localStorage.windowLog = "login";
}

function showUser() {
  btn.disabled = true;
  localStorage.windowLog = "welcome";
  date = new Date();
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let acc;

  if (minutes < 10) minutes = "0" + minutes;

  if (hours < 10) hours = "0" + hours;

  acc = day + "-" + month + "-" + year + " " + hours + ":" + minutes;

  document.getElementById("welcome").style.visibility = "visible";
  document.getElementById("login").style.visibility = "hidden";

  const exsAcc = user.findIndex((element) => element.name == input.value);

  if (exsAcc != -1) {
    user[exsAcc].qty += 1;
    user[exsAcc].lastAcc = acc;
    localStorage.lastAcc = acc;
    localStorage.user = user[exsAcc].name;
    localStorage.qty = user[exsAcc].qty;
  } else {
    let obj = {
      name: input.value,
      qty: 1,
      lastAcc: acc,
    };
    user.push(obj);
    localStorage.user = document.getElementById("inp-log").value;
    localStorage.lastAcc = acc;
    localStorage.qty = 1;
  }

  document.getElementById("user").innerHTML = "Utente: " + localStorage.user;
  document.getElementById("qty").innerHTML =
    "Numero accessi: " + localStorage.qty;
  document.getElementById("lastAcc").innerHTML =
    "Ultimo accesso: " + localStorage.lastAcc;

  input.value = "";
}

function DisAbi() {
  if (this.value != "") btn.disabled = false;
  else btn.disabled = true;
}

btn.addEventListener("click", showUser);
btnLogout.addEventListener("click", showLogin);
input.addEventListener("keyup", DisAbi);
