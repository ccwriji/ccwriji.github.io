function hex_md5(a) {
	return binl2hex(core_md5(str2binl(a), a.length * chrsz))
}

function b64_md5(a) {
	return binl2b64(core_md5(str2binl(a), a.length * chrsz))
}

function str_md5(a) {
	return binl2str(core_md5(str2binl(a), a.length * chrsz))
}

function hex_hmac_md5(a, b) {
	return binl2hex(core_hmac_md5(a, b))
}

function b64_hmac_md5(a, b) {
	return binl2b64(core_hmac_md5(a, b))
}

function str_hmac_md5(a, b) {
	return binl2str(core_hmac_md5(a, b))
}

function md5_vm_test() {
	return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc")
}

function core_md5(a, b) {
	a[b >> 5] |= 128 << b % 32, a[(b + 64 >>> 9 << 4) + 14] = b;
	for(var c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = 0; g < a.length; g += 16) {
		var h = c,
			i = d,
			j = e,
			k = f;
		c = md5_ff(c, d, e, f, a[g + 0], 7, -680876936), f = md5_ff(f, c, d, e, a[g + 1], 12, -389564586), e = md5_ff(e, f, c, d, a[g + 2], 17, 606105819), d = md5_ff(d, e, f, c, a[g + 3], 22, -1044525330), c = md5_ff(c, d, e, f, a[g + 4], 7, -176418897), f = md5_ff(f, c, d, e, a[g + 5], 12, 1200080426), e = md5_ff(e, f, c, d, a[g + 6], 17, -1473231341), d = md5_ff(d, e, f, c, a[g + 7], 22, -45705983), c = md5_ff(c, d, e, f, a[g + 8], 7, 1770035416), f = md5_ff(f, c, d, e, a[g + 9], 12, -1958414417), e = md5_ff(e, f, c, d, a[g + 10], 17, -42063), d = md5_ff(d, e, f, c, a[g + 11], 22, -1990404162), c = md5_ff(c, d, e, f, a[g + 12], 7, 1804603682), f = md5_ff(f, c, d, e, a[g + 13], 12, -40341101), e = md5_ff(e, f, c, d, a[g + 14], 17, -1502002290), d = md5_ff(d, e, f, c, a[g + 15], 22, 1236535329), c = md5_gg(c, d, e, f, a[g + 1], 5, -165796510), f = md5_gg(f, c, d, e, a[g + 6], 9, -1069501632), e = md5_gg(e, f, c, d, a[g + 11], 14, 643717713), d = md5_gg(d, e, f, c, a[g + 0], 20, -373897302), c = md5_gg(c, d, e, f, a[g + 5], 5, -701558691), f = md5_gg(f, c, d, e, a[g + 10], 9, 38016083), e = md5_gg(e, f, c, d, a[g + 15], 14, -660478335), d = md5_gg(d, e, f, c, a[g + 4], 20, -405537848), c = md5_gg(c, d, e, f, a[g + 9], 5, 568446438), f = md5_gg(f, c, d, e, a[g + 14], 9, -1019803690), e = md5_gg(e, f, c, d, a[g + 3], 14, -187363961), d = md5_gg(d, e, f, c, a[g + 8], 20, 1163531501), c = md5_gg(c, d, e, f, a[g + 13], 5, -1444681467), f = md5_gg(f, c, d, e, a[g + 2], 9, -51403784), e = md5_gg(e, f, c, d, a[g + 7], 14, 1735328473), d = md5_gg(d, e, f, c, a[g + 12], 20, -1926607734), c = md5_hh(c, d, e, f, a[g + 5], 4, -378558), f = md5_hh(f, c, d, e, a[g + 8], 11, -2022574463), e = md5_hh(e, f, c, d, a[g + 11], 16, 1839030562), d = md5_hh(d, e, f, c, a[g + 14], 23, -35309556), c = md5_hh(c, d, e, f, a[g + 1], 4, -1530992060), f = md5_hh(f, c, d, e, a[g + 4], 11, 1272893353), e = md5_hh(e, f, c, d, a[g + 7], 16, -155497632), d = md5_hh(d, e, f, c, a[g + 10], 23, -1094730640), c = md5_hh(c, d, e, f, a[g + 13], 4, 681279174), f = md5_hh(f, c, d, e, a[g + 0], 11, -358537222), e = md5_hh(e, f, c, d, a[g + 3], 16, -722521979), d = md5_hh(d, e, f, c, a[g + 6], 23, 76029189), c = md5_hh(c, d, e, f, a[g + 9], 4, -640364487), f = md5_hh(f, c, d, e, a[g + 12], 11, -421815835), e = md5_hh(e, f, c, d, a[g + 15], 16, 530742520), d = md5_hh(d, e, f, c, a[g + 2], 23, -995338651), c = md5_ii(c, d, e, f, a[g + 0], 6, -198630844), f = md5_ii(f, c, d, e, a[g + 7], 10, 1126891415), e = md5_ii(e, f, c, d, a[g + 14], 15, -1416354905), d = md5_ii(d, e, f, c, a[g + 5], 21, -57434055), c = md5_ii(c, d, e, f, a[g + 12], 6, 1700485571), f = md5_ii(f, c, d, e, a[g + 3], 10, -1894986606), e = md5_ii(e, f, c, d, a[g + 10], 15, -1051523), d = md5_ii(d, e, f, c, a[g + 1], 21, -2054922799), c = md5_ii(c, d, e, f, a[g + 8], 6, 1873313359), f = md5_ii(f, c, d, e, a[g + 15], 10, -30611744), e = md5_ii(e, f, c, d, a[g + 6], 15, -1560198380), d = md5_ii(d, e, f, c, a[g + 13], 21, 1309151649), c = md5_ii(c, d, e, f, a[g + 4], 6, -145523070), f = md5_ii(f, c, d, e, a[g + 11], 10, -1120210379), e = md5_ii(e, f, c, d, a[g + 2], 15, 718787259), d = md5_ii(d, e, f, c, a[g + 9], 21, -343485551), c = safe_add(c, h), d = safe_add(d, i), e = safe_add(e, j), f = safe_add(f, k)
	}
	return Array(c, d, e, f)
}

