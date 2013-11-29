// JavaScript Document

function hiddenAddiv(){
	document.getElementById('showaddiv').style.display = 'none';
}

var adTHML = "";
adTHML += "     <div id='showaddiv' style='display:;height:100px;padding-top:100px;' class='text columns home sidebar'>";
adTHML += "          <h1>热烈庆祝 redis.cn 于 <font color='#cc0000'>2011 年 11 月 11 日 11 时 11 分</font> 正式上线<h1>";
adTHML += "      </div>";
document.write(adTHML);

setTimeout("hiddenAddiv()",5000);