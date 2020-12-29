$("#datatable-leave-list").on("draw.dt", function () {
  $(".check-status").bootstrapToggle();
});
$(document).on("click", ".delete_button", function (e) {
  // e.preventDefault();
  var con = confirm("Are you sure want to delete?");
  if (con) {
    return true;
  } else {
    return false;
  }
});

/**
 *  Static pages LISTING
 * */
$("#datatable-pages-list").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[1, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "Pages");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: "/pages/list"
  }
});

$('#datatable-transaction').DataTable({
  "order": [[ 2, "desc" ]]
});


$("#datatable-menus-list").DataTable({
  "stateSave": true,
  aoColumnDefs: [
    {
      bSortable: false,
      'aTargets': [-1]
    }
  ],
  aaSorting: [[3, "asc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "Menu");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: "/menu/list"
  }
});

$("#datatable-sub-admin-roles-list").DataTable({
  "stateSave": true,
  aoColumnDefs: [
    {
      bSortable: false,
      'aTargets': [-1]
    }
  ],
  aaSorting: [[2, "asc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "SubAdminRole");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: "/subadmin-role/list"
  }
});

const cbpUserList = $("#datatable-cbp-user-list").DataTable({
  
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  "initComplete": function (settings, json) {
    $("body").loading('stop')
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "User");
  },
  "processing": true,
  "serverSide": true,
  "ajax": {
    url: `/users/list/cbp`,
    data: {
      date_range: function () {
        return $("#date_range").val();
      },
      activationType: function () {
        return $("#activationType").val();
      },
      cbpType: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
        }
        if(vars.length > 0 && vars['cbpadmin'] !== undefined && vars['cbpadmin'] !== "" && $("#cbpType").val() == "") {
          $("#cbpType").val(vars['cbpadmin']);
          $('#all_cbp').val('all')
          return vars['cbpadmin'];
        } else if($("#cbpType").val() == "all"){
          return ''
        } else {
          return $("#cbpType").val();
        }
      }
    }
  }
});

$("#cbp_user_filter_form").submit(function (event) {
  cbpUserList.draw();
  event.preventDefault();
});

const csoUserList = $("#datatable-cso-user-list").DataTable({
  
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  "initComplete": function (settings, json) {
    $("body").loading('stop')
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "User");
  },
  "processing": true,
  "serverSide": true,
  "ajax": {
    url: `/users/list/cso`,
    data: {
      date_range: function () {
        return $("#date_range").val();
      },
      activationType: function () {
        return $("#activationType").val();
      }
    }
  }
});

$("#cso_user_filter_form").submit(function (event) {
  csoUserList.draw();
  event.preventDefault();
});

/**
 *  Static pages LISTING
 * */
$("#datatable-notification-list").DataTable({
  
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[5, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "Broadcast");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: "/broadcast/list"
  }
});

/*
* Category Listing
*/
$("#datatable-category-list").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "BusinessCategory");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: "/categories/categoriesajax"
  }
});



/*
* Home Community Listing
*/
$("#datatable-community-list").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "HomeCommunity");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: "/community/communityajax"
  }
});

/*
* Business Listing
*/
$("#datatable-business-list").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "BusinessType");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: "/business/businessajax"
  }
});

/*
* Feed Listing
*/
var FeedList = $("#datatable-feed-list").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    for (var i = 0; i <= dataIndex; i++) {
      $(row).attr("id", data[4]);
    }
    $(row).attr("model", "Feed");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: "/feed/feedajax",
    data: {
      filterDates: function () {
        return $("#date_range").val();
      },
      FilterPostType: function () {
        return $("#post_type").val();
      }
    }
  }
});

$("#feed_filter_form").submit(function (event) {
  FeedList.draw();
  event.preventDefault();
});


/*
* upper Listing
*/
var upperLimitList = $("#datatable-upper-limit-list").DataTable({
  
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    for (var i = 0; i <= dataIndex; i++) {
      $(row).attr("id", data[4]);
    }
    $(row).attr("model", "UpperLimitRequest");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: "/upperlimit/upperlimitajax",
    data: {
      filterDates: function () {
        return $("#date_range").val();
      }
    }
  }
});

$("#upper_limit_filter_form").submit(function (event) {
  upperLimitList.draw();
  event.preventDefault();
});

const flaggedFeedList = $("#datatable-flagged-feed-list").DataTable({
  
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    for (var i = 0; i <= dataIndex; i++) {
      $(row).attr("id", data[4]);
    }
    $(row).attr("model", "Feed");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: "/feed/flaggedPostList",
    data: {
      filterDates: function () {
        return $("#date_range").val();
      },
    }
  }
});

$("#flagged_feed_filter_form").submit(function (event) {
  flaggedFeedList.draw();
  event.preventDefault();
});

const cmUserList = $("#datatable-cm-user-list").DataTable({
  
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  "initComplete": function (settings, json) {
    $("body").loading('stop')
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "User");
  },
  "processing": true,
  "serverSide": true,
  "ajax": {
    url: `/users/list/cm`,
    data: {
      date_range: function () {
        return $("#date_range").val();
      },
      activationType: function () {
        return $("#activationType").val();
      }
    }
  }
});

$("#cm_user_filter_form").submit(function (event) {
  cmUserList.draw();
  event.preventDefault();
});

