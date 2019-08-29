var env_flag = 0 ;  // *** // 0 = dev , 1 = stage , 2 = prod 
var custom_bank_id = 88;  // not used tid
var card_id = 81;  // to show simplyCLick Page - byDefault.
var resent_flag = 0;  // do not remove this - manange GM/GTA on resent OTP.
var downloadTimer;
var otpCount = 0;
var pageTitle = 'HDFC_Credit_Card_Campaign';

window.dataLayer = window.dataLayer || [];   // GM / GTA

var webengage = '' ;
var slider_custom_href_link = [] ;
var hold_authorization_token = '' ;
var carousel_apply_now_flag = 0 ;
var tmp = {} ;
var baseUrl = {} ;

var all_sbi_array_object = [];  // All SBI card object
var only_sbi_array_id = [];  // All SBI ids here
var hold_current_card_data_array_object = [];

var cms_domain = '';
var view_all_cms_link = '';
var learn_more_cms_link = '';
var api_url = '';
var redirect_url = '';
var sendotp_url = '';


// *** PLEASE CHECK ENV URL BEFORE DEPLOYMENT *** //

// 0 = dev , 1 = stage , 2 = prod

if(window.location.host === "www.onebajaj.capital"){ //prod

    console.log( 'PROD') ;
    
    env_flag = 2;
}
else if(window.location.host === "stage.onebajaj.capital" ){ //stage
    
    console.log( 'STAGE') ; 
    env_flag = 1;
	
}else{ //dev
    
    console.log( 'DEV') ;
    env_flag = 1;
}

if ( env_flag === 2 ) {
    //live
    baseUrl =
        {
            createlead: 'https://rqf5g3hbk5.execute-api.ap-south-1.amazonaws.com/prod/campaign/createlead',
            updatelead: '',
            createvisitors: 'https://rqf5g3hbk5.execute-api.ap-south-1.amazonaws.com/prod/campaign/createvisitors',
            sendotp: 'https://rqf5g3hbk5.execute-api.ap-south-1.amazonaws.com/prod/campaign/sendotp',
            verifyotp: 'https://rqf5g3hbk5.execute-api.ap-south-1.amazonaws.com/prod/campaign/verifyotp',
            sendSMS: 'https://rqf5g3hbk5.execute-api.ap-south-1.amazonaws.com/prod/campaign/sendSMS',
            getcity: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getcity',
            getemployee: 'https://rqf5g3hbk5.execute-api.ap-south-1.amazonaws.com/prod/campaign/getemployee',
            getcustomer: 'https://rqf5g3hbk5.execute-api.ap-south-1.amazonaws.com/prod/campaign/getcustomer'           
        }

} else if ( env_flag === 1 ) { 
    // stage
    baseUrl =  
        {
			
            createlead: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/createlead',
            sendotp: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/sendotp',
            verifyotp: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/verifyotp',
            sendSMS: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/sendSMS',
			updatelead: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/updatelead',
            createvisitors: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/createvisitors',
            getcity: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getcity',
            getemployee: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getemployee', 
            getcustomer: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getcustomer'           
        }    

} else {
    // prod
    baseUrl =
        {
            createlead: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/createlead',
            sendotp: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/sendotp',
            verifyotp: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/verifyotp',
            sendSMS: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/sendSMS',
			updatelead: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/updatelead',
            createvisitors: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/createvisitors',
            getcity: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getcity',
            getemployee: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getemployee', 
            getcustomer: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getcustomer' 

        }
}

if ( env_flag === 2 ) {

    card_id = 70;

    baseUrl.api_url = "https://api-cc.onebajaj.capital/api/bajaj_capital/visitor/campaignLeads/";
    
    cms_domain = "" ;  // not in used currently

    get_card_category_url = 'https://cms.onebajaj.capital/services/api/category-node-list?_format=json&limit=100';
    
    get_city_api_url = 'https://api-loan.onebajaj.capital/api/bajaj_capital/visitor/cityMaster';
    
    view_all_cms_link = "https://onebajaj.capital/credit-card/offerlisting?field_category_target_id=" ;
    
    learn_more_cms_link = "https://onebajaj.capital/credit-card/offerlisting?keywords=" ;     
    
    redirect_url = "https://www.onebajaj.capital/credit-card/eligibilityCheck/?token=" ;  

} else if( env_flag === 1 ) {
    
    card_id = 81;

    baseUrl.api_url = "https://pre-prod-api-cc.onebajaj.capital/api/bajaj_capital/visitor/campaignLeads" ;

    get_card_category_url = 'https://pre-prod-cms.onebajaj.capital/services/api/category-node-list?_format=json&limit=100';
    
    get_city_api_url = 'https://pre-prod-api-loan.onebajaj.capital/api/bajaj_capital/visitor/cityMaster';
    
    view_all_cms_link = "https://pre-prod.onebajaj.capital/credit-card/offerlisting?field_category_target_id=" ;
    
    learn_more_cms_link = "https://pre-prod.onebajaj.capital/credit-card/offerlisting?keywords=" ;
    
    redirect_url = "https://pre-prod.onebajaj.capital/credit-card/eligibilityCheck/?token=" ;  
    
            
} else {

    card_id = 81;

    baseUrl.api_url = "http://13.233.130.175:8088/api/bajaj_capital/visitor/campaignLeads";

    get_card_category_url = 'https://pre-prod-cms.onebajaj.capital/services/api/category-node-list?_format=json&limit=100';

    get_city_api_url = 'http://13.233.130.175:8089/api/bajaj_capital/visitor/cityMaster';
    
    view_all_cms_link = "http://13.233.130.175:3000/credit-card/offerlisting?field_category_target_id=" ;
    
    learn_more_cms_link = "http://13.233.130.175:3000/credit-card/offerlisting?keywords=" ; 
    
    redirect_url = "http://13.232.169.34:3000/credit-card/eligibilityCheck?token=" ;  
    
}


function resend_otp_credit_card(counts) {
    dataLayer.push({
        'event': 'resend_otp_credit_card',
        'pageType': pageType,             //i.e. Credit card landing page
        'counts': counts,               //i.e. how many times user had clicked on resend CTA
        'planName': planName              //i.e. The American Express Membership Rewards® Credit Card
    });
}

function otp_status_credit_card() {
    dataLayer.push({
        'event': 'otp_status_credit_card',
        'pageType': pageType,             //i.e. Credit card landing page
        'status': status,               //i.e. success or failure
        'planName': planName              //i.e. The American Express Membership Rewards® Credit Card
    });

}

function apply_now_click_credit_card() {
    dataLayer.push({
        'event': 'apply_now_click_credit_card',
        'pageType': pageType,            //i.e. Credit card landing page
        'pageSection': pageSection,         //i.e Header, Banner, compare or form
        'clickText': clickText            //i.e. banner text on which the apply now cta clicked
    });
}

function terms_and_condition_credit_card() {
    dataLayer.push({
        'event': 'terms_and_condition_credit_card',
        'eventCategory': 'terms_and_condition_credit_card',
        'pageType': pageType,            //i.e. Credit card landing page
        'planName': planName              //i.e. The American Express Membership Rewards® Credit Card
    });
}

function resendOtpLinkClick( lead_id ) {

    datalayer.push({
        'event' : 'resend_otp_link_click',
        'pageType' : 'Motor_Insurance_Campaign003',
        'clickText' : 'Resend OTP',
        'userID' : lead_id
        });
}

function FillCity() {
    let dropdown = $('#ddlCity');
    dropdown.empty();
    dropdown.append('<option selected="true" value="0" disabled>--Select City--</option>');
    dropdown.prop('selectedIndex', 0);

    // Populate dropdown with list of provinces
    $.getJSON( get_city_api_url, function (data) {
        //if (data.status == '200') {
        $.each(data.data, function (key, entry) {
            dropdown.append($('<option></option>').attr( 'value', entry.id ).text( entry.city_name ));
        })
        //}
    });
}

