// JavaScript Document

var redisioUrl = ''; // 'http://redis.io';
var endHtml = '.html';
// 所以cmd命令集合
var cmdArr = new Array();
var allCmdArr = new Array();
// 命令组对应的关键字数组
var cmdKeyArr = new Array();

var cmdKeys = new Array();
var cmdString = new Array();
var cmdHashs = new Array();
var cmdLists = new Array();
var cmdSets = new Array();
var cmdSortedSets = new Array();
var cmdPubSub = new Array();
var cmdTransactions = new Array();
var cmdScripting = new Array();
var cmdConnection = new Array();
var cmdServer = new Array();

var curCommandObj = null;

// 定义 command 类
function Command(key,name,type,args,ver,desc) {
    this.key = key; // 命令key
	this.name = name; // 命令对应大写
	this.type = type; // 命令的分类
	this.args = args; // 命令后面参数信息
	this.ver = ver; // 命令加入时的版本
	this.desc = desc; // 命令简介
	
	this.getCommandsUrl = function () {		
		return redisioUrl+"/commands/"+this.key+endHtml;
	}
	
	// 获取命令在右侧li菜单中的代码
	this.getLiMenuHtml = function(isStrong){		 
		if(isStrong){
			return "<li><a href='"+this.getCommandsUrl()+"'><strong>"+this.name+"</strong></a></li>";
		}else{
			return "<li><a href='"+this.getCommandsUrl()+"'>"+this.name+"</a></li>";
		}
	}
	
	this.getdisqusUrl = function(){
		return 'http://redis.cn/commands/'+this.key + '.html';
	}
}

// 根据命令key查找一个命令对象
function findCommand(key){
	return allCmdArr[key];
}

// 根据命令key查找一个命令的类型
function getCommandType(key){
	return allCmdArr[key].type;
}

function initCommand(){
	var curUrl = window.location.href;
	var curCmd = curUrl.substring(curUrl.lastIndexOf("/")+1,curUrl.lastIndexOf("."));
	curCommandObj = findCommand(curCmd); // 获取命令对象
}

// 开始显示页面信息
function startShow(){
	document.title = curCommandObj.name + ' - 命令';
	$('#command_name_span').html('' + curCommandObj.name);
	$('#command_args_span').html('' + curCommandObj.args);
	$('#command_ver_span').html('' + curCommandObj.ver);
}

/**
 * 显示右侧的命令列表
 */
function showCmdURL(){	
	var cmdUrlHtml = '';
	
	var curUrl = window.location.href;
	var curCmd = curUrl.substring(curUrl.lastIndexOf("/")+1,curUrl.lastIndexOf("."));
	var command = findCommand(curCmd); // 获取命令对象
	
	cmdUrlHtml += ("          <h2>");
	cmdUrlHtml += ("            相关命令");
	cmdUrlHtml += ("          </h2>");
	cmdUrlHtml += ("          <ul>");
	
	
	for(var itemCmd in cmdArr[command.type]){	
	 	cmdUrlHtml += allCmdArr[itemCmd].getLiMenuHtml(curCmd == itemCmd);		
	}
	cmdUrlHtml += ("          </ul>");
	 
	document.write(cmdUrlHtml);
}

function showCommandsHtmlItem(key){
	var cmdUrlHtml = '';
	
	var command = findCommand(key); // 获取命令对象	
	var commandKey = cmdKeyArr[command.type]; // 获取分类关键字
	
	cmdUrlHtml += "<li data-group='"+commandKey+"'>";
    cmdUrlHtml += "<span class='command'>";
    cmdUrlHtml += "<a href='"+command.getCommandsUrl()+"'>"+command.name+"</a>";
    cmdUrlHtml += "<span class='args'>&nbsp;" + command.args + "</span>";  
    cmdUrlHtml += "</span>";
    cmdUrlHtml += "<span class='summary'>"+command.desc+"</span>";
    cmdUrlHtml += "</li>";
		
	document.write(cmdUrlHtml);
}




