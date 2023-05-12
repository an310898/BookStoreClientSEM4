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

    document
      .querySelector("#mini_cart_block > div > a")
      .setAttribute("href", "user.html");
    document.getElementById("fhs_top_account_hover").innerHTML = `
    <a href="user.html">
                  <div class="fhs_top_account_button" style="
                      display: flex;
                      flex-direction: row;
                      justify-content: center;
                      align-items: center;
                    ">
                    <div class="icon_account_gray" style="margin-bottom: 3px"></div>
                    <div class="top_menu_label fhs_top_center fhs_nowrap_one" id="loginUser fhs_top_account_title">Xin chào ${helloName}</div>
                  </div>
                </a>`;
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
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
