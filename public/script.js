// responsive navbar
$('.toggler').click(function(){
    $('.navbar').toggleClass("navbar-dark");
    $('.nav-responsive').toggleClass("nav-is-visible");
});
$(window).resize(function(){
    if($('.nav-responsive').hasClass("nav-is-visible") && $(window).innerWidth > 768){
        $('.nav-responsive').removeClass("nav-is-visible");
    }
    if($('.navbar').hasClass("navbar-dark") && $(window).innerWidth > 768){
        $('.navbar').removeClass("navbar-dark");
    }
});
// animate scroll to id
$('.scroll').click(function(){
    var href = $(this).attr("href");
    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, 1000);
});
// toggle answer in faq
$('.faq li').click(function(){
    $(this).toggleClass('show-li')
    $(this).children('.ans').toggleClass('show-ans');
});
// copy to clipboard
$('.fa-copy').click(function(){
	var $temp = $('<input>');
	$('body').append($temp);
	$temp.val($('#address').text()).select();
	document.execCommand("copy");
	$temp.remove();
});
// overlay qrcode
$('.btn-qr').click(function(){
    $('.show-qr').css("display", "flex");
});
$('.show-qr').click(function(){
    $('.show-qr').css("display", "none");
});
// countdown
// var time = 60;
// var x = setInterval(function(){
// 	var min = (time-(time%60))/60;
// 	var sec = time%60;
// 	if(min.toString().length===1){
// 		min = "0"+min;
// 	}
// 	if(sec.toString().length===1){
// 		sec = "0"+sec;
// 	}
//     document.getElementById("timer").innerHTML = min + ":" + sec;
//     if(time===0){
// 		clearInterval(x);
// 		console.log("end");
// 	}
//     time--;
// }, 1000);