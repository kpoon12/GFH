$(document).ready(function () {
    $('.menu-btn').click(function () {
        $('.responsive-menu').toggleClass('expand')
    })
    $("#book1").click(function () { onBook1(); });
    $("#book12").click(function () { onBook12(); });
    $("#book13").click(function () { onBook13(); });
    $("#book14").click(function () { onBook14(); });
    $("#book15").click(function () { onBook15(); });
    $("#book16").click(function () { onBook16(); });
	updateview();
    var iweb = document.getElementById('iview');
    iweb.src = "book.html";
});

function updateview(){
    var iweb = document.getElementById('iview');
    var g = document.documentElement;
    var screenHeight = g.clientHeight;
    var screenWidth = g.clientWidth;

    document.getElementById("iview").style.width = (screenWidth - 10) + "px";
    document.getElementById("iview").style.height = (screenHeight - 10) + "px";
}

function onBook1() {
	updateview();
    var iweb = document.getElementById('iview');
    iweb.src = "book.html";
    $('.responsive-menu').toggleClass('expand')
}

function onBook2() {
	updateview();
    var iweb = document.getElementById('iview');
    iweb.src = "PDF/viewer.html?mybook=./bk1.pdf";
    $('.responsive-menu').toggleClass('expand')
}

function onBook12() {
	updateview();
    var iweb = document.getElementById('iview');
    iweb.src = "PDF/viewer.html?mybook=./bk12.pdf";
    $('.responsive-menu').toggleClass('expand')
}

function onBook13() {
	updateview();
    var iweb = document.getElementById('iview');
    iweb.src = "PDF/viewer.html?mybook=./bk13.pdf";
    $('.responsive-menu').toggleClass('expand')
}

function onBook14() {
	updateview();
    var iweb = document.getElementById('iview');
    iweb.src = "PDF/viewer.html?mybook=./bk14.pdf";
    $('.responsive-menu').toggleClass('expand')
}

function onBook15() {
    updateview();
    var iweb = document.getElementById('iview');
    iweb.src = "PDF/viewer.html?mybook=./bk15.pdf";
    $('.responsive-menu').toggleClass('expand')
}

function onBook16() {
    updateview();
    var iweb = document.getElementById('iview');
    iweb.src = "PDF/viewer.html?mybook=./bk16.pdf";
    $('.responsive-menu').toggleClass('expand')
}