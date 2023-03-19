function loading() {
    setTimeout(fade, 1500);
    $('.loading-box').addClass('gone');
    $('.loading-box span').fadeOut(1000);

};

function fade() {
    $('.loading-box').fadeOut();
}