function FillQuestion() {
    let dropdown = $('#ddlQuestion');
    dropdown.empty();
    dropdown.append('<option selected="true" value="0" disabled>Any existing Credit Card/Loan</option>');
    dropdown.prop('selectedIndex', 0);
    let questionId = ['Y'];
    let questionname = ['Yes'];
    let questionId2 = ['N'];
    let questionname2 = ['No'];
    dropdown.append($('<option></option>').attr('value', questionId).text(questionname));
    dropdown.append($('<option></option>').attr('value', questionId2).text(questionname2));

}



function ValidateString(val) {
    var reg = /^[A-Za-z]+$/;
    if (val.match(reg)) {
        return true;
    }
    else {

        return false;
    }
}

function Validatenumber(val) {
    var reg = /^[A-Za-z]+$/;
    if (!isNaN(val)) {
        return true;
    }
    else {

        return false;
    }
}

function validateEmail(emailField) {

    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!(filter.test(emailField))) {
        return false;
    }
    return true;
}

function GetParameterValues(param) {

    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }

}


function initialize() {
    geocoder = new google.maps.Geocoder();
}

function validateFields() {
    let isValid = true;
    const regExp = /^([a-zA-Z]){3}([pP]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/;
    const txtpan = $("#userAPancard").val();
    const re = /[^0-9][,]/g;
    const mobStartRegx = /^[0-5].*$/;
    if (!$("#userName").val()){
        isValid = false;
    } else if (!$("#userName").val().replace(/[\s]/g, '')) {
        isValid = false;
    } else if ($("#userName").val() && !ValidateString($("#userName").val().replace(/[\s]/g, ''))) {
        isValid = false;        
    } else if (!$("#userMob").val()) {
        isValid = false;
    } else if (!$("#userEmail").val()) {
        isValid = false;
    } else if (!validateEmail($("#userEmail").val())) {
        isValid = false;
    } else if ((!$("#userAIncome").val())) {
        isValid = false;
    } else if ((!$("#userAPancard").val())) {
        isValid = false;
    } else if ((!$("#pincode").val())) {
        isValid = false;
    } else if (/[^0-9]/g.test($('#pincode').val())) {
        isValid = false;
    } else if (($("#pincode").val().length !== 6)) {
        isValid = false;
    } else if ((!$("#pincode").val())) {
        isValid = false;
    } else if (!txtpan.match(regExp)) {
        isValid = false;    
    } else if (re.test($('#userAIncome').val())) {
        isValid = false;
    } else if (!($("#userMob").val() && $("#userMob").val().length == 10 && $("#userMob").val().match(/^\d+$/) && !mobStartRegx.test($("#userMob").val()))) {
        isValid = false;    
    } else if (mobStartRegx.test($("#userMob").val())) {
        isValid = false;    
    } else if ($("#userMob").val().length !== 10) {
        isValid = false;    
    }
    const isOtpVerified = JSON.parse(sessionStorage.getItem('isOtpVerified'));
    if(isValid && isOtpVerified){
        $("#btnsubmit").removeAttr("disabled", "disabled").button('refresh');
    } else {
        $("#btnsubmit").attr("disabled", "disabled").button('refresh');
    }

}



//$( document ).ready( function () {
    
$(function() {    

    if($(window).width() <= 481) {
        // $('html, body').animate({
        //     scrollTop: $('#registration-form-scroll-offset').offset().top
        // }, 'slow');  
        window.scrollTo(0,0);      
    }    

    $('.logo-render-class').load('logo.html');
    
    $('.leadcard').load('form.html', '#ddlCity, #divOtp', function() {

        var isNameValid = false;
        var isMobValid = false;

        $("#userName, #pincode").keyup( function () {
            // isNameValid = nameValidation();
            // AllValidation(isNameValid && isMobValid)
            handleEmptyFeild();
            // if (isNameValid && isMobValid) {
            //     validateCustomer();
            // };
        });

        $("#userMob").keyup( function () {  
            isMobValid = mobValidation();
            //console.log(' isMobValid ::',  isMobValid ) ;
            // AllValidation(isNameValid && isMobValid);
            handleEmptyFeild();
            sessionStorage.setItem('isOtpVerified', false);
            if ( isMobValid ) {
                //console.log('validate customer now :: ' );
                // sendOTP();
                createLead($("#hdnvisitorid").val());
            } else {
                $('#userOTP').hide();    
            }
            $('#divOtp').hide();
        });

        $("#userOTP").keyup( function () {
            // AllValidation(isNameValid && isMobValid);
            handleEmptyFeild();
            const otp = $("#userOTP").val();
            if (otp && isMobValid && (otp.length === 6)) {

                verifyOTP();

                //$("#btnsubmitotp").removeAttr("disabled", "disabled").button('refresh');
                //$("#btnsubmitotp").addClass("btn btn-block btn-primary");
            } else {
                $("#btnsubmitotp").attr("disabled", "disabled")
            }
        });
        
    //});

        $( "#pincode" ).autocomplete({

        source: function( request, response ) {
            //console.log( 'request' ,request );
            $.ajax( {
            url: "https://pre-prod-api-loan.onebajaj.capital/api/bajaj_capital/visitor/pinCodeMaster?pinCode=" + request.term,
            dataType: "JSON",
            method: 'GET',
            success: function( data ) {
                    response( data.data.pinCodeMaster );
                $("#pincode-state").text(data.data.pinCodeMaster[0].city);
                $('#pincode').attr('data-pincode-id', data.data.pinCodeMaster[0].id);
                $("#pincode").val(data.data.pinCodeMaster[0].pinCode);
                }
            } );
        },
        minLength: 2,
        autofocus: true,
        classes: {
            "ui-autocomplete": "highlight"
            },
        create: function() {

                $('#pincode-state').html( '' );
                $(this).data('ui-autocomplete')._renderItem  = function (ul, item) {
                return $("<li>")
                    .attr("data-value", item.pinCode)
                    .append(item.pinCode)
                    .appendTo(ul);
                };
                
        },
        select: function( event, ui ) {
            
            this.value = ui.item.pinCode ;
            $('#pincode-state').html(ui.item.city );
            $('#pincode').attr('data-pincode-id', ui.item.id); 
            $("#pincode").val(ui.item.pinCode);
            $("#pincode-state").text(ui.item.city);
            enterKeyPressed(null, 8);
            return false;
        },
        focus: function( event, ui ) {  console.log( 'focus ');

            event.preventDefault(); // without this: keyboard movements reset the input to ''
			console.log( ui ) ;
            $('#pincode-state').html( ui.item.city );
            this.value = ui.item.pinCode ;
            return false;
        }

        
        
        });   

        
        let session_user_form_data = JSON.parse( sessionStorage.getItem('user_form_data') ); 

        session_user_form_data == '' ? handleEmptyFeild() : renderDataFromSession( session_user_form_data ) ;                   

    });

    $('.carousel-slider-content').load('carousel-slider.html');

	$('.footer-type4').load('footer.html', '.footer-type4', function() {

       

    }); 


    //Disable cut copy paste
    $('#userOTP').bind('cut copy paste', function (e) {
        e.preventDefault();
    });

    //Disable cut copy paste
    $('#userOTP').bind('cut copy paste', function (e) {
        e.preventDefault();
    });

    //Disable mouse right click
    $("#userOTP").on("contextmenu", function (e) {
        return false;
    });    

    $('.partners-carousel').owlCarousel({
        loop:false,
        nav:true,
        dots:false,
        margin:20,
        responsive:{
            0:{
                items:1
            },
            575:{
                items:2
            },
            768:{
                items:3
            },
            1024:{
                items:4
            },
            1025:{
                items:5
            }
        }
    })
        $('ul#top-menu > li > a').click(function(){
            $('.navbar-toggler').click();
        });  
    
    });

    function handleEmptyFeild() {
    
        $('.form-control').each(function() {

            if( $(this).val() == "" ) {
                $(this).addClass('empty');
            } else {
                $(this).removeClass('empty');
            }
        });
    }    

    function createLead( visitor_id_param, isSubmit ) {

        //console.log( 'createLead :: callled' ) ;
        var BlkAccountIdV = $('#userAIncome').val();
        var replacedCommas = 0;
        var replacedCommas = BlkAccountIdV.replace(/\,/g, '');
        replacedCommas = replacedCommas ? parseInt(replacedCommas) : '';
        var strData = JSON.stringify({
            "visitorid": visitor_id_param,
            "leadid": $("#hdnleadid").val() || 0,
            "name": $("#userName").val() + "",
            "emailid": $("#userEmail").val() + "",
            "mobileno": $("#userMob").val() + "",
            "dob": "",
            "city": parseInt($('#pincode').attr('data-pincode-id')),
            "pincode" : $("#pincode").val(),
            "hasexistingcc": $("input[name='ddlQuestion']:checked").val(),
            "income": replacedCommas.toString(),
            "pan": $("#userAPancard").val(),
            "location": $("#hdnlocation").val(),
            "isleadpushed": "Y"
        });        

        $.ajax({
            type: "POST",
            url: baseUrl.createlead,
            contentType: "application/json; charset=utf-8",
            processData: true,
            dataType: "json",
            data: strData,
            crossDomain: true,
            success: function (data) {

                console.log( 'Lead Created :: ', data );
                $("#hdnleadid").val(data["result"][0]["leadid"]);
                if(!isSubmit){
                    sendOTP();
                }
                
                //otp_status_credit_card();       // GM , GTA 

                var utm_medium = GetParameterValues('utm_medium');
                var utm_smam = 'sms';
                var device = jscd.mobile;
                if (utm_medium == utm_smam && device == true) {
                    window.location = 'thankyou.html';
                } else {
                    //$("#divreg").hide();
                    $("#divOtp").show();
                    $("#uName").text($("#userName").val());
                }

                // $("#lblMessage").text('Data successfully saved');;
                fbq('track', 'Search');
                return;
            },
            error: function ( jqXHR, exception ) {
    
                showHttpError( jqXHR, exception ) ;

                $("#lblMessage").text('Error');
                $("#lblMessage").css('color', 'red');
                return;
            }
        });        
        
    }


    function CreateVisitorID() {

        console.log('CreateVisitorID called');

        $.ajax({
            url: "https://jsonip.com",
            method: 'GET'
          }).done(function( data ) {

                // console.log(data);
            //     console.log(data.ip);

              //  $.getJSON('https://json.geoiplookup.io/?callback=?', function (resdata) {
              var sourceurl = window.location.href;
              var referralurl = document.referrer;
              var utm_source = GetParameterValues('utm_source');
              var utm_medium = GetParameterValues('utm_medium');
              var utm_campaign = GetParameterValues('utm_campaign');
              var utm_term = GetParameterValues('utm_term');
              var utm_content = GetParameterValues('utm_content');
              var parid = GetParameterValues('par');


              // $("#hdnlocation").val(resdata.latitude + "," + resdata.longitude + "," + resdata.city);
              var strData = JSON.stringify({
                  "browsername": jscd.browser,
                  "browserip": data.ip,
                  "browserversion": jscd.browser + ' ' + jscd.browserVersion,
                  "operatingsystem": jscd.os + " " + jscd.osVersion,
                  "device": jscd.os,
                  "sourceurl": sourceurl,
                  "referralurl": referralurl,
                  "productid": 'Credit Card',
                  "location": '',//resdata.latitude + "," + resdata.longitude + "," + resdata.city,
                  "visitortype": "CC",
                  "parid": parid,
                  "campaignid": campaignid,
                  "utmsource": utm_source == undefined ? "-" : utm_source,
                  "utmmedium": utm_medium == undefined ? "-" : utm_medium,
                  "utmcampaign": utm_campaign == undefined ? "-" : utm_campaign,
                  "utmterm": utm_term == undefined ? "-" : utm_term,
                  "utmcontent": utm_content == undefined ? "-" : utm_content
              });


              $.ajax({
                  type: "POST",
                  url: baseUrl.createvisitors,
                  contentType: "application/json; charset=utf-8",
                  processData: true,
                  dataType: "json",
                  data: strData,
                  crossDomain: true,
                  success: function (data) {

                      $("#hdnvisitorid").val(data["result"][0]["visitorid"]);
                      //console.log(GetParameterValues('par'));

                      console.log($("#hdnvisitorid").val() + " Data successfully saved");

                      // createLead( data["result"][0]["visitorid"] );

                  },
                  error: function (jqXHR, exception) {

                      showHttpError(jqXHR, exception);
                  }
              });

        })
    
        //  });
    }    

    
    function validateCustomer( card_id_param ) {
        if ( enterKeyPressed( null, 0 ) == true ) {
            continueClick(card_id_param);
            try {
    
                var client_data = '';
                var visitor_id = $("#hdnvisitorid").val();
    
                console.log( ' validateCustomer ::', visitor_id ) ;
    
                if ( visitor_id == '' ) {  console.log( 'createCampaignLeads :: if ' ) ;
    
                    CreateVisitorID();
    
                } else {
                    createLead($("#hdnvisitorid").val(), true);
                    console.log( 'createCampaignLeads :: else ' ) ;

                        $("#hdnlocation").val( $("#hdnlatitude").val() + "," + $("#hdnlongitude").val() + ",");
                    var BlkAccountIdV = $('#userAIncome').val();
                    var replacedCommas = 0;
                    var replacedCommas = BlkAccountIdV.replace(/\,/g, '');
                    replacedCommas = replacedCommas ? parseInt(replacedCommas) : '';

                        var client_data = JSON.stringify({
                                "name": $("#userName").val().toString(),
                                "email": $("#userEmail").val().toString(),
                                "mobileno": $("#userMob").val().toString(),
                            "offer_id": card_id_param ? card_id_param : card_id,
                            "city_bcl_id": parseInt( $('#pincode').attr('data-pincode-id') ),
                                "pincode": $("#pincode").val().toString(),   // pincode - ddlCity name no more used
                            "annual_income": replacedCommas.toString(),
                                "pan": $("#userAPancard").val().toString(),
                                "has_existing_credit_card": $("input[name='ddlQuestion']:checked").val()
                            });

                            sessionStorage.setItem('user_form_data', client_data);                            

                            console.log( 'createCampaignLeads ::' , client_data ) ;
        
                            createCampaignLeads( client_data, hold_authorization_token = '' );                        

                }
            }
            catch (err) {

                console.log( err ) ;
                $("#lblMessage").text('Error');
                $("#lblMessage").css('color', 'red');
            }
    
        }
        else {
            return false;
        }
    
    }
    
    function showHttpError( jqXHR , exception ){
    
            if (jqXHR.status === 0) {
    
                console.log( 'Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
    
                console.log( 'Requested page not found. [404]');
            } else if (jqXHR.status == 422) {
    
                console.log( 'Invalid Form Details, Please Check Each values' );
            } else if (jqXHR.status == 500) {
    
                console.log( 'Internal Server Error [500].');
            } else if (exception === 'parsererror') {
    
                console.log( 'Requested JSON parse failed.');
            } else if (exception === 'timeout') {
    
                console.log( 'Time out error.');
            } else if (exception === 'abort') {
    
                console.log( 'Ajax request aborted.');
            } else {
    
                console.log( 'Uncaught Error.\n' + jqXHR.responseText);
            }
           
    }    


    function sendOTP() {

        try {
            if(!otpCount){
                sendOtpDataLayer($("#hdnleadid").val().toString());
                otpCount++;
            } else {
                resendOtpLinkClick($("#hdnleadid").val().toString());
            }
                console.log('SendOTP :: Called');
                $("#userOTP").val('');
                $("#btnsubmitotp").attr('disabled', 'disabled');
                $("#otpResend").hide();

                var randomnumber = '';
                const items = '1234567890'
                for (var i = 0; i < 6; i++)
                    randomnumber += items[Math.floor(Math.random() * items.length)];
                var strData = '';

                strData = JSON.stringify({
                    "leadid": $("#hdnleadid").val().toString(),
                    "otp": randomnumber.toString()
                });

                //console.log( 'SendOTP :: Called', strData , baseUrl.sendotp ) ;

                $.ajax({
                    type: "POST",
                    url: baseUrl.sendotp,
                    contentType: "application/json; charset=utf-8",
                    processData: true,
                    dataType: "json",
                    data: strData,
                    crossDomain: true,
                    success: function (data) {

                        console.log('Otp sent ::');

                        if (resent_flag) {     // do not remove this - 0 or 1.

                            //resendOtpLinkClick();      // GM - GTA
                        }

                        resent_flag++;      // do not remove this - 0 or 1.

                        $("#userOTP").show();
                        $("#divOtp").show();
                        $("#otpResend").show();

                        startTimer();

                        $("#resendOTP").hide();
                        $("#btn_OTP").hide();

                        $("#otpResend").show();

                        $("#userOTP").val('');
                        $("#userOtpinvalid").hide();
                        $("#userOtpinvalidmsg").html("");

                        sendMessage(randomnumber);
                    },
                    error: function (jqXHR, exception) {

                        showHttpError(jqXHR, exception);

                        $("#lblMessage").text('Error');
                        $("#lblMessage").css('color', 'red');
                    }
                });
            
        }
        catch (err) {

            $("#lblMessage").text('Error');
            $("#lblMessage").css('color', 'red');
        }
    }


    function verifyOTP() {

        if (otpEnterKeyPressed() == true) {

            try {
                verifyOtpDataLayer($("#hdnleadid").val().toString());
                
                var strData = JSON.stringify({
                    "leadid": $("#hdnleadid").val().toString(),
                    "otp": $("#userOTP").val().toString()
                });
    
                $.ajax({
                    type: "POST",
                    url: baseUrl.verifyotp,
                    contentType: "application/json; charset=utf-8",
                    processData: true,
                    dataType: "json",
                    data: strData,
                    crossDomain: true,
                    success: function (data) {

                        console.log( JSON.stringify(data) + "send message.");
                        //  $("#hdnleadid").val(data["result"][0]["leadid"]);
                        var status = data["result"][0]["o_errcode"];
                        if (status === 200) {
                            sessionStorage.setItem('isOtpVerified', true);
                            // apply_now_click_credit_card();
                            $("#userOtpinvalid").hide();
                            $("#userOtpinvalidmsg").html("");
                            $("#resendOTP").hide();
                            $("#countdown").hide();
                            $("#userOTP").hide();
                            $("#userMob").prop("disabled", true);
                            $("#userMobinvalid").removeClass('errors').html("  &#10004;").css({ "font-family": "Zapf Dingbats", "color": "#00ba7e", "white-space": "pre-wrap", "display":"" });
                            carousel_apply_now_flag = 1 ;

                            // $("#userAIncome").removeAttr("disabled", "disabled");
                            // $("#userAPancard").removeAttr("disabled", "disabled");
                            // $("#pincode").removeAttr("disabled", "disabled");
                            // $("#ddlQuestion").removeAttr("disabled", "disabled");
                            

                            fbq('track', 'Lead');
                            // $("#btnsubmit").removeAttr("disabled", "disabled").button('refresh');

                            //thankyouMessage({name, mobileno});
                        }
                        else {
                            $("#userOtpinvalid").show();
                            $("#userOtpinvalidmsg").html("Invalid OTP");
                            $("#countdown").hide();
                            $("#resendOTP").show();
                        }
                        validateFields();
    
                    },
                    error: function ( jqXHR, exception ) {
                        validateFields();
                        showHttpError( jqXHR, exception ) ;

                        $("#btnsubmit").attr("disabled", "disabled").button('refresh');
                        $("#lblMessage").text('Error');
                        $("#lblMessage").css('color', 'red');
                    }
                });
            }
            catch (err) {
                validateFields();
                $("#lblMessage").text('Error');
                $("#lblMessage").css('color', 'red');
            }
        }
    }
    
    function otpEnterKeyPressed() {
    
        if ( !$("#userOTP").val().replace(/[\s]/g, '') ) {
    
            $("#userOtpinvalid").show();
            $("#userOtpinvalidmsg").html("OTP is required");
            return false;
    
        } else if ( ( $("#userOTP").val().trim().length < 6 ) ) {
    
            $("#userOtpinvalid").show();
            $("#userOtpinvalidmsg").html("Invalid OTP");
            return false;
    
        } else if ( ! (/^[0-9]{6}$/i.test( $("#userOTP").val().trim() ) ) ) {
    
            $("#userOtpinvalid").show();
            $("#userOtpinvalidmsg").html("Invalid OTP");
            return false;
    
        } else {
    
            if ($("#userOTP").val() && !Validatenumber($("#userOTP").val().replace(/[\s]/g, ''))) {
    
                $("#userOtpinvalid").show();
                $("#userOtpinvalidmsg").html("Invalid OTP");
                return false;
            } else {
                $("#userOtpinvalid").hide();
                $("#userOtpinvalidmsg").html("");
                return true;
            }
        }
        
    }    
    
    

    function AllValidation(isAllValid) {

        if (isAllValid) {
            //$("#btnsubmitotp").removeClass("btn-gray");
            //$("#btnsubmitotp").removeAttr("disabled", "disabled").button('refresh');
            //$("#btnsubmitotp").addClass("btn btn-block btn-primary");

            $("#btn_OTP").removeAttr("disabled", "disabled").button('refresh');

        } else {
            //$("#btnsubmitotp").addClass("btn-gray");
            //$("#btnsubmitotp").attr("disabled", "disabled");

            $("#btn_OTP").attr("disabled", "disabled");
        }
    }

    function nameValidation() {
        var IsValid = true;
        const name = $("#userName").val().replace(/[\s]/g, '');
        console.log( 'name :: ', name );
        if (!ValidateString(name)) {
            $("#nameinvalid").show();
            $("#namevalid").hide();
            $("#nameinvalidmsg").html("Name is required.");
            IsValid = false;
        }
        else {
            $("#nameinvalid").hide();
            $("#namevalid").show();
            $("#nameinvalidmsg").html("");
        }
        return IsValid;
    }

    function mobValidation() {

        var IsValid = true;
        var mobStartRegx = /^[0-5].*$/;

        if (!$("#userMob").val()) {
            $("#userMobinvalid").show();
            $("#userMobvalid").hide();
            $("#userMobinvalidmsg").html("Mobile is required.");
            IsValid == true ? $("#userMob").focus() : "";
            IsValid = false;
        } else
            if ($("#userMob").val() && $("#userMob").val().length == 10 && $("#userMob").val().match(/^\d+$/) && !mobStartRegx.test($("#userMob").val())) {
                //  this.mobileMesaage = "validate";
                $("#userMobinvalid").hide();
                $("#userMobvalid").show();
                $("#userMobinvalidmsg").html("");
                //$("#btnsubmit").focus();
            } else if (mobStartRegx.test($("#userMob").val())) {
                //this.mobileMesaage = "invalid";
                $("#userMobinvalid").show();
                $("#userMobvalid").hide();
                $("#userMobinvalidmsg").html("Mobile number is not valid.");
                IsValid == true ? $("#userMob").focus() : "";
                IsValid = false;
            } else if ($("#userMob").val().length != 10) {
                // this.mobileMesaage = "pattern";
                $("#userMobinvalid").show();
                $("#userMobvalid").hide();
                $("#userMobinvalidmsg").html("Enter a valid 10 digit mobile number.");

                IsValid == true ? $("#userMob").focus() : "";
                IsValid = false;
            }
        return IsValid;

    }

function startTimer() {
    let timeleft = 120;
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = timeleft + " seconds";
    $("#countdown").show();
    timeleft -= 1;
    downloadTimer = setInterval(function () {
        document.getElementById("countdown").innerHTML = timeleft + " seconds";
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            $("#countdown").hide();
            $("#resendOTP").show();
        }
        timeleft -= 1;
    }, 1000);
}


function createCampaignLeads( param_data_string, param_token_string = '' ) {   console.log( 'createCampaignLeads :: called', param_data_string ) ;	    

    var tmp_prepare_header = {

                "Content-Type":"application/json"
        } ;

    param_token_string.length > 1 ? tmp_prepare_header.authorization = param_token_string : '' ;

    $.ajax({
        type: "POST",
        url: baseUrl.api_url,      
        headers: tmp_prepare_header,
        processData: true,
        data: param_data_string,
        crossDomain: true,
        success: function ( data, textStatus, xhr ) { 
            
            if ( data.status === 200 && param_token_string.length > 1 ) {
                
                window.location = redirect_url + data.data.token + "&utm_source=xxxxx";
                
            } else {

                hold_authorization_token = xhr.getResponseHeader( 'authorization' );

                console.log( 'createCampaignLeads :: authorization token recieved' ) ;

                createCampaignLeads( param_data_string, hold_authorization_token );
            }
            
        },
        error: function ( jqXHR, exception ) {
    
            showHttpError( jqXHR, exception ) ;
        }

    });

}

function backToHome() {
    $("#divreg").show();
    $("#divOtp").hide();
    $("#userOtpinvalid").hide();
    $("#userOtpinvalidmsg").html("");
}


var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();


//DISABLE COPY PASTE

$('#userOTP').on('paste', function (event) {
    if (event.originalEvent.clipboardData.getData('Text').match(/[^\d]/)) {
        event.preventDefault();
    }
});


function enterKeyPressed(value, val) {

    var IsValid = true;
    //console.log(this.email);
    if (val == 1 || val == 0) {
        if (!$("#userName").val().replace(/[\s]/g, '')) {
            $("#nameinvalid").show();
            $("#namevalid").hide();
            $("#nameinvalidmsg").html("Name is required.");
            IsValid == true ? $("#userName").focus() : "";
            IsValid = false;

            //$('btnregsubmit').addClass("btn btn-block btn-gray btn-primary");
        } else
            if ($("#userName").val() && !ValidateString($("#userName").val().replace(/[\s]/g, ''))) {
                $("#nameinvalid").show();
                $("#namevalid").hide();
                $("#nameinvalidmsg").html("Name is incorrect format.");
                IsValid == true ? $("#userName").focus() : "";
                IsValid = false;

                //  this.namevalidateMessage = "invalidate";
                //this.showCorrectNameMsg = false;
                // $('btnregsubmit').addClass("btn btn-block btn-gray btn-primary");
            }
            else {
                $("#nameinvalid").hide();
                $("#namevalid").show();
                $("#nameinvalidmsg").html("");
                $("#userEmail").focus();

            }
    }


    if (val == 2 || val == 0) {
        if (!$("#userEmail").val()) {
            $("#userEmailinvalid").show();
            $("#userEmailvalid").hide();
            $("#userEmailinvalidmsg").html("Email is required.");
            IsValid == true ? $("#userEmail").focus() : "";
            IsValid = false;
        } else
            if ($("#userEmail").val() && validateEmail($("#userEmail").val())) {
                $("#userEmailinvalid").hide();
                $("#userEmailvalid").show();
                $("#userEmailinvalidmsg").html("");
                //$("#userMob").focus();

            } else if (!validateEmail($("#userEmail").val())) {
                $("#userEmailinvalid").show();
                $("#userEmailvalid").hide();
                $("#userEmailinvalidmsg").html("Please enter the email address in the format of abc@xyz.com.");
                IsValid == true ? $("#userEmail").focus() : "";
                IsValid = false;

            }
            handleEmptyFeild();
    }

    if (val == 3 || val == 0) {

        var mobStartRegx = /^[0-5].*$/;
        
        if (!$("#userMob").val()) {
            $("#userMobinvalid").show();
            $("#userMobvalid").hide();
            $("#userMobinvalidmsg").html("number is required.");
            IsValid == true ? $("#userMob").focus() : "";
            IsValid = false;
        } else
            if ($("#userMob").val() && $("#userMob").val().length == 10 && $("#userMob").val().match(/^\d+$/) && !mobStartRegx.test($("#userMob").val())) {
                //  this.mobileMesaage = "validate";
                $("#userMobinvalid").hide();
                $("#userMobvalid").show();
                $("#userMobinvalidmsg").html("");
                // $("#userAIncome").focus();
            } else if (mobStartRegx.test($("#userMob").val())) {
                //this.mobileMesaage = "invalid";
                $("#userMobinvalid").show();
                $("#userMobvalid").hide();
                $("#userMobinvalidmsg").html("number is not valid.");
                IsValid == true ? $("#userMob").focus() : "";
                IsValid = false;
            } else if ($("#userMob").val().length != 10) {
                // this.mobileMesaage = "pattern";
                $("#userMobinvalid").show();
                $("#userMobvalid").hide();
                $("#userMobinvalidmsg").html("enter a valid 10 digit mobile number.");

                IsValid == true ? $("#userMob").focus() : "";
                IsValid = false;
            }

    }

    //Added by f
    // var BlkAccountIdV = $('#userAIncome').val();
    // var re = /[^0-9]/g;

    if (val == 4 || val == 0) {
        //var IncomStartRegx = /^[0-5].*$/; 
        var BlkAccountIdV = $('#userAIncome').val();
        var re = /[^0-9][,]/g;
        var replacedCommas = 0;
        var replacedCommas = BlkAccountIdV.replace(/\,/g, '');
        replacedCommas = replacedCommas ? parseInt(replacedCommas) : '';
        let commaSepCurrency = replacedCommas.toLocaleString('en-IN');

        if (!$("#userAIncome").val()) {
            //alert("ss");
            $("#userAIncomeinvalid").show();
            $("#userAIncomevalid").hide();
            $("#userAIncomeinvalidmsg").html("Annual income is required.");
            IsValid == true ? $("#userAIncome").focus() : "";
            IsValid = false;
        }

        else if (re.test(BlkAccountIdV)) {
            $("#userAIncomeinvalid").show();
            $("#userAIncomevalid").hide();
            $("#userAIncomeinvalidmsg").html("Enter annual income in a valid format.");
            IsValid == true ? $("#userAIncome").focus() : "";
            IsValid = false;
        }

        else if (replacedCommas < 200000) {
            $('#userAIncome').val(commaSepCurrency);
            //alert('cc');
            $("#userAIncomeinvalid").show();
            $("#userAIncomevalid").hide();
            $("#userAIncomeinvalidmsg").html("Minimum income must be  ₹ 200000 PA");
            IsValid == true ? $("#userAIncome").focus() : "";
            IsValid = false;
        } else {
            $('#userAIncome').val(commaSepCurrency);
            $("#userAIncomeinvalid").hide();
            $("#userAIncomevalid").show();
            $("#userAIncomeinvalidmsg").html("");
            //$("#userAIncome").focus(); 
        }
        handleEmptyFeild();
    }

    if (val == 5 || val == 0) {
        if ($('#ddlCity').val() <= 0) {
            $("#userCityinvalid").show();
            $("#userCityvalid").hide();
            $("#userCityinvalidmsg").html("Pin Code is required.");
            IsValid == true ? $("#ddlCity").focus() : "";
            IsValid = false;
        }
        else {
            $("#userCityvalid").show();
            $("#userCityinvalid").hide();
            $("#userCityinvalidmsg").html("");
        }
    }   

    if (val == 6 || val == 0) {
        //var IncomStartRegx = /^[0-5].*$/;
        if (!$("#userAPancard").val()) {
            $("#userAPancardinvalid").show();
            $("#userAPancardvalid").hide();
            $("#userAPancardinvalidmsg").html("Pan card no. is required.");
            IsValid == true ? $("#userAPancard").focus() : "";
            IsValid = false;
        }
        else {      // this.mobileMesaage = "pattern";
            var regExp = /^([a-zA-Z]){3}([pP]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/;
            var txtpan = $("#userAPancard").val();
            if (txtpan.match(regExp)) {
                $("#userAPancardinvalid").hide();
                $("#userAPancardvalid").show();
                $("#userAPancardinvalidmsg").html("");
                $("#ddlCity").focus();
            }
            else {
                $("#userAPancardinvalid").show();
                $("#userAPancardvalid").hide();
                $("#userAPancardinvalidmsg").html("Enter a valid 10 digit pancard number.");
                IsValid == true ? $("#userAPancard").focus() : "";
                IsValid = false;
                event.preventDefault();
            }
        }
        handleEmptyFeild();
    }


    if (val == 7 || val == 0) {
        if ($('#ddlQuestion').val() <= 0) {
            $("#userQuestioninvalid").show();
            $("#userQuestionvalid").hide();
            $("#userQuestioninvalidmsg").html("Do you have any existing Credit Card/Loan.");
            IsValid == true ? $("#ddlQuestion").focus() : "";
            IsValid = false;
        }
        else {
            $("#userQuestionvalid").show();
            $("#userQuestioninvalid").hide();
            $("#userQuestioninvalidmsg").html("");
        }
    }


    if (val == 8 || val == 0) {

        var var_length = $('#pincode').val().trim().length ;
        console.log( var_length , 'ddd') ;
        //var pincode_val = $('#pincode').val() ;

        if ( $('#pincode').val() <= 0 ) {
            $("#userPininvalid").show();  
            $("#pincodevalid").hide();
            $("#userPininvalid").html("Pin code is required.");

            $('#pincode-state').html( '' );

            IsValid == true ? $("#pincode").focus() : "";
            IsValid = false;
        } else if ( var_length < 6 ) {
            $("#userPininvalid").show();
            $("#pincodevalid").hide();
            $("#userPininvalid").html("Invalid pincode length.");

            $('#pincode-state').html( '' );

            IsValid == true ? $("#pincode").focus() : "";
            IsValid = false;
        } else if ( /[^0-9]/g.test( $('#pincode').val() ) ) {
            $("#userPininvalid").show();
            $("#pincodevalid").hide();
            $("#userPininvalid").html("Invalid pincode format.");

            $('#pincode-state').html( '' );

            IsValid == true ? $("#pincode").focus() : "";
            IsValid = false;
        } else {
            $("#pincodevalid").show();
            $("#userPininvalid").hide();
            $("#userPininvalid").html("");
        }
        
        //$('#pincode-state').html( '' );
    }     

    //for PAN Card Validation

    /*End*/

    if ($("#userMob").val() != '' && $("#userEmail").val() != '' && $("#userName").val() != '' && $("#userAIncome").val() != '' && $("#userAPancard").val() != '' && $("#ddlCity").val() && $("#ddlQuestion").val() > 0) {
        $("#btnsubmit").removeClass("btn-gray");
        $("#btnsubmit").removeAttr("disabled", "disabled").button('refresh');
        $("#btnsubmit").addClass("btn btn-block btn-primary");
    }
    else {
        $("#btnsubmit").addClass("btn-gray");
    }
    validateFields();
    return IsValid;

}

function validate() {
    
     if ( ( $('#pincode').val() <= 0 )  || ( $('#pincode').val() <= 500000 ) ) {
         $("#pincodeinvalid").show();
         $('#pincodeinvalidmsg').html( 'Invalid pincode' ) ;
     }
    
    // if ( $('#pincode').val() <= 0 ) {
    //     $("#pincodeinvalid").show();
    //     $("#userCityvalid").hide();
    //     $("#userCityinvalidmsg").html("Pin Code is required.");

    // } else {
    //     $("#userCityvalid").show();
    //     $("#pincodeinvalid").hide();
    //     $("#userCityinvalidmsg").html("");
    // }    
}

function LeadQuoteCreationInitiatedClick() {
    fbq('track', 'CompleteRegistration');
}

function sendMessage(randomnumber) {
    try {
        var msg = randomnumber + " is your OTP for verification on Bajaj Capital Credit Card Platform. It can be used only once and is valid for 10 minutes. Thank you!";
        var strData = JSON.stringify({
            "mobileno": $("#userMob").val().toString(),
            "smstype": 'camcc',
            "message": msg.toString(),
            "latlong": "",
            "macaddress": "",
            "browser": "",
            "os": "",
            "source": "",
            "createdby": "",
            "createdip": ""
        });

        $.ajax({
            type: "POST",
            url: baseUrl.sendSMS,
            contentType: "application/json; charset=utf-8",
            processData: true,
            dataType: "json",
            data: strData,
            crossDomain: true,
            success: function (data) {
                $("#userOTP").focus();
            },
            error: function ( jqXHR, exception ) {
    
                showHttpError( jqXHR, exception ) ;

                $("#lblMessage").text('Error');
                $("#lblMessage").css('color', 'red');
            }
        });
    }
    catch (err) {
        $("#lblMessage").text('Error');
        $("#lblMessage").css('color', 'red');
    }
}

function renderDataFromSession( session_data_param ) {  //console.log( ' renderDataFromSession :: called') ;

    
    for( var key in session_data_param )  {

        if ( session_data_param.hasOwnProperty( key ) ) {

            // console.log( ' renderDataFromSession :: ' ,key ,session_data_param[ key ] ) ;

             switch( key ) {

                case 'name' : console.log('1');

                    $("#userName").val( session_data_param[ key ] ) ;
                
                break;

                case 'email' : console.log('2');

                    $("#userEmail").val( session_data_param[ key ] ) ;

                break;

                case 'mobileno' :

                    $("#userMob").val( session_data_param[ key ] ) ;

                break;

                case 'pincode' :

                    $('#pincode').val( session_data_param[ key ] ) ;
            
                break;

                case 'annual_income' :

                    $("#userAIncome").val( session_data_param[ key ] ) ;

                break;

                case 'pan' :

                    $("#userAPancard").val( session_data_param[ key ] ) ;

                break;
                
                case 'has_existing_credit_card' :

                    $("input[name='ddlQuestion'][value='"+ session_data_param[ key ] +"']").prop('checked', true);

                break ;


             }
        }
    }

    handleEmptyFeild() ;
}


$(document).ready(function() {

        CreateVisitorID();

        $( "#home" ).hide(); //

        console.log( " cardid :: " , card_id , bankid , campaignid  );  
		
        $.ajax({
            url: get_card_category_url,
            method: 'GET'
          }).done(function( data ) {

            tmp = data.data;

                filterCards( bankid, card_id );

                manageCarouselSlidderItemDiv();


                // all_sbi_array_object.forEach(function(elele){
                //     console.log( 'elele', elele );
                // })

                //console.log( 'ids :: ', only_sbi_array_id ) ;

                getCurrentPageData ( card_id, all_sbi_array_object );              
            
          });

        setCurrentPageLogoLink( card_id ) ;      

 });

 function filterCards( bankid, card_id ) {

    var only_sbi_array_id = [];  // All SBI ids here
    var tmp_hold_current_item_data = [];

    all_sbi_array_object.length ? all_sbi_array_object.length = 0 : '' ;

    for( var key in tmp )  {

        tmp[key].forEach( ele => {

            ele.show_flag = 1; // do not remove this

            if ( ele.tid == bankid && ( only_sbi_array_id.indexOf( parseInt(ele.nid) ) === -1  ) ) {  

                        if( card_id === parseInt( ele.nid ) ) {
                            ele.show_flag = 0; // do not remove this 
                            tmp_hold_current_item_data.push( all_sbi_array_object.push( ele ) ) ;
                            only_sbi_array_id.push( parseInt(ele.nid) ) ;
                        } else {
                            all_sbi_array_object.push( ele ) ;
                            only_sbi_array_id.push( parseInt(ele.nid) ) ;                            
                        }
                }
        });
            
    }

    //console.log( 'XXX ::', tmp_hold_current_item_data ) ;

    var to_replace_b = all_sbi_array_object[ tmp_hold_current_item_data[ 0 ] - 1 ] ; 

    var to_replace_a = all_sbi_array_object[ all_sbi_array_object.length - 1 ] ;

    all_sbi_array_object[ tmp_hold_current_item_data[ 0 ] - 1 ] = to_replace_a ;
  
    all_sbi_array_object[ all_sbi_array_object.length - 1 ] = to_replace_b;

    // console.log( 'yyy ::', all_sbi_array_object ) ;
    
    
 }

 function manageCarouselSlidderItemDiv() {

    var all_sbi_array_object_length = all_sbi_array_object.length;

    var check_if_quotient_one_or_two = ( all_sbi_array_object_length % 3 ) ;

    if( check_if_quotient_one_or_two > 0 ) {

        switch ( check_if_quotient_one_or_two ) {

            case 1 :

                var tmp2 = Object.assign( {}, all_sbi_array_object[ all_sbi_array_object_length - 1 ] ) ;
                tmp2.show_flag = 0;

                var tmp3 = Object.assign( {}, all_sbi_array_object[ all_sbi_array_object_length - 2 ] ) ;
                tmp3.show_flag = 0;

                all_sbi_array_object.push( tmp2 ) ;
                all_sbi_array_object.push( tmp3 ) ; 
                break;

            case 2 :    

                var tmp2 = Object.assign( {}, all_sbi_array_object[ all_sbi_array_object_length - 1 ] ) ;
                tmp2.show_flag = 0;
                
                all_sbi_array_object.push( tmp2 ) ;                        
                break;
            
        }   

    }
    
 }


function setCurrentPageLogoLink( page_id ) { 

        $( '.info_link' ).attr( 'href', getPageLink( page_id ) );
}


function getCurrentPageData( card_id_param, to_run_flag ) {

    var tmp_hold_index = '';
    var tmp_flag = 0;   // prevent repeat 0 : 1

    to_run_flag ? filterCards( bankid, card_id_param ) : '' ;    // must not run twice

    manageCarouselSlidderItemDiv();
    
    resetBinding();

    all_sbi_array_object.forEach( function( item, index ) {

            //console.log( 'here :: ', card_id_param, item.nid , item.title, item.show_flag, item );

                if ( item.nid == card_id_param && ( ! tmp_flag ) ) { 
                    getAction( item );   // string === number
                    tmp_hold_index = index;
                    tmp_flag = 1;
                }

          }) ;          
          
    renderSlider( all_sbi_array_object, tmp_hold_index ) ; 

    renderSliderMobile( all_sbi_array_object, tmp_hold_index ) ; 

    //console.log( 'carousel_apply_now_flag :: ', carousel_apply_now_flag ) ;

    carousel_apply_now_flag ? validateCustomer( card_id_param ) : '' ;
}
	
function renderSlider( slider_array, tmp_hold_index ) {

            var tmp_string = '';
            var tmp_class = '';
            var custom_index = '';

            // slider_array.splice( tmp_hold_index, 1 ) ;  // to remove same card in slider

            // console.log( 'XX :: ' , slider_array.length ) ;

            for ( var i=0; i<(slider_array.length/3)-1; i++ ) {        
                
                custom_index = ( i * 3 ) ;  
        
                if( i===0 ) {

                  tmp_class = 'active';
        
                } else { 
                    
                  tmp_class = '' ;
                };              
                            
                tmp_string += '<div class="carousel-item  '+ tmp_class +'">';
                tmp_string += '<div class="row">';	
                    
                    tmp_string += '<div class="col">';
                    tmp_string +=  '<div class="card '+ applyHideClass( slider_array[ custom_index - 0 ].show_flag ) +'"><img src="'+ slider_array[ custom_index - 0 ].picture +'" class="card-img-top" alt="bajajcapital credit card" >';
                    tmp_string +=    '<div class="card-body">';
                    tmp_string +=      '<h5 class="card-title">'+ slider_array[ custom_index - 0 ].title +'</h5>';
                    tmp_string +=      '<div class="annual-fee">Annual Fee <span> '+ slider_array[ custom_index - 0 ].annual_fee +' </span></div>';
                        tmp_string += '<div class="rewards">';
                            tmp_string += '<h5>Rewards</h5>';
                        tmp_string += '</div>';
                        tmp_string += '<ul id="rewards'+ ( custom_index - 0 ) +'">';
                        tmp_string += prepareList( slider_array[ custom_index - 0 ].rewards, slider_array[ custom_index - 0 ].title );
                        tmp_string += '</ul>';
                        tmp_string += '<a href="#" onclick="applyNowAction('+ slider_array[ custom_index - 0 ].nid +')" class="btn btn-primary block">Apply Now</a> </div>';
                    tmp_string += '</div>';
                    tmp_string += '</div>';
                    
                    tmp_string += '<div class="col">';
                    tmp_string +=  '<div class="card '+ applyHideClass( slider_array[ custom_index + 1 ].show_flag ) +'"><img src="'+ slider_array[ custom_index + 1 ].picture +'" class="card-img-top" alt="bajajcapital credit card" >';
                    tmp_string +=    '<div class="card-body">';
                    tmp_string +=      '<h5 class="card-title">'+ slider_array[ custom_index + 1 ].title +'</h5>';
                    tmp_string +=      '<div class="annual-fee">Annual Fee <span> '+ slider_array[ custom_index + 1 ].annual_fee +'</span></div>';
                        tmp_string += '<div class="rewards">';
                            tmp_string += '<h5>Rewards</h5>';
                        tmp_string += '</div>';
                        tmp_string += '<ul id="rewards'+ ( custom_index + 1 ) +'">';
                        tmp_string += prepareList( slider_array[ custom_index + 1 ].rewards, slider_array[ custom_index + 1 ].title );
                        tmp_string += '</ul>';
                        tmp_string += '<a href="#" onclick="applyNowAction('+ slider_array[ custom_index + 1 ].nid +')" class="btn btn-primary block">Apply Now</a> </div>';
                    tmp_string += '</div>';
                    tmp_string += '</div>';

                    //$('#rewards').append( '<a href="" class="btn-inline info_linkTC" onclick="">Apply Now</a>' );                    

                    tmp_string += '<div class="col">';
                    tmp_string +=  '<div class="card '+ applyHideClass( slider_array[ custom_index + 2 ].show_flag ) +'"><img src="'+ slider_array[ custom_index + 2 ].picture +'" class="card-img-top" alt="bajajcapital credit card" >';
                    tmp_string +=    '<div class="card-body">';
                    tmp_string +=      '<h5 class="card-title">'+ slider_array[ custom_index + 2 ].title +'</h5>';
                    tmp_string +=      '<div class="annual-fee">Annual Fee <span> '+ slider_array[ custom_index + 2 ].annual_fee +'</span></div>';
                        tmp_string += '<div class="rewards">';
                            tmp_string += '<h5>Rewards</h5>';
                        tmp_string += '</div>';
                        tmp_string += '<ul id="rewards'+( custom_index + 2 )+'" >';
                            tmp_string += prepareList( slider_array[ custom_index + 2 ].rewards, slider_array[ custom_index + 2 ].title );
                        tmp_string += '</ul>';   
                        tmp_string += '<a href="#" onclick="applyNowAction('+ slider_array[ custom_index + 2 ].nid +')" class="btn btn-primary block">Apply Now</a> </div>';
                    tmp_string += '</div>';
                    tmp_string += '</div>';	
            		
				
				
                tmp_string += '</div></div>';
          }
		  
          $('#carousel-inner-card-dynamic').html(tmp_string);	
	
}


function renderSliderMobile( slider_array, tmp_hold_index ) {

    var tmp_string = '';
    var tmp_class = '';
    // var custom_index = '';
    
    for ( var i = 0 ; i < slider_array.length ; i++ ) {        
        
        //custom_index = ( i * 3 ) ;  

        if( i===0 ) {

          tmp_class = 'active';

        } else { 
            
          tmp_class = '' ;
        };              
                    
        tmp_string += '<div class="carousel-item  '+ tmp_class +'">';
            tmp_string += '<div class="col">';
            tmp_string +=  '<div class="card cc-min-h '+ applyHideClass( slider_array[ i ].show_flag ) +'"><img src="'+ slider_array[ i ].picture +'" class="card-img-top" alt="bajajcapital credit card" >';
            tmp_string +=    '<div class="card-body">';
            tmp_string +=      '<h5 class="card-title">'+ slider_array[ i ].title +'</h5>';
            tmp_string +=      '<div class="annual-fee">Annual Fee <span> '+ slider_array[ i ].annual_fee +' </span></div>';
                tmp_string += '<div class="rewards">';
                    tmp_string += '<h5>Rewards</h5>';
                tmp_string += '</div>';
                tmp_string += '<ul id="rewards'+ ( i ) +'">';
                tmp_string += prepareList( slider_array[ i ].rewards, slider_array[ i ].title );
                tmp_string += '</ul>';
                tmp_string += '<a href="'+ getPageLink( slider_array[ i ].nid ) +'" class="btn btn-primary block">Apply Now</a> </div>';
            tmp_string += '</div>';
            tmp_string += '</div>';
        tmp_string += '</div>';
  }
  
  $('#carousel-inner-card-dynamic-mobile').html(tmp_string);	

}




function prepareList( array_param, param_title ) {

    var tmp_str = ''; var tmp_counter = 0 ;
    var check_char_count = 0; var str_offset = '';
    var max_offset_limit = 200;
    
    array_param.forEach( function(ele) {

        check_char_count = ( check_char_count + ele.length ) ;
       // console.log( 'check_char_count 2 ', check_char_count ) ;

        if ( check_char_count < max_offset_limit ) {

            str_offset = ele.length ;
         //   console.log( 'less :: ' , ele.substring( 0, str_offset ) );
            
        } else if ( check_char_count > max_offset_limit && check_char_count < 350 ) {

            str_offset = ( max_offset_limit - check_char_count ) ;

        } else if ( check_char_count > 350 && check_char_count < 1200 ) {  
          
            //  to show string in order

        } else {

            //  to show string in order

        }

        //if ( check_char_count < 300 && tmp_counter < 2 ) {  // to limit <li> 
        if ( check_char_count < max_offset_limit ) {   // to limit only character 

            tmp_str += '<li>' + ele.substring( 0, str_offset ) + '</li>';  tmp_counter ++ ;  

        }

    });

    tmp_str += '<a href="'+ learn_more_cms_link + encodeURIComponent(param_title) + '" class="btn-inline info_linkTC" onclick="">Learn More</a>' ;                  
    
    return tmp_str;

}


function applyHideClass( read_flag ) {

    return read_flag ? '' : 'hide-class-custom';
}

function getPageLink( page_id ) {

    return slider_custom_href_link[ page_id ] ;
    
}

function resetBinding() {

    $('#feature-title').html( '' ) ;
    $('#annual-fee').html( '' ) ;
    $('#rewards').html( '' );                    
    $('#compare .container a').remove( '.viewAll' );    

}


function getAction( data = [] ) {

	for( var key in data )  {

		if ( data.hasOwnProperty( key ) ) {
			
			switch( key ) {

				case 'title' :
				
					$('#feature-title').html( data[key] ) ;
					
				break;

				case 'annual_fee' :
				
					$('#annual-fee').append( data[key] ) ;
					
				break;

				case 'second-year-fee' :
					
				break;                    

				case 'rewards' :

                    var tmp_loop = 0 ;

					for ( var ky in data[key]) {

                        if( tmp_loop < 5) {

                            $('#rewards').append( '<li>' + data[key][ky].replace('Rs.', "&#8377;")+'</li>' );
                            
                            tmp_loop ++ ;
                            
                        }

                    };
                    
                    $('#rewards').append( '<a href="'+ learn_more_cms_link + data[ 'title' ] +'" class="btn-inline info_linkTC" onclick="">Learn More</a>' );                    

                				 	
				break;

				case 'picture' :
										
					$('#card-image').attr( 'src', data[key] ) ;
				
                break;
                
                case 'tid' :

                    $('#compare .container').append( '<a name="viewAll" onclick="viewAllDataLayer()" href="'+ view_all_cms_link + encodeURIComponent( data[key] ) + '" class="viewAll link">View All <svg xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 23 14"><g fill="none" fill-rule="evenodd"><path fill="#6F768C" d="M15.147 13.016c-.216-.203-.229-.544-.003-.782l5.671-5.672L15.144.89a.527.527 0 0 1-.158-.378V.51a.53.53 0 0 1 .156-.378.533.533 0 0 1 .76-.002l6.052 6.051a.535.535 0 0 1 .001.76l-6.048 6.05a.539.539 0 0 1-.76.025"></path><path stroke="#6F768C" stroke-linecap="round" d="M20.5 6.567H1.12"></path></g></svg></a>' );

                break;
				
			} 
            
            $('.container').css('visibility', 'visible');
            $( "#home" ).show();
            
		}
    }
    
    
}


function applyNowAction( card_id_param ) {
    dataLayer.push({
        'event': 'apply_now_button_click',
        'pageType': pageTitle,
        'clickText': "Apply Now",     // Apply Now
        'userID': $("#hdnleadid").val()
    });
    // console.log( 'card_id ', card_id_param ) ;
    card_id = card_id_param;

    getCurrentPageData( card_id_param, to_run_flag = 1 ) ;

}

function continueClick() {  //console.log( card_campaign_name );
    dataLayer.push({
        'event': 'Check_Eligibility_Click',
        'eventCategory': 'apply_now', // dynamic contains amex campaign name i.e. Amex_everyday-spend-gold-credit-card, Amex_platinum-travel-credit-card, Amex_membership-rewards-credit-card
        'eventAction': 'Check_Eligibility_Click',
        'eventLabel': pageTitle
    });
}
function navigationTabClick( tab_name ) { 
    // console.log( tab_name );
    dataLayer.push({
        'event' : 'Navigation_Tab_Click',
        'eventAction': 'Navigation_Tab_Click',
        'eventCategory': tab_name,
        });   
}
function footerClick(tab_name) {
    // console.log( tab_name );
    window.dataLayer.push({
        'event': 'Footer_Click',
        'eventAction': 'Footer_Click',
        'eventCategory': tab_name
    });
}
function resendOtpLinkClick( lead_id ) {
    dataLayer.push({
        'event': 'resend_otp_link_click',
        'pageType': pageTitle,
        'clickText': "Resend OTP",
        'userID': lead_id
    });
}

function sendOtpDataLayer(lead_id) {
    dataLayer.push({
        'event': 'otp_send_from_bureau',  //This event is fired when user enters Phone Number  //otpsend
        'pageType': pageTitle,
        'userID': lead_id
    });
}

function verifyOtpDataLayer(lead_id) {
    dataLayer.push({
        'event': 'otp_enter',  //This event is fired when user enters OTP in OTP field of form  //otpverify
        'pageType': pageTitle,
        'userID': lead_id
    });
}

function viewAllDataLayer() {
    datalayer.push({
        'event' : 'view_all_link_click',
        'pageType' : pageTitle ,
        'clickText' : 'View all',
        'userID': $("#hdnleadid").val()
    });    
}


function continueClick(card_campaign_name, card_name) {  //console.log( card_campaign_name );
    dataLayer.push({
        'event': 'Continue_Click',
        'eventCategory': pageTitle, //dynamic contains SBI campaign name i.e Amex_Simply_click_SBI_Card
        'eventAction': 'Continue_Click',
        'eventLabel': 'Eligibility_Check_Form_page',
    });
}

// new gtm
function Navigation_Tab_Click(val) {
    dataLayer.push({
        'event': 'Navigation_Tab_Click',
        'eventCategory': val,
        'eventAction': 'Navigation_Tab_Click',
    });
}