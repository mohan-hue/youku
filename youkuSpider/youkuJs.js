// current_showid 就是播放页面的showid
// targetId 就是播放页面的 showid_en
function getEncodeUrl(e){
    return encodeURIComponent(e);
}
console.log('encodeUrl', getEncodeUrl);


// 获取sign
function getSign(e) {
    function t(e, t) {
        return e << t | e >>> 32 - t
    }

    function n(e, t) {
        var n, i, r, a, o;
        return r = 2147483648 & e,
            a = 2147483648 & t,
            n = 1073741824 & e,
            i = 1073741824 & t,
            o = (1073741823 & e) + (1073741823 & t),
            n & i ? 2147483648 ^ o ^ r ^ a : n | i ? 1073741824 & o ? 3221225472 ^ o ^ r ^ a : 1073741824 ^ o ^ r ^ a : o ^ r ^ a
    }

    function i(e, t, n) {
        return e & t | ~e & n
    }

    function r(e, t, n) {
        return e & n | t & ~n
    }

    function a(e, t, n) {
        return e ^ t ^ n
    }

    function o(e, t, n) {
        return t ^ (e | ~n)
    }

    function s(e, r, a, o, s, l, u) {
        return e = n(e, n(n(i(r, a, o), s), u)),
            n(t(e, l), r)
    }

    function l(e, i, a, o, s, l, u) {
        return e = n(e, n(n(r(i, a, o), s), u)),
            n(t(e, l), i)
    }

    function u(e, i, r, o, s, l, u) {
        return e = n(e, n(n(a(i, r, o), s), u)),
            n(t(e, l), i)
    }

    function d(e, i, r, a, s, l, u) {
        return e = n(e, n(n(o(i, r, a), s), u)),
            n(t(e, l), i)
    }

    function c(e) {
        var t, n, i = "", r = "";
        for (n = 0; 3 >= n; n++)
            t = e >>> 8 * n & 255,
                r = "0" + t.toString(16),
                i += r.substr(r.length - 2, 2);
        return i
    }

    var h, p, f, m, y, g, v, _, b, k = [];
    for (e = function (e) {
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", n = 0; n < e.length; n++) {
            var i = e.charCodeAt(n);
            128 > i ? t += String.fromCharCode(i) : i > 127 && 2048 > i ? (t += String.fromCharCode(i >> 6 | 192),
                t += String.fromCharCode(63 & i | 128)) : (t += String.fromCharCode(i >> 12 | 224),
                t += String.fromCharCode(i >> 6 & 63 | 128),
                t += String.fromCharCode(63 & i | 128))
        }
        return t
    }(e),
             k = function (e) {
                 for (var t, n = e.length, i = n + 8, r = (i - i % 64) / 64, a = 16 * (r + 1), o = new Array(a - 1), s = 0, l = 0; n > l;)
                     t = (l - l % 4) / 4,
                         s = l % 4 * 8,
                         o[t] = o[t] | e.charCodeAt(l) << s,
                         l++;
                 return t = (l - l % 4) / 4,
                     s = l % 4 * 8,
                     o[t] = o[t] | 128 << s,
                     o[a - 2] = n << 3,
                     o[a - 1] = n >>> 29,
                     o
             }(e),
             g = 1732584193,
             v = 4023233417,
             _ = 2562383102,
             b = 271733878,
             h = 0; h < k.length; h += 16)
        p = g,
            f = v,
            m = _,
            y = b,
            g = s(g, v, _, b, k[h + 0], 7, 3614090360),
            b = s(b, g, v, _, k[h + 1], 12, 3905402710),
            _ = s(_, b, g, v, k[h + 2], 17, 606105819),
            v = s(v, _, b, g, k[h + 3], 22, 3250441966),
            g = s(g, v, _, b, k[h + 4], 7, 4118548399),
            b = s(b, g, v, _, k[h + 5], 12, 1200080426),
            _ = s(_, b, g, v, k[h + 6], 17, 2821735955),
            v = s(v, _, b, g, k[h + 7], 22, 4249261313),
            g = s(g, v, _, b, k[h + 8], 7, 1770035416),
            b = s(b, g, v, _, k[h + 9], 12, 2336552879),
            _ = s(_, b, g, v, k[h + 10], 17, 4294925233),
            v = s(v, _, b, g, k[h + 11], 22, 2304563134),
            g = s(g, v, _, b, k[h + 12], 7, 1804603682),
            b = s(b, g, v, _, k[h + 13], 12, 4254626195),
            _ = s(_, b, g, v, k[h + 14], 17, 2792965006),
            v = s(v, _, b, g, k[h + 15], 22, 1236535329),
            g = l(g, v, _, b, k[h + 1], 5, 4129170786),
            b = l(b, g, v, _, k[h + 6], 9, 3225465664),
            _ = l(_, b, g, v, k[h + 11], 14, 643717713),
            v = l(v, _, b, g, k[h + 0], 20, 3921069994),
            g = l(g, v, _, b, k[h + 5], 5, 3593408605),
            b = l(b, g, v, _, k[h + 10], 9, 38016083),
            _ = l(_, b, g, v, k[h + 15], 14, 3634488961),
            v = l(v, _, b, g, k[h + 4], 20, 3889429448),
            g = l(g, v, _, b, k[h + 9], 5, 568446438),
            b = l(b, g, v, _, k[h + 14], 9, 3275163606),
            _ = l(_, b, g, v, k[h + 3], 14, 4107603335),
            v = l(v, _, b, g, k[h + 8], 20, 1163531501),
            g = l(g, v, _, b, k[h + 13], 5, 2850285829),
            b = l(b, g, v, _, k[h + 2], 9, 4243563512),
            _ = l(_, b, g, v, k[h + 7], 14, 1735328473),
            v = l(v, _, b, g, k[h + 12], 20, 2368359562),
            g = u(g, v, _, b, k[h + 5], 4, 4294588738),
            b = u(b, g, v, _, k[h + 8], 11, 2272392833),
            _ = u(_, b, g, v, k[h + 11], 16, 1839030562),
            v = u(v, _, b, g, k[h + 14], 23, 4259657740),
            g = u(g, v, _, b, k[h + 1], 4, 2763975236),
            b = u(b, g, v, _, k[h + 4], 11, 1272893353),
            _ = u(_, b, g, v, k[h + 7], 16, 4139469664),
            v = u(v, _, b, g, k[h + 10], 23, 3200236656),
            g = u(g, v, _, b, k[h + 13], 4, 681279174),
            b = u(b, g, v, _, k[h + 0], 11, 3936430074),
            _ = u(_, b, g, v, k[h + 3], 16, 3572445317),
            v = u(v, _, b, g, k[h + 6], 23, 76029189),
            g = u(g, v, _, b, k[h + 9], 4, 3654602809),
            b = u(b, g, v, _, k[h + 12], 11, 3873151461),
            _ = u(_, b, g, v, k[h + 15], 16, 530742520),
            v = u(v, _, b, g, k[h + 2], 23, 3299628645),
            g = d(g, v, _, b, k[h + 0], 6, 4096336452),
            b = d(b, g, v, _, k[h + 7], 10, 1126891415),
            _ = d(_, b, g, v, k[h + 14], 15, 2878612391),
            v = d(v, _, b, g, k[h + 5], 21, 4237533241),
            g = d(g, v, _, b, k[h + 12], 6, 1700485571),
            b = d(b, g, v, _, k[h + 3], 10, 2399980690),
            _ = d(_, b, g, v, k[h + 10], 15, 4293915773),
            v = d(v, _, b, g, k[h + 1], 21, 2240044497),
            g = d(g, v, _, b, k[h + 8], 6, 1873313359),
            b = d(b, g, v, _, k[h + 15], 10, 4264355552),
            _ = d(_, b, g, v, k[h + 6], 15, 2734768916),
            v = d(v, _, b, g, k[h + 13], 21, 1309151649),
            g = d(g, v, _, b, k[h + 4], 6, 4149444226),
            b = d(b, g, v, _, k[h + 11], 10, 3174756917),
            _ = d(_, b, g, v, k[h + 2], 15, 718787259),
            v = d(v, _, b, g, k[h + 9], 21, 3951481745),
            g = n(g, p),
            v = n(v, f),
            _ = n(_, m),
            b = n(b, y);
    return (c(g) + c(v) + c(_) + c(b)).toLowerCase()
}

