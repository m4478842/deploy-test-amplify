<template>
  <div>
    <!-- <h1>API汇率</h1> -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" labelAlign="left">
        <a-row :gutter="24">
          <a-col :lg="5" :md="8" :sm="12">
            <a-form-item label="Pairs" :labelCol="{lg: {span: 8}, sm: {span: 7}}" :wrapperCol="{lg: {span: 16}, sm: {span: 17} }">
              <a-input v-model="searchForm.name" placeholder="Pairs Name"/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="12">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="handleToSearchEnterprise">查询</a-button>
              <a-button style="margin-left: 15px" icon="reload" @click="resetSearchEnterprise">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table
      ref="ASICTable"
      size="default"
      :rowKey="(record) => record.id"
      :columns="ASICColumns"
      :data-source="loadASICList"
      :loading="tableLoading"
      :pagination="pagination"
      @change="handleTableChange"
      bordered
    >
      <span slot="enableda" slot-scope="text, record">
        <a class="extend" v-if="!record.editDigts" @click="showEditDigits(record)">{{record.enableda}}</a>
        <span v-else>
          <a-input style="width:100px" ref="digitsInput" type="number" min="0" placeholder="digits" v-model="record.enableda" @change="digits(record)" @pressEnter="digitsMove(record)" @blur="digitsMove(record)"></a-input>
        </span>
      </span>
      <span slot="enabledi" slot-scope="text, record">
        <a v-if="record.enabledi==='异常'" @click="dialog(record)">{{record.enabledi}}</a>
        <a v-else style="color:#10a365">{{record.enabledi}}</a>
      </span>
    </a-table>
    <!-- 异常 -->
    <a-modal
      :title="title"
      :visible="visibleASIC"
      :confirm-loading="confirmLoadingASIC"
      @ok="handleOkASIC"
      @cancel="handleCancelASIC"
      v-if="commonList"
    >
      <h3>AUDIDR</h3>
      <a-divider class="no-mg" />
      <ul class="err-md">
        <li>
          <span class="nm-l">现使用API汇率：</span>
          <span class="nm-r">11159.92</span>
        </li>
        <li>
          <span class="nm-l">待更新API汇率：</span>
          <span class="nm-r">11159.92</span>
        </li>
        <li>
          <span class="nm-l">变化率：</span>
          <span class="nm-r">3%</span>
        </li>
        <li>
          <span class="nm-l">变化率阈值：</span>
          <a-input min="0" class="nm-input" type="number" placeholder="请输入阈值" suffix="%"></a-input>
        </li>
      </ul>
      <h3>处理更新方法</h3>
      <a-divider class="no-mg" />
      <ul class="err-md">
        <li>
          <span class="nm-l">处理方法：</span>
          <div>
            <a-select placeholder="请选择" style="width: 150px">
              <a-select-option value="update">
                更新
              </a-select-option>
              <a-select-option value="ignor">
                忽略该次更新
              </a-select-option>
            </a-select>
          </div>
        </li>
      </ul>
    </a-modal>
  </div>
</template>

