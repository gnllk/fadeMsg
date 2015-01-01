/**
 * 淡入淡出消息
 * 需jQuery库支持
 * params option 配置{ message: "消息,可以是HTML", timeout: 超时，默认3000毫秒, complete: 超时回调function () { }, position: 位置"top"或"bottom" }
 */
function fadeMsg(option) {
	var setting = $.extend({
		message: "",
		timeout: 3000,
		complete: undefined,
		position: "top",
		css: {
			display: 'block',
			padding: "10px",
			fontsize: '16px',
			width: 'auto',
			textAlign: 'center'
		},
		boxCss: {
			position: 'fixed',
			display: 'none',
			width: '100%',
			color: '#fff',
			fontSize: '16px',
			background: '#000',
			filter: 'alpha(opacity=70)',
			mozOpacity: 0.7,
			opacity: 0.7,
			padding: 0,
			margin: 0,
			textAlign: 'center'
		}
	}, option);
	var $msg = $("#com_gnllk_fade_msg");
	if ($msg.length > 0) {
		$msg.html(setting.message, setting.boxCss);
	} else {
		var $box = $('<div></div>');
		$.extend(true, $box.get(0).style, setting.boxCss);
		$box.css(setting.position, '0');
		$msg = $('<div id="com_gnllk_fade_msg"></div>');
		$.extend(true, $msg.get(0).style, setting.css);
		$box.append($msg);
		$("body").append($box);
		$msg.html(setting.message);
	}
	if (!$._fadeMsg) $._fadeMsg = {};
	if ($._fadeMsg.timeoutID) clearTimeout($._fadeMsg.timeoutID);
	$msg.parent().slideDown();
	$._fadeMsg.timeoutID = setTimeout(function() {
		$msg.parent().slideUp();
		if (setting.complete && typeof(setting.complete) == "function") setting.complete();
	}, setting.timeout);
}