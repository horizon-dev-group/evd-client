// Example starter JavaScript for disabling form submissions if there are invalid fields
// (function() {
//     'use strict';
//     window.addEventListener('load', function() {
//         // Fetch all the forms we want to apply custom Bootstrap validation styles to
//         var forms = document.getElementsByClassName('needs-validation');
//         // Loop over them and prevent submission
//         var validation = Array.prototype.filter.call(forms, function(form) {
//             form.addEventListener('submit', function(event) {
//                 if (form.checkValidity() === false) {
//                     event.preventDefault();
//                     event.stopPropagation();
//                 }
//                 form.classList.add('was-validated');
//             }, false);
//         });
//     }, false);
//
//
// })();






//region Horizon Tech Code
$(document).ready(function () {
    console.log("user_id is"+localStorage.getItem("user_id"));

    var userLoggedIn = false;
    var savedToken = localStorage.getItem("sessionToken");
    var userId='';


    // region Check if the user already logged in or not
    function checkIfUserAlreadyLoggedIn() {
        // check if token exists
        // var savedToken = localStorage.getItem("sessionToken");
        console.log("Saved Token: " + savedToken);

        if (savedToken !== null) {
            console.log("Found Toekn")
            $.ajax({
                type: 'GET',
                contentType: 'application/json',
                url: 'https://evd-server.herokuapp.com/api/users',
                headers: {
                    'X-Auth-Token': savedToken
                },
                success: function (data) {
                    userLoggedIn = true;
                    userId=data._id
                    // populateVoucherList()
                },
                error: function (err) {
                    userLoggedIn = false;
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

    // region Send Fund
    $('#btn_fund_send').click(function (e) {
        e.preventDefault();
            // amount = $("#amount").val();
            // if(amount!==''){
            //     console.log("button pressed")
            //
            // }
        // region Only login if user is not logged in already
        // if (!userLoggedIn) {
            var data = {};
            data.sender_id=userId,
            data.receiver_id=localStorage.getItem('user_id');
            data.amount = $("#amount").val();
            data.parent_remark = $("#remark").val();
            console.log("sender_id is"+data.sender_id);
            console.log("receiver_id is"+data.receiver_id);
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'https://evd-server.herokuapp.com/api/account/credit',
                headers: {
                    'X-Auth-Token': savedToken
                },
                success: function (data) {
                    console.log('success');

                    swal(
                        {
                            title:'Good',
                            text:"Successfully Transfers",
                            type:'success',
                            padding: '2em'
                        }
                    )
                },
                error: function (err) {
                    console.log('error');
                    console.log(JSON.stringify(err.responseJSON.errors[0].msg));
                    for (let i = 0; i < err.responseJSON.errors.length; i++) {

                        swal(
                            {
                                title:'Warning',
                                text:JSON.parse(JSON.stringify(err.responseJSON.errors[i].msg)),
                                type:'warning',
                                padding: '2em'
                            }
                        )
                    }
                }
            });
        // }
        // endregion
    })
// endregion


    checkIfUserAlreadyLoggedIn();

});
// endregion