// 将命令组添加到集合
cmdArr['cmdKeys'] = cmdKeys;
cmdArr['cmdString'] = cmdString;
cmdArr['cmdHashs'] = cmdHashs;
cmdArr['cmdLists'] = cmdLists;
cmdArr['cmdSets'] = cmdSets;
cmdArr['cmdSortedSets'] = cmdSortedSets;
cmdArr['cmdPubSub'] = cmdPubSub;
cmdArr['cmdTransactions'] = cmdTransactions;
cmdArr['cmdScripting'] = cmdScripting;
cmdArr['cmdConnection'] = cmdConnection;
cmdArr['cmdServer'] = cmdServer;

cmdKeyArr['cmdKeys'] = 'generic';
cmdKeyArr['cmdString'] = 'string';
cmdKeyArr['cmdHashs'] = 'hash';
cmdKeyArr['cmdLists'] = 'list';
cmdKeyArr['cmdSets'] = 'set';
cmdKeyArr['cmdSortedSets'] = 'sorted_set';
cmdKeyArr['cmdPubSub'] = 'pubsub';
cmdKeyArr['cmdTransactions'] = 'transactions';
cmdKeyArr['cmdScripting'] = 'scripting';
cmdKeyArr['cmdConnection'] = 'connection';
cmdKeyArr['cmdServer'] = 'server';


// 初始化 keys 下的所有命令
allCmdArr['del']              =cmdKeys['del']                = new Command('del','DEL','cmdKeys','key [key ...]','1.0.0','删除一个key');
allCmdArr['dump']             =cmdKeys['dump']               = new Command('dump','DUMP','cmdKeys','key','2.6.0','导出key的值'); // w
allCmdArr['exists']           =cmdKeys['exists']             = new Command('exists','EXISTS','cmdKeys','key','1.0.0','查询一个key是否存在');
allCmdArr['expire']           =cmdKeys['expire']             = new Command('expire','EXPIRE','cmdKeys','key seconds','1.0.0','设置一个key的过期的秒数');
allCmdArr['expireat']         =cmdKeys['expireat']           = new Command('expireat','EXPIREAT','cmdKeys','key timestamp','1.2.0','设置一个UNIX时间戳的过期时间');
allCmdArr['keys']             =cmdKeys['keys']               = new Command('keys','KEYS','cmdKeys','pattern','1.0.0','查找所有匹配给定的模式的键');
allCmdArr['migrate']          =cmdKeys['migrate']            = new Command('migrate','MIGRATE','cmdKeys','host port key destination-db timeout','2.6.0','原子性的将key从redis的一个实例移到另一个实例'); // w
allCmdArr['move']             =cmdKeys['move']               = new Command('move','MOVE','cmdKeys','key db','1.0.0','移动一个key到另一个数据库');
allCmdArr['object']           =cmdKeys['object']             = new Command('object','OBJECT','cmdKeys','subcommand [arguments [arguments ...]]','2.2.3','检查内部的再分配对象');
allCmdArr['persist']          =cmdKeys['persist']            = new Command('persist','PERSIST','cmdKeys','key','2.2.0','移除key的过期时间');
allCmdArr['pexpire']          =cmdKeys['pexpire']            = new Command('pexpire','PEXPIRE','cmdKeys','key milliseconds','2.6.0','设置一个key的过期的毫秒数');
allCmdArr['pexpireat']        =cmdKeys['pexpireat']          = new Command('pexpireat','PEXPIREAT','cmdKeys','key milliseconds-timestamp','2.6.0','设置一个带毫秒的UNIX时间戳的过期时间');
allCmdArr['pttl']             =cmdKeys['pttl']               = new Command('pttl','PTTL','cmdKeys','key','2.6.0','获取key的有效毫秒数');
allCmdArr['randomkey']        =cmdKeys['randomkey']          = new Command('randomkey','RANDOMKEY','cmdKeys','','1.0.0','返回一个随机的key');
allCmdArr['rename']           =cmdKeys['rename']             = new Command('rename','RENAME','cmdKeys','key newkey','1.0.0','将一个key重命名');
allCmdArr['renamenx']         =cmdKeys['renamenx']           = new Command('renamenx','RENAMENX','cmdKeys','key newkey','1.0.0','重命名一个key,新的key必须是不存在的key');
allCmdArr['restore']          =cmdKeys['restore']            = new Command('restore','RESTORE','cmdKeys','key ttl serialized-value','2.6.0','Create a key using the provided serialized value, previously obtained using DUMP.');
allCmdArr['sort']             =cmdKeys['sort']               = new Command('sort','SORT','cmdKeys','key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]','1.0.0','对队列、集合、有序集合排序');
allCmdArr['ttl']              =cmdKeys['ttl']                = new Command('ttl','TTL','cmdKeys','key','1.0.0','获取key的有效时间（单位：秒）');
allCmdArr['type']             =cmdKeys['type']               = new Command('type','TYPE','cmdKeys','key','1.0.0','获取key的存储类型');