$("#datatable-report-list").DataTable({
  
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[4, "desc"]],
  "initComplete": function (settings, json) {
    $("body").loading('stop')
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "User");
  },
  "processing": true,
  "serverSide": true,
  "ajax": {
    url: `/report/list`,
    data: {}
  }
});

$("#datatable-problem-list").DataTable({
  
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[2, "desc"]],
  "initComplete": function (settings, json) {
    $("body").loading('stop')
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "User");
  },
  "processing": true,
  "serverSide": true,
  "ajax": {
    url: `/report/problem/list`,
    data: {}
  }
});

/** list of verification request*/
const verificationList = $("#datatable-user-verification-request-list").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  "initComplete": function (settings, json) {
    $("body").loading('stop')
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "User");
  },
  "processing": true,
  "serverSide": true,
  "ajax": {
    url: `/users/list/verification-request`,
    data: {
      date_range: function () {
        return $("#date_range").val();
      },
      s_role: function () {
        return $("#s_role").val();
      }
    }
  }
});

$("#verification_filter_form").submit(function (event) {
  verificationList.draw();
  event.preventDefault();
});

/*Sub admin listing*/
$("#datatable-sub-admin-list").DataTable({
  
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  "initComplete": function (settings, json) {
    $("body").loading('stop')
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "User");
  },
  "processing": true,
  "serverSide": true,
  "ajax": {
    url: `/subadmin/list`,
    data: {}
  }
});


/** list of payment withdraw request*/
const paymentRequestList = $("#datatable-payment-list").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "PaymentRequest");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: `/payment/paymentRequestAjax`,
    data: {
      filterDates: function () {
        return $("#date_range").val();
      },
      filterUserType: function () {
        return $("#userType").val();
      },
      filterStatus: function () {
        return $("#requestStatus").val();
      }
    }
  }
});


$("#payment_request_filter_form").submit(function (event) {
  paymentRequestList.draw();
  event.preventDefault();
});


/** list of cm payment list */
const cmPaymentList = $("#datatable-cm-payment-list").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[4, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "PaymentRequest");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: `/payment/cmAckAjax`,
    data: {
      filterDates: function () {
        return $("#date_range").val();
      },
      filterUserid: function () {
        return $("#cmUser").val();
      }
    }
  }
});


$("#cm_payment_filter_form").submit(function (event) {
  cmPaymentList.draw();
  event.preventDefault();
});


/** list of cso payment list */
const csoPaymentList = $("#datatable-cso-payment-list").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[4, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "PaymentRequest");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: `/payment/csoAckAjax`,
    data: {
      filterDates: function () {
        return $("#date_range").val();
      },
      filterUserid: function () {
        return $("#csoUser").val();
      }
    }
  }
});


$("#cso_payment_filter_form").submit(function (event) {
  csoPaymentList.draw();
  event.preventDefault();
});

/*Wallet transaction list*/
const walletTransactionList = $("#wallet-transaction-list").DataTable({  
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  "initComplete": function (settings, json) {
    $("body").loading('stop')
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "User");
  },
  "processing": true,
  "serverSide": true,
  "searching":false,
  "ajax": {
    url: `/wallet/transaction-list`,
    data: {
      filterDates: () => $("#date_range").val(),
      transactionType: () => $("#transactionType").val()
    }
  }
});


$("#wallet_transaction_filter_form").submit(function (event) {
  walletTransactionList.draw();
  event.preventDefault();
});


/** list of CBP payment list for cso */
const cbpPaymentList = $("#datatable-cbp-payment-list").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "PaymentRequest");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: `/payment/cbpAckAjax`,
    data: {
      filterDates: function () {
        return $("#date_range").val();
      },
      filterUserid: function () {
        return $("#cbpUser").val();
      }
    }
  }
});


$("#cbp_payment_filter_form").submit(function (event) {
  cbpPaymentList.draw();
  event.preventDefault();
});


/** list of CM payment list for cso */
const cmPaymentListCSO = $("#datatable-cso-cm-payment-list").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[3, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "PaymentRequest");
  },
  processing: true,
  serverSide: true,
  ajax: {
    url: `/payment/cmAcknAjax`,
    data: {
      filterDates: function () {
        return $("#date_range").val();
      },
      filterUserid: function () {
        return $("#cbpUser").val();
      }
    }
  }
});


$("#cm_cso_payment_filter_form").submit(function (event) {
  cmPaymentListCSO.draw();
  event.preventDefault();
});



/** Admin payment History */
const paymentHistory = $("#datatable-payment-history").DataTable({
  aoColumnDefs: [
    {
      bSortable: false,
      aTargets: ["nosort"]
    }
  ],
  aaSorting: [[4, "desc"]],
  initComplete: function (settings, json) {
    $("body").loading("stop");
  },
  createdRow: function (row, data, dataIndex) {
    $(row).attr("model", "PaymentRequest");
  },
  processing: true,
  serverSide: true,
  searching: false,
  ajax: {
    url: `/payment/paymentHistoryAjax`,
    data: {
      filterDates: function () {
        return $("#date_range").val();
      }
    }
  }
});

$("#payment_history_filter_form").submit(function (event) {
  paymentHistory.draw();
  event.preventDefault();
});