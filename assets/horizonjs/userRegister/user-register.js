//region Horizon Tech Code
$(document).ready(function () {
    console.log("user_id is" + localStorage.getItem("user_id"));

    var userLoggedIn = false;
    var savedToken = localStorage.getItem("sessionToken");
    var userId = '';
    var userType = '';
    var selectField = $('#userOptions');
    var phone = $("#phone");
    var address = $("#address");
    var posNumber = $("#pos_number");
    var phone_lable = $("#phone-label")
    var address_lable = $("#address-label")
    var pos_lable = $("#pos-label")
    hideRetailerFields();


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
                url: 'http://localhost:5000/api/users',
                headers: {
                    'X-Auth-Token': savedToken
                },
                success: function (data) {
                    userLoggedIn = true;
                    userId = data._id;
                    userType = data.userType;
                    console.log("the user Type is" + userType)
                    populateDropDownList(userType)
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


    $('#userOptions').change(function () {
        // hideRetailerFields()
        // $('#userOptions').find(":selected").each(function() {
        var value = $(this).val();
        console.log("drop down value is" + value)

        if (value === "5eb1b4e50b65b13950b7bcca") {
            showRetailerFields()
        } else {
            hideRetailerFields();
        }


    }).change();//manually call change event so that on load it run the change event


    function populateDropDownList(userTypes) {

        var retailerCounter = 0;
        var data = {};
        data.userType = userTypes;
        console.log("sent data is" + data.userType);
        console.log(JSON.stringify(data));
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:5000/api/users/user_registration_option',
            headers: {
                'X-Auth-Token': savedToken
            },
            success: function (data) {

                // userType=data.userType;
                // populateVoucherList()
                for (var x = 0; x < data.length; x++) {
                    if (data[x].task === "CREATE_RETAILER") {
                        retailerCounter++
                    }
                    console.log("user type is" + JSON.stringify(data[x].speciality))
                    selectField.append($('<option></option>').val(data[x].speciality).html(data[x].task))
                }
                // console.log(JSON.stringify(data))
                if ($('#userOptions').val() === "5eb1b4e50b65b13950b7bcca") {
                    showRetailerFields()
                }

            },
            error: function (err) {
                // userLoggedIn = false;
                // localStorage.removeItem("sessionToken")
                console.log("something goes wrong");

            }
        });
    }

    function hideRetailerFields() {
        phone.hide();
        address.hide();
        posNumber.hide();
        phone_lable.hide();
        address_lable.hide();
        pos_lable.hide();
    }

    function showRetailerFields() {
        phone.show();
        address.show();
        posNumber.show();
        phone_lable.show();
        address_lable.show();
        pos_lable.show();
    }

    // region Send Fund
    $('#btn_register').click(function (e) {
        e.preventDefault();

        var data = {};
        data.sender_id = userId,
            data.receiver_id = localStorage.getItem('user_id');
        data.name = $("#name").val();
        data.userType = $("#userOptions").val();
        data.email = $("#email").val();
        data.password = $("#password").val();
        data.phone = $("#phone").val();
        data.aaddress = $("#address").val();
        data.posNumber = $("#pos_number").val();
        console.log("sender_id is" + data.sender_id);
        console.log("receiver_id is" + data.receiver_id);
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:5000/api/users/register',
            headers: {
                'X-Auth-Token': savedToken
            },
            success: function (data) {
                console.log('success');

                swal(
                    {
                        title: 'Good',
                        text: "Successfully Register",
                        type: 'success',
                        padding: '2em'
                    }
                )
                setInterval(function() {
                    location.reload();
                }, 3000);
            },
            error: function (err) {
                console.log('error');
                console.log(JSON.stringify(err.responseJSON.errors[0].msg));
                for (let i = 0; i < err.responseJSON.errors.length; i++) {

                    swal(
                        {
                            title: 'Warning',
                            text: JSON.parse(JSON.stringify(err.responseJSON.errors[i].msg)),
                            type: 'warning',
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