// 初始化 string 下的所有命令
allCmdArr['append']           =cmdString['append']           = new Command('append','APPEND','cmdString','key value','2.0.0','追加一个值到key上');
allCmdArr['bitcount']         =cmdString['bitcount']         = new Command('bitcount','BITCOUNT','cmdString','key [start] [end]','2.6.0','统计字符串指定起始位置的字节数');
allCmdArr['bitop']            =cmdString['bitop']            = new Command('bitop','BITOP','cmdString','operation destkey key [key ...]','2.6.0','Perform bitwise operations between strings');
allCmdArr['decr']             =cmdString['decr']             = new Command('decr','DECR','cmdString','key','1.0.0','整数原子减1');
allCmdArr['decrby']           =cmdString['decrby']           = new Command('decrby','DECRBY','cmdString','key decrement','1.0.0','原子减指定的整数');
allCmdArr['get']              =cmdString['get']              = new Command('get','GET','cmdString','key','1.0.0','获取key的值');
allCmdArr['getbit']           =cmdString['getbit']           = new Command('getbit','GETBIT','cmdString','key offset','2.2.0','返回位的值存储在关键的字符串值的偏移量。');
allCmdArr['getrange']         =cmdString['getrange']         = new Command('getrange','GETRANGE','cmdString','key start end','2.4.0','获取存储在key上的值的一个子字符串');
allCmdArr['getset']           =cmdString['getset']           = new Command('getset','GETSET','cmdString','key value','1.0.0','设置一个key的value，并获取设置前的值');
allCmdArr['incr']             =cmdString['incr']             = new Command('incr','INCR','cmdString','key','1.0.0','执行原子加1操作');
allCmdArr['incrby']           =cmdString['incrby']           = new Command('incrby','INCRBY','cmdString','key increment','1.0.0','执行原子增加一个整数');
allCmdArr['incrbyfloat']      =cmdString['incrbyfloat']      = new Command('incrbyfloat','INCRBYFLOAT','cmdString','key increment','2.6.0','执行原子增加一个浮点数');
allCmdArr['mget']             =cmdString['mget']             = new Command('mget','MGET','cmdString','key [key ...]','1.0.0','获得所有key的值');
allCmdArr['mset']             =cmdString['mset']             = new Command('mset','MSET','cmdString','key value [key value ...]','1.0.1','设置多个key value');
allCmdArr['msetnx']           =cmdString['msetnx']           = new Command('msetnx','MSETNX','cmdString','key value [key value ...]','1.0.1','设置多个key value,仅当key存在时');
allCmdArr['psetex']           =cmdString['psetex']           = new Command('psetex','PSETEX','cmdString','key milliseconds value','2.6.0','Set the value and expiration in milliseconds of a key');
allCmdArr['set']              =cmdString['set']              = new Command('set','SET','cmdString','key value','1.0.0','设置一个key的value值');
allCmdArr['setbit']           =cmdString['setbit']           = new Command('setbit','SETBIT','cmdString','key offset value','2.2.0','Sets or clears the bit at offset in the string value stored at key');
allCmdArr['setex']            =cmdString['setex']            = new Command('setex','SETEX','cmdString','key seconds value','2.0.0','设置key-value并设置过期时间（单位：秒）');
allCmdArr['setnx']            =cmdString['setnx']            = new Command('setnx','SETNX','cmdString','key value','1.0.0','设置的一个关键的价值，只有当该键不存在');
allCmdArr['setrange']         =cmdString['setrange']         = new Command('setrange','SETRANGE','cmdString','key offset value','2.2.0','Overwrite part of a string at key starting at the specified offset');
allCmdArr['strlen']           =cmdString['strlen']           = new Command('strlen','STRLEN','cmdString','key','2.2.0','获取指定key值的长度');

