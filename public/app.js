// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
$(".add-to-cart").on("click", e => {
  $(".purchase-section").removeClass("hide");
  $(".add-to-cart").text("Added!");
});
let form = document.getElementById("form");

$("#form").on("submit", e => {
  e.preventDefault();
  let ccInfo = {
    cardholder: form.cardholder.value.toString(),
    number: form.number.value.toString(),
    expiration: form.expiration.value.toString(),
    cvc: form.cvc.value.toString(),
    avs_street: form.avs_street.value.toString(),
    avs_zip: form.avs_zip.value.toString()
  };
  let price = "299.99";

  let body = {
    method: "POST",
    // url: "https://sandbox.usaepay.com/api/v2/transactions",
    // json: true,
    headers: {
      "Content-Type": "application/json"
    },
    dataType: "json",
    data: JSON.stringify({
      command: "cc:sale",
      amount: price,
      creditcard: ccInfo
    }),
    error: (err, message) => {
      alert("error");
      console.log(err);
    },
    success: res => {
      if (res.result != "Approved") {
        console.log(res);
        alert(
          `Sorry Card declined because "${
            res.error
          }". Double check your card info and try again`
        );
      } else {
        let congratsText = `Your Credit Card XXX-XXX-XXX-${ccInfo.number.slice(
          -4
        )} was charged $299.99 and your art will be shipped to ${
          ccInfo.avs_street
        } soon.`;
        $(".art").addClass("hide");
        $(".purchase-section").addClass("hide");
        $(".congrats").removeClass("hide");
        $(".insert-feedback").text(congratsText);
        console.log(res);
      }
    }
  };

  // console.log(body);
  $.ajax("/", body);
});
