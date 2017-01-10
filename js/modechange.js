var edit_mode = () =>{
  $(".left").show();
  $(".panel-group").show();
  $(".edit_line").show();
  $("#showpages").hide();
}
var preview_mode = () =>{
  $(".left").hide();
  $(".panel-group").hide();
  $(".edit_line").hide();
   $("#showpages").show();
}
var printpage = (a) => {
  var p = '#boo' + a.substring(1) + '';
  $(".boo").hide();
  $(p).show();  
}
