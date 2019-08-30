
var env_flag = 1 ;  // *** // 0 = dev , 1 = stage , 2 = prod 
var custom_bank_id = 92;  // tid - BANK ID
var card_id = 94;  // nid - Credit Card ID
var resent_flag = 0;  // do not remove this - manange GM/GTA on resent OTP.
var isMobValid = false;
var downloadTimer = null;
var pageTitle = 'YES_Prosperity_Edge';
var isEligible = 'N';
var otpCount = 0;

window.dataLayer = window.dataLayer || [];   // GM / GTA

var validation_array = [
    { "input" : "name", "touch" : false,"status" : false, "msg" : "" },
    { "input" : "email", "touch" : false, "status" : false, "msg" : "" },
    { "input" : "pancard", "touch" : false, "status" : true, "msg" : "" },   // adjust
    { "input" : "income", "touch" : false, "status" : true, "msg" : "" },    // adjust
    { "input" : "pincode", "touch" : false, "status" : false, "msg" : "" },
    { "input" : "mobile","touch" : false, "status" : false, "msg" : "", "otp_verified_flag" : false }
];

var webengage = '' ;
var slider_custom_href_link = [] ;
var hold_authorization_token = '' ;
var carousel_apply_now_flag = 0 ;
var pincode_selected_flag = 0;

var tmp = {} ;
var baseUrl = {} ;

var all_sbi_array_object = [];  // All SBI card object
var only_sbi_array_id = [];  // All SBI ids here
var hold_current_card_data_array_object = [];
var tmp_hold_current_item_data = [];

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

if(window.location.host === "stage.onebajaj.capital" ){ //stage
    
    console.log( 'STAGE') ; 
    env_flag = 1;
	
}

if ( env_flag === 2 ) {  console.log( 'PROD') ;
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
            getcustomer: 'https://rqf5g3hbk5.execute-api.ap-south-1.amazonaws.com/prod/campaign/getcustomer',
            offer_check: "https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getpincodemapping"
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
            getcustomer: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getcustomer',           
            offer_check: "https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getpincodemapping"
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
            getcustomer: 'https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getcustomer', 
            offer_check: "https://cmfyttqhhb.execute-api.ap-south-1.amazonaws.com/dev/campaign/getpincodemapping"

        }
}

if ( env_flag === 2 ) {
    card_id = 91;
    //baseUrl.api_url = "https://onebajaj.capital/api/bajaj_capital/visitor/campaignLeads";
    baseUrl.api_url = "https://api-cc.onebajaj.capital/api/bajaj_capital/visitor/campaignLeads/" ; 

    get_card_category_url = 'https://cms.onebajaj.capital/services/api/category-node-list?_format=json&limit=100';
    
    //get_city_api_url = 'https://onebajaj.capital/api/bajaj_capital/visitor/cityMaster';
    get_city_api_url = 'https://api-loan.onebajaj.capital/api/bajaj_capital/visitor/cityMaster';
    
    view_all_cms_link = "https://onebajaj.capital/credit-card/offerlisting?field_category_target_id=" ;
 
    learn_more_cms_link = "https://onebajaj.capital/credit-card/offerlisting?keywords=" ;     
    
    //redirect_url = "https://onebajaj.capital/credit-card/eligibilityCheck/?token=" ;  
    redirect_url = "https://www.onebajaj.capital/credit-card/eligibilityCheck/?token=" ;
    
} else if( env_flag === 1 ) {
    card_id = 94;
    
    baseUrl.api_url = "https://pre-prod-api-cc.onebajaj.capital/api/bajaj_capital/visitor/campaignLeads" ;

    get_card_category_url = 'https://pre-prod-cms.onebajaj.capital/services/api/category-node-list?_format=json&limit=100';
    
    get_city_api_url = 'https://pre-prod-api-loan.onebajaj.capital/api/bajaj_capital/visitor/cityMaster';
    
    view_all_cms_link = "https://pre-prod.onebajaj.capital/credit-card/offerlisting?field_category_target_id=" ;
    
    learn_more_cms_link = "https://pre-prod.onebajaj.capital/credit-card/offerlisting?keywords=" ;
    
    redirect_url = "https://pre-prod.onebajaj.capital/credit-card/eligibilityCheck/?token=" ;  
    
} else {
    card_id = 94;

    baseUrl.api_url = "http://13.233.130.175:8088/api/bajaj_capital/visitor/campaignLeads";

    get_card_category_url = 'https://pre-prod-cms.onebajaj.capital/services/api/category-node-list?_format=json&limit=100';

    get_city_api_url = 'http://13.233.130.175:8089/api/bajaj_capital/visitor/cityMaster';
    
    view_all_cms_link = "http://13.233.130.175:3000/credit-card/offerlisting?field_category_target_id=" ;
    
    learn_more_cms_link = "http://13.233.130.175:3000/credit-card/offerlisting?keywords=" ; 
    
    redirect_url = "http://13.232.169.34:3000/credit-card/eligibilityCheck?token=" ;  
    
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
        'pageType': pageType,            //i.e. Credit card landing page
        'planName': planName              //i.e. The American Express Membership RewardsÂ® Credit Card
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

function Apply_Now_Click() {
    dataLayer.push({
        'event': 'apply_now_button_click',
        'pageType': pageTitle,
        'clickText': "Apply Now",     // Apply Now
        'loanName': planName,
        'userID': $("#hdnleadid").val()
    });
}

function FAQ_Section(faq_text) {
    dataLayer.push({
        'event': 'FAQ_Section_Click',
        'eventCategory': 'FAQ_Section_Click',
        'eventAction': faq_text, // dynamic containes clickText i.e How can I block My credit card
    });
}


function otp_send_from_bureau() {
    dataLayer.push({
        'event': 'otp_send_from_bureau',  //This event is fired when user enters Phone Number  //otpsend
        'pageType': pageTitle,
        'userID': $("#hdnleadid").val()
    });
}

function otp_enter() {
    dataLayer.push({
        'event': 'otp_enter',  //This event is fired when user enters OTP in OTP field of form  //otpverify
        'pageType': pageTitle,
        'userID': $("#hdnleadid").val()
    });
}

function resend_otp_link_click() {
    dataLayer.push({
        'event': 'resend_otp_link_click',
        'pageType': pageTitle,
        'clickText': "Resend OTP",
        'userID': $("#hdnleadid").val()
    });
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
        'pageType': pageType,            //i.e. Credit card landing page
        'planName': planName              //i.e. The American Express Membership Rewards® Credit Card
    });
}

