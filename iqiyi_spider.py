# coding:utf-8
import urllib
import urllib2
from bs4 import BeautifulSoup
import json
import os.path
import re


def file_extension(path):
	return os.path.splitext(path)[1]


# print urllib2
# response = urllib2.urlopen('http://www.zhihu.com')
# html = response.read()
# print html


iqiyi_vedio_list = []
img_name = 0
init_id = 10000
for page in range(31):
	url = 'http://list.iqiyi.com/www/1/-------------11-'+str(page+1)+'-1-iqiyi--.html'
	user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36'
	referer = 'http://www.iqiyi.com'
	postdata = {'username': 'leesx', 'password': '891212459x'}
	header = {'User-Agent': user_agent, 'Referer': referer}
	data = urllib.urlencode(postdata)
	req = urllib2.Request(url, data, header)
	res = urllib2.urlopen(req)
	html_str = res.read()

	soup = BeautifulSoup(html_str, 'lxml', from_encoding='utf-8')
	vedio_list = soup.select('.site-piclist > li')


	for item in vedio_list:
		dict = {}
		print '------------------------------------'
		dict['title'] = item.select('.site-piclist_info_title > a')[0].string
		dict['link'] = item.select('.site-piclist_info_title > a')[0].attrs['href']
		role_list = item.select('.role_info a')
		origin_imgurl = item.select('.site-piclist_pic img')[0].attrs['src']
		dict['origin_imgurl'] = origin_imgurl
		dict['img_name'] = 'iqiyi'+str(img_name) + file_extension(origin_imgurl)
		dict['id'] = init_id
		urllib.urlretrieve(origin_imgurl,'E:\\git2017\learn-python3\study-python\images\iqiyi' + str(img_name) + file_extension(origin_imgurl))
		img_name += 1
		init_id +=1
		role_names = ''
		for role in role_list:
			role_names+=role.string
			print role

		dict['role_name'] = role_names.strip().replace("\r\n", "")
		print item.select('.score')
		if len(item.select('.score')) != 0:

			print item.select('.score')[0].strings
			score_str = ''
			for score in item.select('.score')[0].strings:
				score_str+=score
			print score_str
			dict['score']=score_str
		else:
			dict['score'] = '6.0'
		print '------------------------------------'
		iqiyi_vedio_list.append(dict)

with open('qiyi.json', 'wb') as fp:
	json.dump(iqiyi_vedio_list, fp=fp, indent=4)
print iqiyi_vedio_list