// 初始化 hash 下的所有命令
allCmdArr['hdel']             =cmdHashs['hdel']              = new Command('hdel','HDEL','cmdHashs','key field [field ...]','2.0.0','删除一个或多个哈希域');
allCmdArr['hexists']          =cmdHashs['hexists']           = new Command('hexists','HEXISTS','cmdHashs','key field','2.0.0','判断给定域是否存在于哈希集中');
allCmdArr['hget']             =cmdHashs['hget']              = new Command('hget','HGET','cmdHashs','key field','2.0.0','读取哈希域的的值');
allCmdArr['hgetall']          =cmdHashs['hgetall']           = new Command('hgetall','HGETALL','cmdHashs','key','2.0.0','从哈希集中读取全部的域和值');
allCmdArr['hincrby']          =cmdHashs['hincrby']           = new Command('hincrby','HINCRBY','cmdHashs','key field increment','2.0.0','将哈希集中指定域的值增加给定的数字');
allCmdArr['hincrbyfloat']     =cmdHashs['hincrbyfloat']      = new Command('hincrbyfloat','HINCRBYFLOAT','cmdHashs','key field increment','2.6.0','将哈希集中指定域的值增加给定的浮点数');
allCmdArr['hkeys']            =cmdHashs['hkeys']             = new Command('hkeys','HKEYS','cmdHashs','key','2.0.0','获取hash的所有字段');
allCmdArr['hlen']             =cmdHashs['hlen']              = new Command('hlen','HLEN','cmdHashs','key','2.0.0','获取hash里所有字段的数量');
allCmdArr['hmget']            =cmdHashs['hmget']             = new Command('hmget','HMGET','cmdHashs','key field [field ...]','2.0.0','获取hash里面指定字段的值');
allCmdArr['hmset']            =cmdHashs['hmset']             = new Command('hmset','HMSET','cmdHashs','key field value [field value ...]','2.0.0','设置hash字段值');
allCmdArr['hset']             =cmdHashs['hset']              = new Command('hset','HSET','cmdHashs','key field value','2.0.0','设置hash里面一个字段的值');
allCmdArr['hsetnx']           =cmdHashs['hsetnx']            = new Command('hsetnx','HSETNX','cmdHashs','key field value','2.0.0','设置hash的一个字段，只有当这个字段不存在时有效');
allCmdArr['hvals']            =cmdHashs['hvals']             = new Command('hvals','HVALS','cmdHashs','key','2.0.0','获得hash的所有值');

// 初始化 connection 下的所有命令
allCmdArr['auth']             =cmdConnection['auth']         = new Command('auth','AUTH','cmdConnection','password','1.0.0','验证服务器');
allCmdArr['echo']             =cmdConnection['echo']         = new Command('echo','ECHO','cmdConnection','message','1.0.0','回显输入的字符串');
allCmdArr['ping']             =cmdConnection['ping']         = new Command('ping','PING','cmdConnection','','1.0.0','Ping 服务器');
allCmdArr['quit']             =cmdConnection['quit']         = new Command('quit','QUIT','cmdConnection','','1.0.0','关闭连接，退出');
allCmdArr['select']           =cmdConnection['select']       = new Command('select','SELECT','cmdConnection','index','1.0.0','选择数据库');

