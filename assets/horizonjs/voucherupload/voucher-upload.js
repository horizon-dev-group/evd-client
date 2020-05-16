$('.input-search').on('keyup', function () {
    var rex = new RegExp($(this).val(), 'i');
    $('.todo-box .todo-item').hide();
    $('.todo-box .todo-item').filter(function () {
        return rex.test($(this).text());
    }).show();
});

const taskViewScroll = new PerfectScrollbar('.task-text', {
    wheelSpeed: .5,
    swipeEasing: !0,
    minScrollbarLength: 40,
    maxScrollbarLength: 300,
    suppressScrollX: true
});

function dynamicBadgeNotification(setTodoCategoryCount) {
    var todoCategoryCount = setTodoCategoryCount;

    // Get Parents Div(s)
    var get_ParentsDiv = $('.todo-item');
    var get_TodoAllListParentsDiv = $('.todo-item.all-list');
    var get_TodoCompletedListParentsDiv = $('.todo-item.todo-task-done');
    var get_TodoImportantListParentsDiv = $('.todo-item.todo-task-important');

    // Get Parents Div(s) Counts
    var get_TodoListElementsCount = get_TodoAllListParentsDiv.length;
    var get_CompletedTaskElementsCount = get_TodoCompletedListParentsDiv.length;
    var get_ImportantTaskElementsCount = get_TodoImportantListParentsDiv.length;

    // Get Badge Div(s)
    var getBadgeTodoAllListDiv = $('#all-list .todo-badge');
    var getBadgeCompletedTaskListDiv = $('#todo-task-done .todo-badge');
    var getBadgeImportantTaskListDiv = $('#todo-task-important .todo-badge');


    if (todoCategoryCount === 'allList') {
        if (get_TodoListElementsCount === 0) {
            getBadgeTodoAllListDiv.text('');
            return;
        }
        if (get_TodoListElementsCount > 9) {
            getBadgeTodoAllListDiv.css({
                padding: '2px 0px',
                height: '25px',
                width: '25px'
            });
        } else if (get_TodoListElementsCount <= 9) {
            getBadgeTodoAllListDiv.removeAttr('style');
        }
        getBadgeTodoAllListDiv.text(get_TodoListElementsCount);
    } else if (todoCategoryCount === 'completedList') {
        if (get_CompletedTaskElementsCount === 0) {
            getBadgeCompletedTaskListDiv.text('');
            return;
        }
        if (get_CompletedTaskElementsCount > 9) {
            getBadgeCompletedTaskListDiv.css({
                padding: '2px 0px',
                height: '25px',
                width: '25px'
            });
        } else if (get_CompletedTaskElementsCount <= 9) {
            getBadgeCompletedTaskListDiv.removeAttr('style');
        }
        getBadgeCompletedTaskListDiv.text(get_CompletedTaskElementsCount);
    } else if (todoCategoryCount === 'importantList') {
        if (get_ImportantTaskElementsCount === 0) {
            getBadgeImportantTaskListDiv.text('');
            return;
        }
        if (get_ImportantTaskElementsCount > 9) {
            getBadgeImportantTaskListDiv.css({
                padding: '2px 0px',
                height: '25px',
                width: '25px'
            });
        } else if (get_ImportantTaskElementsCount <= 9) {
            getBadgeImportantTaskListDiv.removeAttr('style');
        }
        getBadgeImportantTaskListDiv.text(get_ImportantTaskElementsCount);
    }
}

new dynamicBadgeNotification('allList');
new dynamicBadgeNotification('completedList');
new dynamicBadgeNotification('importantList');

/*
  ====================
    Quill Editor
  ====================
*/

// var quill = new Quill('#taskdescription', {
//     modules: {
//         toolbar: [
//             [{header: [1, 2, false]}],
//             ['bold', 'italic', 'underline'],
//             ['image', 'code-block']
//         ]
//     },
//     placeholder: 'Compose an epic...',
//     theme: 'snow'  // or 'bubble'
// });

