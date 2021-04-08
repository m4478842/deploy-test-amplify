export default {
  // 入金通道配置-基础数据：
  'get|/admin/payment-gateway/commons':  option => {
    return {
      "data": {
        "countries": [
          "China",
          "USA",
          "India"
        ],
        "currencies": [
          "CNY",
          "IDR",
          "USD"
        ],
        "commissionFeeTypes": [
          "Percent",
          "Fix"
        ],
        "blackListTypes": [
          "Black",
          "White",
          "Black,White"
        ],
        "enabledTypes": [
          "YES",
          "NO"
        ],
        "balanceAlarmColors": [
          {
            "level": 1,
            "name": "Yellow",
            "color": "#ffffff"
          },
          {
            "level": 2,
            "name": "Orange",
            "color": "#eeeeee"
          }
        ]
      },
      "code": 200,
      "msg": "ok"
    }
  },
  // 入金通道列表：
  'get|/admin/payment-gateway':  option => {
    return {
      "data": [{
        "id": 1,
        "name": "Zota-IDR",
        "showName": "Zota Pay",
        "enabled": "YES", // NO means disabled,
        "callbackEnabled": "YES",
        "regulator": "ASIC", // ASIC,St.vencent,Cyprus
        "balance": 25600,
        "rankScore": 17,
        "supportCurrencies": "CNY,USD,IDR",
        "supportCountries": "China,Indonesia",
        "commissionFee": "0.015",
        "commissionFeeType": "Percent",
        "icon": "icon url",
        "blackListType": "Black,White",
        "created": "2021-03-11 12:00:00"
      }],
      "code": 200,
      "msg": "ok"
    }
  },
  // 入金通道详情：
  'get|/admin/getdetail/detail':  option => {
    return {
      "data": {
        "balance": 25000,
        "balanceAlarmList": [{
          "alarmAmount": 2000,
          "name":"Yellow",
          "color": "#ffffff", // hex color
          "created": "2021-03-04 20:00:00",
          "id": 1,
          "level": 1,
          "notifyEmails": "15321761517@163.com,15321761527@163.com",
          "updated": "2021-03-04 20:00:00"
        }],
        "balanceSettleCurrency": "USD",
        "blackListType": "Black,White",
        "callbackEnabled": "YES",
        "commissionFee": "0.015",
        "commissionFeeScore": 7,
        "commissionFeeType": "Percent",
        "dayCreditedLimit": 2000,
        "dayCreditedLimitUser": 100,
        "depositComment": "test words",
        "depositCurrencyList": [{
          "created": "2021-03-04 20:00:00",
          "direction": "Deposit",
          "exchangeRateProvider": "System",
          "gatewayWalletCurrency": "USD",
          "id": 1,
          "maxTransactionAmount": 50000,
          "minTransactionAmount": 10,
          "sourceCurrency": "IDR",
          "updated": "2021-03-04 20:00:00",
        }],
        "description": "test words",
        "enabled": "YES",
        "hourCreditedLimit": 100000,
        "hourCreditedLimitUser": 1000,
        "icon": "https://icon.jpg",
        "id": 1,
        "name": "Zota-IDR",
        "overBalanceScore": 10,
        "paymentProvider": "Zota Pay",
        "rankScore": 17,
        "regulator": "ASIC",
        "showName": "Zota Pay",
        "summerAvailableEndTime": "22:00",
        "summerAvailableStartTime": "07:00",
        "supportCountries": "China,India,Korea",
            "supportCurrencies": "CNY,USD,IDR",
        "transactionCreditedLimit": 5000,
        "transactionCreditedLimitUser": 500,
        "tutorialUrl": "https://tutorial.com",
        "userExperienceScore": 8,
        "winterAvailableEndTime": "23:00",
        "winterAvailableStartTime": "06:00",
      },
      "code": 200,
      "msg": "ok"
    }
  },
  // 入金通道更新（配置）：
  'post|/admin/payment-gateway':  option => {
    return {
      "data":null,
      "code":200,
      "msg":"ok"
    }
  },
}