function md5_cmn(a, b, c, d, e, f) {
	return safe_add(bit_rol(safe_add(safe_add(b, a), safe_add(d, f)), e), c)
}

function md5_ff(a, b, c, d, e, f, g) {
	return md5_cmn(b & c | ~b & d, a, b, e, f, g)
}

function md5_gg(a, b, c, d, e, f, g) {
	return md5_cmn(b & d | c & ~d, a, b, e, f, g)
}

function md5_hh(a, b, c, d, e, f, g) {
	return md5_cmn(b ^ c ^ d, a, b, e, f, g)
}

function md5_ii(a, b, c, d, e, f, g) {
	return md5_cmn(c ^ (b | ~d), a, b, e, f, g)
}

function core_hmac_md5(a, b) {
	var c = str2binl(a);
	c.length > 16 && (c = core_md5(c, a.length * chrsz));
	for(var d = Array(16), e = Array(16), f = 0; 16 > f; f++) d[f] = 909522486 ^ c[f], e[f] = 1549556828 ^ c[f];
	var g = core_md5(d.concat(str2binl(b)), 512 + b.length * chrsz);
	return core_md5(e.concat(g), 640)
}

function safe_add(a, b) {
	var c = (65535 & a) + (65535 & b),
		d = (a >> 16) + (b >> 16) + (c >> 16);
	return d << 16 | 65535 & c
}

function bit_rol(a, b) {
	return a << b | a >>> 32 - b
}

