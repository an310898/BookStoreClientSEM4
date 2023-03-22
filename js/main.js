fetch("http://localhost:8080/api/dynamic-procedure/FillAllCategory", {
    method: "POST",
    })
    .then((res) => res.json())
    .then((x) => {
        const data = x["#result-set-1"]
        .map((y) => {
            return `<div class="panel panel-default">
			<div class="panel-heading">
				<h4 class="panel-title"><a href="#">${y.Name}</a></h4>
			</div>
		</div>`;
        })
        .join("");
        document.getElementById("book-category").innerHTML = data;
    });


fetch("http://localhost:8080/api/dynamic-procedure/listNewBook",{method:"POST"})
.then((res)=> res.json())
.then((x)=>{
	const data = x["#result-set-1"].map((y) => {
		return `<div class="col-sm-4">
		<div class="product-image-wrapper">
			<a href="product-details.html?id=${y.Id}" class="single-products">
					<div class="productinfo text-center">
						<img src="${y.Image}" alt="" />
						<h2>${y.Price} đ</h2>
						<p>${y.Name}</p>
						<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
					</div>
					
			</a>
			
		</div>
	</div>`;
	})
	.join("");
	document.getElementById("new-item").innerHTML = '<h2 class="title text-center">Sản phẩm mới</h2>' + data;

})

/*price range*/

 $('#sl2').slider();

	var RGBChange = function() {
	  $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
	};	
		
/*scroll to top*/

$(document).ready(function(){
	$(function () {
		
		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});
});
