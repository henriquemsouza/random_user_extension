$(document).ready(function () {
  $("#genBtn").click(function (ev) {
    ev.preventDefault();
    getr();
  });

  $("button[id*='copy-btn']").click(function (ev) {
    ev.preventDefault();

    let id = $(this).data("id");

    let selected = $(`#${id}`).select();
    $(".msg-warning").css("display","block");
    
    
    document.execCommand("copy");
    
    $(".msg-warning").delay(2000).fadeOut('slow');
  });
});

function getr() {
  $.ajax({
    url: "https://randomuser.me/api/?nat=br",
    dataType: "json",
    success: function (data) {
      buildUser(data);
    },
  });
}

function buildUser(data) {
  user_name = data.results[0].name.first + " " + data.results[0].name.last;
  user_email = data.results[0].email;
  user_nick = data.results[0].login.username;
  user_location = data.results[0].location.street.name;
  user_city = data.results[0].location.city;
  user_state = data.results[0].location.state;
  user_phone = data.results[0].phone;
  user_dob = data.results[0].dob.date;
  user_img = data.results[0].picture.medium;

  let formate_date = new Date(user_dob).toISOString().split("T")[0];

  console.log();

  $("#name").val(user_name);
  $("#email").val(user_email);
  $("#nickname").val(user_nick);

  $("#street").val(user_location);
  $("#city").val(user_city);
  $("#state").val(user_state);

  $("#phone").val(user_phone);
  $("#dob").val(formate_date);

  $("#user_img").attr("src", user_img);
}
