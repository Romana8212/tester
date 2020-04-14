
  $("#back_form").validate({ 
  focusInvalid: false,   
  rules: {
    uname: {
      required: true,
      minlength: 2	
    },
	phone: {
      required: true,
      minlength: 5
    },
    email: {
      required: true,
      email: true
    },
	mess: {
      required: true,
      minlength: 5
    }

  },
  messages: {
  }, 	
  submitHandler: function(){  
	 doSendFormSubmit(); 
	  } 
  
});

 function  doSendFormSubmit(){
   	 var user_name =  $( "input#uname").val();
	 var user_email =  $( "input#email").val();
	 var user_phone =  $( "input#phone").val();
	 var user_message =  $( "textarea#mess").val();
     var out=[];	 
	$.ajax({
    type: 'POST', 
    url: '/include/result_back.php',
	data: 'ord_name='+user_name+'&ord_email='+user_email+'&ord_phone='+user_phone+'&ord_mess='+user_message,
    success: function(data) {
	  out =  data.split('###');
	   if(out[0] == '02'){
	 var  data_success = out[1];
    $('#result_order_back').html(data_success);
	$('#result_order_back').css("display","block");
	$("form#back_form")[0].reset();
	$("form#back_form").css("display","none");
	                    } 
			else{
				    $('#order_loading').css("display","none");
				 	$('#back_submit').css("display","block");
						       }
  },
     error: (function() { alert("Ошибка выполнения"); })
});    
 }
  
