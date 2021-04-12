if [ $1 = BeforeInstall ];then
		mv /var/www/html /var/www/html_`date +%Y%m%d%H`
		mkdir /var/www/html
		mv /var/www/BSTests /var/www/BSTests_`date +%Y%m%d%H`
		mkdir /var/www/BSTests
	elif [ $1 = AfterInstall ];then
		python3 /var/www/BSTests/test.py 
	else
		echo  '请输入正确的参数'
fi