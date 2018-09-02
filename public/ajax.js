$('form').on('click', '#addtodb', function(e) {
	e.preventDefault();
	$('#addtodb').val("Loading...");
	var donor = $(this).serialize();
	$.post('/addtodb', donor, function(newdonor) {
		console.log(newdonor);
		$('.form-body').html(`
			<p style="text-align: left">Select currency</p>
			<div class="currency">
				<div class="coin">
					<img class="coin-img" src="/form-img.png"> Bitcoin <img class="arrow-img" src="/arrow.png">
				</div>
				<div class="coin">
					<img class="coin-img" src="/form-img.png"> Bitcoin <img class="arrow-img" src="/arrow.png">
				</div>
				<div class="coin">
					<img class="coin-img" src="/form-img.png"> Bitcoin <img class="arrow-img" src="/arrow.png">
				</div>
				<div class="coin">
					<img class="coin-img" src="/form-img.png"> Bitcoin <img class="arrow-img" src="/arrow.png">
				</div>
				<div class="coin">
					<img class="coin-img" src="/form-img.png"> Bitcoin <img class="arrow-img" src="/arrow.png">
				</div>
			</div>
			<a class="arrow-back" href=""><i class="fas fa-arrow-left"></i></a>
		`);
	});
});