var o = 24679788;
var l = (new Date).getTime();
var sign = getSign("ac2e8deeb2e53b43dc06f9122c19247c" + "&" + '1644252725901' + "&" + '24679788' + "&" + '{"steal_params":"{\\"ccode\\":\\"0502\\",\\"client_ip\\":\\"192.168.1.1\\",\\"utid\\":\\"XcC3F4n7ThoCAVQRIgiibcOp\\",\\"client_ts\\":1644249087,\\"version\\":\\"2.1.74\\",\\"ckey\\":\\"DIl58SLFxFNndSV1GFNnMQVYkx1PP5tKe1siZu/86PR1u/Wh1Ptd+WOZsHHWxysSfAOhNJpdVWsdVJNsfJ8Sxd8WKVvNfAS8aS8fAOzYARzPyPc3JvtnPHjTdKfESTdnuTW6ZPvk2pNDh4uFzotgdMEFkzQ5wZVXl2Pf1/Y6hLK0OnCNxBj3+nb0v72gZ6b0td+WOZsHHWxysSo/0y9D2K42SaB8Y/+aD2K42SaB8Y/+ahU+WOZsHcrxysooUeND\\"}","biz_params":"{\\"vid\\":\\"XNTgwNDE0Nzk5Ng==\\",\\"play_ability\\":16782592,\\"current_showid\\":\\"563884\\",\\"preferClarity\\":3,\\"extag\\":\\"EXT-X-PRIVINF\\",\\"master_m3u8\\":1,\\"media_type\\":\\"standard,subtitle\\",\\"app_ver\\":\\"2.1.74\\",\\"h265\\":1}","ad_params":"{\\"atm\\":\\"\\"}"}');
console.log('sign', sign);


function getEncode(e) {
    return encodeURI(e)
}