'use strict';

$(function() {


  /*
  |--------------------------------------------------------------------------
  | Configure your website
  |--------------------------------------------------------------------------
  |
  | We provided several configuration variables for your ease of development.
  | Read their complete description and modify them based on your need.
  |
  */
 
  thesaas.config({

    /*
    |--------------------------------------------------------------------------
    | Google API Key
    |--------------------------------------------------------------------------
    |
    | Here you may specify your Google API key if you need to use Google Maps
    | in your application
    |
    | https://developers.google.com/maps/documentation/javascript/get-api-key
    |
    */

    googleApiKey: '',

    /*
    |--------------------------------------------------------------------------
    | Google Analytics Tracking
    |--------------------------------------------------------------------------
    |
    | If you want to use Google Analytics, you can specify your Tracking ID in
    | this option. Your key would be a value like: UA-12345678-9
    |
    */

    googleAnalyticsId: '',

    /*
    |--------------------------------------------------------------------------
    | Smooth Scroll
    |--------------------------------------------------------------------------
    |
    | If true, the browser's scrollbar moves smoothly on scroll and gives your
    | visitor a better experience for scrolling.
    |
    */
   
    smoothScroll: true

  });





  /*
  |--------------------------------------------------------------------------
  | Custom Javascript code
  |--------------------------------------------------------------------------
  |
  | Now that you configured your website, you can write additional Javascript
  | code below this comment. You might want to add more plugins and initialize
  | them in this file.
  |
  */

  $(document).ready(function () {
      $('form').submit(function (e) {
          e.preventDefault();

          var usernameValid = false, passwordsValid = false;
          const username = $('input[name=username]').val(),
                email = $('input[name=email]').val(),
                password = $('input[name=password]').val(),
              password2 = $('input[name=password2]').val();

          if (/\s/.test(username)) {
              toastr.warning('Username cannot contain spaces');
              $('input[name=username]').val('');
              usernameValid = false;
          } else {
              usernameValid = true;
          }

          if(password != password2) {
              toastr.warning('Passwords dont match.');
              $('input[name=password]').val('');
              $('input[name=password2]').val('');
              passwordsValid = false;
          } else {
              passwordsValid = true;
          }

          if(password.length < 6 || password2.length < 6){
              toastr.warning('Passwords must be at least 6 characters long.');
              $('input[name=password]').val('');
              $('input[name=password2]').val('');
              passwordsValid = false;
          } else {
              passwordsValid = true;
          }

          if(usernameValid && passwordsValid){
              toastr.info('Give us a sec..');
              $.ajax({
                  method: "POST",
                  url: "https://api.deployhandler.com/api/users",
                  data: {
                      username: username,
                      email: email,
                      password: password
                  }
              })
                  .done(function() {
                      toastr.success('Great! Lets get you logged in');
                      $.ajax({
                        method: "POST",
                          url: "https://api.deployhandler.com/api/users/login",
                          data: {
                              username: username,
                              password: password
                          }
                      })
                          .done(function (response) {
                              localStorage.setItem('token',response.token);
                              localStorage.setItem('userId',response.userId);
                              window.location.replace("https://app.deployhandler.com");
                          })
                          .fail(function (response) {
                              toastr.error(response.responseJSON.message);
                          });
                  })
                  .fail(function (response) {
                      toastr.error(response.responseJSON.message);
                  });
          }

      });
  });


});
