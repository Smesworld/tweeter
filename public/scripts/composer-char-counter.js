$(document).ready(function() {
  $("[name='text']").keyup(function() {
    const num = $(this).val().length; //The this keyword is a reference to the button
    console.log(num);
    const thing = $(this).siblings("span");
    console.log(thing);
    const newNum = 140 - num;
    $(thing[0]).text(newNum);
  });
});
