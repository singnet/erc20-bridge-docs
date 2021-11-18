$(document).ready(function () {
    /*-------------------------------------
    Contact Form Validation
    ---------------------------------------*/
    $("#submit-btn").click(function (e) {
        e.preventDefault();
        var form = $('#contact-form');
        var name = $("#name").val();
        var email = $("#email").val();
        var enquiry = $("#enquiry").val();
        var message = $("#message").val();
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        //agix-ada-bridge@singularitynet.io

        //  validation
        if (name.length == "") {
            $(".error-msg").text("Please enter your name");
            $("#name").focus();
            return false;
        } else if (email.length == "") {
            $(".error-msg").text("Please enter your email address")
            $("#email").focus();
            return false;
        } else if (!filter.test(email)) {
            $(".error-msg").text("Please enter valid email address")
            $("#email").focus();
            return false;
        } else if (message.length == "") {
            $(".error-msg").text("Please enter your message");
            $("#message").focus();
            return false;
        } else {
            $(".error-msg").text("");
        }

        //  ajax call
        $.ajax({
            url: "https://li8mklzc0h.execute-api.us-east-1.amazonaws.com/mt-v2/email",
            data: JSON.stringify({
                "recipient": "anand@singularitynet.io",
                "message": "Message: " + message + " From: " + email,
                "subject": enquiry,
                "notification_type": "support"
            }),
            type: "POST",
            success: function (data, xhr, textStatus) {
                $("#contact-form").trigger("reset");
                var status = textStatus.status;
                if(status === 200){
                  $(".success-msg").addClass("show")
                }
            }
        });
    })
});