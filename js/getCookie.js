function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function stayLogin() {
  // console.log("staylogin()");
  // console.log(document.getElementById("loginUser"));

  if (getCookie("userId").length > 0 && getCookie("userName").length > 0) {
    let helloName = getCookie("fullName");

    if (getCookie("fullName") === "null") {
      helloName = getCookie("userName");
    }
    document.getElementById(
      "loginUser fhs_top_account_title"
    ).innerHTML = `<a href="user.html?id=${getCookie("userId")}"
    >Xin chào ${helloName}</a>`;
    return getCookie("userId");
  }
  return 0;
}

function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=";
}

function getCookieArrayCart() {
  return getCookie("arrayCart").slice(1, getCookie("arrayCart").length - 1);
}

$(document).ready(function () {
  stayLogin();
});
