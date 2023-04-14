function validateField() {
  let result = true;
  if (document.getElementById("fhs_shipping_fullname").value.length === 0) {
    document.getElementById("fullNameInput").innerText =
      "Vui lòng nhập họ tên người nhận";
    result = false;
  } else {
    document.getElementById("fullNameInput").innerText = "";
  }
  if (
    document.getElementById("fhs_shipping_email").value.length === 0 &&
    !isValidEmail(document.getElementById("fhs_shipping_email"))
  ) {
    document.getElementById("emailInput").innerText =
      "Vui lòng nhập email hợp lệ";
    result = false;
  } else {
    document.getElementById("emailInput").innerText = "";
  }
  if (document.getElementById("fhs_shipping_telephone").value.length < 10) {
    document.getElementById("phoneInput").innerText =
      "Vui lòng nhập số điện thoại hợp lệ";
    result = false;
  } else {
    document.getElementById("phoneInput").innerText = "";
  }
  if (document.getElementById("fhs_shipping_city_select").value.length === 0) {
    document.getElementById("cityInput").innerText =
      "Vui lòng chọn tỉnh thành phố";
    result = false;
  } else {
    document.getElementById("cityInput").innerText = "";
  }
  if (
    document.getElementById("fhs_shipping_district_select").value.length === 0
  ) {
    document.getElementById("districtInput").innerText =
      "Vui lòng chọn quận huyện";
    result = false;
  } else {
    document.getElementById("districtInput").innerText = "";
  }
  if (document.getElementById("fhs_shipping_street").value.length === 0) {
    document.getElementById("addressInput").innerText =
      "Vui lòng nhập địa chỉ nhận hàng";
    result = false;
  } else {
    document.getElementById("addressInput").innerText = "";
  }

  return result;
}

function itemCheckOut() {
  const formData = {
    ArrayCart: getCookieArrayCart(),
  };
  fetch("http://localhost:8080/api/dynamic-procedure/CheckOutCart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((x) => {
      const data = x["#result-set-1"]
        .map((y) => {
          let formatMoney = parseInt(y.ToMoney).toLocaleString("vi-VN");
          return `
          <div class="fhs_checkout_products_item">
          <div class="fhs_checkout_products_item_img">
        <img src="${y.Image}">
          </div>
          <div class="fhs_checkout_products_item_detail">
        <div class="fhs_checkout_products_item_name">
            <div>${y.Name}</div>
            
                      
                  </div>
        <div class="fhs_checkout_products_item_price">
                              <div>
                              ${parseInt(
                                y.Price.replace(".", "")
                              ).toLocaleString("vi-VN")}đ
                              </div>
                                
                            
                                    </div>
        <div class="fhs_checkout_products_item_qty">
            <span>Số lượng: </span>
            ${y.total}			</div>
        <div class="fhs_checkout_products_item_total">
        ${formatMoney}đ
        </div>
          </div>
      </div>
          `;
        })
        .join("");
      document.getElementById("fhs_checkout_products").innerHTML = data;
    });
}

function getCity() {
  fetch("http://localhost:8080/api/dynamic-procedure/GetCity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((x) => {
      // console.log(x["#result-set-1"]);

      const data = x["#result-set-1"]
        .map((y) => {
          return `
        <option value="${y.Id}">${y.CityName}</option>
        `;
        })
        .join("");
      document.getElementById("fhs_shipping_city_select").innerHTML =
        `<option value="" selected="" data-select2-id="9">Chọn tỉnh/thành Phố</option>` +
        data;
    });
}

function GetDistrictByCityId(cityId) {
  const formData = {
    CityId: cityId,
  };
  fetch("http://localhost:8080/api/dynamic-procedure/GetDistrictByCityId", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((x) => {
      // console.log(x["#result-set-1"]);
      const data = x["#result-set-1"].map((y) => {
        return `
          <option value="${y.Id}">${y.DistrictName}</option>
        `;
      });
      document.getElementById("fhs_shipping_district_select").innerHTML = data;
    });
}

function DOMDistrictCity() {
  document
    .getElementById("fhs_shipping_district_select")
    .removeAttribute("disabled");
  GetDistrictByCityId(
    document.getElementById("fhs_shipping_city_select").value
  );
}
initCheckOut();

function initCheckOut() {
  if (getCookieArrayCart().length === 0) {
    window.location.href = "index.html";
    alert("Bạn chưa có sản phẩm nào trong giỏ hàng");
  }

  getCity();
  itemCheckOut();
  totalMoneyCart();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

async function getMoneyCart() {
  const res = await fetch(
    "http://localhost:8080/api/dynamic-procedure/totalCart",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ArrayCart: getCookieArrayCart(),
      }),
    }
  );
  const data = await res.json();
  return data["#result-set-1"][0].totalMoney;
}

async function totalMoneyCart() {
  const money = await getMoneyCart().then((res) => {
    return res;
  });

  document.querySelectorAll(".total-money").forEach((element) => {
    element.innerText = parseInt(money).toLocaleString("vi-VN") + "đ";
  });
}

async function postFormDataConfirmCheckout() {
  const money = await getMoneyCart().then((res) => {
    return res;
  });
  const userId = stayLogin();
  const isWalkin = userId === 0 ? 1 : 0;

  console.log(money);
  // return;

  if (validateField()) {
    const formData = {
      ReceiverName: document.getElementById("fhs_shipping_fullname").value,
      ReceiverEmail: document.getElementById("fhs_shipping_email").value,
      ReceiverPhoneNumber: document.getElementById("fhs_shipping_telephone")
        .value,
      ReceiverCityId: document.getElementById("fhs_shipping_city_select").value,
      ReceiverDistrictId: document.getElementById(
        "fhs_shipping_district_select"
      ).value,
      ReceiverAddress: document.getElementById("fhs_shipping_street").value,
      TotalMoney: String(money),
      ArrayCart: getCookieArrayCart(),
      IsWalkin: isWalkin,
      UserId: userId,
    };
    console.log(formData);
    fetch("http://localhost:8080/api/dynamic-procedure/CheckOutBookOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((x) => {
        document.getElementById("checkoutSection").style.display = "none";
        document.getElementById("completeCheckout").style.display = "block";
        document.getElementById("orderId").innerText =
          x["#result-set-1"][0].orderID;
        deleteCookie("arrayCart");
      });
  }
}
