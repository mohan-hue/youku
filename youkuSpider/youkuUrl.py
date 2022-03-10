# -*- coding: utf-8 -*-

import time
import requests
import json
import urllib.request
import execjs
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import re

indexHeader = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
}

indexUrl = 'https://v.youku.com/v_show/id_XNTgwNDE0Nzk5Ng==.html?spm=a2hbt.13141534.1_2.1&s=fcfe358da2c94d879474'

# session = requests.Session()
indexResponse = requests.get(url=indexUrl, headers=indexHeader)
# print(indexResponse.text)

headers = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    'Host': 'acs.youku.com',
    'Referer': 'https://v.youku.com/v_show/id_XMTU0MTc1MTM4NA==.html',
    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
}

url = 'https://acs.youku.com/h5/mtop.youku.play.ups.appinfo.get/1.1/?jsv=2.5.8&appKey=24679788&t={}&sign={}&data={}'
url1 = 'https://acs.youku.com/h5/mtop.youku.play.ups.appinfo.get/1.1/'
times = str(int(time.time() * 1000))
vid = 'XMTU0MTc1MTM4NA=='  # 视频的id
data = r'''{"steal_params":"{\"ccode\":\"0502\",\"client_ip\":\"192.168.1.1\",\"utid\":\"XcC3F4n7ThoCAVQRIgiibcOp\",\"client_ts\":%s,\"version\":\"2.1.69\",\"ckey\":\"DIl58SLFxFNndSV1GFNnMQVYkx1PP5tKe1siZu/86PR1u/Wh1Ptd+WOZsHHWxysSfAOhNJpdVWsdVJNsfJ8Sxd8WKVvNfAS8aS8fAOzYARzPyPc3JvtnPHjTdKfESTdnuTW6ZPvk2pNDh4uFzotgdMEFkzQ5wZVXl2Pf1/Y6hLK0OnCNxBj3+nb0v72gZ6b0td+WOZsHHWxysSo/0y9D2K42SaB8Y/+aD2K42SaB8Y/+ahU+WOZsHcrxysooUeND\"}","biz_params":"{\"vid\":\"%s\",\"play_ability\":16782592,\"current_showid\":\"%s\",\"preferClarity\":99,\"extag\":\"EXT-X-PRIVINF\",\"master_m3u8\":1,\"media_type\":\"standard,subtitle\",\"app_ver\":\"2.1.69\",\"h265\":1}","ad_params":"{\"vs\":\"1.0\",\"pver\":\"2.1.69\",\"sver\":\"2.0\",\"site\":1,\"aw\":\"w\",\"fu\":0,\"d\":\"0\",\"bt\":\"pc\",\"os\":\"win\",\"osv\":\"10\",\"dq\":\"auto\",\"atm\":\"\",\"partnerid\":\"null\",\"wintype\":\"interior\",\"isvert\":0,\"vip\":1,\"p\":1,\"rst\":\"mp4\",\"needbf\":2,\"avs\":\"1.0\"}"}''' % (
    times[:10], vid, '563884')
with open('./youkuJs.js', 'r', encoding='utf-8') as f:
    jsCode = f.read()

response = requests.get(url.format(times, '', data), headers=headers)
# 将<class 'http.cookiejar.Cookie'>类型转换为字典类型
dictCookie = requests.utils.dict_from_cookiejar(response.cookies)

cookie = '_m_h5_tk=' + dictCookie['_m_h5_tk'] + '; _m_h5_tk_enc=' + dictCookie['_m_h5_tk_enc']
headers['cookie'] = cookie
token = re.findall('(.*?)_', dictCookie['_m_h5_tk'], re.S)[0]
print("cookie", cookie, '\n', 'token', token)

# ----------------使用哈希库进行md5加密--------------------------
import hashlib

md5 = hashlib.md5()
s = token + "&" + times + "&" + '24679788' + "&" + data
md5.update(s.encode('utf-8'))
sign1 = md5.hexdigest()
print('md5', md5.hexdigest())
# ----------------使用哈希库进行md5加密--------------------------

sign = execjs.compile(jsCode).call('getSign', token + "&" + times + "&" + '24679788' + "&" + data)
print("sign:", sign)

# python使用的quote生成的encode跟优酷的不一致，需要改，时间戳问题，sign问题，cookie问题
params = {
    "jsv": "2.5.8",
    "appKey": "24679788",
    "t": times,
    "sign": sign,
    "api": "mtop.youku.play.ups.appinfo.get",
    "v": "1.1",
    "timeout": "20000",
    "YKPid": "20160317PLF000211",
    "YKLoginRequest": "true",
    "AntiFlood": "true",
    "AntiCreep": "true",
    "type": "jsonp",
    "dataType": "jsonp",
    "callback": "mtopjsonp1",
    "data": data,
}
response = requests.get(url1, params=params, headers=headers)
print(response.text)
print(re.findall('"m3u8_url":"(.*?)"', response.text, re.S))



