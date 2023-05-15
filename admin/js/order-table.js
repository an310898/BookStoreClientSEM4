function getOrderTable() {
  fetch("http://42.113.58.1:8080/api/dynamic-procedure/GetOrderTable", {
    method: "POST",
  })
    .then(res => res.json())
    .then(x => {
      //   console.log(x["#result-set-1"]);
      const data = x["#result-set-1"]
        .map(y => {
          const date = new Date(y.CreatedDate);
          let formatMoney = parseInt(y.TotalMoney).toLocaleString("vi-VN");

          return `<tr> <td>${y.OrderId}</td> <td>${y.ReceiverName}</td> <td>${
            y.ReceiverPhoneNumber
          }</td> <td>${y.ReceiverAddress}</td> <td>${y.City}</td> <td>${
            y.District
          }</td> <td>${formatMoney} đ</td> <td class='status'>${
            y.Status
          }</td> <td>${date.toLocaleDateString("vi-VN", {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</td> <td onClick="showEditForm('${
            y.OrderId
          }',this)"><i  style="cursor:pointer" class="fa-solid fa-pen-to-square"></td></tr> `;
        })
        .join("");

      document.querySelector("#data-table-product").innerHTML = data;
    });
}
getOrderTable();
function showEditForm(OrderId, elem) {
  showLayerForm();
  document.querySelector("#formEdit").style.display = "block";
  document.querySelector(
    "#formEdit > div > div > p > code"
  ).innerText = `Order Id: ${OrderId}`;
  document
    .querySelector("#edit-submit-btn")
    .setAttribute("onClick", `submitEditForm('${OrderId}')`);
  const currentStatus = elem.parentElement.querySelector(".status").innerText;

  document.querySelector("#orderStatus").childNodes.forEach(x => {
    if (x.textContent === currentStatus) {
      x.setAttribute("Selected", true);
    }
  });
}
function hideEditForm() {
  hideLayerForm();
  document.querySelector("#formEdit").style.display = "none";
}

async function getStatusOrder() {
  const res = await fetch(
    "http://42.113.58.1:8080/api/dynamic-procedure/GetEnumOrderStatus",
    {
      method: "POST",
    }
  );
  const data = await res.json();
  return data;
}
fetchDataStatusOrder();
async function fetchDataStatusOrder() {
  const data = await getStatusOrder();

  const status = data["#result-set-1"]
    .map(x => {
      return `<option value='${x.Status}'>${x.Status}</option>`;
    })
    .join("");

  document.querySelector("#orderStatus").innerHTML = status;
}

function submitEditForm(orderId) {
  const selectElement = document.getElementById("orderStatus");
  const selectedValue = selectElement.value;
  const formData = {
    OrderId: orderId,
    Status: selectedValue,
  };
  //   console.log(formData);
  fetch("http://42.113.58.1:8080/api/dynamic-procedure/UpdateOrderStatus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] > 0) {
        alert("Cập nhật thành công");
        hideLayerForm();
        getOrderTable();
      } else {
        alert("Cập nhật thất bại");
        hideLayerForm();
      }
    });
}
