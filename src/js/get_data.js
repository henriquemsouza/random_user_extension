$(document).ready(function () {
  $("#genBtn").click(function (ev) {
    ev.preventDefault();
    getr();
  });

  $("button[id*='copy-btn']").click(function (ev) {
    ev.preventDefault();
    $(".msg-warning").css("display", "block");
    $(".msg-warning").delay(2000).fadeOut("slow");
  });

  new ClipboardJS('#copy-btn');
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
  let cpf_value = generateCpf();

  console.log();

  $("#name").val(user_name);
  $("#email").val(user_email);
  $("#nickname").val(user_nick);

  $("#street").val(user_location);
  $("#city").val(user_city);
  $("#state").val(user_state);

  $("#phone").val(user_phone);
  $("#dob").val(formate_date);

  $("#cpf").val(cpf_value);

  $("#user_img").attr("src", user_img);
}

function randomize(n) {
  var ranNum = Math.round(Math.random() * n);
  return ranNum;
}

function generateCpf() {
  var hasDots = false;

  var n = 9;
  var n1 = randomize(n);
  var n2 = randomize(n);
  var n3 = randomize(n);
  var n4 = randomize(n);
  var n5 = randomize(n);
  var n6 = randomize(n);
  var n7 = randomize(n);
  var n8 = randomize(n);
  var n9 = randomize(n);
  var d1 =
    n9 * 2 +
    n8 * 3 +
    n7 * 4 +
    n6 * 5 +
    n5 * 6 +
    n4 * 7 +
    n3 * 8 +
    n2 * 9 +
    n1 * 10;
  d1 = 11 - calcule(d1, 11);
  if (d1 >= 10) d1 = 0;
  var d2 =
    d1 * 2 +
    n9 * 3 +
    n8 * 4 +
    n7 * 5 +
    n6 * 6 +
    n5 * 7 +
    n4 * 8 +
    n3 * 9 +
    n2 * 10 +
    n1 * 11;
  d2 = 11 - calcule(d2, 11);
  if (d2 >= 10) d2 = 0;
  retorno = "";
  if (hasDots)
    cpf =
      "" +
      n1 +
      n2 +
      n3 +
      "." +
      n4 +
      n5 +
      n6 +
      "." +
      n7 +
      n8 +
      n9 +
      "-" +
      d1 +
      d2;
  else cpf = "" + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;

  return cpf
}

function calcule(dividend, divider) {
  return Math.round(dividend - Math.floor(dividend / divider) * divider);
}
