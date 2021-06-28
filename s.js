var arr_all_NoteBook_folder = ['College', 'Personal'];
var arr_NoteBook_folder = ['College', 'Personal']
var arr_WorkBook = [];
var arr_Date = [];
var arr_Start_Date = [];
var arr_End_Date = []
var arr_Status = []
var arr_Description = [];
var arr_Date_sample = [];

var username = ['sanjeev09@gmail.com'];
var password = ['Sanjeev09@'];

$(document).ready(function() {
    $('.side_navbar').css("width", "0px");
    $('.side_menu_close_btn').css("left", "-20px");
    $('.side_navbar_content').css("margin-left", "-220px");
    $('.side_menu_open_btn').css("display", "none");
    $('.grid_body').css({ "grid-template-columns": "0% 100%" });

    $(window).on('load', function() {

        all_workbook();
    });



    function all_workbook() {
        arr_Date_sample = [];
        jQuery.each(arr_WorkBook, function(i, val) {
            arr_Date_sample.push(arr_Date[i]);
        });
        //////alert("ye");
        var notebook = "";

        jQuery.each(arr_WorkBook, function(i, val) {
            var minDate_index = min_date();
            //////alert(minDate_index);

            //notebook += "<div class='notes grid_container' value='kl'><div><input class='fol_name_selected' name='fol_name_selected'  value='" + i + "'>  </div></div>"
            if (arr_Status[minDate_index] == "F") {
                notebook += "<div class='notes grid_container " + minDate_index + " task_finished'><div class='folder_name_selected'><div>" + arr_WorkBook[minDate_index] + "</div></div><div class='folder_name_selected'><div>" + arr_Date[minDate_index] + "</div></div>";
            } else {
                notebook += "<div class='notes grid_container " + minDate_index + "'><div class='folder_name_selected'><div>" + arr_WorkBook[minDate_index] + "</div></div><div class='folder_name_selected'><div>" + arr_Date[minDate_index] + "</div></div>";
            }

            if (arr_Start_Date[minDate_index] != '') {
                notebook += "<div>Started on " + arr_Start_Date[minDate_index] + " </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";

            } else {
                notebook += "<div><button class='start btn_started' value='" + minDate_index + "'> Start </button> </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";
            }
            if (arr_Status[minDate_index] == "F") {
                notebook += "<div><span class='fa fa-check-square'></span></div><div><button class='delete' value='" + minDate_index + "'> Delete </button> </div> </div> ";
            } else {
                notebook += "<div><button class='btn_finished' value='" + minDate_index + "'> Finished </button> </div><div><button class='delete' value='" + minDate_index + "'> Delete </button> </div> </div> ";
            }

            arr_Date_sample[minDate_index] = '9999-12-30';
            //////alert("ss" + arr_Date_sample);
            //////alert('dd' + arr_Date);
        });
        $('#NoteBook_Folder_Container').html(notebook);
    }


    function min_date() {
        var min = arr_Date_sample[arr_Date_sample.length - 1];
        var index = 0;
        //////alert('min:' + min);
        jQuery.each(arr_Date_sample, function(i, val) {
            if (min >= arr_Date_sample[i]) {
                //////alert('aa' + arr_Date_sample[i]);
                min = arr_Date_sample[i];
                index = i;
            }
        });
        return index;
    }

    $(document).on('click', '.btn_finished', function() {
        var select_folder = $(this).val();
        if (arr_Start_Date[select_folder] == '') {
            //alert("Please First Start the Work...!");
        } else {
            arr_Status[select_folder] = "F";
            var d = new Date();
            var d1 = d.toISOString();
            arr_End_Date[select_folder] = d1.substring(0, 10);
            all_workbook();
        }
    });

    $(document).on('click', '.folder_name_selected', function() {
        var select_folder = $(this).text();
        //////alert($(this).text());
        //$(this).remove();
    });

    $(document).on('click', '.edit', function() {
        var select_folder = $(this).val();
        var work_name = arr_WorkBook[select_folder];
        var date = arr_Date[select_folder];
        var description = arr_Description[select_folder];
        $('#arr_no').val(select_folder);
        $('#edit_new_work_name').val(work_name);
        $('#edit_new_work_date').val(date);
        $('#edit_new_work_description').val(description);
        $('.popup_edit_list').show();

    });

    var position_delete;
    $(document).on('click', '.delete', function() {
        position_delete = $(this).val();

        $('.popup_delete').show();
        $('.warning_delete').show();
        $('.delete_succcess').hide();
        var folder_name_to_delete = arr_WorkBook[position_delete];
        $('#delete_item').text(folder_name_to_delete);

        /*if (position_delete == 0) {
            arr_all_NoteBook_folder.splice(0, 1);
        } else {
            arr_all_NoteBook_folder.splice(position_delete, position_delete);
        }*/
        //////alert("$('.con ' + i).remove()");
    });

    var position_start;
    $(document).on('click', '.start', function() {
        arr_Date_sample = [];
        position_start = $(this).val();
        var d = new Date();
        var d1 = d.toISOString();
        arr_Start_Date[position_start] = d1.substring(0, 10);
        //arr_Start_Date[position_start] = '';
        all_workbook();
    });

    $(document).on('click', '.see_details', function() {

        position_start = $(this).val();
        var workname = arr_WorkBook[position_start];
        var plan_date = arr_Date[position_start];
        var start_date = "";
        if (arr_Start_Date[position_start] == "") {
            start_date += "--Not Yet Start--";
        } else {
            start_date = arr_Start_Date[position_start];
        }
        var end_date = "";
        if (arr_End_Date[position_start] == "") {
            end_date += "---";
        } else {
            end_date = arr_End_Date[position_start];
        }
        var status = "";
        if (arr_Status[position_start] == 'N') {
            status = "Not Finished";
        } else {
            status = "Finished";
        }

        var des = arr_Description[position_start];
        $('#des_plan_workstart').text(plan_date);
        $('#des_workname').text(workname);
        $('#des_workstart').text(start_date);
        $('#des_workend').text(end_date);
        $('#des_workstatus').text(status);
        $('#des_workdes').text(des);
        $('.content_display').hide();
        $('.see_details_workbook').show();
        ////alert('sd');
    });

    $('.back_btn_description').click(function() {
        $('.content_display').show();
        $('.see_details_workbook').hide();
    });

    $('.btn_ok').click(function() {
        if (position_delete == 0) {
            arr_WorkBook.splice(0, 1);
            arr_Date.splice(0, 1);
            arr_Status.splice(0, 1);
            arr_Start_Date.splice(0, 1);
            arr_End_Date.splice(0, 1);
            arr_Description.splice(0, 1);
        } else {
            arr_WorkBook.splice(position_delete, position_delete);
            arr_Date.splice(position_delete, position_delete);
            arr_Status.splice(position_delete, position_delete);
            arr_Start_Date.splice(position_delete, position_delete);
            arr_End_Date.splice(position_delete, position_delete);
            arr_Description.splice(position_delete, position_delete);

        }
        //alert(arr_WorkBook);
        //alert(arr_Date);
        //alert(arr_Status);
        //alert(arr_Start_Date);
        //alert(arr_End_Date);
        //alert(arr_Description);

        $('.warning_delete').hide();
        $('.delete_succcess').show();
        /*var notebook = "";
        jQuery.each(arr_all_NoteBook_folder, function(i, val) {
            notebook += "<div class='notes grid_container con" + i + "'> <div>" + val + "</div><div><button> Edit </button>  </div><div><button class='delete' value='" + i + "'> Delete </button>  </div> </div>";
        });
        $('#NoteBook_Folder_Container').html(notebook);
        $('.popup_delete').hide();*/
    });

    $('.ok_success_delete').click(function() {
        var notebook = "";
        arr_Date_sample = [];
        jQuery.each(arr_WorkBook, function(i, val) {
            arr_Date_sample.push(arr_Date[i]);
        });
        //////alert(arr_Date + ">" + arr_Date_sample);

        jQuery.each(arr_WorkBook, function(i, val) {

            var minDate_index = min_date();
            //////alert(minDate_index);
            //////alert("yes");
            //notebook += "<div class='notes grid_container' value='kl'><div><input class='fol_name_selected' name='fol_name_selected'  value='" + i + "'>  </div></div>"
            notebook += "<div class='notes grid_container'><div class='folder_name_selected'><div>" + arr_WorkBook[minDate_index] + "</div></div><div class='folder_name_selected'><div>" + arr_Date[minDate_index] + "</div></div><div><button class='start btn_started'> Start </button> </div><div><button> See Details </button> </div><div><button> Edit </button> </div><div><button> Finished </button> </div><div><button class='delete' value='" + minDate_index + "'> Delete </button> </div> </div> ";
        });

        $('#NoteBook_Folder_Container').html(notebook);

        $('.popup_delete').hide();

    });

    $('.btn_cancel').click(function() {
        $('.popup_delete').hide();
    });


    $('.side_menu_close_btn').click(function() {
        $('.side_navbar').css("width", "0px");
        $('.side_menu_close_btn').css("left", "-20px")
        $('.side_menu_open_btn').css("display", "block");
        $('.grid_body').css({ "grid-template-columns": "0% 100%" });
        $('.side_navbar_content').css("margin-left", "-220px");
    });

    $('.side_menu_open_btn').click(function() {
        $('.side_navbar').css("width", "250px");
        $('.side_navbar_content').css("margin-left", "0px");
        $('.side_menu_open_btn').css("display", "none");
        $('.grid_body').css({ "grid-template-columns": "20% 80%" });
        $('.side_menu_close_btn').css("left", "220px");
    });

    $('.all').click(function() {
        $('.all').addClass('active');
        $('.finished').removeClass('active');
        $('.started').removeClass('active');
        $('.not_started').removeClass('active');
        $('.finished_notebook_container').hide();
        $('.started_notebook').hide();
        $('.non_started_notebook').hide();
        all_workbook();
        $('.all_worknotes').show();
    });

    $('.finished').click(function() {
        $('.finished').addClass('active');
        $('.all').removeClass('active');
        $('.started').removeClass('active');
        $('.not_started').removeClass('active');
        $('.all_worknotes').hide();
        $('.started_notebook').hide();
        $('.non_started_notebook').hide();
        finished_work();
        $('.finished_notebook_container').show();
    });

    $('.started').click(function() {
        $('.started').addClass('active');
        $('.all').removeClass('active');
        $('.finished').removeClass('active');
        $('.not_started').removeClass('active');

        $('.all_worknotes').hide();
        $('.finished_notebook_container').hide();
        $('.non_started_notebook').hide();
        start_work();
        $('.started_notebook').show();
    });

    $('.not_started').click(function() {
        $('.not_started').addClass('active');
        $('.all').removeClass('active');
        $('.finished').removeClass('active');
        $('.started').removeClass('active');

        $('.all_worknotes').hide();
        $('.finished_notebook_container').hide();
        $('.started_notebook').hide();
        non_start_work();
        $('.non_started_notebook').show();
    });

    $('.popup_save_add_list').click(function() {
        var work_name = $('#add_new_work_name').val();
        $('#add_new_work_name').val('');
        var date = $('#add_new_work_date').val();
        $('#add_new_work_date').val('');
        var d = new Date();
        var d1 = d.toISOString();
        var current_Date = d1.substring(0, 10);
        //////alert(current_Date);
        var description = $('#add_new_work_description').val();
        $('#add_new_work_description').val('');
        if (work_name == '' || date == '' || description == '') {
            $('#error_add_new').text('* Please fill all the required fields...!');
            $('#error_add_new').show();

        } else if (date < current_Date) {
            $('#error_add_new').text('Please put the Valid Date...!');
            $('#error_add_new').show();
        } else {
            arr_WorkBook.push(work_name);
            arr_Date.push(date);
            arr_Start_Date.push('');
            arr_End_Date.push('');
            arr_Status.push('N');
            arr_Description.push(description);
            $('.popup_add_list').hide();
            arr_Date_sample = [];
            all_workbook();
            start_work();
            finished_work();
        }
    });

    $('#add_new_work_name').click(function() {
        $('#error_add_new').hide();
    });
    $('#add_new_work_date').click(function() {
        $('#error_add_new').hide();
    });
    $('#add_new_work_description').click(function() {
        $('#error_add_new').hide();
    });

    $('.create_new_wokrbook').click(function() {
        $('.popup_add_list').show();
    });
    $('.btn_close_popup_add_list').click(function() {
        $('.popup_add_list').hide();
    });

    $('.btn_edit_list').click(function() {
        $('.popup_edit_list').hide();
    });

    $('.popup_save_edit_list').click(function() {
        var index_position = $('#arr_no').val();
        ////alert(index_position);
        var work_name = $('#edit_new_work_name').val();
        var work_date = $('#edit_new_work_date').val();
        var work_description = $('#edit_new_work_description').val();
        var d = new Date();
        var d1 = d.toISOString();
        var current_Date = d1.substring(0, 10);
        if (work_name == '' || work_date == '' || work_description == '') {
            $('#error_edit_work').text('* Please fill all the required fields...!');
            $('#error_edit_work').show();

        } else if (work_date < current_Date) {
            ////alert("iuueh");
            $('#error_edit_work').text('Please put the Valid Date...!');
            $('#error_edit_work').show();
        } else {
            arr_WorkBook[index_position] = work_name;
            arr_Date[index_position] = work_date;
            arr_Description[index_position] = work_description;
            $('.popup_edit_list').hide();
            arr_Date_sample = [];
            all_workbook();
            start_work();
            finished_work();
        }
    });

    function finished_work() {
        arr_Date_sample = [];
        var finished_workbook = [];
        var finished_Date = [];
        var finished_started_date = [];
        var finished_end_date = [];
        var finished_status = [];
        var finished_description = [];
        var finished_index = [];
        jQuery.each(arr_WorkBook, function(i, val) {
            arr_Date_sample.push(arr_Date[i]);

        });
        jQuery.each(arr_WorkBook, function(i, val) {

            var min_Date_index = min_date();
            ////alert("index: " + min_Date_index);
            if (arr_Status[min_Date_index] == "F") {
                finished_index.push(min_Date_index);
                finished_workbook.push(arr_WorkBook[min_Date_index]);
                finished_Date.push(arr_Date[min_Date_index]);
                finished_started_date.push(arr_Start_Date[min_Date_index])
                finished_end_date.push(arr_End_Date[min_Date_index]);
                finished_status.push(arr_Status[min_Date_index]);
                finished_description.push(arr_Description[min_Date_index]);
            }
            arr_Date_sample[min_Date_index] = '9999-12-30';
        });
        var finish_notebook = "";
        ////alert("status: " + finished_index);

        jQuery.each(finished_index, function(i, val) {


            ////alert("val " + finished_index[i]);
            var minDate_index = finished_index[i];
            var minDate_value = i;



            finish_notebook += "<div class='notes grid_container " + minDate_index + " task_finished'><div class='folder_name_selected'><div>" + finished_workbook[minDate_value] + "</div></div><div class='folder_name_selected'><div>" + finished_Date[minDate_value] + "</div></div>";

            //if (arr_Start_Date[minDate_value] != '') {
            finish_notebook += "<div>Started on " + finished_started_date[minDate_value] + " </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";

            //} else {
            //  finish_notebook += "<div><button class='start btn_started' value='" + minDate_index + "'> Start </button> </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";
            //}
            //if (arr_Status[minDate_value] == "F") {
            finish_notebook += "<div><span class='fa fa-check-square'></span></div><div><button class='delete' value='" + minDate_index + "'> Delete </button> </div> </div> ";
            //} else {
            //  finish_notebook += "<div><button class='btn_finished' value='" + minDate_index + "'> Finished </button> </div><div><button class='delete' value='" + minDate_index + "'> Delete </button> </div> </div> ";
            //}


        });
        $('.finished_notebook_container').html(finish_notebook);
    }

    function start_work() {
        arr_Date_sample = [];
        var start_workbook = [];
        var start_Date = [];
        var start_started_date = [];
        var start_end_date = [];
        var start_status = [];
        var start_description = [];
        var start_index = [];
        jQuery.each(arr_WorkBook, function(i, val) {
            arr_Date_sample.push(arr_Date[i]);
        });
        var start_notebook = "";
        ////alert("po");
        jQuery.each(arr_WorkBook, function(i, val) {

            var min_Date_index = min_date();
            ////alert("index: " + min_Date_index);
            if (arr_Start_Date[min_Date_index] != "" && arr_Status[min_Date_index] != "F") {
                start_index.push(min_Date_index);
                start_workbook.push(arr_WorkBook[min_Date_index]);
                start_Date.push(arr_Date[min_Date_index]);
                start_started_date.push(arr_Start_Date[min_Date_index])
                start_end_date.push(arr_End_Date[min_Date_index]);
                start_status.push(arr_Status[min_Date_index]);
                start_description.push(arr_Description[min_Date_index]);
            }
            arr_Date_sample[min_Date_index] = '9999-12-30';
        });

        ////alert("status1: " + start_index);

        jQuery.each(start_index, function(i, val) {


            ////alert("val " + start_index[i]);
            var minDate_index = start_index[i];
            var minDate_value = i;




            start_notebook += "<div class='notes grid_container " + minDate_index + "'><div class='folder_name_selected'><div>" + start_workbook[minDate_value] + "</div></div><div class='folder_name_selected'><div>" + start_Date[minDate_value] + "</div></div>";

            //////alert(start_started_date);
            //if (arr_Start_Date[minDate_value] != '') {
            start_notebook += "<div>Started on " + start_started_date[minDate_value] + " </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";

            /*} else {
                start_notebook += "<div><button class='start btn_started' value='" + minDate_index + "'> Start </button> </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";
            }*/


            start_notebook += "<div><button class='btn_finished' value='" + minDate_index + "'> Finished </button> </div><div><button class='delete' value='" + minDate_index + "'> Delete </button> </div> </div> ";



        });
        $('.started_notebook').html(start_notebook);
    }




    function non_start_work() {

        arr_Date_sample = [];
        var start_workbook = [];
        var start_Date = [];
        var start_started_date = [];
        var start_end_date = [];
        var start_status = [];
        var start_description = [];
        var start_index = [];
        jQuery.each(arr_WorkBook, function(i, val) {
            arr_Date_sample.push(arr_Date[i]);
        });

        var start_notebook = "";

        jQuery.each(arr_WorkBook, function(i, val) {

            var min_Date_index = min_date();
            ////alert("index: " + min_Date_index);
            if (arr_Start_Date[min_Date_index] == "") {
                start_index.push(min_Date_index);
                start_workbook.push(arr_WorkBook[min_Date_index]);
                start_Date.push(arr_Date[min_Date_index]);
                start_started_date.push(arr_Start_Date[min_Date_index])
                start_end_date.push(arr_End_Date[min_Date_index]);
                start_status.push(arr_Status[min_Date_index]);
                start_description.push(arr_Description[min_Date_index]);
            }
            arr_Date_sample[min_Date_index] = '9999-12-30';

        });

        //////alert("status1: " + start_index);

        jQuery.each(start_index, function(i, val) {


            //////alert("val " + start_index[i]);
            var minDate_index = start_index[i];
            var minDate_value = i;




            start_notebook += "<div class='notes grid_container " + minDate_index + "'><div class='folder_name_selected'><div>" + start_workbook[minDate_value] + "</div></div><div class='folder_name_selected'><div>" + start_Date[minDate_value] + "</div></div>";

            //////alert(start_started_date);
            if (start_started_date[minDate_value] != '') {
                start_notebook += "<div>Started on " + start_started_date[minDate_value] + " </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";

            } else {
                start_notebook += "<div><button class='start btn_started' value='" + minDate_index + "'> Start </button> </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";
            }


            start_notebook += "<div><button class='btn_finished' value='" + minDate_index + "'> Finished </button> </div><div><button class='delete' value='" + minDate_index + "'> Delete </button> </div> </div> ";



        });
        $('.non_started_notebook').html(start_notebook);
    }

    $('#search_value_folder').keyup(function() {
        ////alert("yes");

        var search = $('#search_value_folder').val();
        if (search != '') {
            arr_Date_sample = [];
            jQuery.each(arr_WorkBook, function(i, val) {
                arr_Date_sample.push(arr_Date[i]);
            });
            //////alert("ye");
            var notebook = "";

            jQuery.each(arr_WorkBook, function(i, val) {
                var minDate_index = i;
                //////alert(minDate_index);
                if (arr_WorkBook[minDate_index].includes(search)) {
                    //notebook += "<div class='notes grid_container' value='kl'><div><input class='fol_name_selected' name='fol_name_selected'  value='" + i + "'>  </div></div>"
                    if (arr_Status[minDate_index] == "F") {
                        notebook += "<div class='notes grid_container " + minDate_index + " task_finished'><div class='folder_name_selected'><div>" + arr_WorkBook[minDate_index] + "</div></div><div class='folder_name_selected'><div>" + arr_Date[minDate_index] + "</div></div>";
                    } else {
                        notebook += "<div class='notes grid_container " + minDate_index + "'><div class='folder_name_selected'><div>" + arr_WorkBook[minDate_index] + "</div></div><div class='folder_name_selected'><div>" + arr_Date[minDate_index] + "</div></div>";
                    }

                    if (arr_Start_Date[minDate_index] != '') {
                        notebook += "<div>Started on " + arr_Start_Date[minDate_index] + " </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";

                    } else {
                        notebook += "<div><button class='start btn_started' value='" + minDate_index + "'> Start </button> </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";
                    }
                    if (arr_Status[minDate_index] == "F") {
                        notebook += "<div><span class='fa fa-check-square'></span></div><div><button class='delete' value='" + minDate_index + "'> Delete </button> </div> </div> ";
                    } else {
                        notebook += "<div><button class='btn_finished' value='" + minDate_index + "'> Finished </button> </div><div><button class='delete' value='" + minDate_index + "'> Delete </button> </div> </div> ";
                    }
                    arr_Date_sample[minDate_index] = '9999-12-30';
                    //////alert("ss" + arr_Date_sample);
                    //////alert('dd' + arr_Date);
                }
            });
            $('#NoteBook_Folder_Container').html(notebook);
        } else {
            all_workbook();
        }
    });

    /*var search = $('#search_value_folder').val();
    arr_Date_sample = [];
    jQuery.each(arr_WorkBook, function(i, val) {
        arr_Date_sample.push(arr_Date[i]);
    });
    //////alert("ye");
    var notebook = "";

    jQuery.each(arr_WorkBook, function(i, val) {
        var minDate_index = min_date();
        //////alert(minDate_index);
        if (arr_WorkBook[i].includes(search)) {
            //notebook += "<div class='notes grid_container' value='kl'><div><input class='fol_name_selected' name='fol_name_selected'  value='" + i + "'>  </div></div>"
            if (arr_Status[minDate_index] == "F") {
                notebook += "<div class='notes grid_container " + minDate_index + " task_finished'><div class='folder_name_selected'><div>" + arr_WorkBook[minDate_index] + "</div></div><div class='folder_name_selected'><div>" + arr_Date[minDate_index] + "</div></div>";
            } else {
                notebook += "<div class='notes grid_container " + minDate_index + "'><div class='folder_name_selected'><div>" + arr_WorkBook[minDate_index] + "</div></div><div class='folder_name_selected'><div>" + arr_Date[minDate_index] + "</div></div>";
            }

            if (arr_Start_Date[minDate_index] != '') {
                notebook += "<div>Started on " + arr_Start_Date[minDate_index] + " </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";

            } else {
                notebook += "<div><button class='start btn_started' value='" + minDate_index + "'> Start </button> </div><div><button class='see_details' value='" + minDate_index + "'> See Details </button> </div><div><button class='edit' value='" + minDate_index + "'> Edit </button> </div>";
            }
            if (arr_Status[minDate_index] == "F") {
                notebook += "<div><span class='far fa-check-square-o'></span></div><div><button class='delete' value='" + minDate_index + "'> Delete </button> </div> </div> ";
            } else {
                notebook += "<div><button class='btn_finished' value='" + minDate_index + "'> Finished </button> </div><div><button class='delete' value='" + minDate_index + "'> Delete </button> </div> </div> ";
            }
            arr_Date_sample[minDate_index] = '9999-12-30';
            //////alert("ss" + arr_Date_sample);
            //////alert('dd' + arr_Date);
        }
    });
    $('#NoteBook_Folder_Container').html(notebook);*/
    $('.signup').click(function() {
        $('.login_container').hide();
        $('.register_container').show();
    });

    $('.signin').click(function() {
        $('.login_container').show();
        $('.register_container').hide();
    });

    $('.login_btn_container').click(function() {
        var uname = $('#lemail').val();
        ////alert(uname);
        var pwd = $('#psw').val();
        ////alert(pwd);
        jQuery.each(username, function(i, val) {
            if (username[i] == uname && password[i] == pwd) {
                $('.side_menu_open_btn').css("display", "block");
                $('.menu').css("display", "block");
                $('.first_page').css("display", "none");
                $('.login_container').hide();
                $('.all_content').show();

            } else {
                alert('Invalid UserName or Password...!');
            }
        });


    });

    $('.register_btn_container').click(function() {

        var ppassword = $('#cpassword').val();
        var cpassword = $('#ccpassword').val();
        var email = $('#cemail').val();
        if (ppassword.length > 8) {
            if (ppassword == cpassword) {
                if (email.includes("@gmail.com")) {
                    username.push(email);
                    password.push(ppassword);
                    alert("Your Registration is successfully completed. Now you can sign in.");
                    $('.login_container').show();
                    $('.register_container').hide();
                } else {
                    alert("Please put valid email address.");
                }
            } else {
                alert("Password and Confirm Password must be same.")
            }
        } else {
            alert("Password must contains minimum of 8 characters");
        }
    });
    $('.log_out').click(function() {
        $('.side_navbar').css("width", "0px");
        $('.side_menu_close_btn').css("left", "-20px");
        $('.side_navbar_content').css("margin-left", "-220px");
        $('.side_menu_open_btn').css("display", "none");
        $('.grid_body').css({ "grid-template-columns": "0% 100%" });

        $('.all_content').hide();
        $('.login_container').show();
    });
});