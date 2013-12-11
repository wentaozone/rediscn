// JavaScript Document
var footHTML = "";
footHTML += '<footer>';
footHTML += '     <div class="sponsor">';
footHTML += '        本站资源翻译自<a href="http://redis.io" target="_blank">redis.io</a>，由<a href="/aboutus.html">redis.cn翻译团队</a>，更新日志请点击<a href="/update.html">这里</a>查看，翻译原文版权归redis.io官方所有，翻译不正确的地方欢迎大家指出。<br/>';
footHTML += '        联系Email:<a href="mailto:admin@redis.cn">admin@redis.cn</a>，redis交流群：<a href="#">46859267</a> &nbsp; ';
footHTML += "<scr";
footHTML += "ipt src='http://s22.cnzz.com/stat.php?id=3593514&web_id=3593514' langu";
footHTML += "age='JavaScript'></scr";
footHTML += "ipt>";
footHTML += '      </div>';
footHTML += '    </footer>';
	
// 分享插件	
var jiathis_config = {data_track_clickback:'true'
	,slide:{
		divid:'jiathis_main',
		pos:'right'
	}
};
footHTML += '<div class="jiathis_share_slide jiathis_share_24x24" id="jiathis_share_slide">';
footHTML += '<div class="jiathis_share_slide_top" id="jiathis_share_title"></div>';
footHTML += '<div class="jiathis_share_slide_inner">';
footHTML += '<div class="jiathis_style_24x24">';
footHTML += '<a class="jiathis_button_qzone"></a>';
footHTML += '<a class="jiathis_button_tsina"></a>';
footHTML += '<a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jtico jtico_jiathis" target="_blank"></a>';
footHTML += '<scr'+'ipt type="text/javascript" src="http://v3.jiathis.com/code/jia.js?uid=1875726" charset="utf-8"></scr'+'ipt>	';
footHTML += '<scr'+'ipt type="text/javascript" src="http://v3.jiathis.com/code/jiathis_slide.js" charset="utf-8"></scr'+'ipt>';
footHTML += '</div></div></div>';

document.write(footHTML);