// 初始化 server 下的所有命令
allCmdArr['bgrewriteaof']     =cmdServer['bgrewriteaof']     = new Command('bgrewriteaof','BGREWRITEAOF','cmdServer','','1.0.0','异步重写追加文件');
allCmdArr['bgsave']           =cmdServer['bgsave']           = new Command('bgsave','BGSAVE','cmdServer','','1.0.0','异步保存数据集到磁盘上');
allCmdArr['client-getname']   =cmdServer['client-getname']   = new Command('client-getname','CLIENT GETNAME','cmdServer','','2.6.9','获得当前连接名称');
allCmdArr['client-kill']      =cmdServer['client-kill']      = new Command('client-kill','CLIENT KILL','cmdServer','ip:port','2.4.0','关闭客户端连接');
allCmdArr['client-list']      =cmdServer['client-list']      = new Command('client-list','CLIENT LIST','cmdServer','','2.4.0','获得客户端连接列表');
allCmdArr['client-setname']   =cmdServer['client-setname']   = new Command('client-setname','CLIENT SETNAME','cmdServer','connection-name','2.6.9','设置当前连接的名字');
allCmdArr['config-get']       =cmdServer['config-get']       = new Command('config-get','CONFIG GET','cmdServer','parameter','2.0.0','获取配置参数的值');
allCmdArr['config-resetstat'] =cmdServer['config-resetstat'] = new Command('config-resetstat','CONFIG RESETSTAT','cmdServer','','2.0.0','复位再分配使用info命令报告的统计');
allCmdArr['config-set']       =cmdServer['config-set']       = new Command('config-set','CONFIG SET','cmdServer','parameter value','2.0.0','获取配置参数的值');
allCmdArr['dbsize']           =cmdServer['dbsize']           = new Command('dbsize','DBSIZE','cmdServer','','1.0.0','返回当前数据库里面的keys数量');
allCmdArr['debug-object']     =cmdServer['debug-object']     = new Command('debug-object','DEBUG OBJECT','cmdServer','key','1.0.0','获取一个key的debug信息');
allCmdArr['debug-segfault']   =cmdServer['debug-segfault']   = new Command('debug-segfault','DEBUG SEGFAULT','cmdServer','','1.0.0','使服务器崩溃');
allCmdArr['flushall']         =cmdServer['flushall']         = new Command('flushall','FLUSHALL','cmdServer','','1.0.0','清空所有数据库');
allCmdArr['flushdb']          =cmdServer['flushdb']          = new Command('flushdb','FLUSHDB','cmdServer','','1.0.0','清空当前的数据库');
allCmdArr['info']             =cmdServer['info']             = new Command('info','INFO','cmdServer','[section]','1.0.0','获得服务器的详细信息');
allCmdArr['lastsave']         =cmdServer['lastsave']         = new Command('lastsave','LASTSAVE','cmdServer','','1.0.0','获得最后一次同步磁盘的时间');
allCmdArr['monitor']          =cmdServer['monitor']          = new Command('monitor','MONITOR','cmdServer','','1.0.0','实时监控服务器');
allCmdArr['save']             =cmdServer['save']             = new Command('save','SAVE','cmdServer','','1.0.0','同步数据到磁盘上');
allCmdArr['shutdown']         =cmdServer['shutdown']         = new Command('shutdown','SHUTDOWN','cmdServer','[NOSAVE] [SAVE]','1.0.0','关闭服务');
allCmdArr['slaveof']          =cmdServer['slaveof']          = new Command('slaveof','SLAVEOF','cmdServer','host port','1.0.0','指定当前服务器的主服务器');
allCmdArr['slowlog']          =cmdServer['slowlog']          = new Command('slowlog','SLOWLOG','cmdServer','subcommand [argument]','2.2.12','管理再分配的慢查询日志');
allCmdArr['sync']             =cmdServer['sync']             = new Command('sync','SYNC','cmdServer','','1.0.0','用于复制的内部命令');
allCmdArr['time']             =cmdServer['time']             = new Command('time','TIME','cmdServer','','2.6.0','返回当前服务器时间');

