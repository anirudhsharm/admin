var App = {
    validateProfilePage: function() {
        $("#profileForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                name:{
                    required: true,
                    minlength: 3,
                    maxlength: 30
                },
                emailID: {
                    required: true,
                    email: true,
                    maxlength: 40
                }
            },
            messages: {
                name: {
                    required: `Name is required`,
                    minlength: `Name is required to be minimum 3 chars`,
                    maxlength: `Name is required to be maximum 30 chars`,
                    pattern: 'Please enter a valid name'
                },
                emailID: {
                    required: 'Email is required',
                    email: 'Email is required to be a valid email',
                    maxlength: 'Email is required to be maximum 40 chars',
                    pattern: 'Please enter a valid email'
                },
            }
        });
    },
    validateChangePasswordPage: function() {
        $("#changePasswordForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                old_password: {
                    required: true
                },
                new_password: {
                    required: true,
                    minlength: 8,
                },
                confirm_password: {
                    required: true,
                    equalTo: '#new_password'
                }
            },
            messages: {
                old_password: {
                    required: 'Old password is required',
                },
                new_password: {
                    required: 'New password is required',
                    minlength: 'New password is required to be minimum 8 chars',
                },
                confirm_password: {
                    required: 'Confirm password is required',
                    equalTo: 'Confirm password & new password must match',
                }
            }
        });
    },
    validateEditMenuPage: function() {
        $("#menuEditForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                title: {
                    required: true,
                    minlength: 3,
                    maxlength: 50,
                },
                order: {
                    required: true,
                    number: true,
                    minlength: 1,
                    maxlength: 2,
                },
            },
            messages: {
                title: {
                    required: 'title is required',
                    minlength: 'title is required to be minimum 3 chars',
                    maxlength: 'title is required to be maximum 50 chars',
                },
                order: {
                    required: 'order is required',
                    minlength: 'order is required to be minimum 1 digits',
                    maxlength: 'order is required to be maximum 2 digits',
                },
            }
        });
    },
    validateRolePage: function() {
        $("#subAdminRoleForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                title: {
                    required: true,
                    minlength: 3,
                    maxlength: 50
                },
                menu: {
                    required: true
                }
            },
            messages: {
                title: {
                    required: 'title is required',
                    minlength: 'title is required to be minimum 3 chars',
                    maxlength: 'title is required to be maximum 50 chars'
                },
                menu: {
                    required: `Please choose at least one menu.`
                }
            }
        });
    },
    validateAddSubAdminPage: function() {
        $("#subAdminForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                name:{
                    required: true,
                    minlength: 3,
                    maxlength: 30
                },
                emailID: {
                    required: true,
                    email: true,
                    maxlength: 40,
                    remote: {
                        url: "/users/checkemail",
                        type: "post"
                    }
                },
                passwordString: {
                    required: true,
                    minlength: 8
                },
                subAdminRole: 'required',
                companyName: 'required',
                designation: 'required',
                website: 'required',
                phoneNumber_code:'required',
                phoneNumber: 'required'
            },
            messages: {
                name: {
                    required: `Name is required`,
                    minlength: `Name is required to be minimum 3 chars`,
                    maxlength: `Name is required to be maximum 30 chars`
                },
                emailID: {
                    required: 'Email is required',
                    email: 'Email is required to be a valid email',
                    maxlength: 'Email is required to be maximum 40 chars',
                    remote:"Email is already exist"
                },
                passwordString: {
                    required: 'Password is required',
                    minlength: 'Password is required to be minimum 8 chars',
                    pattern: 'Password must contain a small, capital letter, a special char & one digit'
                },
                subAdminRole: 'Please choose a sub-admin role',
                companyName: 'Company is required',
                designation: 'Designation is required',
                website: 'Website is required',
                phoneNumber_code: {
                    required: `Country code is required`
                },
                phoneNumber: {
                    required: `Phone Number is required`
                }
            }
        });
    },
    validateEditSubAdminPage: function() {
        $("#subAdminForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                name:{
                    required: true,
                    minlength: 3,
                    maxlength: 30
                },
                emailID: {
                    required: true,
                    email: true,
                    maxlength: 40,
                    remote: {
                        url: "/users/checkemail",
                        type: "post",
                        data: {
                            _id: function () {
                                return userId
                            }
                        }

                    }
                },
                passwordString: {
                    required: true,
                    minlength: 8
                },
                subAdminRole: 'required',
                companyName: 'required',
                designation: 'required',
                website: 'required',
                phoneNumber_code:'required',
                phoneNumber: 'required'
            },
            messages: {
                name: {
                    required: `Name is required`,
                    minlength: `Name is required to be minimum 3 chars`,
                    maxlength: `Name is required to be maximum 30 chars`
                },
                emailID: {
                    required: 'Email is required',
                    email: 'Email is required to be a valid email',
                    maxlength: 'Email is required to be maximum 40 chars',
                    remote:"Email is already exist"
                },
                passwordString: {
                    required: 'Password is required',
                    minlength: 'Password is required to be minimum 8 chars',
                    pattern: 'Password must contain a small, capital letter, a special char & one digit'
                },
                subAdminRole: 'Please choose a sub-admin role',
                companyName: 'Company is required',
                designation: 'Designation is required',
                website: 'Website is required',
                phoneNumber_code: {
                    required: `Country code is required`
                },
                phoneNumber: {
                    required: `Phone Number is required`
                },
            }
        });
    },
    validateUploadDatasetPage: function() {
        $("#daatsetForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                field: {
                    required: true,
                    extension: "xls|csv"
                }
            }
        });
    },
    validatePackagePage: function() {
        $("#packageForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                name:{
                    required: true,
                    minlength: 3,
                    maxlength: 30
                },
                verified_contact:{
                    required: true,
                    number: true,
                },
                number_of_email:{
                    required: true,
                    number: true,
                },
                number_of_campaign:{
                    required: true,
                    number: true,
                },
                price:{
                    required: true,
                    number: true,
                }
            },
            messages: {
                name: {
                    required: `Name is required`,
                    minlength: `Name is required to be minimum 3 chars`,
                    maxlength: `Name is required to be maximum 30 chars`
                },
                verified_contact: {
                    required: 'Verified Contact is required',
                    number: 'Verified Contact is required to be a valid number'
                },
                number_of_email: {
                    required: 'Number Of Email is required',
                    number: 'Number Of Email is required to be a valid number'
                },
                number_of_campaign: {
                    required: 'Number Of Campaign is required',
                    number: 'Number Of Campaign is required to be a valid number'
                },
                price: {
                    required: 'Price is required',
                    number: 'Price is required to be a valid number'
                }
            }
        });
    },
    validateCustomerPage: function() {
        let data = {};
        if (typeof userId !== 'undefined') {
            data = {
                _id: function () {
                    return userId
                }
            };
        }
        $("#coustomerForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                name:{
                    required: true,
                    minlength: 3,
                    maxlength: 30
                },
                companyName:{
                    required: true,
                    minlength: 3,
                    maxlength: 30
                },
                designation:{
                    required: true,
                },
                website:{
                    required: true,
                },
                companySize: {
                    required: true,
                    number: true,
                },
                emailID: {
                    required: true,
                    email: true,
                    maxlength: 40,
                    remote: {
                        url: "/users/checkemail",
                        type: "post",
                        data: data
                    }
                },
                numberOfEmail: {
                    required: true,
                    number: true,
                },
                numberOfSMS: {
                    required: true,
                    number: true,
                },
                numberOfContacts: {
                    required: true,
                    number: true,
                },
                phoneNumber_code:'required',
                phoneNumber: 'required'
            },
            messages: {
                name: {
                    required: `Name is required`,
                    minlength: `Name is required to be minimum 3 chars`,
                    maxlength: `Name is required to be maximum 30 chars`
                },
                companyName: {
                    required: `Company Name is required`,
                    minlength: `Company Name is required to be minimum 3 chars`,
                    maxlength: `Company Name is required to be maximum 30 chars`
                },
                designation: {
                    required: `Designation is required`
                },
                website: {
                    required: `Website is required`
                },
                companySize: {
                    required: `Company Size is required`,
                    number: 'Company Size is required to be a valid number'
                },
                emailID: {
                    required: 'Email is required',
                    email: 'Email is required to be a valid email',
                    maxlength: 'Email is required to be maximum 40 chars',
                    remote:"Email is already exist"
                },
                numberOfEmail: {
                    required: `Email credits is required`,
                    number: 'Email credits is required to be a valid number'
                },
                numberOfSMS: {
                    required: `SMS credits is required`,
                    number: 'SMS credits is required to be a valid number'
                },
                numberOfContacts: {
                    required: `Contact credits is required`,
                    number: 'Contact credits is required to be a valid number'
                },
                phoneNumber_code: {
                    required: `Country code is required`
                },
                phoneNumber: {
                    required: `Phone Number is required`
                },
            }
        });
    },
    validatePartnerPage: function() {
        $("#partnerForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                name:{
                    required: true,
                    minlength: 3,
                    maxlength: 30
                },
                email: {
                    required: true,
                    email: true,
                    maxlength: 40
                },
                contact: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: `Name is required`,
                    minlength: `Name is required to be minimum 3 chars`,
                    maxlength: `Name is required to be maximum 30 chars`,
                    pattern: 'Please enter a valid name'
                },
                email: {
                    required: 'Email is required',
                    email: 'Email is required to be a valid email',
                    maxlength: 'Email is required to be maximum 40 chars',
                    pattern: 'Please enter a valid email'
                },
                contact: {
                    required: `Contact is required`
                },
            }
        });
    },
    validateOfferCustomer: function() {
        $("#customerForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                coupon:{
                    required: true,
                    minlength: 3,
                    maxlength: 30
                },
                percent: {
                    required: true,
                    number: true,
                },
                numberOfUses: {
                    required: true,
                    number: true,
                }
            },
            messages: {
                coupon: {
                    required: `Coupon is required`,
                    minlength: `Coupon is required to be minimum 3 chars`,
                    maxlength: `Coupon is required to be maximum 30 chars`,
                    pattern: 'Please enter a valid coupon'
                },
                percent: {
                    required: `Percent is required  without "%"`,
                    number: 'Percent is required to be a valid number without "%"'
                },
                numberOfUses: {
                    required: `Number Of Uses is required`,
                    number: 'Number Of Uses is required to be a valid number'
                },
                
            }
        });
    },
    validateOfferChannel: function() {
        $("#channelForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                coupon:{
                    required: true,
                    minlength: 3,
                    maxlength: 30
                },
                percent: {
                    required: true,
                    number: true,
                },
                numberOfUses: {
                    required: true,
                    number: true,
                },
                partnerId: {
                    required: true
                }
            },
            messages: {
                coupon: {
                    required: `Coupon is required`,
                    minlength: `Coupon is required to be minimum 3 chars`,
                    maxlength: `Coupon is required to be maximum 30 chars`,
                    pattern: 'Please enter a valid coupon'
                },
                percent: {
                    required: `Percent is required  without "%"`,
                    number: 'Percent is required to be a valid number without "%"'
                },
                numberOfUses: {
                    required: `Number Of Uses is required`,
                    number: 'Number Of Uses is required to be a valid number'
                },
                partnerId: 'Please choose a Partner',
            }
        });
    },
    validateSubIndustryPage: function(category) {
        $("#SubIndustryForm").validate({
            errorPlacement: function(error, element) {
                $(element).closest('.form-group').append(error).addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $(element).closest('.form-check').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-check').removeClass('has-error').addClass('has-success');
            },
            submitHandler: function(form) {
                $('#submitBtn').attr('disabled', 'disabled');
                form.submit();
            },
            rules: {
                name:{
                    required: true,
                }
            },
            messages: {
                name: {
                    required: `Name is required`,
                }
            }
        });
    },
    listMenuRecords: function() {
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
    },
    listRoleRecords: function() {
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
    },
    listSubAdminRecords: function() {
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
    },
    listDatasetRecords: function() {
        /*
        * DatasetList Listing
        */
        var searchList = $("#datatable-datasets-list").DataTable({
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
            url: "/dataset/list",
            data: {
                filterEmail: function () {
                    return $("form.advance-search").find('[name ="email"]').val();
                },
                filterFirstName: function () {
                    return $("form.advance-search").find('[name ="firstName"]').val();
                },
                filterLastName: function () {
                    return $("form.advance-search").find('[name ="lastName"]').val();
                },
                filterCountry: function () {
                    return $("form.advance-search").find('[name ="countryOrRegion"]').val();
                },
                filterDesignation: function () {
                    return $("form.advance-search").find('[name ="designationLevel"]').val();
                },
                filterIndustry: function () {
                    return $("form.advance-search").find('[name ="industry"]').val();
                },
                filterIndustryType: function () {
                    return $("form.advance-search").find('[name ="industryType"]').val();
                },
                filterCompanyName: function () {
                    return $("form.advance-search").find('[name ="companyName"]').val();
                },
                filterCity: function () {
                    return $("form.advance-search").find('[name ="city"]').val();
                },
                filterStateOrProvince: function () {
                    return $("form.advance-search").find('[name ="stateOrProvince"]').val();
                }
            }
            }
        });
        
        $("#filter-form").submit(function (event) {
            searchList.draw();
            event.preventDefault();
        });

        $(".reset-btn").click(function(){
            $("#filter-form").trigger("reset");
            searchList.draw();
        });
    },
    listDatasetHistoryRecords: function() {
        $("#datatable-datasets-history-list").DataTable({
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
              url: "/dataset/history-list"
            }
        });
    },
    listPackageRecords: function() {
        $("#datatable-packages-history-list").DataTable({
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
              url: "/subscription-package/list"
            }
        });
    },
    listActiveVisitingRecords: function() {
        var table = $("#datatable-active-visiting-list").DataTable({
            "stateSave": true,
            aoColumnDefs: [
              {
                bSortable: false,
                'aTargets': [-1]
              }
            ],
            initComplete: function (settings, json) {
              $("body").loading("stop");
            },
            createdRow: function (row, data, dataIndex) {
              $(row).attr("model", "Menu");
            },
            processing: true,
            serverSide: true,
            ajax: {
              url: "/visiting-log/active-list",
              data: {
                filterLoggedInAT: function () {
                    return $("form.advance-search").find('[name ="loggedInAT"]').val();
                }
              }
            }
        });
        $("#filter-form").submit(function (event) {
            table.draw();
            event.preventDefault();
        });

        $(".reset-btn").click(function(){
            $("#filter-form").trigger("reset");
            table.draw();
        });
    },
    listCustomerRecords: function() {
        $("#datatable-customer-list").DataTable({
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
              url: `/customer/list`,
              data: {}
            }
        });
    },
    listPartnerRecords: function() {
        $("#datatable-partner-list").DataTable({
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
              url: `/offer/partner-list`
            }
        });
    },
    listCustomerOfferRecords: function() {
        $("#datatable-customer-offer-list").DataTable({
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
              url: `/offer/customer-list`
            }
        });
    },
    listChannelOfferRecords: function() {
        $("#datatable-channel-offer-list").DataTable({
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
              url: `/offer/channel-list`
            }
        });
    },
    listActiveLogRecords: function() {
        $("#datatable-active-log-list").DataTable({
            "initComplete": function (settings, json) {
              $("body").loading('stop')
            },
            createdRow: function (row, data, dataIndex) {
              $(row).attr("model", "User");
            },
            "processing": true,
            "serverSide": true,
            "ajax": {
              url: `/log/preview`
            }
        });
    },
    listSupportRecords: function(userId) {
        $("#datatable-support-list").DataTable({
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
              url: `/customer/support-list/`+userId,
              data: {}
            }
        });
    },
    listFilterInductriesRecords: function() {
        $("#datatable-filter-list").DataTable({
            "initComplete": function (settings, json) {
              $("body").loading('stop')
            },
            createdRow: function (row, data, dataIndex) {
              $(row).attr("model", "User");
            },
            "processing": true,
            "serverSide": true,
            searching: false,
            "ajax": {
              url: `/filter-list-industries/`,
              data: {}
            }
        });
    }
    ,
    listFilterSubInductriesRecords: function() {
        $("#datatable-filter-list").DataTable({
            "initComplete": function (settings, json) {
              $("body").loading('stop')
            },
            createdRow: function (row, data, dataIndex) {
              $(row).attr("model", "User");
            }
        });
    }
};

$(document).ready(function() {
    $('body').tooltip({
        selector: '[rel="tooltip"]'
    });
    
    $(document).on('click', '.del-action', function(ev){
        ev.preventDefault();
        var urlToRedirect = ev.currentTarget.getAttribute('href');
        ev.preventDefault();
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover!",
            type: "success",
            width: '280px',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, Confirm',
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(isConfirm) {
            if (isConfirm) {
                window.location = urlToRedirect;
            }
        });
    });

    $(document).on('click', '.status-action', function(ev){
        var $this = $(this);
        ev.preventDefault();
        var urlToRedirect = ev.currentTarget.getAttribute('href');
        ev.preventDefault();
        swal({
            title: "Are you sure you want to perform this action?",
            type: "success",
            width: '280px',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, Confirm',
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(isConfirm) {
            if (isConfirm) {
                $this.find('i').replaceWith('<i class="fa fa-spinner"></i>');
                window.location = urlToRedirect;
            }
        });
    });
})