// $('#addTaskModal').on('hidden.bs.modal', function (e) {
//     // do something...
//     $(this)
//         .find("input,textarea,select")
//         .val('')
//         .end();
//
//     quill.deleteText(0, 2000);
// })

// $('.mail-menu').on('click', function (event) {
//     $('.tab-title').addClass('mail-menu-show');
//     $('.mail-overlay').addClass('mail-overlay-show');
// })

// $('.mail-overlay').on('click', function (event) {
//     $('.tab-title').removeClass('mail-menu-show');
//     $('.mail-overlay').removeClass('mail-overlay-show');
// })

$('#addTask').on('click', function (event) {
    event.preventDefault();
    $('.add-tsk').show();
    $('.edit-tsk').hide();
    $('#addTaskModal').modal('show');
    const ps = new PerfectScrollbar('.todo-box-scroll', {
        suppressScrollX: true
    });
});

const ps = new PerfectScrollbar('.todo-box-scroll', {
    suppressScrollX: true
});

const todoListScroll = new PerfectScrollbar('.todoList-sidebar-scroll', {
    suppressScrollX: true
});

function checkCheckbox() {
    $('.todo-item input[type="checkbox"]').click(function () {
        if ($(this).is(":checked")) {
            $(this).parents('.todo-item').addClass('todo-task-done');
        } else if ($(this).is(":not(:checked)")) {
            $(this).parents('.todo-item').removeClass('todo-task-done');
        }
        new dynamicBadgeNotification('completedList');
    });
}

function deleteDropdown() {
    $('.action-dropdown .dropdown-menu .delete.dropdown-item').click(function () {
        if (!$(this).parents('.todo-item').hasClass('todo-task-trash')) {

            var getTodoParent = $(this).parents('.todo-item');
            var getTodoClass = getTodoParent.attr('class');

            var getFirstClass = getTodoClass.split(' ')[1];
            var getSecondClass = getTodoClass.split(' ')[2];
            var getThirdClass = getTodoClass.split(' ')[3];

            if (getFirstClass === 'all-list') {
                getTodoParent.removeClass(getFirstClass);
            }
            if (getSecondClass === 'todo-task-done' || getSecondClass === 'todo-task-important') {
                getTodoParent.removeClass(getSecondClass);
            }
            if (getThirdClass === 'todo-task-done' || getThirdClass === 'todo-task-important') {
                getTodoParent.removeClass(getThirdClass);
            }
            $(this).parents('.todo-item').addClass('todo-task-trash');
        } else if ($(this).parents('.todo-item').hasClass('todo-task-trash')) {
            $(this).parents('.todo-item').removeClass('todo-task-trash');
        }
        new dynamicBadgeNotification('allList');
        new dynamicBadgeNotification('completedList');
        new dynamicBadgeNotification('importantList');
    });
}

function deletePermanentlyDropdown() {
    $('.action-dropdown .dropdown-menu .permanent-delete.dropdown-item').on('click', function (event) {
        event.preventDefault();
        if ($(this).parents('.todo-item').hasClass('todo-task-trash')) {
            $(this).parents('.todo-item').remove();
        }
    });
}

function reviveMailDropdown() {
    $('.action-dropdown .dropdown-menu .revive.dropdown-item').on('click', function (event) {
        event.preventDefault();
        if ($(this).parents('.todo-item').hasClass('todo-task-trash')) {
            var getTodoParent = $(this).parents('.todo-item');
            var getTodoClass = getTodoParent.attr('class');
            var getFirstClass = getTodoClass.split(' ')[1];
            $(this).parents('.todo-item').removeClass(getFirstClass);
            $(this).parents('.todo-item').addClass('all-list');
            $(this).parents('.todo-item').hide();
        }
        new dynamicBadgeNotification('allList');
        new dynamicBadgeNotification('completedList');
        new dynamicBadgeNotification('importantList');
    });
}

function importantDropdown() {
    $('.important').click(function () {
        if (!$(this).parents('.todo-item').hasClass('todo-task-important')) {
            $(this).parents('.todo-item').addClass('todo-task-important');
            $(this).html('Back to List');
        } else if ($(this).parents('.todo-item').hasClass('todo-task-important')) {
            $(this).parents('.todo-item').removeClass('todo-task-important');
            $(this).html('Important');
            $(".list-actions#all-list").trigger('click');
        }
        new dynamicBadgeNotification('importantList');
    });
}