// 初始化 list 下的所有命令
allCmdArr['blpop']            =cmdLists['blpop']             = new Command('blpop','BLPOP','cmdLists','key [key ...] timeout','2.0.0','删除，并获得该列表中的第一元素，或阻塞，直到有一个可用');
allCmdArr['brpop']            =cmdLists['brpop']             = new Command('brpop','BRPOP','cmdLists','key [key ...] timeout','2.0.0','删除，并获得该列表中的最后一个元素，或阻塞，直到有一个可用');
allCmdArr['brpoplpush']       =cmdLists['brpoplpush']        = new Command('brpoplpush','BRPOPLPUSH','cmdLists','source destination timeout','2.2.0','弹出一个列表的值，将它推到另一个列表，并返回它;或阻塞，直到有一个可用');
allCmdArr['lindex']           =cmdLists['lindex']            = new Command('lindex','LINDEX','cmdLists','key index','1.0.0','获取一个元素，通过其索引列表');
allCmdArr['linsert']          =cmdLists['linsert']           = new Command('linsert','LINSERT','cmdLists','key BEFORE|AFTER pivot value','2.2.0','在列表中的另一个元素之前或之后插入一个元素');
allCmdArr['llen']             =cmdLists['llen']              = new Command('llen','LLEN','cmdLists','key','1.0.0','获得队列(List)的长度');
allCmdArr['lpop']             =cmdLists['lpop']              = new Command('lpop','LPOP','cmdLists','key','1.0.0','从队列的左边出队一个元素');
allCmdArr['lpush']            =cmdLists['lpush']             = new Command('lpush','LPUSH','cmdLists','key value [value ...]','1.0.0','从队列的左边入队一个或多个元素');
allCmdArr['lpushx']           =cmdLists['lpushx']            = new Command('lpushx','LPUSHX','cmdLists','key value','2.2.0','当队列存在时，从队到左边入队一个元素');
allCmdArr['lrange']           =cmdLists['lrange']            = new Command('lrange','LRANGE','cmdLists','key start stop','1.0.0','从列表中获取指定返回的元素');
allCmdArr['lrem']             =cmdLists['lrem']              = new Command('lrem','LREM','cmdLists','key count value','1.0.0','从列表中删除元素');
allCmdArr['lset']             =cmdLists['lset']              = new Command('lset','LSET','cmdLists','key index value','1.0.0','设置队列里面一个元素的值');
allCmdArr['ltrim']            =cmdLists['ltrim']             = new Command('ltrim','LTRIM','cmdLists','key start stop','1.0.0','修剪到指定范围内的清单');
allCmdArr['rpop']             =cmdLists['rpop']              = new Command('rpop','RPOP','cmdLists','key','1.0.0','从队列的右边出队一个元素');
allCmdArr['rpoplpush']        =cmdLists['rpoplpush']         = new Command('rpoplpush','RPOPLPUSH','cmdLists','source destination','1.2.0','删除列表中的最后一个元素，将其追加到另一个列表');
allCmdArr['rpush']            =cmdLists['rpush']             = new Command('rpush','RPUSH','cmdLists','key value [value ...]','1.0.0','从队列的右边入队一个元素');
allCmdArr['rpushx']           =cmdLists['rpushx']            = new Command('rpushx','RPUSHX','cmdLists','key value','2.2.0','从队列的右边入队一个元素，仅队列存在时有效');

// 初始化 transactions 下的所有命
allCmdArr['discard']          =cmdTransactions['discard']     = new Command('discard','DISCARD','cmdTransactions','','2.0.0','丢弃所有 MULTI 之后发的命令');
allCmdArr['exec']             =cmdTransactions['exec']        = new Command('exec','EXEC','cmdTransactions','','1.2.0','执行所有 MULTI 之后发的命令');
allCmdArr['multi']            =cmdTransactions['multi']       = new Command('multi','MULTI','cmdTransactions','','1.2.0','标记一个事务块开始');
allCmdArr['unwatch']          =cmdTransactions['unwatch']     = new Command('unwatch','UNWATCH','cmdTransactions','','2.2.0','取消事务');
allCmdArr['watch']            =cmdTransactions['watch']       = new Command('watch','WATCH','cmdTransactions','key [key ...]','2.2.0','锁定key直到执行了 MULTI/EXEC 命令');