<script>
import {
  getSpecialTableList,
  getSpecialCommon,
  getSpecialTableListDetail,
  getSpecialTableListAdd,
  getSpecialTableListUpdate,
} from '@/api/api'
import { getPointNumber } from '@/utils/util'
export default {
  data() {
  const cellStyle = {
      maxWidth: '120px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow:'ellipsis',
      cursor:'pointer',
    };
    return {
      ASICColumns: [
        {
          title: 'Pairs',
          align: 'center',
          dataIndex: 'name',
        },
        {
          title: 'Digits',
          align: 'center',
          dataIndex: 'enableda',
          scopedSlots: { customRender: 'enableda' },
        },
        {
          title: '基准入金',
          align: 'center',
          dataIndex: 'enabledb',
        },
        {
          title: '入金点差',
          align: 'center',
          dataIndex: 'enabledc',
        },
        {
          title: 'API Rate',
          align: 'center',
          dataIndex: 'enabledd',
        },
        {
          title: '出金点差',
          align: 'center',
          dataIndex: 'enablede',
        },
        {
          title: '基准出金',
          align: 'center',
          dataIndex: 'enabledf',
        },
        {
          title: 'Spread Rate',
          align: 'center',
          dataIndex: 'enabledg',
          customRender: text => getPointNumber(text*100,0) + '%'
        },
        {
          title: 'Last Update',
          align: 'center',
          dataIndex: 'enabledh',
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'enabledi',
          scopedSlots: { customRender: 'enabledi' },
        },
      ],
      searchForm: {
        regulator: 'ASIC',
        name: undefined,
      },
      loadASICList: [
        {
          id: '1',
          name: 'AUDCNY',
          enableda: 4,
          enabledb: 4.9815,
          enabledc: 10,
          enabledd: 4.9815,
          enablede: -10,
          enabledf: 4.9825,
          enabledg: 0.02,
          enabledh: '2021-04-12 07:20:00',
          enabledi: '正常',
          editDigts: false,
        },
        {
          id: '2',
          name: 'AUDCNY',
          enableda: 2,
          enabledb: 4.98,
          enabledc: 10,
          enabledd: 4.98,
          enablede: -10,
          enabledf: 4.98,
          enabledg: 0.02,
          enabledh: '2021-04-12 07:20:00',
          enabledi: '异常',
          editDigts: false,
        },
      ],
      selectedItems: [],
      title: '异常处理',
      record: null,
      visibleASIC: false,
      confirmLoadingASIC: false,
      coinTypeList: [
        {
          paymentGateway: {id: undefined},
          extraScore: '',
        },
      ],
      balanceAlarmList: [
        {
          metaTraderServerType: undefined,
          account: ''
        }
      ],
      uploadBlackParams: {
        blacklistType: 'Black',
        paymentGatewayId: ''
      },
      commonList: null,
      detailInfo: null,
      tableLoading: false,
      isAdd: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 10
      },
      addEditParams: {
        jsonString: {
          name: '',
          regulator: '',
          countries: '',
          ibAccounts: [],
          enabled: 'Yes',
          depositSpecialRankPaymentGateways: [],
        },
        file: null
      },
      formData: new FormData(),
    };
  },
  computed: {
  },
  created () {
    this.getCommons()
    // this.getASICData()
  },
  methods: {
    // 编辑digits
    showEditDigits (record) {
      record.editDigts = true
      setTimeout(() => {
        this.$refs.digitsInput.focus()
      }, 0)
    },
    digits (record) {
      console.log(record)
      record.enabledb = getPointNumber(record.enabledb,record.enableda)
      record.enabledd = getPointNumber(record.enabledd,record.enableda)
      record.enabledf = getPointNumber(record.enabledf,record.enableda)
    },
    // 移出编辑digits
    digitsMove (record) {
      record.editDigts = false
      console.log(record)
    },
    // 获取国家、汇率、手续费类型、黑白名单类型、启用枚举、余额报警颜色
    getCommons () {
      getSpecialCommon().then(res => {
        console.log('common',res.data)
        if (res.code===200) {
          this.commonList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 选择国家
    handleChange(selectedItems) {
      this.selectedItems = selectedItems;
    },
    // 分页查询
    handleTableChange (pagination) {
      this.pagination.current = pagination.current
      this.getASICData(this.searchForm)
    },
    // 条件查询
    handleToSearchEnterprise (type) {
      this.pagination.current = 1
      if (this.searchForm.name) {
        this.tableLoading = true
        getSpecialTableList(this.searchForm).then(res => {
          this.tableLoading = false
          if (res.code===200) {
            this.loadASICList = res.data
            this.loadASICList = this.loadASICList.filter(value => {
              return value.name===this.searchForm.name
            })
            this.pagination.total = this.loadASICList.length
            this.loadASICList = this.loadASICList.slice((this.pagination.current-1)*10)
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.getASICData()
      }
    },
    // 重置
    resetSearchEnterprise (type) {
      if (type == '1') {
        this.searchForm = {
          regulator: 'ASIC',
          name: undefined,
        },
        this.pagination.current = 1
        this.getASICData(this.searchForm)
      } else {
        this.searchForm = {
          regulator: 'STV',
          name: undefined,
        },
        this.pagination.current = 1
        this.getASICData(this.searchForm)
      }
    },
    // 加载数据
    getASICData() {
      this.tableLoading = true
      getSpecialTableList().then(res => {
        this.tableLoading = false
        if (res.code===200) {
          this.pagination.total = res.data.length
          this.loadASICList = res.data.slice((this.pagination.current-1)*10)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取详情
    getDetail (params) {
      getSpecialTableListDetail(params).then(res => {
        console.log('detail',res)
        if (res.code === 200) {
          this.detailInfo = res.data
          let nullBalance = [
            {
              metaTraderServerType: undefined,
              account: ''
            }
          ]
          let nullCoin = [
            {
              paymentGateway: {id: undefined},
              extraScore: '',
            },
          ]
          this.addEditParams.jsonString = res.data
          this.coinTypeList = res.data.depositSpecialRankPaymentGateways.length===0 ? nullCoin : res.data.depositSpecialRankPaymentGateways
          this.balanceAlarmList = res.data.ibAccounts.length===0? nullBalance : res.data.ibAccounts
          this.selectedItems = this.addEditParams.jsonString.countries==='' ? [] : this.addEditParams.jsonString.countries.split(',')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 特例配置
    dialog (record) {
      this.isAdd = false
      this.uploadBlackParams.paymentGatewayId = record.id
      this.record = record
      this.getDetail(record.id)
      this.title = '异常处理'
      this.visibleASIC = true
    },
    // 确认更新特例配置
    handleOkASIC () {
      this.visibleASIC = false
    },
    // 取消特例配置更新
    handleCancelASIC () {
      this.confirmLoadingASIC = false
      this.visibleASIC = false
      this.addEditParams = {
        jsonString: {
          name: '',
          regulator: '',
          countries: '',
          ibAccounts: [],
          enabled: 'Yes',
          depositSpecialRankPaymentGateways: [],
        },
        file: null
      }
      this.coinTypeList = [
        {
          paymentGateway: {id: undefined},
          extraScore: '',
        },
      ]
      this.balanceAlarmList = [
        {
          metaTraderServerType: undefined,
          account: ''
        }
      ]
      this.selectedItems = []
      this.formData = new FormData()
    },
  },
};
</script>

<style lang="less" scoped>
.table-page-search-wrapper{
  margin: 10px 0 20px 0;
}
.no-mg{
  margin: 0;
}
.container{
  width: 100%;
  max-height: 680px;
  overflow-y: overlay;
  padding: 0 20px 0 0;
  // overflow-x: hidden;
}
.form-row{
  margin: 10px 0 0 0;
}
.tbl{
  margin: 20px 0;
  width: 100%;
  tr{
    td{
      padding: 0 0 10px 0;
    }
  }
}
.operation-footer{
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
.ml{
  margin: 0 0 0 10px;
}
.ssy{
  display: flex;
}
.fontweight{
  font-weight: bold;
  color: #000000;
}
.extend{
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.err-md{
  padding: 0;
  margin: 0;
  list-style: none;
  li{
    margin: 10px 0;
    display: flex;
    .nm-l{
      width: 150px;
    }
    .nm-r{
      color: #000000;
      font-weight: bold;
    }
    .nm-input{
      width: 150px;
    }
  }
}
</style>
<style>
.upload-re .ant-upload-list{
  display: none !important;
}
</style>