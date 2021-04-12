export default {
  // // 入金通道配置-基础数据：
  // 'get|/admin/payment-gateway/commons':  option => {
  //   return {
  //     "data": {
  //       "countries": [
  //         "China",
  //         "USA",
  //         "India"
  //       ],
  //       "currencies": [
  //         "CNY",
  //         "IDR",
  //         "USD"
  //       ],
  //       "commissionFeeTypes": [
  //         "Percent",
  //         "Fix"
  //       ],
  //       "blackListTypes": [
  //         "Black",
  //         "White",
  //         "Black,White"
  //       ],
  //       "enabledTypes": [
  //         "YES",
  //         "NO"
  //       ],
  //       "balanceAlarmColors": [
  //         {
  //           "level": 1,
  //           "name": "Yellow",
  //           "color": "#ffffff"
  //         },
  //         {
  //           "level": 2,
  //           "name": "Orange",
  //           "color": "#eeeeee"
  //         }
  //       ]
  //     },
  //     "code": 200,
  //     "msg": "ok"
  //   }
  // },
  // // 入金通道列表：
  // 'get|/admin/payment-gateway':  option => {
  //   return {
  //     "data": [{
  //       "id": 1,
  //       "name": "Zota-IDR",
  //       "showName": "Zota Pay",
  //       "enabled": "YES", // NO means disabled,
  //       "callbackEnabled": "YES",
  //       "regulator": "ASIC", // ASIC,St.vencent,Cyprus
  //       "balance": 25600,
  //       "rankScore": 17,
  //       "supportCurrencies": "CNY,USD,IDR",
  //       "supportCountries": "China,Indonesia",
  //       "commissionFee": "0.015",
  //       "commissionFeeType": "Percent",
  //       "icon": "icon url",
  //       "blackListType": "Black,White",
  //       "created": "2021-03-11 12:00:00"
  //     }],
  //     "code": 200,
  //     "msg": "ok"
  //   }
  // },
  // // 入金通道详情：
  // 'get|/admin/getdetail/detail':  option => {
  //   return {
  //     "data": {
  //       "balance": 25000,
  //       "balanceAlarmList": [{
  //         "alarmAmount": 2000,
  //         "name":"Yellow",
  //         "color": "#ffffff", // hex color
  //         "created": "2021-03-04 20:00:00",
  //         "id": 1,
  //         "level": 1,
  //         "notifyEmails": "15321761517@163.com,15321761527@163.com",
  //         "updated": "2021-03-04 20:00:00"
  //       }],
  //       "balanceSettleCurrency": "USD",
  //       "blackListType": "Black,White",
  //       "callbackEnabled": "YES",
  //       "commissionFee": "0.015",
  //       "commissionFeeScore": 7,
  //       "commissionFeeType": "Percent",
  //       "dayCreditedLimit": 2000,
  //       "dayCreditedLimitUser": 100,
  //       "depositComment": "test words",
  //       "depositCurrencyList": [{
  //         "created": "2021-03-04 20:00:00",
  //         "direction": "Deposit",
  //         "exchangeRateProvider": "System",
  //         "gatewayWalletCurrency": "USD",
  //         "id": 1,
  //         "maxTransactionAmount": 50000,
  //         "minTransactionAmount": 10,
  //         "sourceCurrency": "IDR",
  //         "updated": "2021-03-04 20:00:00",
  //       }],
  //       "description": "test words",
  //       "enabled": "YES",
  //       "hourCreditedLimit": 100000,
  //       "hourCreditedLimitUser": 1000,
  //       "icon": "https://icon.jpg",
  //       "id": 1,
  //       "name": "Zota-IDR",
  //       "overBalanceScore": 10,
  //       "paymentProvider": "Zota Pay",
  //       "rankScore": 17,
  //       "regulator": "ASIC",
  //       "showName": "Zota Pay",
  //       "summerAvailableEndTime": "22:00",
  //       "summerAvailableStartTime": "07:00",
  //       "supportCountries": "China,India,Korea",
  //           "supportCurrencies": "CNY,USD,IDR",
  //       "transactionCreditedLimit": 5000,
  //       "transactionCreditedLimitUser": 500,
  //       "tutorialUrl": "https://tutorial.com",
  //       "userExperienceScore": 8,
  //       "winterAvailableEndTime": "23:00",
  //       "winterAvailableStartTime": "06:00",
  //     },
  //     "code": 200,
  //     "msg": "ok"
  //   }
  // },
  // // 入金通道更新（配置）：
  // 'post|/admin/payment-gateway':  option => {
  //   return {
  //     "data":null,
  //     "code":200,
  //     "msg":"ok"
  //   }
  // },
  // 通道例外原则-基础数据
  'get|/admin/payment-gateway/special-rank/commons':  option => {
    return {
      "data":{
        "countries": [
        "China",
        "USA",
        "India"
        ],
        "paymentGateways":[
          {
            "name":"Zota-IDR",
            "id":1,
            "regulator":"ASIC"
          },
          {
            "name":"Zota-USD",
            "id":2,
            "regulator":"ASIC"
          }
        ],
        metaTraderServerTypes:[
          "MetaTrade 4 Trading Server",
          "MetaTrade 5 Trading Server"
        ]
      },
      "code":200,
      "msg":"ok"
    }
  },
  // 通道例外原则-列表
  'get|/admin/payment-gateway/special-rank':  option => {
    return {
      "data":[
        {
          "id":1,
          "name":"特例配置名",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":2,
          "name":"特例配置2",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":3,
          "name":"特例配置3",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":4,
          "name":"特例配置4",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":5,
          "name":"特例配置5",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":6,
          "name":"特例配置6",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":7,
          "name":"特例配置7",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":8,
          "name":"特例配置8",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":9,
          "name":"特例配置9",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":10,
          "name":"特例配置10",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":11,
          "name":"特例配置11",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":12,
          "name":"特例配置12",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":13,
          "name":"特例配置13",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
        {
          "id":14,
          "name":"特例配置14",
          "regulator":"ASIC", 
          "countries":"China,India", // 适用国家
          "ibAccounts":[
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt4"
              },
              {
                "account":"test ib account",
                "metaTraderServerType":"Mt5"
              }
          ], // 适用IB
          "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
          "enabled":"Yes" // 是否启用 Yes or No
        },
      ],
      "code":200,
      "msg":"ok"
    }
  },
  // 通道例外原则-单个详情
  'get|/admin/payment-gateway/detail':  option => {
    return {
      "data":{
        "id":1,
        "name":"特例配置名",
        "regulator":"ASIC", // 从列表tab得来
        "countries":"China,India", // 适用国家
        "ibAccounts":[
            {
              "account":"test ib account",
              "metaTraderServerType":"Mt4"
            },
            {
              "account":"test ib account",
              "metaTraderServerType":"Mt5"
            }
        ], // 适用IB
        "userAccounts":"153217161517@163.com,123@163.com", // 适用用户email（account）
        "enabled":"Yes", // Yes or No
        "depositSpecialRankPaymentGateways":[{
          "paymentGateway":{
            "id":1
          },
          "extraScore":30, //权重加分
        }]
      },
      "code":200,
      "msg":"ok"
    }
  },
  // 通道例外原则-新增
  'put|/admin/payment-gateway/special-rank':  option => {
    return {
      "data":"ok",
      "code":200,
      "msg":"ok"
    }
  },
  // 通道例外原则-更新
  'post|/admin/payment-gateway/special-rank':  option => {
    return {
      "data":"ok",
      "code":200,
      "msg":"ok"
    }
  },
  // 通道例外原则-删除
  'delete|/admin/payment-gateway/special-rank/delete':  option => {
    return {
      "data":"ok",
      "code":200,
      "msg":"ok"
    }
  },
}