// Email Validation
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Check password validation
let reqText = "";
function passVal(pass){
    let passval = true;
    if(pass.length < 8){
        reqText += "Minimum 8 character needed<br>";
        passval = false;
    }
    if(pass == ""){
        $("#inputPassword1").removeClass("is-valid");
        $("#inputPassword1").addClass("is-invalid");
        reqText += "Password Missing<br>";
    }
    return passval;
}

function ismatched(val1, val2){
    let passval;
    if(val1 != val2){
        passval = false;
    }
    if(val2 == ""){
        $("#inputPassword2").removeClass("is-valid");
        $("#inputPassword2").addClass("is-invalid");
        reqText += "Please confirm the password.<br>";
        passval = false;
    }
    return passval;
}


// Live Data validate
let email = false;
let pass = false;
let pass2 = false;
let pass23 = false;
$("#inputEmail1, #inputPassword1, #inputPassword2").on('change keyup paste', function em(){
    reqText = "";
    
    if($(this).attr("id") == "inputEmail1"){
        email = $(this).val();
        email = validateEmail(email);

        if(email){
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
        }
        else{
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
        }
    }

    if($(this).attr("id") == "inputPassword1"){
        pass = $(this).val();
        pass = passVal(pass);

        if($("#inputPassword2").val() != undefined){
            pass23 = ismatched($("#inputPassword1").val(), $("#inputPassword2").val());
            if(pass23 == false){
                reqText += "Password not matching.<br>";
                $($("#inputPassword1")).removeClass("is-valid");
                $($("#inputPassword1")).addClass("is-invalid");
                $($("#inputPassword2")).removeClass("is-valid");
                $($("#inputPassword2")).addClass("is-invalid");
            }
            else{
                $($("#inputPassword1")).removeClass("is-invalid");
                $($("#inputPassword1")).addClass("is-valid");
                $($("#inputPassword2")).removeClass("is-invalid");
                $($("#inputPassword2")).addClass("is-valid");
            }
        }

        if(pass == false){
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
        }
        else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
        }
    }

    if($(this).attr("id") == "inputPassword2"){
        pass = passVal($("#inputPassword1").val());
        pass2 = ismatched($("#inputPassword1").val(), $("#inputPassword2").val());
        if(pass2 == false){
            reqText += "Password not matching.<br>";
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
        }
        else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            if(pass == true){
                $("#inputPassword1").removeClass("is-invalid");
                $("#inputPassword1").addClass("is-valid");
            }
        }
    }

    $("#passreq").html(reqText);
});


// Prevent button if all not validate
$("#loginform").submit(function(e){
    if(pass == false){
        reqText = "";
        passVal($("#inputPassword1").val());
        $("#passreq").html(reqText);
        reqText = "";
    }
    if(email == false || pass == false){
        e.preventDefault();
    }
});

$("#regform").submit(function(e){
    if(pass2 == false){
        reqText = "";
        ismatched(undefined, $("#inputPassword2").val());
        passVal("");
        $("#passreq").html(reqText);
        reqText = "";
    }
    if(email == false || pass == false || pass2 == false){
        e.preventDefault();
    }
});