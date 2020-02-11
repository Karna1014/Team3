$(document).ready(function(){
$(".faq h4").click(function(){
    $(this).next(".questDetails").slideToggle();
    $(this).parent().toggleClass("active");
    $(this).parent().siblings().children(".questionDetails").slideUp;
    $(this).parent().siblings().removeClass("active");
});
});