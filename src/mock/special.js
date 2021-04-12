export default {
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
  'get|/admin/payment-gateway/special-rank/detail':  option => {
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
        "gatewayDepositSpecialRanks":[{
          "gateway":{
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