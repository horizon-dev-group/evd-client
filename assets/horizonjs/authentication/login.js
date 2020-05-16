var togglePassword = document.getElementById("toggle-password");
var formContent = document.getElementsByClassName('form-content')[0];
var getFormContentHeight = formContent.clientHeight;

var formImage = document.getElementsByClassName('form-image')[0];
if (formImage) {
    var setFormImageHeight = formImage.style.height = getFormContentHeight + 'px';
}
if (togglePassword) {
    togglePassword.addEventListener('click', function () {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });
}

// region Horizon Tech Code
$(document).ready(function () {
    var userNotLoggedIn = false;

    // region Check if the user already logged in or not
    function checkIfUserAlreadyLoggedIn() {
        // check if token exists
        var savedToken = localStorage.getItem("sessionToken");
        console.log("Saved Token: " + savedToken);

        if (savedToken !== null) {
            console.log("Found Toekn")
            $.ajax({
                type: 'GET',
                contentType: 'application/json',
                url: 'http://localhost:5000/api/users',
                headers: {
                    'X-Auth-Token': savedToken
                },
                success: function (data) {
                    console.log('valid token found');

                    // region Save the token to the local storage
                    var userName = data.name;
                    var userEmail = data.email;
                    console.log("User Name: " + userName);
                    console.log("User Email: " + userEmail);

                    window.location = "parentUserList.html";
                    // endregion
                },
                error: function (err) {
                    userNotLoggedIn = true;
                    localStorage.removeItem("sessionToken")
                    // console.log('error');
                    // console.log(JSON.stringify(err.responseJSON.errors[0].msg));
                    // for (let i = 0; i < err.responseJSON.errors.length; i++) {
                    //     // $('#error_div').html('<p>'+err.responseJSON.errors[i].msg+'</p>');
                    //     $('<p>' + err.responseJSON.errors[i].msg + '</p>').appendTo('#error_div');
                    //     console.log("Error Msg is" + JSON.stringify(err.responseJSON.errors[i].msg))
                    // }
                }
            });
        }
    }

    // endregion

    // region Login User
    $('#btn_login').click(function (e) {
        e.preventDefault();

        // region Only login if user is not logged in already
        if (!userNotLoggedIn) {
            var data = {};
            data.email = $("#username").val();
            data.password = $("#password").val();
            console.log(data.email);
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:5000/api/users/login',
                success: function (data) {
                    console.log('success');

                    // region Save the token to the local storage
                    var sessionToken = data.token;
                    console.log("Token Generated: " + sessionToken);

                    localStorage.setItem('sessionToken', sessionToken);
                    window.location = "index.html";
                    // endregion
                },
                error: function (err) {
                    console.log('error');
                    console.log(JSON.stringify(err.responseJSON.errors[0].msg));
                    for (let i = 0; i < err.responseJSON.errors.length; i++) {
                        // $('#error_div').html('<p>'+err.responseJSON.errors[i].msg+'</p>');
                        $('<p>' + err.responseJSON.errors[i].msg + '</p>').appendTo('#error_div');
                        console.log("Error Msg is" + JSON.stringify(err.responseJSON.errors[i].msg))
                    }
                }
            });
        }
        // endregion
    })
    // endregion

    checkIfUserAlreadyLoggedIn();
});
// endregion
