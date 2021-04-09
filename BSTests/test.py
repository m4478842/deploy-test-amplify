from selenium import webdriver
from threading import Thread
from time  import sleep 

caps = [
    {
    'os_version': '10',
    'os': 'Windows',
    'browser': 'chrome',
    'browser_version': '86.0',
    'name': 'test_btn', 
    'build': 'funding-vue-auto-test',
    },
    {
    'os_version': '10',
    'os': 'Windows',
    'browser': 'chrome',
    'browser_version': '85.0',
    'name': 'test_btn', 
    'build': 'funding-vue-auto-test' ,
    },

]

username =  'wangcong1'
accessKey = 'cDEx8QD3UMfxCnVuAE9H'

def test(cap):
    driver = webdriver.Remote('https://'+username+':'+accessKey+'@hub-cloud.browserstack.com/wd/hub', desired_capabilities=cap)
    driver.get('http://18.167.121.200')
    sleep(3)
    driver.quit()
    

for cap in caps:
    Thread(target=test, args=(cap,)).start()  