// 初始化 sets 下的所有命
allCmdArr['sadd']             =cmdSets['sadd']                = new Command('sadd','SADD','cmdSets','key member [member ...]','1.0.0','添加一个或者多个元素到集合(set)里');
allCmdArr['scard']            =cmdSets['scard']               = new Command('scard','SCARD','cmdSets','key','1.0.0','获取集合里面的元素数量');
allCmdArr['sdiff']            =cmdSets['sdiff']               = new Command('sdiff','SDIFF','cmdSets','key [key ...]','1.0.0','获得队列不存在的元素');
allCmdArr['sdiffstore']       =cmdSets['sdiffstore']          = new Command('sdiffstore','SDIFFSTORE','cmdSets','destination key [key ...]','1.0.0','获得队列不存在的元素，并存储在一个关键的结果集');
allCmdArr['sinter']           =cmdSets['sinter']              = new Command('sinter','SINTER','cmdSets','key [key ...]','1.0.0','获得两个集合的交集');
allCmdArr['sinterstore']      =cmdSets['sinterstore']         = new Command('sinterstore','SINTERSTORE','cmdSets','destination key [key ...]','1.0.0','获得两个集合的交集，并存储在一个关键的结果集');
allCmdArr['sismember']        =cmdSets['sismember']           = new Command('sismember','SISMEMBER','cmdSets','key member','1.0.0','确定一个给定的值是一个集合的成员');
allCmdArr['smembers']         =cmdSets['smembers']            = new Command('smembers','SMEMBERS','cmdSets','key','1.0.0','获取集合里面的所有key');
allCmdArr['smove']            =cmdSets['smove']               = new Command('smove','SMOVE','cmdSets','source destination member','1.0.0','移动集合里面的一个key到另一个集合');
allCmdArr['spop']             =cmdSets['spop']                = new Command('spop','SPOP','cmdSets','key','1.0.0','删除并获取一个集合里面的元素');
allCmdArr['srandmember']      =cmdSets['srandmember']         = new Command('srandmember','SRANDMEMBER','cmdSets','key [count]','1.0.0','从集合里面随机获取一个key');
allCmdArr['srem']             =cmdSets['srem']                = new Command('srem','SREM','cmdSets','key member [member ...]','1.0.0','从集合里删除一个或多个key');
allCmdArr['sunion']           =cmdSets['sunion']              = new Command('sunion','SUNION','cmdSets','key [key ...]','1.0.0','添加多个set元素');
allCmdArr['sunionstore']      =cmdSets['sunionstore']         = new Command('sunionstore','SUNIONSTORE','cmdSets','destination key [key ...]','1.0.0','合并set元素，并将结果存入新的set里面');

// 初始化 sorted sets 下的所有命
allCmdArr['zadd']   =cmdSortedSets['zadd'] = new Command('zadd','ZADD','cmdSortedSets','key score member [score member ...]','1.2.0','添加到有序set的一个或多个成员，或更新的分数，如果它已经存在');
allCmdArr['zcard']   =cmdSortedSets['zcard'] = new Command('zcard','ZCARD','cmdSortedSets','key','1.2.0','获取一个排序的集合中的成员数量');
allCmdArr['zcount']   =cmdSortedSets['zcount'] = new Command('zcount','ZCOUNT','cmdSortedSets','key min max','2.0.0','给定值范围内的成员数与分数排序');
allCmdArr['zincrby']   =cmdSortedSets['zincrby'] = new Command('zincrby','ZINCRBY','cmdSortedSets','key increment member','1.2.0','增量的一名成员在排序设置的评分');
allCmdArr['zinterstore']   =cmdSortedSets['zinterstore'] = new Command('zinterstore','ZINTERSTORE','cmdSortedSets','destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]','2.0.0','相交多个排序集，导致排序的设置存储在一个新的关键');
allCmdArr['zrange']   =cmdSortedSets['zrange'] = new Command('zrange','ZRANGE','cmdSortedSets','key start stop [WITHSCORES]','1.2.0','返回的成员在排序设置的范围，由指数');
allCmdArr['zrangebyscore']   =cmdSortedSets['zrangebyscore'] = new Command('zrangebyscore','ZRANGEBYSCORE','cmdSortedSets','key min max [WITHSCORES] [LIMIT offset count]','1.0.5','返回的成员在排序设置的范围，由得分');
allCmdArr['zrank']   =cmdSortedSets['zrank'] = new Command('zrank','ZRANK','cmdSortedSets','key member','2.0.0','确定在排序集合成员的索引');
allCmdArr['zrem']   =cmdSortedSets['zrem'] = new Command('zrem','ZREM','cmdSortedSets','key member [member ...]','1.2.0','从排序的集合中删除一个或多个成员');
allCmdArr['zremrangebyrank']   =cmdSortedSets['zremrangebyrank'] = new Command('zremrangebyrank','ZREMRANGEBYRANK','cmdSortedSets','key start stop','2.0.0','在排序设置的所有成员在给定的索引中删除');
allCmdArr['zremrangebyscore']   =cmdSortedSets['zremrangebyscore'] = new Command('zremrangebyscore','ZREMRANGEBYSCORE','cmdSortedSets','key min max','1.2.0','删除一个排序的设置在给定的分数所有成员');
allCmdArr['zrevrange']   =cmdSortedSets['zrevrange'] = new Command('zrevrange','ZREVRANGE','cmdSortedSets','key start stop [WITHSCORES]','1.2.0','在排序的设置返回的成员范围，通过索引，下令从分数高到低');
allCmdArr['zrevrangebyscore']   =cmdSortedSets['zrevrangebyscore'] = new Command('zrevrangebyscore','ZREVRANGEBYSCORE','cmdSortedSets','key max min [WITHSCORES] [LIMIT offset count]','2.2.0','返回的成员在排序设置的范围，由得分，下令从分数高到低');
allCmdArr['zrevrank']   =cmdSortedSets['zrevrank'] = new Command('zrevrank','ZREVRANK','cmdSortedSets','key member','2.0.0','确定指数在排序集的成员，下令从分数高到低');
allCmdArr['zscore']   =cmdSortedSets['zscore'] = new Command('zscore','ZSCORE','cmdSortedSets','key member','1.2.0','获取成员在排序设置相关的比分');
allCmdArr['zunionstore']   =cmdSortedSets['zunionstore'] = new Command('zunionstore','ZUNIONSTORE','cmdSortedSets','destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]','2.0.0','添加多个排序集和导致排序的设置存储在一个新的关键');

