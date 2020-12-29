$(".service-price").bind("keypress", function (e) {
  var regex = new RegExp("^[0-9.]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

function changeOrderStatus() {
  var orderstatus = $("#order_status").val();
  if (orderstatus == "") orderstatus = "all";
  $("#exportorderscsv").attr("href", "/orders/export?status=" + orderstatus);
}
$("#order_status").on("change", function (event) {
  changeOrderStatus();
});

changeOrderStatus();

commissionMode();
$("input[type=radio][name=commission]").change(function () {
  commissionMode();
});

function commissionMode() {
  var checkedVal = $("input[name=commission]:checked").val();

  if (checkedVal == "yes") {
    $("#commission_value_block").css("display", "block");
    $('#commission_value').attr("required");
  } else {
    $("#commission_value_block").css("display", "none");
    $('#commission_value').removeAttr("required");
  }
}

function confirmbox(hrefLink) {
  Swal.fire({
    text: "Are you sure you want to perform this action?",
    type: 'warning',
    showCancelButton: true,
    focusCancel: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: 'Confirm'
  })
    .then((result) => {
      if (result.value) {
        location.href = hrefLink;
        return true;
      }
    });
};

$('.onlynumber').keypress(function (e) {
  var regex = new RegExp("^[0-9]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$('.alphanumeric').keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z0-9]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});


$(document).ready(function () {

  // Date Picker
  jQuery('.start_datepicker_modal').datepicker({
    startDate: '+0d',
    autoclose: true,
    todayHighlight: true,
    format: 'yyyy-mm-dd',
    onSelect: function (selected) {
      $(".end_datepicker_modal").datepicker("option", "minDate", selected)
    }
  });

  jQuery('.end_datepicker_modal').datepicker({
    startDate: '+0d',
    autoclose: true,
    todayHighlight: true,
    format: 'yyyy-mm-dd',
    onSelect: function (selected) {
      $(".start_datepicker_modal").datepicker("option", "maxDate", selected)
    }
  });

  $('.datepicker_btn').datepicker({
    autoclose: true,
    format: 'yyyy-mm-dd'
  })
    .change(setMonthDate)
    .on('changeDate', setMonthDate);

  function setMonthDate(ev) {
    $(this).datepicker('hide');
    var selected_date = new Date($('#datepicker_btn').val());
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $('#calendar-month .display_month_year').text(months[selected_date.getMonth()] + ' ' + selected_date.getFullYear());
    $('#calendar').fullCalendar('gotoDate', selected_date);
    setAssignmentData(selected_date)
  }

  //$('[data-toggle="tooltip"]').tooltip(); 
})

$(".main_feed_listing").on('change', '.feed_rating', function (event) {
  feedRating = event.target.value
  feedId = $(this).attr("data-id");
  isDetail = $(this).attr("data-detail");

  if (feedRating !== undefined && feedRating !== '' && feedId !== undefined && feedId !== '') {
    Swal.fire({
      title: "Rating Feed!",
      text: "are you sure give rating to this feed",
      type: 'warning',
      showCancelButton: true,
      focusconfirm: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: 'Confirm'
    })
      .then((result) => {
        if (result.value) {
          $.ajax({
            url: "/feed/rateFeed",
            data: { feedId: feedId, rating: feedRating },
            type: 'POST',
            dataType: "json",
            success: function (result) {
              if (result.status == 'success') {
                if (isDetail) {
                  SuccessfullyAlert(result.msg, true, false);
                } else {
                  SuccessfullyAlert(result.msg, false, true);
                }
              } else {
                ErrorAlert(result.msg);
              }
            }
          });
        } else {
          event.target.value = '';
        }
      });

  }
});



var yearsFilter = [];
var now = new Date();
for (var i = now.getFullYear(); i >= 2018; i--) {
  yearsFilter.push(i);
}

$('#filterMonth').val(now.getMonth());
$.each(yearsFilter, function (i, item) {
  $("#yearlist").append(
    $("<option>", {
      value: item,
      text: item
    })
  );
});

$('#yearlist').val(now.getFullYear());
$('#all_option').remove();

var startTime, endTime, taxiId;

function timeConvert(n, is_24_hr_time) {
  var num = n * 60;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  if (is_24_hr_time) {
    return `${rhours > 12 ? rhours - 12 < 10 ? '0' + rhours : rhours : rhours < 10 ? '0' + rhours : rhours}:${rminutes < 10 ? '0' + rminutes : rminutes} ${rhours >= 12 ? 'PM' : 'AM'}`;
  } else {
    return `${rhours}:${rminutes}`;
  }

}


$('#panel-modal').on('hidden.bs.modal', function (e) {
  $(this)
    .find("input[type=text],textarea,select")
    .val('')
    .end()
    .find("input[type=checkbox], input[type=radio]")
    .prop("checked", "")
    .end();
})


function SuccessfullyAlert(msg, refresh = false, ajaxReload = false, redirectTo = 'self', reload = false) {
  Swal.fire({
    title: "Success!",
    text: msg,
    type: 'success'
  })
    .then((result) => {
      if (refresh == true) {
        window.location.href = redirectTo === 'self' ? location.reload() : location.href = redirectTo;
      } else if (ajaxReload == true) {
        $("#feed_filter_form").submit();
      } else if (reload) {
        location.reload();
      }
      return true;

    });
};

function ErrorAlert(msg) {
  Swal.fire({
    title: "Error!",
    text: msg,
    type: 'error'
  })
    .then((result) => {
      return true;
    });
};


function approveData(hrefLink, title = 'Warning!', msg = 'Are you sure to perform this action..?') {
  Swal.fire({
    title: title,
    text: msg,
    type: 'warning',
    showCancelButton: true,
    focusconfirm: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: 'Confirm'
  })
    .then((result) => {
      if (result.value) {
        location.href = hrefLink;
        return true;
      }
    });
};

$('.btn_submit').click(() => {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  filter_date = $("#date_range").val();
});

if ($('#country').is(':visible')) {
  const selectedCountry = $('#country').attr('selectedCountry');
  fetch('/utils/countries')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then(function (data) {
          let option = `<option class="select_default_value" value="">Select Country</option>`;
          data.forEach(function (country) {
            let op_select = selectedCountry && selectedCountry === country.name ? 'selected' : '';
            option = option + `<option value="` + country.name + `" ` + op_select + ` >` + country.name + `</option>`;
          });
          $('#country').html(option);
        });
      }
    )
    .catch(function (err) {
      console.log('Country Fetch Error:', err);
    });
}

feedReportedBy = flags => {
  let tblhtml = `<table class="table table-striped"><tbody>`;
  flags.forEach(flag => {
    tblhtml = tblhtml + `<tr>  
        <td><a href="/users/view/${flag.user_id._id}"> ${flag.user_id.first_name || ''} ${flag.user_id.middle_name || ''} ${flag.user_id.last_name || ''}</a> </td> 
        <td>${flag.reason}</td>
        </tr> `;
  });
  tblhtml = tblhtml + `</tbody> </table>`;
  $('.modal-body').html(tblhtml);
  $('#myModal').modal('show');
};

function viewCities(cities) {
  $('#community_modal').modal('show');

  let tblhtml = `<table class="table table-striped">
   <thead>
   <tr>
    <th style="width:30%">City</th>
    <th style="width:70%">Zipcodes</th>
   </tr>
   </thead>
   <tbody>`;

  citiesList = cities.sort((a,b) => (a.city.toLowerCase() > b.city.toLowerCase()) ? 1 : ((b.city.toLowerCase() > a.city.toLowerCase()) ? -1 : 0)); 
  
  citiesList.forEach(city => {
    tblhtml = tblhtml + `<tr>  
          <td>${city.city || ''}</td> 
          <td>`;
    zipcodes = '';
    citiesZipcode = city.zipcodes.sort((a,b) => (parseInt(a) > parseInt(b)) ? 1 : ((parseInt(b) > parseInt(a)) ? -1 : 0)); 

    citiesZipcode.forEach((item, key) => {
      zipcodes += `${item} ${(key < city.zipcodes.length - 1) ? ', ' : ''}`;
    });
    tblhtml = tblhtml + `${zipcodes}</td> 
          </tr> `;
  });
  tblhtml = tblhtml + `</tbody> </table>`;
  $('.modal-title').html('Home Community Cities');
  $('.modal-body').html(tblhtml);
}

function viewCSO(communityId) {
  if (communityId) {
    $.ajax({
      url: "/community/viewcso/" + communityId,
      data: {},
      type: 'GET',
      dataType: "json",
      success: function (result) {
        if (result.status == 'success') {
          let tblhtml = `<table class="table table-striped">
                      <thead>
                      <tr><th>CSO Name</th><th>Zipcode</th></tr>
                      </thead>
                      <tbody>`;
          if (result.data.length > 0) {
            result.data.forEach(item => {
              tblhtml = tblhtml + `<tr>  
            <td>${item.first_name || ''} ${item.middle_name || ''} ${item.last_name || ''} </td> 
            <td>${item.zipcode || ''}</td> 
            </tr> `;
            });
          } else {
            tblhtml = tblhtml + `<tr>  
          <td colspan="2" style="text-align:center">No Data</td> 
          </tr> `;
          }
          tblhtml = tblhtml + `</tbody> </table>`;
          $('.modal-title').html('Home Community CSO List');
          $('.modal-body').html(tblhtml);

          $('#community_modal').modal('show');
        } else {

        }
      }
    });
  }
}

function editUpperLimit(limitId) {
  if (limitId) {
    $.ajax({
      url: "/upperlimit/edit/" + limitId,
      data: {},
      type: 'GET',
      dataType: "json",
      success: function (result) {
        if (result.status == 'success') {
          $('#myModal').modal('hide');
          SuccessfullyAlert(result.msg, true, false);
        } else {
          $('#myModal').modal('hide');
          ErrorAlert(result.msg);
        }
      }
    });
  }
}

$('#export_cm').click((e) => {
  e.preventDefault();
  window.location.href = `/users/export/cm?date_range=${$('#date_range').val()}&&activationType=${$('#activationType').val()}`;
});

$('#export_cso').click((e) => {
  e.preventDefault();
  window.location.href = `/users/export/cso?date_range=${$('#date_range').val()}&&activationType=${$('#activationType').val()}`;
});

$('#export_cbp').click((e) => {
  e.preventDefault();
  window.location.href = `/users/export/cbp?date_range=${$('#date_range').val()}&&activationType=${$('#activationType').val()}`;
});

$('#export_payment_request').click((e) => {
  e.preventDefault();
  window.location.href = `/payment/export/payment_request?date_range=${$('#date_range').val()}&&userType=${$('#userType').val()}`;
});
/*export csv for cbp of cm Ack*/
$('#export_cbp_cm_ack').click((e) => {
  e.preventDefault();
  window.location.href = `/payment/export/cm_ack?date_range=${$('#date_range').val()}&&userId=${$('#cmUser').val()}`;
});
/*Export admin payment history  */
$('#export_payment_history').click((e) => {
  e.preventDefault();
  window.location.href = `/payment/export/payment_history?date_range=${$('#date_range').val()}}`;
});



receiversList = UserList => {
  let tblhtml = `<table class="table table-striped"><tbody>`;
  UserList.forEach(user => {
    tblhtml = tblhtml + `<tr>  <td>${user.first_name || ''} ${user.middle_name || ''} ${user.last_name || ''}</td> </tr> `;
  });
  tblhtml = tblhtml + `</tbody> </table>`;
  $('.modal-body').html(tblhtml);
  $('#myModal').modal('show');
};



function payoutRequest(hrefLink, title = 'Warning!', msg = 'Are you sure to perform this action..?') {
  Swal.fire({
    title: title,
    text: msg,
    type: 'warning',
    showCancelButton: true,
    focusconfirm: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: 'Confirm'
  })
    .then((result) => {
      if (result.value) {
        location.href = hrefLink;
      }
    })
}

function send_ack_to_cm(value) {
  console.log("this is send ack value =====", value);

  Swal.fire({
    title: 'Send Acknowledgement Receipt',
    text: 'Are you sure to send acknowledgement receipt..?',
    type: 'warning',
    showCancelButton: true,
    focusconfirm: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: 'Confirm'
  })
    .then((result) => {
      if (result.value) {
        $.ajax({
          url: "/payment/send_ack_receipt_mail",
          data: {email: value.user_data.email, amount: value.pendingAmount},
          type: 'POST',
          dataType: "json",
          success: function (result) {
            console.log("result====--->", result);
            if (result.status == 'success') {
              SuccessfullyAlert(result.msg, false, false, false, true);
            } else {
              ErrorAlert(result.msg);
            }
          }
        });
      }
    });



}

$(this).siblings('.select2-container').find('.select2-selection__placeholder').css('color', 'red');
