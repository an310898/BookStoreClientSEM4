const userId = getCookie("userId");
function SaveUserInformation() {
  document.querySelector("#alert-fullname").innerHTML = ``;
  document.querySelector("#alert-phone").innerHTML = ``;
  const fullName = document.querySelector("#fullName")?.value || "";
  const phoneNumber = document.querySelector("#telephone")?.value || "";
  const gender =
    document
      .querySelectorAll("#gender input.gender-radio:checked")[0]
      ?.getAttribute("id") || 0;
  const cityId = document.getElementById("city_id")?.value;
  const districtId = document.getElementById("district_id")?.value;
  const address = document.getElementById("address")?.value;

  if (fullName.length === 0 || phoneNumber.length < 10) {
    if (fullName.length === 0) {
      document.querySelector(
        "#alert-fullname"
      ).innerHTML = `<span style="color:red;margin-left:5px">Vui lòng điền họ tên hợp lệ</span>`;
    }
    if (phoneNumber.length < 10) {
      document.querySelector(
        "#alert-phone"
      ).innerHTML = `<span style="color:red;margin-left:5px">Vui lòng điền số điện thoại hợp lệ</span>`;
    }
    return;
  }

  const formData = {
    UserId: userId,
    FullName: fullName,
    PhoneNumber: phoneNumber,
    Gender: gender === "male" ? 0 : 1,
    CityId: cityId,
    DistrictId: districtId,
    Address: address,
  };
  console.log(formData);
  //   return;
  fetch("http://localhost:8080/api/dynamic-procedure/SaveUserInformation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] === 1) {
        setCookie("fullName", fullName, Date.now());
        window.location.href = "user.html";
        alert("Cập nhật thành công");
      } else {
        alert("Cập nhật không thành công");
      }
    });
}
$(document).ready(function () {
  getUserDetail();
});
async function getUserDetail() {
  await getCity();

  const formData = { UserId: userId };
  await fetch("http://localhost:8080/api/dynamic-procedure/GetUserDetail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#result-set-1"].length === 0) {
        alert("Bạn chưa đăng nhập tài khoản");
        window.location.href = "login.html";
      }
      const user = x["#result-set-1"][0];

      if (user.Gender) {
        document.getElementById("female").checked = "true";
      } else {
        document.getElementById("male").checked = "true";
      }
      document.getElementById("fullName").value = user.FullName;
      document.getElementById("telephone").value = user.PhoneNumber;
      document.getElementById("city_id").value = user.CityId;
      processGetDistrictByCityId(user);

      document.getElementById("address").value = user.Address;
    });
}
async function getCity() {
  await fetch("http://localhost:8080/api/dynamic-procedure/GetCity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .then(x => {
      //   console.log(x["#result-set-1"]);

      const data = x["#result-set-1"]
        .map(y => {
          return `
        <option value="${y.Id}">${y.CityName}</option>
        `;
        })
        .join("");
      document.getElementById("city_id").innerHTML =
        `<option value="" selected="" data-select2-id="9">Chọn tỉnh/thành Phố</option>` +
        data;
    });
}

async function GetDistrictByCityId(cityId) {
  const formData = {
    CityId: cityId,
  };
  const res = await fetch(
    "http://localhost:8080/api/dynamic-procedure/GetDistrictByCityId",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  );
  const data = await res.json();
  return data;
}
async function processGetDistrictByCityId(user) {
  const data = await GetDistrictByCityId(user.CityId);
  document.getElementById("district_id").removeAttribute("disabled");

  document.getElementById("district_id").innerHTML = data["#result-set-1"].map(
    y => {
      {
        return `
          <option value="${y.Id}">${y.DistrictName}</option>
        `;
      }
    }
  );

  document.getElementById("district_id").value = user.DistrictId;
}

async function DOMDistrictCity(elem) {
  const data = await GetDistrictByCityId(elem.value);
  document.getElementById("district_id").removeAttribute("disabled");
  document.getElementById("district_id").innerHTML = data["#result-set-1"].map(
    y => {
      {
        return `
          <option value="${y.Id}">${y.DistrictName}</option>
        `;
      }
    }
  );
}

function logout() {
  deleteCookie("userId");
  deleteCookie("fullName");
  deleteCookie("userName");
  window.location.href = "index.html";
}

function changePassForm(elem) {
  document.querySelector("ul li.current").classList.remove("current");
  elem.classList.add("current");
  document.querySelector(".my-account").style.display = "none";
  document.querySelector(".change-password").style.display = "block";
}
function updateUserForm(elem) {
  document.querySelector("ul li.current").classList.remove("current");
  elem.classList.add("current");
  document.querySelector(".change-password").style.display = "none";
  document.querySelector(".my-account").style.display = "block";
}
function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}
function changeUserPassword() {
  document.getElementById("alert-new-pass").innerHTML = "";
  document.getElementById("alert-current-pass").innerHTML = "";
  const currentPassword =
    document.getElementById("current_password")?.value || "";
  const password = document.getElementById("password")?.value || "";
  const confirmation = document.getElementById("confirmation")?.value || "";
  if (password.length < 6 || password !== confirmation) {
    if (password.length < 6) {
      document.getElementById(
        "alert-new-pass"
      ).innerHTML = `<div style="color:red;margin-top:5px;margin-left: 5px;
">Mật khẩu mới tối thiểu 6 ký tự</div>`;
    }
    if (password !== confirmation) {
      document.querySelector(
        "#alert-confirm"
      ).innerHTML = `<div style="color:red;margin-top:5px;margin-left: 5px;
">Mật khẩu nhập lại không trùng khớp</div>`;
    }

    return;
  }
  const formData = {
    UserId: userId,
    CurrentPassword: currentPassword,
    NewPassword: password,
  };
  console.log(formData);
  fetch("http://localhost:8080/api/dynamic-procedure/ChangeUserPassword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      console.log(x["#result-set-1"][0].result);
      if (x["#result-set-1"][0].result === 0) {
        document.getElementById(
          "alert-current-pass"
        ).innerHTML = `<div style="color:red;margin-top:5px;margin-left: 5px;
">Mật khẩu hiện tại không đúng</div>`;
        return;
      }

      if (x["#update-count-1"] === 1) {
        alert("Đổi mật khẩu thành công");
        window.location.href = "user.html";
      }
    });
}

function checkConfirmPass(elem) {
  const password = document.getElementById("password").value;
  if (password === elem.value) {
    document.querySelector("#alert-confirm").innerHTML = "";
    document
      .querySelector("#btn-change-account-pass")
      .removeAttribute("disabled");
  } else {
    document.querySelector(
      "#alert-confirm"
    ).innerHTML = `<div style="color:red;margin-top:5px;margin-left: 5px;
">Mật khẩu nhập lại không trùng khớp</div>`;
  }
}
