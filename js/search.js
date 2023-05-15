function findOrderByOrderIdOrPhoneNumber() {
  const inputFindOrder = document.getElementById("inputFindOrder").value;

  //   const inputFindOrder = "0935263945";
  // console.log(inputFindOrder);
  if (inputFindOrder.length === 0) {
    document.getElementById("inputFindAlert").innerText =
      "Vui lòng điền Mã đơn hàng hoặc số điện thoại đặt hàng";
    return;
  }

  const formData = {
    OrderId: inputFindOrder,
    PhoneNumber: inputFindOrder,
    IsPhoneNumber: inputFindOrder.length < 10 ? 0 : 1,
  };

  fetch(
    "http://42.113.58.1:8080/api/dynamic-procedure/findOrderByOrderIdOrPhoneNumber",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  )
    .then(res => res.json())
    .then(x => {
      if (x["#result-set-1"][0]["JSONOrder"] === null) {
        document.getElementById(
          "searchDOM"
        ).innerHTML = `<div class="fhs_checkout_block">
                    <div class="fhs_checkout_block_title" style="justify-content: space-between;"><div><span>Chưa có đơn hàng nào</span></div></div>
                    <div style="margin-top:10px;display:flex;flex-direction: column;">
                     `;
        return;
      }
      const data = JSON.parse(x["#result-set-1"][0]["JSONOrder"])
        .map(y => {
          let formatTotalMoney = parseInt(y.TotalMoney).toLocaleString("vi-VN");
          console.log(y["OrderDetail"]);
          return (
            `
          <div class="fhs_checkout_block">
                    <div class="fhs_checkout_block_title" style="justify-content: space-between;"><div>Mã đơn hàng: ${y.OrderId}</div><div style="color:#C92127">${y.Status}</div></div>
                    <div style="margin-top:10px;display:flex;flex-direction: column;">
                     ` +
            y["OrderDetail"]
              .map(z => {
                return `
              <div style="display:flex;justify-content: space-between;
              align-items: center;">
                <div  style="display:flex;">
                  <div style="width:100px">
                    <img style="
                    min-width:100px;
                    height: auto;" src="${z.Image}">
                  </div>
                    <div style="display:flex;flex-direction: column;">
                    <div style="color: rgba(0,0,0,.87)">${z.Name}</div>
                    <div style="color: rgba(0,0,0,.54)">Tác giả: ${
                      z.Author
                    }</div>
                    <div >Số lượng: ${z.Amount}</div>
                  </div>

                </div>
                <div style="display:flex;">
                    <div style="color:#C92127">${parseInt(
                      z.Price.replace(".", "")
                    ).toLocaleString("vi-VN")}đ</div>
                </div>
              </div>
              <div style="    width: 95%;
              margin: 10px auto;
              border-bottom-width: 1px;
              border-bottom-color: #ededed;
              border-bottom-style: solid;"></div>
              `;
              })
              .join("") +
            `
                    </div>
                    <div style="color: #c92127;display:flex;justify-content:flex-end;align-items:center;font-weight:bold;font-size:16px">Tổng số tiền: ${formatTotalMoney} đ</div>
                </div>
          `
          );
        })
        .join("");

      document.getElementById("searchDOM").innerHTML = data;
    });
}