// 初始化 pub/sub 下的所有命
allCmdArr['psubscribe']   =cmdPubSub['psubscribe'] = new Command('psubscribe','PSUBSCRIBE','cmdPubSub','pattern [pattern ...]','2.0.0','听出版匹配给定模式的渠道的消息');
allCmdArr['publish']   =cmdPubSub['publish'] = new Command('publish','PUBLISH','cmdPubSub','channel message','2.0.0','发布一条消息到频道');
allCmdArr['punsubscribe']   =cmdPubSub['punsubscribe'] = new Command('punsubscribe','PUNSUBSCRIBE','cmdPubSub','[pattern [pattern ...]]','2.0.0','停止发布到匹配给定模式的渠道的消息听');
allCmdArr['subscribe']   =cmdPubSub['subscribe'] = new Command('subscribe','SUBSCRIBE','cmdPubSub','channel [channel ...]','2.0.0','聆听发布途径的消息');
allCmdArr['unsubscribe']   =cmdPubSub['unsubscribe'] = new Command('unsubscribe','UNSUBSCRIBE','cmdPubSub','[channel [channel ...]]','2.0.0','停止发布途径的消息听');

// 初始化 script 下的所有命
allCmdArr['eval']   =cmdScripting['eval'] = new Command('eval','EVAL','cmdScripting','script numkeys key [key ...] arg [arg ...]','2.6.0','在服务器端执行 LUA 脚本');
allCmdArr['evalsha']   =cmdScripting['evalsha'] = new Command('evalsha','EVALSHA','cmdScripting','sha1 numkeys key [key ...] arg [arg ...]','2.6.0','在服务器端执行 LUA 脚本');
allCmdArr['script-exists']   =cmdScripting['script-exists'] = new Command('script-exists','SCRIPT EXISTS','cmdScripting','script [script ...]','2.6.0','Check existence of scripts in the script cache.');
allCmdArr['script-flush']   =cmdScripting['script-flush'] = new Command('script-flush','SCRIPT FLUSH','cmdScripting','','2.6.0','删除服务器缓存中所有Lua脚本。');
allCmdArr['script-kill']   =cmdScripting['script-kill'] = new Command('script-kill','SCRIPT KILL','cmdScripting','','2.6.0','杀死当前正在运行的 Lua 脚本。');
allCmdArr['script-load']   =cmdScripting['script-load'] = new Command('script-load','SCRIPT LOAD','cmdScripting','script','2.6.0','从服务器缓存中装载一个Lua脚本。');

// 初始化当前的command();
initCommand();
