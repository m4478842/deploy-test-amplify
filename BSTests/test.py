from selenium import webdriver
from threading import Thread
from time  import sleep 
import pytest

cap = {
    'os_version': '10',
    'os': 'Windows',
    'browser': 'chrome',
    'browser_version': '86.0',
    'name': 'test_funding_vue', 
    'build': 'funding-vue-auto-test',
    }


username =  'wangcong1'
accessKey = 'cDEx8QD3UMfxCnVuAE9H'

def test_first():
    driver = webdriver.Remote('https://'+username+':'+accessKey+'@hub-cloud.browserstack.com/wd/hub', desired_capabilities=cap)
    driver.get('http://16.162.44.75')
    sleep(2)
    userName = driver.find_element_by_id('username')
    passWord = driver.find_element_by_id('password')
    userName.send_keys('portal@vitalgateway.com.au')
    passWord.send_keys('123456')
    driver.find_element_by_xpath('//*[@id="formLogin"]/div[3]/div/div/span/button').click()
    sleep(2)
    driver.quit()
    


