// region Horizon Tech Code
$(document).ready(function () {
    var userLoggedIn = false;
    var savedToken = localStorage.getItem("sessionToken");
    var table;


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

    //region populate voucher lists
    function populateUserList() {
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: 'http://localhost:5000/api/users/get_all_users',
            headers: {
                'X-Auth-Token': savedToken
            },
            beforeSend: function () {
                $('#page-loading-indicator').show();
                console.log("Before Send!");
            },

            success: function (data) {
                console.log('valid token found');

                table=$('#all-users-list').DataTable({
                    "aaData": data,
                    "columns": [
                        {data: "name"},
                        {data: "email"},
                        {data: "phone", "defaultContent": "Phone Unavailable"},
                        {
                            "defaultContent": "<div class=\"btn-group\"> <button type=\"button\" class=\"btn btn-dark btn-sm\">Open</button><button type=\"button\"class=\"btn btn-dark btn-sm dropdown-toggle dropdown-toggle-split\"id=\"dropdownMenuReference1\" data-toggle=\"dropdown\"aria-haspopup=\"true\" aria-expanded=\"false\"data-reference=\"parent\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\"stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"class=\"feather feather-chevron-down\"> <polyline points=\"6 9 12 15 18 9\"></polyline> </svg> </button> <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuReference1\"> <a class=\"dropdown-item\" href=\"#\">Edit</a> <a class=\"dropdown-item\" href=\"#\">Delete</a> <a class=\"dropdown-item\" href='fundTransfer.html'  id='user_id'>Fund Transfer</a></div> </div>\n"
                        }
                    ],
                    dom: '<"row"<"col-md-12"<"row"<"col-md-6"B><"col-md-6"f> > ><"col-md-12"rt> <"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>> >',
                    buttons: {
                        buttons: [
                            {extend: 'copy', className: 'btn'},
                            {extend: 'csv', className: 'btn'},
                            {extend: 'excel', className: 'btn'},
                            {extend: 'print', className: 'btn'}
                        ]
                    },
                    "oLanguage": {
                        "oPaginate": {
                            "sPrevious": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                            "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
                        },
                        "sInfo": "Showing page _PAGE_ of _PAGES_",
                        "sSearch": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
                        "sSearchPlaceholder": "Search...",
                        "sLengthMenu": "Results :  _MENU_",
                    },
                    "stripeClasses": [],
                    "lengthMenu": [7, 10, 20, 50],
                    "pageLength": 7
                })
            },
            error: function (err) {
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
            },
            complete: function () {
                $('#page-loading-indicator').hide();
                console.log("Request Complete!")
            }

        });

    }

    //endregion
    $('#html5-extension tbody').on('click', '#user_id', function () {
        var data = table.row($(this).parents('tr')).data();

            localStorage.setItem("user_id", data._id)



    });
    checkIfUserAlreadyLoggedIn();
    if (!userLoggedIn) {
        populateUserList()
    }
});
// endregion
