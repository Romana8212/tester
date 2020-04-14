$(document).ready(function(){

      $(".carousel").carousel({
         interval : 8000
     });

   new WOW().init();
   

      $(".lightbox").lightbox({
          fitToScreen: true,
          imageClickClose: false
        });
      
      $(".lightbox-2").lightbox({
          fitToScreen: true
        }); 

	   $("#pg_phone").mask(" +38 (099) 999 - 99 - 99");	

 $("#main-text img").addClass("img-responsive2");
 $(".text_block_page img").addClass("img-responsive2");
 $(".bl_text_main img").addClass("img-responsive2");

  $("#form_podpiska").validate({ 
  focusInvalid: false,   
  rules: {
    pd_email: {
      required: true,
      email: true
    }

  },
  messages: {
  }, 	
  submitHandler: function(){  
	 doSendFormPodpiskaSubmit(); 
	  } 
});


function doSendFormPodpiskaSubmit(){
	 var user_email =  $( "input#pd_email").val();
     var user_znak = $( "select#pd_znak option:selected" ).val();
     var out=[];	 
	$.ajax({
    type: 'POST', 
    url: '/include/result_podpiska.php',
	data: 'ord_email='+user_email+'&ord_znak='+user_znak,
    success: function(data) {
	  out =  data.split('###');
	   if(out[0] == '02'){
	 var  data_success = out[1];
    $('#result_order_podpiska').html(data_success);
	$('#result_order_podpiska').css("display","block");
	$("form#form_podpiska")[0].reset();
	$("form#form_podpiska").css("display","none");
	                    } 
			else{
	 var  data_success = out[1];
    $('#result_order_podpiska').html(data_success);
	$('#result_order_podpiska').css("display","block");
						       }
  },
     error: (function() { alert("Ошибка передачи данных"); })
});
}


    $("#sidebar").mCustomScrollbar({
         theme: 'minimal-dark'
    });
	
    $('#sidebarCollapse').on('click', function () {
		$('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');	
  });

    $('#sidebarDelete').on('click', function(){
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');  
    });
	
 $("#form-back-inpage").validate({   
  focusInvalid: false,
  rules: {
    pg_phone: {
      required: true,
      minlength: 10
    }
  },
  messages: {
    pg_phone: {
      required: ""
    }
  }, 	  
  submitHandler: function(){  
 	 doSendFormSubmitKnopCallBackInPage(); 
	  } 
});   
   
function doSendFormSubmitKnopCallBackInPage(){
     var user_name =  $( "input#pg_name").val();
	 var cx_phone =  $("input#pg_phone").val();	
     var user_phone = encodeURIComponent(cx_phone);  
     var parentUrl = window.location.href;
     var out=[];	 
	$.ajax({
    type: 'POST', 
    url: '/info/result_inpage_callback.php',
	data: 'ord_name='+user_name+'&ord_phone='+user_phone+'&ord_url='+encodeURIComponent(parentUrl),
    success: function(data) {
	  out =  data.split('###');
	   if(out[0] == '02'){
	 var  data_success = out[1];
    $('#result_order_back_inpage').html(data_success);
	$('#result_order_back_inpage').css("display","block");
	$("form#form-back-inpage")[0].reset();
	$("form#form-back-inpage").css("display","none");
	$(".block_cllbacl_inpage_title").css("display","none");
	$("#block_cllbacl_inpage p").css("display","none");
	                    } 
			else{
				    var  data_error = out[1];
                    $('#result_order_back_inpage').html(data_error);
	                $('#result_order_back_inpage').css("display","block");
						       }
  },
     error: (function() { alert("Ошибка передачи данных"); })
}); 		
}


$(".dropdown-menu.multi-column.columns-3").hover(function () {
    $("#knp2 .dropdown-toggle").toggleClass("toggle-active");
 });
 
 $("#drp1").hover(function () {
	$("#knp3 .dropdown-toggle").toggleClass("toggle-active");
 });

  $("#drp2").hover(function () {
	$("#knp4 .dropdown-toggle").toggleClass("toggle-active");
 });
 
 
 
 $("#loginForm").validate({ 
  focusInvalid: false,   
  rules: {
    bl_login: {
      required: true,
      minlength: 6
    },
	u_pass: {
      required: true,
      minlength: 6,
	  maxlength: 10
    }

  },
  messages: { 		  
      bl_login: {
           required: "Поле обязательно для заполнения",
           minlength: "Пароль не менее 6 символов"
          },
     u_pass: {
           required: "Поле обязательно для заполнения",
            minlength: "Пароль не менее 6 символов",
			maxlength: "Пароль не более 10 символов"
          }		  
  }, 	
  submitHandler: function(){  
	 doSendFormLoginSubmit(); 
	  } 
	  
});	  
	  
 function doSendFormLoginSubmit(){ 
	 var login =  $("input#bl_login").val();
	 var pass =  $("input#u_pass").val();	 
     $("#result_logon").css("display","none");	   
	 $("#order_loading").css("display","block");
	 $("#login_submit").css("display","none");	
     var out=[];	
	$.ajax({
    type: 'POST', 
    url: '/blogs/result_login_blog.php',
	data: 'ord_login='+login+'&ord_pass='+pass,
    success: function(data) {
	  out =  data.split('###');
	  var xxx = out[0]; 
      switch(xxx){
	    case '01':
	       var  data_error = out[1];
           $("#result_login").html(data_error);
           $("#result_login").css("display","block");
		   $("#order_loading").css("display","none");
		   $("#login_submit").css("display","block");	
           $("form#loginForm")[0].reset();		   
		break;
	    case '02':
	       var data_uid = out[1];
	       $("form#loginForm")[0].reset();
	       $("form#loginForm").css("display","none");
		    location.href = "/blogs/account.php?uid="+data_uid;	
		break;
	    case '03':
	       var  data_error = out[1];
           $("#result_login").html(data_error);
           $("#result_login").css("display","block");
		   $("#order_loading").css("display","none");	
           $("form#loginForm")[0].reset();	
           $("form#loginForm").css("display","none");		   
		break;		
		default:
		     $("#order_loading").css("display","none");
			 $("#login_submit").css("display","block");	
        break;			 
	          }
  },
     error: (function() { alert("Ошибка выполнения"); })
});
	 
 }  
 
 
  $("#articleForm").validate({ 
  focusInvalid: false,   
  rules: {
    art_title: {
      required: true,
      minlength: 5
    },
	art_info: {
      required: true,
      minlength: 5
    },
	art_theme: {
      required: true,
      min: 1
    }
  },
  messages: { 		  
      art_title: {
           required: "Поле обязательно для заполнения",
           minlength: "Не менее 5 символов"
          },
      art_info: {
           required: "Поле обязательно для заполнения",
            minlength: "Не менее 5 символов"
          },
      art_theme: {
           required: "Поле обязательно для заполнения",
            min:  "Поле обязательно для заполнения"
          }		  
  }
	  
});

 $(".art_remove").on("click", function(){
  var str ="Вы действительно хотите удалить эту статью?";
 if(confirm(str)){
 return true
  }
  else { return false }
 }); 
 
 
 $("#reviewForm").validate({ 
  focusInvalid: false,   
  rules: {
    rw_name: {
      required: true,
      minlength: 3	
    },
	rw_mess: {
      required: true,
      minlength: 3
    },
    rw_email: {
      required: true,
      email: true
    },
	rw_kod: {
      required: true,
      minlength: 4,
	  maxlength: 4
    }

  },
  messages: {
     rw_name: {
           required: "Поле обязательно для заполнения",
            minlength: "Имя не менее 3 символа"
          },
     rw_mess: {
           required: "Поле обязательно для заполнения",
            minlength: "Очень короткий отзыв"
          },  		  
      rw_email: {
           required: "Поле обязательно для заполнения",
           email: "Некорректный E-mail"
          },
      rw_kod: {
           required: "Поле обязательно для заполнения",
		   minlength: "Четыре знака",
		   maxlength: "Четыре знака"		   
          }		  
  }, 	
  submitHandler: function(){  
	 doSendFormReviewSubmit(); 
	  }  
});


function doSendFormReviewSubmit(){
	var kod = $("#rw_kod").val();
	var email = $("#rw_email").val();   	
	var cx_dopinfo =  $("textarea#rw_mess").val();	
    var mess = encodeURIComponent(cx_dopinfo); 
	var cx_name =  $("input#rw_name").val();	
    var name = encodeURIComponent(cx_name); 
	var item_kod = $("#artid").val();

	$("#result_review").css("display","none");	   
	$("#order_loading").css("display","block");
	$("#review_submit").css("display","none");
     var out=[];
	$.ajax({
    type: 'POST', 
    url: '/blogs/result_review.php',
	data: 'ord_kod='+kod+'&ord_email='+email+'&ord_name='+name+'&ord_mess='+mess+'&ord_item_kod='+item_kod,
    success: function(data) {		
	  out =  data.split('###');
	  var xxx = out[0];
      switch(xxx){
	    case '01':
		 var  data_error = out[1];
           $('#result_review').html(data_error);
	       $('#result_review').css("display","block");
	       $("#order_loading").css("display","none");
	       $("#review_submit").css("display","block");		
		break;
	    case '02':
	       var  data_success = out[1];
           $('#result_review').html(data_success);
	       $('#result_review').css("display","block");
	       $("form#reviewForm")[0].reset();
	       $("form#reviewForm").css("display","none");
		break;
	    case '03':
		 var  data_error = out[1];
           $('#result_review').html(data_error);
	       $('#result_review').css("display","block");	
	       $("#order_loading").css("display","none");
	       $("#review_submit").css("display","block");	
		   $("input#rw_kod").addClass("error");
		break;	
	    case '04':
		  location.href = "/index.php";	
		break;		
	          }
  },
     error: (function() { alert("Ошибка выполнения"); })
});	
}

  $(".btn-otvet").on("click", function(event){
	  event.preventDefault(); 
      event.stopPropagation(); 
	  var id = $(this).attr("date-id");
	  $("#otvet"+id).toggle();  	  
  });


  $(".del").click(function(){
    if (!confirm("Вы действительно хотите удалить этот ответ?")){
      return false;
    }
  });

    $("#delphoto_submit").click(function(){
    if (!confirm("Вы действительно хотите удалить это фото?")){
      return false;
    }
  });
  
  $(".btn-del-comment").click(function(){
    if (!confirm("Вы действительно хотите удалить этот комментарий?")){
      return false;
    }
  });
  
  
 $("#emailForm").validate({ 
  focusInvalid: false,   
  rules: {
    bl_email: {
      required: true,
      email: true
    }
  },
  messages: {		  
      bl_email: {
           required: "Поле обязательно для заполнения",
           email: "Некорректный E-mail"
          }	  
  }
});
  
  
 

});
