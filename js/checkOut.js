function itemCheckOut() {
  const formData = {
    ArrayCart: getCookie("arrayCart").slice(
      1,
      getCookie("arrayCart").length - 1
    ),
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
                              ${y.Price}đ
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

// GetDistrictByCityId(2);
getCity();
itemCheckOut();