function str2binl(a) {
	for(var b = Array(), c = (1 << chrsz) - 1, d = 0; d < a.length * chrsz; d += chrsz) b[d >> 5] |= (a.charCodeAt(d / chrsz) & c) << d % 32;
	return b
}

function binl2str(a) {
	for(var b = "", c = (1 << chrsz) - 1, d = 0; d < 32 * a.length; d += chrsz) b += String.fromCharCode(a[d >> 5] >>> d % 32 & c);
	return b
}

function binl2hex(a) {
	for(var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", c = "", d = 0; d < 4 * a.length; d++) c += b.charAt(a[d >> 2] >> d % 4 * 8 + 4 & 15) + b.charAt(a[d >> 2] >> d % 4 * 8 & 15);
	return c
}

function binl2b64(a) {
	for(var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = "", d = 0; d < 4 * a.length; d += 3)
		for(var e = (a[d >> 2] >> 8 * (d % 4) & 255) << 16 | (a[d + 1 >> 2] >> 8 * ((d + 1) % 4) & 255) << 8 | a[d + 2 >> 2] >> 8 * ((d + 2) % 4) & 255, f = 0; 4 > f; f++) c += 8 * d + 6 * f > 32 * a.length ? b64pad : b.charAt(e >> 6 * (3 - f) & 63);
	return c
}
var appConfig = {
	home: "https://www.rrxiu.net",
	version: "v4.4.6.9",
	qrVer: 1,
	firstPayStoreEnable: !0,
	behaviorEnable: !0,
	libHost: "https://assets.rrxh5.cc/lib/",
	viewDomainFormat: "https://m.rrxiu.net/?v={guid}",
	assetsHost: "https://assets.rrxh5.cc/",
	viewHost: "https://view.rrxh5.cc/",
	pcViewHost: "https://www.rrxiu.net/view-",
	serviceHost: "https://www.rrxiu.net/",
	accountCenter: "https://www.rrxiu.net/",
	thisHostAndServiceHostIsSame: !1,
	dataHost: "https://data.rrxh5.cc/",
	vipDataHost: "https://data.rrxh5.cc/",
	imageHost: "https://file2.rrxh5.cc/",
	imageOss: "https://file2.rrxh5.cc/",
	uploadHost: "https://uploading.rrxiu.net/",
	webAppHost: "https://app.rrxiu.net",
	pushsaleAppHost: "https://sale.rrxiu.net",
	imageGroupLimit: 15,
	imageThumb: "@!100-2",
	shareImageThumb: "@!200x200",
	llImageThumb: "@!view-loading-logo",
	tplPageCoverThumb: "@!90x142",
	animationEngine: "css",
	chromeDownload: "http://rj.baidu.com/soft/detail/14744.html",
	formatFactoryDownload: "http://rj.baidu.com/soft/detail/13052.html?ald",
	pluginDomainFormat: "https://assets.rrxh5.cc/plugin/{token}/{version}",
	pluginUploadHost: "https://www.rrxiu.net/",
	webFontHost: "https://assets.rrxh5.cc/webfont/",
	tplMarketThumb: "@!237x375",
	startTimeParseBgImgNew: "2016-11-16 08:30:00",
	huanleHost: "http://www.huanle001.com/",
	focusIntro: "https://www.rrxiu.net/content-3zrxvi",
	copyright: {
		content: "",
		textAlign: "right",
		url: "http://mp.weixin.qq.com/s?__biz=MzA4ODc5OTE1OQ==&mid=403178211&idx=1&sn=9c50c942df41020d626d50289a75cf16#rd",
		color: "#fff",
		bgColor: "#000"
	},
	shareInfo: {
		color: "#fff",
		bgColor: "rgba(0, 0, 0, 0.9)",
		content: '<div class="d-share-arrow"></div>'
	},
	openFunction: {
		normalAccoutGiveGoldEnabled: !1,
		normalAccoutPayMin: 100,
		code: !0,
		sensor: !0,
		shake: !0,
		longPage: !0,
		floorPage: !0,
		sharePage: !0,
		loadingPage: !0,
		htmlElement: !0,
		addSpecialPage: !0,
		forgotPwd: !0,
		confirmAccount: !0,
		accountNavVipDisplay: !0,
		accountNavAboutDisplay: !0,
		accountNavContactDisplay: !0,
		accountNavHelpDisplay: !0,
		wisteShow: !0,
		wisteVip: !0,
		wisteProduct: !0,
		weplusQQ: !0
	}
};
window.rrxiuUtils = window.rrxiuUtils || {}, rrxiuUtils = function() {
	function a(a) {
		var b, c, d, e, f, h, i;
		for(h = a.length, f = 0, i = ""; h > f;) {
			do b = g[255 & a.charCodeAt(f++)]; while (h > f && -1 == b);
			if(-1 == b) break;
			do c = g[255 & a.charCodeAt(f++)]; while (h > f && -1 == c);
			if(-1 == c) break;
			i += String.fromCharCode(b << 2 | (48 & c) >> 4);
			do {
				if(d = 255 & a.charCodeAt(f++), 61 == d) return i;
				d = g[d]
			} while (h > f && -1 == d);
			if(-1 == d) break;
			i += String.fromCharCode((15 & c) << 4 | (60 & d) >> 2);
			do {
				if(e = 255 & a.charCodeAt(f++), 61 == e) return i;
				e = g[e]
			} while (h > f && -1 == e);
			if(-1 == e) break;
			i += String.fromCharCode((3 & d) << 6 | e)
		}
		return i
	}

	function b(a) {
		var b, c, d, e, f, g;
		for(b = "", d = a.length, c = 0; d > c;) switch(e = a.charCodeAt(c++), e >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				b += a.charAt(c - 1);
				break;
			case 12:
			case 13:
				f = a.charCodeAt(c++), b += String.fromCharCode((31 & e) << 6 | 63 & f);
				break;
			case 14:
				f = a.charCodeAt(c++), g = a.charCodeAt(c++), b += String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | (63 & g) << 0)
		}
		return b
	}

	function c(a) {
		for(var b = {
				strictMode: !1,
				key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
				q: {
					name: "queryKey",
					parser: /(?:^|&)([^&=]*)=?([^&]*)/g
				},
				parser: {
					strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
					loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
				}
			}, c = b, d = c.parser[c.strictMode ? "strict" : "loose"].exec(a), e = {}, f = 14; f--;) e[c.key[f]] = d[f] || "";
		return e[c.q.name] = {}, e[c.key[12]].replace(c.q.parser, function(a, b, d) {
			b && (e[c.q.name][b] = d)
		}), e
	}

	function d(a) {
		var b = a || window.location.toString();
		"http://" !== b.substring(0, 7) && "https://" !== b.substring(0, 8) && (b = "http://" + b), a = b.split("/"); {
			var c = a[2].split(":"),
				d = {
					protocol: a[0],
					hostname: c[0],
					port: c[1] || "80",
					pathname: "/" + a.slice(3, a.length).join("/").split("?")[0]
				},
				e = d.hostname,
				f = e.split("."),
				g = d.pathname;
			g.split("/")
		}
		return {
			domain: e,
			host: f.slice(-2).join("."),
			sub: f.slice(0, f.length - 2).join("."),
			port: d.port || "80",
			protocol: d.protocol.split(":")[0],
			path: g
		}
	}
	var e = function(a, b, c, d) {
			var e = document.getElementById(a).contentWindow,
				f = {
					filpType: b,
					wsite: c,
					copyright: d
				},
				g = JSON.stringify(f);
			e.postMessage(g, "*")
		},
		f = function(a) {
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
		g = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
		h = function(c) {
			return b(a(c))
		},
		i = {
			storage: window.localStorage,
			set: function(a, b) {
				try {
					this.storage && this.storage.setItem(a, b)
				} catch(c) {
					console.error(c)
				}
			},
			get: function(a) {
				return this.storage ? this.storage.getItem(a) : null
			}
		},
		j = {};
	return j.notifyTurnPage = e, j.getUrlParaObject = f, j.decode = h, j.parseUri = c, j.getUrlInfo = d, j.localStorage = i, j
}();
var hexcase = 0,
	b64pad = "",
	chrsz = 8;
window.behaviorUtils = window.behaviorUtils || {}, behaviorUtils = function() {
		function a(a, c, d, e, f, g) {
			if(!appConfig.behaviorEnable) return console.log("已取消记录");
			var h = document.referrer;
			e ? setTimeout(function() {
				b(a, c, d, h, window.location.href, f, g)
			}, 1e3) : b(a, c, d, h, window.location.href, f, g)
		}

		function b(a, b, c, d, e, h, i) {
			var j = f + "add";
			$.ajax({
				url: j,
				type: "POST",
				dataType: "json",
				data: {
					form: {
						finger: g.finger,
						page: a,
						action: b,
						details: c,
						referrer: d,
						pageUrl: e,
						actionLevel2: h,
						actionLevel3: i
					}
				}
			}).done(function(a) {}).fail(function() {
				console.error("记录错误")
			})
		}

		function c() {
			if(!g.hasInit) {
				g.hasInit = !0;
				var a = d();
				g.finger = e.get(a), g.finger || (g.finger = e.getMd5Key(a + (new Date).getTime()), e.set(a, g.finger))
			}
		}

		function d() {
			return "behaviorKey"
		}
		var e = {
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
			f = appConfig.serviceHost + "behaviorrecord/";
		null !== appConfig.accountCenter && void 0 !== appConfig.accountCenter && (f = appConfig.accountCenter + "behaviorrecord/");
		var g = {
			hasInit: !1,
			finger: "",
			keyList: []
		};
		g.pages = {
			index: "网站首页",
			eidt: "编辑页面",
			store: "模板库",
			vip: "VIP页面",
			acount: "账户中心",
			pdShow: "作品秀",
			interact: "互动市场",
			my: "个人中心",
			help: "帮助页面",
			adMarket: "推广页面",
			product: "产品中心",
			pcview: "PC预览",
			error: "Error页面",
			solution: "解决方案"
		}, g.actions = {
			search: "搜索",
			link: "访问",
			edit: "编辑",
			tag: "标签",
			button: "按钮",
			login: "登录",
			regist: "注册",
			pay: "付费",
			buy: "购买",
			tpl: "模板"
		}, g.subactions = {
			search: "搜索",
			tag: "标签",
			pay: "付费"
		}, g.init = function(b, d, e, f, h) {
			c(), b = b || g.pages.index, d = d || g.actions.link, e = e || "", a(b, d, e, !0, f, h)
		}, g.addNoDelay = function(b, d, e, f, h) {
			c(), b = b || g.pages.index, d = d || g.actions.link, e = e || "", a(b, d, e, !1, f, h)
		}, g.regCredibly = function() {
			c();
			var a = f + "regCredibly";
			$.ajax({
				url: a,
				type: "GET",
				dataType: "json",
				data: {
					finger: g.finger
				},
				xhrFields: {
					withCredentials: !0
				}
			}).done(function(a) {}).fail(function(a) {
				console.error(a)
			})
		}, g.perfectWho = function() {
			c();
			var a = f + "perfectWho";
			$.ajax({
				url: a,
				type: "GET",
				dataType: "json",
				data: {
					finger: g.finger
				},
				xhrFields: {
					withCredentials: !0
				}
			}).done(function(a) {}).fail(function(a) {
				console.error(a)
			})
		};
		var h = {};
		return h.init = g.init, h.addNoDelay = g.addNoDelay, h.pages = g.pages, h.actions = g.actions, h.subactions = g.subactions, h.regCredibly = g.regCredibly, h.perfectWho = g.perfectWho, h
	}(), window.rrxiuPcView = window.rrxiuPcView || {},
	function() {
		function a() {
			v = $(window).height()
		}

		function b() {
			q.css({
				height: v
			})
		}

		function c() {
			u = .6349 * $(window).height()
		}

		function d() {
			q.css({
				width: u
			})
		}

		function e() {
			a(), b(), c(), d(), j()
		}

		function f() {
			r = $("#__viewUrl").val(), s = $("#__pcPreview").val()
		}

		function g() {
			var a = new QRCode($("#right-control .qrcode")[0], {
					width: 200,
					height: 200
				}),
				b = r.lastIndexOf("?"),
				c = r;
			if(b > -1) {
				c = r.substr(0, b);
				var d = rrxiuUtils.getUrlParaObject(r),
					e = [];
				jQuery.each(d, function(a, b) {
					void 0 !== a && "iframe" !== a && e.push(a + "=" + b)
				});
				var f = e.join("&");
				"" !== f ? (c += "?" + f, c += "&vt=" + appConfig.qrVer) : c += "?vt=" + appConfig.qrVer
			}
			a.makeCode(c)
		}

		function h() {
			$(".to-create").attr("href", "http://www.rrxiu.net");
			var a = 1 === parseInt($("#__tpl").val(), 10);
			a && $(".to-create").attr("href", "tpl#/?guid=" + $("#__guid").val())
		}

		function i() {
			t.css({
				width: u,
				height: v
			}), t.attr("src", s)
		}

		function j() {
			var a = u + 20 + 154;
			p.css({
				width: a
			})
		}

		function k() {
			$(window).on("resize", function() {
				a(), b(), c(), d(), j(), i()
			})
		}

		function l() {
			$("body").bind("wheel mousewheel DOMMouseScroll MozMousePixelScroll", function(a) {
				var b = a || window.event;
				m(b)
			})
		}

		function m(a) {
			a.originalEvent.wheelDelta < 0 ? rrxiuUtils.notifyTurnPage(w, "next") : rrxiuUtils.notifyTurnPage(w, "pre")
		}

		function n() {
			$(".btn-pre").click(function() {
				return rrxiuUtils.notifyTurnPage(w, "pre"), !1
			}), $(".btn-next").click(function() {
				return rrxiuUtils.notifyTurnPage(w, "next"), !1
			})
		}

		function o() {
			$("body").bind("keydown", function(a) {
				var b = a.which || a.keyCode;
				switch(b) {
					case 40:
						rrxiuUtils.notifyTurnPage(w, "next");
						break;
					case 38:
						rrxiuUtils.notifyTurnPage(w, "pre")
				}
			})
		}
		var p, q, r, s, t, u = 418,
			v = 670,
			w = "viewFrame";
		rrxiuPcView = function() {
			p = $("#out-container"), q = $("#main"), t = $("#" + w)
		}, rrxiuPcView.prototype = {
			constructor: rrxiuPcView,
			init: function() {
				e(), f(), i(), k(), g(), l(), n(), o(), h()
			}
		}
	}(), $(function() {
		var a = new rrxiuPcView;
		a.init(), setTimeout(function() {
			var a = document.createElement("script");
			a.type = "text/javascript", a.async = !0, a.charset = "utf-8", a.src = "//w.cnzz.com/c.php?id=1257465010&async=1";
			var b = document.getElementsByTagName("script")[0];
			b.parentNode.insertBefore(a, b);
			var c = document.createElement("script"),
				d = window.location.protocol.split(":")[0];
			c.src = "https" === d ? "https://zz.bdstatic.com/linksubmit/push.js" : "http://push.zhanzhang.baidu.com/push.js";
			var e = document.getElementsByTagName("script")[0];
			e.parentNode.insertBefore(c, e)
		}, 1e3)
	});