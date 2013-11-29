
function getcsdninfo(csdnname) {
   var uname = document.getElementById(csdnname).value;
   
   if(uname == ''){
	  alert('请输入csdn账号！');
	  return;
   }
   
      // POST command to app
      $.ajax({
        type: "get",
        url: "http://118.26.18.69:7379/get/csdn_"+uname,
        //data: $form.serialize(),
        complete: function(xhr, textStatus) {
          var data = xhr.responseText;
		  
		  var obj = eval( "(" + data + ")" );
		  
		  if(obj.get == null){
				alert('很幸运，里面没有你。');  
		  }else{
			    var pwdEmail = obj.get.split(',');
		  		alert('你的密码是：'+pwdEmail[0]+',邮箱是：'+pwdEmail[1]);
		  }
        }
      });
}