function priorityDropdown() {
    $('.priority-dropdown .dropdown-menu .dropdown-item').on('click', function (event) {

        var getClass = $(this).attr('class').split(' ')[1];
        var getDropdownClass = $(this).parents('.p-dropdown').children('.dropdown-toggle').attr('class').split(' ')[1];
        $(this).parents('.p-dropdown').children('.dropdown-toggle').removeClass(getDropdownClass);

        $(this).parents('.p-dropdown').children('.dropdown-toggle').addClass(getClass);
    })
}

function editDropdown() {
    $('.action-dropdown .dropdown-menu .edit.dropdown-item').click(function () {

        event.preventDefault();

        var $_outerThis = $(this);

        $('.add-tsk').hide();
        $('.edit-tsk').show();

        var $_taskTitle = $_outerThis.parents('.todo-item').children().find('.todo-heading').attr('data-todoHeading');
        var $_taskText = $_outerThis.parents('.todo-item').children().find('.todo-text').attr('data-todoText');
        var $_taskJson = JSON.parse($_taskText);

        $('#task').val($_taskTitle);
        quill.setContents($_taskJson);

        $('.edit-tsk').off('click').on('click', function (event) {
            var $_innerThis = $(this);
            var $_task = document.getElementById('task').value;
            var $_taskDescription = document.getElementById('taskdescription').value;

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth()); //January is 0!
            var yyyy = today.getFullYear();
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            today = monthNames[mm] + ', ' + dd + ' ' + yyyy;


            var $_taskDescriptionText = quill.getText();
            var $_taskDescriptionInnerHTML = quill.root.innerHTML;

            var delta = quill.getContents();
            var $_textDelta = JSON.stringify(delta);

            var length = 125;

            var trimmedString = $_taskDescriptionText.length > length ?
                $_taskDescriptionText.substring(0, length - 3) + "..." :
                $_taskDescriptionText;

            var $_taskEditedTitle = $_outerThis.parents('.todo-item').children().find('.todo-heading').html($_task);
            var $_taskEditedText = $_outerThis.parents('.todo-item').children().find('.todo-text').html(trimmedString);
            var $_taskEditedText = $_outerThis.parents('.todo-item').children().find('.meta-date').html(today);

            var $_taskEditedTitleDataAttr = $_outerThis.parents('.todo-item').children().find('.todo-heading').attr('data-todoHeading', $_task);
            var $_taskEditedTextDataAttr = $_outerThis.parents('.todo-item').children().find('.todo-text').attr('data-todoText', $_textDelta);
            var $_taskEditedTextDataAttr = $_outerThis.parents('.todo-item').children().find('.todo-text').attr('data-todoHtml', $_taskDescriptionInnerHTML);
            $('#addTaskModal').modal('hide');
        })
        $('#addTaskModal').modal('show');
    })
}

function todoItem() {
    $('.todo-item .todo-content').on('click', function (event) {
        event.preventDefault();

        var $_taskTitle = $(this).find('.todo-heading').attr('data-todoHeading');
        var $todoHtml = $(this).find('.todo-text').attr('data-todoHtml');

        $('.task-heading').text($_taskTitle);
        $('.task-text').html($todoHtml);

        $('#todoShowListItem').modal('show');
    });
}

var $btns = $('.list-actions').click(function () {
    if (this.id == 'all-list') {
        var $el = $('.' + this.id).fadeIn();
        $('#ct > div').not($el).hide();
    } else if (this.id == 'todo-task-trash') {
        var $el = $('.' + this.id).fadeIn();
        $('#ct > div').not($el).hide();
    } else {
        var $el = $('.' + this.id).fadeIn();
        $('#ct > div').not($el).hide();
    }
    $btns.removeClass('active');
    $(this).addClass('active');
})

