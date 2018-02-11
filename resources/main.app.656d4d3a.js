function fnPushWxTicket(a, b, c) {
	wx.addCard({
		cardList: [{
			cardId: a,
			cardExt: b
		}],
		success: function(a) {
			var b = a.cardList;
			c && c(!0, b)
		},
		fail: function(a) {
			c && c(!1, a)
		}
	})
}

function fnAddScroll(a, b) {
	var c = null;
	setTimeout(function() {
		c = new iScroll(a, {
			checkDOMChanges: !0,
			bounce: !1,
			bounceLock: !1,
			hScrollbar: !1,
			onBeforeScrollStart: function(a) {
				a.stopPropagation()
			}
		}), b && b(c)
	}, 100)
}

function compileHtml(a, b) {
	template.config("escape", !1);
	var c = template.compile(a);
	return c(b)
}

function fnLoadProcessPage() {
	var a = '<div id="rrx-process-dialog"></div>',
		b = '<div class="dialog-container"><div class="dialog-container-loader"><div class="loader-inner line-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div><div class="dialog-container-process">请稍后</div></div>\n',
		c = compileHtml(b, {});
	return 0 === $("#rrx-process-dialog").length && ($("#main").append(a), $("#rrx-process-dialog").html(c)), $("#rrx-process-dialog")
}

function fnShowProcess(a) {
	var b = fnLoadProcessPage();
	b && (a = a || "请稍等", b.find(".dialog-container-loader >div").addClass("line-spin-fade-loader"), b.find(".dialog-container-process").html(a), b.show())
}

function fnHideProcess() {
	var a = fnLoadProcessPage();
	a && (a.find(".dialog-container-loader >div").removeClass("line-spin-fade-loader"), a.find(".dialog-container-process").html("请稍等"), a.hide())
}

function fnLoadTipsPage() {
	var a = '<div id="rrx-tips-dialog"><span>请稍等</span></div>',
		b = compileHtml(a, {});
	return 0 === $("#rrx-tips-dialog").length && $("#main").append(b), $("#rrx-tips-dialog")
}

function fnShowTips(a) {
	var b = fnLoadTipsPage();
	b && (a = a || "请稍等", b.find("span").html(a), b.css("z-index", 3e4), b.css("visibility", "visible"), b.addClass("fadeIn"), b.show())
}

function fnHideTips() {
	var a = fnLoadTipsPage();
	a && (a.removeClass("fadeout"), a.css("visibility", "hidden"), a.hide())
}

function fnColorThin(a, b) {
	return a.length > 7 ? shadeRGBColor(a, b) : shadeColor2(a, b)
}

function shadeColor2(a, b) {
	var c = parseInt(a.slice(1), 16),
		d = 0 > b ? 0 : 255,
		e = 0 > b ? -1 * b : b,
		f = c >> 16,
		g = c >> 8 & 255,
		h = 255 & c;
	return "#" + (16777216 + 65536 * (Math.round((d - f) * e) + f) + 256 * (Math.round((d - g) * e) + g) + (Math.round((d - h) * e) + h)).toString(16).slice(1)
}

function shadeRGBColor(a, b) {
	var c = a.split(","),
		d = 0 > b ? 0 : 255,
		e = 0 > b ? -1 * b : b,
		f = parseInt(c[0].slice(4)),
		g = parseInt(c[1]),
		h = parseInt(c[2]);
	return "rgb(" + (Math.round((d - f) * e) + f) + "," + (Math.round((d - g) * e) + g) + "," + (Math.round((d - h) * e) + h) + ")"
}

function showPrizeInfoDialog(a, b, c, d, e, f) {
	function g() {
		w.find(".content-info-inner").html(b), w.find(".dialog-content").removeClass("bounceOutUpAni").addClass("bounceInUpAni"), w.show()
	}

	function h(a) {
		w.find(".dialog-content").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), setTimeout(function() {
			w.hide(), a && a()
		}, 600)
	}

	function i() {
		z.off().on(x, function(a) {
			h(function() {
				d && (y.event = "sureEvent", y.result = 0, d(y))
			})
		}), A.off().on(x, function(a) {
			a.preventDefault(), h(function() {
				d && (y.event = "closeEvent", y.result = 0, d(y))
			})
		})
	}
	var j = a,
		k = j.getWsiteCanvas().find(".pt-inner"),
		l = a.getLibHost(),
		m = "rrx-prizeinfo-dialog",
		n = '<div class="' + m + '"></div>',
		o = '<div class="dialog-content" style="{{dialogBorder}}"><div class="content-close"><img class="content-close-img" src="{{closeImage}}"></div><div class="content-info"><div class="content-info-inner" style="color:{{textColor}}"></div></div><div class="content-action btn-border-40" style="{{actionCss}}">{{btn}}</div></div>\n',
		p = "background-color:#fff;border:4px solid  " + c + " ;",
		q = fnColorThin(c, .4),
		r = "background-color:" + c + ";box-shadow: 2px 12px 1Px " + q + " ;",
		s = l + "weplus/image/close.png",
		t = c,
		u = pageSkin.knowBtn;
	e && f && (u = compileHtml(pageSkin.changeLinkBtn, {
		linkUrl: f,
		linkName: e
	}));
	var v = compileHtml(o, {
			dialogBorder: p,
			closeImage: s,
			textColor: t,
			actionCss: r,
			btn: u
		}),
		w = k.find("." + m);
	0 === w.length && (k.append(n), w = k.find("." + m)), w.html(v);
	var x = "click",
		y = {
			event: "ticketEvent",
			result: 0
		},
		z = w.find(".content-action"),
		A = w.find(".content-close-img");
	i(), g()
}

function fnThridPrize(a, b) {
	return b ? void a.urlAuditVisit(b) : void winAlert("奖品链接不可用")
}

function showWinPrizeDialog(a, b, c, d) {
	function e() {
		A.find(".winTest svg path").css({
			fill: c
		}), A.find(".winTest svg  g path").css({
			fill: "#fff"
		}), A.find(".winTest svg polygon").eq(1).css({
			fill: c
		}), A.find(".dialog-content").css({
			background: "linear-gradient(to bottom, " + n + " 0%," + c + " 100%)"
		}), A.find(".content-action").find("svg path").css({
			fill: c
		}), A.find(".winPrize-dialog-content").removeClass("bounceOutUpAni").addClass("bounceInUpAni"), A.show()
	}

	function f(a) {
		A.find(".winPrize-dialog-content").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), setTimeout(function() {
			A.hide(), a && a()
		}, 600)
	}

	function g() {
		D.off().on(B, function(a) {
			a.preventDefault(), f(function() {
				d && (C.event = "getprizeEvent", C.result = 0, d(C))
			})
		}), E.off().on(B, function(a) {
			a.preventDefault(), f(function() {
				d && (C.event = "giveupEvent", C.result = 0, d(C))
			})
		})
	}
	var h = a,
		i = h.getWsiteCanvas().find(".pt-inner"),
		j = a.getLibHost(),
		k = "rrx-prizewin-dialog",
		l = '<div class="' + k + '"></div>',
		m = '<div class="winPrize-dialog-content"><div class="content-close"><img class="content-close-img" src="{{closeImage}}"></div><div class="dialog-content"><div class="dialog-content-img" style="background-image:url({{bgImage}})"><div class="content-box-star" style="background-image:url({{winTag}})"></div><div class="content-box"><div class="content-box-head"><div class="winTest" style="width:400px;height:118px;margin:0 auto">{{winText}}</div></div><img class="content-box-body-headImg" src="{{prizeTop}}"><div class="content-box-body"><div class="noPrize-info"><img src="{{prizeImage}}"></div><div class="winPrize-line" style="border-color:{{textColor}}"></div><div class="winPrize-title" style="color:{{textColor}}">{{pirzeTitle}}</div></div><div class="content-box-foot"><div class="content-action btn-border-40" style="{{actionCss}}">{{btn}}</div></div></div>{{ if hasShare}}<div class="content-share">分享后获得一次抽奖机会</div>{{/if}}</div></div></div>\n',
		n = fnColorThin(c, .4),
		o = "background-color:#fff;box-shadow: 2px 12px 1Px #ccc ;",
		p = j + "weplus/image/close.png",
		q = j + "weplus/image/prizeBg1.png",
		r = j + "weplus/image/winPrizeStar.png",
		s = j + "weplus/image/prizeInfoBg1.png",
		t = pageSkin.winTest,
		u = c,
		v = b.name || "",
		w = b.image || "http://image3.weplus.me/2016/07/20/1468986497159.png",
		x = b.hasShare,
		y = pageSkin.getBtn,
		z = compileHtml(m, {
			closeImage: p,
			bgImage: q,
			winTag: r,
			winText: t,
			pirzeTitle: v,
			prizeImage: w,
			prizeTop: s,
			textColor: u,
			actionCss: o,
			btn: y,
			hasShare: x
		}),
		A = i.find("." + k);
	0 === A.length && (i.append(l), A = i.find("." + k)), A.html(z);
	var B = "click",
		C = {
			event: "closeEvent",
			result: 0
		},
		D = A.find(".content-action"),
		E = A.find(".content-close-img");
	g(), e()
}

function showNoPrizeDialog(a, b, c, d) {
	function e() {
		A.find("svg path").css({
			fill: c
		}), A.find(".loseTest svg path").css({
			fill: c
		}), A.find(".loseTest svg g path").css({
			fill: "#fff"
		}), A.find(".dialog-content").css({
			background: "linear-gradient(to bottom, " + n + " 0%," + c + " 100%)"
		}), A.find(".content-action").find("svg path").css({
			fill: c
		}), A.find(".noPrize-dialog-content").removeClass("bounceOutUpAni").addClass("bounceInUpAni"), A.show()
	}

	function f(a) {
		A.find(".noPrize-dialog-content").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), setTimeout(function() {
			A.hide(), a && a()
		}, 600)
	}

	function g() {
		D.off().on(B, function(a) {
			a.preventDefault(), f(function() {
				d && (C.event = "closeEvent", C.result = 0, d(C))
			})
		}), E.off().on(B, function(a) {
			a.preventDefault(), f(function() {
				d && (C.event = "closeEvent", C.result = 0, d(C))
			})
		})
	}
	var h = a,
		i = h.getWsiteCanvas().find(".pt-inner"),
		j = a.getLibHost(),
		k = "rrx-prizeno-dialog",
		l = '<div class="' + k + '"></div>',
		m = '<div class="noPrize-dialog-content"><div class="content-close"><img class="content-close-img" src="{{closeImage}}"></div><div class="dialog-content"><div class="dialog-content-img" style="background-image:url({{bgImage}})"><div class="content-box"><div class="content-box-head"><div class="loseTest" style="width:376px;height:108px;margin:0 auto">{{lostTag}}</div></div><img class="content-box-body-headImg" src="{{prizeTop}}"><div class="content-box-body"><div style="display:table;margin:0 auto"><div class="noPrize-info" style="display:table-cell;vertical-align:middle;font-size:{{fontSize}}px">{{content}}</div></div><div class="noPrize-cry" style="border-top-color:{{thinColor}}">{{failText}}</div></div><div class="content-box-foot"><div class="content-action btn-border-40" style="{{actionCss}}">{{btn}}</div></div></div>{{ if hasShare}}<div class="content-share">分享后获得一次抽奖机会</div>{{/if}}</div></div></div>\n',
		n = fnColorThin(c, .4),
		o = "background-color:#fff;box-shadow: 2px 12px 1Px " + n + " ;",
		p = j + "weplus/image/close.png",
		q = j + "weplus/image/prizeBg1.png",
		r = j + "weplus/image/prizeInfoBg1.png",
		s = pageSkin.cry,
		t = pageSkin.knowBtn,
		u = pageSkin.loseTest,
		v = c,
		w = 50,
		x = b.content;
	x && (x.length > 6 && x.length <= 12 ? w = 40 : x.length > 12 && (w = 30));
	var y = b.hasShare,
		z = compileHtml(m, {
			closeImage: p,
			bgImage: q,
			failText: s,
			lostTag: u,
			prizeTop: r,
			textColor: v,
			thinColor: n,
			actionCss: o,
			content: x,
			fontSize: w,
			btn: t,
			hasShare: y
		}),
		A = i.find("." + k);
	0 === A.length && (i.append(l), A = i.find("." + k)), A.html(z);
	var B = "click",
		C = {
			event: "closeEvent",
			result: 0
		},
		D = A.find(".content-action"),
		E = A.find(".content-close-img");
	g(), e()
}

function showGetPrizeDialog(a, b, c, d, e) {
	function f() {
		C.find(".prizeget-dialog-content").removeClass("bounceOutUpAni").addClass("bounceInUpAni"), C.show()
	}

	function g(a) {
		C.find(".prizeget-dialog-content").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), setTimeout(function() {
			C.hide(), a && a()
		}, 600)
	}

	function h() {
		G.off().on(E, function(a) {
			a.preventDefault();
			var b = o();
			b && g(function() {
				d && (F.event = "submitEvent", F.result = b, d(F))
			})
		}), H.off().on(E, function(a) {
			a.preventDefault();
			var b = m(C);
			if(l(b)) {
				var c = C.find(".btn-smscode"),
					d = C.find(".input-award-smscode");
				k(b, c, d)
			} else winAlert("请输入正确的手机号码！")
		}), I.off().on(E, function(a) {
			a.preventDefault(), g(function() {
				d && (F.event = "giveupEvent", F.result = 0, d(F))
			})
		})
	}

	function i(a) {
		J = 60, a.html(J + "s"), a.css("background-color", "#e7e7e7"), a.css("color", "#686868"), D = setInterval(function() {
			J -= 1, 0 === J ? j(a) : a.html(J + "s")
		}, 1e3)
	}

	function j(a) {
		D && clearInterval(D), a.html("获取验证码"), a.css("background-color", c), a.css("color", "#fff")
	}

	function k(a, b, c) {
		if(0 === J) {
			var d = p.getInteractServiceHost(),
				e = p.getWsiteGuid();
			verifyAlert(d, e, a, "", function(a) {
				a.isVerify && i(b)
			})
		}
	}

	function l(a) {
		var b = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
		return b.test(a) ? !0 : !1
	}

	function m(a) {
		for(var b = y, c = 0; c < b.length; c++)
			if("telephone" === b[c].type && "手机" === b[c].name) {
				var d = a.find(".input-award-" + b[c].id);
				return d.val()
			}
		return ""
	}

	function n(a) {
		var b = [],
			c = [];
		if(a) {
			c = "string" == typeof a ? JSON.parse(a) : a;
			for(var d = 0; d < c.length; d++)("true" == c[d].display || c[d].display === !0) && b.push(c[d])
		}
		return b
	}

	function o() {
		for(var a = [], b = y, c = "", d = 0; d < b.length; d++) {
			var e = C.find(".input-award-" + b[d].id),
				f = e.val().trim();
			if(!f) return winAlert(b[d].name + "不能为空"), !1;
			if("telephone" === b[d].type) {
				if(!l(f)) return winAlert("输入的手机号码格式不正确！"), !1;
				if("true" === b[d].smscode) {
					var g = C.find(".input-award-smscode");
					if("" === $.trim(g.val())) return winAlert("验证码不能为空！"), !1;
					c = {}, c.sendPhone = f, c.codeValue = g.val().trim()
				}
			}
			if("mail" === b[d].type) {
				var h = /^(\S)+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				if(!h.test(f)) return winAlert("输入的邮箱格式不正确！"), !1
			}
			a.push({
				id: b[d].id,
				name: b[d].name,
				value: f,
				unique: b[d].unique,
				allunique: b[d].allunique,
				smsticket: b[d].smsticket
			})
		}
		return {
			smsData: c,
			awardInfo: a
		}
	}
	var p = a,
		q = p.getWsiteCanvas().find(".pt-inner"),
		r = a.getLibHost(),
		s = "rrx-prizeget-dialog",
		t = '<div class="' + s + '"></div>',
		u = '<div class="prizeget-dialog-content"><div class="closeBtn"><img src="{{closeTag}}"></div><div class="p-form"><div style="background-color:{{pFromBg}} " class="p-head">{{activeTitle}}</div><ul>{{each awardModel as m j}}<li>   <input style="border: 1px solid {{pFromBg}}"  placeholder="{{m.name}}" class="input-award-{{m.id}}" type="{{m.type==\'telephone\'?\'tel\':\'text\'}}">    </li>{{if m.smscode===true || m.smscode==\'true\' }}<li><input style="border: 1px solid {{pFromBg}};width:50% " placeholder="输入验证码"  class="input-award-smscode" type="tel"><a href="javascript:void(0)" style=" background-color:{{pFromBg}}" class="btn-smscode">获取验证码</a></li>{{/if}}{{/each}}</ul><div class="p-foot">   <div style="background-color:{{pFromBg}} ;box-shadow:2px 12px 1Px {{pFromShadow}} " class= "p-foot-btn"><a href="javascript:void(0)" class="submit-form">{{activeBtn}}</a> </div></div>  </div> </div>',
		v = fnColorThin(c, .4),
		w = r + "weplus/image/close.png",
		x = c,
		y = n(b),
		z = "<header >完善领奖信息</header>",
		A = pageSkin.activeBtn;
	e && (z = "<header >完善报名信息</header>", A = pageSkin.applyBtn);
	var B = compileHtml(u, {
			activeTitle: z,
			awardModel: y,
			closeTag: w,
			pFromBg: x,
			pFromShadow: v,
			activeBtn: A
		}),
		C = q.find("." + s);
	0 === C.length && (q.append(t), C = q.find("." + s)), C.html(B);
	var D, E = "click",
		F = {
			event: "closeEvent",
			result: 0
		},
		G = C.find(".submit-form"),
		H = C.find(".btn-smscode"),
		I = C.find(".closeBtn"),
		J = 0;
	h(), f()
}

function showPrizeDetailDialog(a, b, c, d) {
	function e() {
		w.find(".dialog-content-left svg path").css({
			fill: c
		}), w.find(".dialog-content-left svg  g path").css({
			fill: "#fff"
		}), w.find(".dialog-content-info-text-title").css({
			color: c
		}), u && (w.find(".detail-text")[0].innerText = u), w.find(".prizedetail-dialog-content").removeClass("bounceOutUpAni").addClass("bounceInUpAni"), w.show()
	}

	function f(a) {
		w.find(".prizedetail-dialog-content").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), setTimeout(function() {
			w.hide(), a && a()
		}, 600)
	}

	function g() {
		z.off().on(x, function(a) {
			a.preventDefault(), f(function() {
				d && (y.event = "closeEvent", y.result = 0, d(y))
			})
		})
	}

	function h() {
		var a = w.find(".dialog-content-info-text-detail");
		fnAddScroll(a[0])
	}
	var i = a,
		j = i.getWsiteCanvas().find(".pt-inner"),
		k = a.getLibHost(),
		l = "rrx-prizedetail-dialog",
		m = '<div class="' + l + '"></div>',
		n = '<div class="prizedetail-dialog-content"><div class="content-close"><img class="content-close-img" src="{{closeImage}}"></div><div class="dialog-content" style="background-image:url({{bgImage}})"><div class="dialog-content-left">{{winDetail}}</div><div class="dialog-content-right"><div class="dialog-content-info"><img class="dialog-content-info-img" src="{{prizeImage}}"><div class="dialog-content-info-text"><div class="dialog-content-info-text-title">{{prizeName}}</div><div class="dialog-content-info-text-detail"><div class="detail-iScroll" style="position:absolute;overflow:hidden"><div style="display:table;min-height:130px"><div class="detail-text" style="display:table-cell;word-wrap:break-word;word-break:break-all;width:100%;font-size:22px;color:#929292"></div></div></div></div></div></div></div></div></div>\n',
		o = (fnColorThin(c, .4), k + "weplus/image/close.png"),
		p = k + "weplus/image/detailBg.png",
		q = pageSkin.winDetail,
		r = c,
		s = b.name || "",
		t = b.image || "http://image3.weplus.me/2016/07/20/1468986497159.png",
		u = b.detail,
		v = compileHtml(n, {
			closeImage: o,
			bgImage: p,
			winDetail: q,
			prizeName: s,
			prizeImage: t,
			textColor: r
		}),
		w = j.find("." + l);
	0 === w.length && (j.append(m), w = j.find("." + l)), w.html(v);
	var x = "click",
		y = {
			event: "closeEvent",
			result: 0
		},
		z = w.find(".content-close-img");
	h(), g(), e()
}
var appConfig = {
		version: "v4.4.5.11",
		libHost: "http://assets.rrxh5.cc/lib/",
		viewDomainFormat: "http://m.rrxiu.net/?v={guid}",
		viewHost: "http://view.rrxh5.cc/",
		pcViewHost: "https://www.rrxiu.net/view-",
		serviceHost: "http://res.rrxiu.net/",
		interactServiceHost: "http://res2.rrxiu.net/",
		dataHost: "http://data.rrxh5.cc/",
		vipDataHost: "http://data.rrxh5.cc/",
		vrHost: "https://view.rrxh5.cc/vr/",
		imageHost: "http://file2.rrxh5.cc/",
		imageOss: "http://file2.rrxh5.cc/",
		shareImageThumb: "@!200x200",
		llImageThumb: "@!view-loading-logo",
		cloudHost: "http://view.rrxh5.cc/data/",
		pluginDomainFormat: "http://assets.rrxh5.cc/plugin/{token}/{version}",
		clientHost: "http://www.rrxiu.net/",
		webFontHost: "http://assets.rrxh5.cc/webfont/",
		rrxiuFontCssHost: "http://assets.rrxh5.cc/rrxiuFontCss/",
		weixinVoiceHost: "http://assets.rrxh5.cc/weixinVoice/",
		startTimeParseBgImgNew: "2016-11-16 08:30:00",
		webAppHost: "https://app.rrxiu.net",
		wxPayHost: "https://app.rrxiu.net/wxpay/pages/",
		gameCategory: 7,
		enabledCloud: !0,
		animationEngine: "css",
		copyright: {
			content: "免费制作 → 人人秀",
			textAlign: "center",
			url: "http://mp.weixin.qq.com/s?__biz=MzA4ODc5OTE1OQ==&mid=403178211&idx=1&sn=9c50c942df41020d626d50289a75cf16#rd",
			color: "#fff",
			bgColor: "#000"
		},
		shareInfo: {
			color: "#fff",
			bgColor: "rgba(0, 0, 0, 0.9)",
			content: '<div class="d-share-arrow"></div>'
		},
		copyrightPage: {
			id: "copyrightPage",
			backgroundColor: "#E6E9EE",
			elementList: [{
				animationList: [],
				content: {
					css: "",
					fullscreen: !0,
					html: ' <div class="copyright-content"> <div class="rrx-icon-close-layer"> </div> <div class="share-image"> <img src="{{shareImageUrl}}"> </div> <div class="share-title">{{shareTitle}}</div> <div class="view-more"> <a class="view-more-button" href="https://www.rrxiu.net" target="_blank">查看更多 >></a> </div> <a href="javascript:void(0)" class="show-rrxiu-report" >举报</a> <div class="bottomm-text" style="{{bgBottomColor}}"> <a class="make-rrxiu" href="http://mp.weixin.qq.com/s?__biz=MzA4ODc5OTE1OQ==&mid=403178211&idx=1&sn=9c50c942df41020d626d50289a75cf16#rd" target="blank"> <span> 免费制作 → 人人秀 </span> </a> </div> <a href="javascript:void(0)" class="show-rrxiu-visit" style="color:{{visitColor}};display:{{showVisitCount}}">阅读:{{visitCount}}</a> </div>',
					scroll: !1
				},
				display: !0,
				height: 1010,
				id: 1e4,
				left: 0,
				resize: 0,
				style: "",
				top: 0,
				type: "html",
				width: 640,
				zIndex: 1
			}]
		}
	},
	CssAnimationEngine = function() {
		function a(a, b) {
			a.removeClass(b), d(a)
		}

		function b(a, b) {
			var c = ["fadeIn", "fadeInDown", "fadeInUp", "fadeInLeft", "fadeInRight", "fadeInRightUp", "fadeInLeftUp", "fadeInRightDown", "fadeInLeftDown", "bounceIn", "bounceInDown", "bounceInUp", "bounceInLeft", "bounceInRight", "bounceInRightUp", "bounceInLeftUp", "bounceInRightDown", "bounceInLeftDown", "rotateIn", "rotateInRight", "rotateInLeft", "rotateInLeftDown", "rotateInLeftUp", "rotateInRightDown", "rotateInRightUp", "zoomIn", "bigIn", "moveInDown", "moveInUp", "moveInLeft", "moveInRight", "flipInX", "flipInY", "flipInHorizontal", "flip3d", "lightSpeedInRight", "lightSpeedInLeft", "boingIn", "perspectiveLeftRetourn", "perspectiveRightRetourn", "perspectiveDownRetourn", "perspectiveUpRetourn", "stretchRight", "stretchLeft", "pullUp", "pullDown"];
			c.indexOf(b) > -1 && a.css("display", "block")
		}

		function c(a, b) {
			var c = ["fadeIn", "fadeInDown", "fadeInUp", "fadeInLeft", "fadeInRight", "fadeInRightUp", "fadeInLeftUp", "fadeInRightDown", "fadeInLeftDown", "bounceIn", "bounceInDown", "bounceInUp", "bounceInLeft", "bounceInRight", "bounceInRightUp", "bounceInLeftUp", "bounceInRightDown", "bounceInLeftDown", "rotateIn", "rotateInRight", "rotateInLeft", "rotateInLeftDown", "rotateInLeftUp", "rotateInRightDown", "rotateInRightUp", "zoomIn", "bigIn", "moveInDown", "moveInUp", "moveInLeft", "moveInRight", "flipInX", "flipInY", "flipInHorizontal", "flip3d", "lightSpeedInRight", "lightSpeedInLeft", "boingIn", "perspectiveLeftRetourn", "perspectiveRightRetourn", "perspectiveDownRetourn", "perspectiveUpRetourn", "stretchRight", "stretchLeft", "pullUp", "pullDown"];
			c.indexOf(b) > -1 && a.css("display", "none")
		}

		function d(a) {
			a.css({
				animation: "",
				"animation-name": "",
				"animation-duration": "",
				"animation-timing-function": "",
				"animation-delay": "",
				"animation-iteration-count": ""
			}), a.css({
				"-webkit-animation": "",
				"-webkit-animation-name": "",
				"-webkit-animation-duration": "",
				"-webkit-animation-timing-function": "",
				"-webkit-animation-delay": "",
				"-webkit-animation-iteration-count": ""
			})
		}

		function e(a, b, c, d, e, f) {
			return a + "s " + b + " " + c + "s " + d + " " + e + " " + f
		}

		function f(f, g, h, i, j, k, l, m) {
			if("" !== g) {
				(void 0 === h || null === h || isNaN(parseFloat(h))) && (h = 0), (void 0 === i || null === i || isNaN(parseFloat(i))) && (i = 1), (void 0 === j || null === j || isNaN(parseFloat(j))) && (j = 0), (void 0 === k || null === k || isNaN(parseFloat(k))) && (k = 0), l = l || !1;
				var n = f.attr("class");
				c(f, g), f.removeClass(g), d(f);
				var o = 0;
				l && (o = h);
				var p = "both",
					q = "ease",
					r = 1;
				setTimeout(function() {
					if(b(f, g), m === !0) f.addClass(g);
					else {
						if(n) {
							var c = n.split(" "),
								d = 0;
							if($.each(c, function(a, b) {
									"" !== $.trim(b) && (d += 1)
								}), d > 2) {
								var k = c[0] + " " + c[1];
								f.attr("class", k)
							}
						}
						f.addClass(g)
					} - 1 == j ? (q = "linear", r = "infinite") : r = 0 === j || "0" === j ? 1 : j, m && "infinite" == r && (r = 1), l !== !1 && (h = 0);
					var o = e(i, q, h, r, p, g);
					f.css("-webkit-animation", o), f.css("animation", o), f.css("-webkit-animation-name", o + " !important"), f.css("animation-name", o + " !important"), m === !0 && f.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
						a(f, g)
					})
				}, o)
			}
		}

		function g(f, g, h) {
			function i(f, g, h) {
				if(j < g.length) {
					var k = g[j],
						l = k.name,
						m = k.delay,
						n = k.duration,
						o = k.repeat,
						p = "both",
						q = "ease",
						r = 1; - 1 == o ? (q = "linear", r = "infinite") : r = 0 === o ? 1 : o, h && "infinite" == r && (r = 1), c(f, l), f.removeClass(l), d(f), b(f, l), f.addClass(l);
					var s = e(n, q, m, r, p, l);
					f.css("-webkit-animation", s), f.css("animation", s), f.css("-webkit-animation-name", s + " !important"), f.css("animation-name", s + " !important"), f.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
						h && a(f, l), j++, i(f, g, h)
					})
				}
			}
			var j = 0;
			i(f, g, h)
		}

		function h(a, b, c, d, e, f, g, h, i) {
			var j = k(a);
			c = 1e3 * parseFloat(c), d = 1e3 * parseFloat(d), i = i || 0, a.find(".textanimation").addClass(b);
			var l = a.find(".textanimation").length;
			d /= l, a.find(".textanimation").each(function(a, b) {
				var e = 0;
				"0" == i ? e = c + a * d : "1" == i ? e = c + (l - a - 1) * d : "2" == i && (e = c + parseInt(Math.random() * l) * d), $(this).removeClass("textOut"), $(b).css({
					webkitAnimationDelay: e + "ms",
					animationDelay: e + "ms"
				})
			});
			var m = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd animationend";
			a.find(".textanimation").unbind(m).bind(m, function(c) {
				$(this).css({
					webkitAnimationDelay: "",
					animationDelay: ""
				}).removeClass(b), h ? a.find(".element-last").empty().html(j.dom).attr("style", j.style) : b.indexOf("Out") >= 0 && $(this).addClass("textOut")
			})
		}

		function i(a) {
			var b = {};
			if(!a) return b;
			for(var c = a.split(";"), d = 0; d < c.length; d++) {
				var e = $.trim(c[d]);
				if("" !== e) {
					var f = e.split(":");
					b[f[0]] = f[1]
				}
			}
			return b
		}

		function j(a, b) {
			function c(a, b) {
				return a.replace(/./g, function(a) {
					return "<span class='textanimation' " + b + ">" + (" " == a ? "&nbsp;" : a) + "</span>"
				})
			}
			for(var d = 0; d < a.length; d++) {
				var e = a[d];
				if("textanimation" != e.className)
					if(e.nodeType == Node.TEXT_NODE) {
						var f = e.nodeValue,
							g = $(e).parent(),
							h = i(g.attr("style"));
						h["background-color"] && (b += "background-color:" + h["background-color"] + ";", h["background-color"] = ""), h["text-decoration"] && (b += "text-decoration:" + h["text-decoration"] + ";", h["text-decoration"] = ""), h["text-decoration-line"] && (b += "text-decoration:" + h["text-decoration-line"] + ";", h["text-decoration-line"] = "");
						var k = "";
						b && (k = 'style="' + b + '"', g.css(h)), f = c(f, k), $(f).insertAfter($(e)), $(e).remove()
					} else j(e.childNodes, b)
			}
		}

		function k(a) {
			var b = a.find(".element-last"),
				c = b.get(0).innerHTML,
				d = b.attr("style"),
				e = "";
			return j(b.get(0).childNodes, e), {
				dom: c,
				style: d
			}
		}
		return {
			animation: f,
			animationList: g,
			textAnimation: h
		}
	}();
! function() {
	function a(a, b) {
		a.constructor === String && (a = [a]);
		for(var d = 0; d < a.length; d++) - 1 === a[d].indexOf("?") && (a[d] = a[d] + "?v=" + appConfig.version);
		var e = new c(a, b);
		e.load()
	}

	function b() {
		e = []
	}

	function c(a, b) {
		this.newModuleList = a, this.allCount = a.length, this.tempCount = 0, this.callback = b
	}

	function d(a, b) {
		this.moduleName = a, this.callback = b
	}
	window.require = a, window.clearRequieModuleList = b;
	var e = [];
	c.prototype = {
		load: function() {
			for(var a = this, b = function(b) {
					var c = new d(b, function() {
						a.tempCount++, a.tempCount === a.allCount && void 0 !== a.callback && a.callback()
					});
					c.load()
				}, c = 0; c < a.allCount; c++) b(a.newModuleList[c])
		}
	}, d.prototype = {
		load: function() {
			{
				var a = this;
				a.moduleName
			}
			if(a.isLoad()) {
				var b = a.getModuleInfo();
				if(b.isLoad) a.callback();
				else {
					var c = b.callback;
					b.callback = function() {
						c(), a.callback()
					}
				}
			} else {
				var d = document.createElement("script");
				d.src = a.moduleName, d.type = "text/javascript", document.body.appendChild(d);
				var f = {
					name: a.moduleName,
					isLoad: !1,
					callback: function() {
						a.callback()
					}
				};
				e.push(f), d.onload = function() {
					f.callback(), f.isLoad = !0
				}, d.onerror = function() {
					f.callback(), f.isLoad = !0
				}
			}
		},
		isLoad: function() {
			return null === this.getModuleInfo() ? !1 : !0
		},
		getModuleInfo: function() {
			for(var a = 0; a < e.length; a++)
				if(this.moduleName == e[a].name) return e[a];
			return null
		}
	}
}(window);
var Cool = {
	share: {
		title: "",
		desc: "",
		image: "",
		setTitle: function(a) {
			this.title = a
		},
		setDesc: function(a) {
			this.desc = a
		},
		setImage: function(a) {
			this.image = a
		}
	},
	util: {
		getUrlParameterByName: function(a) {
			a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var b = new RegExp("[\\?&]" + a + "=([^&#]*)"),
				c = b.exec(location.href);
			return null === c ? "" : decodeURIComponent(c[1].replace(/\+/g, " "))
		},
		getUrlName: function() {
			if(!(appConfig.viewDomainFormat.indexOf("://{guid}") > -1)) {
				regex = new RegExp(".*/([^&#?/]*)"), results = regex.exec(location);
				var a = "";
				null !== results && (a = decodeURIComponent(results[1].replace(/\+/g, " ")));
				var b = "",
					c = a.split("-");
				return b = 2 == c.length ? c[1] : ""
			}
			return regex = new RegExp(".*//([^&#?.]*)"), results = regex.exec(location), (null === results || "view" === results[1]) && (regex = new RegExp(".*/([^&#?/]*)"), results = regex.exec(location)), null === results ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
		},
		getUseSslDomain: function() {
			return ["rrxh5.cc", "starlord.cc"]
		},
		isSpecDomain: function(a) {
			var b = !1;
			if(a)
				for(var c = this.getUseSslDomain(), d = 0; d < c.length; d++)
					if(a.indexOf(c[d]) > -1) {
						b = !0;
						break
					}
			return b
		},
		getUrlParaObject: function(a) {
			var b = a.replace(/^\s+/, "").replace(/\s+$/, "").match(/([^?#]*)(#.*)?$/);
			if(!b) return {};
			for(var c = b[1], d = c.split("&"), e = {}, f = 0, g = d.length; g > f; f++) {
				var h = d[f];
				if((h = h.split("="))[0]) {
					var i = decodeURIComponent(h.shift()),
						j = h.length > 1 ? h.join("=") : h[0];
					void 0 !== j && (j = decodeURIComponent(j)), i in e ? (e[i].constructor != Array && (e[i] = [e[i]]), e[i].push(j)) : e[i] = j
				}
			}
			return e
		},
		appendUrlPara: function(a, b) {
			if(!b) return a;
			var c = a.indexOf("?");
			if(-1 === c) return a + "?" + $.param(b);
			var d = this.getUrlParaObject(a),
				e = a.substr(0, c);
			return $.each(b, function(a, b) {
				d[a] = b
			}), e + "?" + $.param(d)
		},
		removeUrlPara: function(a, b) {
			var c = a.lastIndexOf("?"),
				d = a;
			if(c > -1) {
				d = a.substr(0, c);
				var e = this.getUrlParaObject(a),
					f = [];
				jQuery.each(e, function(a, c) {
					void 0 !== a && b !== a && f.push(a + "=" + c)
				});
				var g = f.join("&");
				"" !== g && (d += "?" + g)
			}
			return d
		},
		removeUrlParaMutil: function(a, b) {
			if(void 0 === b || null === b || 0 === b.length) return a;
			var c = a.lastIndexOf("?"),
				d = a;
			if(c > -1) {
				d = a.substr(0, c);
				var e = this.getUrlParaObject(a),
					f = [];
				jQuery.each(e, function(a, c) {
					void 0 !== a && -1 === b.indexOf(a) && f.push(a + "=" + c)
				});
				var g = f.join("&");
				"" !== g && (d += "?" + g)
			}
			return d
		},
		getUrlSubDomain: function(a) {
			if(void 0 === a || null === a) return "";
			var b = a.indexOf("://");
			if(-1 === b) return "";
			var c = a.substring(0, b + 3);
			a = a.replace(c, "");
			var d = a.split(".");
			return d && d.length > 2 ? d[0] : ""
		},
		loadJs: function(a, b) {
			if(appConfig.dev) require(a, b);
			else {
				var c = [];
				a.constructor === String && (a = [a]), wsiteInfo.flhtps || wsiteInfo.httpsEnabled ? ($.each(a, function(a, b) {
					var d = b.replace("http://", "https://");
					c.push(d)
				}), require(c, b)) : ($.each(a, function(a, b) {
					var d = b;
					d = b.replace("https://", "http://"), c.push(d)
				}), require(c, b))
			}
		},
		loadJsSimple: function(a, b) {
			require(a, b)
		},
		loadCss: function(a) {
			var b = this;
			if(appConfig.dev);
			else if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) a = a.replace("http://", "https://");
			else {
				a = a.replace("https://", "http://");
				var c = b.isSpecDomain(a);
				if(c) {
					var d = b.getUrlSubDomain(a);
					d && -1 === a.indexOf("://ns") && (a = a.replace("://" + d, "://ns" + d))
				}
			}
			a = a + "?v=" + appConfig.version;
			for(var e = document.getElementsByTagName("head")[0], f = $(e).find("link"), g = 0; g < f.length; g++)
				if(f[g].href === a) return;
			var h = document.createElement("link");
			h.href = a, h.rel = "stylesheet", e.appendChild(h)
		},
		loadCssByStyle: function(a) {
			var b = document.getElementsByTagName("head")[0],
				c = document.createElement("style");
			c.type = "text/css", c.innerHTML = a, b.appendChild(c)
		},
		checkIsPc: function() {
			var a = this.getUrlParameterByName("iframe");
			if("1" === a) return !1;
			var b = {
					win: !1,
					mac: !1,
					xll: !1
				},
				c = navigator.platform;
			return b.win = 0 === c.indexOf("Win"), b.mac = 0 === c.indexOf("Mac"), b.x11 = "X11" == c || 0 === c.indexOf("Linux"), b.win || b.mac || b.xll ? !0 : !1
		},
		checkIsPcWithoutIframe: function() {
			var a = {
					win: !1,
					mac: !1,
					xll: !1
				},
				b = navigator.platform;
			return a.win = 0 === b.indexOf("Win"), a.mac = 0 === b.indexOf("Mac"), a.x11 = "X11" == b || 0 === b.indexOf("Linux"), a.win || a.mac || a.xll ? !0 : !1
		},
		checkIsWeixin: function() {
			var a = navigator.userAgent.toLowerCase();
			return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
		},
		checkIsAndroid: function() {
			var a = navigator.userAgent.toLowerCase();
			return a.indexOf("android") > -1 ? !0 : !1
		},
		checkIsIphone: function() {
			var a = navigator.userAgent.toLowerCase();
			return a.indexOf("iphone") > -1 ? !0 : !1
		},
		isOrientationHorizontal: function() {
			return 90 === window.orientation || -90 === window.orientation
		},
		isOrientationVertical: function() {
			return 180 === window.orientation || 0 === window.orientation
		},
		hostStamp: function(a) {
			if(a) {
				var b = window.location.host + appConfig.version; - 1 === a.indexOf("data:image") && (a.indexOf("http://") > -1 || a.indexOf("https://") > -1) && (a = a.indexOf("?") > -1 ? a + "&host=" + b : a + "?host=" + b)
			}
			return a
		},
		loadImage: function(a, b, c) {
			var d = this;
			try {
				if(appConfig.dev);
				else if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) a = a.replace("http://", "https://");
				else {
					a = a.replace("https://", "http://");
					var e = d.isSpecDomain(a);
					if(e) {
						var f = d.getUrlSubDomain(a);
						f && -1 === a.indexOf("://ns") && (a = a.replace("://" + f, "://ns" + f))
					}
				}
				c = void 0 === c || null === c ? !0 : c;
				var g = new Image;
				if(-1 === a.indexOf("data:image") && (g.crossOrigin = "Anonymous"), g.src = c ? Cool.util.hostStamp(a) : a, g.complete) return void(void 0 !== b && b(g));
				g.onload = function() {
					void 0 !== b && b(g)
				}, g.onerror = function() {
					void 0 !== b && b(null)
				}
			} catch(h) {}
		},
		parseJson: function(a) {
			var b = {};
			return a.constructor === String ? "" !== a && (b = JSON.parse(a)) : b = a, b
		},
		getPluginDomain: function(a, b) {
			var c = this,
				d = appConfig.pluginDomainFormat.replace("{token}", a).replace("{version}", b) + "/";
			if(appConfig.dev) return d;
			if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return d.replace("http://", "https://");
			d = d.replace("https://", "http://");
			var e = c.isSpecDomain(d);
			if(e) {
				var f = c.getUrlSubDomain(d);
				f && -1 === d.indexOf("://ns") && (d = d.replace("://" + f, "://ns" + f))
			}
			return d
		},
		parsePluginTheme: function(a, b, c) {
			function d(a) {
				return location.href.indexOf("https://") > -1 && (a.indexOf("http://assets") > -1 ? a = "https://assets.rrxh5.cc/" + e(a) : a.indexOf("http://image") > -1 && (a = "https://file.rrxh5.cc/" + e(a))), a
			}

			function e(a) {
				if(void 0 === a || null === a) return "";
				var b = a.indexOf("://");
				if(-1 === b) return a;
				var c = a.substring(0, b + 3);
				a = a.replace(c, "");
				var d = a.indexOf("/");
				if(-1 === d) return a;
				var e = a.substr(d + 1, a.length);
				return e
			}
			if(!a) return null;
			void 0 === a.length && (a = [a]);
			for(var f = [], g = [], h = [], i = 0; i < a.length; i++) {
				var j = [],
					k = a[i];
				if(!k.list) return;
				for(var l = 0; l < k.list.length; l++) {
					var m = k.list[l];
					switch(m.type) {
						case "text":
							if(m.hasOwnProperty("content")) {
								for(var n = [], o = 0; o < m.content.length; o++) {
									var p = m.content[o];
									n[p.key] = p
								}
								j[m.key] = {
									bgcolor: m.backgroundColor,
									content: n
								}, m.color && (j[m.key].color = m.color)
							} else j[m.key] = m.backgroundColor;
							break;
						case "image":
							var q = "";
							if(m.src) {
								if(q = d(m.src), b && (q += "?host=" + b), !c) {
									var r = new Image;
									b && (r.crossOrigin = "Anonymous"), r.src = q
								}
								f.push({
									id: m.key,
									src: q
								})
							}
							j[m.key] = q;
							break;
						case "audio":
							var s = "";
							if(m.src) {
								if(s = d(m.src), b && (s += "?host=" + b), !c) {
									var t = new Audio;
									b && (t.crossOrigin = "Anonymous"), t.src = s, t.preload = "auto"
								}
								h.push({
									id: m.key,
									src: s
								})
							}
							j[m.key] = s
					}
				}
				g[k.value] = j
			}
			return {
				dict: g,
				imageManifest: f,
				audioManifest: h
			}
		},
		getBrowserUrl: function(arg, arg_val, sl) {
			var url = sl || window.location.href.split("#")[0],
				pattern = arg + "=([^&]*)",
				replaceText = arg + "=" + arg_val,
				newUrl = "";
			if(url.match(pattern)) {
				var tmp = "/(" + arg + "=)([^&]*)/gi";
				tmp = url.replace(eval(tmp), replaceText), newUrl = tmp
			} else newUrl = url.match("[?]") ? url + "&" + replaceText : url + "?" + replaceText;
			return newUrl
		},
		getImageThumb: function(a, b, c) {
			if(c = c || "", b = b || "", "100%" === a) return "";
			if(a = parseInt(a, 10), 0 >= a || isNaN(a)) return "";
			var d = "@!user_image_",
				e = Math.ceil(a / 100);
			return 0 === e ? "" : c && c.indexOf(".png") > -1 ? "" : ("imggroup" === b && Cool.util.checkIsIphone() && (e = Math.floor(a / 100), e > 3 && (e = 3)), 10 >= e ? d + 100 * e + "x1" : "@!user_image_1000x1")
		},
		getNowTimeString: function() {
			var a = new Date;
			return this.formateDate(a)
		},
		formateDate: function(a, b) {
			if(!a) return "";
			a.constructor === String && (a = new Date(a)), b = b || "day";
			var c = "-",
				d = ":",
				e = a.getMonth() + 1,
				f = a.getDate();
			e >= 1 && 9 >= e && (e = "0" + e), f >= 0 && 9 >= f && (f = "0" + f);
			var g = "";
			return g = "day" === b ? a.getFullYear() + c + e + c + f : a.getFullYear() + c + e + c + f + " " + a.getHours() + d + date.getMinutes() + d + a.getSeconds()
		}
	},
	storageUtil: {
		storage: window.sessionStorage,
		getMd5Key: function(a) {
			return hex_md5(window.location.host + a)
		},
		set: function(a, b) {
			try {
				this.storage && this.storage.setItem(this.getMd5Key(a), b)
			} catch(c) {
				this.clear()
			}
		},
		get: function(a) {
			return this.storage ? this.storage.getItem(this.getMd5Key(a)) : null
		},
		clear: function() {
			this.storage && this.storage.clear()
		},
		remove: function(a) {
			this.storage && this.storage.removeItem(this.getMd5Key(a))
		},
		isHave: function(a) {
			if(this.storage) {
				for(var b = 0; b < this.storage.length; b++)
					if(this.storage.key(b) === this.getMd5Key(a)) return !0;
				return !1
			}
			return !1
		}
	},
	localStorageUtil: {
		storage: window.localStorage,
		getMd5Key: function(a) {
			return hex_md5(window.location.host + a)
		},
		set: function(a, b) {
			try {
				this.storage && this.storage.setItem(this.getMd5Key(a), b)
			} catch(c) {
				this.clear()
			}
		},
		get: function(a) {
			return this.storage ? this.storage.getItem(this.getMd5Key(a)) : null
		},
		clear: function() {
			this.storage && this.storage.clear()
		},
		remove: function(a) {
			this.storage && this.storage.removeItem(this.getMd5Key(a))
		},
		isHave: function(a) {
			if(this.storage) {
				for(var b = 0; b < this.storage.length; b++)
					if(this.storage.key(b) === this.getMd5Key(a)) return !0;
				return !1
			}
			return !1
		}
	},
	cookie: {
		get: function(a) {
			if(document.cookie.length > 0) {
				var b = document.cookie.indexOf(a + "=");
				if(-1 !== b) {
					b = b + a.length + 1;
					var c = document.cookie.indexOf(";", b);
					return -1 === c && (c = document.cookie.length), unescape(document.cookie.substring(b, c))
				}
			}
			return ""
		},
		clear: function(a) {
			var b = new Date;
			b.setTime(b.getTime() - 1e4), document.cookie = a + "=a; expires=" + b.toGMTString()
		},
		set: function(a, b, c) {
			var d = new Date;
			d.setTime(d.getTime() + 864e5), document.cookie = void 0 !== c && null !== c ? a + "=" + b + ";expires=" + d.toGMTString() + ";path=/;domain=" + c : a + "=" + b + ";expires=" + d.toGMTString() + ";path=/"
		},
		setWithoutTime: function(a, b, c, d) {
			(void 0 === c || null === c) && (c = 3650);
			var e = new Date;
			e.setTime(e.getTime() + 24 * c * 60 * 60 * 1e3), document.cookie = void 0 !== d && null !== d ? a + "=" + b + ";expires=" + e.toGMTString() + ";path=/;domain=" + d : a + "=" + b + ";expires=" + e.toGMTString() + ";path=/"
		}
	}
};
window.rrxOpenWsiteTime = (new Date).getTime(), window.userReadDepth = 1, window.rrxdebug = !1, window.CoolApp = {}, window.qqMapCallback = function() {
		window.isLoadQQMap = !0, console.log("window.qqMapCallback", window.isLoadQQMap)
	},
	function() {
		CoolApp = function() {
			function wxinit(a) {
				return Cool.util.checkIsWeixin() === !1 ? (setTimeout(handleShareUrl, 2e3), !1) : void setTimeout(function() {
					getWxJsSign(a, "", _dataObj.guid)
				}, 500)
			}

			function getImageHost() {
				if(appConfig.dev) return appConfig.imageHost;
				if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return appConfig.imageHost.replace("http://", "https://");
				var a = appConfig.imageHost,
					b = Cool.util.isSpecDomain(a);
				if(b) {
					var c = Cool.util.getUrlSubDomain(a);
					c && -1 === a.indexOf("://ns") && (a = a.replace("://" + c, "://ns" + c), a = a.replace("https://", "http://"))
				}
				return a
			}

			function getWxJsSign(a, b, c, d) {
				console.log("raw url", a), getWxJsSignTry += 1, getWxJsSignTry > 2 || $.get(_host + "wechat/getWxJsSign", {
					url: a,
					error: b,
					wsiteGuid: c
				}, function(a) {
					console.info("getWxJsSign ret", a), 0 === a.result ? (wx.config({
						debug: !1,
						appId: a.sign.appId,
						timestamp: a.sign.timestamp,
						nonceStr: a.sign.nonceStr,
						signature: a.sign.signature,
						jsApiList: ["checkJsApi", "getLocation", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "translateVoice", "getNetworkType", "chooseImage", "addCard"]
					}), wx.ready(function() {
						console.info("wx.ready"), _dataObj.showShareCount ? setTimeout(function() {
							setWxShareInfo(d), fnHackTitle(shareTitle)
						}, 1500) : (setWxShareInfo(d), fnHackTitle(shareTitle)), (_isPreview || 1 === parseInt(_dataObj.forbidShare) || wsiteInfo.wxp.showShareMenu === !1 || "1" === wsiteInfo.mamfm) && wx.hideOptionMenu(), console.info("wx.ready end")
					}), wx.error(function(a) {
						console.info("wx.error"), console.error(a);
						var b = JSON.stringify(a);
						b = encodeURIComponent(b), wsiteInfo && wsiteInfo.authBehind && wsiteInfo.wxauthedInfo && (b += wsiteInfo.wxauthedInfo.nickname);
						Cool.util.checkIsIphone() ? "iphone" : "android";
						getWxJsSign(getOriginUrl(), b, c, d)
					})) : handleShareUrl()
				}, "json").fail(function() {
					console.info("getWxJsSign fail"), handleShareUrl()
				}).always(function() {})
			}

			function listenPopStateEvent() {
				window.addEventListener("popstate", function() {
					apiHelper.getAppInstance().closeWsite(function() {
						window.history.length > 2 ? window.history.back() : Cool.util.checkIsWeixin() && "undefined" != typeof WeixinJSBridge && WeixinJSBridge.call("closeWindow")
					})
				}, !1)
			}

			function pushStateForReadDepth() {
				if(shareUrl && _log) {
					var a = shareUrl,
						b = Cool.cookie.get(_log.getVisitFirstLogKey());
					"" !== b && (shareUrl = Cool.util.getBrowserUrl("from_code", b, shareUrl), a = shareUrl), !Cool.util.checkIsAndroid(), setTimeout(function() {
						listenPopStateEvent()
					}, 500)
				}
			}

			function handleShareUrl() {
				if(shareUrl) {
					if(_log) {
						var a = Cool.cookie.get(_log.getVisitFirstLogKey());
						"" !== a && (shareUrl = Cool.util.getBrowserUrl("from_code", a, shareUrl))
					}
					shareUrl = shareUrl.replace("mode=official_accounts", "mode="), window.rrxDanmuJump ? (shareUrl = Cool.util.removeUrlParaMutil(shareUrl, ["rrxsrc", "uid", "clickType", "clickValue", "startPageId"]), console.log(shareUrl)) : shareUrl = Cool.util.removeUrlParaMutil(shareUrl, ["rrxsrc", "uid", "clickType", "clickValue"]), window.hasOwnProperty("_rrxiu_pushsale") && (shareUrl = window._rrxiu_pushsale.updateShareUrl(shareUrl), console.log("_rrxiu_pushsale_updateshareurl", shareUrl))
				}
			}

			function getWxOpenIdByShare() {
				var a = "";
				return wsiteInfo && wsiteInfo.authBehind && wsiteInfo.wxauthedInfo && wsiteInfo.wxp && wsiteInfo.wxp.canUserShare && (a = wsiteInfo.wxauthedInfo.id), a
			}

			function showDialogPageByShareCallback() {
				if(0 === _dataObj.result) {
					console.log("showDialogPageByShareCallback");
					var a = _dataObj.dialogList;
					if(void 0 !== a)
						for(var b = 0; b < a.length; b++)(a[b].openShareShow === !0 || "true" === a[b].openShareShow) && dialogOpen(currentPageId, a[b].id)
				}
			}

			function setWxShareInfoWithUrl() {
				getWxJsSignTry = 0, getWxJsSign(location.href.split("#")[0], "", _dataObj.guid, !0)
			}

			function setWxShareInfo(a) {
				a === !0 || handleShareUrl(), wx.onMenuShareTimeline({
					title: shareTitle,
					link: shareUrl,
					imgUrl: shareImageUrl,
					success: function(a) {
						setTimeout(function() {
							triggerPageEvent(currentPageId, "sysShareCallBack", {
								method: "onMenuShareTimeline",
								type: "success"
							})
						}, 100), void 0 !== _log && _log.doShare(2, getWxOpenIdByShare(), showDialogPageByShareCallback)
					},
					cancel: function(a) {
						triggerPageEvent(currentPageId, "sysShareCallBack", {
							method: "onMenuShareTimeline",
							type: "cancel"
						})
					}
				}), wx.onMenuShareAppMessage({
					title: shareTitle,
					desc: shareDesc,
					link: shareUrl,
					imgUrl: shareImageUrl,
					type: "link",
					dataUrl: "",
					success: function(a) {
						setTimeout(function() {
							triggerPageEvent(currentPageId, "sysShareCallBack", {
								method: "onMenuShareAppMessage",
								type: "success"
							})
						}, 100), void 0 !== _log && _log.doShare(3, getWxOpenIdByShare(), showDialogPageByShareCallback)
					},
					cancel: function(a) {
						triggerPageEvent(currentPageId, "sysShareCallBack", {
							method: "onMenuShareAppMessage",
							type: "cancel"
						})
					}
				}), wx.onMenuShareQQ({
					title: shareTitle,
					desc: shareDesc,
					link: shareUrl,
					imgUrl: shareImageUrl,
					success: function(a) {
						setTimeout(function() {
							triggerPageEvent(currentPageId, "sysShareCallBack", {
								method: "onMenuShareQQ",
								type: "success"
							})
						}, 100), void 0 !== _log && _log.doShare(4)
					},
					cancel: function(a) {
						triggerPageEvent(currentPageId, "sysShareCallBack", {
							method: "onMenuShareQQ",
							type: "cancel"
						})
					}
				}), wx.onMenuShareWeibo({
					title: shareTitle,
					desc: shareDesc,
					link: shareUrl,
					imgUrl: shareImageUrl,
					success: function(a) {
						setTimeout(function() {
							triggerPageEvent(currentPageId, "sysShareCallBack", {
								method: "onMenuShareWeibo",
								type: "success"
							})
						}, 100), void 0 !== _log && _log.doShare(6)
					},
					cancel: function(a) {
						triggerPageEvent(currentPageId, "sysShareCallBack", {
							method: "onMenuShareWeibo",
							type: "cancel"
						})
					}
				}), wx.onMenuShareQZone({
					title: shareTitle,
					desc: shareDesc,
					link: shareUrl,
					imgUrl: shareImageUrl,
					success: function(a) {
						setTimeout(function() {
							triggerPageEvent(currentPageId, "sysShareCallBack", {
								method: "onMenuShareQZone",
								type: "success"
							})
						}, 100), void 0 !== _log && _log.doShare(5)
					},
					cancel: function(a) {
						triggerPageEvent(currentPageId, "sysShareCallBack", {
							method: "onMenuShareQZone",
							type: "cancel"
						})
					}
				})
			}

			function checkWeixinAlert() {
				return Cool.util.checkIsWeixin() || appConfig.dev === !0 ? !0 : (winAlert("请在微信里打开!"), !1)
			}

			function reloveTwoClickByISroll() {
				if($page && 1 != $page.data("long")) return !0;
				if(null === _timeOne) _timeOne = (new Date).getTime();
				else {
					var a = (new Date).getTime();
					if(500 > a - _timeOne) return _timeOne = a, !1;
					_timeOne = a
				}
				return !0
			}

			function initQQMap() {
				setTimeout(function() {
					window.isLoadQQMap || $.ajax({
						url: "https://map.qq.com/api/js?v=2.exp&key=QAXBZ-W56RP-WCEDV-LF7WK-PVFE5-TSBAC&callback=qqMapCallback&libraries=geometry",
						dataType: "script"
					}).then(function(a) {})
				}, 1e3)
			}

			function createQQMap(a, b) {
				$(a).on("mousedown mousemove mouseup mouseleave touchstart touchmove touchend", function(a) {
					a.stopPropagation()
				}), initQQMap(), qqMapLoadCallBack(function(c) {
					0 !== c && "0" !== c ? _isEditing && alert("地图服务加载失败，请刷新浏览器重试！") : loadQQMap(a, b)
				})
			}

			function qqMapLoadCallBack(a) {
				if(window.isLoadQQMap) a(0);
				else var b = 0,
					c = setInterval(function() {
						"undefined" == typeof qq || void 0 === typeof qq ? (console.info("地图服务正在加载中..."), b > 100 && (console.info("地图服务加载失败"), clearInterval(c), a(1))) : (window.isLoadQQMap = !0, console.info("地图服务加载成功！"), clearInterval(c), a(0)), b++
					}, 500)
			}

			function loadQQMap(a, b) {
				var c = new qq.maps.LatLng(b.latlng.lat, b.latlng.lng),
					d = new qq.maps.Map(a, {
						panControl: !1,
						zoomControl: !1,
						center: c,
						zoom: b.zoom,
						mapTypeControlOptions: {
							mapTypeIds: []
						}
					});
				qq.maps.event.addListener(d, "click", function(a) {
					window.open(b.url, "_blank")
				});
				var e = (new qq.maps.Marker({
					map: d,
					position: c
				}), new qq.maps.Label({
					position: c,
					map: d,
					content: b.title
				}));
				e.setStyle({
					color: "#428bca",
					borderColor: "#428bca",
					fontSize: "16px",
					fontWeight: "bold"
				})
			}

			function getWCTime() {
				var a = "";
				return _isEditing ? a = window.rrxiuWsiteCrateTime : wsiteInfo.loading && (a = wsiteInfo.loading.createTime), a
			}

			function getProtocol(a) {
				return a ? "https" : "http"
			}

			function getTransformString(a) {
				var b = "";
				if("none" === a || void 0 === a || "" === a || null === a) b = "none";
				else {
					var c = parseInt(a.translate.x),
						d = parseInt(a.translate.y),
						e = parseInt(a.scale),
						f = parseInt(a.angle);
					if(0 === c && 0 === d && 1 === e && 0 === f) b = "none";
					else {
						var g = ["translate(" + c + "px, " + d + "px)", "scale(" + e + ", " + e + ")", "rotate(" + f + "deg)"];
						b = g.join(" ")
					}
				}
				return b
			}

			function parseElement(a, b) {
				var c = "position:absolute;",
					d = a.left || "0",
					e = a.top || "0",
					f = (a.right || "0", a.bottom || "0", a.width),
					g = a.height;
				if("img" != a.type && f > canvasDefaultWidth) {
					try {
						f = a.width.toFixed(0)
					} catch(h) {
						f = a.width
					}
					g = a.height
				}
				c = c + "left:" + d + "px;top:" + e + "px;width:" + f + "px;", -1 != g && (c = c + "height:" + g + "px;"), void 0 !== a.zIndex && (c = c + "z-index:" + a.zIndex + ";");
				var i = 0,
					j = "",
					k = null,
					l = null,
					m = null,
					n = null;
				"img" === a.type && 1 === parseInt(a.content.imageType) && void 0 !== a.content.imageList && 1 === a.content.imageList.length && (c += "overflow:hidden;");
				var o = "",
					p = "";
				_isEditing && (o = " ele-drag ele-resize ele-rotate element-edit ", p = " elem-resize elem-rotate "), _isEditing || a.hasOwnProperty("filter") && (c += "-webkit-filter:" + a.filter.filter + ";filter:" + a.filter.filter + ";"), a.hasOwnProperty("display") && a.display === !1 && (c += "display:none;");
				var q = "element_" + a.id,
					r = "element ";
				_isPageThumb && (o = "", p = "", q = "thumb_" + q);
				var s = $("<div  " + o + ' class="' + r + q + " " + p + '"></div>');
				if(s.attr("style", c), s.css("transform", ""), s.css("-webkit-transform", ""), s.attr("eletype", a.type), _isPageThumb || s.attr("data-id", a.id), "img" == a.type) {
					var t = $("<div style='width:100%;height:100%;position:relative;' class='element-last-box'></div>"),
						u = $("<div class='element-mask'></div>"),
						v = $("<img class='element-last' style='-webkit-user-drag: none;width: 100%; height:100%; margin-left: 0; margin-top: 0;' />");
					v.attr("src", handleImgUrl(a.content.src)), v.css({
						width: "100%" == a.content.width ? f : a.content.width,
						height: "100%" == a.content.height ? g : a.content.height,
						"margin-left": a.content.marginLeft,
						"margin-top": a.content.marginTop
					});
					var w = getTransformString(a.content.transform);
					if(v.css("transform", w), v.css("-webkit-transform", w), u.append(v), a.content.showImageBorder) {
						if("" !== a.content.border) {
							var x = $("<img class='element-border'>");
							x.attr("src", handleImgUrl(a.content.border)), t.append(x)
						}
						"" !== a.content.mask && u.css("-webkit-mask-box-image", "url(" + handleImgUrl(a.content.mask) + ")")
					}
					if(!_isEditing) {
						var y = v.css("width"),
							z = v.css("height");
						if(1 === parseInt(a.content.imageType)) {
							if(void 0 !== a.content.imageList && 1 === a.content.imageList.length) {
								y = parseInt(a.width, 10), z = parseInt(a.height, 10);
								for(var A = a.content.imageList[0].src, B = a.content.imageCount, C = parseInt(y, 10), D = [], E = 0; B > E; E++) D.push(C * E + "px 0");
								$.each(D, function(a, b) {
									var c = $("<span/>");
									c.css({
										width: y,
										height: z,
										position: "absolute",
										opacity: 0,
										transform: v.css("transform"),
										"-webkit-transform": v.css("-webkit-transform"),
										background: "url(" + handleImgUrl(A) + ") repeat " + b
									}), u.append(c)
								})
							}
						} else void 0 !== a.content.imageList && $.each(a.content.imageList, function(a, b) {
							var c = $("<span/>");
							c.css({
								width: y,
								height: z,
								left: v.css("margin-left"),
								top: v.css("margin-top"),
								position: "absolute",
								opacity: 0,
								background: "url(" + handleImgUrl(b.src) + ") no-repeat 0 0",
								backgroundSize: y + " " + z,
								transform: v.css("transform"),
								"-webkit-transform": v.css("-webkit-transform")
							}), u.append(c)
						})
					}
					t.append(u), s.html(wrapElement(t, a))
				} else if("svgShape" == a.type) {
					var F = getSvgFullUrl(a.content.src),
						G = "";
					if(isLoadedSvg(F) && (G = getLoadedSvgXml(F)), "" !== G) {
						var H = handleSvgDocument(G, a.content);
						s.html(wrapElement(H, a))
					} else ! function(b) {
						loadSvg(b).then(function(c, d, e) {
							if(4 == e.readyState && 200 == e.status) {
								isLoadedSvg(b) || pushLoadedSvgKey(b), saveLoadedSvgXml(b, e.responseText);
								var f = handleSvgDocument(e.responseText, a.content);
								s.html(wrapElement(f, a))
							}
						}, function(a) {
							console.error(a)
						})
					}(F)
				} else if("canvas" == a.type) s.html($("<canvas class='element-last' style='width:100%;height:100%;' ></canvas>"));
				else if("div" == a.type) getWCTime() > "2016-12-19 00:00:00" && (a.content = filterXSS(a.content)), ("[removed]" === a.content || "[/removed]" === a.content || "" === a.content) && (a.content = '<div class="element-last" style="width:100%;min-height:inherit;padding: 0 5px;word-wrap: break-word;word-break:break-all;font-size:32px;line-height:1.25"></div>'), s.html(wrapElement(a.content, a));
				else if("input" == a.type) {
					s.attr("inputType", void 0 === a.inputType ? 1 : a.inputType), s.attr("required", void 0 === a.required ? !1 : a.required), s.attr("unique", void 0 === a.unique ? !1 : a.unique);
					var I = "",
						J = parseInt(a.height, 10) > 60 ? 60 : a.height;
					if(_isEditing) I = "<div class='input-outer element-last' data-id=\"" + a.id + '" ', I += ' style="line-height:' + J + "px;padding-left: 15px;height:" + a.height + "px;width:" + a.width + 'px;"', I += ">" + a.content + "</div>";
					else {
						I = "<div class='input-outer'>";
						var K = "<textarea class='input-query element-last' title=\"" + a.content + '" data-id="' + a.id + '" placeholder="' + a.content + '"';
						K += ' style="resize:none;line-height:' + J + "px;height:" + a.height + "px;width:" + a.width + 'px;"', void 0 !== a.required && a.required && (K += " data-required=true "), void 0 !== a.unique && a.unique && (K += " data-unique=true "), K += "></textarea>", I = I + K + "</div>"
					}
					s.html(wrapElement($(I), a))
				} else if("uploadImage" == a.type) {
					var L = "";
					if(_isEditing) {
						L = $("<div  class='uploadImage-outer' style='height:" + a.height + "px'/>");
						var M = "<input type='button' class='uploadImage element-last'  value=\"" + a.content.title + '"/>';
						L.html(M)
					} else {
						L = $('<div class="uploadImage-query uploadImage-outer element-last" data-id=' + a.id + ">"), L.attr({
							title: a.content.title,
							"data-required": a.content.required
						});
						var N = $("<span >").html(a.content.title);
						N.css({
							display: "block",
							"text-align": "center",
							"line-height": a.height + "px"
						}), L.append(N);
						var O = $('<input type="file" accept="image/*" placeholder="' + a.content.title + '" >');
						O.css({
							position: "absolute",
							top: 0,
							left: 0,
							opacity: 0
						}), L.append(O), fnAddUploadEvent(L, O, N, a)
					}
					s.html(wrapElement(L, a))
				} else if("smsCheck" == a.type) {
					var P, Q = "",
						R = a.height / 2 - 10 | 0;
					if(_isEditing) {
						Q = $("<div class='smsCheck-outer element-last' style='height:" + a.height + "px' data-id=" + a.id + "/>");
						var S = $('<div class="smsCheck-cap" style=" ' + a.style + ';top:0;left:0;">').html(a.content.title);
						P = {
							height: R + "px",
							"line-height": R - 5 + "px",
							width: "100%"
						}, S.css(P);
						var T = $('<div style="position:absolute;bottom:0;left:0;">');
						T.css(P);
						var U = $('<div class="smsCheck-cap" style=" ' + a.style + ';bottom:0;left:0;">').html("验证码");
						P.width = "55%", U.css(P);
						var V = $('<div class="smsCheck-buttom" style=" ' + a.style + ';font-size:24px;">').html("获取验证码");
						P.width = "35%", V.css(P), T.append(U), T.append(V), Q.append(S), Q.append(T)
					} else {
						Q = $('<div class="smsCheck-query smsCheck-outer element-last" data-id=' + a.id + ">"), Q.attr({
							title: a.content.title,
							"data-required": a.content.required
						});
						var W = $('<div class="smsCheck-cap" style=" ' + a.style + ';top:0;left:0;">');
						P = {
							height: R + "px",
							"line-height": R - 5 + "px",
							width: a.width,
							padding: 0
						}, W.css(P);
						var X = $('<input class="smsPhone element-last" type="tel" placeholder="' + a.content.title + '" style="padding-left: 15px;width:100%;height:100%">');
						X.attr({
							"data-unique": a.content.unique
						}), W.append(X);
						var Y = $('<div style="position:absolute;bottom:0;left:0;">');
						Y.css(P);
						var Z = $('<div class="smsCheck-cap" style=" ' + a.style + ';bottom:0;left:0; ">');
						P.width = .55 * a.width, Z.css(P);
						var _ = $('<input class="smsCode element-last" type="tel" placeholder="验证码" style="padding-left: 15px;width:100%;height:100%">');
						Z.append(_);
						var aa = $('<div class="smsCheck-buttom " style=" ' + a.style + ';font-size:24px;">'),
							ba = $('<a href="javascript:void(0)" class="smsButtom element-last" style="color: inherit;">获取验证码</a>');
						P.width = .35 * a.width, ba.css(P), aa.css(P), aa.append(ba), Y.append(Z), Y.append(aa), Q.append(W), Q.append(Y), fnBindSMSEvent(X, _, ba, a)
					}
					s.html(wrapElement(Q, a))
				} else if("submit" == a.type) {
					var ca = $("<div  class='submit-outer'/>"),
						da = "<input type='button' class='submit element-last'  value=\"" + a.content + '"';
					_isEditing || (da += 'style="height:' + a.height + 'px;padding:0;"'), da += "/>", ca.html(da), s.html(wrapElement(ca, a))
				} else if("video" == a.type) {
					var ea = "",
						fa = isLiveVideo(a.content.code),
						ga = parseInt(a.content.type),
						ha = 1 === ga && a.content.embed || 0 === ga && fa;
					if(ha && !_isEditing) {
						var ia = a.content.url;
						0 === ga && fa && (ia = a.content.code);
						var ja = fa ? "" : 'type="video/mp4"';
						ea = $('<video style="object-fit: fill;" x-webkit-airplay="true" y-webkit-airplay="true" webkit-playsinline playsinline x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portrait" class="element-last" width="' + a.width + '" height="' + a.height + '">您的浏览器不支持 video 标签。<source src="' + ia + '" ' + ja + "></video>"), 1 === parseInt(a.content.touchType) || 0 === parseInt(a.content.touchType) && ea.attr("controls", "controls"), ea.attr("preload", "auto"), void 0 === a.content.poster || fa || ea.attr("poster", a.content.poster), a.click && ("loop" === a.click.type ? ea.attr("loop", "loop") : "" !== a.click.value && ea.on("ended", function() {
							bindElementEvent(b, a)
						}))
					} else ea = $('<div class="video element-last" style="width:100%;height:100%;"/>'), ha && _isEditing ? (ea.css("background-color", "#000"), void 0 === a.content.poster || 0 === ga && fa ? (ea.html("嵌入视频区域"), ea.css("color", "#FFF"), ea.css("text-align", "center"), ea.css("line-height", a.height + "px")) : ea.css("background-image", "url(" + a.content.poster + ")")) : "" !== a.content.icon && ea.css("background-image", a.content.icon);
					s.html(wrapElement(ea, a))
				} else if("tel" == a.type || "sms" == a.type) {
					var ka = $('<a  class="anchor element-last" style="cursor: default;width:100%;"/>');
					ka.css("height", a.height + "px"), ka.css("line-height", a.height + "px"), ka.attr("href", createHref(a.type, a.content.value)), ka.html(a.content.text), s.html(wrapElement(ka, a))
				} else if("imggroup" == a.type) {
					var la = $('<div class="slider slider_' + a.id + ' element-last" style="width:100%;height:100%;"></div>'),
						ma = a.content ? a.content.length : 0;
					_isEditing || la.attr("id", "slider" + a.id), ma > 0 && la.css("background", "url(" + handleImgUrl(a.content[0].src) + ") center center / cover"), la.attr("eletype", a.eletype), la.attr("autoplay", a.autoPlay), la.attr("playstyle", a.playStyle), la.attr("showarrow", a.showArrow), la.attr("leftarrow", a.leftArrow), la.attr("rightarrow", a.rightArrow);
					for(var na = 0; ma > na; na++)
						if(!_isEditing) {
							var oa = $("<img/>");
							oa.attr("src", handleImgUrl(a.content[na].src)), oa.attr("alt", a.content[na].title), oa.attr("elemId", a.id), oa.attr("color", a.color), oa.css("width", "100%"), oa.css("height", "100%"), oa.css("display", "none"), la.append(oa)
						}
					s.html(wrapElement(la, a))
				} else if("shape" == a.type)
					if("line" == a.content.type) {
						var pa = a.height / 2,
							qa = a.width,
							ra = "0," + pa + " " + qa + "," + pa,
							sa = void 0 === a.content.thickness ? 2 : a.content.thickness,
							ta = void 0 === a.content.backgroundColor ? "#000" : a.content.backgroundColor,
							ua = getLineStrokeDasharray(a.content.subType, sa),
							va = '<svg id="shape' + a.id + '" width="' + a.width + '" height="' + a.height + '" class="element-last" version="1.1" xmlns="http://www.w3.org/2000/svg"><polyline stroke="' + ta + '" stroke-width="' + sa + '" points="' + ra + '" stroke-opacity="1" ' + ua + "></polyline></svg>";
						s.html(wrapElement(va, a))
					} else {
						var wa = $('<div class="element-last" style="height:100%;width:100%;"></div>');
						wa.css("-webkit-mask-image", "url('" + getShape(a.content.type) + "')"), wa.css("background-color", a.content.backgroundColor), wa.css("-webkit-mask-size", "100% 100%"), s.html(wrapElement(wa, a))
					}
				else if("html" === a.type) {
					var xa = "",
						ya = "";
					a.content.scroll || _isEditing || (xa = 'style="overflow:inherit"', ya = "height:100%;");
					var za = /iphone|ipad/gi.test(navigator.appVersion);
					a.content.fullscreen && za && (ya += "overflow-y:auto;"), "" !== ya && (ya = 'style="' + ya + '"');
					var Aa = '<div class="element-last" style="width:100%;height:100%;min-height:inherit;word-wrap: break-word;word-break:break-all;font-size:48px">';
					Aa += '<div class="we-canvas" ' + xa + ">", Aa += '<div class="iscroll_html" ' + ya + ">", Aa += "<style>" + getPrefixCss(".we-canvas", a.content.css) + "</style>", Aa += a.content.html, Aa += "</div>", s.html(wrapElement(Aa, a))
				} else if("audio" === a.type) {
					var Ba = $('<div class="audio element-last" style="width:100%;height:100%;"/>');
					"" !== a.content.icon && Ba.css("background-image", a.content.icon), "" !== a.content.url && createAudioElement(b, a.id, a), s.html(wrapElement(Ba, a))
				} else if("map" === a.type) {
					var Ca = "";
					a.content.embed ? (Ca = $('<div id="qqmap-' + a.id + '" style="width: 100%;height:100%"></div>'), _isEditing && Ca.css("pointer-events", "none"), createQQMap(Ca.get(0), a.content)) : (Ca = $('<a href="javascript:void(0)" target="_blank" class="map element-last" style="width:100%;height:100%;"/>'), "" !== a.content.icon && Ca.css("background-image", a.content.icon), "" === a.content.url || _isEditing || Ca.attr("href", a.content.url)), s.html(wrapElement(Ca, a))
				} else if("interact" === a.type) {
					var Da = "",
						Ea = a.width / 2 - 10;
					if(Da = $("upload" === a.content.type ? "<div class='element-last'><div class='interact-entry' style='top:0px;left:" + Ea + "px'> +1</div><div class='interactIcon'><img src='" + handleImgUrl(a.content.imageUrl) + "'><div class='interactCount'>" + a.content.count + "</div></div></div>" : "<div class='element-last'><div class='interact-entry' style='top:0px;left:" + Ea + "px'> +1</div><div class='interactIcon'><i class='" + a.content.type + "'></i><div class='interactCount'>" + a.content.count + "</div></div></div>"), s.html(wrapElement(Da, a)), !_isEditing) {
						var Fa = getRrxiuFontCssHost() + "font_" + _dataObj.guid + ".css";
						Cool.util.loadCss(Fa);
						var Ga = _dataObj.guid + b + a.id;
						"" !== Cool.cookie.get(Ga) && s.children().css("color", a.content.selectedColor || "#47B859"), Da.unbind().bind(clickEventType, function(c) {
							return reloveTwoClickByISroll() ? void 0 === _dataObj.guid ? (winAlert("请发布系统后再操作！"), !1) : ("" === Cool.cookie.get(Ga) && (Cool.cookie.set(Ga, "1"), Da.find(".interact-entry").animate({
								top: -20,
								opacity: 1
							}, 800, function() {
								$(this).fadeOut(400).remove()
							}), addInteractCount(a, b)), !1) : void 0
						})
					}
				} else if("checkbox" === a.type || "radio" === a.type) {
					var Ha = "checkbox" === a.type ? "多选" : "单选",
						Ia = $("<div data-id='" + a.id + "' title='" + a.content.title + "' class='control-outer " + a.type + "-query element-last'></div>");
					Ia.html("<div class='title' style='background-color:" + a.content.theme + "'>" + a.content.title + "(" + Ha + ")</div>");
					var Ja = $("<div class='options'></div>");
					s.html(wrapElement(Ia, a));
					var Ka = s.children(),
						La = Ka.css("borderStyle") || "solid",
						Ma = Ka.css("borderWidth") || "1px",
						Na = 0;
					if($.each(a.content.options, function(b, c) {
							var d = Ma + " " + La + " " + a.content.theme;
							b === a.content.options.length - 1 && (a.content.hasOther || (d = "none"));
							var e = "";
							e = "checkbox" === a.type ? "<input title='" + c.value + "' class='option' data-id='" + c.id + "' type='checkbox'>" : "<input name='radioname" + a.id + "' title='" + c.value + "' class='option' data-id='" + c.id + "' type='radio'>", Ja.append("<div class='option-group' style='border-bottom:" + d + "'><label class='option-label'>" + e + c.value + "</label></div>"), Na = c.id
						}), a.content.hasOther) {
						var Oa = "",
							Pa = Na + 1;
						if(Oa = "checkbox" === a.type ? "<input title='' class='option' data-id='" + Pa + "' type='checkbox'><input class='custom-input ' style='width:80%;height:60px;background: transparent;border: none;' data-id=\"" + Pa + "\"  placeholder='请输入'/>" : "<input name='radioname" + a.id + "' title='' class='option' data-id='" + Pa + "' type='radio'><input class='custom-input ' style='width:80%;height:60px;background: transparent;border: none;' data-id=\"" + Pa + "\"  placeholder='请输入'/>", Ja.append("<div class='option-group' style='border-bottom:none;'><label class='option-label' style='width:100%;'>" + Oa + "</label></div>"), _isEditing) Ja.css("pointer-events", "none");
						else {
							var Qa = Ja.find("input.custom-input");
							Qa.bind("change", function() {
								if(reloveTwoClickByISroll()) {
									var a = $(this);
									$(a[0].previousSibling).attr("title", a.val())
								}
							}), Qa.bind("click", function() {
								if(reloveTwoClickByISroll()) {
									var a = $(this);
									$(a[0].previousSibling).click()
								}
							})
						}
					}
					Ia.append(Ja), void 0 !== a.content.required && a.content.required && Ia.attr("data-required", !0), Ka.css("borderWidth", Ma), Ka.css("borderStyle", La), Ka.css("borderColor", a.content.theme), Ia.find(".option-label").off(clickEventType).on(clickEventType, function(a) {
						a.stopPropagation()
					})
				} else if("rating" === a.type) {
					var Ra = "<div class='rate'><span data-id='1' class='" + a.content.type + "'></span><span data-id='2' class='" + a.content.type + "'></span><span data-id='3' class='" + a.content.type + "'></span><span data-id='4' class='" + a.content.type + "'></span><span data-id='5' class='" + a.content.type + "'></span></div>",
						Sa = $("<div class='rating-query rating-outer element-last' title='" + a.content.title + "' data-id='" + a.id + "'><div class='title'>" + a.content.title + "</div>" + Ra + "</div>");
					if(!_isEditing) {
						var Ta = getRrxiuFontCssHost() + "font_" + _dataObj.guid + ".css";
						Cool.util.loadCss(Ta);
						var Ua = Sa.find("." + a.content.type);
						Ua.unbind().bind(clickEventType, function() {
							if(reloveTwoClickByISroll())
								for(var b = parseInt($(this).data("id")) - 1, c = null, d = 0; 5 > d; d++) c = $(Ua[d]), d > b ? c.is(".selected") && (c.css("color", "inherit"), c.removeClass("selected")) : (c.css("color", a.content.selectedColor), c.addClass("selected"))
						})
					}
					void 0 !== a.content.required && a.content.required && Sa.attr("data-required", !0), s.html(wrapElement(Sa, a)), s.children().css("lineHeight", a.height - 6 + "px")
				} else if("select" === a.type) {
					if(k = $("<div style='padding-left:15px;' class='select-outer'></div>"), _isEditing) k.html("<div class='editSelect' style='line-height:" + a.height + "px'>" + a.content.title + "<span>▼</span></div>");
					else {
						var Va = a.content.title || "请选择",
							Wa = "<option>" + Va + "</option>";
						$.each(a.content.options, function(a, b) {
							Wa += "<option>" + b.value + "</option>"
						}), i = (a.height - (k.children().css("font-size") || 18)) / 2 - 4, k.html("<select title='" + a.content.title + "' data-id='" + a.id + "' class='select-query element-last'>" + Wa + "</select><span style='top:" + i + "px'>▼</span>")
					}
					void 0 !== a.content.required && a.content.required && k.children().attr("data-required", !0), s.html(wrapElement(k, a))
				} else if("date" === a.type) {
					var Xa = "",
						Ya = Cool.util.formateDate(a.content.date) || "年-月-日";
					if(_isEditing) Xa = "<div class='input-outer element-last'  data-id=\"" + a.id + '" ', Xa += ' style="line-height:' + a.height + "px;padding-left: 15px;height:" + a.height + "px;width:" + a.width + 'px;"', Xa += ">" + Ya + "</div>";
					else {
						Xa = "<div class='input-outer'>";
						var Za = '<input value="' + Ya + "\" placeholder='年-月-日' type='date' class='date-query element-last' title=\"" + a.content.title + '" data-id="' + a.id + '"';
						Za += ' style="overflow: hidden;-webkit-appearance: none;-moz-appearance: none;-ms-appearance: none;appearance: none;line-height:' + a.height + "px;height:" + a.height + "px;width:" + a.width + 'px;"', void 0 !== a.content.required && a.content.required && (Za += " data-required=true "), Za += "></input>", Xa = Xa + Za + "</div>"
					}
					s.html(wrapElement($(Xa), a))
				} else if("time" === a.type) {
					console.log("time", a), k = "";
					var $a = parseFloat(a.height),
						_a = "",
						ab = a.content.precise,
						bb = "32%",
						cb = "32%",
						db = "32%";
					if(l = "2%", m = "2%", n = "0", "hour" === ab ? (bb = "100%", l = "0") : "minute" === ab && (bb = "48%", cb = "50%", l = "2%", m = "0"), _isEditing) {
						k = $("<div class='select-outer'></div>");
						var eb = "-1" === a.content.hour ? "时" : a.content.hour + "时",
							fb = "-1" === a.content.minute ? "分" : a.content.minute + "分",
							gb = "-1" === a.content.second ? "秒" : a.content.second + "秒";
						j = "<div class='time-cap editSelectTime' style='margin-right:{{marginRight}};width:{{width}};" + a.style + ";height:" + $a + "px;line-height:" + $a + "px'>{{options}}<span>▼</span></div>", _a = compileHtml(j, {
							options: eb,
							width: bb,
							marginRight: l
						}), "hour" !== ab && (_a += compileHtml(j, {
							options: fb,
							width: cb,
							marginRight: m
						})), "second" === ab && (_a += compileHtml(j, {
							options: gb,
							width: db,
							marginRight: n
						})), k.html(_a)
					} else {
						k = $("<div class='timeSelect-outer time-query' data-id='" + a.id + "' title='" + a.content.title + "' ></div>");
						var hb = 0,
							ib = "",
							jb = '<option value="-1">时</option>',
							kb = '<option value="-1">分</option>',
							lb = '<option value="-1">秒</option>';
						for(hb = 0; 24 > hb; hb++) ib = 10 > hb ? "0" + hb : hb.toString(), jb += "<option>" + ib + "时</option>";
						for(hb = 0; 60 > hb; hb++) ib = 10 > hb ? "0" + hb : hb.toString(), kb += "<option>" + ib + "分</option>", lb += "<option>" + ib + "秒</option>";
						i = ($a - (k.children().css("font-size") || 18)) / 2 - 5, j = "<div class='time-select' style='margin-right:{{marginRight}};width:{{width}};" + a.style + ";'><select class='element-last'>{{options}}</select><span style='top:" + i + "px'>▼</span></div>", _a = compileHtml(j, {
							options: jb,
							width: bb,
							marginRight: l
						}), "hour" !== ab && (_a += compileHtml(j, {
							options: kb,
							width: cb,
							marginRight: m
						})), "second" === ab && (_a += compileHtml(j, {
							options: lb,
							width: db,
							marginRight: n
						})), k.html(_a), void 0 !== a.content.required && a.content.required && k.attr("data-required", !0)
					}
					s.html(wrapElement(k, a))
				} else if("city" === a.type) {
					var mb = "",
						nb = 68,
						ob = "0%",
						pb = 0;
					a.content.province.show && pb++, a.content.city.show && pb++, a.content.area.show && pb++, 1 === pb ? ob = 100 : (2 === pb || 3 === pb) && (ob = 50);
					var qb = 0;
					_isEditing ? (k = $("<div class='select-outer'></div>"), j = "<div class='editSelectTime city-cap' style='{{style}};margin-right:{{marginRight}};margin-top: {{marginTop}};width:{{width}};height:{{height}};line-height:{{height}}'>{{selectName}}<span>▼</span></div>", a.content.province.show && (qb = a.content.city.show ? 2 : 0, mb = compileHtml(j, {
						selectName: a.content.province.name,
						marginTop: 0,
						marginRight: qb + "%",
						width: ob - qb + "%",
						height: nb + "px",
						style: a.style
					})), a.content.city.show && (qb = !a.content.province.show && a.content.area.show ? 2 : 0, mb += compileHtml(j, {
						selectName: a.content.city.name,
						marginTop: 0,
						marginRight: qb + "%",
						width: ob - qb + "%",
						height: nb + "px",
						style: a.style
					})), a.content.area.show && (mb += 3 === pb ? compileHtml(j, {
						selectName: a.content.area.name,
						marginTop: "2%",
						marginRight: "0",
						width: "100%",
						height: nb + "px",
						style: a.style
					}) : compileHtml(j, {
						selectName: a.content.area.name,
						marginTop: 0,
						marginRight: "0",
						width: ob + "%",
						height: nb + "px",
						style: a.style
					})), a.content.other.show && (mb += "<div class='editSelectTime city-cap' style='margin-top: 2%;width:100%;" + a.style + ";height:" + nb + "px;line-height:" + nb + "px'>" + a.content.other.value || "详细地址</div>"), k.html(mb)) : (k = $("<div style='padding-left: 0;' class='timeSelect-outer formCitySelect city-query' data-id='" + a.id + "' title='" + a.content.title + "' ></div>"), i = "20px", j = "<div class='time-select' style='{{style}};margin-right:{{marginRight}};margin-top: {{marginTop}};height:{{height}};width: {{width}};'><select name='{{selectName}}' class='element-last'></select><span style='top:{{top}}'>▼</span></div>", a.content.province.show && (qb = a.content.city.show ? 2 : 0, mb += compileHtml(j, {
						selectName: "province",
						marginTop: 0,
						marginRight: qb + "%",
						width: ob - qb + "%",
						height: nb + "px",
						style: a.style,
						top: i,
						dataId: a.id
					})), a.content.city.show && (qb = !a.content.province.show && a.content.area.show ? 2 : 0, mb += compileHtml(j, {
						selectName: "city",
						marginTop: 0,
						marginRight: qb + "%",
						width: ob - qb + "%",
						height: nb + "px",
						style: a.style,
						top: i,
						dataId: a.id
					})), a.content.area.show && (mb += 3 === pb ? compileHtml(j, {
						selectName: "area",
						marginTop: "2%",
						width: "100%",
						marginRight: "0",
						height: nb + "px",
						style: a.style,
						top: i,
						dataId: a.id
					}) : compileHtml(j, {
						selectName: "area",
						marginTop: 0,
						marginRight: "0",
						width: ob + "%",
						height: nb + "px",
						style: a.style,
						top: i,
						dataId: a.id
					})), a.content.other.show && (mb += "<div class='input-cap' style='border:none;margin-top: 2%;width:100%;" + a.style + ";height:" + nb + "px;line-height:" + nb + "px'><input placeholder='详细地址' value='" + a.content.other.value + "' type='text' style='background-color: inherit;padding-left: 15px;border:none;width:100%;height:94%;'></div>"), k.html(mb), void 0 !== a.content.required && a.content.required && k.attr("data-required", !0), Cool.util.loadJs(appConfig.libHost + "citys/jquery.citys.js", function() {
						k.citys({
							province: a.content.province.code,
							city: a.content.city.code,
							area: a.content.area.code,
							onChange: function(a) {}
						})
					})), s.html(wrapElement(k, a))
				} else if("file" === a.type) {
					var rb = $('<a  href="javasript:void(0)" class="file-element-box element-last" style="font-size:inherit;color: inherit;height:100%;cursor: default;width:100%;"/>'),
						sb = "";

					sb = _isEditing ? "" : "<input data-id='" + a.id + "' title='" + a.content.title + "' class='file-query' type='file'/>", rb.html(sb + "<div class='file-content' style='pointer-events:none;height:" + a.height + "px;line-height:" + a.height + "px;'><span class='fb_plus'>+</span><p class='fb_text'>上传文件（需小于10MB）</p></div>"), !_isEditing && void 0 !== a.content.required && a.content.required && rb.find(".file-query").attr("data-required", !0), s.html(wrapElement(rb, a))
				} else if("multiselect" === a.type) {
					k = $("<div class='timeSelect-outer formCitySelect multiselect-query' data-id='" + a.id + "' title='" + a.content.title + "' ></div>"), i = 20;
					var tb = 68,
						ub = 50,
						vb = "",
						wb = a.content.threeCount > 0;
					l = 2, m = 0, wb && (l = 0, ub = 32, m = 2), _isEditing ? (k = $("<div class='select-outer'></div>"), j = "<div class='editSelectTime  multiselect-cap' style='" + a.style + ";margin-right:{{marginRight}};width:{{width}};height:" + tb + "px;line-height:" + tb + "px'>{{selectName}}<span>▼</span></div>", vb += j.replace("{{width}}", ub - l + "%").replace("{{marginRight}}", "2%").replace("{{selectName}}", multiSelectObj.getTipValue(a.content, "one")), vb += j.replace("{{width}}", ub + "%").replace("{{marginRight}}", m + "%").replace("{{selectName}}", multiSelectObj.getTipValue(a.content, "two")), wb && (vb += j.replace("{{width}}", ub + "%").replace("{{marginRight}}", 0).replace("{{selectName}}", multiSelectObj.getTipValue(a.content, "three")))) : (j = "<div class='time-select' style='" + a.style + ";margin-right:{{marginRight}};height:" + tb + "px;width:{{width}};'><select name='{{name}}'  class='element-last'>{{options}}</select><span style='top:" + i + "px'>▼</span></div>", vb += compileHtml(j, {
						name: "one",
						options: multiSelectObj.getOptions(a.content, "one"),
						marginRight: "2%",
						width: ub - l + "%"
					}), vb += compileHtml(j, {
						name: "two",
						options: multiSelectObj.getOptions(a.content, "two"),
						marginRight: m + "%",
						width: ub + "%"
					}), wb && (vb += compileHtml(j, {
						name: "three",
						options: multiSelectObj.getOptions(a.content, "three"),
						marginRight: 0,
						width: ub + "%"
					}))), k.html(vb), void 0 !== a.content.required && a.content.required && k.attr("data-required", !0), s.html(wrapElement(k, a))
				} else if("goods" === a.type) {
					var xb = $("<div class='element-last'  style='width:100%;height:100%;'></div>"),
						yb = '<div style="{{objStyle}}" class="goods-list goods-query" data-id="{{dataId}}" title="{{title}}">    {{each list as goods j}}<div class="goods-box" data-usestock="{{goods.useStock}}" data-stock="{{goods.stock}}" data-name="{{goods.name}}" data-id="{{goods.id}}" data-price="{{goods.price}}"><div class="gd-content">            {{if goods.picture!=""}}<div class="goods-image-box"><img src="{{imageHost+goods.picture+imageThumb}}"></div><div class="goods-text-box" style="width: {{textHeight}}px;"><div class="goods-name">{{goods.name}}</div><div class="goods-desc">{{goods.desc}}</div></div>            {{/if}}            {{if goods.picture==""}}<div class="goods-text-box" style="width: 100%;height: inherit;"><div class="goods-name">{{goods.name}}</div><div class="goods-desc">{{goods.desc}}</div></div>            {{/if}}</div><div class="gd-price-number"><div class="price-stock"><div class="price" style="top:{{goods.useStock==1?\'5\':\'25\'}}px"><span>￥</span><span class="p-number">{{goods.price}}</span></div>                {{if goods.useStock==1}}<div class="stock">                    {{stockTitle}}<span id="stock-{{dataId}}-{{goods.id}}">{{goods.stock}}</span>{{stockUnit}}</div>                {{/if}}</div><div class="number-container"><a href="javascript:void(0)" class="num-minus">减</a>                {{if goods.isEdit}}<input style="background-color: rgba(158, 158, 158, 0.18);" readonly="readonly" type="number" min="0" step="1" value="{{goods.defaultNum}}"/>                {{/if}}                {{if !goods.isEdit}}<input style="pointer-events: {{isEditing?\'none\':\'auto\'}};" type="number" min="0" step="1" value="{{goods.defaultNum}}"/>                {{/if}}<a href="javascript:void(0)" class="num-add">加</a></div></div></div>    {{/each}}</div>\n';
					yb = compileHtml(yb, {
						isEditing: _isEditing,
						objStyle: a.style,
						dataId: a.id,
						title: a.content.title,
						stockTitle: a.content.stockTitle || "库存",
						stockUnit: a.content.stockUnit || "件",
						list: a.content.list,
						imageHost: appConfig.imageHost,
						imageThumb: "@!200x200",
						textHeight: a.width > 200 ? a.width - 120 - 55 : a.width
					}), xb.html(yb), void 0 !== a.content.required && a.content.required && xb.attr("data-required", !0);
					var zb = xb.find(".goods-query"),
						Ab = zb.css("background-color");
					zb.find(".gd-price-number").css("background-color", Ab), zb.css("background-color", "");
					var Bb = zb.css("border-color");
					zb.find(".number-container").css("border-color", Bb), zb.find(".number-container .num-minus").css("border-color", Bb), zb.find(".number-container .num-add").css("border-color", Bb), s.html(wrapElement(xb, a))
				} else if("plugin" === a.type) {
					var Cb = $("<div class='element-last' style='width:100%;height:100%;'></div>");
					pluginIsFull(a.content.sizeType) && s.css({
						top: 0,
						left: 0
					}), s.html(wrapElement(Cb, a)), $wePluginClient.render(a, Cb, b, _isPageThumb)
				}
				return _isEditing || (s.find(".submit").click(function() {
					var b = $(this);
					b.val("正在提交"), setTimeout(function() {
						submitData(b, a)
					}, 100)
				}), "tel" === a.type ? s.on("click", function() {
					reloveTwoClickByISroll() && apiHelper.getAppInstance().interactHit("telephone", "")
				}) : "multiselect" === a.type ? multiSelectObj.bindEvent(s, a) : "goods" === a.type ? bindGoodsEvent(s, a) : "file" === a.type ? bindFileUploadEvent(s) : "date" === a.type && (Cool.util.checkIsPc() ? s.find(".date-query").addClass("full") : s.find(".date-query").on("input", function() {
					$(this).val().length > 0 ? $(this).addClass("full") : $(this).removeClass("full")
				}))), _isEditing && a.hasOwnProperty("filter") && ($(s.find(".element-box")).css("-webkit-filter", a.filter.filter), $(s.find(".element-box")).css("filter", a.filter.filter)), _isEditing || _isPageThumb || a.hasOwnProperty("sensor") && a.sensor.show && (s.children(0).css("overflow", "visible"), s.children(0).attr("data-depth", a.sensor.depth), s.children(0).addClass("layer")), s
			}

			function compileHtml(a, b) {
				template.config("escape", !1);
				var c = template.compile(a);
				return c(b)
			}

			function bindGoodsEvent(a) {
				var b = 0,
					c = null;
				a.find(".goods-box .num-minus").off().on("click", function() {
					reloveTwoClickByISroll() && (c = $(this).parent().find("input"), "readonly" !== c.attr("readonly") && (b = parseInt(c.val(), 10) - 1, 0 > b || $(this).parent().find("input").val(b)))
				}), a.find(".goods-box .num-add").off().on("click", function() {
					reloveTwoClickByISroll() && (c = $(this).parent().find("input"), "readonly" !== c.attr("readonly") && (b = parseInt(c.val(), 10) + 1, $(this).parent().find("input").val(b)))
				})
			}

			function bindFileUploadEvent(a) {
				a.find("input").off().on("change", function(b) {
					if(reloveTwoClickByISroll()) {
						var c = b.target.files || b.dataTransfer.files;
						if(void 0 !== c[0]) {
							var d = c[0].name,
								e = (c[0].size / 1e3).toFixed(0);
							if(e > 10240) winAlert("上传附近不能超过10MB"), resetFileInput(a);
							else {
								var f = (c[0].size / 1e3).toFixed(0) + "KB";
								a.find(".file-content").html(d + "（" + f + "）")
							}
						}
					}
				})
			}

			function isLoadedSvg(a) {
				return loadedSvgKey.indexOf(getMd5SvgFullSrc(a)) > -1
			}

			function pushLoadedSvgKey(a) {
				loadedSvgKey.push(getMd5SvgFullSrc(a))
			}

			function saveLoadedSvgXml(a, b) {
				var c = getMd5SvgFullSrc(a);
				loadedSvgXml[c] = b
			}

			function getLoadedSvgXml(a) {
				return loadedSvgXml[getMd5SvgFullSrc(a)]
			}

			function getMd5SvgFullSrc(a) {
				return hex_md5(a)
			}

			function loadSvg(a) {
				var b = (new Date).getTime();
				return a += "?timestamp=" + b, $.ajax({
					url: a,
					type: "GET",
					xhrFields: {
						withCredentials: !0
					}
				})
			}

			function getSvgFullUrl(a) {
				if(a = appConfig.imageHost + a, appConfig.dev) return a;
				if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return a.replace("http://", "https://");
				var b = Cool.util.isSpecDomain(a);
				if(b) {
					var c = Cool.util.getUrlSubDomain(a);
					c && -1 === a.indexOf("://ns") && (a = a.replace("://" + c, "://ns" + c), a = a.replace("https://", "http://"))
				}
				return a
			}

			function handleSvgDocument(a, b) {
				for(var c, d = $(a).length, e = 0; d > e; e++)
					if("svg" == $(a)[e].tagName) {
						c = $(a)[e];
						break
					}
				var f = {
						width: parseFloat(c.getAttribute("width")),
						height: parseFloat(c.getAttribute("height"))
					},
					g = "0 0 " + f.width + " " + f.height;
				c.setAttribute("width", "100%"), c.setAttribute("height", "100%"), c.setAttribute("preserveAspectRatio", "none"), c.removeAttribute("baseProfile"), c.setAttribute("class", "element-last"), c.getAttribute("viewBox") || c.setAttribute("viewBox", g);
				for(var h = $(c), i = h.find("[fill], [style*='fill:']"), j = 0; j < b.fillColorList.length; j++) i.eq(j).css({
					fill: b.fillColorList[j].fill
				});
				return h
			}

			function isLiveVideo(a) {
				var b = ["yiqicam.com"],
					c = !1;
				if(a)
					for(var d = 0; d < b.length; d++)
						if(a.indexOf(b[d]) > -1) {
							c = !0;
							break
						}
				return c
			}

			function fnAddUploadEvent(a, b, c, d) {
				var e = getLibHost();
				Cool.util.loadJs([e + "image-upload/exif.min.js", e + "image-upload/ImageFileUpload.min.js"], function() {
					var e = getServiceHostIfHttps(),
						f = {
							fileInput: b.get(0),
							url: e + "extend/image/uploadImage",
							onProgress: function() {
								c.html("正在加载...")
							},
							onSelected: function(b, e) {
								d.content.isForm ? (fnShowUploadImage(a, d, b), c.html(d.content.title)) : e.upload()
							},
							onSuccess: function(b) {
								var e = handleImgUrl(b.url);
								fnShowUploadImage(a, d, e), c.html(d.content.title), !d.content.isForm && d.content.noteValue && triggerPageEvent(currentPageId, d.content.noteValue, e)
							},
							onFailure: function(a) {
								c.html("加载失败"), !d.content.isForm && d.content.noteValue && triggerPageEvent(currentPageId, d.content.noteValue, "")
							}
						},
						g = new ImageFileUpload;
					g.init(f)
				})
			}

			function fnShowUploadImage(a, b, c) {
				var d = a.find("img");
				if(d && d.length > 0) d.attr("src", c);
				else {
					var e = $('<div class="uploadImage">'),
						f = document.createElement("div");
					f.style = b.style, e.css({
						position: "absolute",
						top: 0,
						left: 0,
						"background-color": f.style.backgroundColor,
						width: "100%",
						height: "100%",
						overflow: "hidden"
					}), d = $('<img width="100%" />').attr({
						src: c
					}), e.append(d), a.prepend(e)
				}
			}

			function getServiceHostIfHttps() {
				if(appConfig.dev) return appConfig.serviceHost;
				var a = appConfig.serviceHost;
				return wsiteInfo.flhtps || wsiteInfo.httpsEnabled ? a.indexOf("https://") > -1 ? a : a.replace("http://", "https://") : a
			}

			function getInteractServiceHostIfHttps() {
				if(appConfig.dev) return appConfig.interactServiceHost;
				var a = appConfig.interactServiceHost;
				return rrxgpara.renb && rrxgpara.rdn && (a = "https://" + rrxgpara.rdn + "/"), void 0 === a || null === a ? "" : wsiteInfo.flhtps || wsiteInfo.httpsEnabled ? a.indexOf("https://") > -1 ? a : a.replace("http://", "https://") : a
			}

			function getRrxiuFontCssHost() {
				if(appConfig.dev) return appConfig.rrxiuFontCssHost;
				if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return appConfig.rrxiuFontCssHost.replace("http://", "https://");
				var a = appConfig.rrxiuFontCssHost,
					b = Cool.util.isSpecDomain(a);
				if(b) {
					var c = Cool.util.getUrlSubDomain(a);
					c && -1 === a.indexOf("://ns") && (a = a.replace("://" + c, "://ns" + c), a = a.replace("https://", "http://"))
				}
				return a
			}

			function getLibHost() {
				if(appConfig.dev || _isEditing) return appConfig.libHost;
				if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return appConfig.libHost.replace("http://", "https://");
				var a = appConfig.libHost,
					b = Cool.util.isSpecDomain(a);
				if(b) {
					var c = Cool.util.getUrlSubDomain(a);
					c && -1 === a.indexOf("://ns") && (a = a.replace("://" + c, "://ns" + c), a = a.replace("https://", "http://"))
				}
				return a
			}

			function getWebFontHost() {
				if(appConfig.dev) return appConfig.webFontHost;
				if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return appConfig.webFontHost.replace("http://", "https://");
				var a = appConfig.webFontHost,
					b = Cool.util.isSpecDomain(a);
				if(b) {
					var c = Cool.util.getUrlSubDomain(a);
					c && -1 === a.indexOf("://ns") && (a = a.replace("://" + c, "://ns" + c), a = a.replace("https://", "http://"))
				}
				return a
			}

			function getVrHost() {
				if(appConfig.dev) return appConfig.vrHost;
				if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return appConfig.vrHost.replace("http://", "https://");
				var a = appConfig.vrHost,
					b = Cool.util.isSpecDomain(a);
				if(b) {
					var c = Cool.util.getUrlSubDomain(a);
					c && -1 === a.indexOf("://ns") && (a = a.replace("://" + c, "://ns" + c), a = a.replace("https://", "http://"))
				}
				return a
			}

			function getDataHost() {
				if(appConfig.dev) return appConfig.dataHost;
				var a = appConfig.dataHost;
				if(wsiteInfo && wsiteInfo.datacdn && (a = wsiteInfo.datacdn, a = wsiteInfo.flhtps || wsiteInfo.httpsEnabled ? "https://" + wsiteInfo.datacdn + "/" : "http://" + wsiteInfo.datacdn + "/"), wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return a.replace("http://", "https://");
				var b = a,
					c = Cool.util.isSpecDomain(b);
				if(c) {
					var d = Cool.util.getUrlSubDomain(b);
					d && -1 === b.indexOf("://ns") && (b = b.replace("://" + d, "://ns" + d), b = b.replace("https://", "http://"))
				}
				return b
			}

			function startTimedCount(a, b) {
				timer_count = 60, a.html(timer_count + "s"), timer_instance = setInterval(function() {
					console.log("timer_instance", 1), timer_count -= 1, 0 === timer_count ? resetSMSButton(a, b) : a.html(timer_count + "s")
				}, 1e3)
			}

			function resetSMSButton(a, b) {
				clearInterval(timer_instance), a.html("获取验证码"), b.data("smsAuth", "")
			}

			function fnBindSMSEvent(a, b, c, d) {
				c.unbind().bind("click", function() {
					if(reloveTwoClickByISroll()) {
						if(void 0 === _dataObj.guid) return void winAlert("请发布系统后再操作！");
						if(!b.data("smsAuth")) {
							var e = a.val();
							if(!e) return void winAlert(d.content.title + "不能为空！");
							var f = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
							return f.test(e) ? void verifyAlert(_host, _dataObj.guid, e, "", function(a) {
								a.isVerify && (c.val("发送中..."), b.data("smsAuth", a.data.guid), startTimedCount(c, b))
							}) : void winAlert("手机号码格式不正确！")
						}
					}
				})
			}

			function addInteractCount(a, b) {
				$.post(_host + "interactData/add", {
					form: {
						wsiteGuid: _dataObj.guid,
						pageId: b,
						elemId: a.id,
						name: a.content.name
					}
				}, function(c) {
					if(0 === c.result) {
						var d = apiHelper.getAppInstance().getElement(a.id, b);
						if(d.length > 0) {
							var e = d.find(".interactCount"),
								f = parseInt(c.data.count, 10) + (null !== c.data.water ? parseInt(c.data.water, 10) : 0);
							e.html(f), d.children().css("color", a.content.selectedColor || "#47B859"), bindElementEvent(b, a)
						}
					}
				}, "json")
			}

			function setInteractData(a, b) {
				for(var c = 0; c < a.length; c++)
					for(var d = a[c].elementList, e = 0; e < d.length; e++)
						if("interact" === d[e].type) {
							var f = b[_dataObj.guid + a[c].id + d[e].id] || {
								count: 0,
								water: 0
							};
							d[e].content.count = parseInt(f.count, 10) + (null !== f.water ? parseInt(f.water, 10) : 0)
						}
			}

			function getAllPageInteractData(a) {
				if(void 0 === _dataObj.guid || _isSetting) return void a();
				var b = _dataObj.pageList;
				_dataObj.dialogList && _dataObj.dialogList.length > 0 && (b = b.concat(_dataObj.dialogList));
				for(var c = "", d = 0; d < b.length; d++)
					for(var e = b[d].elementList, f = 0; f < e.length; f++) "interact" === e[f].type && (c += b[d].id + "," + e[f].id + "|");
				"" !== c ? (c = c.substr(0, c.length - 1), $.post(_host + "interactData/get", {
					form: {
						wsiteGuid: _dataObj.guid,
						pageElemIds: c
					}
				}, function(c) {
					if(0 === c.result) {
						var d = c.data;
						setInteractData(b, d)
					}
					a()
				}, "json")) : a()
			}

			function getFormUseGoods(a) {
				if(void 0 === _dataObj.guid || _isSetting) return void a();
				var b = _dataObj.pageList;
				_dataObj.dialogList && _dataObj.dialogList.length > 0 && (b = b.concat(_dataObj.dialogList));
				for(var c = !1, d = 0; d < b.length && !c; d++)
					for(var e = b[d].elementList, f = 0; f < e.length && !c; f++)
						if("goods" === e[f].type) {
							if(c) break;
							for(var g = e[f].content.list, h = 0; h < g.length; h++) 1 == g[h].useStock && (c = !0)
						}
				c ? $.ajax({
					url: _host + "formdata/getUseGoods",
					type: "POST",
					data: {
						wsiteGuid: _dataObj.guid
					},
					dataType: "json",
					xhrFields: {
						withCredentials: !0
					}
				}).done(function(c) {
					0 === c.result && updateGoodsStock(b, c.data), a()
				}).fail(function(b) {
					console.error(b), a()
				}) : a()
			}

			function updateGoodsStock(a, b) {
				for(var c = 0; c < a.length; c++)
					for(var d = a[c].elementList, e = 0; e < d.length; e++)
						if("goods" === d[e].type)
							for(var f = 0; f < b.length; f++)
								if(b[f].elementId == d[e].id)
									for(var g = d[e].content.list, h = 0; h < g.length; h++)
										if(g[h].id == b[f].goodId) {
											var i = b[f].stock - b[f].count;
											g[h].stock = 0 > i ? 0 : i, g[h].count = b[f].count, g[h].useStock = b[f].useStock, g[h].price = b[f].price
										}
			}

			function bindElementEvent(a, b, c) {
				if(void 0 !== b.click && "" !== b.click && _isEditing === !1)
					if(c) {
						viewLinkImage(b, c), playLinkAudio(a, b.id, b, c);
						var d = getPageObjById(a),
							e = "click";
						d.longPage && (e = "click", c.on(e, function(a) {
							a.preventDefault(), a.stopPropagation()
						})), c.on(e, function(c) {
							reloveTwoClickByISroll() && ("share" === b.click.type || "menu" === b.click.type || "focus" === b.click.type || "closeDialog" === b.click.type ? _excuteElementEvent(a, b) : void 0 !== b.click.type && void 0 !== b.click.value && "" !== b.click.value && _excuteElementEvent(a, b))
						})
					} else "share" === b.click.type || "menu" === b.click.type || "focus" === b.click.type || "closeDialog" === b.click.type ? _excuteElementEvent(a, b) : void 0 !== b.click.type && void 0 !== b.click.value && "" !== b.click.value && _excuteElementEvent(a, b)
			}

			function _excuteElementEvent(a, b) {
				if("url" == b.click.type) b.click.value.length > 8 && (apiHelper.getAppInstance().interactHit("link", ""), apiHelper.getAppInstance().closeWsite(function() {
					apiHelper.getAppInstance().urlAuditVisit(b.click.value)
				}));
				else if("page" == b.click.type) {
					dialogCloseAll();
					var c = !1;
					$page && 1 == $page.data("long") && (c = !0), c ? setTimeout(function() {
						goToPageById(b.click.value)
					}, 500) : goToPageById(b.click.value)
				} else if("event" == b.click.type) dialogCloseAll(), triggerPageEvent(a, b.click.value);
				else if("share" === b.click.type) dialogCloseAll(), apiHelper.getAppInstance().showShareDialog("");
				else if("alert" === b.click.type) winAlert(b.click.value);
				else if("focus" === b.click.type) dialogCloseAll(), showFocusWechat();
				else if("menu" === b.click.type) dialogCloseAll(), showTopMenu();
				else if("tel" === b.click.type) window.location.href = "tel:" + $.trim(b.click.value);
				else if("sms" === b.click.type) window.location.href = "sms:" + $.trim(b.click.value);
				else if("openDialog" === b.click.type) dialogOpen(a, b.click.value);
				else if("closeDialog" === b.click.type) dialogClose(a);
				else if("danmu" === b.click.type && (dialogCloseAll(), isShowDanmu()))
					if(getCommentLikeCount(), getCommentList(), wsiteInfo.authBehind) {
						var d = apiHelper.getAppInstance().weixinStrong.getAuthedInfo();
						"" !== d.id && null !== d.id && void 0 !== d.id && (authUserInfo = d), setTimeout(function() {
							showDanmuEvent()
						}, 300)
					} else if(null === authUserInfo) {
					var e = {
						startPageId: currentPageId,
						clickType: "danmu"
					};
					console.log(e), e = null, apiHelper.getAppInstance().weixinStrong.auth(function(a) {
						authUserInfo = a, setTimeout(function() {
							showDanmuEvent()
						}, 300)
					}, e)
				}
			}

			function dialogOpen(a, b) {
				$(".page_" + b).css({
					zIndex: 800,
					display: "block"
				}), playPageByPageId(b), setTimeout(function() {
					regPageEndEvent(b), pageCodeLoad(b, apiHelper.getAppInstance()), _isEditing || loadPluginEvent(b)
				}, 1e3)
			}

			function dialogClose(a) {
				$(".page_" + a).css({
					zIndex: 0,
					display: "none"
				}), triggerPluginLeaveEvent(a), triggerPageEvent(currentPageId, "sys_dialogClose", a)
			}

			function dialogCloseAll() {
				$(".dialog-page").css({
					zIndex: 0,
					display: "none"
				})
			}

			function viewLinkImage(a, b) {
				"img" === a.type && a.click && "" !== a.click.image && void 0 !== a.click.image && (b.on("touchstart", function(c) {
					c.preventDefault(), b.find(".element-last").attr("src", handleImgUrl(a.click.image))
				}), b.on("touchend", function(c) {
					c.preventDefault(), b.find(".element-last").attr("src", handleImgUrl(a.content.src))
				}))
			}

			function playLinkAudio(a, b, c, d) {
				c.click && "" !== c.click.audio && (d.on("mousedown touchstart", function(d) {
					rrxdebug && console.error("playLinkAudio3", d);
					var e = "link-" + a + "-" + b,
						f = document.getElementById(e);
					f ? f.play() : (f = document.createElement("audio"), f.setAttribute("id", e), f.setAttribute("style", "opacity:0;width:1px;height:1px"), f.setAttribute("src", apiHelper.getAppInstance().musicPreFix(c.click.audio)), f.setAttribute("preload", !0), $("#main").append(f), f.play())
				}), d.on("touchend", function(a) {}))
			}

			function createHref(a, b) {
				var c = "";
				switch(a) {
					case "tel":
						c = "tel:" + b;
						break;
					case "sms":
						c = "sms:" + b
				}
				return c
			}

			function isPreview() {
				return void 0 === appConfig.preView ? !0 : 1 == appConfig.preView
			}

			function getShape(a) {
				var b = "../images/shape_",
					c = ".png";
				return "line" != a ? b + a + c : void 0
			}

			function getLineStrokeDasharray(a, b) {
				if("solid" == a) return 'stroke-dasharray="none"';
				if("dotted" == a) {
					var c = 2 * b;
					return 'stroke-dasharray="' + c + "," + c + '"'
				}
			}

			function pluginIsFull(a) {
				return a === PLUGIN_SIZE_TYPE.FULL
			}

			function pluginIsAuto(a) {
				return a === PLUGIN_SIZE_TYPE.AUTO
			}

			function pluginIsFixed(a) {
				return a === PLUGIN_SIZE_TYPE.FIXED
			}

			function pluginIsScale(a) {
				return a === PLUGIN_SIZE_TYPE.SCALE
			}

			function pluginIsTop(a) {
				return "1" === a
			}

			function pluginIsGame(a) {
				return "3" === a || "4" === a
			}

			function wrapElement(a, b) {
				var c, d, e;
				if(_isEditing) {
					var f = $('<div class="element-inner"></div>');
					e = b.style + "width: 100%; height: 100%;", ("goods" === b.type || "smsCheck" === b.type || "time" === b.type || "city" === b.type || "multiselect" === b.type) && (e = "width: 100%; height: 100%;"), f.attr("style", e), f.css("position", ""), f.css("left", ""), f.css("top", ""), f.css("z-index", ""), void 0 !== b.rotate && (f.css("-webkit-transform", "rotate(" + b.rotate + "deg) translateZ(0)"), f.css("transform", "rotate(" + b.rotate + "deg) translateZ(0)"));
					var g = $('<div class="element-box" style="width: 100%; height: 100%;"></div>');
					return void 0 !== b.opacity && "video" !== b.type && g.css("opacity", b.opacity), "div" === b.type && (c = $(a), c.css("-webkit-writing-mode", "inherit"), c.has("img").length > 0 && (d = c.find("p"), d.css("display", "none"), c.find("img").css("display", "block")), c.length > 0 ? a = c[0].outerHTML : console.info(b), g.css({
						padding: b.padding + "px"
					})), g.html(a), f.html(g)
				}
				var h = $("<div ></div>");
				return e = b.style + "width: 100%; height: 100%;", ("goods" === b.type || "smsCheck" === b.type || "time" === b.type || "city" === b.type || "multiselect" === b.type) && (e = "width: 100%; height: 100%;"), h.attr("style", e), h.css("position", ""), h.css("overflow", "hidden"), h.css("left", ""), h.css("top", ""), h.css("z-index", ""), void 0 !== b.opacity && "video" !== b.type && h.css("opacity", b.opacity), void 0 !== b.rotate && (h.css("-webkit-transform", "rotate(" + b.rotate + "deg) translateZ(0)"), h.css("transform", "rotate(" + b.rotate + "deg) translateZ(0)")), "div" === b.type && (h.css({
					padding: b.padding + "px"
				}), c = $(a), c.css("-webkit-writing-mode", "inherit"), c.has("img").length > 0 && (d = c.find("p"), d.css("display", "none"), c.find("img").css("display", "block")), a = c[0].outerHTML), void 0 !== arguments[2] && "img" === b.type ? (h.addClass("image-border-two"), h.html(a), h.append(arguments[2])) : h.html(a), h
			}

			function submitData(a, b) {
				if(!b.hasSubmit) {
					if(b.hasSubmit = !0, null === _dataObj) return b.hasSubmit = !1, void a.val(b.content);
					$page = a.parents(".pt-page");
					var c = $page.data("id");
					if("1" != b.submitType) {
						var d = _$canvas.find(".pt-page"),
							e = [];
						$.each(d, function(a, b) {
							var d = $(b);
							d.data("id") == c && e.push(b), e.push(b)
						}), $page = $(e)
					}
					var f = "",
						g = b.smsReminder,
						h = b.smsText,
						i = b.maxCounter,
						j = !1;
					if($page) {
						var k = [],
							l = controlsOrderByTop(),
							m = 0;
						$.each(l, function(a, b) {
							var c = {
								result: 1,
								msg: "提交失败"
							};
							if("input" === b.type || "select" === b.type || "date" === b.type || "time" === b.type || "multiselect" === b.type || "city" === b.type || "file" === b.type || "goods" === b.type ? c = getPageInputSelect(b) : "checkbox" === b.type || "radio" === b.type ? c = getPageCheckRadio(b) : "rating" === b.type ? c = getPageRating(b) : "uploadImage" == b.type && (c = getPageUploadImage(b)), "goods" === b.type && "" !== c.value) {
								if(1 === c.result) return k = [], winAlert(c.msg), j = !0, !1;
								for(var d = JSON.parse(c.value), e = 0; e < d.length; e++) m += parseFloat(d[e].price * d[e].count)
							} else if(1 === c.result) return k = [], winAlert(c.msg), j = !0, !1;
							g && !f && "3" == b.inputType && (f = c.value), c.required = b.required, c.title = b.title, k.push(c)
						});
						var n = [];
						if(!j) {
							var o = controlBysmsCheck();
							$.each(o, function(a, b) {
								var c = getPagesmsCheck(b);
								return 1 === c.result ? (winAlert(c.msg), k = [], n = [], !1) : (g && !f && (f = c.item.value), k.push(c.item), void n.push(c.codeItem))
							})
						}
						if(k.length > 0) {
							var p = "";
							if(m = parseFloat(m, 10).toFixed(2), m > 0) return Cool.util.checkIsWeixin() ? void winAlert("表单中有未支付的商品，您需要支付『" + m + "元』人民币。", function(c) {
								c ? submitDataMethod(k, b, a, f, n, g, h, i, p) : (b.hasSubmit = !1, a.val(b.content))
							}, !0) : (winAlert("表单中有未支付的商品，需要在微信中打开！"), b.hasSubmit = !1, void a.val(b.content));
							submitDataMethod(k, b, a, f, n, g, h, i, p)
						} else b.hasSubmit = !1, a.val(b.content)
					}
				}
			}

			function submitDataMethod(a, b, c, d, e, f, g, h, i) {
				uploadFileCallBack(a, function(j) {
					for(var k = 0; k < j.length; k++)
						if(j[k].required && "" === j[k].value && ("file" === j[k].type || "uploadImage" === j[k].type)) return winAlert(j[k].msg ? j[k].msg : "请上传" + j[k].title), b.hasSubmit = !1, void c.val(b.content);
					a = j;
					var l = JSON.stringify(a),
						m = "";
					e.length > 0 && (m = JSON.stringify(e));
					var n = {
							smsReminder: f,
							smsText: g,
							maxCounter: h,
							reminderPhone: d
						},
						o = _dataObj.guid,
						p = apiHelper.getAppInstance().weixinStrong.getAuthedInfo();
					$.post(_host + "formdata/add", {
						form: {
							openId: p.id,
							wsiteGuid: o,
							pageId: pageId,
							data: l,
							smsData: m,
							strategyData: n
						}
					}, function(a) {
						if(0 === a.result) {
							if(("" === b.click || void 0 === b.click) && (b.click = {
									type: "alert",
									value: "提交成功"
								}), a.data.needPay) {
								var d = b.click.value;
								/[\u4E00-\u9FA5]/g.test(d) && (d = "");
								var e = a.data.formDataGuid;
								return void(window.location.href = appConfig.wxPayHost + "goods.html?startPageId=" + pageId + "&clickType=" + b.click.type + "&clickValue=" + d + "&wsiteGuid=" + o + "&formDataGuid=" + e + "&wxOpenId=" + i)
							}
							$page.find(".input-query").val("").focus(), $page.find(".custom-input").val(""), $page.find(".control-outer .option").attr("checked", !1), $page.find(".rating-outer .rate .selected").css("color", "inherit"), $page.find(".rating-outer .rate .selected").removeClass("selected"), $($page.find(".uploadImage-query .uploadImage")).remove(), $page.find(".city-query").length > 1 && $page.find(".city-query").resetCityInfo(), $page.find(".date-query").val(""), $page.find(".date-query").removeClass("full"), $page.find(".time-query .time-select select").val("-1"), $page.find(".multiselect-query .time-select select").val("-1");
							for(var f = $page.find(".file-element-box"), g = 0; g < f.length; g++) resetFileInput($(f[g])), $(f[g]).find(".file-content").html('<span class="fb_plus">+</span><p class="fb_text">上传文件（需小于10MB）</p>');
							for(var h = $page.find(".select-query"), j = 0; j < h.length; j++) {
								var k = h.eq(j);
								k.val(k.attr("title"))
							}
							for(var l = $page.find(".smsCheck-query"), m = 0; m < l.length; m++) {
								var n = l.eq(m);
								n.find(".smsPhone").val("").focus();
								var p = n.find(".smsCode");
								p.val("").focus(), resetSMSButton(n.find(".smsButtom"), p)
							}
							b.hasSubmit = !1, c.val(b.content), bindElementEvent(pageId, b)
						} else if(b.hasSubmit = !1, c.val(b.content), winAlert(a.msg), "goods" == a.errorCode) {
							var q = a.errorData.stock;
							0 > q && (q = 0), $("#stock-" + a.errorData.elementId + "-" + a.errorData.goodId).html(q)
						}
						c.focus()
					}, "json")
				})
			}

			function resetFileInput(a) {
				var b = a.find("input");
				b.after(b.clone().val("")), b.remove(), bindFileUploadEvent(a)
			}

			function uploadFileCallBack(a, b) {
				var c = !1,
					d = 0,
					e = function() {
						d === a.length - 1 && b(a), d++
					};
				$.each(a, function(f, g) {
					"uploadImage" == g.type ? g.value.indexOf("data:image") > -1 ? (c = !0, fnUplaodImage(g.value, function(a) {
						g.value = a, e()
					})) : (c && d === a.length - 1 && b(a), d++) : "file" == g.type ? (c = !0, fnUploadFile(g.value, function(a) {
						0 === a.result ? g.value = a.data.savedName : (g.value = "", console.info(a), g.msg = a.msg), e()
					})) : (c && d === a.length - 1 && b(a), d++)
				}), c || d !== a.length || b(a)
			}

			function fnUploadFile(a, b) {
				var c = getServiceHostIfHttps(),
					d = new FormData;
				d.append("file", a), $.ajax({
					url: c + "formdata/upload",
					type: "POST",
					cache: !1,
					data: d,
					processData: !1,
					contentType: !1
				}).done(function(a) {
					b(a)
				}).fail(function(a) {
					b({
						result: 1,
						msg: JSON.stringify(a)
					})
				})
			}

			function fnUplaodImage(a, b, c) {
				var d = getServiceHostIfHttps();
				$.ajax({
					url: d + "extend/image/uploadImage",
					type: "POST",
					data: {
						imageContent: a
					},
					dataType: "json",
					async: c || !1
				}).then(function(a) {
					var c = "";
					return 0 !== a.result ? void winAlert(a.msg, function() {
						b && b(c)
					}) : (c = handleImgUrl(a.data.url), void(b && b(c)))
				})
			}

			function controlsOrderByTop() {
				var a = ["input", "select", "checkbox", "radio", "rating", "uploadImage", "date", "time", "city", "file", "multiselect", "goods"],
					b = [],
					c = $page.data("id"),
					d = getPageObjById(c);
				return $.each(a, function(a, c) {
					for(var e = $page.find("." + c + "-query"), f = 0; f < e.length; f++) {
						var g = e.eq(f),
							h = 1e4 * (0 | d.sort),
							i = g.data("id"),
							j = $page.find(".element_" + i),
							k = h + parseInt(j.css("top"), 10),
							l = !1,
							m = !1,
							n = "",
							o = "";
						l = g.data("required"), m = g.data("unique"), n = g.attr("title"), "goods" === c && (l = j.find(".element-last").data("required"));
						var p = 0,
							q = [];
						if("city" === c) o = g.getCityInfo();
						else if("multiselect" === c) {
							for(q = g.children(), p = 0; p < q.length; p++) {
								var r = $(q[p]).find("select").val();
								r && "-1" != r && (o += $(q[p]).find("select").find("option:selected").text() + ",")
							}
							o = o.replace(/\s+/g, ""), "" !== o && (o = o.substr(0, o.length - 1))
						} else if("time" === c)
							for(q = g.children(), p = 0; p < q.length; p++) {
								var s = $(q[p]).find("select").val();
								("时" === s || "-1" === s || "分" === s || "秒" === s) && (s = ""), o += s
							} else if("select" === c) o = g.val() === n ? "" : g.val();
							else if("file" === c) g.length > 0 && g[0].files && g[0].files.length > 0 && (o = g[0].files[0]);
						else if("goods" === c) {
							q = g.children();
							var t = [];
							for(p = 0; p < q.length; p++) {
								var u = $(q[p]).find(".number-container input").val();
								if(u = parseInt(u, 10), u = isNaN(u) ? 0 : u, u > 0) {
									var v = $(q[p]).data("price");
									v = parseFloat(v, 10), v = v.toFixed(2), t.push({
										id: $(q[p]).data("id"),
										name: $(q[p]).data("name"),
										price: v,
										useStock: $(q[p]).data("usestock"),
										stock: $(q[p]).data("stock"),
										count: u
									})
								}
							}
							o = "", t.length > 0 && (o = JSON.stringify(t))
						} else o = $.trim(g.val());
						b.push({
							top: k,
							id: i,
							type: c,
							required: l,
							unique: m,
							value: o,
							title: n,
							inputType: "input" === c ? j.attr("inputtype") : -1
						})
					}
				}), b.length > 1 && b.sort(function(a, c) {
					return a.top - c.top || b.indexOf(a) - b.indexOf(c)
				}), b
			}

			function getPageInputSelect(a) {
				var b = a.type,
					c = a.id,
					d = a.required,
					e = a.value;
				"file" !== a.type && (e = $.trim(a.value));
				var f = a.title;
				if("input" === b) {
					var g = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/,
						h = /^(\S)+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
					if(d && "" === e) return {
						result: 1,
						msg: f + "不能为空！"
					};
					if("" !== e) {
						if("邮箱" === a.title && !h.test(e)) return {
							result: 1,
							msg: "输入的邮箱格式不正确！"
						};
						if(("3" == a.inputType || "手机" === a.title || "手机号" === a.title || "手机号码" === a.title) && !g.test(e)) return {
							result: 1,
							msg: "输入的手机号码格式不正确！"
						}
					}
				} else if("goods" === b) {
					if(d && "" === e) return {
						result: 1,
						msg: "请选择" + f
					};
					if("" !== e) {
						for(var i = JSON.parse(e), j = 0, k = 0; k < i.length; k++)
							if(j += i[k].price * i[k].count, 1 == i[k].useStock && i[k].count > i[k].stock) return {
								result: 1,
								msg: i[k].name + "购买数据不能大于库存数"
							};
						if(j > 3e3) return {
							result: 1,
							msg: "商品支付总金额不能超过3000元！"
						}
					}
				} else if(d && "" === e) {
					var l = "";
					return l = "file" === b ? "请上传" + f : "请选择" + f, {
						result: 1,
						msg: l
					}
				}
				var m = {};
				return m.id = c, m.value = e, m.type = b, m.unique = a.unique, m
			}

			function getPageCheckRadio(a) {
				var b = $page.find(".element_" + a.id).find(".option"),
					c = !1,
					d = {
						id: 0,
						value: "",
						type: a.type
					};
				d.id = a.id;
				for(var e = "", f = a.required, g = 0; g < b.length; g++) {
					{
						var h = b.eq(g);
						h.data("id")
					}
					if(h.is(":checked") && (c = !0, e += h.attr("title").replace("|", " ") + "|"), f && !c && g === b.length - 1) return {
						result: 1,
						msg: a.title + "未选择项目!"
					}
				}
				return d.value = "" !== e ? e.substring(0, e.length - 1) : "", d
			}

			function getPageRating(a) {
				var b = $page.find(".element_" + a.id),
					c = b.find(".rate .selected"),
					d = c.length,
					e = {
						id: a.id,
						value: d + "星",
						type: a.type
					},
					f = a.required;
				return f && 1 > d ? {
					result: 1,
					msg: a.title + "未评分!"
				} : e
			}

			function getPageUploadImage(a) {
				var b = $page.find(".element_" + a.id),
					c = b.find("img"),
					d = "";
				c && c.length > 0 && (d = c.attr("src"));
				var e = {
						id: a.id,
						value: d,
						type: a.type
					},
					f = a.required;
				return f && !d ? {
					result: 1,
					msg: a.title + "未上传!"
				} : e
			}

			function controlBysmsCheck() {
				for(var a = [], b = "smsCheck", c = $page.find("." + b + "-query"), d = 0; d < c.length; d++) {
					var e = c.eq(d),
						f = e.data("id"),
						g = e.find(".smsPhone"),
						h = e.find(".smsCode");
					a.push({
						id: f,
						type: b,
						value: g.val(),
						codeValue: h.val(),
						codeAuth: h.data("smsAuth"),
						title: e.attr("title"),
						unique: g.data("unique")
					})
				}
				return a
			}

			function getPagesmsCheck(a) {
				var b = "";
				if(!a.value) return b = a.title + "不能为空！", {
					result: 1,
					msg: b
				};
				if(!a.codeValue) return b = a.title + "验证码不能为空！", {
					result: 1,
					msg: b
				};
				if(!a.codeAuth) return b = a.title + "验证码没有发送！", {
					result: 1,
					msg: b
				};
				var c = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
				return c.test(a.value) ? {
					item: {
						id: a.id,
						value: a.value,
						type: a.type,
						unique: a.unique
					},
					codeItem: {
						value: a.value,
						code: a.codeValue,
						codeAuth: a.codeAuth
					}
				} : (b = "手机号码格式不正确！", {
					result: 1,
					msg: b
				})
			}

			function playAnimation(a, b, c, d, e) {
				var f = null;
				f = _isEditing ? $.extend(!0, {}, c) : c, e && !_isEditing ? ($p = getPageDomById(e), $item = $p.find(".element_" + b)) : $item = a.find(".element_" + b), doEleAnimation($item, f, d, e)
			}

			function doEleAnimation(a, b, c, d) {
				var e = 0;
				if(0 === b.delay || _isEditing || void 0 !== c && c !== !1 || (e = b.delay), "css" == _animationEngine) - 1 === b.repeat && _isEditing || (b.type && 1 === b.type ? CssAnimationEngine.textAnimation(a, b.name, e, b.duration, b.repeat, b.repeatDelay, c, _isEditing, b.textDirection) : CssAnimationEngine.animation(a, b.name, e, b.duration, b.repeat, b.repeatDelay, c, _isEditing));
				else {
					for(var f = 0; f < preAnimationList.length; f++) preAnimationList[f].pageId === currentPageId && preAnimationList[f].elementId === elementId && preAnimationList[f].animationName === b.name && preAnimationList[f].animation.seek(preAnimationList[f].animation.totalDuration());
					var g = JsAnimationEngine.animation(a, b.name, e, b.duration, b.repeat, b.repeatDelay, c);
					preAnimationList.push({
						pageId: currentPageId,
						elementId: elementId,
						animationName: b.name,
						animation: g
					})
				}
			}

			function playSecondAnimation(a, b, c, d) {
				setTimeout(function() {
					playAnimation(a, b.id, c, !0, d)
				}, 1e3 * c.delay)
			}

			function playElement(a, b, c) {
				if(void 0 !== b.animationList) {
					for(var d, e = 0, f = 0, g = 0; g < b.animationList.length; g++) d = b.animationList[g], (void 0 === d.trigger || 0 === parseInt(d.trigger)) && (d.duration + d.delay > f && (f = d.duration + d.delay), e > 0 && 0 !== d.delay ? playSecondAnimation(a, b, d, c) : playAnimation(a, b.id, d, !1, c), e++);
					return f
				}
			}

			function getPageObjById(a) {
				if("loadingpage" == a) {
					if(void 0 !== _dataObj.loadingpage && void 0 !== _dataObj.loadingpage.title) return _dataObj.loadingpage
				} else if("sharepage" == a) {
					if(void 0 !== _dataObj.sharepage) return _dataObj.sharepage
				} else if("floorpage" == a) {
					if(void 0 !== _dataObj.floorpage) return _dataObj.floorpage;

				} else if("toppage" == a) {
					if(void 0 !== _dataObj.toppage) return _dataObj.toppage
				} else {
					var b = 0;
					if(void 0 !== _dataObj.pageList)
						for(b = 0; b < _dataObj.pageList.length; b++)
							if(_dataObj.pageList[b].id == a) return _dataObj.pageList[b];
					if(void 0 !== _dataObj.dialogList)
						for(b = 0; b < _dataObj.dialogList.length; b++)
							if(_dataObj.dialogList[b].id == a) return _dataObj.dialogList[b]
				}
				return null
			}

			function getNextPageIdObjById(a) {
				if(void 0 === _dataObj.pageList) return 0;
				var b = 0,
					c = _dataObj.pageList.length;
				for(b = 0; c > b; b++)
					if(_dataObj.pageList[b].id == a) return b + 1 >= c ? 0 : _dataObj.pageList[b + 1].id;
				return 0
			}

			function getPrePageIdObjById(a) {
				if(void 0 === _dataObj.pageList) return 0;
				var b = 0,
					c = _dataObj.pageList.length;
				for(b = 0; c > b; b++)
					if(_dataObj.pageList[b].id == a) return 0 === b ? _dataObj.pageList[c - 1].id : _dataObj.pageList[b - 1].id;
				return 0
			}

			function parsePageBackgroundColor(a, b) {
				var c = $("<div class='pt-page-bg-box' style='width:100%;height:100%;cursor: default;'></div>");
				void 0 !== a && null !== a && (c = fillPageBgColorDomAttr(c, a), b.append(c))
			}

			function getPageType(a) {
				return a.pageType ? parseInt(a.pageType, 10) : 1
			}

			function fillPageBgColorDomAttr(a, b) {
				var c = 1;
				void 0 !== b.backgroundColorType && null !== b.backgroundColorType && (c = parseInt(b.backgroundColorType, 10));
				var d = "#FFFFFF",
					e = 1,
					f = getPageType(b);
				return void 0 !== b.backgroundAlpha && "" !== b.backgroundAlpha && (e = 2 === f ? (100 - b.backgroundAlpha) / 100 : b.backgroundAlpha / 100), 1 === c ? (void 0 !== b.backgroundColor && "" !== b.backgroundColor && (d = b.backgroundColor), a.css({
					opacity: e,
					backgroundColor: d
				})) : 2 === c && b.bgGradien && (a.css({
					opacity: e,
					backgroundColor: b.bgGradien.bgColor
				}), a.addClass(b.bgGradien.gradientClassName)), a
			}

			function parsePageBackground(a) {
				var b = $("<div class='pt-page-bg-box' style='width:100%;height:100%;cursor: default;'></div>");
				if(void 0 === a || null === a) return b;
				if(b = fillPageBgColorDomAttr(b, a), void 0 !== a.backgroundImage && null !== a.backgroundImage && "" !== a.backgroundImage) {
					var c = handleImgUrl(a.backgroundImage);
					b.css("background-image", "url(" + c + ")"), b.css("background-repeat", "no-repeat"), b.css("background-size", "cover"), b.css("background-position", "center center")
				}
				return b
			}

			function parsePageBackgroundFixMode(a, b) {
				if(void 0 !== a && null !== a) {
					var c = $("<div class='pt-page-bg-box' style='width:100%;height:100%;cursor: default;'></div>");
					c = fillPageBgColorDomAttr(c, a), void 0 !== a.backgroundImage && null !== a.backgroundImage && "" !== a.backgroundImage ? (b.append(c), parsePageBackgroundImage(a, b)) : b.append(c)
				}
			}

			function isLongPageFixMode(a) {
				return !a.longPage || void 0 !== a.longPagebgMode && "1" !== a.longPagebgMode ? !1 : !0
			}

			function parsePageBackgroundImage(a, b) {
				if(void 0 !== a && null !== a) {
					{
						var c = 1;
						getPageType(a)
					}
					if(void 0 !== a.backgroundAlpha && "" !== a.backgroundAlpha && (c = a.backgroundAlpha / 100), void 0 !== a.backgroundImage && null !== a.backgroundImage && "" !== a.backgroundImage) {
						var d = $("<div class='element element_pagebg'></div>"),
							e = $('<img class="pagebg_img">'),
							f = handleImgUrl(a.backgroundImage);
						if(e.attr("src", f), void 0 === a.backgroundView) {
							var g = Math.ceil(_$canvas.width() / _pt_inner_scale_value),
								h = Math.ceil(_$canvas.height() / _pt_inner_scale_value);
							!a.longPage || isLongPageFixMode(a) ? d.css({
								position: "absolute",
								left: 0,
								top: 0,
								zIndex: 0,
								height: h,
								width: g,
								backgroundImage: "url(" + f + ")",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundPosition: "center center",
								opacity: c
							}) : (d.append(e), d.css({
								position: "absolute",
								left: 0,
								top: 0,
								zIndex: 0,
								height: g,
								width: h,
								opacity: c
							})), b.append(d)
						} else {
							var i = "",
								j = !1;
							i = _isEditing ? window.rrxiuWsiteCrateTime : wsiteInfo.loading.createTime, i && appConfig.startTimeParseBgImgNew && i > appConfig.startTimeParseBgImgNew && (j = !0);
							var k, l, m, n, o, p, q;
							if(p = Math.ceil(_$canvas.width() / _pt_inner_scale_value), q = Math.ceil(_$canvas.height() / _pt_inner_scale_value), j) {
								k = a.backgroundImageNaturalWidth / a.backgroundImageNaturalHeight;
								var r = 1;
								a.backgroundImageNaturalWidth === a.backgroundView.width ? (r = a.backgroundView.width / p, l = p, m = l / k) : (r = a.backgroundView.width / p, l = a.backgroundImageNaturalWidth / r, m = l / k), o = void 0 === a.backgroundView ? 0 : a.backgroundView.x / r, n = void 0 === a.backgroundView ? 0 : a.backgroundView.y / r
							} else {
								var s = 1010;
								a.backgroundImageNaturalHeight >= 1008 && a.backgroundImageNaturalHeight <= 1010 ? s = 1010 : a.backgroundImageNaturalHeight > 1010 ? s = 1100 : a.backgroundImageNaturalHeight > 1100 && (s = a.backgroundImageNaturalHeight), k = a.backgroundImageNaturalWidth / a.backgroundImageNaturalHeight;
								var t = a.backgroundImageNaturalHeight / s;
								m = s;
								var u = 1;
								a.backgroundView.height * t < s && (u = s / a.backgroundView.height * t, m = s * u), l = k * m, n = void 0 === a.backgroundView ? 0 : a.backgroundView.y * u / t, n < 1 / _pt_inner_scale_value && (n = 1 / _pt_inner_scale_value), o = void 0 === a.backgroundView ? 0 : a.backgroundView.x * u / t, 640 == a.backgroundView.width && a.backgroundView.height > 1100 && (l = a.backgroundView.width, m = a.backgroundView.height)
							}
							if(l = Math.ceil(l), m = Math.ceil(m), !a.longPage || isLongPageFixMode(a)) {
								var v = l / m,
									w = "",
									x = q > m,
									y = p > l;
								x && y ? (w = "h", l > m && (w = "w")) : x ? w = "h" : y && (w = "w"), "h" === w ? (m = q, l = Math.ceil(m * v), console.log("spec h")) : "w" === w && (console.log("spec w"), l = p, m = Math.ceil(l / v)), "" !== w && (o = (l - p) / 2, n = 0)
							}
							e.css({
								width: l,
								height: m,
								marginLeft: -o,
								marginTop: -n
							}), d.append(e), d.css({
								position: "absolute",
								left: 0,
								top: 0,
								zIndex: 0,
								minWidth: 640,
								height: q,
								width: p,
								opacity: c
							}), b.append(d)
						}
					}
				}
			}

			function parseEffectElement(a, b) {
				var c = $($.find(".pt-inner .page_" + a));
				b.zIndex = b.zIndex || 1e4;
				var d = $("<div data-role='pt-page-effect' data-complete='no' class='pt-page-effect-box-" + b.id + "' style='position: absolute;top: 0;left: 0;z-index: " + b.zIndex + ";width:100%;height:100%;'></div>");
				c.append(d), $wePluginClient.render(b, d, a), _allowFlip = !0
			}

			function parsePage(a) {
				var b = $("<div class='pt-page-element-list-box' style='width:100%;height:100%;position: absolute;top:0;left: 0;'></div>");
				if(void 0 === a || null === a) return b;
				if(null !== a && (void 0 === a || void 0 === a.elementList)) return b;
				for(var c = 0; c < a.elementList.length; c++) {
					var d = a.elementList[c];
					if("plugin" !== d.type || _isEditing || !(!pluginIsGame(d.content.levelId) && pluginIsFull(d.content.sizeType) || pluginIsTop(d.content.isTop))) {
						"html" === d.type && d.content.fullscreen && (d.left = 0, d.top = 0, d.width = 640, d.height = a.longPage ? a.height : 1010);
						var e = parseElement(d, a.id);
						"submit" !== d.type && "interact" !== d.type && "audio" !== d.type && "video" !== d.type && bindElementEvent(a.id, d, e), "input" === d.type && (_isEditing || setInputPlaceholderColor(e.find(".input-query.element-last"), "")), "smsCheck" === d.type && (_isEditing || (setInputPlaceholderColor(e.find(".smsPhone.element-last"), ""), setInputPlaceholderColor(e.find(".smsCode.element-last"), ""))), b.append(e)
					} else parseEffectElement(a.id, d)
				}
				var f = $("<div></div>");
				return a.longPage && (f.attr("class", "iscroll_wrapper"), f.attr("id", "iscroll_wrapper" + a.id), b.css("height", a.height)), f.html(b), f
			}

			function setInputPlaceholderColor(a, b) {
				a.placeholder({
					labelMode: !0,
					labelStyle: {
						margin: "11px 0 0 6px",
						color: b
					},
					labelAlpha: !0,
					labelAcross: !0
				})
			}

			function setPageArrowIcon(a) {
				var b = getPageObjById(a);
				if(b)
					if(b.hasOwnProperty("arrowImgUrl") && "" !== b.arrowImgUrl && null !== b.arrowImgUrl) {
						"icon_arrow_1.png" === b.arrowImgUrl && (b.arrowImgUrl = "icon_arrow2.png");
						var c = handleImgUrl(b.arrowImgUrl);
						"down" === flipWay ? $(".arrow-down p").css("background-image", "url(" + c + ")") : $(".arrow-right p").css("background-image", "url(" + c + ")")
					} else "down" === flipWay ? $(".pt-wrapper .arrow-down p").css("background-image", "") : $(".pt-wrapper .arrow-down p").css("background-image", "")
			}

			function outPage(a, b, c) {
				var d = $("<div></div>");
				d.css("width", b), d.css("height", c), createWrapper(d, a), _$canvas = d;
				var e = d.find(".pt-inner");
				if(_isEditing) {
					var f = isPagebgColorOpacity(a);
					e.append(f ? '<div class="pt-page pt-page-current pt-page-background-image"></div>' : '<div class="pt-page pt-page-current pt-page-background-image" style="background-image:none;"></div>')
				} else e.append('<div class="pt-page pt-page-current"></div>');
				var g = e.find(".pt-page");
				return a.longPage ? void 0 === a.longPagebgMode || "1" === a.longPagebgMode ? (parsePageBackgroundFixMode(a, g), g.append(parsePage(a))) : (parsePageBackgroundColor(a, g), g.append(parsePage(a)), parsePageBackgroundImage(a, e.find(".pt-page-element-list-box"))) : void 0 === a.backgroundImageNaturalWidth || void 0 === a.backgroundView ? (e.find(".pt-page").append(parsePageBackground(a)), e.find(".pt-page").append(parsePage(a))) : (parsePageBackgroundColor(a, g), g.append(parsePage(a)), parsePageBackgroundImage(a, e.find(".pt-page-element-list-box"))), d
			}

			function isPagebgColorOpacity(a) {
				if(null === a || void 0 === a) return !1;
				var b = 1;
				if(null !== a.pageType && void 0 !== a.pageType && (b = parseInt(a.pageType, 10), 2 === b)) return !0;
				var c = 1;
				if(null !== a.backgroundColorType && void 0 !== a.backgroundColorType && (c = parseInt(a.backgroundColorType, 10)), 1 === c) {
					if(null === a.backgroundColor || void 0 === a.backgroundColor || "" === a.backgroundColor) return !0;
					if("transparent" === a.backgroundColor) return !0;
					if("rgba(0, 0, 0, 0)" === a.backgroundColor) return !0;
					var d = a.backgroundColor.toLowerCase();
					if(d.indexOf("rgba") > -1) {
						d = d.replace("rgba", "").replace("(", "").replace(")", "");
						var e = d.split(",");
						if(e.length > 2) {
							var f = parseFloat(e[3]);
							if(!isNaN(f) && .99 > f) return !0
						}
					}
				}
				return !1
			}

			function showElement(a) {
				var b = $('div[class^="element element_' + a + '"]');
				void 0 !== b && b.show()
			}

			function handleScaleIfSmallScreen(a) {
				if(!_isPc) {
					var b = $(window).height(),
						c = 1008 * _pt_inner_scale_value;
					if(c > b && "1" !== $page.attr("data-long")) {
						var d = b / c;
						_page_element_list_scale_value = d;
						var e = a || $page.find(".pt-page-element-list-box");
						e.css("-webkit-transform", "scale(" + d + ")"), e.css("transform", "scale(" + d + ")"), e.css("-webkit-transform-origin", "center top"), e.css("transform-origin", "center top")
					}
				}
			}

			function isRegImgSilderTimer(a) {
				for(var b = 0; b < regImgSilderTimerRecord.length; b++)
					if(a == regImgSilderTimerRecord[b].pageId) return !0;
				return !1
			}

			function addRegedImgSilderTimer(a) {
				regImgSilderTimerRecord.push({
					pageId: a,
					isReg: !0,
					silderObject: []
				})
			}

			function getImgSilderTimerByPage(a) {
				for(var b = 0; b < regImgSilderTimerRecord.length; b++)
					if(a == regImgSilderTimerRecord[b].pageId) return regImgSilderTimerRecord[b];
				return null
			}

			function stopOtherImgSilderTimer(a) {
				for(var b = 0; b < regImgSilderTimerRecord.length; b++)
					if(a != regImgSilderTimerRecord[b].pageId) {
						if(void 0 !== regImgSilderTimerRecord[b] && void 0 !== regImgSilderTimerRecord[b].silderObject)
							for(j = 0; j < regImgSilderTimerRecord[b].silderObject.length; j++) void 0 !== regImgSilderTimerRecord[b].silderObject[j] && regImgSilderTimerRecord[b].silderObject[j].stop()
					} else if(void 0 !== regImgSilderTimerRecord[b] && void 0 !== regImgSilderTimerRecord[b].silderObject)
					for(j = 0; j < regImgSilderTimerRecord[b].silderObject.length; j++) void 0 !== regImgSilderTimerRecord[b].silderObject[j] && regImgSilderTimerRecord[b].silderObject[j].start()
			}

			function stopAllImgSilderTimer() {
				for(var a = 0; a < regImgSilderTimerRecord.length; a++)
					if(void 0 !== regImgSilderTimerRecord[a] && void 0 !== regImgSilderTimerRecord[a].silderObject)
						for(var b = 0; b < regImgSilderTimerRecord[a].silderObject.length; b++) void 0 !== regImgSilderTimerRecord[a].silderObject[b] && regImgSilderTimerRecord[a].silderObject[b].stop()
			}

			function regImgSilderTimer(a) {
				if(pageId = a, stopOtherImgSilderTimer(pageId), !isRegImgSilderTimer(pageId)) {
					addRegedImgSilderTimer(pageId);
					var b = $(".page_" + pageId).find(".slider");
					b.length > 0 && Cool.util.loadJs(appConfig.libHost + "flux.js?v=" + appConfig.version, function() {
						$.each(b, function(a, b) {
							var c = $(b);
							if(0 === c.children().length) return void console.info("img 0");
							var d = c.attr("id");
							if(void 0 !== d) {
								var e = d.replace("slider", ""),
									f = $(".element_" + e),
									g = parseInt(f.css("width"), 10),
									h = parseInt(f.css("height"), 10),
									i = "#" + d,
									j = c.attr("playstyle"),
									k = c.attr("autoplay") === !0 || "true" == c.attr("autoplay") || "autoplay" == c.attr("autoplay"),
									l = c.attr("showarrow") === !0 || "true" === c.attr("showarrow"),
									m = c.attr("leftarrow");
								m && (m = handleImgUrl(m));
								var n = c.attr("rightarrow");
								n && (n = handleImgUrl(n));
								var o;
								if(k) {
									o = new flux.slider(i, {
										pagination: !1,
										autoplay: !0,
										controls: l,
										prevButton: m,
										nextButton: n,
										transitions: [j],
										width: g,
										height: h,
										delay: 2e3
									});
									var p = getImgSilderTimerByPage(pageId);
									null !== p && p.silderObject.push(o)
								} else o = new flux.slider(i, {
									pagination: !1,
									autoplay: !1,
									controls: !0,
									prevButton: m,
									nextButton: n,
									transitions: [j],
									width: g,
									height: h
								}), noAutoPlayImgGroupInstances.push({
									pageId: pageId,
									elemId: e,
									instance: o
								})
							}
						})
					})
				}
			}

			function regImgPlayTimer(a) {
				var b = getPageObjById(a || currentPageId);
				if(null !== b) {
					if(clearRegIntervals(), void 0 === b.elementList) return;
					var c = b.elementList;
					$.each(c, function(a, c) {
						"img" === c.type && c.content.constructor === Object && regImgElementEvent(b.id, c.id, c.content)
					})
				}
			}

			function resetElementLastImg(a, b) {
				b === !0 ? a.css("display", "block") : a.css("display", "none")
			}

			function regImgElementEvent(a, b, c) {
				var d = apiHelper.getAppInstance().getElement(b, a),
					e = arguments[3] || null,
					f = d.find(".element-mask span");
				if(c.showAnimation && f.length > 0) {
					var g = d.find(".element-mask .element-last");
					1 === parseInt(c.imageType) && resetElementLastImg(g, !0), $.each(f, function(a, b) {
						$(b).css("opacity", 0)
					});
					var h = null;
					1 === parseInt(c.touchType) ? (d.bind(clickEventType, function(d) {
						d.preventDefault(), d.stopPropagation(), setTimeout(function() {
							null === h && ($(f[0]).css("opacity", 1), 1 === parseInt(c.imageType) && resetElementLastImg(g, !1), h = new ImgPlayTimer, h.setCount(0), h.setPageId(a), h.setElemId(b), h.setImgList(f), h.setContent(c), h.playImgList())
						}, 1e3 * c.playDelay)
					}), d.bind("mouseup mouseleave touchend", function(a) {
						a.preventDefault(), a.stopPropagation()
					})) : 0 === parseInt(c.touchType) ? setTimeout(function() {
						$(f[0]).css("opacity", 1), 1 === parseInt(c.imageType) && resetElementLastImg(g, !1), h = new ImgPlayTimer, h.setCount(0), h.setPageId(a), h.setElemId(b), h.setImgList(f), h.setContent(c), h.playImgList()
					}, 1e3 * c.playDelay) : 2 === parseInt(c.touchType) && null !== e ? setTimeout(function() {
						$(f[0]).css("opacity", 1), 1 === parseInt(c.imageType) && resetElementLastImg(g, !1), h = new ImgPlayTimer, h.setCount(0), h.setPageId(a), h.setElemId(b), h.setImgList(f), h.setContent(c), h.playImgList()
					}, 1e3 * c.playDelay) : "3" === c.touchType && (startShake(), window.addEventListener("shake", function(d) {
						stopShake(), setTimeout(function() {
							$(f[0]).css("opacity", 1), 1 === parseInt(c.imageType) && resetElementLastImg(g, !1), h = new ImgPlayTimer, h.setCount(0), h.setPageId(a), h.setElemId(b), h.setImgList(f), h.setContent(c), h.playImgList()
						}, 1e3 * c.playDelay)
					}, !1), setTimeout(function() {
						startShake()
					}, 2e3))
				}
			}

			function ImgPlayTimer() {
				this.count = 0, this.pageId = -1, this.elemId = -1, this.content = null, this.imgList = []
			}

			function clearAllCustomIntervals() {
				for(var a = 0; a < customIntervals.length; a++) window.clearInterval(customIntervals[a]);
				stopAllImgSilderTimer()
			}

			function clearRegIntervals(a, b) {
				a && b ? $.each(regIntervals, function(c, d) {
					a === d.pageId && b === d.elemId && window.clearInterval(d.interval)
				}) : $.each(regIntervals, function(a, b) {
					window.clearInterval(b.interval)
				})
			}

			function createAudioElement(a, b, c) {
				var d = "audio-" + a + "-" + b,
					e = document.getElementById(d);
				if(!e) {
					var f = apiHelper.getAppInstance().musicPreFix(c.content.url);
					e = document.createElement("audio"), e.setAttribute("id", d), e.setAttribute("style", "opacity:0;width:1px;height:1px"), e.setAttribute("src", f), e.setAttribute("preload", !0), c.click ? "loop" === c.click.type ? e.setAttribute("loop", "loop") : "" !== c.click.value && $(e).on("ended", function() {
						bindElementEvent(a, c)
					}) : c.content.loop && e.setAttribute("loop", c.content.loop), $("#main").append(e)
				}
			}

			function switchAudioPlay(a, b) {
				var c = document.getElementById("audio-" + a + "-" + b);
				rrxdebug && console.log("switchAudioPlay", c), c && (c.paused ? (c.play(), Cool.util.checkIsWeixin() === !0 && "undefined" != typeof WeixinJSBridge && WeixinJSBridge.invoke("getNetworkType", {}, function(a) {
					c.play()
				})) : c.pause())
			}

			function regAudioEvent(a, b, c, d) {
				var e = d || null,
					f = apiHelper.getAppInstance().getElement(b, a),
					g = c.delay || 0;
				g = 1e3 * g, "0" === c.touchType ? f.off(clickEventType).on(clickEventType, function(c) {
					reloveTwoClickByISroll() && setTimeout(function() {
						switchAudioPlay(a, b)
					}, g)
				}) : "1" === c.touchType ? setTimeout(function() {
					switchAudioPlay(a, b)
				}, g) : "2" === c.touchType && null !== e ? setTimeout(function() {
					switchAudioPlay(a, b)
				}, g) : "3" === c.touchType && (startShake(), window.addEventListener("shake", function(c) {
					stopShake(), setTimeout(function() {
						switchAudioPlay(a, b)
					}, g), setTimeout(function() {
						startShake()
					}, 2e3)
				}, !1))
			}

			function regAudioPlayTimer(a) {
				var b = getPageObjById(a || currentPageId);
				if(null !== b) {
					if(void 0 === b.elementList) return;
					var c = b.elementList;
					$.each(c, function(a, c) {
						"audio" === c.type && regAudioEvent(b.id, c.id, c.content)
					})
				}
			}

			function createVideoClose(a, b) {
				var c = $('<div class="close-mask" id="close_' + b + '">×</div>');
				c.click(function() {
					apiHelper.getAppInstance().resetFlip(!0), $("#mask_" + b).remove(), $("#close_" + b).remove(), showMusicIcon(), musicIsPlayWhenPlayVideo && playMusic(), showElement(b)
				}), getPageDomById(a).append(c)
			}

			function handleVideoIframeSrc(a) {
				return void 0 === a || void 0 === a ? "" : appConfig.dev ? a : wsiteInfo.flhtps || wsiteInfo.httpsEnabled ? a.replace("http://", "https://") : a
			}

			function createVideoPlay(a, b, c) {
				var d = $('<div class="video-mask" id="mask_' + b + '"></div>'),
					e = "",
					f = isLiveVideo(c.code),
					g = 0 === parseInt(c.type) && f;
				1 === parseInt(c.type) || g ? (1 === parseInt(c.type) && apiHelper.getAppInstance().stopFlip(), e = $('<video style="object-fit: fill;"  autoPlay controls></video>'), e.attr("type", "video/mp4"), e.attr("id", "video_" + b), e.attr("src", handleDataUrl(c.url)), e.css({
					position: "absolute",
					height: "50%",
					width: "100%",
					top: "22%"
				})) : (apiHelper.getAppInstance().stopFlip(), c.code = handleVideoIframeSrc(c.code), e = $(c.code).css({
					position: "absolute",
					top: "22%"
				}), e.attr("id", "vif_" + b), e.attr("width", "100%"), e.attr("height", "50%"), e.attr("frameborder", 0)), d.html(e), getPageDomById(a).append(d)
			}

			function removeAllVideo() {
				$(".video-mask").remove(), $(".close-mask").remove(), $('div[eletype="video"]').show(), showMusicIcon()
			}

			function createVideoControl(a, b, c) {
				createVideoPlay(a, b, c), createVideoClose(a, b, c)
			}

			function createVideoElement(a, b, c, d) {
				if(isPreview()) {
					musicIsPlayWhenPlayVideo = $iconMusic.hasClass("music-play") || $iconMusic.hasClass("music-play-none"), stopMusic(), hideMusicIcon();
					var e = parseInt(d.type);
					if(d.embed && 1 === e || 0 === e && isLiveVideo(d.code)) {
						var f = a.find(".element-last").get(0);
						if(f) {
							var g = 1 !== parseInt(d.touchType);
							playVideoByWx(f, g), apiHelper.getAppInstance().resetFlip(!0)
						}
					} else createVideoControl(b, c, d)
				}
			}

			function playVideoByWx(a, b) {
				var c = function() {
					a && (a.paused ? a.play() : a.pause())
				};
				b ? c() : Cool.util.checkIsWeixin() === !0 && "undefined" != typeof WeixinJSBridge ? WeixinJSBridge.invoke("getNetworkType", {}, function(a) {
					c()
				}) : c()
			}

			function regVideoEvent(a, b, c, d) {
				rrxdebug && console.log("regVideoEvent", a);
				var e = d || null,
					f = apiHelper.getAppInstance().getElement(b, a),
					g = parseInt(c.touchType),
					h = getPageObjById(a),
					i = h.longPage ? "mousedown touchstart" : "click";
				if(0 !== g && 0 !== parseInt(c.type) && c.embed)
					if(1 === g) {
						var j = getFirstPageId() === a ? 500 : 0;
						setTimeout(function() {
							createVideoElement(f, a, b, c)
						}, j)
					} else c.embed && 2 === g && null !== e && createVideoElement(f, a, b, c);
				else f.off(i).on(i, function(d) {
					reloveTwoClickByISroll() && (d.preventDefault(), d.stopPropagation(), createVideoElement(f, a, b, c))
				})
			}

			function regVideoPlayTimer(a) {
				var b = getPageObjById(a || currentPageId);
				if(null !== b) {
					if(void 0 === b.elementList) return;
					var c = b.elementList;
					$.each(c, function(a, c) {
						"video" === c.type && regVideoEvent(b.id, c.id, c.content)
					})
				}
			}

			function regAnimationShake(a) {
				var b = _dataObj.pageEventList[a || currentPageId],
					c = function(b, c, d) {
						startShake(), window.addEventListener("shake", function(e) {
							stopShake(), playAnimation(b, c, d, !1, a), setTimeout(function() {
								startShake()
							}, 2e3)
						}, !1)
					};
				if(b)
					for(var d = 0; d < b.length; d++) "animation" === b[d].type && 2 === parseInt(b[d].animation.trigger) && c(_$canvas, b[d].elementId, b[d].animation)
			}

			function startShake(a) {
				a = a || "shake", void 0 === myShakeEvent[a] ? (myShakeEvent[a] = new Shake({
					shake: a
				}), myShakeEvent[a].start()) : myShakeEvent[a].start()
			}

			function stopShake(a) {
				a = a || "shake", void 0 !== myShakeEvent[a] && myShakeEvent[a].stop()
			}

			function regSensorEvent(a) {
				var b = getPageDomById(a).find(".pt-page-element-list-box");
				if(b && b.length > 0 && b.html().indexOf("data-depth") > -1) {
					new Parallax(b[0])
				}
			}

			function getPageStopflip(a) {
				var b = _$canvas.find(".page_" + a);
				return "1" === b.attr("data-stopflip")
			}

			function regPageStopflipEvent(a) {
				_allowFlipCurrentPage = !getPageStopflip(a), _allowFlip && _allowFlipCurrentPage ? a == lastPageId ? getCanShowCopyrightPageEnd() ? showArrow() : hideArrow() : showArrow() : hideArrow()
			}

			function regPageAutoTimeFlipEvent(a) {
				window.clearTimeout(rrxAutoFlipTimer);
				var b = getPageObjById(a || currentPageId);
				null !== b && b.autoFlip && "" !== b.autoFlipTime && void 0 !== b.autoFlipTime && (rrxAutoFlipTimer = setTimeout(function() {
					swipeFlipEvent("up", flipWay)
				}, 1e3 * b.autoFlipTime))
			}

			function regPageEndEvent(a) {
				regImgSilderTimer(a), regImgPlayTimer(a), regAudioPlayTimer(a), regVideoPlayTimer(a), regAnimationShake(a), regSensorEvent(a), regPageStopflipEvent(a), regPageAutoTimeFlipEvent(a)
			}

			function loopPluginByPage(a, b) {
				rrxdebug && console.log("loopPluginByPage");
				var c = getPageObjById(a || currentPageId);
				if(c)
					for(var d = 0; d < c.elementList.length; d++) {
						var e = c.elementList[d];
						"plugin" === e.type && b(e)
					}
			}

			function loadPluginEvent(a) {
				rrxdebug && console.log("loadPluginEvent", a), a = a || currentPageId, loopPluginByPage(a, function(b) {
					$wePluginClient.load(a, b)
				}), resetEmbedVideo(a), hideMenuByOther(a)
			}

			function getIndexByArray(a, b, c) {
				c = c || "id";
				for(var d = a.length - 1; d >= 0; d--)
					if(a[d][c] == b) return d;
				return -1
			}

			function hideMenuByOther(a) {
				if(pageIsHaveTopPlugin(!0)) return void hideMenuPlugin();
				if("customer" !== _copyrightFrom && "na" !== _copyrightFrom) {
					var b = getPageObjById(a);
					if(null !== b && b.longPage) return void hideMenuPlugin()
				}
				var c = getIndexByArray(_dataObj.pageList, a);
				return _menuPageIndex > c ? void hideMenuPlugin() : apiHelper.getAppInstance().isShowPluginCopyright() && pageIsHaveTopPlugin(!1, "照片投票,抽奖,抽奖20,裂变红包,微信红包,口令红包,问答,装逼神器") ? void hideMenuPlugin() : void((!base.isLastPage() && "rrxiu" === _copyrightFrom || "rrxiu" !== _copyrightFrom) && showMenuPlugin())
			}

			function triggerPluginLeaveEvent(a) {
				a = a || currentPageId, loopPluginByPage(a, function(b) {
					$wePluginClient.leave(a, b)
				}), stopEmbedVideo(a), hideMenuByOther(a)
			}

			function stopEmbedVideo(a) {
				a = a || currentPageId, getEmbedVideo(a, function(a) {
					var b = a.find(".element-last").get(0);
					$(b).remove()
				})
			}

			function resetEmbedVideo(a) {
				a = a || currentPageId, getEmbedVideo(a, function(b, c) {
					var d = parseInt(c.content.type),
						e = isLiveVideo(c.content.code) && 0 === d,
						f = handleDataUrl(c.content.url);
					console.info(f), e && (f = c.content.code);
					var g = e ? "" : 'type="video/mp4"',
						h = $('<video style="object-fit: fill;" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portrait" x-webkit-airplay="true" y-webkit-airplay="true" webkit-playsinline playsinline class="element-last" width="' + c.width + '" height="' + c.height + '">您的浏览器不支持 video 标签。<source src="' + f + '" ' + g + "></video>");
					1 === parseInt(c.content.touchType) || 0 === parseInt(c.content.touchType) && h.attr("controls", "controls"), h.attr("preload", "auto"), void 0 === c.content.poster || e || h.attr("poster", c.content.poster), c.click && ("loop" === c.click.type ? h.attr("loop", "loop") : "" !== c.click.value && h.off().on("ended", function() {
						bindElementEvent(a, c)
					})), b.html(wrapElement(h, c))
				})
			}

			function getEmbedVideo(a, b) {
				var c = getPageObjById(a);
				if(c)
					for(var d = 0; d < c.elementList.length; d++) {
						var e = c.elementList[d];
						if("video" === e.type) {
							var f = isLiveVideo(e.content.code),
								g = parseInt(e.content.type);
							if(e.content.embed && 1 === g || f && 0 === g) {
								var h = apiHelper.getAppInstance().getElement(e.id, a);
								b(h, e)
							}
						}
					}
			}

			function getActualPageId(a) {
				var b;
				b = 0 !== currentPageId ? $pagelist.find(".page_" + currentPageId) : $pagelist.find("div.pt-page:not(.ifpage)").first();
				var c = null;
				if(-1 == a) {
					for(c = b.next(); c.hasClass("ifpage") && (c = c.next(), c.hasClass("pt-page") !== !1););
					c.hasClass("pt-page") === !1 && (c = $pagelist.find("div.pt-page:not(.ifpage)").first())
				} else if(-2 == a) {
					for(c = b.prev(); c.hasClass("ifpage") && (c = c.prev(), c.hasClass("pt-page") !== !1););
					c.hasClass("pt-page") === !1 && (c = $pagelist.find("div.pt-page:not(.ifpage)").last())
				} else 0 === a && (c = $pagelist.find("div.pt-page:not(.ifpage)").first());
				return null !== c && (a = c.data("id")), a
			}

			function getAnimationIndex(a, b) {
				var c, d = "";
				return b === !0 ? (c = getPageObjById(a), void 0 !== c.flip ? d = c.flip.enter : void 0 !== flipAnimation.enter && (d = flipAnimation.enter)) : (c = getPageObjById(currentPageId), void 0 !== c.flip ? d = c.flip.back : void 0 !== flipAnimation.back && (d = flipAnimation.back)), d
			}

			function gotoPage(a, b) {
				console.log("gotoPage.........."), goToPageById(b)
			}

			function playPage(a, b) {
				if(void 0 === b || void 0 === b.elementList) return 0;
				for(var c = -1, d = 0, e = 0; e < b.elementList.length; e++) {
					var f = b.elementList[e];
					f.display !== !0 && void 0 !== f.display && _isEditing || (c = playElement(a, f, b.id), "img" === f.type && "loadingpage" === b.id && f.content.showAnimation && regImgElementEvent(b.id, f.id, f.content, f.content.name), c > d && (d = c))
				}
				return d
			}

			function playPageByPageId(a) {
				var b = getPageObjById(a);
				null !== b && playPage(_$canvas, b)
			}

			function setBlurBgPage() {
				$("body").css({
					"background-color": "#fff"
				}), $(".pt-wrapper").addClass("blur-container")
			}

			function flipBlurPage() {
				removeAllBlurPage()
			}

			function removeBlurBgPage() {
				$("body").css({
					"background-color": "#000"
				}), $(".pt-wrapper").removeClass("blur-container")
			}

			function removeAllBlurPage() {
				$("body").css({
					"background-color": "#000"
				}), $(".pt-wrapper").removeClass("blur-container")
			}

			function createPages() {
				if(void 0 !== _dataObj.pageList) {
					for(var a = _dataObj.pageList, b = 0; b < a.length; b++) {
						var c = a[b];
						wsiteInfo.wxp.canStopFlip || (c.stopFlip = !1);
						var d = '<div class="pt-page page_' + c.id + '" data-id=' + c.id;
						c.longPage && (d += ' data-long="1"'), c.stopFlip && (d += ' data-stopflip="1"'), d += "></div>", $pagelist.append(d)
					}
					firstPageId = a[0].id, lastPageId = a[a.length - 1].id, totalPages = a.length
				}
			}

			function createWrapper(a, b) {
				a.html(""), html = '<div class="pt-outer"><div class="pt-inner"></div></div>', a.append(html);
				var c = parseFloat(a.height() / a.width()) * canvasDefaultWidth;
				scale = parseFloat(1 * a.width() / canvasDefaultWidth).toFixed(6), _pt_inner_scale_value = scale;
				var d = parseFloat(a.height() / c),
					e = navigator.userAgent.toLowerCase(),
					f = 97e-5 * parseFloat(a.width() / 360);
				e.indexOf("android") > -1 && (d += f), d = d.toFixed(6);
				var g = 0;
				if(_isEditing) {
					var h = !1;
					b && (2 === b.pageType || "2" === b.pageType) && (h = !0), g = parseFloat(-1 * c / 2) - 0, h && (.5 == d && (c = 1016, g = -509), .75 == d && (c = 1014, g = -508.5))
				} else g = parseFloat(-1 * c / 2) - 0;
				$outer = a.find(".pt-outer"), $inner = a.find(".pt-inner"), $inner.css("height", c), $inner.css("margin-top", g), $inner.css("-webkit-transform", "scale(" + scale + "," + d + ")"), $inner.css("-moz-transform", "scale(" + scale + "," + d + ")"), $inner.css("transform", "scale(" + scale + "," + d + ")"), $outer.css("height", a.height()), $outer.css("width", a.width())
			}

			function createProgress() {
				$progress.css("position", "absolute"), $progress.css("z-index", "100"), $progress.css("bottom", "0"), $progress.css("left", "0"), $progress.css("display", "none"), $progress.css("width", "100%"), $progress.css("height", "7px"), $progress.css("background-color", "rgba(0,0,0,.2)"), $(".progress-tip").css("display", "none"), $(".page-tip").css("display", "none")
			}

			function isShowFocusWechat() {
				return _dataObj.focusWechat && _dataObj.focusWechat.show ? "rrx-qrcode.jpg" === _dataObj.focusWechat.qrcode ? !1 : !0 : !1
			}

			function isShowTopMenu() {
				return void 0 === _dataObj.topMenu ? !1 : 1 === parseInt(_dataObj.topMenu.show)
			}

			function createTopeMenu() {
				if(isShowTopMenu()) {
					"topmenu-icon.png" === _dataObj.topMenu.icon && (_dataObj.topMenu.icon = "topmenu-icon2.png");
					var a = handleImgUrl(_dataObj.topMenu.icon) + "?v=" + appConfig.version;
					$topMenuButton.attr("src", a), $topMenuButton.off().on(clickEventType, function(a) {
						a.stopPropagation(), a.preventDefault(), showTopMenu(), setBlurBgPage()
					}), showEffect($topMenuButton)
				}
			}

			function formatHref(a) {
				return -1 === a.indexOf("http://") && -1 === a.indexOf("https://") && (a = a.replace("www", "http://www")), a
			}

			function showTopMenu() {
				if(void 0 !== _dataObj.topMenu) {
					if(0 === $topMenuPanel.find(".top-menu-list").length) {
						var a = '<a class="rrx-icon-close-layer fw_close" href="javascript:void(0)"></a><div class="top-menu-list"><div class="scroll-list"><div class="scroll-menu">',
							b = isShowFocusWechat();
						_dataObj.focusWechat && "rrx-qrcode.jpg" !== _dataObj.focusWechat.qrcode && !getCanModifyWechat() && (b = !1);
						for(var c = _dataObj.topMenu.list, d = 0; d < c.length; d++) a += "url" === c[d].type ? '<a class="menu-' + c[d].type + '" href="javascript:void(0)" data-id="' + formatHref(c[d].href) + '">' + c[d].name + "</a>" : '<a class="menu-' + c[d].type + '" href="javascript:void(0)" data-id="' + c[d].value + '">' + c[d].name + "</a>", (b || d !== c.length - 1) && (a += '<div class="cut-line"></div>');
						b && (a += '<a class="menu-focus" href="javascript:void(0)">关注公众号</a>'), a += "</div></div></div>", a += "customer" === _copyrightFrom ? '<div class="menu-copyright">' + getCopyrightCustomer(!0) + '<span class="show-report">举报</span></div>' : "na" === _copyrightFrom ? '<div class="menu-copyright"></div>' : '<div class="menu-copyright"><span class="show-report">举报</span><span class="show-copyright"><a href="' + appConfig.copyright.url + '" target="_blank" style="color:#fff;">' + appConfig.copyright.content + "</a></span></div>", $topMenuPanel.html(a), "na" !== _copyrightFrom && registerReportEvent($topMenuPanel.find(".menu-copyright .show-report")), _dataObj.showVisitCount && null !== _log && !getIsFromTpl() && setTimeout(function() {
							0 !== _log.getVisitCount() && $topMenuPanel.find(".menu-copyright").append('<span class="show-visit">阅读:' + _log.getVisitCount() + "</span>")
						}, 300);
						var e = $topMenuPanel.find(".fw_close");
						e.off().on(clickEventType, function(a) {
							a.stopPropagation(), a.preventDefault(), displayPanelDialog("up", "down", "topmenu"), removeAllBlurPage()
						});
						var f = $topMenuPanel.find(".top-menu-list");
						f.find(".menu-page").off().on("click", function(a) {
							displayPanelDialog("up", "down", "topmenu"), removeAllBlurPage();
							var b = $(this).data("id");
							setTimeout(function() {
								if("first" === b) firstPageId != currentPageId && apiHelper.getAppInstance().gotoPage(firstPageId);
								else if("pre" === b) apiHelper.getAppInstance().gotoPrePage();
								else if("next" === b) apiHelper.getAppInstance().gotoNextPage();
								else {
									if(b === currentPageId || "0" === b || 0 === b) return;
									apiHelper.getAppInstance().gotoPage(b)
								}
							}, 500)
						}), f.find(".menu-url").off().on("click", function(a) {
							var b = $(this).data("id");
							apiHelper.getAppInstance().urlAuditVisit(b)
						}), b && f.find(".menu-focus").off().on(clickEventType, function(a) {
							console.log("focus"), a.stopPropagation(), a.preventDefault(), displayPanelDialog("up", "down", "topmenu"), showFocusWechat()
						})
					}
					displayPanelDialog("down", "up", "topmenu"), loadMenuListByiScroll()
				}
			}

			function loadMenuListByiScroll() {
				if(null === menuScrollInstance) {
					var a = $topMenuPanel.find(".top-menu-list");
					menuScrollInstance = new iScroll(a.find(".scroll-list").get(0), {
						bounce: !1,
						bounceLock: !1,
						vScrollbar: !1
					})
				}
			}

			function createFocusWechat() {
				if(isShowFocusWechat() && (!_dataObj.focusWechat || "rrx-qrcode.jpg" === _dataObj.focusWechat.qrcode || getCanModifyWechat())) {
					"focus-icon.png" === _dataObj.focusWechat.icon && (_dataObj.focusWechat.icon = "focus-icon2.png");
					var a = handleImgUrl(_dataObj.focusWechat.icon) + "?v=" + appConfig.version;
					$focusButton.attr("src", a), $focusButton.off().on(clickEventType, function(a) {
						a.stopPropagation(), a.preventDefault(), showFocusWechat(), setBlurBgPage()
					}), isShowTopMenu() || $focusButton.css({
						left: "23px"
					}), showEffect($focusButton)
				}
			}

			function showFocusWechat() {
				if("rrx-qrcode.jpg" !== _dataObj.focusWechat.qrcode && (!_dataObj.focusWechat || "rrx-qrcode.jpg" === _dataObj.focusWechat.qrcode || getCanModifyWechat())) {
					if(0 === $focusPanel.find(".fw-qrcode-box").length) {
						var a = handleImgUrl(_dataObj.focusWechat.qrcode),
							b = '<a href="javascript:void(0)" class="show-common-report">举报</a><a class="rrx-icon-close-layer fw_close"></a><div class="fw-qrcode-box"><div class="qr-box"><div class="wxqr"><img src="' + a + '"></div></div><div class="fw-name">' + _dataObj.focusWechat.name + '</div><div class="fw-describe">' + _dataObj.focusWechat.describe + "</div>";
						$focusPanel.html(b);
						var c = $focusPanel.find(".fw_close");
						c.off().on(clickEventType, function(a) {
							a.stopPropagation(), a.preventDefault(), displayPanelDialog("up", "down", "focus"), removeAllBlurPage()
						}), registerReportEvent($focusPanel.find(".show-common-report"))
					}
					displayPanelDialog("down", "up", "focus")
				}
			}

			function playShowCopyrightPageAnim() {
				$pageCopyrightPageEnd.css("display", "block"), getIsFlipDown() ? setTimeout(function() {
					$pageCopyrightPageEnd.removeClass("damu-down"), $pageCopyrightPageEnd.addClass("damu-up")
				}, 0) : setTimeout(function() {
					$pageCopyrightPageEnd.removeClass("damu-right"), $pageCopyrightPageEnd.addClass("damu-left")
				}, 0)
			}

			function playHideCopyrightPageAnim() {
				getIsFlipDown() ? (setTimeout(function() {
					$pageCopyrightPageEnd.css("display", "none"), $pageCopyrightPageEnd.removeClass("damu-up"), removeBlurBgPage()
				}, 250), $pageCopyrightPageEnd.removeClass("damu-up"), $pageCopyrightPageEnd.addClass("damu-down")) : (setTimeout(function() {
					$pageCopyrightPageEnd.css("display", "none"), $pageCopyrightPageEnd.removeClass("damu-left"), removeBlurBgPage();

				}, 250), $pageCopyrightPageEnd.removeClass("damu-left"), $pageCopyrightPageEnd.addClass("damu-right"))
			}

			function displayPanelDialog(a, b, c) {
				var d = null;
				d = "danmu" === c ? $danmuPanel : "topmenu" === c ? $topMenuPanel : "share" === c ? $sharePanel : $focusPanel, "down" === a ? (d.css("display", "block"), hideDanmuInfo(), apiHelper.getAppInstance().stopFlip()) : (setTimeout(function() {
					d.css("display", "none"), removeBlurBgPage()
				}, 250), resetDanmuInfo(), apiHelper.getAppInstance().resetFlip(!0)), setTimeout(function() {
					d.removeClass("damu-" + a), d.addClass("damu-" + b)
				}, 0)
			}

			function createSharePanel() {
				var a = ' <div class="rrx-icon-close-layer"></div> <div class="share-image"> <img src="{{shareImageUrl}}"> </div> <div class="share-title">{{shareTitle}}</div> <div class="share-tips-box"> <div class="share-tips-content"> <div class="share-left"></div> <span class="share-center">分享到</span> <div class="share-right"></div> </div> </div> <div class="share-button-box"> <div class="share-button-content"> <div class="share-button-left"> <div class="rrx-icon-share-friend share-button-friend"> </div> <div class="share-button-text"> 微信好友 </div> </div> <div class="share-button-right"> <div class="rrx-icon-share-timeline share-button-timeline"> </div> <div class="share-button-text"> 朋友圈 </div> </div> </div> </div><div class="share-copyright"> <span class="show-report" style="display: none;">举报</span>   </div>',
					b = _dataObj.shareImageUrl || defaultShareImageUrl;
				a = a.replace("{{shareTitle}}", _dataObj.title).replace("{{shareImageUrl}}", b), $sharePanel.html(a);
				var c = $sharePanel.find(".share-copyright");
				"na" === _copyrightFrom || c.append("customer" === _copyrightFrom ? getCopyrightCustomer(!0) : '<span class="show-copyright"><a href="' + appConfig.copyright.url + '" target="_blank" style="color:#fff;">' + appConfig.copyright.content + "</a></span>");
				var d = c.find(".show-report");
				"na" === _copyrightFrom ? d.hide() : d.show(), registerReportEvent(d), _dataObj.showVisitCount && null !== _log && !getIsFromTpl() && setTimeout(function() {
					0 !== _log.getVisitCount() && c.append('<span class="show-visit">阅读:' + _log.getVisitCount() + "</span>")
				}, 1500);
				var e = $sharePanel.find(".rrx-icon-close-layer");
				e.off().on(clickEventType, function(a) {
					a.stopPropagation(), a.preventDefault(), displayPanelDialog("up", "down", "share"), removeAllBlurPage()
				}), $sharePanel.find(".share-button-friend").off().on(clickEventType, function(a) {
					a.stopPropagation(), a.preventDefault(), showSharepage()
				}), $sharePanel.find(".share-button-timeline").off().on(clickEventType, function(a) {
					a.stopPropagation(), a.preventDefault(), createSharePoster()
				})
			}

			function showSharePanel() {
				setBlurBgPage(), displayPanelDialog("down", "up", "share")
			}

			function getSharePosterBgImg() {
				return _dataObj.sharePosterBgImg ? handleImgUrl(_dataObj.sharePosterBgImg) : ""
			}

			function createSharePoster() {
				var a = !1;
				if(sharePosterCreated ? (shareTitle !== shareTitleLast || shareDesc !== shareDescLast || shareImageUrl !== shareImgLast || shareUrl !== shareUrlLast) && (a = !0) : a = !0, a) {
					var b = {
							serviceHost: getServiceHostIfHttps(),
							shareTitle: shareTitle,
							shareDesc: shareDesc,
							shareImg: shareImageUrl,
							shareUrl: shareUrl,
							sharePosterBgImg: getSharePosterBgImg(),
							wsiteGuid: _dataObj.guid,
							wsiteCreateTime: wsiteInfo.loading.createTime,
							imageHost: getImageHost(),
							base64: Cool.util.checkIsIphone(),
							callback: handleSharePosterResult
						},
						c = new rrxSharePosterCreator(b);
					c.create(), showSharePosterTips("正在生成"), shareTitleLast = shareTitle, shareDescLast = shareDesc, shareImgLast = shareImageUrl, shareUrlLast = shareUrl
				} else showSharePosterTips("正在生成"), setTimeout(function() {
					hideSharePosterTips(), showSharePosterDialog()
				}, 200)
			}

			function handleSharePosterResult(a) {
				if(0 === a.code)
					if("base64" === a.imgFormat) hideSharePosterTips(), $("#share_poster_img").attr("src", a.base64), showSharePosterDialog(), sharePosterCreated = !0;
					else {
						var b = getImageHost() + a.imgPath;
						Cool.util.loadImage(b, function() {
							if(hideSharePosterTips(), appConfig.dev === !0) {
								var a = new Date;
								$("#share_poster_img").attr("src", b + "?v=" + a.getTime())
							} else $("#share_poster_img").attr("src", b);
							showSharePosterDialog(), sharePosterCreated = !0
						}, !1)
					}
				else hideSharePosterTips(), winAlert("生成图片失败，请重试")
			}

			function initSharePoster() {
				var a = '<div class="dialog-content"> <div class="dialog-close"></div> <div class="dialog-top">长按图片保存海报分享朋友圈</div> <div class="dialog-content-container"> <div style="width:100%;"><img id="share_poster_img" src width="100%" style="-webkit-user-drag:none;"></div> </div> </div>';
				$sharePosterDialog.append(a);
				var b = $sharePosterDialog.find(".dialog-close");
				b.off().on(clickEventType, function(a) {
					a.stopPropagation(), a.preventDefault(), hideSharePosterDialog()
				});
				var c = $(".share-poster-process-dialog"),
					d = $('<div class="dialog-container">');
				c.append(d);
				var e = $('<div class="dialog-container-process">').html("请稍等");
				d.append(e), $sharePosterTips = c
			}

			function showSharePosterTips(a) {
				$sharePosterTips.find(".dialog-container-process").html(a), $sharePosterTips.show()
			}

			function hideSharePosterTips() {
				$sharePosterTips.hide(), $sharePosterTips.find(".dialog-container-process").html("请稍等")
			}

			function showSharePosterDialog() {
				$sharePosterDialog.find(".dialog-content").removeClass("bounceOutUpAni").addClass("bounceInUpAni"), $sharePosterDialog.show()
			}

			function hideSharePosterDialog() {
				$sharePosterDialog.find(".dialog-content").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), setTimeout(function() {
					$sharePosterDialog.hide()
				}, 600)
			}

			function initSidleShare() {
				(1 === wsiteInfo.activityType || _isAllPageShowReport) && ($sidleShareButton = $(".sidle-share"), setSidleSharePos(), showSidleShare(), $sidleShareButton.off().on(clickEventType, function(a) {
					a.stopPropagation(), a.preventDefault(), showSharePanel()
				}))
			}

			function setSidleSharePos() {
				hasBgMusic || $sidleShareButton.css({
					top: "3%"
				})
			}

			function showSidleShare() {
				1 === parseInt(_dataObj.forbidShare) || wsiteInfo.wxp.showShareMenu === !1 || "1" === wsiteInfo.mamfm ? hideSidleShare() : (1 === wsiteInfo.activityType || _isAllPageShowReport) && $sidleShareButton.show()
			}

			function hideSidleShare() {
				$sidleShareButton && $sidleShareButton.hide()
			}

			function initSidleReport() {
				(1 === wsiteInfo.activityType || _isAllPageShowReport) && ($sidleReportButton = $(".sidle-report"), setSidleReportPos(), showSidleReport(), registerReportEvent($sidleReportButton))
			}

			function setSidleReportPos() {
				hasBgMusic || $sidleReportButton.css({
					top: "11%"
				})
			}

			function showSidleReport() {
				1 === parseInt(_dataObj.forbidShare) || wsiteInfo.wxp.showShareMenu === !1 || "1" === wsiteInfo.mamfm ? hideSidleReport() : (1 === wsiteInfo.activityType || _isAllPageShowReport) && $sidleReportButton.show()
			}

			function hideSidleReport() {
				$sidleReportButton && $sidleReportButton.hide()
			}

			function closeOnlyPluginDanmu() {
				onlyPluginDanmu = !1
			}

			function isShowDanmu() {
				return forceOpenDanmu ? forceOpenDanmu : _dataObj.danmuLike && _dataObj.danmuLike.show ? !0 : !1
			}

			function isOldWsite() {
				return void 0 !== _dataObj.danmuLike || _isPreview ? !1 : !0
			}

			function isShowDanmuAnimate() {
				return forceOpenDanmu ? forceOpenDanmu : _dataObj.danmuLike && _dataObj.danmuLike.showDanmu ? !0 : !1
			}

			function createDanmu() {
				danmuButtonShow && isShowDanmu() && (rrxdebug && console.info("createDanmu"), $danmuButton.off().on(clickEventType, function(a) {
					if(a.stopPropagation(), a.preventDefault(), checkWeixinAlert()) {
						if(wsiteInfo.authBehind) {
							var b = apiHelper.getAppInstance().weixinStrong.getAuthedInfo();
							"" !== b.id && null !== b.id && void 0 !== b.id && (authUserInfo = b)
						}
						if(null === authUserInfo) {
							var c = {
								startPageId: currentPageId,
								clickType: "danmu"
							};
							apiHelper.getAppInstance().weixinStrong.auth(function(a) {
								authUserInfo = a, Danmaku.hide(), showDanmuEvent()
							}, c)
						} else Danmaku.hide(), showDanmuEvent()
					}
				}), showEffect($danmuButton))
			}

			function createDanmuPanel() {
				var a = "rrx-icon-danmu-open l-icon";
				_dataObj.hasOwnProperty("danmuLike") && (_dataObj.danmuLike.showDanmu || (a = "rrx-icon-danmu-close l-icon"));
				var b = '<a class="rrx-icon-close-layer dm_close"></a><div class="comment-send-tip"></div><div class="p-buttons"><div class="btn-like"><div class="rrx-icon-danmu-like l-icon"></div><div class="l-txt">喜欢</div><span class="l-tip">' + danmu_like_count + '</span></div><div class="btn-danmu"><div class="' + a + '"></div><div class="l-txt">弹幕</div><span class="l-tip">' + danmu_comment_count + '</span></div><div class="btn-share"><div class="rrx-icon-danmu-share l-icon"></div><div class="l-txt">分享</div></div></div><div class="p-publish"><input type="text" placeholder="发布弹幕"> <a href="javascript:void(0)">发布</a></div><div class="p-comments"><div class="comment-list"><div class="scroll-comment"></div></div></div>';
				"customer" !== _copyrightFrom && "na" !== _copyrightFrom && (b += '<div class="p-make"><a href="' + appConfig.copyright.url + '" target="_blank">我也要制作人人秀</a></div>'), b += "customer" === _copyrightFrom ? '<div class="p-copyright">' + getCopyrightCustomer(!0) + '<span class="show-report">举报</span></div>' : "na" === _copyrightFrom ? '<div class="p-copyright"></div>' : '<div class="p-copyright"><span class="show-report">举报</span><span class="show-copyright"><a href="' + appConfig.copyright.url + '" target="_blank" style="color:#fff;">' + appConfig.copyright.content + "</a></span></div>", $danmuPanel.html(b), "na" !== _copyrightFrom && registerReportEvent($danmuPanel.find(".p-copyright .show-report")), _dataObj.showVisitCount && null !== _log && !getIsFromTpl() && setTimeout(function() {
					0 !== _log.getVisitCount() && $danmuPanel.find(".p-copyright").append('<span class="show-visit">阅读:' + _log.getVisitCount() + "</span>")
				}, 300), loadCommentListByiScroll(DM_Comment_List)
			}

			function showDanmuEvent() {
				displayPanelDialog("down", "up", "danmu"), null === danmuiScrollInstance && (createDanmuPanel(), bindDanmuElementEvent())
			}

			function hideDanmuInfo() {
				(isShowDanmu() || isShowFocusWechat() || isShowTopMenu()) && ("" !== musicUrl && $iconMusic.css({
					opacity: 0,
					display: "none"
				}), $progress.css("opacity", 0), Cool.util.checkIsAndroid() && stopEmbedVideo(), currentPageId === lastPageId && hideEffect($copyright), (isShowFocusWechat() || isShowTopMenu()) && ($focusButton.hide(), $topMenuButton.hide()), hideSidleShare(), hideSidleReport(), isShowDanmu() && ($danmuButton.hide(), isShowDanmuAnimate() && (Danmaku.stop(), Danmaku.hide())))
			}

			function pageIsHaveTopPlugin(a, b, c) {
				var d = getPageObjById(currentPageId),
					e = d.elementList;
				b = b || "照片投票";
				for(var f = 0; f < e.length; f++) {
					if(a) {
						if(pluginIsTop(e[f].content.isTop)) return !0
					} else if(b.indexOf(e[f].content.name) > -1) return !0;
					if(c && c.indexOf(0 | e[f].content.categoryId) > -1) return !0
				}
				return !1
			}

			function resetDanmuInfo() {
				if(isShowDanmu() || isShowFocusWechat() || isShowTopMenu()) {
					if("" !== musicUrl && $iconMusic.css({
							display: "block",
							opacity: 1
						}), $progress.css("opacity", 1), Cool.util.checkIsAndroid() && resetEmbedVideo(), currentPageId === lastPageId && (currentPageId === lastPageId || _isHaveMenu && "na" === _copyrightFrom)) {
						var a = getPageObjById(currentPageId);
						a.longPage ? "rrxiu" !== _copyrightFrom && (fnCheckIsNoCopyright() ? hideEffect($copyright) : showEffect($copyright)) : "rrxiu" !== _copyrightFrom && (fnCheckIsNoCopyright() ? hideEffect($copyright) : showEffect($copyright))
					}(isShowFocusWechat() || isShowTopMenu()) && ($focusButton.show(), $topMenuButton.show()), showSidleShare(), showSidleReport(), isShowDanmu() && ($danmuButton.show(), isShowDanmuAnimate() && Danmaku.start())
				}
			}

			function bindDanmuElementEvent() {
				var a = $danmuPanel.find(".p-buttons .btn-share"),
					b = $danmuPanel.find(".p-buttons .btn-like"),
					c = $danmuPanel.find(".p-buttons .btn-danmu"),
					d = $danmuPanel.find(".p-publish a"),
					e = $danmuPanel.find(".dm_close"),
					f = $danmuPanel.find(".p-publish input");
				f.unbind().bind(clickEventType, function() {
					!checkWeixinAlert()
				}), e.unbind().bind(clickEventType, function(a) {
					a.stopPropagation(), a.preventDefault(), $(window).trigger("sysDanmaCloseClick"), displayPanelDialog("up", "down", "danmu")
				}), c.unbind().bind(clickEventType, function(a) {
					a.stopPropagation(), a.preventDefault();
					var b = c.find(".l-icon");
					b.hasClass("rrx-icon-danmu-close") ? (b.addClass("rrx-icon-danmu-open"), b.removeClass("rrx-icon-danmu-close"), _dataObj.danmuLike.showDanmu = !0, closeOnlyPluginDanmu(), forceOpenDanmu = !1) : (b.addClass("rrx-icon-danmu-close").removeClass("rrx-icon-danmu-open"), _dataObj.danmuLike.showDanmu = !1, Danmaku.stop())
				}), b.unbind().bind(clickEventType, function(a) {
					a.stopPropagation(), a.preventDefault(), sendLikePost();
					var b = $('<div class="like_icon" style="background-image: url(' + authUserInfo.headimgurl + ')"></div>');
					$danmuPanel.append(b), b.css({
							transform: "translateY(40px) scale(0.5)",
							"-webkit-transform": "translateY(40px) scale(0.5)"
						}),
						function(a) {
							setTimeout(function() {
								a.css({
									"-webkit-transition": "1.5s ease-out",
									transition: "1.5s ease-out",
									transform: "translateY(-120px) scale(1)",
									"-webkit-transform": "translateY(-120px) scale(1)"
								}), a.get(0).addEventListener("webkitTransitionEnd", function() {
									$(this).remove()
								}, !1)
							}, 0)
						}(b)
				}), a.unbind().bind(clickEventType, function(a) {
					a.stopPropagation(), a.preventDefault(), $danmuPanel.hide(), $danmuPanel.removeClass("danmu-up").addClass("damu-down"), showSharePanel()
				}), d.unbind().bind(clickEventType, function(a) {
					a.stopPropagation(), a.preventDefault(), sendComment()
				})
			}

			function getCommentLikeCount() {
				ajaxPost("like/getCount", {
					wsiteGuid: _dataObj.guid
				}, function(a) {
					0 === a.result ? (danmu_like_count = a.data.likeCount, danmu_comment_count = a.data.commentCount, createDanmu()) : console.error(a)
				})
			}

			function sendLikePost() {
				danmu_like_count = parseInt(danmu_like_count) + 1;
				var a = $danmuPanel.find(".p-buttons .btn-like .l-tip");
				a.html(danmu_like_count), setTimeout(function() {
					ajaxPost("like/add", {
						wsiteGuid: _dataObj.guid,
						wechatOpenId: authUserInfo.id,
						name: authUserInfo.nickname,
						photo: authUserInfo.headimgurl
					}, function(a) {
						0 === a.result && (hasDoLike || isInLikeList(a.data.wechatOpenId) || Danmaku.addLikeData(a.data))
					})
				}, 2e3)
			}

			function html2Escape(a) {
				return a.replace(/[<>&"]/g, function(a) {
					return {
						"<": "&lt;",
						">": "&gt;",
						"&": "&amp;",
						'"': "&quot;"
					}[a]
				})
			}

			function sendComment() {
				if(!isSending) {
					var a = $danmuPanel.find(".p-publish input");
					if("" === a.val()) return void showDanmuTip("评论信息不能为空！");
					if(Danmaku.getCharacterSize(a.val()) > 48) return void showDanmuTip("评论信息不能超过25个字符！");
					if(null === authUserInfo) return void showDanmuTip("微信授权失败，请尝试点击输入框！");
					isSending = !0, ajaxPost("comment/add", {
						wsiteGuid: _dataObj.guid,
						review: _dataObj.danmuLike.review,
						content: html2Escape(a.val()),
						wechatOpenId: authUserInfo.id,
						name: authUserInfo.nickname,
						photo: authUserInfo.headimgurl
					}, function(b) {
						if(0 === b.result) {
							var c = $danmuPanel.find(".p-buttons .btn-danmu").find(".l-icon");
							c.hasClass("rrx-icon-danmu-close") && (c.addClass("rrx-icon-danmu-open"), c.removeClass("rrx-icon-danmu-close"), _dataObj.danmuLike.showDanmu = !0), danmu_comment_count = parseInt(danmu_comment_count, 10) + 1, a.val(""), showDanmuTip("评论成功 ^_^");
							var d = $danmuPanel.find(".p-buttons .btn-danmu .l-tip");
							d.html(danmu_comment_count), b.data.photo && (b.data.photo = handleWxHeadImg(b.data.photo)), DM_Comment_List.unshift(b.data), Danmaku.refresh(DM_Comment_List), appendCommentToList(b.data)
						} else showDanmuTip("评论失败 ︶︿︶")
					})
				}
			}

			function handleWxHeadImg(a) {
				return a ? (a.indexOf(!1) && a.indexOf("/0") > -1 && (a = a.replace("/0", "/64")), a.replace("http://", "https://")) : a
			}

			function showDanmuTip(a) {
				var b = $danmuPanel.find(".comment-send-tip");
				b.css("display", "block"), b.css("top", "4%"), b.html(a), setTimeout(function() {
					b.css("top", "-100px"), isSending = !1, setTimeout(function() {
						b.css("display", "none")
					}, 1e3)
				}, 700)
			}

			function appendCommentToList(a) {
				if(a.createTime || (a.createTime = getNowFormatDate()), !a.hideInList) {
					var b = $danmuPanel.find(".p-comments .comment-list");
					b.find(".scroll-comment").prepend(getCommentHtml(a))
				}
			}

			function getCommentHtml(a) {
				return a.hideInList ? "" : a.customCommnetListItem ? ($citem = $('<div class="cm-content" data-customid="' + a.customId + '" data-photo="' + a.photo + '">' + a.customCommnetListItem + "</div>"), $citem) : '<div class="cm-content"><img src="' + a.photo + '"><span>' + html2Escape(a.content) + "</span></div>"
			}

			function getNowFormatDate() {
				var a = new Date,
					b = "-",
					c = ":",
					d = a.getMonth() + 1,
					e = a.getDate();
				d >= 1 && 9 >= d && (d = "0" + d), e >= 0 && 9 >= e && (e = "0" + e);
				var f = a.getFullYear() + b + d + b + e + " " + a.getHours() + c + a.getMinutes() + c + a.getSeconds();
				return f
			}

			function stringTime2Time(a) {
				try {
					if(a) {
						a = a.replace(/-/g, "/");
						var b = Date.parse(new Date(a));
						return b /= 1e3
					}
					return nowTime()
				} catch(c) {
					return nowTime()
				}
			}

			function nowTime() {
				var a = Date.parse(new Date);
				return a /= 1e3
			}

			function srotDanmuList(a, b) {
				a = a.sort(function(a, b) {
					return b - a
				});
				var c = [];
				return $.each(a, function(a, d) {
					$.each(b, function(a, b) {
						d === b.sort && (inSortList(c, b) || c.push(b))
					})
				}), c
			}

			function inSortList(a, b) {
				var c = !1;
				return $.each(a, function(a, d) {
					d.content === b.content && d.name === b.name && d.photo === b.photo && d.createTime === b.createTime && (c = !0)
				}), c
			}

			function isInLikeList(a) {
				var b = !1;
				return $.each(DM_Comment_Like_List, function(c, d) {
					return d.wechatOpenId === a && (b = !0) ? b : void 0
				}), b
			}

			function loadCommentListByiScroll(a) {
				var b = $danmuPanel.find(".p-comments .comment-list");
				$.each(a, function(a, b) {
					b.sort = stringTime2Time(b.createTime), danmuSortKey.push(b.sort)
				}), a = srotDanmuList(danmuSortKey, a);
				for(var c = 0; c < a.length; c++) b.find(".scroll-comment").append(getCommentHtml(a[c]));
				null === danmuiScrollInstance && (danmuiScrollInstance = new iScroll(b.get(0), {
					bounce: !1,
					bounceLock: !1,
					vScrollbar: !1
				}))
			}

			function getCommentList() {
				ajaxPost("comment/getCommentList", {
					wsiteGuid: _dataObj.guid
				}, function(a) {
					0 === a.result && (a.data && a.data.length > 20 && (a.data = a.data.slice(0, 19)), $.each(a.data, function(a, b) {
						b.photo = handleWxHeadImg(b.photo), DM_Comment_List.push(b)
					}), a.likeData && a.likeData.length > 10 && (a.likeData = a.likeData.slice(0, 9)), $.each(a.likeData, function(a, b) {
						b.photo = handleWxHeadImg(b.photo), DM_Comment_Like_List.push(b)
					}), isShowDanmu() && (initDanmu(), isShowDanmuAnimate() && !window.rrxDanmuJump && danmuAnimateShow && Danmaku.start()))
				})
			}

			function initDanmu() {
				var a = "horizontal";
				if(void 0 !== _dataObj.danmuLike && null !== _dataObj.danmuLike && (a = _dataObj.danmuLike.style), onlyPluginDanmu) {
					var b = [];
					$.each(DM_Comment_List, function(a, c) {
						c.source && "plugin" === c.source && b.push(c)
					}), Danmaku.init({
						style: a
					}), console.log(b), Danmaku.setDanmuData(b), Danmaku.setDanmuLikeData(DM_Comment_Like_List)
				} else Danmaku.init({
					style: a
				}), Danmaku.setDanmuData(DM_Comment_List), Danmaku.setDanmuLikeData(DM_Comment_Like_List)
			}

			function ajaxPost(a, b, c) {
				$.post(getInteractServiceHostIfHttps() + a, {
					form: b
				}, function(a) {
					c(a)
				}, "json")
			}

			function listenVisibilitychange(a) {}

			function renderPage(a) {
				$(".pt-wrapper .arrow-down p").css("background-image", "none !important"), $(".pt-wrapper .arrow-down p").css("background-image", "none !important"), $page = _$canvas.find(".page_" + a), "sharepage" == a ? $page = $sharepage : "loadingpage" == a ? $page = $loadingpage : "floorpage" == a ? $page = $floorpage : "toppage" == a ? $page = $pagewrapper : flipLoadImage(a);
				var b = null,
					c = !1;
				return _dataObj.swipe = void 0, $page.data("isrender") !== !0 ? ("loadingpage" !== a && pageCodeInit(a, apiHelper.getAppInstance()), pageEventInit(a), $page.data("isrender", !0), b = getPageObjById(a), null !== b && (c = b.longPage, b.longPage ? (longPageObj.push(b), void 0 === b.longPagebgMode || "1" === b.longPagebgMode ? (parsePageBackgroundFixMode(b, $page), $page.append(parsePage(b))) : (parsePageBackgroundColor(b, $page), $page.append(parsePage(b)), parsePageBackgroundImage(b, $page.find(".pt-page-element-list-box")))) : void 0 === b.backgroundImageNaturalWidth || void 0 === b.backgroundView ? ($page.append(parsePageBackground(b)), $page.append(parsePage(b))) : (parsePageBackgroundColor(b, $page), $page.append(parsePage(b)), parsePageBackgroundImage(b, $page.find(".pt-page-element-list-box"))), b.elementList && !_isEditing && $.each(b.elementList, function(a, d) {
					if("html" === d.type && (c = !d.content.fullscreen && c, d.content.scroll)) {
						var e = apiHelper.getAppInstance().getElement(d.id, b.id);
						if(e) {
							console.log("new myHtmlScroll");
							var f = new iScroll(e.find(".we-canvas").get(0), {
								checkDOMChanges: !0,
								bounce: !1,
								bounceLock: !1,
								onBeforeScrollStart: function(a) {
									a.stopPropagation()
								}
							});
							iScrollInstances.push({
								pageId: b.id,
								elemId: d.id,
								instance: f
							})
						}
					}
				}), setTimeout(function() {
					!_isEditing && c && rrxScrollLongPageIScrollS(_dataObj, b)
				}, 10))) : (_isEditing || loadPluginEvent(a), b = getPageObjById(a), b.elementList && !_isEditing && $.each(b.elementList, function(a, c) {
					b.elementList[a].playedAnimation = !1
				}), c = b.longPage), handleScaleIfSmallScreen(), $.isNumeric(a) || "loadingpage" !== a && pageCodeLoad(a, apiHelper.getAppInstance()), c
			}

			function renderDialog(a) {
				$page = _$canvas.find(".page_" + a), (null === $page || void 0 === $page || 0 === $page.length) && $ptWrapper.append('<div class="pt-page dialog-page page_' + a + '" data-id="' + a + '"></div>'), $page = _$canvas.find(".page_" + a), flipLoadImage(a);
				var b = null;
				return iScrollLongPage = !1, $page.data("isrender") !== !0 ? ("loadingpage" !== a && pageCodeInit(a, apiHelper.getAppInstance()), pageEventInit(a), $page.data("isrender", !0), b = getPageObjById(a), null !== b && (void 0 === b.backgroundImageNaturalWidth || void 0 === b.backgroundView ? ($page.append(parsePageBackground(b)), $page.append(parsePage(b))) : (parsePageBackgroundColor(b, $page), $page.append(parsePage(b)), parsePageBackgroundImage(b, $page.find(".pt-page-element-list-box"))), b.elementList && !_isEditing && $.each(b.elementList, function(a, c) {
					if("html" === c.type && c.content.scroll) {
						var d = apiHelper.getAppInstance().getElement(c.id, b.id);
						if(d) {
							console.log("new myHtmlScroll");
							var e = new iScroll(d.find(".we-canvas").get(0), {
								checkDOMChanges: !0,
								bounce: !1,
								bounceLock: !1,
								onBeforeScrollStart: function(a) {
									a.stopPropagation()
								}
							});
							iScrollInstances.push({
								pageId: b.id,
								elemId: c.id,
								instance: e
							})
						}
					}
				}))) : (b = getPageObjById(a), b.elementList && !_isEditing && $.each(b.elementList, function(a, c) {
					b.elementList[a].playedAnimation = !1
				})), regDialogCloseSelf(a), iScrollLongPage
			}

			function renderPageObj(a) {
				null !== a && (iScrollLongPage = a.longPage, a.longPage ? (longPageObj.push(a), void 0 === a.longPagebgMode || "1" === a.longPagebgMode ? (parsePageBackgroundFixMode(a, $page), $page.append(parsePage(a))) : (parsePageBackgroundColor(a, $page), $page.append(parsePage(a)), parsePageBackgroundImage(a, $page.find(".pt-page-element-list-box")))) : void 0 === a.backgroundImageNaturalWidth || void 0 === a.backgroundView ? ($page.append(parsePageBackground(a)), $page.append(parsePage(a))) : (parsePageBackgroundColor(a, $page), $page.append(parsePage(a)), parsePageBackgroundImage(a, $page.find(".pt-page-element-list-box"))), a.elementList && !_isEditing && $.each(a.elementList, function(b, c) {
					if("html" === c.type && (iScrollLongPage = !c.content.fullscreen && iScrollLongPage, c.content.scroll)) {
						var d = apiHelper.getAppInstance().getElement(c.id, a.id);
						if(d) {
							console.log("new myHtmlScroll");
							var e = new iScroll(d.find(".we-canvas").get(0), {
								checkDOMChanges: !0,
								bounce: !1,
								bounceLock: !1,
								onBeforeScrollStart: function(a) {
									a.stopPropagation()
								}
							});
							iScrollInstances.push({
								pageId: a.id,
								elemId: c.id,
								instance: e
							})
						}
					}
				}), setTimeout(function() {
					!_isEditing && iScrollLongPage && rrxScrollLongPageIScrollS(_dataObj, a)
				}, 10))
			}

			function regDialogCloseSelf(a) {
				var b = _$canvas.find(".page_" + a);
				b.find(".pt-page-element-list-box").unbind("click").bind("click", function(b) {
					b.stopPropagation(), "pt-page-element-list-box" === b.currentTarget.className && "pt-page-element-list-box" === b.target.className && dialogClose(a)
				}), b.find(".element_pagebg").unbind("click").bind("click", function(b) {
					b.stopPropagation(), console.log("close", b), "element element_pagebg" !== b.currentTarget.className || "element element_pagebg" !== b.target.className && "pagebg_img" !== b.target.className || dialogClose(a)
				})
			}

			function renderProgress(a, b) {
				if(2 > pageListCount) return void $progress.css("display", "none");
				for(var c = _dataObj.pageList, d = a, e = 0; e < c.length; e++)
					if(c[e].id === a) {
						d = e + 1;
						break
					}
				var f = d / b * 100 + "%",
					g = d + "/" + b;
				$progress.css("display", "block"), $(".progress-tip").animate({
					width: f
				}, 700), $(".progress-tip").css("display", "block"), $(".progress-tip").css("height", "100%"), $(".progress-tip").css("background-color", "#08A1EF"), $(".page-tip").html(g), $(".page-tip").css("display", "inline-block"), $(".page-tip").css("position", "absolute"), $(".page-tip").css("font-size", "16px"), $(".page-tip").css("bottom", "10px"), $(".page-tip").css("right", "10px"), $(".page-tip").css("color", "#fff")
			}

			function renderCopyright() {
				_isHaveMenu && "rrxiu" !== _copyrightFrom && "bottom" !== _copyrightFrom && $copyright.css("bottom", "70px"), 0 !== _dataObj.result ? createCopyrightWeplus(!0) : "customer" === _copyrightFrom ? createCopyrightCustomer() : createCopyrightWeplus()
			}

			function getCopyrightCustomer(a) {
				var b = void 0 === _dataObj.copyright.content ? "" : _dataObj.copyright.content,
					c = "";
				return c = a ? '<span class="show-copyright">' + createCopyrightHrefConent(_dataObj.copyright.url, b, getCopyrightColor("")) + "</span>" : '<span class="show-copyright">' + createCopyrightHrefConent(_dataObj.copyright.url, b, getCopyrightColor(_dataObj.copyright.color)) + "</span>"
			}

			function createCopyrightCustomer() {
				$copyright.css("background-color", getCopyrightBgColor(_dataObj.copyright.bgColor)), $copyright.css("color", getCopyrightColor(_dataObj.copyright.color)), $copyright.css("text-align", getCopyrightTextAlign(_dataObj.copyright.textAlign)), $copyright.html(getCopyrightCustomer()), $copyright.prepend(getShowReportByWeplus()), registerReportEvent($copyright.find(".show-report")), _dataObj.showVisitCount && null !== _log && !getIsFromTpl() && setTimeout(function() {
					0 !== _log.getVisitCount() && $copyright.append('<span class="show-visit">阅读:' + _log.getVisitCount() + "</span>")
				}, 1500)
			}

			function getShowVisitByWeplus() {
				var a = '<span class="show-visit" ';
				return _dataObj.flipProgress && (a += 'style="margin-right:40px;margin-bottom:2px;"'), a += ">阅读:" + _log.getVisitCount() + "</span>"
			}

			function getShowAllPageReport() {
				return '<a href="javascript:void(0)" class="show-allpage-report">举报</a>'
			}

			function hideAllPageReport() {}

			function showAllPageReport() {}

			function getShowReportByWeplus() {
				return '<span class="show-report">举报</span>'
			}

			function getShowCopyrightByWeplus() {
				var a = appConfig.copyright;
				return '<span class="show-copyright">' + createCopyrightHrefConent(a.url, getCopyrightContent(a.content), getCopyrightColor(a.color)) + "</span>"
			}

			function getShowCopyrightByUnion() {
				var a = appConfig.copyright,
					b = getCopyrightColor(a.color),
					c = "人人秀技术支持",
					d = _dataObj.copyright.bgColor,
					e = _dataObj.copyright.url,
					f = '<div class="cy-union">' + createCopyrightHrefConent(e, _dataObj.copyright.content, b) + "</div>",
					g = '<div class="cy-rrxiu">' + createCopyrightHrefConent(e, c, b) + "</div>";
				return $copyright.css({
					height: "68px",
					"line-height": "68px",
					"background-color": d
				}), '<span style="background-color:' + d + '" class="show-copyright">' + f + g + "</span>"
			}

			function createCopyrightWeplus(a) {
				var b = "",
					c = appConfig.copyright,
					d = getShowReportByWeplus(),
					e = null;
				$copyright.css("background-color", getCopyrightBgColor(c.bgColor)), $copyright.css("color", getCopyrightColor(c.color)), "na" === _copyrightFrom ? _dataObj.showVisitCount && a !== !0 && !getIsFromTpl() && setTimeout(function() {
					0 !== _log.getVisitCount() && (b = getShowVisitByWeplus(), $copyright.append(b))
				}, 1500) : (b = "union" === _copyrightFrom ? getShowCopyrightByUnion() : getShowCopyrightByWeplus(), $copyright.css("text-align", "center"), a ? ($copyright.html(b), showCopyright(!0, currentPageId)) : (b = d + b, _dataObj.showVisitCount && null !== _log && !getIsFromTpl() && setTimeout(function() {
					0 !== _log.getVisitCount() && $copyright.append('<span class="show-visit">阅读:' + _log.getVisitCount() + "</span>")
				}, 1500), $copyright.html(b), registerReportEvent($copyright.find(".show-report")), e = getPageObjById(currentPageId), showCopyright(e ? e.stopFlip : !1, currentPageId)))
			}

			function getIsFromTpl() {
				return Cool.util.getUrlParameterByName("tpl")
			}

			function createCopyrightHrefConent(a, b, c) {
				return void 0 !== a && null !== a && "" !== $.trim(a) ? '<a href="' + a + '" target="_blank" style="color:' + c + ';">' + b + "</a>" : b
			}

			function getCopyrightTextAlign(a) {
				return "center"
			}

			function getCopyrightContent(a) {
				return void 0 === a || "" === $.trim(a) ? "免费制作 → 人人秀" : a
			}

			function getCopyrightBgColor(a) {
				return "na" === _copyrightFrom ? "rgba(255,255,255,0)" : void 0 === a || "" === $.trim(a) ? "rgba(0,0,0,0.5)" : a
			}

			function getCopyrightColor(a) {
				return void 0 === a || "" === $.trim(a) ? "#fff" : a
			}

			function createPageEventList() {
				_dataObj.pageEventList = {}
			}

			function createPageCodes() {
				if(_dataObj.pageCodeList = {}, wsiteInfo.wxp.isp) {
					var pageList = _dataObj.pageList,
						specialList = ["loadingpage", "floorpage", "sharepage"],
						pageCode = null;
					$.each(specialList, function(idx, sid) {
						void 0 !== _dataObj[sid] ? void 0 !== _dataObj[sid].code && null !== _dataObj[sid].code && "" !== _dataObj[sid].code ? eval("_dataObj.pageCodeList['" + _dataObj[sid].id + "']= new function(){" + _dataObj[sid].code + " return this;};") : (pageCode = getCodeByCodeList(sid), null !== pageCode && eval("_dataObj.pageCodeList['" + pageCode.id + "']= new function(){" + pageCode.code + " return this;};")) : "loadingpage" === sid && (pageCode = getCodeByCodeList(sid), null !== pageCode && eval("_dataObj.pageCodeList['" + pageCode.id + "']= new function(){" + pageCode.code + " return this;};"))
					});
					var i = 0,
						pageItem;
					for(i = 0; i < pageList.length; i++) pageItem = pageList[i], void 0 !== pageItem.code && null !== pageItem.code && "" !== pageItem.code ? eval("_dataObj.pageCodeList['" + pageItem.id + "']= new function(){" + pageItem.code + " return this;};") : (pageCode = getCodeByCodeList(pageItem.id), null !== pageCode && eval("_dataObj.pageCodeList['" + pageCode.id + "']= new function(){" + pageCode.code + " return this;};"));
					if(_dataObj.dialogList)
						for(pageList = _dataObj.dialogList, i = 0; i < pageList.length; i++) pageItem = pageList[i], void 0 !== pageItem.code && null !== pageItem.code && "" !== pageItem.code ? eval("_dataObj.pageCodeList['" + pageItem.id + "']= new function(){" + pageItem.code + " return this;};") : (pageCode = getCodeByCodeList(pageItem.id), null !== pageCode && eval("_dataObj.pageCodeList['" + pageCode.id + "']= new function(){" + pageCode.code + " return this;};"));
					showloadingpageCode()
				}
			}

			function getCodeByCodeList(a) {
				if(void 0 === _dataObj.codeList) return null;
				var b = _dataObj.codeList,
					c = null;
				return $.each(b, function(b, d) {
					return d.id === a ? (c = d, !1) : void 0
				}), c
			}

			function getPageCodes(a) {
				var b = {
						code: "",
						plugin: ""
					},
					c = ["loadingpage", "floorpage", "sharepage"];
				if($.each(c, function(a, c) {
						void 0 !== _dataObj[c] && (b = _dataObj[c])
					}), null !== b) {
					var d = !1,
						e = 0;
					for(e = 0; e < _dataObj.pageList.length; e++) a == _dataObj.pageList[e].id && (b = _dataObj.pageList[e], d = !0);
					if(!d && _dataObj.dialogList)
						for(e = 0; e < _dataObj.dialogList.length; e++) a == _dataObj.dialogList[e].id && (b = _dataObj.dialogList[e])
				}
				return b
			}

			function loadExternalJsLibs(a) {
				if(_isSetting) return void a();
				if(void 0 === _dataObj.codeJsLibs) return createPageCodes(), void a();
				var b = _dataObj.codeJsLibs;
				return 1 === b.length && "" === $.trim(b[0]) ? (createPageCodes(), void a()) : void Cool.util.loadJs(b, function() {
					createPageCodes(), a()
				})
			}

			function pageCodeInit(a, b) {
				if(wsiteInfo.wxp.isp && void 0 !== _dataObj.pageCodeList) {
					var c = _dataObj.pageCodeList[a];
					void 0 !== c && null !== c && void 0 !== c.init && null !== c.init && c.init(b)
				}
			}

			function pageCodeLoad(a, b) {
				if(wsiteInfo.wxp.isp && void 0 !== _dataObj.pageCodeList) {
					var c = _dataObj.pageCodeList[a];
					void 0 !== c && null !== c && void 0 !== c.load && null !== c.load && c.load(b)
				}
			}

			function pageEventInit(a) {
				var b = _dataObj.pageEventList[a];
				(void 0 === b || null === b) && (_dataObj.pageEventList[a] = [], b = _dataObj.pageEventList[a]);
				var c = getPageObjById(a);
				if(null !== c) {
					if(!c.hasOwnProperty("elementList")) return;
					for(var d = 0; d < c.elementList.length; d++) {
						var e = c.elementList[d];
						if(void 0 !== e.animationList) {
							for(var f, g = 0; g < e.animationList.length; g++) f = e.animationList[g], (1 === parseInt(f.trigger) && "" !== f.eventName || 2 === parseInt(f.trigger)) && b.push({
								name: f.eventName,
								type: "animation",
								elementId: e.id,
								animation: f
							});
							"img" === e.type && e.content.showAnimation && b.push({
								name: e.content.eventName,
								type: "imageAnimation",
								elementId: e.id,
								animation: e.content
							}), "audio" === e.type && b.push({
								name: e.content.eventName,
								type: "audioEvent",
								elementId: e.id,
								animation: e.content
							}), "video" === e.type && b.push({
								name: e.content.eventName,
								type: "videoEvent",
								elementId: e.id,
								animation: e.content
							})
						}
					}
				}
			}

			function triggerPageEvent(a, b, c) {
				var d = _dataObj.pageEventList[a];
				if(void 0 !== _dataObj.pageEventList.floorpage && (d = d.concat(_dataObj.pageEventList.floorpage)), void 0 !== d && null !== d) {
					for(var e, f = {}, g = 0; g < d.length; g++) e = d[g], e.name == b && ("animation" == e.type ? f[e.elementId] ? f[e.elementId].push(e.animation) : f[e.elementId] = [e.animation] : "imageAnimation" == e.type ? (clearRegIntervals(a, e.elementId), regImgElementEvent(a, e.elementId, e.animation, e.name)) : "audioEvent" === e.type ? regAudioEvent(a, e.elementId, e.animation, e.name) : "videoEvent" === e.type ? regVideoEvent(a, e.elementId, e.animation, e.name) : "customEvent" == e.type && void 0 !== e.callback && e.callback(c));
					for(var h in f)
						for(var i, j = 0, k = 0, l = f[h], m = 0; m < l.length; m++) i = l[m], (1 === parseInt(i.trigger) && "" !== i.eventName || 2 === parseInt(i.trigger)) && (i.duration + i.delay > k && (k = i.duration + i.delay), j > 0 && 0 !== i.delay ? playSecondAnimation(_$canvas, {
							id: h
						}, i, a) : playAnimation(_$canvas, h, i, !1, a), j++)
				}
			}

			function createCopyRightPage() {
				try {
					if(("we+" === _copyrightFrom || "rrxiu" === _copyrightFrom) && 0 === _dataObj.result && !isOldWsite()) {
						var a = appConfig.copyrightPage,
							b = getCopyrightPageValue("image");
						null !== b && (a.backgroundImage = handleImgUrl(getCopyrightPageValue("image")));

						var c = a.elementList[0].content.html,
							d = _dataObj.shareImageUrl || defaultShareImageUrl;
						a.elementList[0].content.html = c.replace("{{shareTitle}}", _dataObj.title).replace("{{shareImageUrl}}", d).replace("{{showVisitCount}}", _dataObj.showVisitCount ? "block" : "none"), _dataObj.pageList.push(a), hasCopyRightPage = !0
					}
				} catch(e) {}
			}

			function getIsFlipDown() {
				return "down" === flipWay ? !0 : !1
			}

			function createCopyRightPage2() {
				try {
					if(getCanShowCopyrightPageEnd() && 0 === _dataObj.result && !isOldWsite()) {
						getIsFlipDown() || ($pageCopyrightPageEnd.removeClass("damu-down").addClass("damu-right"), $pageCopyrightPageEnd.css({
							top: 0,
							left: "100%"
						}));
						var a = '  <div class="rrx-icon-close-layer"> </div> <div class="share-image"> <img src="{{shareImageUrl}}"> </div> <div class="share-title">{{shareTitle}}</div> <div class="view-more"> <a class="view-more-button" href="' + appConfig.copyright.url + '" target="_blank">查看更多 >></a> </div> <a href="javascript:void(0)" class="show-rrxiu-report">举报</a> <div class="bottomm-text" style="{{bgBottomColor}}"> <a class="make-rrxiu" href="{{makeRRXUrl}}" target="blank"> <span>{{makeRRXText}}</span> </a> </div> <a href="javascript:void(0)" class="show-rrxiu-visit" style="color:#fff;display:{{showVisitCount}}">阅读:{{visitCount}}</a>',
							b = _dataObj.shareImageUrl || defaultShareImageUrl;
						a = a.replace("{{shareTitle}}", _dataObj.title).replace("{{shareImageUrl}}", b).replace("{{showVisitCount}}", _dataObj.showVisitCount ? "block" : "none").replace("{{makeRRXUrl}}", appConfig.copyright.url).replace("{{makeRRXText}}", appConfig.copyright.content), $pageCopyrightPageEnd.html(a), _dataObj.showVisitCount && setTimeout(function() {
							var a = _log.getVisitCount(),
								b = $pageCopyrightPageEnd.find(".show-rrxiu-visit");
							!getIsFromTpl() && b.length > 0 && a > 0 ? (b.css("display", "block"), b.html(b.html().replace("{{visitCount}}", a))) : b.css("display", "none")
						}, 1500), registerReportEvent($pageCopyrightPageEnd.find(".show-rrxiu-report")), hasCopyRightPage = !0, $pageCopyrightPageEnd.find(".rrx-icon-close-layer").unbind().bind(clickEventType, function(a) {
							a.stopPropagation(), a.preventDefault(), copyrightPageEndHide()
						}), getIsFlipDown() ? (touch.on($pageCopyrightPageEnd, "swipedown", function(a) {
							copyrightPageEndHide()
						}), touch.on($pageCopyrightPageEnd, "swipeup", function(a) {
							"stop" !== lastPageGoto && (console.log("netx"), pageListCount > 1 ? (copyrightPageEndHideNoAnim(), isCopyrightPageEndGotoFirst = !0, goToNextPage()) : (copyrightPageEndHideNoAnim(), isCopyrightPageEndGotoFirst = !1))
						})) : (touch.on($pageCopyrightPageEnd, "swiperight", function(a) {
							copyrightPageEndHide()
						}), touch.on($pageCopyrightPageEnd, "swiperleft", function(a) {
							"stop" !== lastPageGoto && (console.log("netx"), pageListCount > 1 ? (copyrightPageEndHideNoAnim(), isCopyrightPageEndGotoFirst = !0, goToNextPage()) : (copyrightPageEndHideNoAnim(), isCopyrightPageEndGotoFirst = !1))
						}))
					}
				} catch(c) {}
			}

			function getCanShowCopyrightPageEnd() {
				return "we+" === _copyrightFrom || "rrxiu" === _copyrightFrom
			}

			function copyrightPageEndShow() {
				getCanShowCopyrightPageEnd() && (hideDanmuInfo(), apiHelper.getAppInstance().stopFlip(), playShowCopyrightPageAnim(), setBlurBgPage(), isCopyrightPageEndShow = !0)
			}

			function copyrightPageEndHide() {
				getCanShowCopyrightPageEnd() && (resetDanmuInfo(), apiHelper.getAppInstance().resetFlip(!0), playHideCopyrightPageAnim(), removeAllBlurPage(), isCopyrightPageEndShow = !1)
			}

			function copyrightPageEndHideNoAnim() {
				resetDanmuInfo(), apiHelper.getAppInstance().resetFlip(!0);
				$pageCopyrightPageEnd.css("display", "none"), getIsFlipDown() ? ($pageCopyrightPageEnd.removeClass("damu-up"), $pageCopyrightPageEnd.addClass("damu-down")) : ($pageCopyrightPageEnd.removeClass("damu-left"), $pageCopyrightPageEnd.addClass("damu-right")), removeAllBlurPage(), isCopyrightPageEndShow = !1
			}

			function getCopyrightPageValue(a, b) {
				return void 0 !== _dataObj.copyrightPage ? (b = b || "", null !== _dataObj.copyrightPage && void 0 !== _dataObj.copyrightPage[a] ? b + _dataObj.copyrightPage[a] : null) : null
			}

			function getViewHost() {
				if(appConfig.dev) return appConfig.viewHost;
				if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return appConfig.viewHost.replace("http://", "https://");
				var a = appConfig.viewHost,
					b = Cool.util.isSpecDomain(a);
				if(b) {
					var c = Cool.util.getUrlSubDomain(a);
					c && -1 === a.indexOf("://ns") && (a = a.replace("://" + c, "://ns" + c), a = a.replace("https://", "http://"))
				}
				return a
			}

			function setMusicIcon(a, b) {
				if("" !== a) {
					if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) a = a.replace("http://", "https://");
					else {
						var c = Cool.util.isSpecDomain(a);
						if(c) {
							var d = Cool.util.getUrlSubDomain(a);
							d && -1 === a.indexOf("://ns") && (a = a.replace("://" + d, "://ns" + d), a = a.replace("https://", "http://"))
						}
					}
					$iconMusic.css("background-image", "url(" + a + ")")
				} else {
					b = b || "on";
					var e = "2";
					$iconMusic.css("background-image", "url(" + getViewHost() + "images/icon_music_" + b + e + ".png)")
				}
			}

			function setMusicPosition() {
				wsiteInfo.wxp.isp || (musicPosition = "rt"), "rb" === musicPosition ? ($iconMusic.css("right", "23px"), $iconMusic.css("bottom", "3%")) : "lt" === musicPosition ? isShowFocusWechat() ? ($iconMusic.css("right", "23px"), $iconMusic.css("top", "3%")) : ($iconMusic.css("left", "23px"), $iconMusic.css("top", "3%")) : "lb" === musicPosition ? ($iconMusic.css("left", "23px"), $iconMusic.css("bottom", "3%")) : ($iconMusic.css("right", "23px"), $iconMusic.css("top", "3%"))
			}

			function playMusic() {
				null !== $music ? $music.play() : "" !== musicUrl && ($iconMusic.show(), $music = document.createElement("audio"), $music.setAttribute("src", musicUrl), $music.setAttribute("loop", "loop"), $music.setAttribute("preload", "true"), $music.setAttribute("autoplay", "autoplay"), _$canvas.append($music), $music.play(), $iconMusic.unbind().bind(clickEventType, function(a) {
					a.stopPropagation(), a.preventDefault(), reloveTwoClickByISroll() && ($music.paused ? playMusic() : stopMusic())
				})), null !== $music && ($music.paused ? ($music.play(), setMusicIcon(musicStopIcon, "off"), $iconMusic.removeClass("music-play"), $iconMusic.removeClass("music-play-none")) : (setMusicIcon(musicPlayIcon, "on"), $iconMusic.removeClass("music-play"), $iconMusic.removeClass("music-play-none"), $iconMusic.addClass("" === musicPlayIcon ? "music-play" : "music-play-none")), $music.paused && (Cool.util.checkIsWeixin() === !0 && "undefined" != typeof WeixinJSBridge && WeixinJSBridge.invoke("getNetworkType", {}, function(a) {
					$music.paused && playMusic()
				}), $(document).unbind().bind(clickEventType, function() {
					$(document).unbind(), $music.paused && playMusic()
				})))
			}

			function stopMusic() {
				null !== $music && ($music.paused || $music.pause(), setMusicIcon(musicStopIcon, "off"), $iconMusic.removeClass("music-play"), $iconMusic.removeClass("music-play-none"))
			}

			function hideMusicIcon() {
				$iconMusic.hide()
			}

			function showMusicIcon() {
				null !== $music && $iconMusic.show()
			}

			function getLoadingImageList(a) {
				if(_isSetting) return [];
				var b = [],
					c = 0;
				if(_preloadAllResource) {
					var d = _dataObj.pageList;
					for(c = 0; c < d.length; c++) b = getImageListByPage(d[c]), d[c] != a && loadImgList(b, 1)
				} else {
					var e = getPageObjById(a);
					b = getImageListByPage(e)
				}
				return b
			}

			function updateLoadingPercent(a) {
				$loadingpage.find(".line").css("width", a + "%"), $loadingpage.find(".percent").html(a + "%")
			}

			function filterUserImage(a) {
				return a.indexOf(".gif") > -1 || a.indexOf(".GIF") > -1 || a.indexOf("@!user_image_") > -1 || a.indexOf("data:image") > -1 ? !1 : !0
			}

			function getImageListByPage(a) {
				var b = [];
				if(null !== a) {
					for(var c = [], d = 0, e = "", f = 0; f < a.elementList.length; f++) {
						var g = a.elementList[f].content,
							h = a.elementList[f].type;
						if("img" === h) {
							var i = g.width || 0;
							if(e = handleImgUrl(g.src), filterUserImage(e) && (e += Cool.util.getImageThumb(i, "", e), g.src = e), b.push(e), g.showImageBorder && ("" !== g.border && b.push(handleImgUrl(g.border)), "" !== g.mask && b.push(handleImgUrl(g.mask))), g.showAnimation && (c = g.imageList, void 0 !== c))
								for(var j = 0; j < c.length; j++) e = handleImgUrl(c[j].src), filterUserImage(e) && (e += Cool.util.getImageThumb(i, "", e), c[j].src = e), b.push(e)
						} else if("imggroup" === h) {
							c = g;
							for(var k = 0; k < c.length; k++) d = a.elementList[f].width, e = handleImgUrl(c[k].src), filterUserImage(e) && !a.elementList[f].NoImageThumb && (e += Cool.util.getImageThumb(d, h, e), c[k].src = e), b.push(e);
							Cool.util.loadJs(appConfig.libHost + "flux.js?v=" + appConfig.version)
						} else if("plugin" === h) {
							if("卡片" === g.name && g.imageList) {
								c = g.imageList;
								for(var l = 0; l < c.length; l++) "" !== c[l].src && (d = a.elementList[f].width, e = handleImgUrl(c[l].src), filterUserImage(e) && (e += Cool.util.getImageThumb(d, "", e), c[l].src = e), b.push(e))
							}
						} else "svgShape" === h && b.push(getSvgFullUrl(g.src))
					}
					"" !== a.backgroundImage && void 0 !== a.backgroundImage && (e = handleImgUrl(a.backgroundImage), filterUserImage(e) && (e += Cool.util.getImageThumb(a.backgroundImageNaturalWidth, "", e), a.backgroundImage = e), b.push(e))
				}
				return b
			}

			function getLoadingBorderPluginList() {
				var a = _dataObj.pageList;
				_dataObj.dialogList && (a = a.concat(_dataObj.dialogList));
				for(var b, c = [], d = [], e = !1, f = 0; f < a.length; f++) {
					var g = a[f].elementList;
					if(void 0 !== g && "" !== g && null !== g)
						for(var h = 0; h < g.length; h++) "plugin" === g[h].type ? (b = Cool.util.getPluginDomain(g[h].content.token, g[h].content.version) + "index.js", -1 === d.indexOf(b) && c.push({
							element: g[h],
							token: g[h].content.token,
							version: g[h].content.version,
							url: b
						}), e = !0) : "map" === g[h].type && g[h].content.embed && (e = !0)
				}
				return e && initQQMap(), {
					pluginList: c
				}
			}

			function loading(a, b, c) {
				var d = getLoadingBorderPluginList(),
					e = d.pluginList,
					f = fnLoadPluginImages(e);
				a = a.concat(f);
				var g = 500;
				void 0 !== _dataObj.loadingpage && void 0 !== _dataObj.loadingpage.delay && (g = 1e3 * _dataObj.loadingpage.delay);
				var h = a.length + e.length,
					i = 0;
				if(0 === h) {
					var j = setInterval(function() {
							_allowFlip === !0 && (clearInterval(j), setTimeout(function() {
								$loadingpage.addClass("pt-page-fadeOut animated"), setTimeout(function() {
									$loadingpage.hide()
								}, 500), c()
							}, g))
						}, 10),
						k = g + 500 + 10;
					updatePerForNoImg(k, b)
				} else {
					for(var l = !1, m = function() {
							percent = parseInt(i / h * 100, 10), percent > 100 && (percent = 100), b(percent);
							var a = e.length > 0 ? 100 : 96;
							if(percent >= a && l === !1) {
								l = !0;
								var d = setInterval(function() {
									_allowFlip === !0 && (clearInterval(d), setTimeout(function() {
										$loadingpage.hasClass("pt-page-fadeOut") === !1 && ($loadingpage.addClass("pt-page-fadeOut animated"), setTimeout(function() {
											$loadingpage.hide()
										}, 500), c())
									}, g))
								}, 10)
							}
						}, n = function() {
							i++, m()
						}, o = function(a) {
							loadSvg(a).then(function(b, c, d) {
								4 == d.readyState && 200 == d.status && (isLoadedSvg(a) || pushLoadedSvgKey(a), saveLoadedSvgXml(a, d.responseText)), n()
							}, function(a) {
								console.error(a), n()
							})
						}, p = 0; p < a.length; p++)
						if(src = a[p], src.indexOf(".svg") > -1) o(src);
						else {
							var q = new Image;
							q.src = src, q.onload = n, q.onerror = n
						}
					var r = [],
						s = function(a) {
							if(a && "0" != a.length) {
								rrxdebug && console.log("预加载插件js");
								var b = a.shift();
								r.indexOf(b.url) > -1 ? (i++, m(), s(a)) : (r.push(b.url), Cool.util.loadJs(b.url, function() {
									$wePluginClient.add(b.token, b.version, window.wePluginInit, window.wePluginLoad, window.wePluginPreLoad, window.wePluginLeave), $wePluginClient.preload(b.element), i++, m(), s(a)
								}))
							}
						};
					s(e)
				}
			}

			function fnLoadPluginImages(a) {
				for(var b = [], c = ["pagesInSingle", "beadd8004b2c0e3a1173eb1efbff9225", "aeaae5aad118de699c9e91d5cd278365", "c9acc5c5f157ce2010f380bba5eb70d7"], d = 0; d < a.length; d++) {
					var e = a[d];
					if(c.indexOf(e.token) > -1 && e.element.content && e.element.content.dialogList)
						for(var f = 0; f < e.element.content.dialogList.length; f++) {
							var g = e.element.content.dialogList[f];
							b = b.concat(getImageListByPage(g))
						}
				}
				return b
			}

			function updatePerForNoImg(a, b) {
				var c = 100 / a,
					d = 1,
					e = setInterval(function() {
						b(d), d >= 100 && (d = 100, clearInterval(e)), d++
					}, c)
			}

			function flipLoadImage(a) {
				var b = _$canvas.find(".page_" + a);
				if(b.data("isrender") !== !0) {
					var c = 0,
						d = [],
						e = _dataObj.pageList;
					if(void 0 !== e) {
						var f;
						for(c = 0; c < e.length; c++)
							if(f = e[c], f.id == a) {
								c > 0 && d.push(e[c - 1].id), c < e.length - 1 && d.push(e[c + 1].id);
								break
							}
						for(c = 0; c < d.length; c++)
							if(b = _$canvas.find(".page_" + d[c]), b.data("isrender") !== !0) {
								f = getPageObjById(d[c]);
								var g = getImageListByPage(f);
								d[c] == a ? loadImgList(g, 0) : loadImgList(g, 1)
							}
					}
				}
			}

			function loadImgList(a, b) {
				var c = 0,
					d = "";
				if(0 === b)
					for(c = 0; c < a.length; c++) {
						d = a[c];
						var e = new Image;
						e.src = d
					} else setTimeout(function() {
						for(c = 0; c < a.length; c++) {
							d = a[c];
							var b = new Image;
							b.src = d
						}
					}, 500)
			}

			function showLoadingpage() {
				void 0 !== _dataObj.llImageUrl && "" !== _dataObj.llImageUrl || _dataObj.showCustomLoadingLogo || void 0 !== _dataObj.loadingpage && void 0 !== _dataObj.loadingpage.title && ($loadingpage.html(""), renderPage("loadingpage"), playPageByPageId("loadingpage"))
			}

			function showloadingpageCode() {
				void 0 !== _dataObj.loadingpage && (pageCodeInit("loadingpage", apiHelper.getAppInstance()), pageCodeLoad("loadingpage", apiHelper.getAppInstance()))
			}

			function showFloorpage() {
				void 0 !== _dataObj.floorpage && (renderPage("floorpage"), playPageByPageId("floorpage"))
			}

			function showToppage() {
				void 0 !== _dataObj.toppage && void 0 !== _dataObj.toppage.elementList && _dataObj.toppage.elementList.length > 0 && (renderPage("toppage"), playPageByPageId("toppage"))
			}

			function showSharepage() {
				void 0 !== _dataObj.sharepage ? (renderPage("sharepage"), playPageByPageId("sharepage")) : renderDefautShareInfo(), $sharepage.show()
			}

			function checkDefautShareInfoSetting() {
				(void 0 === appConfig.shareInfo || null === appConfig.shareInfo) && (appConfig.shareInfo = {
					color: "#fff",
					bgColor: "rgba(0, 0, 0, 0.7)",
					content: '<div style="position:absolute;top:3px;right:10px;font-size:24px;">&uarr;&uarr;&uarr;</div><div style="position:absolute;top:40px;right:10px;font-size:24px;">点我分享</div>'
				})
			}

			function renderDefautShareInfo() {
				checkDefautShareInfoSetting(), $sharepage.css("background-color", appConfig.shareInfo.bgColor), $sharepage.css("color", appConfig.shareInfo.color);
				var a = $sharepage.html();
				$sharepage.html(a + appConfig.shareInfo.content)
			}

			function hideSharepage() {
				$sharepage.hide()
			}

			function showReportpage() {
				if(_reportInit === !1) {
					var a = '<div class="pt-report"><div class="report-content"><div class="report-title">请选择投诉该网页的原因:</div><div class="report-reason"><div class="reason-item" data-value="欺诈">网页包含欺诈信息（如：假红包）</div><div class="reason-item" data-value="色情低俗">网页包含色情信息</div><div class="reason-item" data-value="暴力恐怖">网页包含暴力恐怖信息</div><div class="reason-item" data-value="政治敏感">网页包含政治敏感信息</div><div class="reason-item" data-value="个人隐私">网页在收集个人隐私信息（如：钓鱼链接）</div><div class="reason-item" data-value="诱导分享">网页包含诱导分享性质的内容</div><div class="reason-item" data-value="谣言">网页可能包含谣言信息</div><div class="reason-item" data-value="虚假活动">网页包含虚假活动</div><div class="reason-item" data-value="刷票">网页有刷票行为</div></div><div class="report-close"><a href="javascript:void(0)">关闭</a></div></div><div class="report-msg"><div class="rt-msg-icon"></div><div class="rt-msg-text"><span>投诉已提交</span></div><div class="rt-msg-close"><a href="javascript:void(0);">关闭</a></div></div></div>\n';
					$reportpage.html(a), $reportpage.css("display", "block"), $reportpage.css("position", "absolute"), $reportpage.css("z-index", "10000"), $reportpage.css("width", "100%"), $reportpage.css("height", "100%"), _reportInit = !0;
					var b = $reportpage.find(".reason-item"),
						c = $reportpage.find(".report-close"),
						d = $reportpage.find(".report-msg .rt-msg-close a"),
						e = !1;
					b.on(clickEventType, function(a) {
						if(a.stopPropagation(), a.preventDefault(), !e) {
							e = !0;
							var b = $(a.currentTarget).data("value");
							if("" !== b) {
								var c = _host + "WsiteReport/Add";
								$.ajax({
									type: "get",
									url: c,
									data: {
										guid: _dataObj.guid,
										reason: b
									},
									datatype: "script",
									complete: function(a) {}
								}), setTimeout(function() {
									$reportpage.find(".report-content").hide(), $reportpage.find(".report-msg").show(), e = !1
								}, 500)
							}
						}
					}), c.on(clickEventType, function(a) {
						a.stopPropagation(), a.preventDefault(), $reportpage.css("display", "none")
					}), d.on(clickEventType, function(a) {
						"undefined" != typeof WeixinJSBridge ? WeixinJSBridge.call("closeWindow") : (window.close(), setTimeout(function() {
							$reportpage.css("display", "none")
						}, 1e3))
					})
				} else $reportpage.css("display", "block"), $reportpage.find(".report-content").show(), $reportpage.find(".report-msg").hide()
			}

			function suspended(a) {
				void 0 === a && (a = "暂停访问"), html = '<div class="pt-reportpage page_reportpage" style="display:none"></div><div class="pt-wrapper"><div class="pt-suspended"><div class="msg">' + a + "</div></div><div class=\"copyright\"><a href='http://www.rrxiu.net' target='_blank'><div>使用 <span>人人秀</span> 制作</div></a></div></div>", _$canvas.find(".pt-inner").append(html), _copyrightFrom = "rrxiu", $copyright = _$canvas.find(".copyright"), $reportpage = _$canvas.find(".pt-reportpage"), renderCopyright(), showCopyright(!0)
			}

			function needCode(a) {
				void 0 === a && (a = "需要授权"), html = '<div class="pt-wrapper" id="pt-wrapper-needcode"><div class="pt-code"><div class="code-title">' + _dataObj.title + '</div><div class="msg">' + a + "</div><div><table><tr><td><input type='text' name='code' class='code-value' placeholder='输入授权码' /></td></tr><tr><td><input class='code-submit' type='button' value='提交'/></td></tr></table></div><div class=\"copyright\"><a href='http://www.rrxiu.net' target='_blank'><div>使用 <span>人人秀</span> 制作</div></a></div></div>", _$canvas.find(".pt-inner").append(html), $code = _$canvas.find(".code-value"), $btn = _$canvas.find(".code-submit"), $btn.bind(clickEventType, function() {
					var a = $code.val();
					if("" !== a) {
						var b = _host + "view/data";
						$.ajax({
							type: "post",
							url: b,
							data: {
								id: _dataObj.guid,
								code: a,
								preview: _isPreview === !0 ? 1 : 0
							},
							datatype: "script",
							complete: function() {
								$("#pt-wrapper-needcode").remove();
								var a = Cool.util.getUrlParameterByName("from_code"),
									b = Cool.util.getUrlParameterByName("qrc_code");
								_log = new WePlusLog(_host, _dataObj.guid, a, b, _isPreview), base.init(_host, _$canvas, coolData, _isPc, _isWeixin, _log, _isEditing, _isPreview)
							}
						})
					}
				})
			}

			function getCanvasRealHeight() {
				return parseFloat(_$canvas.height() / _$canvas.width()) * canvasDefaultWidth
			}

			function initBone() {
				// html = '<div class="pt-reportpage page_reportpage" style="display:none"></div><div class="pt-sharepage page_sharepage"></div><div class="share-poster-result-dialog" style="-webkit-user-select:none"></div><div class="share-poster-process-dialog" style="-webkit-user-select:none"></div><img class="focus-wechat-button"><img class="top-menu-button"><div class="focus-wechat-panel damu-down"></div><div class="focus-plugin-wxqr-panel"></div><div class="top-menu-panel damu-down"></div><div class="share-panel damu-down"></div><div class="page_copyrightPage damu-down"></div><div class="danmu-button rrx-icon-sidle-danmu"></div><div class="danmu-panel damu-down"></div><div class="copyright"></div><div class="plugin-copyright"></div><div class="danmu-show"></div><div class="pt-preview-notice">预览模式，仅供测试</div><div class="pt-wrapper"><div class="pt-pagewrapper"><div class="pt-floorpage page_floorpage"></div><div class="pt-pagelist"></div><div class="pt-progress"><span class="progress-tip"></span><span class="page-tip"></span></div></div><div class="arrow-down"><p></p></div><div class="arrow-right"><p></p></div><div class="music"><span class="music1"><s></s></span><span class="music2"><s></s></span><span class="music3"><s></s></span></div><div class="sidle-share rrx-icon-share"></div><div class="sidle-report rrx-icon-report"></div></div>', _$canvas.find(".pt-inner").append(html), $ptWrapper = _$canvas.find(".pt-wrapper"), $previewNotice = _$canvas.find(".pt-preview-notice"), $copyright = _$canvas.find(".copyright"), $pluginCopyright = _$canvas.find(".plugin-copyright"), $pagewrapper = _$canvas.find(".pt-pagewrapper"), $pagelist = _$canvas.find(".pt-pagelist"), $progress = _$canvas.find(".pt-progress"), $floorpage = _$canvas.find(".pt-floorpage"), $loadingpage = _$canvas.find(".pt-loadingpage"), $sharepage = _$canvas.find(".pt-sharepage"), $reportpage = _$canvas.find(".pt-reportpage"), $sharepage.bind(clickEventType, function() {
					// $(this).hide()
				// }), $iconArrowDown = _$canvas.find(".arrow-down"), $iconArrowRight = _$canvas.find(".arrow-right"), $iconMusic = _$canvas.find(".music"), $focusButton = _$canvas.find(".focus-wechat-button"), $topMenuButton = _$canvas.find(".top-menu-button"), $focusPanel = _$canvas.find(".focus-wechat-panel"), $topMenuPanel = _$canvas.find(".top-menu-panel"), $sharePanel = _$canvas.find(".share-panel"), $sharePosterDialog = _$canvas.find(".share-poster-result-dialog"), $pageCopyrightPageEnd = _$canvas.find(".page_copyrightPage"), $danmuButton = _$canvas.find(".danmu-button"), $danmuPanel = _$canvas.find(".danmu-panel"), $danmuShow = _$canvas.find(".danmu-show"), $focusWxQrPanel = _$canvas.find(".focus-plugin-wxqr-panel")
			}

			function initSwipe() {
				var a = !1;
				setScrollFn(), $pagewrapper.on("mousedown touchstart", function(b) {
					rrxdebug && console.log("$pagewrapper touchstart"), a = !0, (_allowFlip && !getPageStopflip(currentPageId) && pageEffectComplete(currentPageId) || "copyrightPage" === currentPageId) && scrollStart(b)
				}), $pagewrapper.on("mousemove touchmove", function(b) {
					rrxdebug && console.log("$pagewrapper touchmove"), a && (_allowFlip && !getPageStopflip(currentPageId) && pageEffectComplete(currentPageId) || "copyrightPage" == currentPageId ? (scrollMove(b), rrxdebug && console.info("can flip")) : rrxdebug && console.info("cannot flip pid", currentPageId, _allowFlip)), rrxdebug && console.log("touchmove")
				}), $pagewrapper.on("mouseup touchend mouseleave", function(b) {
					rrxdebug && console.log("$pagewrapper touchend", b), a = !1, (_allowFlip && !getPageStopflip(currentPageId) && pageEffectComplete(currentPageId) || "copyrightPage" === currentPageId) && scrollEnd(b)
				}), $("img").on("dragstart", function(a) {
					a.preventDefault()
				})
			}

			function pageEffectComplete(a) {
				var b = $($.find(".pt-inner .page_" + a));
				if(!b) return !0;
				var c = b.find('div[data-role="pt-page-effect"]');
				return c && 0 !== c.length && "no" === c.attr("data-complete") ? !1 : !0
			}

			function commpletedPageEffect(a) {
				var b = $($.find(".pt-inner .page_" + a));
				if(b) {
					var c = b.find('div[data-role="pt-page-effect"]');
					c && c.attr("data-complete", "yes")
				}
			}

			function getCoord(a) {
				if(!a) return !1;
				left = $pagewrapper.offset().left, top = $pagewrapper.offset().top;
				var b, c;
				return("mousedown" == a.type || "mousemove" == a.type) && (b = a.pageX - left, c = a.pageY - top), ("touchstart" == a.type || "touchmove" == a.type) && (b = a.touches ? a.touches[0].pageX : a.originalEvent.touches[0].pageX, c = a.touches ? a.touches[0].pageY : a.originalEvent.touches[0].pageY), {
					x: b / _pt_inner_scale_value,
					y: c / _pt_inner_scale_value
				}
			}

			function scrollStart(a) {
				if(isSliding = !0, _isDisableFlipPage) rrxdebug && console.log("_isDisableFlipPage true");
				else {
					scrolling || (_$activePage = null), rrxdebug && console.log("isStart = true"), isStart = !0, isNext = !1, isFirstTime = !0, moveDistanceX = 0, moveDistanceY = 0;
					var b = getCoord(a);
					b && (startX = b.x, startY = b.y), _$currentPage = _$canvas.find(".page_" + currentPageId).first(), cssAnimation(_$currentPage[0].style, "Transition", "none")
				}
			}

			function scrollMove(a) {
				if(enableScroll()) {
					rrxdebug && console.log("scrollMove");
					var b = getCoord(a);
					b && (moveDistanceX = b.x - startX, moveDistanceY = b.y - startY), setScrollFn(), rrxdebug && console.log("绑定移动方法"), doScrollMoveFn()
				} else rrxdebug && console.log("not scrollMove")
			}

			function scrollEnd(a) {
				isSliding = !1, scrolling = !1, rrxdebug && console.log("isStart", isStart), isStart && (isStart = !1, rrxdebug && console.log("_$activePage", _$activePage), _$activePage && (_isDisableFlipPage = !0, setScrollEndAnim(), setScrollFn(), doScrollEndFn())), _canContinue = !0
			}

			function flipend() {
				$pluginCopyright.hide(), _pageScrollEnd = !1;
				var a = currentPageId;
				currentPageId = _$activePage.data("id"), $page = _$activePage, rrxdebug && console.log("flipend", currentPageId), rrxdebug && console.log("regPageEndEvent", currentPageId);
				var b = _$activePage.data("id");
				b == lastPageId ? b === _copyrightId && (hideDanmuInfo(), _pageScrollEnd = !0) : a === _copyrightId && resetDanmuInfo(), setPageArrowIcon(currentPageId), triggerPluginLeaveEvent(a), rrxdebug && console.info("flipend-showCopyright ", currentPageId, lastPageId, _copyrightId), currentPageId == lastPageId && "rrxiu" !== _copyrightFrom ? (rrxdebug && console.log("flipend-showCopyright ", currentPageId, lastPageId), showCopyright(!0, currentPageId), getCanShowCopyrightPageEnd() ? showArrow() : hideArrow()) : (showCopyright(!1, currentPageId), showArrow()), setTimeout(function() {
					regPageEndEvent(currentPageId), cssAnimation(_$currentPage[0].style, "Transition", "none"), deactive(_$activePage).addClass("pt-page-current"), deactive(_$currentPage).removeClass("pt-page-current"), _$currentPage = _$activePage, _isDisableFlipPage = !1, _$currentPage.css("z-index", "1"), $(".pt-page").attr("style", ""), rrxdebug && console.log("end"), updateUserReadDepth(), "loadingpage" !== currentPageId && pageCodeLoad(currentPageId, apiHelper.getAppInstance()), _isEditing || loadPluginEvent(currentPageId), resetLongPage(), _flipProgress === !0 && renderProgress(currentPageId, totalPages), flipBlurPage(), isCopyrightPageEndGotoFirst = !1
				}, flipEndTimeout)
			}

			function setScrollFn() {
				rrxdebug && console.log(_dataObj.flipWay, _dataObj.flipAnimation);
				var a = _dataObj.flipWay ? _dataObj.flipWay : "down",
					b = parseInt(_dataObj.flipAnimation, 10);
				switch(b) {
					case 0:
						b = "Move";
						break;
					case 110:
						b = "Move";
						break;
					case 120:
						b = "Fade";
						break;
					case 130:
						b = "Move";
						break;
					case 140:
						b = "Move";
						break;
					case 150:
						b = "Move";
						break;
					case 170:
						b = "Scale", animTime = .8, flipEndTimeout = 990;
						break;
					case 200:
						b = "Card";
						break;
					case 210:
						b = "LRMove";
						break;
					case 220:
						b = "LRMove";
						break;
					case 230:
						b = "LRMove";
						break;
					case 240:
						b = "LRRotate";
						break;
					case 250:
						b = "LRSlide";
						break;
					default:
						b = "Move"
				}
				_scrollMode = b, doScrollMoveFn = scroll[a + b + "Move"], doScrollEndFn = scroll[a + b + "End"]
			}

			function getPageDomById(a) {
				return _$canvas.find(".page_" + a).first()
			}

			function enableScroll() {
				return rrxdebug && console.log("isStart _dataObj.pageList", isStart, _dataObj.pageList), getCanShowCopyrightPageEnd() ? isStart && _dataObj.pageList.length > 0 : isStart && _dataObj.pageList.length > 1
			}

			function setCssWhenMove(a, b, c, d, e) {
				if(_$activePage) {
					var f = a ? "-" : "",
						g = c - Math.abs(d);
					cssAnim(_$activePage, "transform", b + "(" + f + g + "px)")
				}
			}

			function setCssWhenEnd(a, b, c, d) {
				cssAnim(_$currentPage, "transform", "scale(1)"), cssAnim(_$activePage, "transform", a + "(0px)")
			}

			function setCssWhenEndForCopyright(a, b, c, d, e) {
				cssAnim(a, "transform", "scale(1)"), cssAnim(a, "transform", b + "(0px)")
			}

			function cssAnim(a, b, c) {
				for(var d = ["", "-webkit-", "-moz-"], e = 0; e < d.length; e++) a.css(d[e] + b, c)
			}

			function cssAnimation(a, b, d) {
				for(var e = ["", "webkit", "moz"], f = 0, g = e.length; g > f; f++) {
					0 === f && (b = b.substring(0, 1).toLowerCase() + b.substring(1, b.length));
					var h = d instanceof Array ? d[f] : d;
					c = e[f] + b, a[c] = h
				}
			}

			function cancelFlip() {
				_isDisableFlipPage = !0;
				var a;
				setScrollFn(), a = moveDistanceY > 0 ? -windowHeight : windowHeight, cssAnim(_$activePage, "transform", "translateY(" + a + "px)"), cssAnim(_$currentPage, "transform", "translateY(0) scale(1)"), setTimeout(function() {
					_$currentPage.attr("style", ""), _$activePage.attr("style", ""), "copyrightPage" === currentPageId && _$activePage.css({
						display: "block"
					}), deactive(_$activePage), _isDisableFlipPage = !1
				}, 500)
			}

			function getMoveInit(a, b, c, d) {
				var e = _$activePage;
				deactive(_$activePage), active(_$activePage);
				var f = a ? "-" : "";
				e[0].style.webkitTransition = "none", e[0].style.transition = "none", e[0].style.webkitTransform = c + "(" + f + d + "px)", e[0].style.transform = c + "(" + f + d + "px)", cssAnim(_$currentPage, "transform-origin", b)
			}

			function active(a) {
				return playPageByPageId(a.data("id")), a.addClass("z-active")
			}

			function deactive(a) {
				return a.removeClass("z-active")
			}

			function setScrollEndAnim() {
				var a = "linear";
				"LRSlide" === _scrollMode && setTransition(_$currentPage[0], animTime, a), setTransition(_$activePage[0], animTime, a)
			}

			function setTransition(a, b, c) {
				a.style.webkitTransition = "-webkit-transform " + b + "s " + c, a.style.transition = "transform " + b + "s " + c
			}

			function getActivePage(a) {
				if(scrolling) return _$activePage;
				var b;
				return "prev" === a ? (b = getActualPageId(-2), getPageDomById(b)) : "next" === a ? (b = getActualPageId(-1), getPageDomById(b)) : void 0
			}

			function goToPrePage() {
				console.log("goToPrePage");
				var a = 0;
				scrollStart(), timer_goToPrePage = setInterval(function() {
					a += 2, _scrollMode.indexOf("LR") > -1 ? moveDistanceX = a : moveDistanceY = a, scrollMove(), a >= 21 && (clearInterval(timer_goToPrePage), timer_goToPrePage = null, scrollEnd())
				}, 1)
			}

			function goToNextPage() {
				console.log("goToNextPage");
				var a = 0;
				scrollStart(), timer_goToNextPage = setInterval(function() {
					a -= 2, rrxdebug && console.log("e", a, _scrollMode, moveDistanceY), rrxdebug && console.log(_scrollMode, a), _scrollMode.indexOf("LR") > -1 ? moveDistanceX = a : moveDistanceY = a, scrollMove(), -21 >= a && (clearInterval(timer_goToNextPage), timer_goToNextPage = null, scrollEnd(), rrxdebug && console.log("clear..........."))
				}, 1)
			}

			function goToPageById(a) {
				if(console.log("go to page by id"), !_isDisableFlipPage)
					if("first" === a) goToPageById(getFirstPageId());
					else if("next" === a) goToNextPage();
				else if("pre" === a) goToPrePage();
				else {
					var b = getPageObjById(a);
					if(null === b) return;
					if(scrolling = !0, _$activePage = getPageDomById(a), _$activePage.length > 0) {
						var c = currentPageId;
						c > a ? goToPrePage() : a > c && goToNextPage()
					}
				}
			}

			function resetPageScroll(a) {
				console.log("reset");
				var b = getiScroll(a, -1);
				null !== b && b.scrollTo(0, 0)
			}

			function beforeScrollEndThenNext() {
				clearAllCustomIntervals(), stopShake(), removeAllVideo()
			}

			function beforeScrollEndThenCopyrightEndPage(a) {
				rrxdebug && console.log(a), a == lastPageId && a === _copyrightId && ($(".make-rrxiu").hide(), $(".show-rrxiu-visit").hide(), hideDanmuInfo(), showCopyrightEndPage())
			}

			function isStopNextPage() {
				if(rrxdebug && console.log("isStopNextPage", currentPageId, lastPageId), currentPageId == lastPageId) {
					if(getCanShowCopyrightPageEnd()) return !1;
					if("stop" == lastPageGoto) return !0
				}
				return !1
			}

			function isContinuePrePage() {
				return rrxdebug && console.log("isContinuePrePage", currentPageId, lastPageId), currentPageId == firstPageId ? !1 : !0
			}

			function resetLongPage() {
				touchPos = 0, touchEndCount = 0, touchToBottomCount = 0, doTransform(0, 0)
			}

			function doTransform(a, b) {
				var c = $(".iscroll_wrapper").find(".pt-page-element-list-box");
				transformEle(c, "translate3d(0," + a + "px,0)", b)
			}

			function doTransformIscrollWrapper(a, b, c) {
				transformEle(a, "translate3d(0," + b + "px,0)", c)
			}

			function transformEle(a, b, c) {
				if(a.css({
						transition: "",
						"-webkit-transition": ""
					}), c) {
					var d = "transform " + c + "ms ease-out";
					a.css({
						transition: d,
						"-webkit-transition": "-webkit-" + d
					})
				}
				a.css({
					transform: b,
					"-webkit-transform": "-webkit-" + b
				})
			}

			function rrxScrollLongPage(b, e) {
				function f() {
					rrxdebug && console.log("addTouchEvent", i), i.on("mousedown touchstart", function(a) {
						rrxdebug && console.log("long page touchstart", p, h.height, a);
						var b = a.target;
						if(c = b.tagName, d = b.getAttribute("ctype") ? b.getAttribute("ctype").charAt(0) : "", cname = b.getAttribute("class"), rrxdebug && console.log("long evt target", b, c, d, a), "SELECT" == c || "TEXTAREA" == c || "BUTTON" == c || "INPUT" == c || b.getAttribute("data") || b.getAttribute("href") || "option-label" == cname) A = !1, a.stopPropagation();
						else {
							A = !0, a.stopPropagation(), a.preventDefault(), r = !0, s = !0, u = 0;
							var e = a.originalEvent,
								f = e.touches,
								g = f ? e.changedTouches[0] : null;
							t = g ? g.clientY : a.clientY, t /= _pt_inner_scale_value, "WE" == p && (v = g ? g.clientX : a.clientX, v /= _pt_inner_scale_value), y = touchPos, b = Date.now(), rrxdebug && console.log("v m w", t, v, y)
						}
					}), i.on("mousemove touchmove", function(b) {
						if(rrxdebug && console.log("long page touchmove", p, b), b.stopPropagation(), A && b.preventDefault(), r) {
							var d = b.originalEvent;
							a = d.touches, c = a ? a[0] : null;
							var e = c ? c.clientY : b.clientY;
							if(e /= _pt_inner_scale_value, u = touchPos + e - t, "WE" == p) {
								var f = c ? c.clientX : b.clientX;
								f /= _pt_inner_scale_value, w = f - v
							}
							if(Math.abs(w) > Math.abs(u - touchPos)) return w > 0 ? goToPrePage() : goToNextPage(), s = !1, void(rrxdebug && console.log(1));
							if(u > 0 && "NS" == p && !q) return rrxdebug && console.log(2), goToPrePage(), s = !1, void(touchPos = 0);
							if(rrxdebug && console.info("g o", u, l), u > l && 0 > u) g(u), doTransformIscrollWrapper(i, u, 0), rrxdebug && console.log(3);
							else if(l > u + 20 && "NS" == p && !q) return rrxdebug && console.log(4), touchToBottomCount += 1, rrxdebug && console.log("_toBottomCount", touchToBottomCount, touchEndCount), touchToBottomCount > 1 && touchEndCount > 0 && goToNextPage(), s = !1, void(touchPos = l);
							z = Date.now(), z - x > 300 && (x = z, y = u)
						}
					}), i.on("mouseup touchend mouseleave", function(a) {
						var b = a.originalEvent,
							c = b.touches,
							d = c ? b.changedTouches[0] : null,
							e = d ? d.clientY : f.clientY;
						if(console.log(e), rrxdebug && console.log("long page touchend", touchPos, a), a.stopPropagation(), A && a.preventDefault(), !r) return void(r = !1);
						if(touchEndCount += 1, rrxdebug && console.log("_endCount", touchEndCount), r = !1, s = !1, u > l && 0 > u) {
							var f = Date.now();
							c = (u - y) / (f - x), d = Math.abs(c / .002), m = c * d / 2, u += m, u > 0 ? (d = (u - 0) / m * d, u = 0) : l > u && (d = (u - l) / m * d, u = l), doTransformIscrollWrapper(i, u, d), touchPos = u, touchEndCount = 0
						}
					})
				}

				function g(a) {}
				var h, i, j, k, l, m, n, o = windowHeight,
					p = "NS",
					q = !1,
					r = !1,
					s = 0,
					t = 0,
					u = 0,
					v = 0,
					w = 0,
					x = 0,
					y = 0,
					z = 0,
					A = !0;
				o = m, h = e, n = b, rrxdebug && console.log(h), q = e.stopFlip, j = _$canvas.find(".page_" + h.id), i = $("#iscroll_wrapper" + h.id).find(".pt-page-element-list-box"), k = -(h.height - 1e3), l = k;
				var B = parseInt(_dataObj.flipAnimation, 10);
				p = B >= 210 ? "WE" : "NS", f(), rrxdebug && console.log(k, i)
			}

			function rrxScrollLongPageIScrollF(a, b) {
				var c = !1,
					d = "",
					e = (b.stopFlip, b.height),
					f = new iScroll($("#iscroll_wrapper" + b.id).get(0), {
						bounce: !0,
						bounceLock: !1,
						scrollbars: !0,
						y: e,
						handleClick: !0,
						onBeforeScrollStart: function(a) {
							a.stopPropagation(), c = !1, d = ""
						},
						onScrollMove: function(a) {
							a.stopPropagation()
						},
						onScrollEnd: function(a) {
							console.log("scrollend"), "bottom" == d ? goToNextPage() : "top" === d && goToPrePage()
						},
						onScrollBottom: function() {
							console.log("bottom"), c = !0, d = "bottom"
						},
						onScrollTop: function() {
							console.log("top"), c = !0, d = "top"
						}
					});
				iScrollInstances.push({
					pageId: b.id,
					elemId: -1,
					instance: f
				})
			}

			function rrxScrollLongPageIScrollS(a, b) {
				function c() {
					d = !1, e = "", h = !0, i = 0, j = 0, k = 0, l = 0, m = 0, n = !1
				}
				var d = !1,
					e = "",
					f = b.stopFlip,
					g = b.height,
					h = !0,
					i = 0,
					j = 0,
					k = 0,
					l = 0,
					m = 0,
					n = !1,
					o = document.getElementById("iscroll_wrapper" + b.id),
					p = new iScroll(o, {
						hScrollbar: !1,
						vScrollbar: !1,
						bounce: !0,
						bounceLock: !1,
						scrollbars: !1,
						y: g,
						deceleration: .006,
						momentumMax: !0,
						checkDOMChanges: !0,
						onBeforeScrollStart: function(a) {
							a.stopPropagation();
							var b = Math.abs(this.y);
							k = b, d = !1, e = "", fasle = !1
						},
						onScrollStart: function(a) {},
						onScrollMove: function(a) {
							n = !0;
							var b = a.y;
							!b && a.touches.length > 0 && (b = a.touches[0].clientY), h ? (h = !1, i = b) : j = b
						},
						onScrollEnd: function(a) {
							var b = j - i,
								e = b > 0,
								g = Math.abs(this.y);
							if(e) {
								if(0 === g) {
									var h = Math.abs(k - g) < 20;
									if(l++, (h || l > 1) && (l = 0, d && n && !f)) {
										if(n = !1, c(), console.log("longpage goToPrePage1"), isStopNextPage()) return;
										goToPrePage()
									}
								}
							} else if(0 === g) {
								if(d && n && !f)
									if(n = !1, c(), console.log("longpage goToPrePage2"), currentPageId !== lastPageId || isCopyrightPageEndShow || isCopyrightPageEndGotoFirst) goToNextPage();
									else if(getCanShowCopyrightPageEnd()) return void copyrightPageEndShow()
							} else if(Math.abs(this.maxScrollY) - g <= 0) {
								var o = Math.abs(k - g) < 20;
								if(m++, (o || m > 1) && (scroll.toEnd = 0, d && n && !f))
									if(n = !1, c(), console.log("longpage goToPrePage2"), currentPageId !== lastPageId || isCopyrightPageEndShow || isCopyrightPageEndGotoFirst) goToNextPage();
									else if(getCanShowCopyrightPageEnd()) return void copyrightPageEndShow()
							}
						},
						onScrollBottom: function() {
							d = !0, e = "bottom"
						},
						onScrollTop: function() {
							d = !0, e = "top"
						}
					});
				iScrollInstances.push({
					pageId: b.id,
					elemId: -1,
					instance: p
				})
			}

			function swipeFlipEvent(a, b) {
				rrxdebug && console.log("swipeFlipEvent"), "left" === a || "up" === a ? goToNextPage() : goToPrePage()
			}

			function initShareInfo() {
				var a = function() {
					void 0 !== _dataObj.describe && (shareDesc = _dataObj.describe), void 0 !== _dataObj.title && (shareTitle = _dataObj.title, _isEditing === !1 && _isPc === !1 || (document.title = "人人秀 | 更有逼格的展示")), (void 0 === _dataObj.shareImageUrl || "" === _dataObj.shareImageUrl) && (_dataObj.shareImageUrl = defaultShareImageUrl), shareImageUrl = _dataObj.shareImageUrl
				};
			
			}

			function fnHackTitle(a) {
				a && (document.title = a);
				var b = navigator.userAgent.toLowerCase();
				if(b.indexOf("iphone") > -1) var c = $("body"),
					d = $('<iframe style="width: 0;height: 0;border: none;" src="/favicon.ico"></iframe>').on("load", function() {
						setTimeout(function() {
							d.off("load").remove()
						}, 0)
					}).appendTo(c)
			}

			function getFirstPageId() {
				var a = $pagelist.find("div.pt-page:not(.ifpage)").first(),
					b = 0;
				return a && (b = a.data("id")), b
			}

			function pageObjectToArray(a) {
				if(a.hasOwnProperty("pageList") && a.pageList.constructor === Object) {
					var b = [];
					for(var c in a.pageList) b.push(a.pageList[c]);
					a.pageList = b
				}
				return a
			}

			function dialogObjectToArray(a) {
				if(a.hasOwnProperty("dialogList") && a.dialogList.constructor === Object) {
					var b = [];
					for(var c in a.dialogList) b.push(a.dialogList[c]);
					a.dialogList = b
				}
				return a
			}

			function handleImgUrl(a) {
				if(a) {
					if(a.indexOf("data:image") > -1) return a;
					if(wsiteInfo && wsiteInfo.imgcdn) {
						if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return "https://" + wsiteInfo.imgcdn + "/" + removeImgPrefix(a);
						var b = "http://" + wsiteInfo.imgcdn + "/" + removeImgPrefix(a),
							c = Cool.util.isSpecDomain(b);
						if(c) {
							var d = Cool.util.getUrlSubDomain(b);
							d && -1 === b.indexOf("://ns") && (b = b.replace("://" + d, "://ns" + d))
						}
						return b
					}
					return appConfig.imageHost + removeImgPrefix(a)
				}
				return ""
			}

			function removeImgPrefix(a) {
				return a ? a.indexOf("data:image") > -1 ? a : removeHostName(a) : ""
			}

			function handleDataUrl(a) {
				if(appConfig.dev) return a;
				if(wsiteInfo && wsiteInfo.datacdn) {
					if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return "https://" + wsiteInfo.datacdn + "/" + removeHostName(a);
					a = "http://" + wsiteInfo.datacdn + "/" + removeHostName(a);
					var b = Cool.util.isSpecDomain(a);
					if(b) {
						var c = Cool.util.getUrlSubDomain(a);
						c && -1 === a.indexOf("://ns") && (a = a.replace("://" + c, "://ns" + c))
					}
					return a
				}
				return appConfig.dataHost + removeHostName(a)
			}

			function removeHostName(a) {
				if(void 0 === a || null === a) return "";
				var b = a.indexOf("://");
				if(-1 === b) return a;
				var c = a.substring(0, b + 3);
				a = a.replace(c, "");
				var d = a.indexOf("/");
				if(-1 === d) return a;
				var e = a.substr(d + 1, a.length);
				return e
			}

			function allowFlipCurrentPage() {
				return _allowFlip && _allowFlipCurrentPage ? !0 : !1
			}

			function showArrow() {
				getCanShowCopyrightPageEnd() ? getPageCount() > 0 && allowFlipCurrentPage() && pageEffectComplete(currentPageId) && ("down" == flipWay ? $iconArrowDown.show() : $iconArrowRight.show()) : getPageCount() > 1 && allowFlipCurrentPage() && pageEffectComplete(currentPageId) && currentPageId !== lastPageId && ("down" == flipWay ? $iconArrowDown.show() : $iconArrowRight.show())
			}

			function hideArrow() {
				"down" == flipWay ? $iconArrowDown.hide() : $iconArrowRight.hide()
			}

			function getPageCount() {
				return null !== $pagelist ? $pagelist.find(".pt-page").length : 0
			}

			function nextPage() {
				var a = !1;
				if(getPageCount() > 1) {
					if(currentPageId == lastPageId && "stop" == lastPageGoto) return;
					var b = getActualPageId(-1);
					b == lastPageId ? b === _copyrightId && (hideDanmuInfo(), a = !0) : currentPageId === _copyrightId && resetDanmuInfo();
					var c = getAnimationIndex(b, !0);
					gotoPage(c, b)
				}
				a && showCopyrightEndPage()
			}

			function prePage() {
				var a = !1;
				if(getPageCount() > 1) {
					if(currentPageId == firstPageId && "continue" != lastPageGoto) return;
					var b = getActualPageId(-2);
					b == lastPageId ? b === _copyrightId && (hideDanmuInfo(), a = !0) : currentPageId === _copyrightId && resetDanmuInfo();
					var c = getAnimationIndex(b, !1);
					gotoPage(c, b)
				}
				a && showCopyrightEndPage()
			}

			function showEffect(a) {
				a.addClass("fadeIn"), a.css("display", "block")
			}

			function hideEffect(a) {
				a.removeClass("fadeout"), a.css("display", "none")
			}

			function fnCheckIsNoCopyright() {
				return base.isLastPage() ? (console.log("ckr"), pageIsHaveTopPlugin(!1, ["VR全景图"], [1, appConfig.gameCategory])) : !1
			}

			function showCopyright(a, b) {
				if(!getCanShowCopyrightPageEnd()) {
					if(rrxdebug && console.info("showCopyright", b, _copyrightId, a), b === _copyrightId) return void(_isAllPageShowReport && hideAllPageReport());
					if(_isHaveMenu) {
						var c = getIndexByArray(_dataObj.pageList, b);
						if(!(_menuPageIndex > c)) return
					}
					var d = function(a) {
						a === !0 ? (rrxdebug && console.info("func show"), showEffect($copyright)) : (hideEffect($copyright), _isAllPageShowReport && showAllPageReport())
					};
					rrxdebug && console.trace(_copyrightFrom), rrxdebug && console.info("showCopyright-_copyrightFrom", _dataObj.copyright);
					var e = null;
					if("we+" !== _copyrightFrom && "rrxiu" !== _copyrightFrom || void 0 === b)
						if("customer" === _copyrightFrom || "bottom" === _copyrightFrom || "union" === _copyrightFrom)
							if("bottom" === _copyrightFrom || "union" === _copyrightFrom) {
								if(e = getPageObjById(b), e && e.stopFlip === !0) return void d(!0);
								d(a)
							} else {
								if(_isHaveMenu) return void d(!1);
								d(a)
							}
					else "na" === _copyrightFrom && (_dataObj.showReport || _dataObj.showVisitCount) ? d(a) : 0 !== _dataObj.result && d(a);
					else e = getPageObjById(b), d(e && e.stopFlip === !0 ? !0 : a)
				}
			}

			function showCopyrightEndPage() {
				return 0
			}

			function hideCopyrightEndPage() {
				copyrightendPageShowing = !1, $cypage = getPageDomById(_copyrightId), $cypage && (showSidleReport(), showSidleShare(), resetDanmuInfo(), $cypage.removeClass("copyrightPageAnimShow").addClass("copyrightPageAnimHide"), setTimeout(function() {
					$cypage.css({
						zIndex: 0,
						display: "none"
					}), $cypage.removeClass("copyrightPageAnimHide")
				}, 200), removeAllBlurPage())
			}

			function hideMenuPlugin() {
				_$canvas.find(".rrx-pg-menu-index").length > 0 && (hideEffect(_$canvas.find(".rrx-pg-menu-index")), ("rrxiu" === _copyrightFrom || "bottom" === _copyrightFrom) && hideEffect($copyright))
			}

			function setMenuStyle() {
				_$canvas.find(".rrx-pg-menu-index").length > 0 && (_$canvas.find(".rrx-pg-menu-index").css("bottom", "38px"), $copyright.css("height", "40px"), $copyright.css("line-height", "40px"))
			}

			function showMenuPlugin() {
				_$canvas.find(".rrx-pg-menu-index").length > 0 && (showEffect(_$canvas.find(".rrx-pg-menu-index")), ("rrxiu" === _copyrightFrom || "bottom" === _copyrightFrom) && (showEffect($copyright), setMenuStyle()))
			}

			function registerReportEvent(a) {
				a.length > 0 && a.off().on(clickEventType, function() {
					showReportpage()
				})
			}

			function getPrefixCss(a, b) {
				for(var c = function(b) {
						var c = "",
							d = b.replace(new RegExp(/({)/g), "${").replace(new RegExp(/(})/g), "}$").split("$");
						if(d.length > 0)
							for(var e = 0; e < d.length; e++) {
								var f = $.trim(d[e]);
								f.indexOf("{") > -1 && f.indexOf("}") > -1 ? c += f : "" !== f && (c += a + " " + f)
							} else c = b;
						return c
					}, d = "", e = b.replace(new RegExp(/(@)/g), "$@").split("$"), f = 0; f < e.length; f++) d += -1 === e[f].indexOf("@") ? c(e[f]) : e[f];
				return d
			}

			function fnIsInSpacePlugin(a) {
				if(a.elementList)
					for(var b = 0; b < a.elementList.length; b++) {
						var c = a.elementList[b];
						if("plugin" == c.type && c.displayName && c.displayName.indexOf("一镜到底")) return !0
					}
				return !1
			}

			function getCopyrightFrom() {
				var a = void 0 !== _dataObj.copyright ? _dataObj.copyright.from : "rrxiu";
				"customer" === a && "" === $.trim(_dataObj.copyright.content) && (a = "na");
				var b = _dataObj.pageList;
				if(b) {
					1 !== b.length || "rrxiu" !== a && "bottom" !== a || (b[0].longPage || fnIsInSpacePlugin(b[0])) && (a = "bottom");
					for(var c = 0; c < b.length; c++)
						for(var d = b[c].elementList, e = 0; e < d.length; e++)
							if("plugin" === d[e].type && "菜单" === d[e].content.name) {
								_menuPageIndex = c, _isHaveMenu = !0, "customer" === a && _dataObj.showReport && (a = "na");
								break
							}
				}
				return a
			}

			function _excuteElementEventByBrowser() {
				setTimeout(function() {
					var a = Cool.util.getUrlParameterByName("clickType") || "",
						b = Cool.util.getUrlParameterByName("startPageId") || -1;
					if(b > 0 && ("event" === a || "tel" === a || "sms" === a || "share" === a || "focus" === a || "menu" === a || "openDialog" === a || "danmu" === a)) {
						var c = {
							click: {
								type: a,
								value: Cool.util.getUrlParameterByName("clickValue") || ""
							}
						};
						_excuteElementEvent(b, c)
					}
				}, 1e3)
			}

			function buyTplByMobile() {
				if(isMobileStoreMode()) {
					var a = Cool.util.getUrlParameterByName("tplId"),
						b = parseInt(Cool.util.getUrlParameterByName("mobileType"), 10),
						c = Cool.util.getUrlParameterByName("publicH5Guid"),
						d = appConfig.webAppHost + "/#/" + c,
						e = '<div class="mode--store-info-dialog"><div class="info-dialog-box"><div class="info-content">该模板只能在电脑上使用<br>网址：www.rrxiu.net</div><div class="info-btn"><a class="info-btn-cancel" href="javascript:void(0)">知道了</a></div></div></div>';
					$("#main").append('<div class="mode--store--box"><a href="' + d + '" class="ms--return"><svg t="1491964655697" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1198" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18"><defs><style type="text/css"></style></defs><path d="M403.242506 713.1206c-5.374404 0-10.67513-2.296299-14.373359-6.740518L134.288984 399.754566c-5.738701-6.904247-5.738701-16.923438 0-23.827685L388.869147 69.338205c6.595208-7.924483 18.34481-9.035794 26.26827-2.440585 7.924483 6.576789 9.018398 18.343787 2.440585 26.269293L172.891164 387.841236l244.687862 294.712185c6.577812 7.924483 5.482875 19.692504-2.440585 26.269293C411.658176 711.717647 407.431921 713.1206 403.242506 713.1206z" p-id="1199" fill="#ffffff"></path><path d="M593.024873 957.99061 184.493409 957.99061c-10.30981 0-18.653849-8.343015-18.653849-18.653849 0-10.30981 8.343015-18.653849 18.653849-18.653849l408.53044 0c144.095839 0 261.340123-117.243261 261.340123-261.35752 0-144.094816-117.243261-261.338077-261.340123-261.338077L184.493409 397.987317c-10.30981 0-18.653849-8.341992-18.653849-18.653849 0-10.310833 8.343015-18.653849 18.653849-18.653849l408.53044 0c164.680667 0 298.647821 133.967154 298.647821 298.645774C891.671671 824.00606 757.704516 957.99061 593.024873 957.99061z" p-id="1200" fill="#ffffff"></path></svg><span>返回</span></a><a href="javascript:void(0)" class="ms--buy"><span>立即制作</span><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2544"><path d="M785.096377 372.724956c-47.170323-46.128597-94.266967-92.260264-141.441383-138.392954-6.609535-6.537903-6.609535-6.537903-13.446243 0.298805-107.416452 107.193371-214.759225 214.464513-322.327126 321.582159-5.198395 5.198395-8.391111 10.771321-10.32516 17.756409-16.566304 61.432141-33.354666 122.867352-50.069349 184.227862-1.482771 5.423523-2.970658 10.771321-4.455475 16.416901 0.298805 6.241145 4.680603 2.90005 6.979972 2.304486 66.561975-18.423605 133.121903-36.996612 199.684902-55.416124 4.973268-1.412163 8.838296-3.936659 12.475126-7.503904 107.642602-107.567901 215.359906-215.131709 322.999438-322.622862C794.605961 382.013507 794.605961 382.013507 785.096377 372.724956L785.096377 372.724956zM705.906803 372.801704c-40.630373 40.559764-81.195254 81.266885-121.752971 121.902374-59.650565 59.727313-119.377878 119.454626-178.956811 179.25357-4.157693 4.233418-8.688893 6.978948-14.411221 8.540514-21.765723 5.870708-43.38102 12.035104-65.075111 18.055215-2.894933 0.815575-6.758937 3.043313-6.537903-2.602268 5.423523-19.835767 11.295254-38.850843 15.601326-58.316174 3.048429-13.446243 9.806343-23.325241 19.388583-32.830733 89.144296-88.698135 177.916109-177.769776 266.839371-266.688945 8.91402-8.912997 18.121729-17.381879 27.036773-26.296923 3.196809-3.269463 5.500271-3.048429 8.91402 0 17.238616 15.525602 33.062 32.686447 49.92097 48.657186C711.553407 366.930997 709.325669 369.46061 705.906803 372.801704L705.906803 372.801704zM955.809433 164.725692c-4.532223-54.451146-49.697889-100.209306-110.170169-100.434433-29.714765-0.071631-55.786561 11.069103-77.106122 32.168654-26.593681 26.296923-52.894697 52.891627-79.490425 79.261205-4.234441 4.160763-4.455475 6.758937-0.071631 10.9197 17.08512 15.971763 33.876552 32.16763 50.664913 48.437176 32.537044 31.495318 64.998363 63.068408 97.314373 94.713128 3.864004 3.787256 6.014994 4.085038 9.952676 0.149403 26.003234-26.373671 52.372811-52.297087 78.371952-78.669734 20.72809-21.021779 30.309306-46.87254 31.499411-77.701686C956.549284 171.634032 956.103122 168.216189 955.809433 164.725692L955.809433 164.725692zM883.006314 215.538985c-12.923334 13.148461-26.14752 26.14752-39.07597 39.295981-2.001587 1.929955-3.044336 1.782599-4.973268-0.075725-16.119119-15.82236-32.31601-31.567973-48.585555-47.318702-8.395204-8.021697-16.785292-16.119119-25.255197-24.140817-2.231831-2.083451-2.082428-3.418866 0-5.425569 13.296841-13.148461 26.446325-26.446325 39.743166-39.593763 10.622942-10.474562 23.623024-16.048511 38.403658-16.048511 30.233582 0.149403 52.742225 22.955828 54.975079 50.145074 0.221034 1.709945 0.369414 3.490497 0.517793 4.383844C898.160455 192.21272 893.331473 205.064422 883.006314 215.538985L883.006314 215.538985zM954.321546 384.169613c-2.304486 0.667196-3.638877 2.673899-5.199419 4.233418-18.793018 18.794042-37.663808 37.58706-56.45785 56.382125 0.072655 101.250008 0.221034 202.502064-0.076748 303.754119-0.144286 43.087331-15.97074 79.93147-48.507784 108.681258-25.999141 23.028483-56.752562 35.508725-91.814102 35.508725-161.650657 0.226151-323.369875 0.226151-485.015416 0-33.507138-0.071631-63.21781-11.808954-88.698135-33.651424-33.876552-29.119201-50.366108-66.264193-50.366108-110.833271 0.071631-158.304446 0.071631-316.53726 0-474.763934-0.075725-43.900859 16.043395-80.600713 48.581462-109.647259 23.99653-21.390169 52.520167-33.276894 84.981487-34.764781 41.826618-2.00568 83.648119-0.667196 125.546368-0.815575 62.770626-0.225127 125.542274-0.149403 188.313923-0.076748 18.797112-18.717294 37.514405-37.438681 56.236815-56.232722 1.632173-1.632173 5.126764-3.044336 3.862981-5.64558-0.968048-2.00568-4.234441-0.892323-6.465249-0.892323-87.435375-0.072655-174.794002-0.222057-262.229376 0-48.729841 0.148379-97.464799-1.335415-146.193617 0.963954-37.737486 1.785669-70.945819 15.529695-98.874915 40.563858-37.885865 33.799804-56.678884 76.513628-56.607252 127.619586 0.149403 184.231955 0.075725 368.536564 0.075725 552.763402 0 51.925626 19.165502 95.164407 58.608839 129.035842 29.643134 25.4046 64.181765 39.148625 103.258759 39.148625 188.240245 0.37453 376.481514 0.297782 564.725852 0.076748 40.780799 0 76.586283-14.560624 106.896612-41.380456 37.808094-33.426297 56.308447-76.365248 56.45785-126.582977 0.370437-132.152832 0.149403-264.385483 0.072655-396.61404C955.435926 388.849192 956.178847 386.397351 954.321546 384.169613L954.321546 384.169613zM954.321546 384.169613" p-id="2545"></path></svg></a></div>'), $("#main").find(".ms--buy").off().on(clickEventType, function(f) {
						if(f.preventDefault(), f.stopPropagation(), 2 !== b) {
							var g = $("#main").find(".mode--store-info-dialog");
							g.length > 0 ? g.show() : ($("#main").append(e), g = $("#main").find(".mode--store-info-dialog"), $("#main").find(".info-btn").off().on(clickEventType, function(a) {
								a.preventDefault(), a.stopPropagation(), g.hide()
							}))
						} else {
							var h = _host + "mobile/getTpl?tplId=" + a;
							$.ajax({
								url: h,
								xhrFields: {
									withCredentials: !0
								},
								dataType: "json",
								success: function(b) {
									if(0 === b.result) {
										var e = parseFloat(b.data.price),
											f = "";
										f = e > 0 ? appConfig.wxPayHost + "tpl.html?publicH5Guid=" + c + "&tplId=" + a : d + "/edit/" + b.data.wsiteGuid + "?tplId=" + a, window.location.replace(f)
									} else winAlert(b.msg)
								},
								error: function(a, b, c) {
									401 === a.status || 0 === a.status ? window.location.replace(d) : winAlert("status:" + b)
								}
							})
						}
					})
				}
			}

			function checkWsiteHaveInductionPlugin() {
				if(0 === _dataObj.result) {
					var a = listHaveInductionPlugin(_dataObj.pageList);
					return a || (a = listHaveInductionPlugin(_dataObj.dialogList)), a
				}
			}

			function listHaveInductionPlugin(a) {
				if(void 0 === a) return !1;
				var b = a.length;
				if(b > 0)
					for(var c = 0; b > c; c++) {
						var d = [];
						void 0 !== a[c] && null !== a[c] && void 0 !== a[c].elementList && null !== a[c].elementList && (d = a[c].elementList);
						for(var e = d.length, f = 0; e > f; f++)
							if("plugin" === d[f].type && ("答题" === d[f].content.name || "答题20" === d[f].content.name || "问答" === d[f].content.name || "照片投票" === d[f].content.name || "砍价" === d[f].content.name || "新年签" === d[f].content.name || d[f].content.name.indexOf("红包") > -1 || d[f].content.name.indexOf("抽奖") > -1 || parseInt(d[f].content.categoryId) === appConfig.gameCategory)) return !0
					}
				return !1
			}

			function isMobileStoreMode() {
				return "store" === Cool.util.getUrlParameterByName("mode") ? !0 : void 0
			}

			function isOfficialAccountsMode() {
				return "official_accounts" === Cool.util.getUrlParameterByName("mode") ? !0 : "1" === getOfficialAccountsModeCookie() ? !0 : !1
			}

			function getOfficialAccountsModeKey() {
				var a = _dataObj.guid;
				return hex_md5("official_accounts" + a)
			}

			function setOfficialAccountsModeCookie() {
				var a = isOfficialAccountsMode() ? "1" : "0",
					b = "",
					c = 10;
				Cool.cookie.setWithoutTime(getOfficialAccountsModeKey(), a, c, b)
			}

			function getOfficialAccountsModeCookie() {
				return Cool.cookie.get(getOfficialAccountsModeKey())
			}

			function initOfficialAccountsModeCookie() {
				var a = getOfficialAccountsModeCookie();
				setOfficialAccountsModeCookie()
			}

			function getCanFocusWechat() {
				return wsiteInfo.wxp.focusWechat
			}

			function getCanFocusByWay(a) {
				return void 0 === a || null === a ? wsiteInfo.wxp.focusWechat : (a = parseInt(a, 10), 1 === a ? wsiteInfo.wxp.focusWechat : 2 === a && wsiteInfo.wxp.focusWechat && wsiteInfo.wxp.myWxAuthOpen ? (console.log("fwa"), !0) : !1)
			}

			function getCanRemoveWaterMark() {
				return wsiteInfo.wxp.removeWaterMark
			}

			function getCanModifyWechat() {
				return wsiteInfo.wxp.modifyWechat
			}

			function getCanShowShareTips() {
				return 1 === wsiteInfo.shareTips
			}

			function getFormatCount(a) {
				var b = a.toString();
				return b.length >= 6 && (b = b.substr(0, 2) + "," + b.substr(2, 3) + "," + b.substr(5)), b
			}

			function clearRollList() {
				clearInterval(crRollInterval)
			}

			function showPluginFocus(a, b) {
				apiHelper.getAppInstance().stopFlip(), "" !== b && void 0 !== b ? b += "@!200x200" : b = "";
				var c = $focusWxQrPanel.find(".dialog-content");
				if(null === c || void 0 === c || 0 === c.length) {
					var d = '<a class="show-common-report">举报</a><a class="fc_wx_close"><span></span></a><div class="dialog-content"><div class="focus-box"><div class="focus-box-inner"><div class="title-tip"></div><div class="wxqr" style="margin-bottom:20px"><img class="wxqr-img"></div></div></div></div>\n';
					$focusWxQrPanel.html(d), c = $focusWxQrPanel.find(".dialog-content");
					var e = $focusWxQrPanel.find(".fc_wx_close");
					e.off().on(clickEventType, function(a) {
						a.stopPropagation(), a.preventDefault(), hidePluginFocus()
					}), registerReportEvent($focusWxQrPanel.find(".show-common-report"))
				}
				var f = c.find(".title-tip"),
					g = c.find(".wxqr-img");
				f.text(a), g.attr("src", b), $focusWxQrPanel.show()
			}

			function hidePluginFocus() {
				apiHelper.getAppInstance().resetFlip(!0), $focusWxQrPanel.hide()
			}

			function updateUserReadDepth() {
				var a = _dataObj.pageList;
				if(!(window.userReadDepth >= a.length))
					if(currentPageId === lastPageId) window.userReadDepth = a.length;
					else
						for(var b = 0; b < a.length; b++)
							if(a[b].id == currentPageId) {
								b + 1 > window.userReadDepth && (window.userReadDepth = b + 1);
								break
							}
			}

			function parseRegionLimitString(a) {
				a = a || "";
				var b = {
						NONE: "NONE",
						REGION: "REGION",
						EXTENT: "EXTENT"
					},
					c = {
						type: b.NONE
					};
				if("" !== a) {
					var d = a.split("|"),
						e = d.length;
					if(2 === e)
						if(c.type = d[1], c.type === b.EXTENT) {
							var f = d[0].split("@");
							if(3 === f.length) {
								c.address = f[0], c.radius = f[1];
								var g = f[2].split(",");
								2 === g.length && (c.lat = g[0], c.lng = g[1])
							}
						} else c.regions = getRegions(d[0]);
					else e > 0 && (c.type = b.REGION, c.regions = getRegions(d[0]))
				}
				return c
			}

			function getRegions(a) {
				var b = a.split("|");
				return b.length > 0 ? b[0].split(",") : []
			}

			function replaceAll(a, b, c) {
				var d = new RegExp(b, "g");
				return a.replace(d, c)
			}
			var base = this,
				_$canvas = null,
				canvasDefaultWidth = 640,
				$previewNotice, $copyright, $pluginCopyright, $progress, $reportpage, $iconMusic, $focusButton, $topMenuButton, $focusPanel, $topMenuPanel, $danmuButton, $danmuPanel, $danmuShow, $focusWxQrPanel, $sidleShareButton, $sidleReportButton, $sharePanel, $sharePosterDialog, $sharePosterTips, $pageCopyrightPageEnd, $ptWrapper = null,
				$pagewrapper = null,
				$pagelist = null,
				$floorpage = null,
				$loadingpage = null,
				$sharepage = null,
				$iconArrowDown, $iconArrowRight, currentPageId = 0,
				_dataObj = null,
				_host = "",
				_allowTempFlip = !0,
				_allowFlip = !0,
				_allowFlipCurrentPage = !0,
				flipWay = "down",
				flipAnimation = {
					enter: "1101",
					back: "1102"
				},
				musicUrl = "",
				musicPlayIcon = "",
				musicStopIcon = "",
				musicPosition = "",
				musicAutoPlay = !0,
				hasBgMusic = !1,
				$music = null,
				_isEditing = !1,
				PLUGIN_SIZE_TYPE = {
					AUTO: "1",
					FIXED: "2",
					FULL: "3",
					SCALE: "4"
				},
				_isPc = !0,
				_isPreview = !1,
				_isPageThumb = !1,
				lastPageGoto = "continue",
				firstPageId = 0,
				lastPageId = 0,
				hasCopyRightPage = !1,
				clickEventType = "click",
				self, _log = null,
				_isWeixin = !1,
				_animationEngine = appConfig.animationEngine,
				_copyrightFrom = "",
				_isHaveMenu = !1,
				_menuPageIndex = -1,
				_copyrightId = "copyrightPage",
				_leftCopyrightText = "点击免费制作人人秀",
				_rightCopyrightText = "",
				_page_element_list_scale_value = 1,
				limitBottomCount = 0,
				limitTopCount = 0,
				iScrollInstances = [],
				noAutoPlayImgGroupInstances = [],
				pageLongScroll = [],
				longPageObj = [],
				defaultShareImageUrl = (wsiteInfo.flhtps || wsiteInfo.httpsEnabled ? "https://file2.rrxh5.cc" : "http://file2.rrxh5.cc") + "/logo_blue_200x200.jpg",
				shareUrl = location.href.split("#")[0],
				shareTitle = "",
				shareImageUrl = "",
				shareDesc = "",
				customIntervals = [],
				_preloadAllResource = !1,
				_reportInit = !1,
				_flipProgress = !1,
				_pagePluginCopyRight = [],
				PNAME_WGUID = "v",
				longPageCopyright = {
					title: "长页-人人秀旗下产品",
					image: getImageHost() + "plugin_icon/longpage.png",
					color: "#2ac3fd"
				},
				_isAllPageShowReport = !1,
				pageListCount = 0,
				_isSetting = !1,
				rrxtrace = function(a) {
					void 0 !== _log && null !== _log && _log.logError(a)
				},
				getOriginUrl = function() {
					return void 0 !== window.rrxh5OriginUrl && null !== window.rrxh5OriginUrl && "" !== $.trim(window.rrxh5OriginUrl) ? (console.log(1), window.rrxh5OriginUrl) : wsiteInfo && void 0 !== wsiteInfo.vurl && null !== wsiteInfo.vurl && "" !== $.trim(wsiteInfo.vurl) ? (console.log(2), wsiteInfo.vurl) : location.href.split("#")[0]
				},
				getWxJsSignTry = 0,
				_timeOne = null;
			window.isLoadQQMap = !1;
			var multiSelectObj = {
					getTipValue: function(a, b) {
						var c = function(b) {
								return "-1" === b.defaultValue.toString() ? b.defaultTip || "请选择" : (d = getIndexByArray(a.list, b.defaultValue, "id"), d > -1 ? a.list[d].value : "请选择")
							},
							d = -1;
						if("one" === b) return c(a);
						if("two" === b) {
							if(d = getIndexByArray(a.list, a.defaultValue, "id"), d > -1) return c(a.list[d])
						} else if("three" === b && (d = getIndexByArray(a.list, a.defaultValue, "id"), d > -1)) {
							var e = getIndexByArray(a.list[d].options, a.list[d].defaultValue, "id");
							if(e > -1) return c(a.list[d].options[e])
						}
						return "请选择"
					},
					getOptions: function(a, b, c, d) {
						var e = function(a) {
								return "-1" === a.defaultValue.toString() ? "<option value='-1'>" + a.defaultTip + "</option>" : ""
							},
							f = "",
							g = -1,
							h = "-1",
							i = c || a.defaultValue,
							j = [];
						if("one" === b) h = i, j = a.list, f = e(a);
						else if("two" === b) g = getIndexByArray(a.list, i, "id"), g > -1 && (h = a.list[g].defaultValue, j = a.list[g].options, f = e(a.list[g]));
						else if("three" === b && (g = getIndexByArray(a.list, i, "id"), g > -1)) {
							d = d || a.list[g].defaultValue;
							var k = getIndexByArray(a.list[g].options, d, "id");
							k > -1 && (h = a.list[g].options[k].defaultValue, j = a.list[g].options[k].options, f = e(a.list[g].options[k]))
						}
						return $.each(j, function(a, b) {
							f += h == b.id ? '<option value="' + b.id + '" selected="selected">' + b.value + "</option>" : '<option value="' + b.id + '" >' + b.value + "</option>"
						}), 0 === j.length && (f = '<option value="-1" >请选择</option>'), f
					},
					formatOne: function(a, b, c, d) {
						c.children().length > 0 && c.empty(), d.children().length > 0 && d.empty(), c.append(multiSelectObj.getOptions(a.content, "two", b)), d.append(multiSelectObj.getOptions(a.content, "three", b, c.find("option:selected").val()))
					},
					formatTwo: function(a, b, c, d) {
						d.children().length > 0 && d.empty(), d.append(multiSelectObj.getOptions(a.content, "three", b, c))
					},
					bindEvent: function(a, b) {
						var c = a.find('select[name="one"]'),
							d = a.find('select[name="two"]'),
							e = a.find('select[name="three"]'),
							f = this;
						c.on("change", function() {
							f.formatOne(b, c.find("option:selected").val(), d, e)
						}), d.on("change", function() {
							f.formatTwo(b, c.find("option:selected").val(), d.find("option:selected").val(), e)
						})
					}
				},
				loadedSvgKey = [],
				loadedSvgXml = {},
				timer_count = 0,
				timer_instance, t1 = null,
				preAnimationList = [],
				regImgSilderTimerRecord = [{
					pageId: 0,
					isReg: !1,
					silderObject: []
				}];
			ImgPlayTimer.prototype = {
				constructor: ImgPlayTimer,
				setCount: function(a) {
					this.count = a
				},
				getCount: function() {
					return this.count
				},
				setPageId: function(a) {
					this.pageId = a
				},
				setElemId: function(a) {
					this.elemId = a
				},
				setContent: function(a) {
					this.content = a
				},
				setImgList: function(a) {
					this.imgList = a
				},
				playImgList: function() {
					var a = this,
						b = !0,
						c = setInterval(function() {
							if(b) {
								if(a.count >= a.imgList.length) {
									if(a.count = 0, !a.content.playLoop) return void window.clearInterval(c);
									b = !1, setTimeout(function() {
										b = !0, $(a.imgList[a.imgList.length - 1]).css("opacity", 0), $(a.imgList[0]).css("opacity", 1)
									}, 1e3 * a.content.loopDelay)
								}
								a.count > 0 && ($(a.imgList[a.count - 1]).css("opacity", 0), $(a.imgList[a.count]).css("opacity", 1)), a.count++
							}
						}, parseInt(1e3 / a.content.playSpeed, 10));
					regIntervals.push({
						pageId: a.pageId,
						elemId: a.elemId,
						interval: c
					})
				}
			};
			var regIntervals = [];
			musicIsPlayWhenPlayVideo = !0;
			var myShakeEvent = {},
				Shake = function(a) {
					if(this.hasDeviceMotion = "ondevicemotion" in window, this.options = {
							shake: "shake",
							threshold: 15,
							timeout: 1e3
						}, "object" == typeof a)
						for(var b in a) a.hasOwnProperty(b) && (this.options[b] = a[b]);
					if(this.lastTime = new Date, this.lastX = null, this.lastY = null, this.lastZ = null, "function" == typeof document.CustomEvent) this.event = new document.CustomEvent(this.options.shake, {
						bubbles: !0,
						cancelable: !0
					});
					else {
						if("function" != typeof document.createEvent) return !1;
						this.event = document.createEvent("Event"), this.event.initEvent(this.options.shake, !0, !0)
					}
				};
			Shake.prototype = {
				reset: function() {
					this.lastTime = new Date, this.lastX = null, this.lastY = null, this.lastZ = null
				},
				start: function() {
					this.reset(), this.hasDeviceMotion && window.addEventListener("devicemotion", this, !1)
				},
				stop: function() {
					this.hasDeviceMotion && window.removeEventListener("devicemotion", this, !1), this.reset()
				},
				devicemotion: function(a) {
					var b, c, d = a.accelerationIncludingGravity,
						e = 0,
						f = 0,
						g = 0;
					if(null === this.lastX && null === this.lastY && null === this.lastZ) return this.lastX = d.x, this.lastY = d.y, void(this.lastZ = d.z);
					if(e = Math.abs(this.lastX - d.x), f = Math.abs(this.lastY - d.y), g = Math.abs(this.lastZ - d.z), (e > this.options.threshold && f > this.options.threshold || e > this.options.threshold && g > this.options.threshold || f > this.options.threshold && g > this.options.threshold) && (b = new Date, c = b.getTime() - this.lastTime.getTime(), c > this.options.timeout)) {
						var h = Math.abs(e + f + g) / c * 1e4;
						this.event.speed = h.toFixed(2), window.dispatchEvent(this.event), this.lastTime = new Date
					}
					this.lastX = d.x, this.lastY = d.y, this.lastZ = d.z
				},
				handleEvent: function(a) {
					return "function" == typeof this[a.type] ? this[a.type](a) : void 0
				}
			};
			var rrxAutoFlipTimer = null,
				menuScrollInstance = null,
				hadCreateSharePoster = !1,
				sharePosterCreated = !1,
				shareTitleLast = "",
				shareDescLast = "",
				shareImgLast = "",
				shareUrlLast = "",
				danmuiScrollInstance = null,
				danmu_like_count = 0,
				danmu_comment_count = 0,
				isSending = !1,
				DM_Comment_List = [],
				DM_Listen_Event = $({}),
				forceOpenDanmu = !1,
				danmuButtonShow = !0,
				onlyPluginDanmu = !1,
				DM_Comment_Like_List = [],
				hasDoLike = !1,
				danmuAnimateShow = !0,
				authUserInfo = null,
				danmuSortKey = [],
				isCopyrightPageEndShow = !1,
				isCopyrightPageEndGotoFirst = !1,
				flip = function() {
					function a(a, b) {
						if(void 0 !== a)
							if(h = a, b = void 0 === b ? 0 : b, h.find(".pt-page").each(function() {
									$(this).data("originalClassList", $(this).attr("class"))
								}), 0 === b) {
								var c = h.find("div.pt-page:not(.ifpage)").first();
								c.addClass("pt-page-current"), i = c.data("id")
							} else h.find(".page_" + b).addClass("pt-page-current"), i = b
					}

					function b(a, b) {
						c(a, b), j = !1
					}

					function c(a, b) {
						b.attr("class", b.data("originalClassList")), a.attr("class", a.data("originalClassList") + " pt-page-current")
					}

					function d(a) {
						return "" === a && (a = "1101"), g[a]
					}

					function e(a, c) {
						if(void 0 !== h) {
							if(j) return !1;
							var e, g;
							classes = d(a), e = classes[0], g = classes[1], j = !0;
							var k = null;
							k = 0 === i ? h.find("div.pt-page:not(.ifpage)").first() : h.find(".page_" + i).first();
							var l = h.find(".page_" + c).first();
							if(i = c, null !== l) {
								l.data("id") != k.data("id") && l.addClass("pt-page-current");
								var m = !1,
									n = !1;
								k.addClass(g).on(f, function(a) {
									k.off(f), m = !0, n && b(l, k)
								}), l.addClass(e).on(f, function() {
									l.off(f), n = !0, m && b(l, k)
								})
							} else j = !1;
							return _support || b(k, l), !0
						}
					}
					var f = "webkitAnimationEnd animationend";
					_support = !0;
					var g = [];
					g[1101] = ["pt-page-moveFromBottom", "pt-page-moveToTop"], g[1102] = ["pt-page-moveFromTop", "pt-page-moveToBottom"], g[1201] = ["pt-page-moveFromBottom pt-page-ontop", "pt-page-fade"], g[1202] = ["pt-page-moveFromTop pt-page-ontop", "pt-page-fade"], g[1301] = ["pt-page-moveFromBottom", "pt-page-moveToTopEasing pt-page-ontop"], g[1302] = ["pt-page-moveFromTop", "pt-page-moveToBottomEasing pt-page-ontop"], g[1401] = ["pt-page-flipInTop pt-page-delay500", "pt-page-flipOutBottom"], g[1402] = ["pt-page-flipInBottom pt-page-delay500", "pt-page-flipOutTop"], g[1501] = ["pt-page-rotatePullBottom pt-page-delay180", "pt-page-rotatePushTop"], g[1502] = ["pt-page-rotatePullTop pt-page-delay180", "pt-page-rotatePushBottom"], g[1601] = ["pt-page-rotateCubeTopIn", "pt-page-rotateCubeTopOut pt-page-ontop"], g[1602] = ["pt-page-rotateCubeBottomIn", "pt-page-rotateCubeBottomOut pt-page-ontop"], g[1701] = ["pt-page-scaleUpCenter pt-page-delay400", "pt-page-scaleDownCenter"], g[1801] = ["pt-page-rotateInNewspaper pt-page-delay500", "pt-page-rotateOutNewspaper"], g[1901] = ["pt-page-scaleUp", "pt-page-rotateFall pt-page-ontop"], g[2001] = ["pt-page-scaleUp", "pt-page-moveToTop pt-page-ontop"], g[2101] = ["pt-page-moveFromRight", "pt-page-moveToLeft"], g[2102] = ["pt-page-moveFromLeft", "pt-page-moveToRight"], g[2201] = ["pt-page-moveFromRight", "pt-page-moveToLeftEasing pt-page-ontop"], g[2301] = ["pt-page-rotateCubeLeftIn", "pt-page-rotateCubeLeftOut pt-page-ontop"], g[2401] = ["pt-page-rotateCarouselLeftIn", "pt-page-rotateCarouselLeftOut pt-page-ontop"], g[2501] = ["pt-page-rotateSlideIn", "pt-page-rotateSlideOut"];
					var h, i = 0,
						j = !1;
					return {
						init: a,
						gotoPage: e
					}
				}(),
				isSliding = !1,
				moveDistanceX = 0,
				moveDistanceY = 0,
				doScrollMoveFn = null,
				doScrollEndFn = null,
				scroll = {},
				isStart = !1,
				isNext = !1,
				isFirstTime = !0,
				flipEndTimeout = 500,
				animTime = .4,
				scrolling = !1,
				left = 0,
				top = 0,
				_isDisableFlipPage = !1,
				_isDisableFlipPrevPage = !1,
				_isDisableFlipNextPage = !1,
				_scrollMode = 0,
				windowWidth = $("#pt-inner").width(),
				windowHeight = $("#pt-inner").height(),
				_$activePage = null,
				_$currentPage = null,
				touchPos = 0,
				touchEndCount = 0,
				touchToBottomCount = 0,
				_canContinue = !0,
				_pageScrollEnd = !1,
				pageIdWillShow = 0,
				needBlurPage = 0;
			scroll.downMoveMove = function() {
				needBlurPage = 0;
				var a = Math.abs(moveDistanceY) <= Math.abs(moveDistanceX) || 0 === moveDistanceY;
				if(rrxdebug && console.log("downMoveMove", a), !a)
					if(moveDistanceY > 0) {
						if(_isDisableFlipPrevPage) return;
						if(!isContinuePrePage()) return void(_canContinue = !1);
						isNext || isFirstTime ? (isNext = !1, isFirstTime = !1, _$activePage && deactive(_$activePage), rrxdebug && console.warn("init prev"), _$activePage = getActivePage("prev"), getMoveInit(!0, "bottom center", "translateY", windowHeight)) : setCssWhenMove(!0, "translateY", windowHeight, moveDistanceY, "vertical")
					} else if(0 > moveDistanceY) {
					if(_isDisableFlipPrevPage) return;
					if(isStopNextPage()) return void(_canContinue = !1);
					if(currentPageId === lastPageId && !isCopyrightPageEndShow && !isCopyrightPageEndGotoFirst && getCanShowCopyrightPageEnd()) return clearInterval(timer_goToNextPage), void copyrightPageEndShow();
					!isNext || isFirstTime ? (isNext = !0, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage = getActivePage("next"), getMoveInit(!1, "top center", "translateY", windowHeight)) : setCssWhenMove(!1, "translateY", windowHeight, moveDistanceY, "vertical");

				}
				removeAllBlurPage()
			}, scroll.downMoveEnd = function() {
				if(Math.abs(moveDistanceY) > Math.abs(moveDistanceX) && Math.abs(moveDistanceY) > 20) {
					rrxdebug && console.log(moveDistanceY, windowHeight), setCssWhenEnd("translateY", moveDistanceY, windowHeight, _scrollMode), rrxdebug && console.log("移动结束"), beforeScrollEndThenNext();
					var a = _$activePage.data("id");
					beforeScrollEndThenCopyrightEndPage(a), flipend()
				} else _isDisableFlipPage = !1, cancelFlip()
			}, scroll.downFadeMove = function() {
				needBlurPage = 0;
				var a = Math.abs(moveDistanceY) <= Math.abs(moveDistanceX) || 0 === moveDistanceY;
				if(!a)
					if(moveDistanceY > 0) {
						if(_isDisableFlipPrevPage) return;
						if(!isContinuePrePage()) return void(_canContinue = !1);
						(isNext || isFirstTime) && (isNext = !1, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage = getActivePage("prev"), _$activePage.removeClass("z-fade-in"), deactive(_$activePage), _$currentPage[0].style.zIndex = 1, _$activePage[0].style.zIndex = 2, _$activePage.addClass("z-fade-in"), active(_$activePage))
					} else if(0 > moveDistanceY) {
					if(_isDisableFlipNextPage) return;
					if(isStopNextPage()) return void(_canContinue = !1);
					if(currentPageId === lastPageId && !isCopyrightPageEndShow && !isCopyrightPageEndGotoFirst && (console.log(isCopyrightPageEndShow), getCanShowCopyrightPageEnd())) return void copyrightPageEndShow();
					(!isNext || isFirstTime) && (isNext = !0, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage = getActivePage("next"), _$activePage.removeClass("z-fade-in"), deactive(_$activePage), _$currentPage[0].style.zIndex = 1, _$activePage[0].style.zIndex = 2, _$activePage.addClass("z-fade-in"), active(_$activePage))
				}
				removeAllBlurPage()
			}, scroll.downFadeEnd = function() {
				if(Math.abs(moveDistanceY) > Math.abs(moveDistanceX)) {
					beforeScrollEndThenNext();
					var a = _$activePage.data("id");
					beforeScrollEndThenCopyrightEndPage(a), setTimeout(function() {
						flipend()
					}, 100)
				} else _isDisableFlipPage = !1, cancelFlip()
			}, scroll.downScaleMove = function() {
				if(needBlurPage = 0, Math.abs(moveDistanceY) > Math.abs(moveDistanceX)) {
					if(moveDistanceY > 0) {
						if(_isDisableFlipPrevPage) return;
						if(!isContinuePrePage()) return void(_canContinue = !1);
						(isNext || isFirstTime) && (isNext = !1, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage = getActivePage("prev"), deactive(_$activePage), _$activePage[0].style.zIndex = 2, active(_$activePage), _$activePage[0].style.opacity = 1, _$currentPage[0].style.opacity = 0)
					} else if(0 > moveDistanceY) {
						if(_isDisableFlipNextPage) return;
						if(isStopNextPage()) return void(_canContinue = !1);
						if(currentPageId === lastPageId && !isCopyrightPageEndShow && !isCopyrightPageEndGotoFirst && (console.log(isCopyrightPageEndShow), getCanShowCopyrightPageEnd())) return void copyrightPageEndShow();
						(!isNext || isFirstTime) && (isNext = !0, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage = getActivePage("next"), deactive(_$activePage), _$activePage[0].style.zIndex = 2, active(_$activePage), _$activePage[0].style.opacity = 1, _$currentPage[0].style.opacity = 0)
					}
					var a = Math.abs(moveDistanceY) / windowHeight * 1.3;
					_$activePage[0].style.opacity = a.toFixed(1), a.toFixed(3) <= 1 && cssAnim(_$activePage, "transform", "scale(" + a.toFixed(3) + ")")
				}
				removeAllBlurPage()
			}, scroll.downScaleEnd = function() {
				if(Math.abs(moveDistanceY) > Math.abs(moveDistanceX) && Math.abs(moveDistanceY) > 20) {
					cssAnim(_$activePage, "transform", "scale(1)"), _$activePage[0].style.opacity = 1, beforeScrollEndThenNext();
					var a = _$activePage.data("id");
					beforeScrollEndThenCopyrightEndPage(a), flipend()
				} else cssAnimation(_$currentPage[0].style, "Transition", "none"), cssAnimation(_$activePage[0].style, "Transition", "none"), _isDisableFlipPage = !1, cancelFlip()
			}, scroll.downCardMove = function() {
				if(needBlurPage = 0, Math.abs(moveDistanceY) > Math.abs(moveDistanceX))
					if(moveDistanceY > 0) {
						if(_isDisableFlipPrevPage) return;
						if(!isContinuePrePage()) return void(_canContinue = !1);
						isNext || isFirstTime ? (isNext = !1, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage = getActivePage("prev"), deactive(_$activePage), cssAnimation(_$activePage[0].style, "TransformOrigin", "top"), cssAnimation(_$activePage[0].style, "Transform", "rotateX(90deg)"), active(_$activePage)) : cssAnimation(_$activePage[0].style, "Transform", "rotateX(" + (90 - moveDistanceY / windowHeight * 90) + "deg)")
					} else if(0 > moveDistanceY) {
					if(_isDisableFlipNextPage) return;
					if(isStopNextPage()) return void(_canContinue = !1);
					if(!isNext || isFirstTime) {
						if(isNext = !0, isFirstTime = !1, _$activePage && deactive(_$activePage), currentPageId === lastPageId && !isCopyrightPageEndShow && !isCopyrightPageEndGotoFirst && (console.log(isCopyrightPageEndShow), getCanShowCopyrightPageEnd())) return void copyrightPageEndShow();
						_$activePage = getActivePage("next"), deactive(_$activePage), cssAnimation(_$activePage[0].style, "TransformOrigin", "bottom"), cssAnimation(_$activePage[0].style, "Transform", "rotateX(-90deg)"), active(_$activePage)
					} else cssAnimation(_$activePage[0].style, "Transform", "rotateX(" + (-90 - moveDistanceY / windowHeight * 90) + "deg)")
				}
				removeAllBlurPage()
			}, scroll.downCardEnd = function() {
				if(Math.abs(moveDistanceY) > Math.abs(moveDistanceX) && Math.abs(moveDistanceY) > 20) {
					cssAnimation(_$activePage[0].style, "Transform", "rotateX(0deg)"), beforeScrollEndThenNext();
					var a = _$activePage.data("id");
					beforeScrollEndThenCopyrightEndPage(a), flipend()
				} else cssAnimation(_$currentPage[0].style, "Transition", "none"), cssAnimation(_$activePage[0].style, "Transition", "none"), _isDisableFlipPage = !1, cancelFlip()
			}, scroll.rightLRMoveMove = function() {
				if(needBlurPage = 0, Math.abs(moveDistanceX) > Math.abs(moveDistanceY))
					if(moveDistanceX > 0) {
						if(_isDisableFlipPrevPage) return;
						if(!isContinuePrePage()) return void(_canContinue = !1);
						isNext || isFirstTime ? (isNext = !1, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage = getActivePage("prev"), getMoveInit(!0, "center right", "translateX", windowWidth)) : setCssWhenMove(!0, "translateX", windowWidth, moveDistanceX, _scrollMode)
					} else if(0 > moveDistanceX) {
					if(_isDisableFlipNextPage) return;
					if(isStopNextPage()) return void(_canContinue = !1);
					if(currentPageId === lastPageId && !isCopyrightPageEndShow && !isCopyrightPageEndGotoFirst && (console.log(isCopyrightPageEndShow), getCanShowCopyrightPageEnd())) return void copyrightPageEndShow();
					!isNext || isFirstTime ? (isNext = !0, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage = getActivePage("next"), getMoveInit(!1, "center left", "translateX", windowWidth)) : setCssWhenMove(!1, "translateX", windowWidth, moveDistanceX, _scrollMode)
				}
				removeAllBlurPage()
			}, scroll.rightLRMoveEnd = function() {
				if(Math.abs(moveDistanceX) > Math.abs(moveDistanceY) && Math.abs(moveDistanceX) > 20) {
					setCssWhenEnd("translateX", moveDistanceX, windowWidth, _scrollMode), beforeScrollEndThenNext();
					var a = _$activePage.data("id");
					beforeScrollEndThenCopyrightEndPage(a), flipend()
				} else _isDisableFlipPage = !1, cancelFlip()
			}, scroll.rightLRRotateMove = function() {
				needBlurPage = 0;
				var a, b, c, d, e, f, g, h;
				if(Math.abs(moveDistanceX) > Math.abs(moveDistanceY))
					if(moveDistanceX > 0) {
						if(_isDisableFlipPrevPage) return;
						if(!isContinuePrePage()) return void(_canContinue = !1);
						rrxdebug && console.log("moveDistanceX", moveDistanceX), isNext || isFirstTime ? (isNext = !1, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage = getActivePage("prev"), active(_$activePage), cssAnim(_$activePage, "Transform", "scale(0.3) translateX(0) translateZ(-" + windowHeight + "px) rotateY(45deg)"), _$activePage[0].style.zIndex = "0", _$currentPage[0].style.zIndex = "100") : (a = ((4 * windowWidth / 4 - moveDistanceX) / windowWidth).toFixed(3), b = 1.5 * moveDistanceX, c = moveDistanceX - windowWidth / 4, d = moveDistanceX / windowWidth * 45, cssAnim(_$currentPage, "Transform", "translateX(" + b + "px) scale(" + a + ") rotateY(" + d + "deg) translateZ(" + c + "px)"), e = (moveDistanceX / windowWidth).toFixed(3), f = -windowWidth + b, g = windowWidth / 4 + moveDistanceX, h = -45 + (moveDistanceX + windowWidth / 4) / windowWidth * 45, cssAnim(_$activePage, "Transform", "scale(" + e + ") translateX(" + f + "px) translateZ(" + g + "px) rotateY(" + h + "deg)"))
					} else if(0 > moveDistanceX) {
					if(_isDisableFlipNextPage) return;
					if(isStopNextPage()) return void(_canContinue = !1);
					if(currentPageId === lastPageId && !isCopyrightPageEndShow && !isCopyrightPageEndGotoFirst && (console.log(isCopyrightPageEndShow), getCanShowCopyrightPageEnd())) return void copyrightPageEndShow();
					rrxdebug && console.log("moveDistanceX", moveDistanceX, moveDistanceY), !isNext || isFirstTime ? (isNext = !0, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage && deactive(_$activePage), _$activePage = getActivePage("next"), active(_$activePage), cssAnim(_$activePage, "Transform", "scale(0.3) translateX(" + (windowWidth + 300) + "px) translateZ(-" + windowHeight + "px) rotateY(-45deg)"), _$activePage[0].style.zIndex = "0", _$currentPage[0].style.zIndex = "100") : (prev_scale = ((4 * windowWidth / 4 + moveDistanceX) / windowWidth).toFixed(3), prev_tx = 1.5 * moveDistanceX, prev_tz = moveDistanceX + windowWidth / 4, prev_ry = moveDistanceX / windowWidth * 45, cssAnim(_$currentPage, "Transform", "translateX(" + prev_tx + "px) scale(" + prev_scale + ") rotateY(" + prev_ry + "deg) translateZ(" + prev_tz + "px)"), e = (-moveDistanceX / windowWidth).toFixed(3), f = windowWidth - -prev_tx, g = windowWidth / 4 + moveDistanceX, h = 45 + (moveDistanceX + windowWidth / 4) / windowWidth * 45, cssAnim(_$activePage, "Transform", "scale(" + e + ") translateX(" + f + "px) translateZ(" + g + "px) rotateY(" + h + "deg)"))
				}
				removeAllBlurPage()
			}, scroll.rightLRRotateEnd = function() {
				if(Math.abs(moveDistanceX) > Math.abs(moveDistanceY) && Math.abs(moveDistanceX) > 20) {
					moveDistanceX > 0 ? (rrxdebug && console.log("rightLRRotateEnd 11", moveDistanceX), _$currentPage[0].style.webkitTransformOrigin = "right", _$currentPage[0].style.webkitTransform = "translateX(" + -windowWidth + "px) translateZ(-" + windowWidth + "px) rotateY(-180deg) scale(0.2)", _$activePage[0].style.webkitTransform = "translateX(0) translateZ(0) rotateY(0) scale(1)", _$currentPage[0].style.zIndex = "0", _$activePage[0].style.zIndex = "1") : (rrxdebug && console.log("rightLRRotateEnd 22", moveDistanceX), _$currentPage[0].style.webkitTransformOrigin = "left", _$currentPage[0].style.webkitTransform = "translateX(" + windowWidth + "px) translateZ(-" + windowWidth + "px) rotateY(180deg) scale(0.2)", _$activePage[0].style.webkitTransform = "translateX(0) translateZ(0) rotateY(0) scale(1)", _$activePage[0].style.zIndex = "1", _$currentPage[0].style.zIndex = "0"), beforeScrollEndThenNext();
					var a = _$activePage.data("id");
					beforeScrollEndThenCopyrightEndPage(a), flipend()
				} else cssAnimation(_$currentPage[0].style, "Transition", "none"), cssAnimation(_$activePage[0].style, "Transition", "none"), _isDisableFlipPage = !1, cancelFlip()
			}, scroll.rightLRSlideMove = function() {
				needBlurPage = 0;
				var a, b;
				if(Math.abs(moveDistanceX) > Math.abs(moveDistanceY))
					if(moveDistanceX > 0) {
						if(_isDisableFlipPrevPage) return;
						if(!isContinuePrePage()) return void(_canContinue = !1);
						rrxdebug && console.log("moveDistanceX", moveDistanceX), isNext || isFirstTime ? (isNext = !1, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage = getActivePage("prev"), active(_$activePage), _$currentPage.css({
							opacity: .5
						}), _$activePage.css({
							opacity: .5
						}), cssAnim(_$activePage, "Transform", "translateX(0) translateZ(-500px)"), cssAnim(_$currentPage, "Transform", "translateX(0) translateZ(-500px)")) : (curr_tx = moveDistanceX, curr_tz = -500, cssAnim(_$currentPage, "Transform", "translateX(" + curr_tx + "px) translateZ(" + curr_tz + "px)"), _$currentPage.css({
							opacity: .5
						}), a = -windowWidth + moveDistanceX - 200, b = -500, cssAnim(_$activePage, "Transform", "translateX(" + a + "px) translateZ(" + b + "px)"), _$activePage.css({
							opacity: .5
						}))
					} else if(0 > moveDistanceX) {
					if(_isDisableFlipNextPage) return;
					if(isStopNextPage()) return void(_canContinue = !1);
					if(currentPageId === lastPageId && !isCopyrightPageEndShow && !isCopyrightPageEndGotoFirst && (console.log(isCopyrightPageEndShow), getCanShowCopyrightPageEnd())) return void copyrightPageEndShow();
					rrxdebug && console.log("moveDistanceX", moveDistanceX, moveDistanceY), !isNext || isFirstTime ? (isNext = !0, isFirstTime = !1, _$activePage && deactive(_$activePage), _$activePage = getActivePage("next"), _$activePage && deactive(_$activePage), active(_$activePage), _$currentPage.css({
						opacity: .5
					}), _$activePage.css({
						opacity: .5
					}), cssAnim(_$activePage, "Transform", "translateX(0) translateZ(-500px)"), cssAnim(_$currentPage, "Transform", "translateX(0) translateZ(-500px)")) : (curr_tx = moveDistanceX, curr_tz = -500, cssAnim(_$currentPage, "Transform", "translateX(" + curr_tx + "px) translateZ(" + curr_tz + "px)"), _$currentPage.css({
						opacity: .5
					}), a = windowWidth + moveDistanceX + 200, b = -500, cssAnim(_$activePage, "Transform", "translateX(" + a + "px) translateZ(" + b + "px)"), _$activePage.css({
						opacity: .5
					}))
				}
				removeAllBlurPage()
			}, scroll.rightLRSlideEnd = function() {
				var a;
				Math.abs(moveDistanceX) > Math.abs(moveDistanceY) && Math.abs(moveDistanceX) > 2 ? moveDistanceX > 0 ? (_$currentPage[0].style.webkitTransform = "translateX(" + 2 * windowWidth + "px) translateZ(-500px)", _$activePage[0].style.webkitTransform = "translateX(0) translateZ(-500px)", beforeScrollEndThenNext(), a = _$activePage.data("id"), beforeScrollEndThenCopyrightEndPage(a), setTimeout(function() {
					_$activePage[0].style.webkitTransform = "translateX(0) translateZ(-0)", _$currentPage.css({
						opacity: 1
					}), _$activePage.css({
						opacity: 1
					}), flipend()
				}, 450)) : (_$currentPage[0].style.webkitTransform = "translateX(" + -2 * windowWidth + "px) translateZ(-500px)", _$activePage[0].style.webkitTransform = "translateX(0) translateZ(-500px)", beforeScrollEndThenNext(), a = _$activePage.data("id"), beforeScrollEndThenCopyrightEndPage(a), setTimeout(function() {
					_$activePage[0].style.webkitTransform = "translateX(0) translateZ(-0)", _$currentPage.css({
						opacity: 1
					}), _$activePage.css({
						opacity: 1
					}), flipend()
				}, 450)) : (cssAnimation(_$currentPage[0].style, "Transition", "none"), cssAnimation(_$activePage[0].style, "Transition", "none"), _isDisableFlipPage = !1, cancelFlip())
			};
			var timer_goToPrePage = null,
				timer_goToNextPage = null,
				isFirstGotoEndPage = !0;
			base.outPage = function(a, b, c) {
				return outPage(a, b, c)
			}, base.parsePage = function(a) {
				return parsePage(a)
			}, base.parseElement = function(a) {
				return parseElement(a)
			}, base.playEleAnimated = function(a, b, c, d) {
				doEleAnimation(a, b, c, d)
			}, base.playElement = function(a, b) {
				return playElement(a, b)
			}, base.init = function(a, b, c, d, e, f, g, h, i, j) {
				function k() {
					void 0 !== _dataObj.init && _dataObj.init(), initBone(), initSwipe(), createPages(), 0 === q && 0 === currentPageId ? currentPageId = getFirstPageId() : q > 0 && (currentPageId = q), createProgress(), renderCopyright(), _isPreview && !_isSetting && $previewNotice.show(), pushStateForReadDepth(), void 0 !== _dataObj.loadingpage && void 0 !== _dataObj.loadingpage.title && $loadingpage.html(""), getFormUseGoods(function() {
						getAllPageInteractData(function() {
							loadExternalJsLibs(function() {
								createPageEventList(), showLoadingpage();
								var a = getLoadingImageList(currentPageId);
								setTimeout(function() {
									loading(a, function(a) {
										updateLoadingPercent(a)
									}, function() {
										setMusicPosition(), musicAutoPlay === !0 ? playMusic() : "" !== musicUrl && void 0 !== musicUrl && ($iconMusic.show(), setMusicIcon(musicStopIcon, "off"), $iconMusic.removeClass("music-play"), $iconMusic.removeClass("music-play-none"), $iconMusic.bind(clickEventType, function(a) {
											null === $music ? playMusic() : stopMusic()
										})), showToppage(), showFloorpage();
										var a = currentPageId,
											b = (renderPage(a), 0);
										for(regPageEndEvent(a), b = 0; b < _dataObj.pageList.length; b++) _dataObj.pageList[b].id !== a && (currentPageId = _dataObj.pageList[b].id, renderPage(_dataObj.pageList[b].id));
										if(_dataObj.dialogList)
											for(b = 0; b < _dataObj.dialogList.length; b++) renderDialog(_dataObj.dialogList[b].id);
										if(currentPageId = a, rrxdebug && console.info("_pagePluginCopyRight", _pagePluginCopyRight), -1 === $.inArray(currentPageId, _pagePluginCopyRight) && $pluginCopyright.hide(), _flipProgress === !0 && renderProgress(currentPageId, totalPages), setPageArrowIcon(currentPageId), "loadingpage" !== currentPageId && pageCodeLoad(currentPageId, apiHelper.getAppInstance()), $(".bottomm-text").hide(), $(".show-rrxiu-visit").hide(), $page = _$canvas.find(".page_" + currentPageId), _isEditing || setTimeout(function() {
												loadPluginEvent(currentPageId)
											}, 10), playPageByPageId(currentPageId), flip.init($pagelist, currentPageId), rrxdebug && console.log("init data-", currentPageId, lastPageId), currentPageId == lastPageId) showCopyright(!0, currentPageId), getCanShowCopyrightPageEnd() ? showArrow() : hideArrow();
										else {
											showCopyright(!1, currentPageId);
											var c = getPageObjById(currentPageId);
											c.stopFlip || showArrow()
										}
										isShowDanmu() && !rrxDanmuJump && (rrxdebug && console.info("initdata-isShowDanmu"), getCommentLikeCount(), getCommentList()), createFocusWechat(), createTopeMenu(), buyTplByMobile(), initSharePoster(), createSharePanel(), initSidleShare(), initSidleReport(), createCopyRightPage2(), _excuteElementEventByBrowser(), i && j && ("rrxiu" === j.copyrightFrom ? (console.log("isSetting is rrxiu"), copyrightPageEndShow()) : copyrightPageEndHideNoAnim())
									})
								}, 0)
							})
						})
					}), wxinit(location.href.split("#")[0])
				}
				if(_isSetting = i, $loadingpage = b.find(".pt-loadingpage"), "gql5ay" == c.guid && (_animationEngine = "css"), self = this, _host = a, void 0 !== f && null !== f && (_log = f), _flipProgress = !!c.flipProgress, void 0 === c.flipProgress && (_flipProgress = !0), void 0 !== d && (_isPc = d), void 0 !== g && (_isEditing = g), void 0 !== h && h && (_isPreview = !0), void 0 !== e && (_isWeixin = e), clickEventType = null !== document.ontouchstart ? "click" : "touchstart", _$canvas = b, _dataObj = pageObjectToArray(c), _dataObj = dialogObjectToArray(c), void 0 !== _dataObj.result && 0 !== _dataObj.result) {
					for(var l = 2; 100 >= l; l++) updateLoadingPercent(l);
					return void setTimeout(function() {
						2 == c.result ? (needCode(_dataObj.msg), wxinit(location.href)) : suspended(_dataObj.msg), $loadingpage.hide()
					}, 50)
				}
				if(!g && !i && wsiteInfo.copyright) {
					var m = wsiteInfo.copyright.from;
					("bottom" === m || "union" === m) && (_dataObj.copyright.from = m, "union" === m && (wsiteInfo.copyright.content && (_dataObj.copyright.content = wsiteInfo.copyright.content), wsiteInfo.copyright.url && (_dataObj.copyright.url = wsiteInfo.copyright.url)))
				}
				if(void 0 !== _dataObj.shareImageUrl && "" !== _dataObj.shareImageUrl && (_dataObj.shareImageUrl = handleImgUrl(_dataObj.shareImageUrl) + appConfig.shareImageThumb), void 0 !== _dataObj.llImageUrl && "" !== _dataObj.llImageUrl && (_dataObj.llImageUrl = handleImgUrl(_dataObj.llImageUrl) + appConfig.llImageThumb), checkWsiteHaveInductionPlugin() && (_dataObj.showReport = !0, _isAllPageShowReport = !0), _isAllPageShowReport || (_isAllPageShowReport = 1 === wsiteInfo.activityType), !_isSetting && !g && _dataObj.hasOwnProperty("cssList"))
					for(var n = h ? "preview" : "publish", o = 0; o < _dataObj.cssList.length; o++) Cool.util.loadCss(Cool.util.hostStamp(getWebFontHost() + "css/" + n + "/" + _dataObj.cssList[o]));
				if(_copyrightFrom = getCopyrightFrom(), pageListCount = _dataObj.pageList ? _dataObj.pageList.length : 0, _$canvas.on("touchmove", function(a) {
						a.preventDefault()
					}), initShareInfo(), void 0 !== _dataObj.flipWay && "" !== _dataObj.flipWay && (flipWay = _dataObj.flipWay), void 0 !== _dataObj.flipAnimation) {
					var p = [];
					p[110] = {
						enter: "1101",
						back: "1102"
					}, p[120] = {
						enter: "1201",
						back: "1202"
					}, p[130] = {
						enter: "1301",
						back: "1302"
					}, p[140] = {
						enter: "1401",
						back: "1402"
					}, p[150] = {
						enter: "1501",
						back: "1502"
					}, p[160] = {
						enter: "1601",
						back: "1602"
					}, p[170] = {
						enter: "1701",
						back: "1701"
					}, p[180] = {
						enter: "1801",
						back: "1801"
					}, p[190] = {
						enter: "1901",
						back: "1901"
					}, p[200] = {
						enter: "2001",
						back: "2001"
					}, p[210] = {
						enter: "2101",
						back: "2102"
					}, p[220] = {
						enter: "2201",
						back: "2201"
					}, p[230] = {
						enter: "2301",
						back: "2301"
					}, p[240] = {
						enter: "2401",
						back: "2401"
					}, p[250] = {
						enter: "2501",
						back: "2501"
					}, flipAnimation = p[_dataObj.flipAnimation], (void 0 === flipAnimation || null === flipAnimation) && (flipAnimation = p[110])
				}
				void 0 !== _dataObj.musicUrl && "" !== _dataObj.musicUrl && (musicUrl = apiHelper.getAppInstance().musicPreFix(_dataObj.musicUrl), hasBgMusic = !0), musicPlayIcon = void 0 !== _dataObj.musicPlayIcon && "" !== _dataObj.musicPlayIcon ? handleImgUrl(_dataObj.musicPlayIcon) : "", musicStopIcon = void 0 !== _dataObj.musicStopIcon && "" !== _dataObj.musicStopIcon ? handleImgUrl(_dataObj.musicStopIcon) : "", void 0 !== _dataObj.musicAutoPlay && "" !== _dataObj.musicAutoPlay && _dataObj.musicAutoPlay === !1 && (musicAutoPlay = _dataObj.musicAutoPlay), musicPosition = _dataObj.musicPosition || "", void 0 !== _dataObj.lastPageGoto && (lastPageGoto = "stop" == _dataObj.lastPageGoto ? "stop" : "continue"), initOfficialAccountsModeCookie();
				var q = Cool.util.getUrlParameterByName("startPageId") || 0,
					r = Cool.util.getUrlParameterByName("clickType");
				if("page" === r && q > 0) {
					var s = Cool.util.getUrlParameterByName("clickValue");
					"first" === s ? q = 0 : "next" === s ? q = getNextPageIdObjById(q) : "pre" === s ? q = getPrePageIdObjById(q) : s > 0 && (q = s), console.log("page", q)
				} else if(q > 0) {
					var t = getPageObjById(q);
					t || (q = 0)
				}
				k()
			}, base.playPage = function(a, b) {
				return playPage(a, b)
			};
			var crRollInterval = null,
				ideaCount = 0;
			base.isLastPageGotoFirstPage = function() {
				return "continue" == lastPageGoto ? !0 : !1
			}, base.isLastPage = function() {
				return getPageCount() > 1 ? currentPageId == lastPageId : !0
			}, base.isFirstPage = function() {
				return getPageCount() > 1 ? currentPageId == firstPageId : !0
			}, base.nextPage = function() {
				goToNextPage()
			}, base.prePage = function() {
				goToPrePage()
			}, base.getPageCount = function() {
				return getPageCount()
			}, base.getCurrentPageId = function() {
				return currentPageId
			}, base.setIsEditing = function(a) {
				_isEditing = a
			}, base.getAllowFlip = function() {
				return allowFlipCurrentPage()
			}, base.setPageThumb = function(a) {
				_isPageThumb = a
			}, base.clearAllCustomIntervals = function() {
				clearAllCustomIntervals()
			}, base.getPrefixCss = function(a, b) {
				return getPrefixCss(a, b)
			}, base.gotoPage = function(a) {
				goToPageById(a)
			}, base.getApiHelper = function() {
				return apiHelper.getAppInstance()
			};
			var apiHelper = {
					appInstance: null,
					getAppInstance: function() {
						return null === this.appInstance && (this.appInstance = new this.app), this.appInstance
					},
					app: function() {
						function a(a, d, e) {
							if(c(a)) return !0;
							var f = a(d, e);
							return b(f) ? !0 : f
						}

						function b(a) {
							var b = a || !0;
							return b === !0
						}

						function c(a) {
							var b = void 0 === a;
							return b
						}
						this.test = function() {
							console.log("API")
						}, this.getFlipWay = function() {
							return flipWay
						}, this.getPluginDomain = function(a, b) {
							return Cool.util.getPluginDomain(a, b)
						}, this.parsePluginTheme = function(a, b, c) {
							return Cool.util.parsePluginTheme(a, b, c)
						}, this.pluginPreFix = function(a) {
							if("" === a || null === a || void 0 === a || a.constructor !== String) return a;
							for(var b = ["http://plugin.weplus.me/", "../assets/plugin/"], c = 0; c < b.length; c++)
								if(a.indexOf(b[c]) > -1) return a.replace(b[c], appConfig.pluginDomainFormat);
							return a
						}, this.hostStamp = function(a) {
							return Cool.util.hostStamp(a)
						}, this.loadImage = function(a, b) {
							Cool.util.loadImage(a, b)
						}, this.getServiceHost = function() {
							return getServiceHostIfHttps()
						}, this.getInteractServiceHost = function() {
							return getInteractServiceHostIfHttps()
						}, this.urlAuditVisit = function(a) {
							if(a) {
								var b = encodeURIComponent(a),
									c = this.getServiceHost() + "redirect?url=" + b + "&wg=" + _dataObj.guid,
									d = document.createElement("a");
								d.setAttribute("href", c), d.setAttribute("target", "_parent"), d.click()
							}
						}, this.getDataHost = function() {
							return getDataHost()
						}, this.getRrxiuFontCssHost = function() {
							return getRrxiuFontCssHost()
						}, this.getLibHost = function() {
							return getLibHost()
						}, this.getWebFontHost = function() {
							return getWebFontHost()
						}, this.getVrHost = function() {
							return getVrHost()
						}, this.musicPreFix = function(a) {
							if(!a) return a;
							if(appConfig.dev) return appConfig.dataHost + a;
							var b = appConfig.dataHost;
							wsiteInfo && wsiteInfo.datacdn && (b = wsiteInfo.datacdn, b = wsiteInfo.flhtps || wsiteInfo.httpsEnabled ? "https://" + wsiteInfo.datacdn + "/" : "http://" + wsiteInfo.datacdn + "/");
							var c = "http://data.weplus.me/";
							if(a.indexOf(c) > -1 ? a = a.replace(c, b) : a.indexOf(appConfig.dataHost) > -1 ? a = a.replace(appConfig.dataHost, b) : -1 === a.indexOf("http://") && -1 === a.indexOf("https://") && (a = b + a), wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return a.replace("http://", "https://");
							var d = a,
								e = Cool.util.isSpecDomain(d);
							if(e) {
								var f = Cool.util.getUrlSubDomain(d);
								f && -1 === d.indexOf("://ns") && (d = d.replace("://" + f, "://ns" + f), d = d.replace("https://", "http://"))
							}
							return d
						}, this.getImageHost = function() {
							return getImageHost()
						}, this.getViewHost = function() {
							return getViewHost()
						}, this.getWsiteGuid = function() {
							return _dataObj.guid
						}, this.isEditing = function() {
							return _isEditing
						}, this.getElement = function(a, b, c) {
							var d = null;
							b = b || 0, c = c === !0 ? !0 : !1, 0 === b && (b = currentPageId);
							var e = c ? ".pt-page-effect-box-" : ".element_";
							return d = _$canvas.find(".page_" + b + " " + e + a)
						}, this.getPage = function(a) {
							a = a || 0, 0 === a && (a = currentPageId);
							var b = _$canvas.find(".page_" + a);
							return b
						}, this.getPageCount = function() {
							return pageListCount
						}, this.getCurrentPageId = function() {
							return currentPageId
						}, this.getWsiteCanvas = function() {
							return _$canvas
						};
						var d = {};
						this.setGlobal = function(a, b) {
							d[a] = b
						}, this.getGlobal = function(a) {
							return d[a]
						}, this.loadJs = function(a, b) {
							Cool.util.loadJs(a, b)
						}, this.getUrlParameterByName = function(a) {
							return Cool.util.getUrlParameterByName(a)
						}, this.getBrowserUrl = function(a, b, c) {
							return Cool.util.getBrowserUrl(a, b, c)
						}, this.setLoadingDelay = function(a) {
							void 0 !== _dataObj.loadingpage && (_dataObj.loadingpage.delay = a)
						}, this.setStartPage = function(a) {
							void 0 !== a && (currentPageId = a)
						}, this.preloadAllResource = function(a) {
							_preloadAllResource = a ? !0 : !1
						}, this.loadCss = function(a) {
							Cool.util.loadCss(a)
						}, this.addCss = function(a) {
							Cool.util.loadCssByStyle(a)
						}, this.getUrlParamByName = function(a) {
							return Cool.util.getUrlParameterByName(a)
						}, this.isOfficialAccountsMode = function() {
							return isOfficialAccountsMode()
						}, this.getUrlWithOfficialAccounts = function(a) {
							var b = this.getUrlWithGuid(a);
							return $hasQ = b.indexOf("?"), $hasQ > -1 ? b + "&mode=official_accounts" : b + "/?mode=official_accounts"
						}, this.getUrlWithGuid = function(a) {
							var b = appConfig.viewDomainFormat.replace("{guid}", a);
							return rrxiuUser.custDomain && "" !== $.trim(rrxiuUser.custDomain) ? b = getProtocol(!1) + "://" + rrxiuUser.custDomain + "/v/" + a : rrxiuWsite.transmitDomain && "" !== $.trim(rrxiuWsite.transmitDomain.domain) && (b = getProtocol(rrxiuWsite.transmitDomain.httpsEnabled) + "://" + rrxiuWsite.transmitDomain.domain + "/?" + PNAME_WGUID + "=" + a), b
						}, this.getFocusUrl = function(a, b) {
							var c = this.getUrlWithGuid(a);
							return 2 === b ? c : ($hasQ = c.indexOf("?"), $hasQ > -1 ? c + "&mode=official_accounts" : c + "/?mode=official_accounts")
						}, this.getCanFocusWechat = function() {
							return getCanFocusWechat()
						}, this.getCanFocusByWay = function(a) {
							return getCanFocusByWay(a)
						}, this.getCanRemoveWaterMark = function() {
							return getCanRemoveWaterMark()
						}, this.getCanShowShareTips = function() {
							return getCanShowShareTips()
						}, this.isPc = function() {
							return _isPc
						}, this.showPluginCopyRight = function(a, b) {}, this.hidePluginCopyRight = function() {}, this.isShowPluginCopyright = function() {
							return !("customer" === _copyrightFrom || "na" === _copyrightFrom || "union" === _copyrightFrom)
						}, this.getCustomerCopyrightInfo = function() {
							return "na" === _copyrightFrom || "union" === _copyrightFrom ? !1 : "customer" === _copyrightFrom ? _dataObj.copyright : !0
						}, this.showSingleReport = function() {
							if(_dataObj.showReport || "customer" !== _copyrightFrom && "na" !== _copyrightFrom) {
								hideEffect($copyright);
								var a = _$canvas.find(".show-plugin-report").css("display");
								if("none" === a) {
									var b = _$canvas.find(".pt-inner .show-vr-plugin-report");
									0 === b.length && (b = $('<a href="javascript:void(0)" class="show-vr-plugin-report">举报</a>'), _$canvas.find(".pt-inner").append(b), registerReportEvent(b)), showEffect(b)
								}
							}
						}, this.hideSingleReport = function() {
							hideEffect(_$canvas.find(".pt-inner .show-vr-plugin-report"))
						}, this.showShareDialog = function(a) {
							void 0 !== a && "" !== a ? ($sharepage.html(a), showSharepage()) : showSharePanel()
						}, this.hideShareDialog = function() {
							hideSharepage()
						}, this.updateShareInfo = function(a, b, c, d) {
							var e = !1,
								f = !1;
							a && (e = !0, shareTitle = a, Cool.share.setTitle(a)), b && (e = !0, shareDesc = b, Cool.share.setDesc(b)), c && (e = !0, shareImageUrl = c, Cool.share.setImage(c)), d && (e = !0, shareUrl = d, f = !0), f, setWxShareInfo()
						}, this.updateShareInfoWhenPushStateCalled = function(a, b, c, d) {
							var e = !1;
							a && (e = !0, shareTitle = a, Cool.share.setTitle(a)), b && (e = !0, shareDesc = b, Cool.share.setDesc(b)), c && (e = !0, shareImageUrl = c, Cool.share.setImage(c)), d && (e = !0, shareUrl = d), setWxShareInfoWithUrl()
						}, this.getShareInfo = function() {
							return {
								title: shareTitle,
								desc: shareDesc,
								image: shareImageUrl,
								url: shareUrl
							}
						}, this.resetShareInfo = function() {
							shareTitle = _dataObj.title, Cool.share.setTitle(shareTitle), shareDesc = _dataObj.describe, Cool.share.setDesc(shareDesc), shareImageUrl = _dataObj.shareImageUrl, Cool.share.setImage(shareImageUrl), shareUrl = location.href, setWxShareInfo()
						}, this.delayPlayFlag = !1, this.delayPlayBackgroundMusic = function(a) {
							this.delayPlayFlag = !0;
							var b = this;
							setTimeout(function() {
								b.delayPlayFlag && b.playBackgroundMusic()
							}, a || 2e3)
						}, this.playBackgroundMusic = function() {
							$iconMusic.show(), playMusic()
						}, this.stopBackgroundMusic = function(a) {
							this.delayPlayFlag = !1, a && $iconMusic.hide(), stopMusic()
						}, this.getBackgroundMusicState = function() {
							return null !== $music ? !$music.paused : !1
						}, this.getAllowFlip = function() {
							return base.getAllowFlip()
						}, this.gotoPrePage = function() {
							triggerPluginLeaveEvent(currentPageId), goToPrePage()
						}, this.gotoNextPage = function() {
							triggerPluginLeaveEvent(currentPageId), goToNextPage()
						}, this.gotoPage = function(a, b) {
							-1 !== a && (triggerPluginLeaveEvent(currentPageId), goToPageById(a))
						}, this.swipe = function(b, d) {
							if(c(d)) return console.error("swipe:参数不正确");
							switch(b) {
								case "up":
									_dataObj.swipeCustomUp = d;
									break;
								case "down":
									_dataObj.swipeCustomDown = d;
									break;
								case "left":
									_dataObj.swipeCustomLeft = d;
									break;
								case "right":
									_dataObj.swipeCustomRight = d
							}
							_dataObj.swipe = function(b, c) {
								switch(c) {
									case "up":
										return a(_dataObj.swipeCustomUp, b, c);
									case "down":
										return a(_dataObj.swipeCustomDown, b, c);
									case "left":
										return a(_dataObj.swipeCustomLeft, b, c);
									case "right":
										return a(_dataObj.swipeCustomRight, b, c)
								}
							}
						}, this.startShake = function(a) {
							void 0 !== a && null !== a && startShake(a)
						}, this.stopShake = function(a) {
							void 0 !== a && null !== a && stopShake(a)
						}, this.bindEvent = function(a, b, d, e) {
							var f = c(a),
								g = c(b);
							if(f || g) return console.error("bindEvent:参数不正确");
							if(void 0 === d || "" === d || "click" === d) a.unbind().bind(clickEventType, function() {
								reloveTwoClickByISroll() && b()
							});
							else if("shake" === d || d.indexOf("shake") > -1) e = void 0 === e ? !0 : e, startShake(d), window.addEventListener(d, function(a) {
								stopShake(d), b(a), e && setTimeout(function() {
									startShake(d)
								}, 2e3)
							}, !1);
							else if("enter" === d) console.error("enter:此插件暂不支持");
							else {
								var h;
								switch(d) {
									case "swipeRight":
										h = new rrxTouch(a, {
											swiperight: b
										});
										break;
									case "swipeLeft":
										h = new rrxTouch(a, {
											swiperleft: b
										});
										break;
									case "swiperUp":
										h = new rrxTouch(a, {
											swiperup: b
										});
										break;
									case "swiperDown":
										h = new rrxTouch(a, {
											swipedown: b
										})
								}
							}
						}, this.stopFlip = function() {
							_allowTempFlip = _allowFlip, _allowFlip = !1, hideArrow()
						}, this.resetFlip = function(a) {
							a = void 0 === a ? !1 : a, _allowFlip = a ? _allowTempFlip : !0, commpletedPageEffect(currentPageId), showArrow(), triggerPageEvent(currentPageId, "sysResetFlipCallBack")
						}, this.commpletedPageEffect = function(a) {
							commpletedPageEffect(a)
						}, this.showFlipArrow = function() {
							showArrow()
						}, this.hideFlipArrow = function() {
							hideArrow()
						}, this.isWeixin = function() {
							return _isWeixin
						}, this.triggerEvent = function(a, b) {
							triggerPageEvent(currentPageId, a, b)
						}, this.createEvent = function(a, b, c) {
							var d = c || currentPageId,
								e = _dataObj.pageEventList[d];
							(void 0 === e || null === e) && (_dataObj.pageEventList[d] = [], e = _dataObj.pageEventList[d]), e.push({
								name: a,
								type: "customEvent",
								callback: b
							})
						}, this.getElements = function(a, b) {
							var c = [];
							if(void 0 === a || 0 === a.length) return c;
							b = b || 0, 0 === b && (b = currentPageId);
							var d = null;
							for(i = 0; i < a.length; i++) d = _$canvas.find(".page_" + b + " .element_" + a[i]), d && c.push(d);
							return c
						}, this.animation = function(a, b, c) {
							var d = 0,
								e = 1,
								f = 1,
								g = 0;
							c && (d = c.delay || 0, e = c.duration || 1, f = c.repeat || 1, g = c.repeatDelay || 0), (0 === d || _isEditing) && (d = 0), "css" == _animationEngine ? CssAnimationEngine.animation(a, b, d, e, f, g, _isEditing) : JsAnimationEngine.animation(a, b, d, e, f, g)
						}, this.setToBottom = function(a, b) {
							isNaN(a) || (a = this.getElement(a, currentPageId)), a.css("top", "auto"), a.css("bottom", b)
						}, this.getiScroll = function(a, b) {
							a = a || currentPageId;
							var c = void 0 === b,
								d = null;
							return $.each(iScrollInstances, function(e, f) {
								if(c) {
									if(f.pageId === a) return d = f.instance, !1
								} else if(f.pageId === a && f.elemId === b) return d = f.instance, !1
							}), d
						}, this.scaleElement = function(a) {
							c(a) || handleScaleIfSmallScreen(a)
						}, this.checkIsLogin = function() {
							var a = $.cookie("wp_moblie_user");
							return void 0 === a ? null : a
						}, this.mobileLogin = function(a, b, c) {
							var d = /^(\S)+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
								e = {
									result: 0,
									msg: ""
								};
							if(d.test(a))
								if(b.length < 6) e.msg = "密码至少6个字符", e.result = 1, c(e);
								else {
									var f = a.split("@")[0],
										g = {
											name: f,
											email: a,
											password: b,
											rememberMe: 1,
											via: "jquery"
										};
									$.ajax({
										url: getServiceHostIfHttps() + "auth/mobileLogin",
										type: "GET",
										dataType: "jsonp",
										data: g,
										jsonp: "jsonp_callback"
									}).done(function(a) {
										var b = new Date,
											d = new Date(b.valueOf() + 3e5);
										$.cookie("wp_moblie_user", "1", {
											expires: d
										}), c(a)
									}).fail(function(a) {
										c(a)
									})
								}
							else e.msg = "输入的邮箱格式不正确！", e.result = 1, c(e)
						}, this.getWsiteList = function(a, b, c) {
							$.ajax({
								url: getServiceHostIfHttps() + "wsite/getList?page=" + a + "&limit=" + b,
								xhrFields: {
									withCredentials: !0
								}
							}).done(function(a) {
								c(a)
							}).fail(function(a) {
								c({
									result: 1,
									msg: "未登录"
								})
							})
						};
						var e = function(a) {
							function b() {
								return {
									id: "d40ead917f52d7f765f690eb3f9ce984",
									nickname: "人人秀",
									headimgurl: "https://assets.rrxh5.cc/www/images/no_head.jpg"
								}
							}

							function c(a, b, e, h) {
								var i = (new Date, "GetWxUserById");
								"strong" === e && (i = "GetWxUserByIdStrong");

								var j = _host + "wechat/" + i + "?uid=" + b + "&wsiteGuid=" + o;
								$.ajax({
									url: j,
									xhrFields: {
										withCredentials: !0
									},
									dataType: "json",
									success: function(b) {
										if(0 === b.result) p = b.data, l(b.data.id), g(), q = !0, void 0 !== a && a(p);
										else if(3 === b.result) m(), f(), setTimeout(function() {
											c(a, "", e)
										}, d());
										else {
											m();
											var i = "",
												j = location.href;
											h && (j = Cool.util.appendUrlPara(j, h)), i = "strong" === e ? _host + "wechat/auth?redirect=" + encodeURIComponent(j) + "&wsiteGuid=" + o + "&level=strong" : _host + "wechat/AuthNo?redirect=" + encodeURIComponent(j) + "&wsiteGuid=" + o, window.location.replace(i), setTimeout(function() {
												window.location.replace(i)
											}, 1e3)
										}
									},
									error: function(a, b, c) {
										f(), console.error(a)
									}
								})
							}

							function d() {
								return 1e3 * Math.floor(9 * Math.random() + 3)
							}

							function e() {
								$("body").append($authDialog)
							}

							function f() {
								(null === $authDialog || void 0 === $authDialog) && e(), $authDialog.show()
							}

							function g() {
								$authDialog.remove()
							}

							function h(a) {
								return "wechat_openid" + a
							}

							function i() {
								var a = hex_md5(o + appConfig.version),
									b = Cool.cookie.get(h(a));
								return("" === $.trim(b) || null === b || void 0 === b) && (b = ""), b
							}

							function j() {
								var a = window.location.host,
									b = a.indexOf(".");
								return a.substr(b)
							}

							function k() {
								return "strong" === a ? 1 / 24 : .5
							}

							function l(a) {
								var b = hex_md5(o + appConfig.version),
									c = j(),
									d = k();
								Cool.cookie.setWithoutTime(h(b), a, d, c)
							}

							function m() {
								var a = hex_md5(o + appConfig.version),
									b = j(),
									c = -100;
								Cool.cookie.setWithoutTime(h(a), "", c, b)
							}

							function n(a, b) {
								return Math.floor(a + Math.random() * (b - a))
							}
							if(_dataObj) {
								var o = _dataObj.guid,
									p = {
										id: "",
										nickname: "",
										headimgurl: ""
									},
									q = !1;
								this.auth = function(d, f) {
									if(_isWeixin === !1) return p = b(), d(p), !0;
									if(e(), wsiteInfo && wsiteInfo.authBehind && wsiteInfo.wxauthedInfo) p = wsiteInfo.wxauthedInfo, q = !0, d(p);
									else {
										var g = i();
										c(d, g, a, f)
									}
								};
								var r = '<div style="display:none;z-index:3000;position: fixed;top:0;left:0;bottom:0;right:0;background-color:rgb(240, 239, 245);text-align:center;"><img src="../images/weixin_auth.png"style="margin-top:100px;text-align:center;margin-left:auto;margin-right:auto;width:80px;"><div style="text-align:center;margin-top:40px;color:#666;">正在进行微信授权</div></div>';
								return $authDialog = $(r), this.getAuthedInfo = function() {
									return _isWeixin === !1 ? p = b() : wsiteInfo && wsiteInfo.authBehind && wsiteInfo.wxauthedInfo ? (q = !0, wsiteInfo.wxauthedInfo) : p
								}, this.getIdentifyId = function() {
									var a = this.getAuthedInfo();
									return q ? a.id : this.getLocalIdentify()
								}, this.getLocalIdentify = function() {
									var a = j();
									a.indexOf(".") < 0 && (a = location.host);
									var b = hex_md5(a + "RRXIUIDENTIFYID"),
										c = Cool.cookie.get(b);
									if(!c) {
										var d = [0, 3, 2, 4, 1, 9, 6, 5, 7];
										c = "";
										for(var e = 0; 6 > e; e++) c += d[n(0, d.length - 1)];
										c += (new Date).getTime(), Cool.cookie.setWithoutTime(b, c, null, a)
									}
									return c
								}, this
							}
						};
						this.weixin = new e, this.weixinStrong = new e("strong");
						var f = function() {
							function a(a, c) {
								var d = {
									focusWay: 1,
									openId: a
								};
								b(d, c)
							}

							function b(a, b) {
								var d = 1;
								void 0 !== a.focusWay && null !== a.focusWay && (d = a.focusWay);
								var e = _host + "focus/add",
									f = {
										wsiteGuid: c,
										way: d,
										openId: a.openId
									};
								$.ajax({
									url: e,
									type: "POST",
									data: f,
									dataType: "json",
									xhrFields: {
										withCredentials: !0
									}
								}).done(function(a) {
									b && b(a)
								}).fail(function(a) {
									console.error(a)
								})
							}
							if(_dataObj) {
								var c = _dataObj.guid;
								return {
									add: a,
									handle: b
								}
							}
						};
						return this.wxFocus = new f, this.checkWeixinAlert = checkWeixinAlert, this.log = function(a) {
							void 0 !== _log && void 0 !== a && "" !== a && _log.logTag(a)
						}, this.interactHit = function(a, b) {
							b = b || "", void 0 !== _log && void 0 !== a && "" !== a && _log.interactHit(a, b)
						}, this.closeWsite = function(a) {
							if(void 0 !== _log) {
								var b = Math.round(((new Date).getTime() - window.rrxOpenWsiteTime) / 1e3);
								_log.closeWsite(window.userReadDepth, b, a)
							} else a()
						}, this.hideTopIcon = function() {}, this.resetTopIcon = function() {}, this.isFirstPage = function() {
							return base.isFirstPage()
						}, this.checkIsOnePageByPlugin = function() {
							var a = _dataObj.pageList;
							2 === a.length && a[1].id === _copyrightId && ($progress.css("display", "none"), this.stopFlip())
						}, this.getCopyrightFrom = function() {
							return _copyrightFrom
						}, this.insertDanma = function(a, b) {
							if($.each(a, function(a, b) {
									DM_Comment_List.unshift(b)
								}), b) {
								var c = [];
								$.each(DM_Comment_List, function(a, b) {
									b.source && "plugin" === b.source && c.push(b)
								}), Danmaku.refresh(c)
							} else Danmaku.refresh(DM_Comment_List)
						}, this.clearSysteimDanma = function() {
							DM_Comment_List = [], Danmaku.refresh(DM_Comment_List)
						}, this.startDanma = function() {
							Danmaku.start()
						}, this.stopDanma = function() {
							Danmaku.stop()
						}, this.getDanmuConfig = function() {
							return _dataObj.danmuLike
						}, this.initDanmu = function() {
							console.log("coolApi.initDanmu();	"), initDanmu()
						}, this.forceOpenDanmu = function() {
							forceOpenDanmu = !0
						}, this.setDanmuButtonShow = function(a) {
							danmuButtonShow = a
						}, this.setOnlyPluginDanmu = function(a) {
							onlyPluginDanmu = a
						}, this.setInitDanmuAnimateShow = function(a) {
							danmuAnimateShow = a
						}, this.setDanmuAnimateShow = function(a) {
							void 0 !== _dataObj && null !== _dataObj && void 0 !== _dataObj.danmuLike && null !== _dataObj.danmuLike && void 0 !== _dataObj.danmuLike.show && null !== _dataObj.danmuLike.show && (_dataObj.danmuLike.show = void 0 === a || null === a ? !1 : a)
						}, this.showPluginFocus = function(a, b) {
							showPluginFocus(a, b)
						}, this.hidePluginFocus = function() {
							hidePluginFocus()
						}, this.dialogOpen = function(a) {
							dialogOpen(currentPageId, a)
						}, this.dialogClose = function(a) {
							dialogClose(a)
						}, this.initDialogCloseEvent = function(a) {
							this.createEvent("sys_dialogClose", a)
						}, this.removeImgPreFix = function(a) {
							return removeImgPrefix(a)
						}, this.handleImgUrl = function(a) {
							return handleImgUrl(a)
						}, this.getMainCanvas = function() {
							return _$canvas
						}, this.getAuthBehind = function() {
							return wsiteInfo && wsiteInfo.authBehind ? !0 : !1
						}, this.getGameHelpJsByVersion = function(a) {
							a = a || 0;
							var b = "";
							return b = 20 === parseInt(a) ? getLibHost() + "weplus/pluginGameHelper-3.0" : getLibHost() + "weplus/pluginGameHelper-2.0", appConfig.dev !== !0 && appConfig.testDev !== !0 && (b += ".min"), b += ".js"
						}, this.getImgGroupInstance = function(a) {
							var b = null;
							return $.each(noAutoPlayImgGroupInstances, function(c, d) {
								parseInt(d.elemId) == parseInt(a) && (b = d.instance)
							}), b
						}, this.QQMapLoadCallBack = function(a) {
							qqMapLoadCallBack(function(b) {
								a(b)
							})
						}, this.checkReginLimit = function(a, b, c, d) {
							if(a = a || "", "" === a) return void b(0);
							if(!this.checkWeixinAlert()) return void b(8, "请在微信里打开!");
							var e = this,
								f = {
									NONE: "NONE",
									REGION: "REGION",
									EXTENT: "EXTENT"
								},
								g = "";
							a = replaceAll(a, "-", "");
							var h = parseRegionLimitString(a);
							showRRXProcess("加载中..."), qqMapLoadCallBack(function(a) {
								return appConfig.dev ? (hideRRXProcess(), void b(0)) : 0 !== a && "0" !== a ? (hideRRXProcess(), g = "地图服务加载失败，请刷新手机重试！", d || e.showErrorInfo(g, c, !0), void b(20, g)) : void wx.getLocation({
									type: "wgs84",
									success: function(a) {
										var i = a.latitude,
											j = a.longitude,
											k = 0;
										if(console.log("region", h), h.type === f.REGION) {
											var l = new qq.maps.Geocoder({
													complete: function(a) {
														hideRRXProcess();
														var f = a.detail.address;
														console.log("getLocationSuccess", a), k = 5;
														for(var i = h.regions, j = 0; j < i.length; j++)
															if(f.indexOf(i[j]) > -1) {
																k = 0;
																break
															}
														if(5 === k) {
															var l = i.join(",");
															g = "本次活动只限以下地区参与：" + l + "。", d || e.showErrorInfo(g, c, !0)
														}
														b(k, g)
													},
													error: function(a) {
														hideRRXProcess(), console.log("error", a), g = "服务请求失败，请稍后再试！", d || e.showErrorInfo(g, c, !0), b(4, g)
													}
												}),
												m = new qq.maps.LatLng(i, j);
											l.getAddress(m)
										} else if(h.type === f.EXTENT) {
											hideRRXProcess();
											var n = new qq.maps.LatLng(i, j),
												o = new qq.maps.LatLng(h.lat, h.lng),
												p = qq.maps.geometry.spherical.computeDistanceBetween(n, o),
												q = 1e3 * h.radius;
											console.log("dis", p), console.log("radius", q), console.log("c", n), console.log("d", o), p > q && (k = 3, console.log("error", a), g = "本次活动只限以下范围参与：" + h.address + "（" + h.radius + "公里以内）。", d || e.showErrorInfo(g, c, !0)), b(k, g)
										} else hideRRXProcess(), b(k, g)
									},
									cancel: function(a) {
										hideRRXProcess(), console.log("cancel", a), g = "当前活动需要进行位置授权才能参加", b(2, g)
									},
									fail: function(a) {
										hideRRXProcess(), g = "位置定位失败，请稍后再试！", d || e.showErrorInfo(g, c, !0), b(1, g)
									}
								})
							})
						}, this.getFormatRegionLimit = function(a) {
							a = a || "";
							var b = {
									NONE: "NONE",
									REGION: "REGION",
									EXTENT: "EXTENT"
								},
								c = parseRegionLimitString(a);
							return c.type === b.REGION ? c.regions.join(",") : c.type === b.EXTENT ? c.address : ""
						}, this.getMyActivePrizeList = function(a, b, c, d) {
							function e(a, b) {
								for(var c = '<div class="prize-center">{{each list as m j}}<div class="common-box prize-box"><div class="prize-small-icon-box"><img src="{{imageHost+m.prizeIcon}}"></div><div class="prize-info"><div class="prize-title">{{m.prizeName}}</div><div class="gold-time md-min-size">{{m.createTime}}</div></div><div class="prize-state prize-state-{{m.state}}  prize-type-{{m.prizeType}}" data-id="{{m.id}}"><span style="vertical-align:middle">{{m.stateName}} {{if m.state==2}} <span><i class="ticket-img"></i></span> {{/if}}</span></div></div>{{/each }} {{if list.length==0}}<div class="no-content">暂无中奖纪录</div>{{/if}}</div>\n', e = 0; e < a.length; e++) 6 == a[e].prizeType && 1 == a[e].state && (a[e].stateName = "前往兑换"), 2 == a[e].prizeType && 1 == a[e].state && (a[e].stateName = "查看券码"), a[e].prizeIcon = removeImgPrefix(a[e].prizeIcon);
								var h = compileHtml(c, {
										list: a,
										imageHost: g.getImageHost()
									}),
									i = {
										content: h
									};
								window.showRRXCommonDialog(g, i, d), setTimeout(function() {
									var c = $(".pt-inner .rrx-common-dialog"),
										e = c.find(".prize-center .prize-state-2");
									e.off(clickEventType).on(clickEventType, function(a) {
										a.stopPropagation(), a.preventDefault();
										var b = $(this).data("id");
										f(b)
									});
									var h = c.find(".prize-center .prize-type-6");
									h.off(clickEventType).on(clickEventType, function(c) {
										c.stopPropagation(), c.preventDefault();
										var d = $(this).data("id"),
											e = getIndexByArray(a, d, "id");
										if(e > -1) {
											var f = a[e];
											f && 1 == f.state && (b ? window.location.href = b : winAlert("积分商城已关闭，请联系商家！"))
										}
									});
									var i = c.find(".prize-center .prize-type-2");
									i.off(clickEventType).on(clickEventType, function(b) {
										b.stopPropagation(), b.preventDefault();
										var c = $(this).data("id"),
											e = getIndexByArray(a, c, "id");
										if(e > -1) {
											var f = a[e];
											if(f && 1 == f.state) {
												var h = {
													name: f.prizeName,
													image: g.getImageHost() + f.prizeIcon,
													detail: f.ticketMessage
												};
												showRRXPrizeDetailDialog(g, h, d)
											}
										}
									})
								}, 1e3)
							}

							function f(a) {
								showRRXProcess("加载中..."), $.ajax({
									url: h + "/generalPrize/getOpenCode",
									type: "GET",
									data: {
										activeGuid: b,
										wxOpenId: c,
										winId: a
									},
									dataType: "json",
									xhrFields: {
										withCredentials: !0
									}
								}).then(function(a) {
									if(0 === a.result) {
										if(a.data && a.data.openCode) {
											var b = a.data;
											2 === parseInt(b.activeStyle) ? showRRXWxPuplicDialog(g, b, d) : showRRXAfterOnlineDialog(g, b, d)
										}
									} else winAlert(a.msg);
									hideRRXProcess()
								}, function(a) {
									hideRRXProcess()
								})
							}
							if("" === c || void 0 === c) return void winAlert("请先进行微信授权！");
							var g = this;
							showRRXProcess("加载中...");
							var h = this.getInteractServiceHost(),
								i = {
									wsiteGuid: a,
									activeGuid: b,
									wxOpenId: c
								};
							$.ajax({
								url: h + "/generalPrize/getMyPrizeList",
								type: "GET",
								data: i || {},
								dataType: "json",
								xhrFields: {
									withCredentials: !0
								}
							}).then(function(a) {
								if(0 === a.result) {
									var b = a.data.rows || [];
									e(b, a.data.uniqueCenterUrl)
								} else winAlert(a.msg);
								hideRRXProcess()
							}, function(a) {
								hideRRXProcess()
							})
						}, this.showErrorInfo = function(a, b, c) {
							b = b || "#fc5711", c && (a = "<div style='font-size: 28px;text-align: left;'>" + a + "</div>"), window.showRRXPrizeInfoDialog(this, a, b)
						}, this
					}
				},
				$wePluginClient = function() {
					function a(a, b) {
						void 0 === window.wePluginClient && (window.wePluginClient = []);
						for(var c = window.wePluginClient.length - 1; c >= 0; c--)
							if(window.wePluginClient[c].token == a && window.wePluginClient[c].version == b) return window.wePluginClient[c];
						return null
					}

					function b(b, c, d, f) {
						var g = b.content.token,
							h = b.content.version,
							i = a(g, h);
						if(null !== i) i.init && new i.init(b, c, apiHelper.getAppInstance(), d, f);
						else {
							var j = Cool.util.getPluginDomain(g, h) + "index.js";
							require(j, function() {
								e(g, h, window.wePluginInit, window.wePluginLoad, window.wePluginPreLoad);
								var i = a(g, h);
								null !== i ? i.init && new i.init(b, c, apiHelper.getAppInstance(), d, f) : winAlert("加载插件失败")
							})
						}
					}

					function c(b, c) {
						rrxdebug && console.log("loadPlugin");
						var d = a(c.content.token, c.content.version);
						null !== d && d.load && new d.load(b, c)
					}

					function d(b) {
						rrxdebug && console.log("preLoadPlugin");
						var c = a(b.content.token, b.content.version);
						null !== c && c.preload && new c.preload(b, apiHelper.getAppInstance())
					}

					function e(b, c, d, e, f, g) {
						rrxdebug && console.log("addPlugin"), void 0 === window.wePluginClient && (window.wePluginClient = []);
						var h = a(b, c);
						null === h && window.wePluginClient.push({
							token: b,
							version: c,
							init: d,
							load: e,
							preload: f,
							leave: g
						})
					}

					function f(b, c) {
						rrxdebug && console.log("leavePlugin");
						var d = a(c.content.token, c.content.version);
						null !== d && d.leave && new d.leave(b, c, apiHelper.getAppInstance())
					}
					return {
						render: b,
						load: c,
						preload: d,
						add: e,
						leave: f
					}
				}()
		}, CoolApp.prototype = {
			constructor: CoolApp,
			createApp: function(a, b, c, d, e, f, g, h, i, j) {
				this.init(a, b, c, d, e, f, g, h, i, j)
			},
			nextPage: function() {
				this.nextPage()
			},
			prePage: function() {
				this.prePage()
			},
			gotoPage: function(a) {
				this.gotoPage(a)
			},
			isLastPage: function() {
				return base.isLastPage()
			},
			isFirstPage: function() {
				return base.isFirstPage()
			},
			isLastPageGotoFirstPage: function() {
				return base.isLastPageGotoFirstPage()
			},
			getPageCount: function() {
				this.getPageCount()
			},
			outPage: function(a, b, c) {},
			parsePage: function(a) {
				return this.parsePage(a)
			},
			playPage: function(a, b) {
				return this.playPage(a, b)
			},
			parseElement: function(a) {
				return this.parseElement(a)
			},
			playElement: function(a, b) {
				return this.playElement(a, b)
			},
			getCurrentPageId: function() {
				return this.getCurrentPageId()
			},
			setIsEditing: function(a) {
				this.setIsEditing(a)
			},
			getAllowFlip: function() {
				this.getAllowFlip()
			},
			setPageThumb: function(a) {
				this.setPageThumb(a)
			},
			clearAllCustomIntervals: function() {
				this.clearAllCustomIntervals()
			},
			getPrefixCss: function(a, b) {
				return this.getPrefixCss(a, b)
			},
			getApiHelper: function() {
				return this.getApiHelper()
			}
		}
	}(),
	function() {
		var a = "",
			b = "",
			c = "",
			d = 0,
			e = "",
			f = "",
			g = "",
			h = 0,
			i = 0,
			j = !1;
		WePlusLog = function(j, k, l, m, n) {
			c = j, a = k, e = l, g = k + "VisitFirstLogGuid", f = m, h = parseInt(n, 10), 1 !== h && setTimeout(function() {
				var h = Cool.cookie.get(g),
					j = {
						guid: a,
						fromVisitGuid: e,
						firstVisitGuid: h,
						qrc: f
					};
				$.post(c + "visitLog/add", {
					form: j
				}, function(a) {
					0 === a.result ? (b = a.data.logguid, d = a.data.visitCount, void 0 !== a.data.id && (i = a.data.id), "" === h && Cool.cookie.set(g, b)) : console.log(a)
				}, "json")
			}, 1e3)
		}, WePlusLog.prototype = {
			constructor: WePlusLog,
			doShare: function(b, d, e) {
				if(1 !== h) {
					j && (d = "");
					var f = {
						type: b,
						wsiteGuid: a,
						visitGuid: Cool.cookie.get(g),
						wxOpenId: d
					};
					$.post(c + "visitLog/doShare", {
						form: f
					}, function(a) {
						a.data && 0 === a.data.code && e && (j = !0, e())
					}, "json"), window.hasOwnProperty("_rrxiu_pushsale") && window._rrxiu_pushsale.addShare(b)
				}
			},
			logTag: function(a) {
				setTimeout(function() {
					$.post(c + "logvisit/logTag", {
						form: {
							logguid: b,
							tag: a
						}
					}, function(a) {}, "json")
				}, 500)
			},
			logError: function(a) {
				$.get(c + "visitLog/log?data=" + a)
			},
			interactHit: function(b, d) {
				if(1 !== h) {
					var e = {
						type: b,
						name: d,
						wsiteGuid: a,
						visitGuid: Cool.cookie.get(g)
					};
					$.post(c + "visitLog/interactHit", {
						form: e
					}, function(a) {}, "json")
				}
			},
			closeWsite: function(a, d, e) {
				if(1 === h) return void e();
				var f = {
					logGuid: b,
					logCacheId: i,
					page: a,
					duration: d
				};
				$.post(c + "visitLog/CloseWsiteUpdate", {
					form: f
				}, function(a) {
					console.log("closeWsite", a), e()
				}, "json")
			},
			getVisitCount: function() {
				return d
			},
			getVisitFirstLogKey: function() {
				return g
			}
		}
	}(), $(function() {
		function a(d) {
			Cool.util.loadJs([d], function(d) {
				try {
					if("" === coolData && t === !1) a(p), t = !0;
					else {
						if(0 === coolData.result) {
							var e = Cool.util.getUrlParameterByName("from_code"),
								g = Cool.util.getUrlParameterByName("qrc_code");
							u = new WePlusLog(b(), j, e, g, l);
							var i = c(coolData);
							!i.pageList || null !== i.pageList[0] && void 0 !== i.pageList[0] || (console.log(404), coolData.result = 404, coolData.msg = "活动不存在")
						} else 403 === coolData.result && (Cool.util.checkIsPcWithoutIframe() || (window.location.href = "http://mp.weixin.qq.com/s?__biz=MzIzMzE1ODQ3Mw==&mid=100000690&idx=1&sn=af76434cc323cf7fc1ffbf2143abe0b8&chksm=6888a1945fff2882bcd93264c7019c926027614aca0910a61efc350dd3480f25b31b82d0edba#rd"));
						$("#main").css({
							width: width,
							height: height
						}), "1" === k && (coolData.showVisitCount = !1), h = new CoolApp, h.createApp(b(), $("#main"), coolData, Cool.util.checkIsPcWithoutIframe(), n, u, !1, "1" === l ? !0 : !1, "1" === k ? !0 : !1), f()
					}
				} catch(m) {
					a(p), t = !0, console.log("load", m)
				}
			})
		}

		function b() {
			if(appConfig.dev) return appConfig.serviceHost;
			var a = appConfig.serviceHost;
			return rrxgpara.renb && rrxgpara.rdn && (a = "https://" + rrxgpara.rdn + "/"), wsiteInfo.flhtps || wsiteInfo.httpsEnabled ? a.indexOf("https://") > -1 ? a : a.replace("http://", "https://") : a
		}

		function c(a) {
			if(a.hasOwnProperty("pageList") && a.pageList.constructor === Object) {
				var b = [];
				for(var c in a.pageList) b.push(a.pageList[c]);
				a.pageList = b
			}
			return a
		}

		function d() {
			if(appConfig.dev) return appConfig.cloudHost;
			if(wsiteInfo.flhtps || wsiteInfo.httpsEnabled) return appConfig.cloudHost.replace("http://", "https://");
			var a = appConfig.cloudHost,
				b = Cool.util.isSpecDomain(a);
			if(b) {
				var c = Cool.util.getUrlSubDomain(a);
				c && (a = a.replace("://" + c, "://ns" + c), a = a.replace("https://", "http://"))
			}
			return a
		}

		function e() {
			return 1 === parseInt(l) ? "" : "load" === Cool.cookie.get("wepublish") ? (new Date).valueOf() : (Cool.cookie.set("wepublish", "load"), "")
		}

		function f() {
			var a = function(a) {
				{
					var c = a.data;
					a.origin
				}
				if("" !== c) {
					try {
						c = JSON.parse(c)
					} catch(d) {}
					if("next" === c.filpType) h.getAllowFlip() && h.nextPage();
					else if("pre" === c.filpType) h.getAllowFlip() && h.prePage();
					else if("copyright" === c.filpType || "setting" === c.filpType) {
						var e = $.extend(coolData, {}, !0),
							f = c.wsite,
							g = c.copyright;
						for(var j in f) e[j] = f[j];
						void 0 !== g && ("customer" === g.from && (e.copyright = appConfig.copyright), e.copyright.from = g.from), e.showVisitCount = !1, h = new CoolApp;
						var k = e.pageList[e.pageList.length - 1].id;
						h.getApiHelper().setStartPage(k), $("#main").find(".pt-wrapper .pt-pagelist").html("");
						var l = {
							copyrightFrom: e.copyright.from
						};
						h.createApp(b(), $("#main"), e, i, n, u, !1, !1, !0, l)
					}
				}
			};
			"undefined" != typeof window.addEventListener ? window.addEventListener("message", a, !1) : "undefined" != typeof window.attachEvent && window.attachEvent("onmessage", a)
		}

		function g() {
			var a = window.location.href;
			if(a.indexOf("uid=") > -1) {
				var b = Cool.util.removeUrlPara(a, "uid");
				window.history.pushState({}, 0, b)
			}
		}
		var h, i = Cool.util.checkIsPc(),
			j = wsiteInfo.wsiteGuid,
			k = Cool.util.getUrlParameterByName("setting"),
			l = Cool.util.getUrlParameterByName("preview"),
			m = Cool.util.getUrlParameterByName("tpl");
		window.rrxDanmuJump = "danmu" === Cool.util.getUrlParameterByName("clickType"), g(), i || (document.addEventListener("touchmove", function(a) {
			a.preventDefault()
		}, !1), $("#main").on("touchmove", function(a) {
			a.preventDefault()
		}));
		var n = Cool.util.checkIsWeixin(),
			o = e(),
			p = b() + "view/data?id=" + j + "&preview=" + l;
		"1" === wsiteInfo.mamfm && (p += "&mamfm=1"), "1" === wsiteInfo.mamcg && (p += "&mamcg=1"), "1" === wsiteInfo.mamsp && (p += "&mamsp=1", p = p + "&mamsphis=" + wsiteInfo.mamsphis);
		var q = d() + j + ".js",
			r = wsiteInfo.ver;
		if(m) p = p + "&tpl=" + m, q = d() + "tpl_" + j + ".js?v=" + r, a(appConfig.enabledCloud ? q : p);
		else {
			q = "" === o ? q + "?v=" + r : q + "?timestamp=" + o + "&v=" + r;
			var s = appConfig.enabledCloud && 1 !== parseInt(l) && "1" !== wsiteInfo.mamfm && "1" !== wsiteInfo.mamcg && "1" !== wsiteInfo.mamsp;
			a(s ? q : p)
		}
		var t = !appConfig.enabledCloud,
			u = null
	}), window.Danmaku = window.Danmaku || {},
	function(a) {
		a.html2Escape = function(a) {
			return a ? a.replace(/[<>&"]/g, function(a) {
				return {
					"<": "&lt;",
					">": "&gt;",
					"&": "&amp;",
					'"': "&quot;"
				}[a]
			}) : a
		}, a.getCharacterSize = function(a) {
			for(var b = 0, c = 0; c < a.length; c++) a.charCodeAt(c) > 127 || 94 == a.charCodeAt(c) ? b += 2 : b++;
			return b
		}, a.object2Style = function(a) {
			var b = "";
			return a && $.each(a, function(a, c) {
				b += $.isNumeric(c) ? a + ":" + c + "px;" : a + ":" + c + ";"
			}), b
		};
		var b, c, d = function() {
				var a = function(a) {
						var b = document.createElement("div");
						return "string" == typeof a && (b.innerHTML = a), b.children[0]
					},
					b = function(a) {
						return a.replace(/<[^>]+>/g, "")
					},
					c = function(a, b) {
						return null === b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
					},
					d = function(a) {
						for(var b, c, d = a[0].toUpperCase() + a.slice(1), e = ["webkit", "moz", "MS", "ms", "o", ""], f = document.createElement("div"), g = f.style, h = 0, i = e.length; i > h;) {
							if(b = e[h], c = b ? b + d : a, c in g) return b ? "-" + b + "-" : "";
							h++
						}
						return void 0
					};
				return {
					tmplFactory: a,
					textFilter: b,
					random: c,
					prefixed: d
				}
			}(),
			e = function() {
				function b(e, f) {
					if(e) {
						var h = "",
							i = 0 === c.danmuType ? this.gutter : this.verGutter,
							j = f * i + this.gutter * f;
						console.log(j), 0 === c.danmuType && (j += g);
						var k = function(d) {
							var e = c.showWxPhoto,
								f = '<div class="danmuCommentRowInnerBox">';
							return d.forEach(function(d, g) {
								var h = $(".danmuCommentContainer .danmuCommentBox .danmuCommentRowInner").length / 2 % b.prototype.colorList.length,
									i = b.prototype.colorList[h],
									j = d.photo,
									k = d.content,
									l = j ? "background-image:url(" + j + ");background-size: cover;background-position:0 0;" : "",
									m = 0 === c.danmuColor ? "" : 1 === c.danmuColor ? "background:rgba(255,255,255,.8);" : "background:" + i,
									n = 1 === c.danmuColor ? "color:black;" : "";
								if(d.customStyle && d.customeContent) {
									e = !1;
									var o = "";
									void 0 !== d.customStyle && null !== d.customStyle && (o += "height:" + d.customStyle.height + ";", o += "line-height:" + d.customStyle["line-height"] + ";"), f += '<div data-source="myspec" class="danmuCommentRowInner ' + (1 === c.danmuType ? "verticalDanmu " : "") + '" style="' + a.object2Style(d.customStyle) + '">' + (e ? '<span class="danmuCommentPhoto" style="' + l + '"></span>' : "") + '<div class="danmuCommentContent" style="' + o + '"><span class="myspec">' + d.customeContent + "</span></div></div>"
								} else e = !0, f += '<div class="danmuCommentRowInner ' + (1 === c.danmuType ? "verticalDanmu " : "") + '" style="' + m + '">' + (e ? '<span class="danmuCommentPhoto" style="' + l + '"></span>' : "") + '<div class="danmuCommentContent" style="' + n + '"><span>' + a.html2Escape(k) + "</span></div></div>"
							}), f += "</div>"
						};
						h += '<div class="danmuCommentRow danmuCommentRow' + f + '" style="top:' + j + 'px" num="' + f + '">';
						var l = k(e);
						h += l + l, h += "</div>", this.$dom = $(d.tmplFactory(h)), this.top = j
					}
				}
				return b.ANIMATIONSPEED = [100, 120, 140, 160], b.prototype.TRANSFORM = d.prefixed("transform") + "transform", b.prototype.winW = 640, b.prototype.verH = 312, b.prototype.gutter = 60, b.prototype.verGutter = 18, b.prototype.verMaxwidth = 370, b.prototype.defaultGutter = 80, b.prototype.colorList = ["rgba(244,67,54,.8)", "rgba(233,30,99,.8)", "rgba(103,58,183,.8)", "rgba(63,81,181,.8)", "rgba(33,150,243,.8)", "rgba(0,188,212,.8)", "rgba(0,150,136,.8)", "rgba(76,175,80,.8)", "rgba(255,152,0,.8)"], b.prototype.resetCssStyle = function(a, b) {
					var d = this,
						e = d.winW,
						f = d.top,
						g = d.verMaxwidth,
						h = d.gutter + d.verGutter,
						i = this.$dom[0].querySelectorAll(".danmuCommentRowInnerBox"),
						j = i[0].querySelectorAll(".danmuCommentRowInner"),
						k = d.$dom;
					if(b && (f = a * h, d.top = f), k.css({
							display: "block",
							left: 0,
							top: f,
							width: e,
							height: j[0].clientHeight
						}), 1 === c.danmuType) {
						var l = k.find(".danmuCommentContent span").get(0).offsetWidth;
						l = l > g ? g : l, k.find(".danmuCommentContent").css("width", l + "px")
					}
				}, b.prototype.setAnimation = function(a, e) {
					var f, g, h = this,
						i = h.winW,
						j = h.winH,
						k = h.verH,
						l = h.top,
						m = h.gutter + h.verGutter,
						n = h.gutter,
						o = h.verMaxwidth,
						p = 0,
						q = 0,
						r = 0,
						s = this.$dom[0].querySelectorAll(".danmuCommentRowInnerBox"),
						t = s[0].querySelectorAll(".danmuCommentRowInner"),
						u = 0,
						v = 0,
						w = this.$dom.attr("num"),
						x = $("#danmaCommentStyle" + w),
						y = h.$dom;
					if(e && (l = a * m), q = parseInt(this.$dom.attr("speed")), q || (q = b.ANIMATIONSPEED.splice(d.random(0, b.ANIMATIONSPEED.length - 1), 1)[0], this.$dom.attr("speed", q)), 1 == c.danmuType && (q = 140, this.$dom.attr("speed", q)), !(t.length <= 0)) {
						for(var z = 0, A = t.length; A > z; z++) u += Math.ceil(t[z].offsetWidth) + 80 + 2, v += Math.ceil(t[z].offsetHeight) + 80 + 2;
						u = u > i ? u : i, p = Math.ceil((u + i) / q), 1 == c.danmuType && (v = v > j ? v : j, p = Math.ceil((v + j) / q), r = o - y.find(".danmuCommentContent span").get(0).offsetWidth, r = r > 0 ? 0 : r), g = function() {
							var a = "infinite",
								b = 0,
								d = "",
								e = "",
								f = "";
							return 0 === c.danmuType ? (b = p / 2, d = "animation:danmu_runleft_" + w + " " + p + "s linear " + a + " ", e = "transform:translate3d(" + i + "px,0,0) ", f = "", f += ".danmuCommentRow" + w + " .danmuCommentRowInnerBox:nth-child(1){width:" + u + "px;-webkit-" + d + ";" + d + ";-webkit-" + e + ";" + e + ";}@-webkit-keyframes danmu_runleft_" + w + "{0% {-webkit-transform:translate3d(" + i + "px,0,0);}100% {-webkit-transform:translate3d(-" + (2 * u - i) + "px,0,0);}}@keyframes danmu_runleft_" + w + "{0% {transform:translate3d(" + i + "px,0,0);}100% {transform:translate3d(-" + (2 * u - i) + "px,0,0);}}", d = d + b + "s ", f += ".danmuCommentRow" + w + " .danmuCommentRowInnerBox:nth-child(2){width:" + u + "px;-webkit-" + d + ";" + d + ";-webkit-" + e + ";" + e + ";}") : (b = p / 2, animContent = "animation:content_runleft" + w + " " + p + "s linear " + a + " ", animComment = "animation:danmu_runleft" + w + " " + p + "s linear " + a + " ", trans = "transform:translate3d(0," + (k + m) + "px,0) ", f = "", f += ".danmuCommentRow" + w + " .danmuCommentRowInnerBox:nth-child(1){-webkit-" + animComment + ";" + animComment + ";-webkit-" + trans + ";" + trans + ";}.danmuCommentRow" + w + " .danmuCommentRowInnerBox:nth-child(1) .danmuCommentContent span{-webkit-" + animContent + ";" + animContent + ";}@-webkit-keyframes danmu_runleft" + w + "{0% {-webkit-transform:translate3d(0," + k + "px,0);opacity:0;}" + 100 * (n + l) / (j + v) + "% {opacity:0;}" + 100 * (2 * n + l) / (j + v) + "% {opacity:1;}" + 100 * (k - n + l) / (j + v) + "% {opacity:1;}" + 100 * (k + l) / (j + v) + "% {opacity:0;}100% {-webkit-transform:translate3d(0," + (-2 * v + k) + "px,0);opacity:0;}}@keyframes danmu_runleft" + w + "{0% {-webkit-transform:translate3d(0," + k + "px,0);opacity:0;}" + 100 * (n + l) / (j + v) + "% {opacity:0;}" + 100 * (2 * n + l) / (j + v) + "% {opacity:1;}" + 100 * (k - n + l) / (j + v) + "% {opacity:1;}" + 100 * (k + l) / (j + v) + "% {opacity:0;}100% {-webkit-transform:translate3d(0," + (-2 * v + k) + "px,0);opacity:0;}}@-webkit-keyframes content_runleft" + w + "{0% {left:0;}" + 100 * (2 * m + l) / (j + v) + "% {left:0;}" + 100 * (k - m + l) / (j + v) + "% {left:" + r + "px;}" + 100 * (k + l) / (j + v) + "% {left:" + r + "px;}100% {left:0;}}@keyframes content_runleft" + w + "{0% {left:0;}" + 100 * (2 * m + l) / (j + v) + "% {left:0;}" + 100 * (k - m + l) / (j + v) + "% {left:" + r + "px;}" + 100 * (k + l) / (j + v) + "% {left:" + r + "px;}100% {left:0;}}", animComment = animComment + b + "s ", animContent = animContent + b + "s ", f += ".danmuCommentRow" + w + " .danmuCommentRowInnerBox:nth-child(2){-webkit-" + animComment + ";" + animComment + ";-webkit-" + trans + ";" + trans + ";}.danmuCommentRow" + w + " .danmuCommentRowInnerBox:nth-child(2) .danmuCommentContent span{-webkit-" + animContent + ";" + animContent + ";}"), f
						}, x.length > 0 ? (f = g(), x.html(f), setTimeout(function() {}, 10)) : (f = '<style id="danmaCommentStyle' + w + '" type="text/css">', f += g(), f += "</style>", $("head").append(f))
					}
				}, b
			}(),
			f = function() {
				function a(a, b) {
					if(a) {
						var c = "background-image:url(" + a.photo + ")",
							e = '<div class="headImg headImg_' + b + '" num="' + b + '" style="' + c + '"></div>';
						return this.$dom = $(d.tmplFactory(e)), e
					}
				}
				return a.prototype.setAnimation = function(a) {
					var b = this,
						c = b.$dom,
						d = b.likeLength,
						e = c.attr("num"),
						f = $("#danmaPhotoStyle" + e),
						g = "";
					getStyleSheet = function() {
						var b = 3,
							c = 40,
							f = 20,
							g = "infinite",
							h = parseInt(Math.random() * c - f),
							i = d > b ? d : b,
							j = b > i - a ? b + a - i : 0,
							k = b > d ? 0 : b > d - a ? a - j : a,
							l = "animation:danmaAnimPhoto_" + e + " " + i + "s " + j + "s ease-out " + g + " ",
							m = "transform:translate(0,0) scale(1)",
							n = "opacity:0",
							o = "";
						return o += ".headImg_" + e + "{-webkit-" + l + ";" + l + ";-webkit-" + m + ";" + m + ";" + n + ";}@-webkit-keyframes danmaAnimPhoto_" + e + "{0%," + parseInt(100 * k / i) + "%{ -webkit-transform:translate(0,-50px) scale(1);transform:translate(0,-50px) scale(1);opacity:0;}" + (parseInt(100 * k / i) + 1) + "%{-webkit-transform:translate(0,-65px) scale(1);transform:translate(0,-65px) scale(1);opacity:1;}" + parseInt(100 * (k + b) / i) + "%,100%{-webkit-transform:translate(" + h + "px,-260px) scale(2);transform:translate(-" + h + "px,-260px) scale(2);opacity:0;}}@keyframes danmaAnimPhoto_" + e + "{0%," + parseInt(100 * k / i) + "%{ -webkit-transform:translate(0,-50px) scale(1);transform:translate(0,-50px) scale(1);opacity:0;}" + (parseInt(100 * k / i) + 1) + "%{-webkit-transform:translate(0,-65px) scale(1);transform:translate(0,-65px) scale(1);opacity:1;}" + parseInt(100 * (k + b) / i) + "%,100%{-webkit-transform:translate(" + h + "px,-260px) scale(2);transform:translate(-" + h + "px,-260px) scale(2);opacity:0;}}"
					}, f.length > 0 ? (g = getStyleSheet(), c.hide(), f.html(g), setTimeout(function() {
						c.show()
					}, 0)) : (g = '<style id="danmaPhotoStyle' + e + '" type="text/css">', g += getStyleSheet(), g += "</style>", $("head").append(g))
				}, a
			}(),
			g = (a.danmaStage = function() {
				function b() {
					var a = this;
					this.eachCommListLen = 0, this.comments = [], this.heart = [], (void 0 === c.danmuType || void 0 === c.danmuColor || void 0 === c.showDanmulike) && (c.danmuType = 0, c.danmuColor = 0, c.showDanmulike = !0), this.initCommentBase(a)
				}
				return b.prototype.initCommentBase = function(a) {
					if(!($("#danmuCommentContainer").length > 0)) {
						var b = "";
						b = '<div id="danmuCommentContainer" class="danmuCommentContainer"> <div class="danmuCommentBox"></div></div><div id="danmuCommentLike" class="danmuCommentLike"></div>', $("#pt-inner").append(b), a.$danmuCommentBox = $("#danmuCommentContainer .danmuCommentBox"), a.$danmuCommentLike = $("#danmuCommentLike")
					}
				}, b.prototype.initBindEvent = function(a) {}, b.prototype.initData = function(a) {
					if(0 === c.danmuType ? a.initComments(a) : a.initVerticalComments(a), a.comments.forEach(0 === c.danmuType ? function(a, b) {
							a.setAnimation(b), a.resetCssStyle(b)
						} : function(a, b) {
							a.resetCssStyle(b), a.setAnimation()
						}), a.comments.length - 1 > -1) {
						{
							a.comments[a.comments.length - 1].top + a.comments[a.comments.length - 1].$dom.height()
						}
						if(1 == c.danmuType && (a.$danmuCommentBox.css("height", e.prototype.verH + "px"), a.$danmuCommentBox.css("top", "auto"), a.$danmuCommentBox.css("bottom", "30px")), 2 == c.danmuColor)
							for(var b = e.prototype.colorList, d = 0, f = a.$danmuCommentBox.find(".danmuCommentRow"), g = 0; g < f.length; g++)
								for(var h = f.eq(g).find(".danmuCommentRowInnerBox").eq(0).find(".danmuCommentRowInner"), i = f.eq(g).find(".danmuCommentRowInnerBox").eq(1).find(".danmuCommentRowInner"), j = 0; j < h.length; j++) "myspec" != h.data("source") && (h.eq(j).css("background", b[d % b.length]), i.eq(j).css("background", b[d % b.length])), d++
					}
					var k = a.initAnimation();
					a.stopAnimation = k.stop, a.startAnimation = k.start, a.toggleAnimation = k.toggle, a.restartAnimation = k.restart, a.show(), a.$danmuCommentLike.show()
				}, b.prototype.initLike = function(a) {
					var b = a.danmuLikeList;
					f.prototype.likeLength = b.length;
					var c = document.createDocumentFragment();
					b.forEach(function(b, d) {
						var e = new f(b, d);
						e.$dom && (tmpDom = e.$dom, c.appendChild(tmpDom[0]), a.heart.push(e))
					}), a.$danmuCommentLike.append(c), a.heart.forEach(function(a, b) {
						a.setAnimation(b)
					})
				}, b.prototype.initComments = function(a) {
					var b = a.danmuList,
						c = b.length,
						d = 0;
					c > 0 && 6 >= c ? d = 1 : c > 6 && 12 >= c ? d = 2 : c > 12 && 18 >= c ? d = 3 : c > 18 && (d = 3), a.initEachLineComments(a, d)
				}, b.prototype.initVerticalComments = function(a) {
					var b, c, d, f = document.createDocumentFragment(),
						g = a.danmuList.length;
					e.prototype.winH = (e.prototype.gutter + e.prototype.verGutter) * g, e.prototype.winH = e.prototype.winH > e.prototype.verH ? e.prototype.winH : e.prototype.verH;
					for(var h = 0; g > h; h++) {
						if(d = a.danmuList.splice(0, 1), b = new e(d, h), !b.$dom) return;
						c = b.$dom, a.comments.push(b), f.appendChild(c[0])
					}
					a.$danmuCommentBox.append(f)
				}, b.prototype.initEachLineComments = function(a, b) {
					var c, d, f, g = document.createDocumentFragment(),
						h = a.danmuList,
						i = h.length;
					a.eachCommListLen = Math.floor(i / b), a.leftCommListLen = i % b;
					for(var j = 0; b > j; j++) {
						if(f = 0 === j ? a.danmuList.splice(0, a.eachCommListLen + a.leftCommListLen) : a.danmuList.splice(0, a.eachCommListLen), c = new e(f, j), !c.$dom) return;
						d = c.$dom, a.comments.push(c), g.appendChild(d[0])
					}
					a.$danmuCommentBox.append(g)
				}, b.prototype.sendCommentData = function(b, d) {
					b.comments && 0 === b.comments.length ? (b.show(), b.$danmuCommentBox.show(), b.$danmuCommentBox.addClass("show"), b.$danmuCommentLike.show()) : b.hasEnter = !0;
					var f = setInterval(function() {
						if(b.firstEnter) {
							if(clearInterval(f), !b.hasEnter) return;
							if($("#danmuCommentContainer .danmuCommentBox .danmuCommentRow .danmuCommentRowInnerBox").addClass("noAnimate"), 0 === c.danmuType) {
								b.firstDanmu && ($($("#danmuCommentContainer .danmuCommentRow").find(".danmuCommentRowInnerBox")).html(""), b.firstDanmu = !1);
								var g = $(".danmuCommentContainer .danmuCommentBox .danmuCommentRowInner").length / 2,
									h = e.prototype.colorList,
									i = h[g % h.length],
									j = d.photo ? "background-image:url(" + d.photo + ");" : "",
									k = 0 === c.danmuColor ? "" : 1 === c.danmuColor ? "background:rgba(255,255,255,.8);" : "background:" + i,
									l = 1 === c.danmuColor ? "color:black;" : "",
									m = c.showWxPhoto ? '<span class="danmuCommentPhoto" style="' + j + '"></span>' : "",
									n = '<div class="danmuCommentRowInner ' + (1 === c.danmuType ? "verticalDanmu " : "") + '" style="' + k + '">' + m + '<div class="danmuCommentContent" style="' + l + '"><span>' + a.html2Escape(d.content) + "</span></div></div>";
								$($("#danmuCommentContainer .danmuCommentRow")[0]).find(".danmuCommentRowInnerBox").prepend(n)
							} else {
								b.firstDanmu && ($(b.$danmuCommentBox).html(""), b.firstDanmu = !1, b.comments = []);
								var o = [],
									p = {},
									q = b.comments.length + 1;
								p.photo = d.photo, p.content = a.html2Escape(d.content), o[0] = p, e.prototype.winH = (e.prototype.gutter + e.prototype.verGutter) * q, e.prototype.winH = e.prototype.winH > e.prototype.verH ? e.prototype.winH : e.prototype.verH;
								var r = new e(o, q - 1);
								b.comments.unshift(r), b.comments[0].$dom.find(".danmuCommentRowInnerBox").addClass("noAnimate"), $("#danmuCommentContainer .danmuCommentBox").prepend(r.$dom)
							}
							b.$danmuCommentBox.addClass("show"), b.comments[0].setAnimation(0), 1 == c.danmuType && b.comments.forEach(function(a, b) {
								a.resetCssStyle(b, !0), a.setAnimation(b)
							}), setTimeout(function() {
								$("#danmuCommentContainer .danmuCommentBox .danmuCommentRow .danmuCommentRowInnerBox").removeClass("noAnimate")
							}, 0)
						}
					}, 100)
				}, b.prototype.renderCommentData = function(a, b, c) {
					c.$danmuCommentBox.html(""), c.$danmuCommentBox.show(), 0 === a.length && (a = [], c.firstDanmu = !0), c.firstEnter = !0, c.danmuList = a, b && b(c)
				}, b.prototype.renderLikeData = function(a, b, c) {
					c.$danmuCommentBox.show();
					for(var d = [], e = a.length, f = 0; e > f; f++) d.push(a[f]);
					c.danmuLikeList = d, b && b(c)
				}, b.prototype.sendLikeData = function(a, b) {
					var c = a.photo,
						d = '<div class="headImg headImg_0 tmpHeadimg" style="background-image: url(' + c + ');"></div>';

					b.$danmuCommentLike.append(d), setTimeout(function() {
						$(".tmpHeadimg").eq(0).remove()
					}, 3e3), $(".headImg:not(.tmpHeadimg)").css("opacity", 0), setTimeout(function() {
						b.noLike && (b.noLike = !1, b.danmuLikeList = [], b.heart = [], $(".headImg:not(.tmpHeadimg)").remove());
						var c = new f(a, f.prototype.likeLength);
						return c.$dom ? (b.danmuLikeList.push(a), tmpDom = c.$dom, b.$danmuCommentLike.append(tmpDom[0]), b.heart.push(c), f.prototype.likeLength = b.danmuLikeList.length, void b.heart.forEach(function(a, b) {
							a.setAnimation(b)
						})) : void console.log("内容为空")
					}, 1e3)
				}, b.prototype.show = function() {
					this.isActive || (this.$danmuCommentBox.addClass("show"), this.isActive = !0, b.prototype.hasShown = !0)
				}, b.prototype.hide = function() {
					var a = this;
					a.$danmuCommentBox.removeClass("show"), this.isActive = !1
				}, b.prototype.toggle = function() {
					this.isActive ? this.hide() : this.show()
				}, b.prototype.initAnimation = function() {
					var a = this;
					cancelAnimation = !0;
					var b = function() {
							cancelAnimation = !0
						},
						d = function() {
							cancelAnimation && (cancelAnimation = !1)
						},
						e = function() {},
						f = function() {
							cancelAnimation = !1, a.comments.forEach(0 === c.danmuType ? function(a, b) {
								a.setAnimation(b), a.resetCssStyle(b)
							} : function(a, b) {
								a.resetCssStyle(b), a.setAnimation(b)
							})
						};
					return a.loopBreak = 0, {
						stop: b,
						start: d,
						restart: f,
						toggle: e
					}
				}, b
			}(), 120);
		a.init = function(d) {
			b || (c = {
				showWxPhoto: !0,
				showDanmulike: !0,
				danmuType: 0,
				danmuColor: 2
			}, d && (c.danmuType = "horizontal" === d.style ? 0 : 1), b = new a.danmaStage)
		}, a.stop = function() {
			clearTimeout(a.startDanmuTimer), a.startDanmuTimer = null, b && (b.$danmuCommentBox.removeClass("show"), b.hide(), b.$danmuCommentBox.hide(), b.$danmuCommentLike.hide(), b.stopAnimation && b.stopAnimation())
		}, a.addLikeData = function(a) {
			b.sendLikeData(a, b)
		}, a.renderLikeData = function(a) {
			try {
				var c = $.extend([], a);
				b.renderLikeData(c, b.initLike, b)
			} catch(d) {
				console.log(d)
			}
		}, a.addCommentData = function(a) {
			b.sendCommentData(b, a)
		}, a.renderCommentData = function(a) {
			try {
				var c = $.extend([], a);
				b.renderCommentData(c, b.initData, b)
			} catch(d) {
				console.log(d)
			}
		}, a.show = function() {
			b && (b.show(), b.$danmuCommentBox.show(), b.$danmuCommentBox.addClass("show"), b.$danmuCommentLike.show())
		}, a.hide = function() {
			b && (b.hide(), b.$danmuCommentLike.hide(), b.stopAnimation && b.stopAnimation())
		}, a.setDanmuData = function(a) {
			try {
				var c = $.extend([], a);
				b.danmuList = c
			} catch(d) {
				console.log(d)
			}
		}, a.setDanmuLikeData = function(a) {
			try {
				var c = $.extend([], a);
				b.danmuLikeList = c
			} catch(d) {
				console.log(d)
			}
		}, a.start = function() {
			b.commentsInited ? (b.show(), b.$danmuCommentBox.show(), b.$danmuCommentBox.addClass("show"), b.$danmuCommentLike.show()) : (b.renderCommentData(b.danmuList, b.initData, b), b.renderLikeData(b.danmuLikeList, b.initLike, b), b.commentsInited = !0)
		}, a.refresh = function(b) {
			try {
				a.setDanmuData(b), a.renderCommentData(b)
			} catch(c) {
				console.log(c)
			}
		}, a.checkIsPlaying = !a.startDanmuTimer
	}(window.Danmaku), window.rrxTouch = {},
	function(a) {
		function b(a, b) {
			return 180 * Math.atan2(b, a) / Math.PI
		}

		function c(a, c, d, e) {
			var f = c - e,
				g = d - a,
				h = 0,
				j = Math.sqrt(g * g + f * f);
			if(i > j) return h;
			var k = b(g, f);
			return k >= -45 && 45 > k ? h = 4 : k >= 45 && 135 > k ? h = 1 : k >= -135 && -45 > k ? h = 2 : (k >= 135 && 180 >= k || k >= -180 && -135 > k) && (h = 3), h
		}

		function d(a) {
			a = a || window.event, a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.returnValue = !1, a.cancelBubble = !0)
		}
		var e, f, g = 0,
			h = 0,
			i = 10;
		rrxTouch = function(a, b) {
			if(!a) throw new Error("elem is null");
			b ? b.dest && (i = b.dest) : b = {
				prevent_default: !0
			}, a.on("mousedown touchstart", function(a) {
				e = 0, f = 0, g = 0, h = 0, b.prevent_default && d(a), "mousedown" == a.type && (e = a.pageX, f = a.pageY), "touchstart" == a.type && (e = a.touches ? a.touches[0].pageX : a.originalEvent.touches[0].pageX, f = a.touches ? a.touches[0].pageY : a.originalEvent.touches[0].pageY), b.touchstart && b.touchstart()
			}), a.on("mousemove touchmove", function(a) {
				b.prevent_default && d(a), "mousemove" == a.type && (g = a.pageX, h = a.pageY), "touchmove" == a.type && (g = a.touches ? a.touches[0].pageX : a.originalEvent.touches[0].pageX, h = a.touches ? a.touches[0].pageY : a.originalEvent.touches[0].pageY), b.touchmove && b.touchmove()
			}), a.on("mouseup touchend mouseleave", function(a) {
				b.prevent_default && d(a), b.touchend && b.touchend();
				var i = c(e, f, g, h);
				switch(i) {
					case 0:
						break;
					case 1:
						console.info("up"), b.swiperup && b.swiperup();
						break;
					case 2:
						console.info("down"), b.swipedown && b.swipedown();
						break;
					case 3:
						console.info("left"), b.swiperleft && b.swiperleft();
						break;
					case 4:
						console.info("right"), b.swiperight && b.swiperight()
				}
			})
		}
	}(window.jQuery);
var pageSkin = {
	changeLinkBtn: '<a href="{{linkUrl}}" target="_blank" style="color: #fff;font-weight: bold;font-size: 44px;text-decoration: none;">{{linkName}}</a>',
	knowBtn: '<svg style="margin-top: -8px" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"          width="200px" height="100px" viewBox="0 0 200 100" enable-background="new 0 0 200 100" xml:space="preserve">            <g>             <path fill="#fff" d="M62.678,28.861h-8.073c-1.567,0-2.93,0.542-4.087,1.625c-1.159,1.151-1.721,2.522-1.686,4.113v13.863              c-0.715-0.711-1.516-1.082-2.402-1.117H40.4v-9.597h4.599c0.851,0,1.55-0.287,2.095-0.863c0.544-0.541,0.817-1.235,0.817-2.082              c0-0.846-0.273-1.557-0.817-2.133c-0.511-0.508-1.209-0.762-2.095-0.762H33.094c0.205-0.846,0.426-1.727,0.665-2.641                c0.204-0.947,0.084-1.794-0.358-2.539c-0.443-0.609-1.073-1.016-1.891-1.219c-0.852-0.102-1.583,0.051-2.197,0.457              c-0.647,0.44-1.091,1.151-1.329,2.133c-0.817,4.773-2.674,9.107-5.569,13c-0.613,0.745-0.869,1.541-0.767,2.387             c0.034,0.711,0.392,1.354,1.073,1.93c0.646,0.44,1.362,0.66,2.146,0.66c1.737-0.305,3.73-2.877,5.978-7.719             c0.034-0.203,0.119-0.406,0.255-0.609h3.424v9.597H24.356c-0.919,0-1.635,0.271-2.146,0.813c-0.545,0.543-0.818,1.236-0.818,2.082               c0,0.848,0.272,1.559,0.818,2.133c0.511,0.543,1.226,0.813,2.146,0.813h10.117c-0.613,6.602-3.832,11.512-9.657,14.727              c-0.75,0.44-1.448,0.796-2.095,1.066c-0.954,0.406-1.602,0.999-1.942,1.777c-0.238,0.744-0.222,1.507,0.051,2.285               c0.409,0.813,0.971,1.354,1.686,1.625c0.954,0.338,2.725-0.135,5.314-1.422c3.883-2.336,7.034-5.603,9.453-9.801                c0-0.033,0.034-0.084,0.102-0.152c1.635,2.066,3.048,3.961,4.241,5.688c0.613,0.947,1.294,1.455,2.044,1.523                c0.749,0.102,1.481-0.068,2.197-0.508c0.715-0.508,1.124-1.134,1.227-1.879c0.034-0.947-0.171-1.744-0.613-2.387                c-1.874-2.268-4.19-4.891-6.949-7.871c0.306-1.252,0.562-2.809,0.766-4.672h6.131c1.022,0,1.822-0.422,2.402-1.27v15.082                c-0.035,1.523,0.562,2.877,1.788,4.063c1.124,1.05,2.453,1.592,3.985,1.625h8.073c1.566,0,2.929-0.575,4.087-1.727              c1.056-1.117,1.601-2.438,1.635-3.961V34.599c-0.034-1.523-0.528-2.844-1.482-3.961C65.795,29.419,64.381,28.828,62.678,28.861z             M62.525,64.661c-0.034,0.609-0.239,1.117-0.613,1.523c-0.409,0.439-0.937,0.66-1.584,0.66h-3.321c-0.648,0-1.193-0.221-1.635-0.66               c-0.443-0.439-0.664-0.947-0.664-1.523V37.037c0-0.541,0.221-1.066,0.664-1.574c0.442-0.541,0.987-0.795,1.635-0.762h3.321              c0.613,0,1.141,0.237,1.584,0.711c0.409,0.44,0.613,0.982,0.613,1.625V64.661z M94.174,36.833h11.292               c-0.205,0.644-0.46,1.405-0.767,2.285h-6.233c-1.057,0-1.993,0.39-2.811,1.168c-0.75,0.813-1.124,1.744-1.124,2.793v19.195              c-0.034,1.152,0.357,2.252,1.175,3.301c0.646,0.847,1.566,1.287,2.76,1.32h20.795c1.158,0,2.214-0.457,3.168-1.371              c0.954-0.947,1.448-2.031,1.482-3.25V43.08c-0.034-1.117-0.443-2.031-1.227-2.742c-0.92-0.846-2.062-1.252-3.424-1.219h-8.328               c0.238-0.813,0.46-1.574,0.664-2.285h12.212c0.852,0,1.533-0.287,2.044-0.863c0.511-0.541,0.767-1.201,0.767-1.98               c0-0.846-0.256-1.54-0.767-2.082c-0.511-0.439-1.192-0.677-2.044-0.711h-3.883c0.919-1.93,1.191-3.334,0.817-4.215              c-0.307-0.744-0.869-1.252-1.687-1.523c-0.852-0.305-1.602-0.305-2.248,0c-0.75,0.339-1.295,0.982-1.635,1.93               c-0.341,1.016-0.988,2.285-1.942,3.809h-8.072c-1.567-3.588-3.015-5.518-4.344-5.789c-0.749-0.135-1.481,0.034-2.196,0.508              c-0.75,0.44-1.193,1.05-1.329,1.828c-0.137,0.813,0.068,1.625,0.613,2.438c0.204,0.237,0.409,0.576,0.613,1.016h-4.343              c-0.853,0-1.551,0.271-2.095,0.813c-0.511,0.542-0.767,1.202-0.767,1.98c0,0.847,0.255,1.541,0.767,2.082               C92.589,36.58,93.287,36.833,94.174,36.833z M118.035,60.192c-0.034,0.238-0.137,0.475-0.307,0.711             c-0.204,0.238-0.46,0.355-0.767,0.355H101.48c-0.307,0-0.563-0.117-0.767-0.355c-0.205-0.236-0.307-0.473-0.307-0.711v-1.016                h17.628V60.192z M118.035,53.946h-17.628v-2.285h17.628V53.946z M116.962,44.755c0.238,0,0.493,0.119,0.767,0.355               c0.204,0.237,0.307,0.491,0.307,0.762v0.558h-17.628v-0.558c-0.034-0.305,0.067-0.575,0.307-0.813              c0.204-0.203,0.46-0.305,0.767-0.305H116.962z M79.713,33.482c1.431,0.745,3.15,1.98,5.161,3.707               c0.817,0.711,1.652,1.066,2.504,1.066c0.749-0.033,1.447-0.389,2.095-1.066c0.544-0.711,0.8-1.473,0.766-2.285              c-0.034-0.813-0.443-1.557-1.226-2.234c-2.283-1.963-4.394-3.47-6.336-4.52c-0.919-0.508-1.771-0.643-2.555-0.406               c-0.75,0.203-1.346,0.694-1.788,1.473c-0.443,0.813-0.562,1.592-0.358,2.336C78.214,32.297,78.794,32.941,79.713,33.482z                M120.794,68.114c-13.591,0.305-20.626,0.439-21.103,0.406c-5.041-0.609-7.971-2.91-8.788-6.906V45.873              c-0.034-1.455-0.478-2.641-1.329-3.555c-0.919-1.016-2.18-1.506-3.781-1.473h-5.11c-0.954,0-1.755,0.271-2.401,0.813                c-0.511,0.508-0.801,1.202-0.869,2.082c0.034,0.813,0.307,1.507,0.817,2.082c0.613,0.542,1.431,0.83,2.453,0.863h2.197              c0.511,0,0.988,0.188,1.431,0.559c0.34,0.34,0.511,0.797,0.511,1.371v13.965c-0.204,2.168-1.652,4.147-4.343,5.941              c-2.487,1.219-3.339,2.742-2.555,4.57c0.34,0.711,0.869,1.219,1.583,1.523c1.737,0.508,3.883-0.338,6.438-2.539             c1.158-1.016,2.01-2.014,2.555-2.996c0.817,1.456,2.146,2.691,3.985,3.707c2.452,1.219,5.16,1.828,8.124,1.828h23.504               c1.124-0.033,2.026-0.389,2.708-1.066c0.545-0.643,0.817-1.438,0.817-2.387c-0.102-0.947-0.478-1.692-1.124-2.234               C125.802,68.216,123.894,67.944,120.794,68.114z M180.136,29.775c-0.852-0.744-1.976-1.083-3.372-1.016h-32.803             c-1.022,0-1.84,0.288-2.453,0.863c-0.545,0.508-0.852,1.219-0.92,2.133c0.034,0.847,0.307,1.558,0.818,2.133                c0.646,0.609,1.498,0.914,2.555,0.914H169.1c0.545,0,0.817,0.068,0.817,0.203l-11.548,7.313c-1.056,0.644-1.55,1.507-1.481,2.59             c0.136,1.05,0.527,1.947,1.175,2.691c5.417,4.266,7.938,8.871,7.563,13.813c-0.103,0.645-0.307,1.305-0.613,1.98                c-0.613,1.117-1.55,2.049-2.81,2.793c-1.533,0.847-3.117,1.252-4.752,1.219c-1.057-0.102-2.368-0.355-3.935-0.762               c-1.567-0.541-2.896-1.168-3.985-1.879c-0.853-0.541-1.755-0.762-2.708-0.66c-0.75,0.203-1.397,0.66-1.941,1.371                c-0.443,0.846-0.597,1.709-0.46,2.59c0.307,1.523,2.401,3.014,6.284,4.469c5.621,1.828,10.304,1.676,14.052-0.457               c2.69-1.625,4.632-3.47,5.824-5.535c1.84-4.063,1.566-8.684-0.817-13.863c-1.158-2.268-2.572-4.215-4.241-5.84              c-0.238-0.305-0.357-0.66-0.357-1.066c0.034-0.305,0.323-0.626,0.869-0.965l13.54-9.039c1.157-0.947,1.72-2.115,1.687-3.504             C181.226,31.349,180.852,30.52,180.136,29.775z"/>            </g>        </svg>  ',
	getBtn: '<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"     width="150px" height="100px" viewBox="0 0 150 100" enable-background="new 0 0 150 100" xml:space="preserve"><g>    <path fill="none" d="M45.38,32.559h6.637c-0.035,0.102-0.051,0.238-0.051,0.409c-0.206,1.022-0.429,1.96-0.669,2.813h-2.418        c-1.167,0-2.195,0.443-3.087,1.329c-0.926,0.921-1.389,1.961-1.389,3.119v20.864c0,0.954,0.274,1.722,0.823,2.301       c0.548,0.443,1.251,0.683,2.109,0.716c0.754,0,1.423-0.256,2.007-0.767c0.515-0.545,0.771-1.296,0.771-2.25v-17.54      c-0.034-0.647,0.171-1.176,0.618-1.585c0.342-0.341,0.823-0.512,1.44-0.512h6.638c0.651,0,1.183,0.171,1.595,0.512      c0.445,0.341,0.669,0.92,0.669,1.738v17.387c0,0.954,0.274,1.722,0.823,2.301c0.548,0.443,1.217,0.683,2.007,0.716      c0.857,0,1.577-0.256,2.161-0.767c0.446-0.614,0.686-1.363,0.721-2.25V40.024c0-1.159-0.378-2.113-1.132-2.864      c-0.926-0.92-1.973-1.38-3.139-1.38h-5.042c0.206-1.057,0.429-2.131,0.669-3.222h7.203c0.857,0,1.561-0.29,2.11-0.869       c0.548-0.546,0.823-1.244,0.823-2.097s-0.275-1.568-0.823-2.148c-0.515-0.511-1.218-0.767-2.11-0.767H45.38     c-0.926,0-1.646,0.273-2.161,0.818c-0.549,0.545-0.823,1.244-0.823,2.097s0.274,1.568,0.823,2.147      C43.733,32.286,44.454,32.559,45.38,32.559z M23.976,43.655c0.72-0.716,1.731-1.943,3.036-3.683        c1.474-1.841,3.087-4.175,4.836-7.005c0.137-0.341,0.309-0.528,0.515-0.563c0.206-0.034,0.429-0.018,0.669,0.051L39,38.95       c0.754,0.546,1.509,0.768,2.264,0.665c0.754-0.103,1.423-0.528,2.006-1.278c0.515-0.647,0.721-1.381,0.618-2.199        c-0.035-0.818-0.446-1.5-1.235-2.045l-8.078-7.568c-1.063-0.443-2.093-0.631-3.087-0.563c-1.235,0.103-2.333,1.057-3.293,2.863      c-2.778,4.296-5.574,7.756-8.387,10.381c-0.652,0.647-1.012,1.364-1.08,2.147c-0.035,0.75,0.274,1.467,0.926,2.148      c0.548,0.613,1.252,0.954,2.11,1.022C22.517,44.559,23.255,44.269,23.976,43.655z M35.038,65.593       c3.533-4.705,6.037-8.813,7.512-12.324c0.548-1.363,0.548-2.591,0-3.682c-0.755-1.057-1.852-1.603-3.293-1.637H23.976       c-0.926,0-1.646,0.256-2.161,0.768c-0.549,0.545-0.823,1.261-0.823,2.147c0,0.818,0.274,1.518,0.823,2.097      c0.515,0.546,1.235,0.836,2.161,0.869h10.033c0.548,0,0.96,0.085,1.235,0.256c0.206,0.204,0.24,0.478,0.103,0.818       c-0.241,0.75-2.007,3.238-5.3,7.466c-2.881-1.739-4.871-2.438-5.968-2.097c-0.755,0.238-1.304,0.767-1.647,1.585        c-0.343,0.818-0.411,1.568-0.206,2.25c0.309,0.75,0.926,1.347,1.853,1.79c2.709,1.261,6.071,3.408,10.084,6.443     c0.857,0.646,1.68,0.937,2.47,0.869c0.754-0.034,1.423-0.409,2.007-1.125c0.514-0.751,0.72-1.518,0.617-2.302       C39.154,68.933,37.747,67.535,35.038,65.593z M31.385,38.439c-0.755,0.034-1.424,0.357-2.007,0.971     c-0.549,0.648-0.806,1.33-0.771,2.046c0.034,0.818,0.411,1.534,1.132,2.147c0.445,0.409,1.011,1.023,1.698,1.841        c0.548,0.818,1.217,1.313,2.007,1.483c0.72,0.137,1.44-0.034,2.161-0.512c0.651-0.511,1.063-1.142,1.234-1.892      c0.137-1.534-0.943-3.238-3.241-5.114C32.877,38.764,32.139,38.439,31.385,38.439z M67.916,69.734      c-2.401-1.773-4.563-3.103-6.483-3.988c-0.926-0.409-1.784-0.494-2.573-0.256c-0.72,0.307-1.27,0.835-1.646,1.585       c-0.343,0.818-0.36,1.567-0.051,2.25c0.239,0.75,0.823,1.347,1.749,1.79c1.475,0.647,3.293,1.772,5.454,3.375       c0.823,0.545,1.646,0.801,2.47,0.767c0.754-0.137,1.389-0.546,1.904-1.227c0.515-0.716,0.702-1.45,0.566-2.199      C69.168,71.081,68.705,70.382,67.916,69.734z M58.655,59.456V46.979c0-1.022-0.292-1.841-0.875-2.454       c-0.549-0.512-1.252-0.784-2.109-0.818c-0.858,0.034-1.562,0.324-2.11,0.869c-0.549,0.614-0.823,1.415-0.823,2.403v12.478       c0,2.387-1.149,4.432-3.447,6.137c-1.44,0.954-3.208,1.806-5.299,2.557c-1.029,0.238-1.784,0.732-2.264,1.482       c-0.343,0.647-0.429,1.415-0.257,2.302c0.24,0.852,0.72,1.465,1.441,1.841c0.857,0.545,2.486,0.357,4.888-0.563     c5.866-2.659,9.347-6.273,10.445-10.841C58.449,61.553,58.585,60.581,58.655,59.456z M131.45,69.428        c-2.265-2.489-4.254-4.994-5.969-7.518c3.944-7.67,6.174-17.011,6.688-28.022c-0.24-1.363-0.515-2.744-0.823-4.142      c-0.411-0.647-1.029-1.177-1.853-1.586c-0.857-0.408-1.749-0.563-2.675-0.46h-13.893c-0.926,0-1.646,0.256-2.161,0.768      c-0.103,0.034-0.188,0.119-0.257,0.255c-0.138-0.442-0.344-0.8-0.618-1.073c-0.514-0.512-1.218-0.768-2.109-0.768H86.377        c-0.926,0-1.646,0.273-2.161,0.818c-0.549,0.546-0.823,1.245-0.823,2.097c0,0.853,0.274,1.568,0.823,2.147      c0.515,0.546,1.235,0.818,2.161,0.818h0.772v29.864c-1.956,0-3.276,0.357-3.962,1.073c-0.515,0.648-0.755,1.381-0.721,2.199     c0.034,0.92,0.343,1.653,0.926,2.198c0.549,0.512,1.304,0.75,2.265,0.717c3.808-0.205,8.695-0.734,14.664-1.586     c0.033-0.034,0.103-0.034,0.205,0v4.5c0,0.954,0.274,1.756,0.823,2.403c0.549,0.512,1.252,0.784,2.11,0.818     c0.856-0.034,1.56-0.324,2.109-0.869c0.548-0.613,0.84-1.398,0.874-2.353v-5.42c1.27-0.307,2.401-0.598,3.396-0.869     c1.063-0.308,1.715-0.801,1.955-1.483c0.309-0.75,0.36-1.551,0.154-2.403c-0.24-0.818-0.703-1.414-1.39-1.79        c-0.72-0.409-2.093-0.323-4.116,0.256V32.763h1.338c0.754,0,1.526-0.375,2.315-1.125c0.137,0.341,0.36,0.699,0.669,1.074        c0.515,0.546,1.235,0.836,2.161,0.869h11.731c0.856-0.033,1.457,0.153,1.801,0.563c0.96,1.637,0.36,7.074-1.801,16.313      c-0.927,2.659-1.716,4.704-2.367,6.137c-2.71-5.012-4.494-11.114-5.351-18.308c-0.138-0.954-0.55-1.67-1.235-2.147      c-0.617-0.409-1.32-0.563-2.109-0.46c-0.823,0.204-1.44,0.597-1.853,1.176c-0.446,0.648-0.583,1.449-0.411,2.403        c1.371,7.092,3.172,13.04,5.402,17.847c0.754,1.671,1.544,3.29,2.367,4.858c-1.888,2.761-4.306,5.028-7.255,6.801       c-0.755,0.512-1.235,1.142-1.441,1.893c-0.137,0.749,0.052,1.517,0.566,2.301c0.445,0.716,1.029,1.192,1.749,1.432      c0.754,0.238,1.577,0.052,2.47-0.563c2.573-1.738,4.87-3.938,6.895-6.597c3.088,4.909,5.454,7.415,7.101,7.518      c0.754,0.033,1.509-0.223,2.265-0.768c0.548-0.613,0.891-1.313,1.028-2.097C132.479,71.029,132.136,70.211,131.45,69.428z        M100.526,61.093c-0.926,0.102-1.887,0.222-2.881,0.357c-1.578,0.205-3.105,0.409-4.579,0.614v-6.495h7.46V61.093z M100.526,49.894      h-7.46v-5.574h7.46V49.894z M100.526,38.644h-7.46v-5.881h7.46V38.644z"/></g></svg>',
	challengeBtn: '<svg style="margin-top: -10px" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"            width="220px" height="100px" viewBox="0 0 220 100" enable-background="new 0 0 220 100" xml:space="preserve">            <g>             <path fill="#fff" d="M55.442,48.718c0.786,0,1.415-0.266,1.887-0.797c0.472-0.5,0.708-1.109,0.708-1.828               c0-0.781-0.236-1.422-0.708-1.922c-0.472-0.406-1.101-0.625-1.887-0.656H51.15c0.22-0.938,0.472-1.922,0.754-2.953              c0.189-0.938,0.346-1.719,0.472-2.344h1.368c0.786,0,1.415-0.266,1.887-0.797c0.472-0.5,0.708-1.109,0.708-1.828                c0-0.781-0.236-1.422-0.708-1.922c-0.472-0.406-1.101-0.625-1.887-0.656h-8.348c-0.377-2.375-0.959-3.813-1.745-4.313               c-0.597-0.375-1.29-0.469-2.075-0.281c-0.786,0.219-1.368,0.625-1.745,1.219c-0.314,0.594-0.299,1.719,0.047,3.375h-8.396               c-0.786,0-1.431,0.25-1.934,0.75c-0.472,0.5-0.708,1.109-0.708,1.828c0,0.781,0.236,1.422,0.708,1.922              c0.472,0.469,1.116,0.703,1.934,0.703h1.085c0.597,2.25,1.021,4.016,1.273,5.297h-3.679c-0.787,0-1.431,0.25-1.934,0.75             c-0.471,0.5-0.708,1.109-0.708,1.828c0,0.781,0.236,1.422,0.708,1.922c0.472,0.469,1.116,0.703,1.934,0.703h8.631               c-0.472,0.844-1.258,2.109-2.358,3.797h-6.462c-0.314,0-0.55,0.031-0.708,0.094c0.095-0.594,0-1.188-0.283-1.781                c-0.315-0.688-0.802-1.141-1.462-1.359c-0.598-0.219-1.305-0.172-2.122,0.141c-0.598,0.281-1.368,0.594-2.311,0.938v-7.734h3.301                c0.786,0,1.431-0.266,1.934-0.797c0.503-0.5,0.755-1.141,0.755-1.922s-0.252-1.438-0.755-1.969             c-0.471-0.469-1.116-0.703-1.934-0.703h-3.301v-6.328c0-0.938-0.268-1.688-0.802-2.25c-0.503-0.469-1.148-0.719-1.934-0.75              c-0.786,0.031-1.431,0.297-1.934,0.797c-0.503,0.563-0.755,1.297-0.755,2.203v6.328h-3.349c-0.849,0-1.509,0.25-1.981,0.75              c-0.503,0.5-0.754,1.141-0.754,1.922s0.251,1.438,0.754,1.969c0.472,0.5,1.132,0.75,1.981,0.75h3.349v9.328             c-1.509,0.406-2.877,0.75-4.103,1.031c-0.787,0.125-1.384,0.516-1.792,1.172c-0.377,0.594-0.488,1.266-0.33,2.016               c0.125,0.781,0.502,1.375,1.132,1.781c0.566,0.375,1.257,0.484,2.075,0.328c0.88-0.188,1.887-0.422,3.019-0.703v8.344               c0.031,0.78-0.158,1.374-0.566,1.781c-0.409,0.281-1.116,0.437-2.122,0.469c-1.887-0.281-3.035,0.422-3.443,2.109               c-0.094,0.75,0.047,1.421,0.424,2.016c0.409,0.593,1.085,0.984,2.028,1.172c2.924,0.375,5.015,0.141,6.273-0.703                c1.887-1.219,2.83-3.032,2.83-5.438V56.218c1.634-0.5,3.049-1,4.245-1.5c0,0.969,0.236,1.734,0.708,2.297               c0.472,0.469,1.116,0.703,1.934,0.703h1.934c-1.887,1.875-2.705,3.578-2.453,5.109c0.314,1.5,1.383,2.531,3.207,3.094l4.198,1.547               c-1.918,0.499-4.15,0.874-6.697,1.125c-0.881,0-1.62,0.265-2.217,0.797c-0.503,0.469-0.802,1.108-0.896,1.922               c0.031,0.78,0.283,1.453,0.754,2.016c0.566,0.499,1.336,0.78,2.311,0.844c5.283-0.656,9.92-2.032,13.914-4.125l9.669,3.469              c0.88,0.312,1.682,0.328,2.405,0.047c0.597-0.313,1.053-0.813,1.368-1.5c0.219-0.782,0.188-1.485-0.095-2.109               c-0.314-0.656-0.896-1.142-1.745-1.453l-6.792-2.25c2.578-2.719,4.323-5.563,5.235-8.531h1.368c0.786,0,1.415-0.266,1.887-0.797             c0.472-0.5,0.708-1.109,0.708-1.828c0-0.781-0.236-1.422-0.708-1.922c-0.472-0.406-1.101-0.625-1.887-0.656H42.661              c0.88-1.406,1.619-2.672,2.217-3.797H55.442z M48.368,57.718c-0.315,0.844-0.692,1.641-1.132,2.391             c-1.038,1.688-2.217,3.063-3.538,4.125c-0.126,0.031-0.236,0.109-0.33,0.234l-6.933-2.344c-0.472-0.188-0.739-0.453-0.802-0.797             c-0.032-0.313,0.125-0.625,0.471-0.938c0.88-0.875,1.761-1.766,2.642-2.672H48.368z M39.312,43.515             c-0.315-2.094-0.724-3.859-1.226-5.297H47c-0.189,1.406-0.645,3.172-1.368,5.297H39.312z M104.551,42.624               c-0.85-0.406-1.73-0.641-2.642-0.703h-2.358c1.321-3.219,1.714-5.313,1.179-6.281c-0.22-0.406-0.55-0.734-0.99-0.984                c2.453-0.469,3.835-1.031,4.151-1.688c0.313-0.656,0.408-1.391,0.282-2.203c-0.188-0.75-0.565-1.328-1.132-1.734                c-0.566-0.375-1.305-0.484-2.216-0.328c-6.98,1.438-17.703,2.109-32.167,2.016c-0.849-0.031-1.541,0.219-2.076,0.75             c-0.503,0.5-0.771,1.156-0.802,1.969c-0.032,0.844,0.205,1.516,0.708,2.016c0.472,0.563,1.839,0.844,4.104,0.844                c-0.314,0.313-0.519,0.688-0.613,1.125c-0.126,0.75,0.047,1.5,0.519,2.25c0.377,0.563,0.754,1.313,1.132,2.25h-2.453                c-1.258-0.094-2.421,0.391-3.49,1.453c-1.069,1.063-1.557,2.234-1.462,3.516v5.016c0,0.875,0.251,1.594,0.754,2.156             c0.472,0.469,1.116,0.734,1.934,0.797c0.754-0.031,1.398-0.281,1.934-0.75c0.502-0.563,0.77-1.297,0.802-2.203V49.14                c-0.032-0.469,0.142-0.906,0.519-1.313c0.408-0.375,0.849-0.547,1.32-0.516h27.969c0.755-0.031,1.257,0.328,1.509,1.078             c0.189,0.5,0.157,1.547-0.094,3.141c-0.503,1.813,0.094,3,1.792,3.563c0.754,0.188,1.445,0.125,2.075-0.188             c0.66-0.375,1.115-1.016,1.367-1.922c0.943-3.5,0.975-6.25,0.095-8.25C105.824,43.952,105.273,43.249,104.551,42.624z               M77.383,41.921c-0.188-1.406-0.975-3.156-2.358-5.25c-0.126-0.188-0.236-0.313-0.33-0.375c2.389-0.094,5.015-0.188,7.876-0.281              c-0.315,0.219-0.551,0.531-0.708,0.938c-0.221,0.688-0.173,1.469,0.142,2.344c0.283,0.594,0.534,1.469,0.754,2.625H77.383z              M95.636,36.53c-0.377,1.438-1.085,3.234-2.123,5.391h-5.188c0-2.188-0.629-4.078-1.887-5.672               c-0.126-0.188-0.252-0.313-0.377-0.375c0.849-0.094,1.745-0.156,2.688-0.188c2.767-0.125,5.298-0.313,7.594-0.563               C96.029,35.437,95.793,35.905,95.636,36.53z M102.381,68.499c-4.654-1.157-8.6-2.47-11.838-3.938               c3.49-2.719,6.226-5.844,8.207-9.375c0.566-1.063,0.755-1.984,0.566-2.766c-0.126-0.875-0.535-1.625-1.227-2.25             c-0.692-0.594-1.62-0.906-2.783-0.938H74.082c-0.849,0-1.509,0.234-1.981,0.703c-0.503,0.5-0.755,1.156-0.755,1.969             c0,0.75,0.251,1.391,0.755,1.922c0.472,0.5,1.132,0.766,1.981,0.797h16.696c0.691,0,1.147,0.125,1.368,0.375                c0.125,0.219,0.125,0.484,0,0.797c-1.541,2.094-3.758,4.125-6.65,6.094c-2.358-1.5-4.843-3.344-7.452-5.531             c-0.692-0.594-1.447-0.859-2.264-0.797c-0.692,0.125-1.29,0.469-1.792,1.031c-0.472,0.656-0.661,1.313-0.566,1.969              c0.095,0.75,0.487,1.406,1.179,1.969c1.823,1.438,3.71,2.813,5.66,4.125c-4.528,1.437-8.348,2.499-11.461,3.188             c-0.849,0.124-1.494,0.469-1.934,1.031c-0.409,0.563-0.582,1.266-0.519,2.109c0.125,0.75,0.472,1.374,1.038,1.875               c0.566,0.469,1.274,0.656,2.123,0.563c5.879-1.313,11.226-3.188,16.036-5.625c6.603,3.469,11.98,5.546,16.13,6.234              c0.502,0,1.021-0.11,1.557-0.328c0.597-0.313,1.038-0.876,1.321-1.688c0.188-0.75,0.125-1.453-0.189-2.109              C103.953,69.217,103.292,68.748,102.381,68.499z M129.746,51.53c0.094-0.688-0.047-1.375-0.425-2.063               c-0.472-0.688-1.021-1.109-1.65-1.266c-0.755-0.125-1.871,0.281-3.349,1.219v-6.797h2.169c0.786,0,1.431-0.266,1.935-0.797              c0.502-0.5,0.754-1.141,0.754-1.922s-0.252-1.438-0.754-1.969c-0.472-0.469-1.117-0.703-1.935-0.703h-2.169v-6.141              c0-0.938-0.268-1.688-0.802-2.25c-0.504-0.469-1.148-0.719-1.934-0.75c-0.787,0.031-1.432,0.297-1.935,0.797                c-0.503,0.563-0.754,1.297-0.754,2.203v6.141h-2.595c-0.849,0-1.509,0.25-1.98,0.75c-0.504,0.5-0.755,1.141-0.755,1.922             s0.251,1.438,0.755,1.969c0.472,0.5,1.132,0.75,1.98,0.75h2.595v9.234c-1.259,0.406-2.5,0.781-3.727,1.125              c-0.786,0.219-1.353,0.656-1.698,1.313c-0.314,0.688-0.33,1.438-0.047,2.25c0.22,0.75,0.676,1.297,1.368,1.641              c0.691,0.313,1.43,0.344,2.217,0.094c0.597-0.219,1.227-0.438,1.887-0.656v8.484c0.03,0.78-0.158,1.374-0.566,1.781             c-0.377,0.281-1.069,0.375-2.075,0.281c-1.887-0.375-3.035,0.296-3.443,2.016c-0.126,0.75-0.016,1.437,0.33,2.063               c0.661,0.968,2.06,1.468,4.198,1.5c1.98,0,3.364-0.267,4.15-0.797c1.887-1.219,2.83-3.032,2.83-5.438V55.468                c1.604-0.75,3.002-1.5,4.197-2.25C129.211,52.749,129.62,52.187,129.746,51.53z M156.536,61.468                c-0.787,0.031-1.432,0.281-1.935,0.75c-0.503,0.594-0.786,1.313-0.849,2.156c-0.031,1.999-0.221,3.124-0.566,3.375              c-0.66,0.281-1.572,0.422-2.735,0.422c-0.503-0.032-0.912-0.188-1.227-0.469c-0.22-0.22-0.346-0.609-0.377-1.172V55.14              c1.981,1.5,3.694,2.875,5.142,4.125c0.754,0.688,1.492,0.969,2.216,0.844c0.691-0.031,1.305-0.344,1.84-0.938               c0.503-0.594,0.707-1.25,0.613-1.969c-0.126-0.875-0.488-1.547-1.085-2.016c-2.39-1.688-5.299-3.625-8.726-5.813v-3.516             c5.69-5.813,8.427-9.75,8.207-11.813c-0.032-0.031-0.048-0.078-0.048-0.141c-0.22-0.656-0.645-1.203-1.272-1.641                c-0.692-0.375-1.385-0.469-2.076-0.281s-1.289,0.672-1.792,1.453c-0.755,1.313-1.761,2.781-3.019,4.406v-6.75               c0-0.938-0.268-1.688-0.802-2.25c-0.503-0.469-1.148-0.719-1.934-0.75c-0.786,0.031-1.432,0.297-1.934,0.797                c-0.504,0.563-0.755,1.297-0.755,2.203v37.594c0,1.249,0.393,2.344,1.179,3.281c0.975,0.968,2.279,1.5,3.915,1.594              c2.012,0.094,3.915,0.094,5.707,0c1.446-0.032,2.516-0.501,3.207-1.406c0.755-0.844,1.336-3.392,1.745-7.641                c0.031-0.938-0.205-1.688-0.707-2.25C157.966,61.796,157.321,61.53,156.536,61.468z M138.377,28.28             c-0.786,0.031-1.431,0.297-1.934,0.797c-0.503,0.563-0.755,1.297-0.755,2.203v8.25c-0.943-2.563-1.902-4.781-2.877-6.656                c-0.409-0.781-0.959-1.281-1.65-1.5c-0.66-0.219-1.321-0.141-1.981,0.234c-0.691,0.406-1.132,0.922-1.32,1.547              c-0.188,0.688-0.079,1.422,0.33,2.203c1.163,2.094,2.312,5.063,3.443,8.906c0.283,0.875,0.723,1.5,1.32,1.875               c0.566,0.375,1.227,0.453,1.98,0.234c0.22-0.094,0.473-0.203,0.755-0.328v4.078c-2.641,2.438-5.393,4.359-8.254,5.766               c-0.786,0.469-1.32,1.078-1.604,1.828c-0.126,0.688-0.031,1.391,0.283,2.109c0.472,0.688,1.038,1.125,1.698,1.313               c1.32,0.375,3.726-0.906,7.216-3.844c0.125-0.125,0.299-0.266,0.519-0.422c0,2.438-0.912,4.969-2.735,7.594             c-0.943,1.343-2.06,2.484-3.349,3.422c-0.503,0.375-0.943,0.656-1.32,0.844c-0.85,0.469-1.399,1.078-1.651,1.828                c-0.126,0.687-0.031,1.39,0.283,2.109c0.408,0.687,0.975,1.125,1.698,1.313c0.88,0.281,2.279-0.204,4.197-1.453             c5.313-3.938,8.128-9.875,8.442-17.813V31.28c0-0.938-0.268-1.688-0.802-2.25C139.808,28.562,139.163,28.312,138.377,28.28z             M197.39,34.233c0.975,0.594,2.201,1.547,3.679,2.859c0.691,0.656,1.415,1,2.17,1.031c0.691,0,1.32-0.281,1.887-0.844                c0.566-0.594,0.833-1.266,0.802-2.016c-0.095-1.625-1.997-3.516-5.707-5.672c-0.786-0.469-1.541-0.625-2.264-0.469              c-0.692,0.125-1.243,0.547-1.651,1.266c-0.408,0.688-0.534,1.375-0.377,2.063C196.116,33.14,196.604,33.733,197.39,34.233z              M209.464,60.624c-0.472-0.688-1.054-1.094-1.745-1.219c-0.786-0.125-1.462,0-2.027,0.375c-0.881,0.594-1.321,2.141-1.321,4.641              c-0.22,1.249-0.44,1.922-0.66,2.016c-0.377,0-0.975-0.579-1.792-1.734c-0.504-0.688-0.99-1.406-1.462-2.156             c4.15-5.625,6.367-9.688,6.649-12.188c-0.031-0.281-0.094-0.547-0.188-0.797c-0.282-0.656-0.771-1.141-1.462-1.453              c-0.755-0.313-1.462-0.359-2.122-0.141c-0.598,0.219-1.085,0.719-1.463,1.5c-1.54,3.469-2.829,5.938-3.867,7.406                c-1.037-3.375-1.855-6.859-2.452-10.453l11.696-2.719c0.943-0.188,1.635-0.625,2.075-1.313c0.314-0.594,0.394-1.266,0.236-2.016             c-0.188-0.844-0.598-1.438-1.227-1.781c-0.66-0.406-1.446-0.5-2.358-0.281l-11.083,2.578c-0.315-3.469-0.472-6.703-0.472-9.703              c-0.032-0.594-0.236-1.203-0.613-1.828c-0.409-0.688-1.069-1.031-1.981-1.031c-0.943,0.031-1.65,0.344-2.122,0.938              c-0.504,0.594-0.739,1.281-0.708,2.063c0.031,3.313,0.236,6.906,0.613,10.781l-5.518,1.266c-0.943,0.188-1.636,0.609-2.075,1.266                c-0.315,0.656-0.395,1.406-0.236,2.25c0.188,0.688,0.613,1.266,1.273,1.734c0.597,0.313,1.368,0.359,2.312,0.141l4.999-1.125                c0.88,5.156,2.186,9.844,3.915,14.063c-1.793,2-4.262,4.093-7.405,6.281c-0.692,0.499-1.101,1.108-1.227,1.828              c-0.126,0.687,0.063,1.374,0.566,2.063c0.503,0.687,1.068,1.093,1.698,1.219c1.414,0.188,4.386-1.954,8.914-6.422               c2.735,4.249,5.313,6.39,7.734,6.422c1.163,0,2.044-0.173,2.642-0.516c1.227-0.782,2.106-4.017,2.642-9.703             C209.872,62.03,209.747,61.28,209.464,60.624z M180.316,49.796h-3.396v-7.172h5.943c0.785,0,1.431-0.266,1.934-0.797                c0.503-0.5,0.755-1.141,0.755-1.922s-0.252-1.438-0.755-1.969c-0.472-0.469-1.116-0.703-1.934-0.703h-5.943V31.28               c0-0.844-0.282-1.516-0.849-2.016c-0.503-0.469-1.132-0.703-1.887-0.703c-0.786,0-1.446,0.25-1.98,0.75             c-0.472,0.469-0.708,1.125-0.708,1.969v18.516h-2.877c-1.037-0.031-1.918,0.328-2.641,1.078c-0.692,0.75-1.055,1.625-1.085,2.625                v14.578c-0.032,1.155,0.33,2.203,1.085,3.141c0.597,0.78,1.478,1.187,2.641,1.219h11.697c1.132-0.032,2.122-0.469,2.971-1.313               c0.881-0.876,1.337-1.892,1.368-3.047V53.499c-0.031-1.063-0.409-1.906-1.132-2.531C182.643,50.187,181.573,49.796,180.316,49.796z              M179.231,66.015c0,0.281-0.095,0.516-0.283,0.703s-0.424,0.296-0.707,0.328h-6.934c-0.283,0-0.519-0.11-0.707-0.328             c-0.189-0.22-0.283-0.454-0.283-0.703v-9.797c-0.032-0.281,0.063-0.531,0.283-0.75c0.22-0.188,0.455-0.281,0.707-0.281h6.934                c0.22,0,0.455,0.109,0.707,0.328c0.188,0.219,0.283,0.453,0.283,0.703V66.015z"/>          </g>        </svg>',
	dot: '<svg version="1.1" style="width: 600px;height: 600px"     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"   x="0px" y="0px" width="220px" height="100px" viewBox="-53.5 -4.618 220 100" enable-background="new -53.5 -4.618 220 100"    xml:space="preserve"><defs></defs><g>  <g>     <path fill-rule="evenodd" clip-rule="evenodd" fill="#2C7EEE" d="M2.363,16.935C1.058,16.935,0,17.993,0,19.298            c0,1.305,1.058,2.363,2.363,2.363c1.305,0,2.363-1.058,2.363-2.363C4.726,17.993,3.668,16.935,2.363,16.935z M16.935,12.209         c-0.653,0-1.182,0.529-1.182,1.182c0,0.652,0.529,1.181,1.182,1.181c0.652,0,1.181-0.529,1.181-1.181           C18.116,12.738,17.587,12.209,16.935,12.209z M9.846,41.353c-0.87,0-1.575,0.706-1.575,1.576c0,0.87,0.706,1.575,1.575,1.575            c0.87,0,1.576-0.706,1.576-1.575C11.421,42.058,10.716,41.353,9.846,41.353z M105.351,9.452c-0.761,0-1.378,0.617-1.378,1.378           s0.617,1.378,1.378,1.378c0.762,0,1.379-0.617,1.379-1.378S106.112,9.452,105.351,9.452z M38.596,0         c-0.435,0-0.788,0.353-0.788,0.788s0.353,0.788,0.788,0.788c0.435,0,0.788-0.353,0.788-0.788S39.031,0,38.596,0z M30.719,88.613         c-0.87,0-1.575,0.705-1.575,1.575s0.705,1.575,1.575,1.575s1.575-0.705,1.575-1.575S31.589,88.613,30.719,88.613z M103.382,59.863           c-0.979,0-1.772,0.793-1.772,1.772c0,0.979,0.794,1.771,1.772,1.771s1.772-0.793,1.772-1.771           C105.154,60.656,104.36,59.863,103.382,59.863z M114.016,64.195c-0.544,0-0.984,0.44-0.984,0.984s0.44,0.984,0.984,0.984            S115,65.724,115,65.18S114.56,64.195,114.016,64.195z M8.074,59.469c-0.327,0-0.591,0.265-0.591,0.591s0.264,0.591,0.591,0.591          c0.326,0,0.591-0.265,0.591-0.591S8.4,59.469,8.074,59.469z M93.93,89.4c-0.326,0-0.591,0.265-0.591,0.591          s0.265,0.591,0.591,0.591s0.591-0.265,0.591-0.591S94.256,89.4,93.93,89.4z"/> </g></g></svg>',
	cry: '<svg version="1.1"    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"   x="0px" y="0px" width="80px" height="80px" viewBox="-8.98 -16.372 80 80" enable-background="new -8.98 -16.372 80 80"    xml:space="preserve"><defs></defs><g>  <g>     <path fill-rule="evenodd" clip-rule="evenodd" fill="#499BF5" d="M5.554,9.752c2.59,0,4.69-2.184,4.69-4.876           c0-2.693-2.1-4.876-4.69-4.876S0.865,2.183,0.865,4.876C0.865,7.568,2.964,9.752,5.554,9.752z M55.842,9.752            c2.59,0,4.689-2.184,4.689-4.876c0-2.693-2.1-4.876-4.689-4.876s-4.689,2.183-4.689,4.876C51.152,7.568,53.252,9.752,55.842,9.752           z M62.141,47.212c-2.411-15.191-15.398-26.796-31.064-26.796c-15.667,0-28.654,11.604-31.064,26.796c0,0-0.298,2.393,2.112,2.552            c2.526,0,3.01-2.552,3.01-2.552C7.486,34.856,18.2,25.52,31.076,25.52c12.876,0,23.59,9.337,25.942,21.692          c0,0,0.219,2.445,2.381,2.552C62.205,49.977,62.141,47.212,62.141,47.212z"/>  </g></g></svg>',
	loseTest: '<svg style="width:400px;height:120px" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="800px" height="300px" viewBox="0 0 800 300" enable-background="new 0 0 800 300" xml:space="preserve"><path fill-rule="evenodd" clip-rule="evenodd" fill="#247AEB" d="M770.088,169.701c-13.838,0-25.098-11.326-25.098-25.248 c0-13.922,11.26-25.249,25.098-25.249s25.095,11.327,25.095,25.249C795.183,158.375,783.926,169.701,770.088,169.701z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#247AEB" d="M701.667,169.701c-13.838,0-25.096-11.326-25.096-25.248  c0-13.922,11.258-25.249,25.096-25.249s25.098,11.327,25.098,25.249C726.765,158.375,715.505,169.701,701.667,169.701z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#247AEB" d="M633.249,169.701c-13.838,0-25.098-11.326-25.098-25.248 c0-13.922,11.26-25.249,25.098-25.249s25.095,11.327,25.095,25.249C658.344,158.375,647.087,169.701,633.249,169.701z"/><path fill="#247AEB" d="M583.045,240.045c-35.102-3.668-62.579-13.041-81.809-27.885c-17.227,15.777-45.092,25.156-82.975,27.904   l-7.603,0.553v-31.313l6.246-0.748c22.17-2.656,38.144-8.613,47.701-17.762h-51.782v-33.484l-2.165,0.725v-41.646l5.571-1.222   c9.039-1.98,17.065-4.319,23.999-6.986c-7.137-3.384-14.283-5.602-21.321-6.61l-6.084-0.873V65.409l7.389,0.312 c10.306,0.435,19.693,1.995,27.984,4.645V59.192h40.891v25.333c6.121-4.479,10.615-11.029,13.635-19.821l1.644-4.788h45.387 l-3.968,7.974h43.644v28.921l-0.635,1.396c-12.69,27.949-34.034,46.892-63.612,56.532v1.579h64.97v34.477h-53.228   c9.295,8.545,25.323,14.508,47.877,17.785l6.071,0.883v31.4L583.045,240.045z M448.197,156.318v-12.187 c-8.464,3.73-17.904,7.341-28.199,10.783l-4.203,1.403H448.197z M489.088,130.575l0.628-0.152c4.064-0.983,7.587-1.946,10.639-2.873 c-1.058-0.243-2.107-0.47-3.15-0.678l-5.695-1.144v-9.782c-0.798,0.142-1.604,0.271-2.421,0.389V130.575z"/><path fill="#247AEB" d="M273.791,241.533v-45.664h-59.916V85.286h59.916V58.466h47.388v26.819h59.916v69.288   c0.552,14.501-2.592,25.415-9.345,32.44c-5.726,5.959-13.778,8.979-23.933,8.979c-1.182,0-2.399-0.041-3.651-0.123h-22.987v45.664   H273.791z M333.579,160.667c1.641,0,2.315-0.335,2.437-0.462c0.008-0.01,0.792-0.882,0.591-4.362l-0.011-0.406v-34.949h-15.416  v40.18H333.579z M273.791,160.667v-40.18h-15.416v40.18H273.791z"/><path fill="#247AEB" d="M71.231,240.084v-55.51c-11.271,20.381-30.207,36.123-56.621,47.004l-9.792,4.031v-34.537l2.972-2.121 c14.699-10.486,23.947-24.592,28.113-42.947H4.818v-35.928h66.413V108.89H14.203V73.688h57.028V59.192h46.667v14.496h56.307v35.202  h-56.307v11.187h66.413v35.928h-31.811c4.16,18.355,13.407,32.457,28.116,42.947l2.974,2.121v34.537l-9.792-4.031   c-25.862-10.652-44.551-25.959-55.9-45.713v54.219H71.231z"/><g>  <g>     <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" d="M110.807,101.799h56.307v-21.02h-56.307V66.283H78.322v14.496         H21.293v21.02h57.028v25.369H11.909v21.746h32.485c-3.374,24.167-14.201,42.765-32.485,55.81v20.297            c37.538-15.461,58.709-40.828,63.525-76.106h2.888v84.079h32.485v-84.079h2.165c4.806,35.278,25.988,60.646,63.526,76.106v-20.297           c-18.295-13.045-29.123-31.643-32.485-55.81h33.207v-21.746h-66.413V101.799z M374.004,92.376h-59.916V65.557h-33.206v26.819            h-59.916v96.401h59.916v45.664h33.206v-45.664h30.319c20.687,1.451,30.556-9.898,29.597-34.065V92.376z M280.882,167.758h-29.597            v-54.361h29.597V167.758z M333.579,167.758h-19.491v-54.361h29.598v42.04C344.159,163.658,340.798,167.758,333.579,167.758z          M455.288,156.161h26.709V66.283h-26.709v42.765c-9.634,5.323-22.143,9.671-37.538,13.046v26.095           c14.438-4.826,26.946-9.899,37.538-15.222V156.161z M450.233,78.604c-8.663-3.375-18.769-5.312-30.318-5.798v21.745         c10.107,1.45,20.213,5.074,30.318,10.872V78.604z M523.144,183.705h59.917v-20.297h-64.97v-10.146h-18.046          c39.939-5.798,67.37-25.12,82.293-57.986V74.98h-47.644c0.473-0.962,1.195-2.412,2.165-4.349c0.476-1.45,0.96-2.651,1.444-3.625         h-28.876c-4.814,14.021-13.242,23.443-25.266,28.269v14.497c5.29-0.477,10.107-1.45,14.438-2.899v13.046            c7.218,1.45,14.673,3.624,22.378,6.523c-5.775,3.874-15.646,7.499-29.597,10.873v15.946h-7.942v10.146h-63.524v20.297h58.472            c-8.188,17.395-28.4,28.029-60.637,31.893v17.395c39.939-2.898,67.607-13.047,83.016-30.443            c18.283,16.424,45.952,26.57,83.016,30.443v-17.395C550.574,210.773,530.363,200.137,523.144,183.705z M510.15,102.523          c4.33-1.925,8.179-4.349,11.551-7.248h28.873c-7.218,11.121-13.715,19.333-19.49,24.644v-13.046            C524.824,104.46,517.844,103.01,510.15,102.523z M633.249,126.296c-9.944,0-18.007,8.129-18.007,18.158         c0,10.027,8.063,18.156,18.007,18.156c9.943,0,18.004-8.129,18.004-18.156C651.253,134.425,643.192,126.296,633.249,126.296z             M701.667,126.296c-9.944,0-18.004,8.129-18.004,18.158c0,10.027,8.06,18.156,18.004,18.156c9.943,0,18.007-8.129,18.007-18.156         C719.674,134.425,711.61,126.296,701.667,126.296z M770.088,126.296c-9.944,0-18.007,8.129-18.007,18.158           c0,10.027,8.063,18.156,18.007,18.156c9.943,0,18.004-8.129,18.004-18.156C788.092,134.425,780.031,126.296,770.088,126.296z"/> </g></g></svg>',
	winTest: '<svg version="1.1" style="width: 320px;height:118px" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="800px" height="300px" viewBox="0 0 800 300" enable-background="new 0 0 800 300" xml:space="preserve"><polygon fill="none" points="706.948,272.125 706.948,181.432 709.815,181.432 705.242,42.813 800,42.813 795.427,181.432     799.108,181.432 799.108,272.125 "/><polygon fill="#247AEB" points="725.562,253.512 725.562,200.045 729.053,200.045 724.479,61.426 780.761,61.426 776.19,200.045     780.496,200.045 780.496,253.512 "/><path fill="#247AEB" d="M500.929,256.771V149.279c-0.144,0.044-0.286,0.088-0.435,0.131c-2.287,1.13-4.305,1.98-6.143,2.584 l-10.477,3.456v-35.479l3.285-2.386c13.955-10.148,23.833-29.089,29.362-56.292l1.295-6.391h49.541l-0.328,1.633h44.87v7.978    c0,0.937-0.094,2.038-0.294,3.438h75.008v62.43h-11.367v2.626c0,28.818,3.976,49.914,11.813,62.695l1.179,1.919v42.055  l-11.919-6.773c-16.595-9.431-28.616-23.315-35.996-41.514v27.238c0.314,11.794-2.717,21.164-9.023,27.637  c-6.279,6.448-15.508,9.718-27.42,9.718c-0.005,0-1.188-0.009-1.791-0.024l-32.135,0.003v-33.729   c-4.685,4.324-9.904,8.146-15.651,11.462l-4.125,2.376v20.704h-49.25V256.771z M590.157,218.802    c0.058-0.438,0.106-1.031,0.106-1.811v-23.455c-4.279,9.644-9.888,18.075-16.804,25.266H590.157z M550.184,180.17   c3.155-11.039,4.871-25.271,5.126-42.574c-1.388,0.488-2.808,0.953-4.251,1.399l-0.875,0.273V180.17z M590.264,125.028v-9.319   c-3.088,3.378-6.567,6.486-10.434,9.319H590.264z"/><path fill="#247AEB" d="M413.31,254.348c-0.577,0-1.164-0.01-1.762-0.025l-141.742,0.003v-49.741h-14.62v-34.708h18.679v-46.832  h-6.498V96.952h-9.745V62.241h73.09V53.27h52.501v8.971h74.71v34.711h-11.367v26.092h-4.872v12.194 c0.627,12.088-2.034,21.364-7.904,27.567c-2.858,3.019-6.38,5.237-10.527,6.641l-0.215,0.43h37.324v34.711h-14.619v14.63    c0.615,11.257-1.982,20.05-7.723,26.134C432.387,251.323,424.073,254.348,413.31,254.348L413.31,254.348z"/><path fill="#247AEB" d="M109.052,255.982c-0.566,0-1.144-0.011-1.725-0.027l-32.104,0.003v-11.414H35.432v-7.979   c0-1.675,0.429-3.395,1.338-5.359c3.97-13.018,7.982-24.95,11.986-35.651c-3.913,0.896-7.969,1.697-12.15,2.396l-9.294,1.555    v-36.109l6.134-1.46c11.618-2.763,21.355-6.993,29.408-12.799H27.312v-38.785h39.795v-4.433H33.812V67.133h33.295V53.27h50.876  v13.863h22.212V53.27h50.063v13.863h33.297v38.786h-33.297v4.433h39.792v38.785h-35.552c8.05,5.806,17.795,10.037,29.418,12.799 l6.131,1.46v36.868l-9.886-2.437c-1.028-0.254-2.223-0.566-3.575-0.932c4.7,12.009,8.841,24.594,12.368,37.577l2.734,10.068h-84.664 l-1.054-6.747c-0.915-5.861-2.127-11.854-3.63-17.959v1.236C142.342,243.255,130.208,255.982,109.052,255.982z M91.321,218.802  c0.41,0,0.74-0.02,1.005-0.045c-0.002-0.075-0.049-0.595-0.049-0.595v-12.435c-1.555,4.671-2.95,9.028-4.183,13.072h3.228V218.802z   M154.523,173.954c-4.318-3.194-8.382-6.761-12.181-10.691v10.691H154.523z M132.256,151.122c-0.47-0.654-0.932-1.316-1.387-1.986   h-4.578c-0.496,0.669-0.993,1.332-1.496,1.986H132.256z M140.191,110.352v-4.433h-22.212v4.433H140.191z"/><g>  <g>     <path fill="#FFFFFF" d="M182.277,97.941h33.298v-22.83h-33.298V61.247h-34.108v13.865h-38.167V61.247H75.079v13.865H41.786v22.83           h33.293v20.387H35.286v22.831h47.102c-10.836,14.142-26.533,23.646-47.102,28.538v20.384c9.746-1.63,18.679-3.796,26.801-6.522          c-5.964,14.142-11.914,30.986-17.865,50.562c-0.545,1.077-0.813,1.896-0.813,2.445h31.673c2.703-12.5,8.385-30.705,17.053-54.636            h-24.36c12.994-3.799,23.817-9.238,32.482-16.31v52.187c0.536,5.993-2.436,8.972-8.932,8.972h-8.12v21.202h24.365           c17.865,0.535,26.8-8.434,26.8-26.907V159.1h-27.614c5.407-4.895,10.559-10.87,15.433-17.94h12.994         c12.994,20.664,30.859,34.245,53.6,40.771h-14.62c7.574,18.489,12.994,36.695,16.24,54.636h30.86           c-4.874-17.94-10.836-34.783-17.866-50.561c2.158,0.551,5.406,1.096,9.745,1.63c3.781,1.097,6.762,1.912,8.933,2.446v-20.384            c-20.582-4.892-36.279-14.396-47.103-28.538h47.103v-22.831h-39.792V97.941H182.277z M148.169,118.328h-38.167V97.941h38.167            V118.328z M138.424,181.93c7.577,19.034,12.716,37.244,15.429,54.636h30.86c-5.419-21.204-11.646-39.407-18.678-54.636H138.424z          M415.028,169.697c0-1.082,0.265-2.164,0.81-3.262h-35.73c-1.626,4.357-2.436,7.619-2.436,9.785            c-0.548,0.547-0.815,1.095-0.815,1.63h-38.982c0-1.083-0.543-2.446-1.623-4.077c-0.545-3.261-1.09-5.704-1.625-7.338h-35.731            c0.532,1.096,0.813,2.176,0.813,3.262c1.625,3.812,2.701,6.523,3.248,8.153h-39.792v18.757h189.222v-18.757h-40.607         C413.403,174.59,414.48,171.878,415.028,169.697z M437.765,203.133H277.78v43.217h133.997c18.4,0.536,27.068-8.434,25.985-26.907            v-16.31H437.765z M395.537,230.043h-83.649v-10.601h91.766v4.077C404.188,227.874,401.491,230.043,395.537,230.043z          M338.692,96.311h-63.345v18.753H438.58V96.311h-63.342v-7.339h74.711V70.216h-74.711v-8.972h-36.546v8.972h-73.09v18.756h73.09         V96.311L338.692,96.311z M281.844,121.59v41.586h126.689c17.866,1.096,26.253-8.151,25.177-27.723v-13.861H281.844V121.59z           M393.102,147.679h-77.965v-10.597h85.271v2.446C400.943,145.517,398.508,148.23,393.102,147.679z M592.554,133.005h-29.236         c0,30.987-4.34,53.283-12.994,66.866v26.907C579.56,209.934,593.632,178.667,592.554,133.005z M592.554,98.757h54.41v23.646         h31.673V75.926h-77.149c0.532-1.631,1.077-3.529,1.622-5.708c0.533-2.713,0.813-4.612,0.813-5.705h-33.295          c-2.169,19.566-9.479,35.061-21.928,46.477v20.386C569.814,124.849,584.435,113.981,592.554,98.757z M639.656,133.005           c-1.622,45.662,11.903,76.65,40.608,92.958v-26.092c-8.669-14.129-12.994-36.414-12.994-66.866H639.656L639.656,133.005z             M598.24,216.991c0,7.071-2.716,10.333-8.122,9.787h-12.184v21.202H602.3c20.569,0.535,30.579-9.252,30.047-29.355V113.434H598.24           V216.991z M524.341,62.877c-5.965,29.356-16.788,49.743-32.487,61.159v20.387c1.622-0.535,3.513-1.35,5.687-2.446           c5.405-1.631,9.2-2.981,11.365-4.077v110.899h33.298V108.547c6.495-11.416,11.637-26.63,15.431-45.664h-33.293V62.877z           M768.458,192.526l4.06-123.125h-39.795l4.062,123.125H768.458z M733.539,245.534h38.979v-37.509h-38.979V245.534z"/>   </g></g></svg>',
	winDetail: '<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="85px" height="300px" viewBox="0 0 85 300" enable-background="new 0 0 85 300" xml:space="preserve"><path fill-rule="evenodd" clip-rule="evenodd" fill="#1CA7FF" d="M85,20.441c-1.104,0-2,0.918-2,2.05c0,1.132,0.896,2.05,2,2.05  v3.05c-1.104,0-2,0.918-2,2.05c0,1.132,0.896,2.05,2,2.05v3.05c-1.104,0-2,0.918-2,2.05s0.896,2.05,2,2.05v3.05 c-1.104,0-2,0.917-2,2.05s0.896,2.05,2,2.05v3.05c-1.104,0-2,0.917-2,2.05s0.896,2.05,2,2.05v3.05c-1.104,0-2,0.918-2,2.05  c0,1.132,0.896,2.05,2,2.05v3.05c-1.104,0-2,0.918-2,2.05c0,1.132,0.896,2.05,2,2.05v3c-1.104,0-2,0.918-2,2.05 c0,1.132,0.896,2.05,2,2.05v3.05c-1.104,0-2,0.918-2,2.05c0,1.132,0.896,2.05,2,2.05v3.05c-1.104,0-2,0.918-2,2.05  s0.896,2.05,2,2.05v3.05c-1.104,0-2,0.917-2,2.05s0.896,2.05,2,2.05v3.05c-1.104,0-2,0.917-2,2.05s0.896,2.05,2,2.05v3.05   c-1.104,0-2,0.918-2,2.05c0,1.132,0.896,2.05,2,2.05v3.05c-1.104,0-2,0.918-2,2.05c0,1.132,0.896,2.05,2,2.05v4 c-1.104,0-2,0.918-2,2.05c0,1.132,0.896,2.05,2,2.05v3.05c-1.104,0-2,0.918-2,2.05c0,1.132,0.896,2.05,2,2.05v3.05  c-1.104,0-2,0.918-2,2.05c0,1.133,0.896,2.051,2,2.051v3.05c-1.104,0-2,0.917-2,2.05s0.896,2.05,2,2.05v3.05    c-1.104,0-2,0.918-2,2.051c0,1.131,0.896,2.049,2,2.049v3.051c-1.104,0-2,0.918-2,2.049c0,1.133,0.896,2.051,2,2.051v3.051  c-1.104,0-2,0.918-2,2.049c0,1.133,0.896,2.051,2,2.051v3c-1.104,0-2,0.918-2,2.049c0,1.133,0.896,2.051,2,2.051v3.051  c-1.104,0-2,0.918-2,2.049c0,1.133,0.896,2.051,2,2.051v3.049c-1.104,0-2,0.918-2,2.051s0.896,2.051,2,2.051v3.049  c-1.104,0-2,0.918-2,2.051c0,1.131,0.896,2.049,2,2.049v3.051c-1.104,0-2,0.918-2,2.051c0,1.131,0.896,2.049,2,2.049v3.051  c-1.104,0-2,0.918-2,2.049c0,1.133,0.896,2.051,2,2.051v3.051c-1.104,0-2,0.916-2,2.049s0.896,2.051,2,2.051v3  c-1.104,0-2,0.918-2,2.049c0,1.133,0.896,2.051,2,2.051v3.051c-1.104,0-2,0.916-2,2.049s0.896,2.051,2,2.051v3.049  c-1.104,0-2,0.918-2,2.051s0.896,2.051,2,2.051v3.049c-1.104,0-2,0.918-2,2.051c0,1.131,0.896,2.049,2,2.049v3.051  c-1.104,0-2,0.918-2,2.051c0,1.131,0.896,2.049,2,2.049v2.391c-2.836,0.477-5,2.938-5,5.91H6.451c-0.765,0-1.495-0.152-2.176-0.418  C4.732,261.27,5,260.387,5,259.441c0-2.762-2.239-5-5-5v-5c2.761,0,5-2.238,5-5s-2.239-5-5-5v-5c2.761,0,5-2.238,5-5s-2.239-5-5-5   v-5c2.761,0,5-2.238,5-5s-2.239-5-5-5v-5c2.761,0,5-2.238,5-5s-2.239-5-5-5v-5c2.761,0,5-2.238,5-5s-2.239-5-5-5v-5 c2.761,0,5-2.238,5-5s-2.239-5-5-5v-5.525c0.332,0.016,0.665,0.025,1,0.025c12.15,0,22-9.85,22-22s-9.85-22-22-22   c-0.335,0-0.668,0.01-1,0.025v-5.525c2.761,0,5-2.239,5-5s-2.239-5-5-5v-5c2.761,0,5-2.239,5-5s-2.239-5-5-5v-5c2.761,0,5-2.239,5-5 s-2.239-5-5-5v-5c2.761,0,5-2.239,5-5s-2.239-5-5-5v-5c2.761,0,5-2.239,5-5s-2.239-5-5-5v-5c2.761,0,5-2.239,5-5s-2.239-5-5-5v-5    c2.761,0,5-2.239,5-5c0-0.946-0.268-1.828-0.725-2.583c0.681-0.265,1.411-0.417,2.176-0.417H80c0,2.972,2.164,5.433,5,5.91V20.441z" /><g>   <g>     <path fill="#FFFFFF" d="M53.565,71.363c-0.717,0-1.641-0.039-2.773-0.117c0.131,0.586,0.229,1.087,0.293,1.504         c1.197,0,2.182-0.006,2.949-0.02c1.445-0.013,2.168-0.723,2.168-2.129v-7.598H45.343v9.902h1.523v-3.535h7.813v0.977            C54.679,71.025,54.308,71.363,53.565,71.363z M46.866,64.254h7.813v1.348h-7.813V64.254z M46.866,68.16v-1.348h7.813v1.348H46.866           z M57.862,60.582h-6.348v-1.348h5.449v-1.23h-5.449v-1.309h5.957v-1.23h-5.957v-1.758h-1.582v1.758h-5.684v1.23h5.684v1.309h-5          v1.23h5v1.348h-6.309v1.23h14.238V60.582z M43.565,57.32c-0.82-0.911-1.764-1.895-2.832-2.949l-1.172,0.996         c0.859,0.898,1.738,1.927,2.637,3.086L43.565,57.32z M40.909,69.332c0,0.716-0.221,1.283-0.664,1.699l0.898,1.289           c0.977-0.755,2.168-1.602,3.574-2.539c-0.052-0.481-0.098-1.048-0.137-1.699c-0.729,0.534-1.458,1.048-2.188,1.543v-9.102h-3.867            v1.426h2.383V69.332z M46.183,95.051c-0.742,0-1.843-0.052-3.301-0.156c0.144,0.586,0.247,1.179,0.313,1.777            c1.458,0.013,2.598,0.02,3.418,0.02c1.615-0.02,2.422-0.82,2.422-2.402v-3.594h8.77v-1.543h-8.77v-3.496h7.09v-1.543h-7.09V80.51            c2.369-0.11,4.701-0.237,6.992-0.381l-0.254-1.602c-4.141,0.365-9.538,0.599-16.191,0.703c0.117,0.521,0.215,1.055,0.293,1.602          c2.545-0.065,5.052-0.146,7.52-0.244v3.525h-7.441v1.543h7.441v3.496h-8.809v1.543h8.809v3.047         C47.394,94.615,46.989,95.051,46.183,95.051z M41.651,110.418v10.469h1.406v-10.313c0.593,0.586,1.289,1.322,2.09,2.207         l1.055-1.074c-0.573-0.573-1.36-1.315-2.363-2.227l-0.781,0.781v-3.242h2.734v-1.328h-2.734v-3.848h-1.406v3.848h-3.047v1.328           h2.92c-0.619,2.513-1.657,4.857-3.115,7.031c0.221,0.56,0.436,1.133,0.645,1.719C40.089,114.409,40.955,112.625,41.651,110.418z          M56.612,114.422c-0.053,1.159-0.143,2.24-0.273,3.242c-0.117,0.729-0.385,1.094-0.801,1.094h-0.449            c-0.455,0-0.684-0.326-0.684-0.977v-14.688H47.14v8.301c0,3.828-1.028,6.647-3.086,8.457c0.403,0.443,0.788,0.885,1.152,1.328           c2.33-2.097,3.496-5.475,3.496-10.137v-6.465h4.141v13.477c0,1.484,0.625,2.227,1.875,2.227h1.035c1.119,0,1.783-0.69,1.992-2.07            c0.117-0.82,0.234-1.875,0.352-3.164C57.563,114.852,57.067,114.644,56.612,114.422z M40.616,136.928v7.979h1.328v-1.094h7.949          v-1.172h-3.516v-1.602h3.301v-1.133h-3.301v-1.602h3.242v-1.133h-3.242v-1.602h3.535v-1.171h-3.418l0.664-0.547         c-0.612-0.651-1.179-1.211-1.699-1.68l-0.918,0.781c0.449,0.43,0.901,0.912,1.357,1.445h-3.613         c0.267-0.443,0.524-0.898,0.771-1.367l-1.25-0.547c-0.898,1.927-2.064,3.62-3.496,5.078c0.313,0.352,0.612,0.717,0.898,1.094            C39.692,138.109,40.161,137.533,40.616,136.928z M41.944,135.57h3.105v1.602h-3.105V135.57z M41.944,138.305h3.105v1.602h-3.105         V138.305z M41.944,141.039h3.105v1.602h-3.105V141.039z M53.839,126.606l-0.859,1.016c1.002,0.768,1.973,1.582,2.91,2.441           l0.996-1.211C56.001,128.149,54.985,127.4,53.839,126.606z M57.921,140.258c-0.416-0.117-0.879-0.293-1.387-0.527           c-0.143,1.172-0.293,2.084-0.449,2.734c-0.117,0.495-0.313,0.742-0.586,0.742c-0.326,0-0.658-0.279-0.996-0.84          c-0.396-0.638-0.746-1.39-1.045-2.256c1.387-1.66,2.516-3.564,3.389-5.712l-1.367-0.586c-0.639,1.745-1.469,3.294-2.49,4.648            c-0.424-1.758-0.689-3.86-0.801-6.308h5.42v-1.289H52.13c-0.059-1.452-0.088-3.099-0.088-4.941h-1.445          c0.045,2.174,0.088,3.822,0.127,4.941h-5.4v-1.816h3.828v-1.25h-3.828v-1.855h-1.367v1.855h-4.141v1.25h4.141v1.816h-5.293v1.289            h12.119c0.137,3.073,0.488,5.628,1.055,7.666c-0.709,0.749-1.494,1.423-2.354,2.021c0.365,0.391,0.684,0.781,0.957,1.172            c0.67-0.521,1.303-1.08,1.895-1.68c0.254,0.645,0.533,1.218,0.84,1.719c0.689,1.25,1.504,1.875,2.441,1.875         c0.807,0,1.367-0.527,1.68-1.582C57.517,142.563,57.726,141.534,57.921,140.258z M53.448,155.039v-1.152h-6.914         c0.279-0.345,0.541-0.696,0.781-1.055l-1.289-0.605c-1.146,1.745-2.61,3.262-4.395,4.551c0.377,0.365,0.697,0.684,0.957,0.957           c0.729-0.566,1.403-1.146,2.021-1.738c0.664,0.82,1.455,1.547,2.373,2.178c-1.491,0.605-3.379,1.143-5.664,1.611            c0.26,0.404,0.482,0.82,0.664,1.25c2.637-0.684,4.752-1.383,6.348-2.1c1.596,0.664,3.549,1.26,5.859,1.787          c0.131-0.391,0.346-0.879,0.645-1.465c-1.992-0.26-3.676-0.621-5.049-1.084C51.271,157.243,52.491,156.198,53.448,155.039z           M48.292,157.559c-1.152-0.625-2.106-1.422-2.861-2.393c0.02-0.02,0.039-0.042,0.059-0.068h6.025           C50.714,156.016,49.64,156.836,48.292,157.559z M43.038,164.336c3.308,0.456,6.4,1.003,9.277,1.641l0.527-1.484         c-3.008-0.572-6.139-1.074-9.395-1.504L43.038,164.336z M45.479,160.43l-0.391,1.309c1.875,0.261,3.881,0.605,6.016,1.035           l0.41-1.367C49.405,161.042,47.394,160.717,45.479,160.43z M56.729,168.965v-18.379H39.503v18.379h1.465v-0.938h14.297v0.938            H56.729z M40.968,166.621v-14.629h14.297v14.629H40.968z M52.491,185.387h5.313v-1.328h-6.445v-2.637h3.281v0.742h1.484v-7.363          H45.226v7.5h1.484v-0.879h3.223v2.637h-6.484v1.328h5.117c-1.445,2.292-3.327,4.076-5.645,5.352            c0.43,0.43,0.794,0.827,1.094,1.191c2.37-1.484,4.342-3.646,5.918-6.484v7.637h1.426v-7.559c1.303,2.526,3.178,4.531,5.625,6.016            c0.248-0.403,0.572-0.885,0.977-1.445C55.513,188.948,53.688,187.379,52.491,185.387z M46.71,180.113v-4.004h7.93v4.004H46.71z           M42.14,192.984v-13.789c0.625-1.497,1.204-3.105,1.738-4.824l-1.445-0.43c-0.963,3.711-2.318,6.869-4.063,9.473            c0.221,0.521,0.423,1.055,0.605,1.602c0.612-0.885,1.198-1.842,1.758-2.871v10.84H42.14z M52.14,208.254            c1.576-1.067,3.027-2.129,4.355-3.184v-1.582H45.206v1.426h9.063c-1.041,0.873-2.252,1.752-3.633,2.637v1.289h-6.738v1.426h6.738            v4.141c0,0.69-0.346,1.035-1.035,1.035c-0.6,0-1.523-0.064-2.773-0.195c0.104,0.561,0.189,1.088,0.254,1.582            c1.186,0.039,2.129,0.059,2.832,0.059c1.484,0,2.227-0.742,2.227-2.227v-4.395h5.762v-1.426H52.14V208.254z M57.765,201.379         v-1.445H45.88c0.222-0.599,0.433-1.211,0.635-1.836l-1.602-0.41c-0.228,0.769-0.476,1.518-0.742,2.246h-5.488v1.445h4.922           c-1.315,3.105-3.06,5.801-5.234,8.086c0.365,0.482,0.677,0.951,0.938,1.406c0.788-0.807,1.53-1.686,2.227-2.637v8.691h1.504         v-10.957c0.833-1.406,1.592-2.936,2.275-4.59H57.765z"/>  </g></g></svg>',
	activeBtn: '<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"   width="150px" height="100px" viewBox="0 0 150 100" enable-background="new 0 0 150 100" xml:space="preserve"><g>    <path fill="#fff" d="M45.38,32.559h6.637c-0.035,0.102-0.051,0.238-0.051,0.409c-0.206,1.022-0.429,1.96-0.669,2.813h-2.418        c-1.167,0-2.195,0.443-3.087,1.329c-0.926,0.921-1.389,1.961-1.389,3.119v20.864c0,0.954,0.274,1.722,0.823,2.301       c0.548,0.443,1.251,0.683,2.109,0.716c0.754,0,1.423-0.256,2.007-0.767c0.515-0.545,0.771-1.296,0.771-2.25v-17.54      c-0.034-0.647,0.171-1.176,0.618-1.585c0.342-0.341,0.823-0.512,1.44-0.512h6.638c0.651,0,1.183,0.171,1.595,0.512      c0.445,0.341,0.669,0.92,0.669,1.738v17.387c0,0.954,0.274,1.722,0.823,2.301c0.548,0.443,1.217,0.683,2.007,0.716      c0.857,0,1.577-0.256,2.161-0.767c0.446-0.614,0.686-1.363,0.721-2.25V40.024c0-1.159-0.378-2.113-1.132-2.864      c-0.926-0.92-1.973-1.38-3.139-1.38h-5.042c0.206-1.057,0.429-2.131,0.669-3.222h7.203c0.857,0,1.561-0.29,2.11-0.869       c0.548-0.546,0.823-1.244,0.823-2.097s-0.275-1.568-0.823-2.148c-0.515-0.511-1.218-0.767-2.11-0.767H45.38     c-0.926,0-1.646,0.273-2.161,0.818c-0.549,0.545-0.823,1.244-0.823,2.097s0.274,1.568,0.823,2.147      C43.733,32.286,44.454,32.559,45.38,32.559z M23.976,43.655c0.72-0.716,1.731-1.943,3.036-3.683        c1.474-1.841,3.087-4.175,4.836-7.005c0.137-0.341,0.309-0.528,0.515-0.563c0.206-0.034,0.429-0.018,0.669,0.051L39,38.95       c0.754,0.546,1.509,0.768,2.264,0.665c0.754-0.103,1.423-0.528,2.006-1.278c0.515-0.647,0.721-1.381,0.618-2.199        c-0.035-0.818-0.446-1.5-1.235-2.045l-8.078-7.568c-1.063-0.443-2.093-0.631-3.087-0.563c-1.235,0.103-2.333,1.057-3.293,2.863      c-2.778,4.296-5.574,7.756-8.387,10.381c-0.652,0.647-1.012,1.364-1.08,2.147c-0.035,0.75,0.274,1.467,0.926,2.148      c0.548,0.613,1.252,0.954,2.11,1.022C22.517,44.559,23.255,44.269,23.976,43.655z M35.038,65.593       c3.533-4.705,6.037-8.813,7.512-12.324c0.548-1.363,0.548-2.591,0-3.682c-0.755-1.057-1.852-1.603-3.293-1.637H23.976       c-0.926,0-1.646,0.256-2.161,0.768c-0.549,0.545-0.823,1.261-0.823,2.147c0,0.818,0.274,1.518,0.823,2.097      c0.515,0.546,1.235,0.836,2.161,0.869h10.033c0.548,0,0.96,0.085,1.235,0.256c0.206,0.204,0.24,0.478,0.103,0.818       c-0.241,0.75-2.007,3.238-5.3,7.466c-2.881-1.739-4.871-2.438-5.968-2.097c-0.755,0.238-1.304,0.767-1.647,1.585        c-0.343,0.818-0.411,1.568-0.206,2.25c0.309,0.75,0.926,1.347,1.853,1.79c2.709,1.261,6.071,3.408,10.084,6.443     c0.857,0.646,1.68,0.937,2.47,0.869c0.754-0.034,1.423-0.409,2.007-1.125c0.514-0.751,0.72-1.518,0.617-2.302       C39.154,68.933,37.747,67.535,35.038,65.593z M31.385,38.439c-0.755,0.034-1.424,0.357-2.007,0.971     c-0.549,0.648-0.806,1.33-0.771,2.046c0.034,0.818,0.411,1.534,1.132,2.147c0.445,0.409,1.011,1.023,1.698,1.841        c0.548,0.818,1.217,1.313,2.007,1.483c0.72,0.137,1.44-0.034,2.161-0.512c0.651-0.511,1.063-1.142,1.234-1.892      c0.137-1.534-0.943-3.238-3.241-5.114C32.877,38.764,32.139,38.439,31.385,38.439z M67.916,69.734      c-2.401-1.773-4.563-3.103-6.483-3.988c-0.926-0.409-1.784-0.494-2.573-0.256c-0.72,0.307-1.27,0.835-1.646,1.585       c-0.343,0.818-0.36,1.567-0.051,2.25c0.239,0.75,0.823,1.347,1.749,1.79c1.475,0.647,3.293,1.772,5.454,3.375       c0.823,0.545,1.646,0.801,2.47,0.767c0.754-0.137,1.389-0.546,1.904-1.227c0.515-0.716,0.702-1.45,0.566-2.199      C69.168,71.081,68.705,70.382,67.916,69.734z M58.655,59.456V46.979c0-1.022-0.292-1.841-0.875-2.454       c-0.549-0.512-1.252-0.784-2.109-0.818c-0.858,0.034-1.562,0.324-2.11,0.869c-0.549,0.614-0.823,1.415-0.823,2.403v12.478       c0,2.387-1.149,4.432-3.447,6.137c-1.44,0.954-3.208,1.806-5.299,2.557c-1.029,0.238-1.784,0.732-2.264,1.482       c-0.343,0.647-0.429,1.415-0.257,2.302c0.24,0.852,0.72,1.465,1.441,1.841c0.857,0.545,2.486,0.357,4.888-0.563     c5.866-2.659,9.347-6.273,10.445-10.841C58.449,61.553,58.585,60.581,58.655,59.456z M131.45,69.428        c-2.265-2.489-4.254-4.994-5.969-7.518c3.944-7.67,6.174-17.011,6.688-28.022c-0.24-1.363-0.515-2.744-0.823-4.142      c-0.411-0.647-1.029-1.177-1.853-1.586c-0.857-0.408-1.749-0.563-2.675-0.46h-13.893c-0.926,0-1.646,0.256-2.161,0.768      c-0.103,0.034-0.188,0.119-0.257,0.255c-0.138-0.442-0.344-0.8-0.618-1.073c-0.514-0.512-1.218-0.768-2.109-0.768H86.377        c-0.926,0-1.646,0.273-2.161,0.818c-0.549,0.546-0.823,1.245-0.823,2.097c0,0.853,0.274,1.568,0.823,2.147      c0.515,0.546,1.235,0.818,2.161,0.818h0.772v29.864c-1.956,0-3.276,0.357-3.962,1.073c-0.515,0.648-0.755,1.381-0.721,2.199     c0.034,0.92,0.343,1.653,0.926,2.198c0.549,0.512,1.304,0.75,2.265,0.717c3.808-0.205,8.695-0.734,14.664-1.586     c0.033-0.034,0.103-0.034,0.205,0v4.5c0,0.954,0.274,1.756,0.823,2.403c0.549,0.512,1.252,0.784,2.11,0.818     c0.856-0.034,1.56-0.324,2.109-0.869c0.548-0.613,0.84-1.398,0.874-2.353v-5.42c1.27-0.307,2.401-0.598,3.396-0.869     c1.063-0.308,1.715-0.801,1.955-1.483c0.309-0.75,0.36-1.551,0.154-2.403c-0.24-0.818-0.703-1.414-1.39-1.79        c-0.72-0.409-2.093-0.323-4.116,0.256V32.763h1.338c0.754,0,1.526-0.375,2.315-1.125c0.137,0.341,0.36,0.699,0.669,1.074        c0.515,0.546,1.235,0.836,2.161,0.869h11.731c0.856-0.033,1.457,0.153,1.801,0.563c0.96,1.637,0.36,7.074-1.801,16.313      c-0.927,2.659-1.716,4.704-2.367,6.137c-2.71-5.012-4.494-11.114-5.351-18.308c-0.138-0.954-0.55-1.67-1.235-2.147      c-0.617-0.409-1.32-0.563-2.109-0.46c-0.823,0.204-1.44,0.597-1.853,1.176c-0.446,0.648-0.583,1.449-0.411,2.403        c1.371,7.092,3.172,13.04,5.402,17.847c0.754,1.671,1.544,3.29,2.367,4.858c-1.888,2.761-4.306,5.028-7.255,6.801       c-0.755,0.512-1.235,1.142-1.441,1.893c-0.137,0.749,0.052,1.517,0.566,2.301c0.445,0.716,1.029,1.192,1.749,1.432      c0.754,0.238,1.577,0.052,2.47-0.563c2.573-1.738,4.87-3.938,6.895-6.597c3.088,4.909,5.454,7.415,7.101,7.518      c0.754,0.033,1.509-0.223,2.265-0.768c0.548-0.613,0.891-1.313,1.028-2.097C132.479,71.029,132.136,70.211,131.45,69.428z        M100.526,61.093c-0.926,0.102-1.887,0.222-2.881,0.357c-1.578,0.205-3.105,0.409-4.579,0.614v-6.495h7.46V61.093z M100.526,49.894      h-7.46v-5.574h7.46V49.894z M100.526,38.644h-7.46v-5.881h7.46V38.644z"/></g></svg>',
	applyBtn: '<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"   width="150px" height="100px" viewBox="0 0 150 100" enable-background="new 0 0 150 100" xml:space="preserve"><g>    <path fill="#fff" d="M35.809,48.181c-0.565,0.114-1.168,0.229-1.808,0.343v-7.695h1.583c1.356,0,2.354-0.399,2.995-1.197       c0.339-0.456,0.509-1.329,0.509-2.622c0-1.558-0.302-2.545-0.904-2.964c-0.565-0.531-1.432-0.798-2.599-0.798H34v-4.902     c-0.113-2.089-1.356-3.135-3.729-3.135c-2.298,0.076-3.466,1.121-3.503,3.135v4.902h-3.334c-1.206,0-2.054,0.247-2.543,0.741        c-0.678,0.532-1.017,1.539-1.017,3.021c0,1.406,0.339,2.376,1.017,2.907c0.64,0.608,1.488,0.912,2.543,0.912h3.334v9.233        c-1.809,0.381-3.58,0.779-5.312,1.197c-1.168,0.798-1.752,1.92-1.752,3.363c0,1.026,0.283,1.938,0.848,2.736        c0.64,0.836,1.45,1.254,2.43,1.254c1.054,0,2.317-0.19,3.786-0.57v9.462c0,0.608-0.452,0.912-1.356,0.912       c-1.432,0-2.619,0.248-3.56,0.741c-0.716,0.761-1.074,1.844-1.074,3.249c0,1.216,0.376,2.146,1.13,2.793        c0.715,0.76,2.034,1.177,3.956,1.254c5.425,0,8.137-1.862,8.137-5.586V56.446c1.997-0.494,3.334-0.874,4.012-1.141      c1.167-0.304,1.752-1.348,1.752-3.135c-0.038-1.063-0.415-2.052-1.13-2.964C38.257,48.523,37.315,48.181,35.809,48.181z      M70.223,70.411c-1.884-1.368-3.617-2.736-5.199-4.104c0.565-0.721,1.13-1.5,1.695-2.337c2.637-4.56,3.956-8.645,3.956-12.255       c0-2.964-1.621-4.446-4.86-4.446H48.128V33.931c0-0.76,0.452-1.14,1.356-1.14h10.567c0.603,0,0.904,0.38,0.904,1.14v4.219       c0,1.025-0.358,1.539-1.074,1.539c-1.846,0-3.447-0.266-4.803-0.799c-0.377-0.037-0.772-0.057-1.187-0.057      c-1.507,0.152-2.317,1.254-2.43,3.306c0,1.254,0.583,2.147,1.751,2.68c3.541,0.684,7.082,1.063,10.624,1.14     c1.62,0,2.844-0.456,3.673-1.368c0.791-0.722,1.187-2.28,1.187-4.674v-7.125c0-4.142-1.921-6.213-5.764-6.213H45.754        c-3.542,0-5.312,2.071-5.312,6.213v40.755c0,1.102,0.283,1.976,0.848,2.622c0.565,0.607,1.526,0.912,2.882,0.912        c1.318,0,2.279-0.248,2.882-0.741c0.715-0.494,1.074-1.425,1.074-2.793V53.938h1.017c1.017,3.42,2.43,6.555,4.238,9.404     c0.64,0.989,1.3,1.938,1.978,2.851c-1.394,1.444-2.995,2.926-4.803,4.445c-0.716,0.494-1.074,1.387-1.074,2.68      c0,0.76,0.226,1.443,0.678,2.052c0.753,1.026,1.695,1.539,2.825,1.539c0.603,0,1.771-0.665,3.504-1.995     c1.243-0.95,2.467-1.995,3.673-3.135c1.167,1.14,2.411,2.166,3.729,3.078c1.809,1.215,3.258,1.823,4.351,1.823      c1.206,0,2.035-0.323,2.486-0.969c0.678-0.57,1.017-1.444,1.017-2.622C71.71,71.912,71.202,71.02,70.223,70.411z M60.051,60.607     c-0.076,0.113-0.169,0.247-0.282,0.398c-0.226-0.266-0.452-0.55-0.678-0.854c-1.168-1.52-2.298-3.592-3.391-6.213h5.934     c0.715,0,1.074,0.228,1.074,0.684C62.707,56.104,61.821,58.099,60.051,60.607z M126.223,52.855h-15.879     c4.671-2.509,9.191-5.396,13.562-8.664c4.183-3.192,6.272-5.947,6.272-8.266c0-2.052-0.641-3.705-1.921-4.959       c-0.904-0.873-2.619-1.311-5.143-1.311h-16.896c0.226-0.57,0.339-1.159,0.339-1.768c-0.038-0.873-0.452-1.69-1.243-2.45     c-0.678-0.685-1.376-1.045-2.091-1.083c-0.678,0-1.338,0.209-1.978,0.627c-1.056,1.481-3.523,3.971-7.403,7.467     c-3.39,3.116-6.649,5.528-9.775,7.239c-1.206,0.342-1.809,1.083-1.809,2.223s0.263,1.957,0.791,2.451       c0.679,1.178,1.526,1.767,2.543,1.767c1.093,0,2.034-0.208,2.825-0.627c1.619-0.646,3.277-1.576,4.973-2.793        c0.037-0.037,0.094-0.076,0.17-0.114c0,0.494,0.207,0.97,0.622,1.425c1.167,1.749,2.354,3.668,3.56,5.758       c-4.182,1.71-8.74,3.401-13.675,5.072c-1.018,0.875-1.546,1.92-1.583,3.136c0,0.798,0.377,1.634,1.131,2.508        c0.828,0.836,1.921,1.254,3.277,1.254c0.828-0.076,2.016-0.322,3.561-0.741v9.177c0,3.269,1.619,4.902,4.859,4.902h30.91        c3.239,0,4.859-1.634,4.859-4.902V57.757C131.082,54.489,129.462,52.855,126.223,52.855z M100.342,36.781h18.591        c0.452,0,0.679,0.228,0.679,0.684c0,0.988-1.922,2.508-5.764,4.561c-2.751,1.596-5.821,3.191-9.211,4.788       c-0.528-1.216-1.356-2.66-2.486-4.332c-0.867-1.255-1.677-2.186-2.431-2.793c-0.415-0.456-0.923-0.685-1.525-0.685h-0.282       C98.74,38.282,99.551,37.542,100.342,36.781z M123.341,67.333c0,0.723-0.377,1.083-1.13,1.083H99.268       c-0.716,0-1.073-0.36-1.073-1.083v-6.726c0-0.722,0.357-1.083,1.073-1.083h22.943c0.753,0,1.13,0.361,1.13,1.083V67.333z"/></g></svg>'
};
window.winAlert = function(a, b, c) {
		function d(a, b) {
			template.config("escape", !1);
			var c = template.compile(a);
			return c(b)
		}
		c = void 0 === c ? !1 : c;
		var e = '<div id="win-alert-dialog"></div>',
			f = "";
		f += '<div class="info-dialog-box"><div class="info-content">{{title}}</div><div class="info-btn"><a style="{{cancelStyle}}" class="info-btn-cancel" href="javascript:void(0)">{{isConfirm?\'取消\':\'知道了\'}}</a> {{if isConfirm}} <a class="info-btn-ok" href="javascript:void(0)">确定</a> {{/if}}</div></div>\n';
		var g = d(f, {
			title: a,
			isConfirm: void 0 === c ? !1 : c,
			cancelStyle: c ? "color:#808080" : "color:#36ADF9"
		});
		0 === $("#win-alert-dialog").length && $("#main").append(e), $("#win-alert-dialog").html(g), $("#win-alert-dialog").show(), $("#win-alert-dialog").find(".info-btn-cancel").off().on("click", function(a) {
			a.stopPropagation(), a.preventDefault(), $("#win-alert-dialog").hide(), b && b(!1)
		}), $("#win-alert-dialog").find(".info-btn-ok").off().on("click", function(a) {
			a.stopPropagation(), a.preventDefault(), b && b(!0), $("#win-alert-dialog").hide()
		})
	}, window.verifyAlert = function(a, b, c, d, e) {
		function f() {
			function a() {
				n.find("img").attr("src", p)
			}

			function b(a) {
				o.html(a)
			}

			function c() {
				o.html("")
			}
			var d = '<div id="verify-alert-dialog"></div>',
				f = '<div class="info-dialog-verify"><div class="verify-content"><div class="verify-image" id="verifyImage-v"><img title="看不清，点击换一张" align="absmiddle" style="vertical-align:middle;border:0"></div><input type="text" name="verify" class="verify-Input element-last" placeholder="输入上方的校验码"></div><div class="verify-error"></div><div class="verify-btn"><a class="verify-btn-cancel" href="javascript:void(0)">取消</a> <a class="verify-btn-ok" href="javascript:void(0)">确定</a></div></div>\n',
				m = g(f, {});
			0 === $("#verify-alert-dialog").length && $("#main").append(d), $("#verify-alert-dialog").html(m);
			var n = $("#verifyImage-v"),
				o = $("#verify-alert-dialog").find(".verify-error"),
				p = h + "sms/VerifyImage?wsiteGuid=" + i + "&sendPhone=" + k + "&sendType=" + j + "&r=" + Math.random();
			a(), $("#verify-alert-dialog").show(), n.off().on("click", function() {
				a(), c()
			}), $("#verify-alert-dialog").find(".verify-btn-cancel").off().on("click", function() {
				$("#verify-alert-dialog").hide(), e && e(l)
			}), $("#verify-alert-dialog").find(".verify-btn-ok").off().on("click", function() {
				var c = $.trim($("#verify-alert-dialog").find(".verify-Input").val());
				if(!c) return void b("请输入校验码");
				var d = {
					wsiteGuid: i,
					sendPhone: k,
					sendType: j,
					verify: c
				};
				$.post(h + "sms/VerifySend", {
					form: d
				}, function(c) {
					0 === c.result ? ($("#verify-alert-dialog").hide(), l.isVerify = !0, l.data = c.data, e && e(l)) : (b(c.msg), a())
				})
			})
		}

		function g(a, b) {
			template.config("escape", !1);
			var c = template.compile(a);
			return c(b)
		}
		var h = a,
			i = b,
			j = d,
			k = c,
			l = {
				isVerify: !1,
				data: null
			};
		if(!window.hasSmsVerify) {
			window.hasSmsVerify = !0;
			var m = {
				wsiteGuid: i,
				sendPhone: k,
				sendType: j
			};
			$.post(h + "sms/Verify", {
				form: m
			}, function(a) {
				window.hasSmsVerify = !1, 0 === a.result ? a.data.isVerify ? f() : e && (l.isVerify = !0, l.data = a.data, e(l)) : winAlert(a.msg)
			})
		}
	}, window.showRRXProcess = fnShowProcess, window.hideRRXProcess = fnHideProcess, window.showRRXTips = fnShowTips, window.hideRRXTips = fnHideTips, window.showRRXAfterOnlineDialog = function(a, b, c, d) {
		function e() {
			r.find(".afteronline-dialog-content").removeClass("bounceOutUpAni").addClass("bounceInUpAni"), r.show()
		}

		function f(a) {
			r.find(".afteronline-dialog-content").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), setTimeout(function() {
				r.hide(), a && a()
			}, 600)
		}

		function g() {
			u.off().on(s, function(a) {
				a.preventDefault(), f(function() {
					d && (t.event = "closeEvent", t.result = 0, d(t))
				})
			})
		}

		function h() {
			var a = r.find(".content-qr"),
				b = new QRCode(a[0], {
					width: 300,
					height: 300
				});
			b.makeCode(p)
		}
		var i = a,
			j = (i.getInteractServiceHost(), a.getLibHost()),
			k = i.getWsiteCanvas().find(".pt-inner"),
			l = "prize-afteronline-dialog",
			m = '<div class="' + l + '"></div>',
			n = '<div class="afteronline-dialog-content"><div class="content-close"><img class="content-close-img" src="{{closeImage}}"></div><div class="dialog-content"><div class="content-box"><div class="content-box-head">向商家出示该二维码领奖</div><div class="content-box-body"><div class="content-qr"></div><p class="content-qr-msg">兑奖码二维码</p></div><div class="content-code"><p class="content-code-tag">兑奖码</p><p class="content-code-text">{{prizeCode}}</p></div></div><div class="content-foot"><div class="content-foot-msg">请及时截图保存</div></div></div></div>\n',
			o = j + "weplus/image/close.png",
			p = b.openCode,
			q = compileHtml(n, {
				closeImage: o,
				prizeCode: p
			}),
			r = k.find("." + l);
		0 === r.length && (k.append(m), r = k.find("." + l)), r.html(q);
		var s = "click",
			t = {
				event: "closeEvent",
				result: 0
			},
			u = r.find(".content-close-img");
		h(), g(), e()
	}, window.showRRXWxPuplicDialog = function(a, b, c, d) {
		function e() {
			p.find(".wxpublic-dialog-content").removeClass("bounceOutUpAni").addClass("bounceInUpAni"), p.show()
		}

		function f(a) {
			p.find(".wxpublic-dialog-content").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), setTimeout(function() {
				p.hide(), a && a()
			}, 600)
		}

		function g() {
			s.off().on(q, function(a) {
				a.preventDefault(), f(function() {
					d && (r.event = "closeEvent", r.result = 0, d(r))
				})
			})
		}
		var h = a,
			i = (h.getInteractServiceHost(), a.getLibHost()),
			j = h.getWsiteCanvas().find(".pt-inner"),
			k = "prize-wxpublic-dialog",
			l = '<div class="' + k + '"></div>',
			m = '<div class="wxpublic-dialog-content"><div class="content-close"><img class="content-close-img" src="{{closeImage}}"></div><div class="dialog-content"><div class="content-box"><div class="content-box-head">在公众号内回复领奖口令领奖</div><div class="content-box-body"><div class="content-qr"><img src="{{appQrUrl}}" alt="公众号二维码"></div><p class="content-qr-msg">公众号二维码</p>{{ if appName}}<p class="content-qr-msg">复制口令发送到{{appName}}</p>{{/if}}</div><div class="content-code"><p class="content-code-tag">领奖口令</p><p class="content-code-text">{{prizeCode}}</p></div></div><div class="content-foot"><div class="content-foot-msg">24小时内有效</div></div></div></div>\n',
			n = i + "weplus/image/close.png",
			o = compileHtml(m, {
				closeImage: n,
				prizeCode: b.openCode,
				appQrUrl: b.appQrUrl,
				appName: b.appName || ""
			}),
			p = j.find("." + k);
		0 === p.length && (j.append(l), p = j.find("." + k)), p.html(o);
		var q = "click",
			r = {
				event: "closeEvent",
				result: 0
			},
			s = p.find(".content-close-img");
		g(), e()
	}, window.showRRXWinPrizeDialog = showWinPrizeDialog, window.showRRXNoPrizeDialog = showNoPrizeDialog, window.showRRXGetPrizeDialog = showGetPrizeDialog, window.showRRXPresetFormDialog = function(a, b, c, d, e, f) {
		function g(c) {
			if("submitEvent" == c.event) {
				var g = c.result,
					i = a.getInteractServiceHost(),
					j = a.getWsiteGuid(),
					k = a.weixinStrong.getIdentifyId(),
					l = {
						wsiteGuid: j,
						activeGuid: b,
						identify: k,
						awardInfo: JSON.stringify(g.awardInfo),
						smsData: g.smsData
					};
				$.post(i + "generalPrize/PresetApply", {
					form: l
				}, function(b) {
					0 === b.result ? e && (h.event = "okEvent", h.result = 0, e(h)) : (h.result = b.msg, f || showRRXPrizeInfoDialog(a, b.msg, d), e && (h.event = "errorEvent", e(h)))
				})
			} else "giveupEvent" == c.event && e && (h.event = "closeEvent", h.result = 0, e(h))
		}
		var h = {
			event: "closeEvent",
			result: 0
		};
		showRRXGetPrizeDialog(a, c, d, g, !0)
	}, window.showRRXPrizeInfoDialog = showPrizeInfoDialog, window.showRRXPrizeDetailDialog = showPrizeDetailDialog, window.showRRXCommonDialog = function(a, b, c, d) {
		function e() {
			m.find(".dialog-content").removeClass("bounceOutUpAni").addClass("bounceInUpAni"), m.find(".content-close").removeClass("bounceOutUpAni").addClass("bounceInUpAni"), m.show()
		}

		function f(a) {
			m.find(".dialog-content").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), m.find(".content-close").removeClass("bounceInUpAni").addClass("bounceOutUpAni"), setTimeout(function() {
				m.hide(), a && a()
			}, 600)
		}

		function g() {
			p.off().on(o, function(a) {
				a.preventDefault(), f(function() {
					d && d()
				})
			})
		}
		var h = a.getWsiteCanvas().find(".pt-inner"),
			i = a.getLibHost(),
			j = i + "weplus/image/close.png",
			k = "rrx-common-dialog",
			l = '<div class="{{basicCss}}"><div class="content-close"><img class="content-close-img" src="{{closeIcon}}"></div><div class="dialog-content bounceInUpAni"><div class="dialog-content-head" style="color:{{baseColor}}">{{name}}</div><div class="dialog-content-box"><div class="scroll-list"><div class="content-list">  {{content}}</div></div></div></div></div>',
			m = h.find("." + k);
		if(0 === m.length) {
			var n = compileHtml(l, {
				closeIcon: j,
				baseColor: c,
				basicCss: k,
				name: "我的奖品",
				content: b.content
			});
			h.append(n), m = h.find("." + k)
		} else m.find(".scroll-list .content-list").html(b.content);
		var o = "click",
			p = m.find(".content-close");
		g(), e(), fnAddScroll(m.find(".dialog-content-box").get(0))
	}, window.rrxSharePosterCreator = window.rrxSharePosterCreator || {},
	function() {
		function a(a) {
			if(a) {
				if(a.indexOf(".qlogo.cn") > -1) return a.indexOf("?") > -1 ? a + "&v=" + b() : a + "?v=" + b();
				var c = a.indexOf("@!");
				return c > -1 && (a = a.substr(0, c)), a + K
			}
			return x
		}

		function b() {
			var a = new Date;
			return a.getTime()
		}

		function c() {
			y = document.createElement("canvas"), y.setAttribute("id", "rrxiuSharePosterBgCanvas"), z = y.getContext("2d")
		}

		function d() {
			D = {
				width: E.width() || 640,
				height: E.height() || 1008,
				sacle: E.width() / 640,
				reset: 1008 / (E.height() || 1008)
			}
		}

		function e() {
			A.length > 26 && (A = A.substr(0, 26))
		}

		function f(a, b, c) {
			var d = a.width / a.height;
			return a.width > a.height ? {
				height: c,
				width: c / d
			} : a.width < a.height ? {
				width: b,
				height: b / d
			} : {
				height: c,
				width: c / d
			}
		}

		function g(a, b, c) {
			var d = a.width / a.height;
			return a.width > b && a.height > c ? {
				needHandle: !0,
				handType: "cut",
				width: a.width,
				height: a.height
			} : a.width > a.height ? {
				needHandle: !0,
				handType: "scale",
				height: c,
				width: c / d
			} : a.width < a.height ? {
				needHandle: !0,
				handType: "scale",
				width: b,
				height: b / d
			} : {
				needHandle: !1
			}
		}

		function h() {
			i()
		}

		function i() {
			L ? Cool.util.loadImage(G, function(a) {
				return a ? void Cool.util.loadImage(x, function(b) {
					return b ? void j(b, a) : (console.error("load image error !!"), void(u.callback && u.callback({
						code: 1,
						msg: "load image error !!"
					})))
				}) : (console.error("load bgImg error !!"), void(u.callback && u.callback({
					code: 1,
					msg: "load bgImg error !!"
				})))
			}) : Cool.util.loadImage(x, function(a) {
				return a ? void j(a, a) : (console.error("load image error !!"), void(u.callback && u.callback({
					code: 1,
					msg: "load image error !!"
				})))
			})
		}

		function j(a, b) {
			if(!a) return console.error("load image error !!"), void(u.callback && u.callback({
				code: 1,
				msg: "load image error !!"
			}));
			if(!b) return console.error("load bgImg error !!"), void(u.callback && u.callback({
				code: 1,
				msg: "load bgImg error !!"
			}));
			var c = D.sacle;
			y.width = D.width * w, y.height = D.height * w, y.fillStyle = "#fff", y.style = "display:none;left:0;bottom:0;position:absolute;";
			var d = f(b, y.width, y.height),
				e = document.createElement("canvas");
			e.width = d.width, e.height = d.height;
			var g = e.getContext("2d");
			g.drawImage(b, 0, 0, d.width, d.height);
			var h = (d.width - y.width) / 2;
			z.drawImage(e, h, 0, y.width, y.height, 0, 0, y.width, y.height), g.clearRect(0, 0, d.width, d.height), H && (bgHandle = StackBlur.canvasRGB(y, 0, 0, y.width, y.height, 50)), H && (z.fillStyle = "rgba(0,0,0,0.6)", z.fillRect(0, 0, y.width, y.height)), k(c, a, y.width, y.height), l(c, y.width, y.height), p(c, y.width, y.height), m(c, y.width, y.height)
		}

		function k(a, b, c, d) {
			var e = 216 * a * w,
				f = 216 * a * w,
				h = 113 * a * w,
				i = (c - e) / 2;
			z.fillStyle = "rgba(255,255,255,0.25)", z.fillRect(i, h, e, f);
			var j = 8 * a * w,
				k = 200 * a * w,
				l = 200 * a * w,
				m = i + j,
				n = h + j,
				o = g(b, k, l);
			if(o.needHandle) {
				var p = document.createElement("canvas");
				p.width = o.width, p.height = o.height;
				var q = p.getContext("2d");
				q.drawImage(b, 0, 0, o.width, o.height);
				var r = 0;
				if("cut" === o.handType) {
					var s = o.width,
						t = o.width;
					o.width > o.height && (s = o.height, t = o.height), z.drawImage(p, 0, r, s, t, m, n, k, l)
				} else r = (o.width - k) / 2, z.drawImage(p, r, 0, k, l, m, n, k, l);
				q.clearRect(0, 0, o.width, o.height)
			} else z.drawImage(b, m, n, k, l)
		}

		function l(a, b, c) {
			var d = 36 * a * w,
				e = "Arial",
				f = 36 * a * w,
				g = 360 * a * w,
				h = 72 * a * w,
				i = b / 2,
				j = 12 * a * w,
				k = b - 2 * h;
			z.font = d + "px " + e, z.textBaseline = "top", z.fillStyle = "#fff", z.textAlign = "center";
			var l = q(z, A, i, g, f, k, j);
			d = 24 * a * w, z.font = d + "px " + e, z.textBaseline = "top", g = l + f + 38 * a * w, f = 24 * a * w, q(z, B, i, g, f, k, j)
		}

		function m(a, b, c) {
			var d = 158 * a * w,
				e = 158 * a * w,
				f = 58 * a * w,
				g = c - f - e,
				h = 22 * a * w,
				i = b - d - h;
			z.fillStyle = "#fff", z.fillRect(i, g, d, e); {
				var j = 150 * a * w,
					k = 150 * a * w,
					l = 4 * a * w,
					m = i + l,
					p = g + l;
				r(C, j, k, function(a) {
					a ? (z.drawImage(a, m, p, j, k), u.base64 ? u.callback && u.callback({
						code: 0,
						msg: "ok",
						imgFormat: "base64",
						base64: y.toDataURL("image/jpeg", 1)
					}) : o(y)) : (n(), u.callback && u.callback({
						code: 2,
						msg: "create qr error !!"
					}))
				})
			}
		}

		function n() {
			y && y.clearRect(0, 0, y.width, y.height)
		}

		function o(a) {
			var b = a.toDataURL("image/jpeg", 1);
			$.ajax({
				url: F + "shareposter/upload",
				type: "POST",
				data: {
					imageContent: b,
					wsiteGuid: J,
					nh: I
				},
				dataType: "json"
			}).then(function(a) {
				0 === a.result ? u.callback && u.callback({
					code: 0,
					msg: "ok",
					imgFormat: "url",
					imgPath: a.data.savedName
				}) : (n(), u.callback && u.callback({
					code: a.result,
					msg: a.msg
				}))
			}, function(a) {
				n(), console.error(a), u.callback && u.callback({
					code: 500,
					msg: "服务没响应"
				})
			})
		}

		function p(a, b, c) {
			var d = "长按二维码了解详情",
				e = (3 * d.length, 20 * a * w),
				f = "Arial",
				g = 0,
				h = 22 * a * w,
				i = 22 * a * w,
				j = 20 * a * w,
				k = c - i - j;
			z.font = e + "px " + f, z.textBaseline = "top", z.fillStyle = "#fff";
			for(var l = 0; l < d.length; l++) g += z.measureText(d[l]).width;
			var m = b - h - g / 2;
			z.fillText(d, m, k)
		}

		function q(a, b, c, d, e, f, g) {
			for(var h = 0, i = 0, j = 0; j < b.length; j++) h += a.measureText(b[j]).width, h > f && (a.fillText(b.substring(i, j), c, d), d += e + g, h = 0, i = j), j == b.length - 1 && a.fillText(b.substring(i, j + 1), c, d);
			return d
		}

		function r(a, b, c, d) {
			var e = s(a, b, c),
				f = new Image;
			return f.src = e, f.complete ? void d(f) : (f.onload = function() {
				d(f)
			}, void(f.onerror = function() {
				d()
			}))
		}

		function s(a, b, c, d, e) {
			a || (a = qrLink), d = d || "#000", e = e || "transparent";
			var f = new QRCode2({
					content: a,
					width: b,
					height: c,
					color: d,
					background: e,
					padding: 0,
					ecl: "L"
				}),
				g = f.svg();
			return t(g)
		}

		function t(a) {
			var b = a,
				c = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(b);
			return c
		}
		var u, v = 4,
			w = 3,
			x = "https://file2.rrxh5.cc/logo_blue_200x200.jpg",
			y = null,
			z = null,
			A = "",
			B = "",
			C = "https://www.rrxiu.net",
			D = {},
			E = $("#main"),
			F = "",
			G = "",
			H = !1,
			I = "",
			J = "",
			K = "@!300x300",
			L = !1;
		rrxSharePosterCreator = function(b) {
			u = b, F = b.serviceHost, A = b.shareTitle || A, B = b.shareDesc || B, C = b.shareUrl || C, x = a(b.shareImg), b.sharePosterBgImg ? (G = b.sharePosterBgImg, H = !1, L = !0) : (G = x, H = !0, L = !1), console.log("ss", x), console.log("sp", G), J = b.wsiteGuid, I = hex_md5(v + J + A + B + x + C + G), c(), d(), e()
		}, rrxSharePosterCreator.prototype = {
			constructor: rrxSharePosterCreator,
			create: h
		}
	}();