function continueClick() {  //console.log( card_campaign_name );
    dataLayer.push({
        'event': 'Check_Eligibility_Click',
        'eventCategory': 'apply_now', // dynamic contains amex campaign name i.e. Amex_everyday-spend-gold-credit-card, Amex_platinum-travel-credit-card, Amex_membership-rewards-credit-card
        'eventAction': 'Check_Eligibility_Click',
        'eventLabel': pageTitle
    });

}

function navigationTabClick( tab_name, ths ) { // console.log( tab_name );

    dataLayer.push({
        'event' : 'Navigation_Tab_Click',
        'eventCategory' : tab_name,
        'eventAction' : 'Navigation_Tab_Click'
        });

        $(ths).addClass('active');
        $(ths).siblings('li').removeClass('active');

        switch( tab_name ) {

            case 'Home' :
                    $(window).scrollTop(0);
            break;

            case 'Features' : 
                    $(window).scrollTop(600);
            break;

            case 'Products' : 
                    $(window).scrollTop(1200);
            break;  

        }     
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
    } else {
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

    //var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
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
    
$(function() {    

    if($(window).width() <= 481) {
        $('html, body').animate({
            scrollTop: $('#registration-form-scroll-offset').offset().top
        }, 'slow');        
    }    

    $('.logo-render-class').load('logo.html');
    
    $('.leadcard').load('form.html', '#ddlCity, #divOtp', function() {

        if($(window).width() <= 481) {
            $('html, body').animate({
                scrollTop: $('#registration-form-scroll-offset').offset().top
            }, 'slow');        
        }
       
        $("#userName").keyup( function () {
            nameValidation();
            runFormValidation();
            handleEmptyFeild();
        });

        $("#userEmail").keyup( function () {
            emailValidate();
            runFormValidation();
            handleEmptyFeild();
        });         

        $("#userAPancard").keyup( function () {
            panValidate();
            runFormValidation();
            handleEmptyFeild();
        }); 
        
        $("#userAIncome").keyup( function () {
            incomeValidate();
            runFormValidation();            
            handleEmptyFeild();
        });    
        
        $("#pincode").keyup( function () {
            pincodeValidate();
            runFormValidation();
            handleEmptyFeild();
        }); 

        $("#userMob").keyup( function () {
            isMobValid = mobValidation();

            runFormValidation();
            handleEmptyFeild();

            if ( isMobValid ) {  
                createLead( 0 );
            }            
            $('#divOtp').hide();
        });

        $("#userOTP").keyup( function () {
            runFormValidation();
            handleEmptyFeild();
            const otp = $("#userOTP").val();
            if ( otp && (otp.length === 6) && isMobValid ) {

                verifyOTP();                
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
							//console.log('XX ::', data  );
                        validation_array[4].pincode_id = data.data.pinCodeMaster[0].city;
                        $('#pincode').attr('data-pincode-id', data.data.pinCodeMaster[0].id);
                        pincodeValidate();
                        }
                    } );
                },
                minLength: 2,
                autofocus: true,
                classes: {
                    "ui-autocomplete": "highlight"
                    },
                create: function() {  //console.log( 'create ');

                        $(this).data('ui-autocomplete')._renderItem  = function (ul, item) {   //console.log('', item);
                            $('#pincode-state').html(item.city );
                        $('#pincode').attr('data-pincode-id', item.id ); 
                        return $("<li>")
                            .attr("data-value", item.pinCode)
                            .append(item.pinCode)
                            .appendTo(ul);
                        };
                        
                },
                select: function( event, ui ) {  //console.log( 'select ');
                    
                    this.value = ui.item.pinCode ;
                    $('#pincode-state').html(ui.item.city);
                    $('#pincode').attr('data-pincode-id', ui.item.id); 
                    validation_array[ 4 ].pincode_id = ui.item.city;
                    runFormValidation();
                    return false;
                },
                focus: function( event, ui ) {  console.log( 'focus ');

                    event.preventDefault(); // without this: keyboard movements reset the input to ''
                    $('#pincode-state').html(ui.item.city);
                    this.value = ui.item.pinCode ;
                    validation_array[4].pincode_id = ui.item.city;
                    pincodeValidate();
                    runFormValidation();
                    return false;
                }
        
        });   
        
        let session_user_form_data = JSON.parse( sessionStorage.getItem('user_form_data') ); 

        session_user_form_data == '' ? handleEmptyFeild() : renderDataFromSession( session_user_form_data ) ; 

    });

    $('.carousel-slider-content').load('carousel-slider.html');

	$('.footer-type4').load('footer.html', '.footer-type4', function() {

		$('.terms').click(function(event) { 
				event.stopPropagation();
			window.open( $(this).attr('data-href'), '_blank');
		  });

		runFormValidation();  // to show continue button
		//$("#userAIncome").val('200000');
        //$("#userAPancard").val('WQEPR1234R');

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
    
    function checkIfLeadIdCreated() {

       return $("#hdnleadid").val().trim() == '0' ? false : true ;
    }

    function createLead( param, m_verified_param, lead_push_param, has_cc_param ) {

        console.log( 'createLead :: callled', param ) ;

        var chek_offer_data = {
            "bankid": "6",  //1 for amex
            "pincode": $("#pincode").val()
        };
        //check whether eligible for offer by Pincode and annual income shouldn't be less than 500k
        checkOffer(chek_offer_data).then(data => {
            if (data.msg === "not_eligible" || (parseInt($("#userAIncome").val()) < 250000)) {
                isEligible = 'N';
            } else {
                isEligible = 'Y';
            }


            var strData = JSON.stringify({
                "visitorid": $("#hdnvisitorid").val(),
                "name": $("#userName").val() + "",
                "emailid": $("#userEmail").val() + "",
                "mobileno": $("#userMob").val() + "",
                "dob": "",
                "city": parseInt($('#pincode').attr('data-pincode-id')),       // undefined
                "pincode": $("#pincode").val(),
                "param1": $("#ddlQuestion").val() + "",
                "income": $("#userAIncome").val(),
                "pan": $("#userAPancard").val(),
                "location": $("#hdnlocation").val(),
                "leadid": $("#hdnleadid").val().toString(),
                "ismobileverify": m_verified_param,
                "isleadpushed": isEligible,
                "hasexistingcc": has_cc_param
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

                    console.log('Lead Created :: ', data, data["result"][0]["leadid"]);

                    if ((data.status === 200 && carousel_apply_now_flag && param)) {
                        if (isEligible === 'N') {
                            window.location.href = 'thankyou.html';
                        } else {
                        var client_data = JSON.stringify({
                            "name": $("#userName").val().toString(),
                            "email": $("#userEmail").val().toString(),
                            "mobileno": $("#userMob").val().toString(),
                            "offer_id": card_id ? card_id : "0",
                            "city_bcl_id": ($('#pincode').attr('data-pincode-id')).toString(),
                            "pincode": $("#pincode").val().toString(),   // pincode - ddlCity name no more used
                            "annual_income": $("#userAIncome").val().toString(),
                            "pan": '', // $("#userAPancard").val().toString(),
                            "has_existing_credit_card": $("input[name='ddlQuestion']:checked").val(),
                            "campaign_unique_id": $("#hdnleadid").val().toString(),
                            "pincode_state": $("#pincode-state").html().trim()
                        });

                        sessionStorage.setItem('user_form_data', client_data); //console.log( 'createCampaignLeads ::' , client_data ) ;

                        fbq('track', 'Lead');    
                        createCampaignLeads(client_data, hold_authorization_token = '');
                        fbq('track', 'Search');

                    //window.location.href = 'thankyou.html';
                    }
                    }


                    if (data.status === 200 && !checkIfLeadIdCreated()) {

                        $("#hdnleadid").val(data["result"][0]["leadid"]);
                        sendOTP();
                    }


                },
                error: function (jqXHR, exception) {

                    showHttpError(jqXHR, exception);

                    $("#lblMessage").text('Error');
                    $("#lblMessage").css('color', 'red');
                }
            }); 

            //getting amex cards to set offer id starts
        }).catch((err) => {
            console.log("Check Offer", err);
        });
       
        
    }


    function CreateVisitorID() {

        console.log('CreateVisitorID called');
        var sourceurl = window.location.href;
        var referralurl = document.referrer;
        var utm_source = GetParameterValues('utm_source');
        var utm_medium = GetParameterValues('utm_medium');
        var utm_campaign = GetParameterValues('utm_campaign');
        var utm_term = GetParameterValues('utm_term');
        var utm_content = GetParameterValues('utm_content');
        var parid = GetParameterValues('par');        

        let request_pram = {
            "browsername": jscd.browser,
            "browserip": "",//resdata.ip,
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
        }

        $.ajax({
            url: "https://jsonip.com",
            method: 'GET'
          }).done(function( data ) {
                //console.log(data);
                //console.log(data.ip);
                request_pram.browserip = data.ip;
                var strData = JSON.stringify(request_pram);

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
                        console.log( $("#hdnvisitorid").val() + " Data successfully saved" );
                        //createLead( data["result"][0]["visitorid"] );                
                    },
                    error: function ( jqXHR, exception ) {
            
                            showHttpError( jqXHR, exception ) ;
                    }
                });                
        })
        // $("#hdnlocation").val(resdata.latitude + "," + resdata.longitude + "," + resdata.city);

    }    

    
    function validateCustomer( card_id ) {
        
        if ( checkIfValidationPass() === true ) {

            try {
                var client_data = '';
                var visitor_id = $("#hdnvisitorid").val();
    
                console.log( ' validateCustomer ::', visitor_id ) ;
    
                if ( visitor_id == '' ) {  
    
                    CreateVisitorID();
    
                } else {

                        $("#hdnlocation").val( $("#hdnlatitude").val() + "," + $("#hdnlongitude").val() + ",");
                        continueClick();  //GM/GTA
                        //checkIfNewNo();
                        let dd_question = $("input[name='ddlQuestion']:checked").val() ;
                        createLead( 1 , 'Y', 'Y', dd_question );
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

    function checkIfNewMobileNo() {
        //console.log( 'checkIfNewMobileNo::', ( ! stringToObject(sessionStorage.getItem('mobile_verified')).mobile_no == $('#userMob').val().trim() ) );
        
        let flag = false ;
        
        if ( ! stringToObject(sessionStorage.getItem('mobile_verified')).mobile_no == $('#userMob').val().trim() ) {
            
            console.log( 'checkIfNewMobileNo:: IF');
            sessionStorage.removeItem('mobile_verified');
            validation_array[ 5 ].touch = true ;
            validation_array[ 5 ].msg = "New mobile number applied.";
            validation_array[ 5 ].status = false;

            $("#hdnleadid").val('0');
            flag = true ;
        }
        return flag;
    }
    
    function showHttpError( jqXHR , exception ) {
    
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
            if(otpCount){
                resend_otp_link_click();
            } else {
                otp_send_from_bureau();
                otpCount++;
            }
            console.log( 'SendOTP :: Called' ) ;

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

                    console.log( 'Otp sent ::' ) ;

                    if( resent_flag ) {     // do not remove this - 0 or 1.

                        //resendOtpLinkClick();      // GM - GTA
                    }

                    resent_flag++;      // do not remove this - 0 or 1.

                    $("#userOTP").show();
                    $("#divOtp").show();
                    $("#otpResend").show();

                    startTimer();

                    $("#otpResend").show();
                    $("#otpResend").show();

                    // $("#userAIncome").attr("disabled", "disabled");
                    // $("#userAPancard").attr("disabled", "disabled");
                    // $("#pincode").attr("disabled", "disabled");
                    // $("#ddlQuestion").attr("disabled", "disabled");

                    $("#userOTP").val('');
                    $("#userOtpinvalid").hide();
                    $("#userOtpinvalidmsg").html("");

                    sendMessage(randomnumber);

                    //NonVerifiedLleadSubmitted($("#hdnvisitorid").val());
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


    function verifyOTP() {

        if (otpEnterKeyPressed() == true) {

            try {
                otp_enter();
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

                        //console.log( JSON.stringify(data) + "send message.");
                        //  $("#hdnleadid").val(data["result"][0]["leadid"]);
                        var status = data["result"][0]["o_errcode"];
    
                        if (status === 200) {

                            clearInterval( downloadTimer );

                            // apply_now_click_credit_card();
                            $("#userOtpinvalid").hide();
                            $("#userOtpinvalidmsg").html("");
                            $("#resendOTP").hide();
                            $("#countdown").hide();
                            $("#userOTP").hide();
                            $("#userMob").prop("disabled", true);
                            $("#userMobverified").removeClass('errors').html("  &#10004;").css({ "font-family": "Zapf Dingbats", "color": "#00ba7e", "white-space": "pre-wrap", "display": "" });
                            
                            validation_array[ 5 ].otp_verified_flag = true;
                            // fbq('track', 'Lead');
                            //if( checkIfValidationPass() ) {  //console.log( 'verify OTP :: button check :: ', enterKeyPressed(null, 0) ) ;
                            if( runFormValidation() ) {
                                $("#btnsubmit").removeAttr("disabled", "disabled").button('refresh');
                            }

                        }
                        else {
                            $("#userOtpinvalid").show();
                            $("#userOtpinvalidmsg").html("Invalid OTP");
                            $("#countdown").hide();
                            $("#resendOTP").show();
                        }
    
                    },
                    error: function ( jqXHR, exception ) {
    
                        showHttpError( jqXHR, exception ) ;

                        $("#btnsubmit").attr("disabled", "disabled").button('refresh');
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
    

    // check offer by checking pin code starts
    function checkOffer(data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: baseUrl.offer_check,
                contentType: "application/json; charset=utf-8",
                processData: true,
                dataType: "json",
                data: JSON.stringify(data),
                crossDomain: true,
                success: function (resp, textStatus, xhr) {
                    if (resp.status === 200 && resp.result.length > 0 && resp.result[0].isallowed === 'Y') {
                        resolve({ 'msg': 'eligible' })
                    } else {
                        resolve({ 'msg': 'not_eligible' })
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown.error);
                    reject({ err: errorThrown.error })
                }
            })
        })
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
        let msg = '';
        const name = $("#userName").val().replace(/[\s]/g, '');
        validation_array[ 0 ].touch = false ;

        if (!ValidateString(name)) {

            msg = "Name is required.";
            validation_array[ 0 ].touch = true ;
            IsValid = false;
        } else if ( $("#userName").val().length < 2 ) {

            msg = "Name must be at least 2 character.";
            validation_array[ 0 ].touch = true ;
            IsValid = false;
        } else {    

        }
        validation_array[ 0 ].status = IsValid ;
        validation_array[ 0 ].msg =  msg;
        return IsValid;        
        
    }



    function startTimer() {

        let timeleft = 120;
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = timeleft + " seconds";
        $("#countdown").show();
        $("#resendOTP").hide();
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


function createCampaignLeads( param_data_string, param_token_string = '' ) {  //console.log( 'createCampaignLeads :: called' ) ;	    

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
            
            // user already exist - error msg 
            // $('#form-error-msg').html('')  // to clear
            // $('#form-error-msg').html( data.msg )  // to show error            
            
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

function emailValidate() {

    let IsValid = true;
    let msg = '';
    validation_array[ 1 ].touch = false ;

    if (!$("#userEmail").val()) { 
            msg = "Email is required.";
            IsValid = false;
            validation_array[ 1 ].touch = true ;
    } else {

        if ( !validateEmail( $("#userEmail").val() ) ) { 
            msg = "Please enter the email address in the format of abc@xyz.com.";
            IsValid = false;
            validation_array[ 1 ].touch = true ;
        }
    }
    validation_array[ 1 ].status = IsValid ;
    validation_array[ 1 ].msg =  msg;    

    return IsValid ;
}


function panValidate() {

    let IsValid = true;
    let msg = '';
    validation_array[ 2 ].touch = false ;    

    if (!$("#userAPancard").val()) {

        msg = "Pan card no. is required.";
        validation_array[ 2 ].touch = true ;
        IsValid = false;
        
    } else {     
        var panRegex = /^([a-zA-Z]){3}([pP])([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/;  // P at 4th position

        if ( ! panRegex.test( $("#userAPancard").val() ) ) {

            msg = "Enter a valid 10 digit pancard number.";
            validation_array[ 2 ].touch = true ;
            IsValid = false;
        }
    }

    validation_array[ 2 ].status = IsValid ;
    validation_array[ 2 ].msg =  msg;

    return IsValid ;

}

function incomeValidate() {
    let IsValid = true;
    let msg = '';
    validation_array[ 3 ].touch = false ;  

        var re = /[^0-9]/g;
        var BlkAccountIdV = $('#userAIncome').val();

        if (!$("#userAIncome").val()) {  
            msg = "Annual income is required.";
            validation_array[ 3 ].touch = true ;
            IsValid = false;
            
        } else if (BlkAccountIdV === '0') {
            $("#userAIncome").val('');
        } else if (re.test(BlkAccountIdV)) {  
            msg = "Enter annual income in a valid format.";
            validation_array[ 3 ].touch = true ;
            IsValid = false;
            
        }

        validation_array[ 3 ].status = IsValid ;
        validation_array[ 3 ].msg =  msg;        
        return IsValid ;
}

function pincodeValidate() {

    let IsValid = true;
    let msg = '';
    validation_array[ 4 ].touch = false ;

    var var_length = $('#pincode').val().trim().length ;

    if ( $('#pincode').val() <= 0 ) {

        msg = "Pin code is required.";
        validation_array[ 4 ].touch = true ;
        IsValid = false;
        pincode_flag = false;
        pincode_selected_flag = 0;
        validation_array[ 4 ].pincode_id = '';

    } else if ( var_length < 6 ) {

        msg = "Pincode must be 6 digit number";
        validation_array[ 4 ].touch = true ;
        IsValid = false;
        pincode_flag = false;
        pincode_selected_flag = 0;
        validation_array[ 4 ].pincode_id = '';

    } else if ( /[^0-9]/g.test( $('#pincode').val() ) ) {

        msg = "Invalid pincode format.";
        validation_array[ 4 ].touch = true ;
        IsValid = false;
        pincode_flag = false;
        pincode_selected_flag = 0;
        validation_array[ 4 ].pincode_id = '';

    } else {

        pincode_selected_flag = 1;
		let pincode_state = $("#pincode-state").html().trim();
        sessionStorage.setItem('is_pincode_checked', JSON.stringify({ "flag" : pincode_selected_flag, "state" : pincode_state }) ) ;
    }
	
    
    validation_array[ 4 ].status = IsValid ;
    validation_array[ 4 ].msg =  msg;     
    return IsValid ;

}

function mobValidation() {

    let IsValid = true;
    let msg = '';
    validation_array[ 5 ].touch = false ; 
    var mobStartRegx = /^[0-5].*$/;

    if (!$("#userMob").val()) {
        
        msg = "Mobile is required.";
        validation_array[ 5 ].touch = true ;
        IsValid = false;
		//$('#userOTP').hide();
    } else {
        if ($("#userMob").val() && $("#userMob").val().length == 10 && $("#userMob").val().match(/^\d+$/) && !mobStartRegx.test($("#userMob").val())) {

        } else if (mobStartRegx.test($("#userMob").val())) {

            msg = "Mobile number is not valid.";
            validation_array[ 5 ].touch = true ;
            IsValid = false;
			//$('#userOTP').hide();
			
        } else if ($("#userMob").val().length != 10) {

            msg = "Enter a valid 10 digit mobile number.";
            validation_array[ 5 ].touch = true ;
            IsValid = false;
			//$('#userOTP').hide();
        }
    }

    validation_array[ 5 ].status = IsValid ;
    validation_array[ 5 ].msg =  msg;           
    return IsValid;
}

function runFormValidation() {

    validation_array.forEach(function(value, index) {

        switch( index ) {

            case 0 : 
                if ( validation_array[ index ].touch ) {
                    $("#namevalid").hide();
                    $("#nameinvalidmsg").html( validation_array[ index ].msg );
                    $("#nameinvalid").show();
                } else {
                    $('#form-error-msg').html('').hide();
                    $("#namevalid").show();
                    $("#nameinvalidmsg").html( validation_array[ index ].msg );
                    $("#nameinvalid").hide();
                }
            break;

            case 1 : 
                if ( validation_array[ index ].touch ) {
                    $("#userEmailvalid").hide();
                    $("#userEmailinvalidmsg").html( validation_array[ index ].msg );
                    $("#userEmailinvalid").show();          
                } else {
                    $('#form-error-msg').html('').hide();
                    $("#userEmailvalid").show();
                    $("#userEmailinvalidmsg").html( validation_array[ index ].msg );
                    $("#userEmailinvalid").hide();                          
                }
            break;

            case 2 : 
                if ( validation_array[ index ].touch ) {
                    $("#userAPancardvalid").hide();
                    $("#userAPancardinvalidmsg").html( validation_array[ index ].msg );
                    $("#userAPancardinvalid").show();                    
                } else {
                    $('#form-error-msg').html('').hide();
                    $("#userAPancardvalid").show();
                    $("#userAPancardinvalidmsg").html( validation_array[ index ].msg );
                    $("#userAPancardinvalid").hide();                                    
                }
            break;

            case 3 : 
                if ( validation_array[ index ].touch ) {
                    $("#userAIncomevalid").hide();
                    $("#userAIncomeinvalidmsg").html( validation_array[ index ].msg );
                    $("#userAIncomeinvalid").show();        
                } else {
                    $('#form-error-msg').html('').hide();
                    $("#userAIncomevalid").show();
                    $("#userAIncomeinvalidmsg").html( validation_array[ index ].msg );
                    $("#userAIncomeinvalid").hide();                    
                } 

            break;

            case 4 : 
                if ( validation_array[ index ].touch ) {            
                    $("#pincodevalid").hide();
                    $("#userPininvalid").html( validation_array[ index ].msg );
                    $("#userPininvalid").show();  
                    $('#pincode-state').html( validation_array[ 4 ].pincode_id );
                } else {
                    $('#form-error-msg').html('').hide();
                    $("#pincodevalid").show();
                    $("#userPininvalid").html( validation_array[ index ].msg );
                    $("#userPininvalid").hide();  
                    $('#pincode-state').html( validation_array[ 4 ].pincode_id );
                }            
            break;

            case 5 :
                    if ( validation_array[ index ].touch ) {
                        $("#userMobvalid").hide();
                        $("#userMobinvalidmsg").html( validation_array[ index ].msg ).css('color', 'red'); ;            
                        $("#userMobinvalid").show(); 
                    } else {
                        $('#form-error-msg').html('').hide();
                        $("#userMobvalid").show();
                        $("#userMobinvalidmsg").html( validation_array[ index ].msg ).css('color', ''); ;            
                        $("#userMobinvalid").hide();                 
                    }

            break;
        }

    })

    applyClassOnValidation() ;

}

function showMobileVerified() {

    if( stringToObject(sessionStorage.getItem('mobile_verified')).mobile_no == $('#userMob').val() ) {        
        $("#userMobvalid").hide();
        $("#userMobinvalidmsg").html('mobile verified' ).css('color', 'green');        
        $("#userMobinvalid").show();
		validation_array[ 5 ].status = true;
		validation_array[ 5 ].otp_verified_flag = true;
		$('#resendOTP').hide();
    }
}

function applyClassOnValidation() {

    if (checkIfValidationPass()) {        

        $("#btnsubmit").removeClass("btn-gray");
        $("#btnsubmit").removeAttr("disabled", "disabled").button('refresh');
        $("#btnsubmit").addClass("btn btn-block btn-primary");
        carousel_apply_now_flag = 1 ;

    } else {

        $("#btnsubmit").addClass("btn-gray");
        $("#btnsubmit").attr("disabled", "disabled").button('refresh');
        carousel_apply_now_flag = 0 ;
        //$("#btnsubmit").removeClass("btn btn-block btn-primary");
    }    
}

function checkIfValidationPass() {
	
	return ( validation_array.filter(word => word.status === true).length === 6 && validation_array[ 5 ].otp_verified_flag );
	
}

function validate() {
    
     if ( ( $('#pincode').val() <= 0 )  || ( $('#pincode').val() <= 500000 ) ) {
         $("#pincodeinvalid").show();
         $('#pincodeinvalidmsg').html( 'Invalid pincode' ) ;
     }   
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

function renderDataFromSession( session_data_param ) {  

    
    for( var key in session_data_param )  {

        if ( session_data_param.hasOwnProperty( key ) ) {

             switch( key ) {

                case 'name' : 

                    $("#userName").val( session_data_param[ key ] ) ;
					validation_array[ 0 ].status = true;
                
                break;

                case 'email' : 

                    $("#userEmail").val( session_data_param[ key ] ) ;
					validation_array[ 1 ].status = true;

                break;

                case 'mobileno' :

                    $("#userMob").val( session_data_param[ key ] ) ;
					validation_array[ 5 ].status = true;

                break;

                case 'pincode' : 

                    $('#pincode').val( session_data_param[ key ] ) ;
					$("#pincode-state").html( session_data_param[ 'pincode_state' ] );
					validation_array[ 4 ].status = true;
            
                break;

                case 'annual_income' :

                    $("#userAIncome").val( session_data_param[ key ] ) ;
					validation_array[ 3 ].status = true;

                break;

                case 'pan' :

                    $("#userAPancard").val( session_data_param[ key ] ) ;
					validation_array[ 2 ].status = true;

                break;
                
                case 'has_existing_credit_card' :

                    $("input[name='ddlQuestion'][value='"+ session_data_param[ key ] +"']").prop('checked', true);

                break ;


             }
        }
    }

    handleEmptyFeild() ;

}

function checkIfMobileVerified() {

    let return_flag = false;

    if ( sessionStorage.getItem('mobile_verified') !== null &&  ( stringToObject(sessionStorage.getItem('mobile_verified')).verified_flag === true ) ) {
       
        return_flag = true;
    }

    return return_flag ;
}

function stringToObject( session_data ) {

    return ( sessionStorage.getItem('mobile_verified') !== null ) ? JSON.parse( session_data ) : false;
}


$(document).ready(function() {
    
    var scroll = 0 ;
        $(window).scroll(function() {    
            scroll = $(window).scrollTop();         

            if (scroll >= 0 && scroll <= 550) {
                $("#top-menu .home").addClass("active");
                $("#top-menu .home").siblings('li').removeClass('active');
            }
            if ( scroll > 550 && scroll <= 1000 ){
                $("#top-menu .features").addClass("active");
                $("#top-menu .features").siblings('li').removeClass('active');
            } 
            if ( scroll > 1377 && scroll <= 2000 ){
                $("#top-menu .products").addClass("active");
                $("#top-menu .products").siblings('li').removeClass('active');
            }

        }); 

        CreateVisitorID(); 

        $( "#home" ).hide(); //

        console.log( " cardid :: " , card_id , 'bank id ::', bankid , 'campaign id ::', campaignid  );  
		
        $.ajax({
            url: get_card_category_url,
            method: 'GET'
          }).done(function( data ) {
                tmp = data.data;

                filterCards( bankid, card_id );

                manageCarouselSlidderItemDiv();

                getCurrentPageData ( card_id, all_sbi_array_object );              
            
          });

        setCurrentPageLogoLink( card_id ) ;      

 });

 function filterCards( bankid, card_id ) {

    var only_sbi_array_id = [];  // All SBI ids here

    all_sbi_array_object.length ? all_sbi_array_object.length = 0 : '' ;
    //tmp_hold_current_item_data.length ? tmp_hold_current_item_data.length = 0 : '' ;
    var tmp_hold_current_item_data = [];

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

    var to_replace_b = all_sbi_array_object[ tmp_hold_current_item_data[ 0 ] - 1 ] ; 

    var to_replace_a = all_sbi_array_object[ all_sbi_array_object.length - 1 ] ;

    all_sbi_array_object[ tmp_hold_current_item_data[ 0 ] - 1 ] = to_replace_a ;
  
    all_sbi_array_object[ all_sbi_array_object.length - 1 ] = to_replace_b;
    
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
				//$('#carousel-inner-card-dynamic .carousel-item:last').remove(); // to remove the hidden causal 
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

                if ( item.nid == card_id_param && ( ! tmp_flag ) ) { 
                    getAction( item );   // string === number
                    // to_run_flag ? OtherSBICardSectionApplyClick( item.title, item.title ) : '' ;   //GM/GTA 
                    tmp_hold_index = index;
                    tmp_flag = 1;
                }

          }) ;          
}
	
function renderSlider( slider_array ) {

            var tmp_string = '';
            var tmp_class = '';
            var custom_index = '';

            // In slider 3 slice per group, 
            // TO show dynamic card on apply now
            // Have to Manage 3 slice per group
            // Last 3 array element are made hidden or not rendered

            for ( var i=0; i<((slider_array.length/3) - 1); i++ ) {            
                
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
                        tmp_string += '<a onclick="applyNowAction('+ slider_array[ custom_index - 0 ].nid +')" class="btn btn-primary block">Apply Now</a> </div>';
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
                        tmp_string += '<a onclick="applyNowAction('+ slider_array[ custom_index + 1 ].nid +')" class="btn btn-primary block">Apply Now</a> </div>';
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
                        tmp_string += '<a onclick="applyNowAction('+ slider_array[ custom_index + 2 ].nid +')" class="btn btn-primary block">Apply Now</a> </div>';
                    tmp_string += '</div>';
                    tmp_string += '</div>';	
            		
				
				
                tmp_string += '</div></div>';
                
          }

    $('#carousel-inner-card-dynamic').html(tmp_string);

}


function renderSliderMobile( slider_array ) {

    var tmp_string = '';
    var tmp_class = '';
    // var custom_index = '';
    
    for ( var i = 0 ; i < (slider_array.length - 3); i++ ) {        
        
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
                tmp_string += '<a onclick="applyNowAction('+ slider_array[ i ].nid +')" class="btn btn-primary block">Apply Now</a> </div>';
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

        if ( check_char_count < max_offset_limit ) {

            str_offset = ele.length ;
            
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
                    document.title = data[key];
                    pageTitle = data[key];
                    
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

                    $('#compare .container').append( '<a name="viewAll" href="'+ view_all_cms_link + encodeURIComponent( data[key] ) + '" class="viewAll link">View All <svg xmlns="http://www.w3.org/2000/svg" width="23" height="14" viewBox="0 0 23 14"><g fill="none" fill-rule="evenodd"><path fill="#6F768C" d="M15.147 13.016c-.216-.203-.229-.544-.003-.782l5.671-5.672L15.144.89a.527.527 0 0 1-.158-.378V.51a.53.53 0 0 1 .156-.378.533.533 0 0 1 .76-.002l6.052 6.051a.535.535 0 0 1 .001.76l-6.048 6.05a.539.539 0 0 1-.76.025"></path><path stroke="#6F768C" stroke-linecap="round" d="M20.5 6.567H1.12"></path></g></svg></a>' );

                break;
				
			} 
            
            $('.container').css('visibility', 'visible');
            $( "#home" ).show();
            
		}
    }
    
    
}


function applyNowAction( card_id_param ) {

    getCurrentPageData( card_id_param, to_run_flag = 1 ) ;

}




		  