checkCheckbox();
deleteDropdown();
deletePermanentlyDropdown();
reviveMailDropdown();
importantDropdown();
priorityDropdown();
editDropdown();
todoItem();

// $(".add-tsk").click(function(){
//   var today = new Date();
//   var dd = String(today.getDate()).padStart(2, '0');
//   var mm = String(today.getMonth()); //January is 0!
//   var yyyy = today.getFullYear();
//   var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
//
//   today = monthNames[mm] + ', ' + dd + ' ' + yyyy;
//   var $_task = document.getElementById('task').value;
//
//   var $_taskDescriptionText = quill.getText();
//   var $_taskDescriptionInnerHTML = quill.root.innerHTML;
//
//   var delta = quill.getContents();
//   var $_textDelta = JSON.stringify(delta);
//
//   $html = '<div class="todo-item all-list">'+
//               '<div class="todo-item-inner">'+
//                   '<div class="n-chk text-center">'+
//                       '<label class="new-control new-checkbox checkbox-primary">'+
//                         '<input type="checkbox" class="new-control-input inbox-chkbox">'+
//                         '<span class="new-control-indicator"></span>'+
//                       '</label>'+
//                   '</div>'+
//
//                   '<div class="todo-content">'+
//                       '<h5 class="todo-heading" data-todoHeading="'+$_task+'"> '+$_task+'</h5>'+
//                       '<p class="meta-date">'+today+'</p>'+
//                       "<p class='todo-text' data-todoHtml='"+$_taskDescriptionInnerHTML+"' data-todoText='"+$_textDelta+"'> "+$_taskDescriptionText+"</p>"+
//                   '</div>'+
//
//                   '<div class="priority-dropdown">'+
//                       '<div class="dropdown p-dropdown">'+
//                           '<a class="dropdown-toggle primary" href="#" role="button" id="dropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'+
//                               '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-octagon"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>'+
//                           '</a>'+
//
//                           '<div class="dropdown-menu" aria-labelledby="dropdownMenuLink-4">'+
//                               '<a class="dropdown-item danger" href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-octagon"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg> High</a>'+
//                               '<a class="dropdown-item warning" href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-octagon"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg> Middle</a>'+
//                               '<a class="dropdown-item primary" href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-octagon"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg> Low</a>'+
//                           '</div>'+
//                       '</div>'+
//                   '</div>'+
//
//                   '<div class="action-dropdown">'+
//                       '<div class="dropdown">'+
//                           '<a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'+
//                               '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>'+
//                           '</a>'+
//
//                           '<div class="dropdown-menu" aria-labelledby="dropdownMenuLink-4">'+
//                               '<a class="dropdown-item edit" href="javascript:void(0);">Edit</a>'+
//                               '<a class="important dropdown-item" href="javascript:void(0);">Important</a>'+
//                               '<a class="dropdown-item delete" href="javascript:void(0);">Delete</a>'+
//                               '<a class="dropdown-item permanent-delete" href="javascript:void(0);">Permanent Delete</a>'+
//                               '<a class="dropdown-item revive" href="javascript:void(0);">Revive Task</a>'+
//                           '</div>'+
//                       '</div>'+
//                   '</div>'+
//
//               '</div>'+
//           '</div>';
//
//
//     $("#ct").prepend($html);
//     $('#addTaskModal').modal('hide');
//     checkCheckbox();
//     deleteDropdown();
//     deletePermanentlyDropdown();
//     reviveMailDropdown();
//     editDropdown();
//     priorityDropdown();
//     todoItem();
//     importantDropdown();
//     new dynamicBadgeNotification('allList');
//     $(".list-actions#all-list").trigger('click');
// });

$('.tab-title .nav-pills a.nav-link').on('click', function (event) {
    $(this).parents('.mail-box-container').find('.tab-title').removeClass('mail-menu-show')
    $(this).parents('.mail-box-container').find('.mail-overlay').removeClass('mail-overlay-show')
})

// Validation Process

var $_getValidationField = document.getElementsByClassName('validation-text');

getTaskTitleInput = document.getElementById('task');

// getTaskTitleInput.addEventListener('input', function() {
//
//     getTaskTitleInputValue = this.value;
//
//     if (getTaskTitleInputValue == "") {
//       $_getValidationField[0].innerHTML = 'Title Required';
//       $_getValidationField[0].style.display = 'block';
//     } else {
//       $_getValidationField[0].style.display = 'none';
//     }
// })

// getTaskDescriptionInput = document.getElementById('taskdescription');
//
// getTaskDescriptionInput.addEventListener('input', function() {
//
//   getTaskDescriptionInputValue = this.value;
//
//   if (getTaskDescriptionInputValue == "") {
//     $_getValidationField[1].innerHTML = 'Description Required';
//     $_getValidationField[1].style.display = 'block';
//   } else {
//     $_getValidationField[1].style.display = 'none';
//   }
//
// })


// region Horizon Code
$(document).ready(function () {
    var formData;
    var isFileSelected = false;

    // var savedToken = localStorage.getItem("sessionToken");
    var savedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIxYmU2ZDkzYmY4YTQzMjhjODc3MGUiLCJpYXQiOjE1ODkyMzAwMjF9.ir931O6AlQJ8LIGoJMItIYrW8w3avLpOCr0y2Y9Iy2E";
    //Example 2
    $("#voucher-upload-input").filer({
        limit: 1,
        maxSize: null,
        extensions: ["txt"],
        changeInput: '<div class="jFiler-input-dragDrop"><div class="jFiler-input-inner"><div class="jFiler-input-icon"><i class="icon-jfi-cloud-up-o"></i></div><div class="jFiler-input-text"><h3>Drag&Drop files here</h3> <span style="display:inline-block; margin: 15px 0">or</span></div><a class="jFiler-input-choose-btn blue">Browse Files</a></div></div>',
        showThumbs: true,
        theme: "dragdropbox",
        templates: {
            box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
            item: '<li class="jFiler-item">\
						<div class="jFiler-item-container">\
							<div class="jFiler-item-inner">\
								<div class="jFiler-item-thumb">\
									<div class="jFiler-item-status"></div>\
									<div class="jFiler-item-thumb-overlay">\
										<div class="jFiler-item-info">\
											<div style="display:table-cell;vertical-align: middle;">\
												<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
												<span class="jFiler-item-others">{{fi-size2}}</span>\
											</div>\
										</div>\
									</div>\
									{{fi-image}}\
								</div>\
								<div class="jFiler-item-assets jFiler-row">\
									<ul class="list-inline pull-left">\
										<li>{{fi-progressBar}}</li>\
									</ul>\
									<ul class="list-inline pull-right">\
										<li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
									</ul>\
								</div>\
							</div>\
						</div>\
					</li>',
            itemAppend: '<li class="jFiler-item">\
							<div class="jFiler-item-container">\
								<div class="jFiler-item-inner">\
									<div class="jFiler-item-thumb">\
										<div class="jFiler-item-status"></div>\
										<div class="jFiler-item-thumb-overlay">\
											<div class="jFiler-item-info">\
												<div style="display:table-cell;vertical-align: middle;">\
													<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
													<span class="jFiler-item-others">{{fi-size2}}</span>\
												</div>\
											</div>\
										</div>\
										{{fi-image}}\
									</div>\
									<div class="jFiler-item-assets jFiler-row">\
										<ul class="list-inline pull-left">\
											<li><span class="jFiler-item-others">{{fi-icon}}</span></li>\
										</ul>\
										<ul class="list-inline pull-right">\
											<li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
										</ul>\
									</div>\
								</div>\
							</div>\
						</li>',
            progressBar: '<div class="bar"></div>',
            itemAppendToEnd: false,
            canvasImage: true,
            removeConfirmation: true,
            _selectors: {
                list: '.jFiler-items-list',
                item: '.jFiler-item',
                progressBar: '.bar',
                remove: '.jFiler-item-trash-action'
            }
        },
        dragDrop: {
            dragEnter: null,
            dragLeave: null,
            drop: null,
            dragContainer: null,
        },
        // uploadFile: {
        //     type: 'POST',
        //     enctype: 'multipart/form-data',
        //     url: "http://localhost:5000/api/voucher/upload",
        //     data: null,
        //     forceIframeTransport: true,
        //     headers: {
        //         'X-Auth-Token': savedToken
        //     },
        //     beforeSend: function (args) {
        //         if (savedToken === null) {
        //             console.log("Token not found. Unable to upload!");
        //         } else {
        //             console.log("Token Found: " + savedToken);
        //             args.xhr.setRequestHeader('X-Auth-Token', savedToken);
        //         }
        //     },
        //     success: function (data, itemEl, listEl, boxEl, newInputEl, inputEl, id) {
        //         console.log("Upload Response Success: " + JSON.stringify(data));
        //         var parent = itemEl.find(".jFiler-jProgressBar").parent(),
        //             new_file_name = JSON.parse(data),
        //             filerKit = inputEl.prop("jFiler");
        //
        //         filerKit.files_list[id].name = new_file_name;
        //
        //         itemEl.find(".jFiler-jProgressBar").fadeOut("slow", function () {
        //             $("<div class=\"jFiler-item-others text-success\"><i class=\"icon-jfi-check-circle\"></i> Success</div>").hide().appendTo(parent).fadeIn("slow");
        //         });
        //     },
        //     error: function (el) {
        //         console.log("Upload Response Error: " + JSON.stringify(el));
        //         var parent = el.find(".jFiler-jProgressBar").parent();
        //         el.find(".jFiler-jProgressBar").fadeOut("slow", function () {
        //             $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error</div>").hide().appendTo(parent).fadeIn("slow");
        //         });
        //     }
        // },
        files: null,
        addMore: false,
        allowDuplicates: true,
        clipBoardPaste: true,
        excludeName: null,
        beforeRender: null,
        afterRender: null,
        beforeShow: null,
        beforeSelect: null,
        onSelect: function () {
            isFileSelected = true;
            console.log("File selected.");
        },
        afterShow: null,
        onRemove: function (itemEl, file, id, listEl, boxEl, newInputEl, inputEl) {
            var filerKit = inputEl.prop("jFiler"),
                file_name = filerKit.files_list[id].name;

            // $.post('./php/ajax_remove_file.php', {file: file_name});
        },
        onEmpty: function () {
            isFileSelected = false;
            console.log("File input is empty");
        },
        options: null,
        dialogs: {
            alert: function (text) {
                return alert(text);
            },
            confirm: function (text, callback) {
                confirm(text) ? callback() : null;
            }
        },
        captions: {
            button: "Choose Files",
            feedback: "Choose files To Upload",
            feedback2: "files were chosen",
            drop: "Drop file here to Upload",
            removeConfirmation: "Are you sure you want to remove this file?",
            errors: {
                filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
                filesType: "Only text files (.txt) are allowed to be uploaded.",
                filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-maxSize}} MB.",
                filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB."
            }
        }
    });

    $('#voucher-upload-input').change(function () {
        //on change event
        formData = new FormData();
        if ($(this).prop('files').length > 0) {
            file = $(this).prop('files')[0];
            formData.append("file", file);
            isFileSelected = true;
            console.log("File is selected");
        } else {
            isFileSelected = false;
            console.log("File is not selected")
        }
    });

    $("#upload-voucher").click(function () {
        if (isFileSelected) {
            console.log("Uploading...");
            $.ajax({
                // Your server script to process the upload
                type: 'POST',
                contentType: false,
                url: 'http://localhost:5000/api/voucher/upload',

                // Form data
                data: formData,

                // Tell jQuery not to process data or worry about content-type
                // You *must* include these options!
                cache: false,
                processData: false,
                headers: {
                    'X-Auth-Token': savedToken
                },
                success: function (data) {
                    console.log("Upload Response Success: " + JSON.stringify(data));
                },

                error: function (el) {
                    console.log("Upload Response Error: " + JSON.stringify(el));
                }
            });
        } else {
            swal({
                title: 'Please upload a voucher file',
                padding: '2em'
            })
        }
    });
})
// endregion
