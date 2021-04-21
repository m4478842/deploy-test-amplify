<template>
  <div>
    <h1>汇率深度</h1>
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
              <a-button type="primary" @click="handleToSearchEnterprise('1')">查询</a-button>
              <a-button style="margin-left: 15px" icon="reload" @click="resetSearchEnterprise('1')">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table
      ref="ASICTable"
      size="default"
      :rowKey="(record) => record.baseExchangeRateId"
      :columns="ASICColumns"
      :data-source="loadASICList"
      :loading="tableLoading"
      :pagination="pagination"
      @change="handleTableChange"
      bordered
    >
      <a slot="name" slot-scope="text, record" @click="dialog(record)">{{record.sourceCurrency}}{{record.targetCurrency}}</a>
      <span slot="status" slot-scope="text, record">
        <a v-if="record.status==='Update Failed'" style="color:#f00" @click="()=>$message.warning('更新失败,请联系IT介入处理！')">更新失败</a>
        <a v-else style="color:#10a365">正常</a>
      </span>
    </a-table>
    <!-- 编辑 -->
    <a-modal
      :title="title"
      :visible="visibleASIC"
      :confirm-loading="confirmLoadingASIC"
      width="1000px"
      @ok="handleOkASIC"
      @cancel="handleCancelASIC"
      v-if="detailInfo"
    >
      <div class="container">
        <h3>{{detailInfo.sourceCurrency}}{{detailInfo.targetCurrency}}</h3>
        <a-divider class="no-mg" />
        <ul class="base-info">
          <li>
            <span>Digits：</span>
            <a-input type='number' min="0" placeholder="digits" v-model="detailInfo.digits" style="width:200px"></a-input>
          </li>
          <li>
            <span>基准入金汇率：</span>
            <span class="fontweight">{{detailInfo.depositRate}}</span>
          </li>
          <li>
            <span>基准出金汇率：</span>
            <span class="fontweight">{{detailInfo.withdrawalRate}}</span>
          </li>
          <li>
            <span>spread：</span>
            <span class="fontweight">{{detailInfo.spread}}</span>
          </li>
        </ul>
        <a-divider class="no-mg" />
        <div class="content">
          <table class="tbl" cellpadding='0' cellspacing='0'>
            <tr>
              <td>入金汇率深度</td>
              <td>入金汇率</td>
              <td>操作</td>
            </tr>
            <tr v-for="(item,index) in coinTypeList" :key="index">
              <td>
                <a-input type='number' v-model="item.depositMargin" placeholder="digits" style="width:100px"></a-input>
              </td>
              <td class="fontweight">{{item.depositRate}}</td>
              <td style="width:135px">
                <a-button type="primary" icon="plus" shape="circle" @click="addCoinType" v-if="index===0"></a-button>
                <a-button type="dashed" icon="delete" shape="circle" v-if="index>0" @click="delCoinType(index)"></a-button>
              </td>
            </tr>
          </table>
          <table class="tbl" cellpadding='0' cellspacing='0'>
            <tr>
              <td>Spread</td>
              <td>出金汇率深度</td>
              <td>出金汇率</td>
              <td>操作</td>
            </tr>
            <tr v-for="(item,index) in balanceAlarmList" :key="index">
              <td class="fontweight">{{item.spread}}</td>
              <td>
                <a-input type='number' v-model="item.withdrawalMargin" placeholder="digits" style="width:100px"></a-input>
              </td>
              <td class="fontweight">{{item.withdrawalRate}}</td>
              <td style="width:135px">
                <a-button type="primary" icon="plus" shape="circle" v-if="index===0" @click="addBalance"></a-button>
                <a-button type="dashed" icon="delete" shape="circle" v-if="index>0" @click="delBalance(index)"></a-button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  exchangeRate,
  exchangeRateDetail,
  getSpecialTableListDel,
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
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '汇率深度',
          align: 'center',
          dataIndex: 'index',
        },
        {
          title: '入金汇率',
          align: 'center',
          dataIndex: 'depositRate',
        },
        {
          title: '出金汇率',
          align: 'center',
          dataIndex: 'withdrawalRate',
        },
        {
          title: 'Last Update',
          align: 'center',
          dataIndex: 'updated',
        },
        {
          title: '报价来源',
          align: 'center',
          dataIndex: 'providerName',
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
      ],
      searchForm: {
        name: undefined,
      },
      loadASICList: [],
      loadSTVList: [],
      selectedItems: [],
      title: '汇率深度',
      record: null,
      visibleASIC: false,
      confirmLoadingASIC: false,
      coinTypeList: [
        {
          depositMargin: 0,
          depositRate: 0,
        }
      ],
      balanceAlarmList: [
        {
          withdrawalMargin: 0,
          withdrawalRate: 0,
          spread: 0
        }
      ],
      blackListEnabled: true,
      blackListUpload: false,
      headers: {
        authorization: 'authorization-text',
      },
      uploadBlackParams: {
        blacklistType: 'Black',
        paymentGatewayId: ''
      },
      commonList: null,
      detailInfo: null,
      detailInfoRemark: null,
      currentTag: '1',
      tableLoading: false,
      isAdd: true,
      pagination: {
        current: 1,
        pageNo: 1,
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
      formData: new FormData()
    };
  },
  computed: {
    filteredOptions() {
      return OPTIONS.filter(o => !this.selectedItems.includes(o));
    },
  },
  watch: {
    detailInfo: {
      handler (newV,oldV) {
        newV.depositRate = getPointNumber(this.detailInfoRemark.depositRate,newV.digits)
        newV.withdrawalRate = getPointNumber(this.detailInfoRemark.withdrawalRate,newV.digits)
        newV.spread = getPointNumber(newV.depositRate - newV.withdrawalRate,newV.digits)
        this.coinTypeList.forEach(item => {
          item.depositRate = getPointNumber((Math.ceil((this.detailInfo.depositRate)*(10**this.detailInfo.digits)) + Number(item.depositMargin))/(10**this.detailInfo.digits),this.detailInfo.digits)
        })
        this.balanceAlarmList.forEach(item => {
          item.withdrawalRate = getPointNumber((Math.ceil((this.detailInfo.withdrawalRate)*(10**this.detailInfo.digits)) + Number(item.withdrawalMargin))/(10**this.detailInfo.digits),this.detailInfo.digits)
        })
      },
      deep: true
    },
    coinTypeList: {
      handler (newV,oldV) {
        console.log('coinTypeList',newV)
        newV.forEach((item,index) => {
          item.depositRate = getPointNumber((Math.ceil((this.detailInfo.depositRate)*(10**this.detailInfo.digits)) + Number(item.depositMargin))/(10**this.detailInfo.digits),this.detailInfo.digits)
          if (this.coinTypeList.length >= this.balanceAlarmList.length) {
            this.balanceAlarmList[index].spread = getPointNumber((Math.ceil(item.depositRate*(10**this.detailInfo.digits)) - Math.ceil(this.balanceAlarmList[index].withdrawalRate*(10**this.detailInfo.digits)))/(10**this.detailInfo.digits),this.detailInfo.digits)
          }
        })
      },
      deep: true
    },
    balanceAlarmList: {
      handler (newV,oldV) {
        console.log('balanceAlarmList',newV)
        newV.forEach((item,index) => {
          item.withdrawalRate = getPointNumber((Math.ceil((this.detailInfo.withdrawalRate)*(10**this.detailInfo.digits)) + Number(item.withdrawalMargin))/(10**this.detailInfo.digits),this.detailInfo.digits)
          console.log(this.coinTypeList.length>=this.balanceAlarmList.length)
          if (this.coinTypeList.length >= this.balanceAlarmList.length) {
            item.spread = getPointNumber((Math.ceil(this.coinTypeList[index].depositRate*(10**this.detailInfo.digits)) - Math.ceil(item.withdrawalRate*(10**this.detailInfo.digits)))/(10**this.detailInfo.digits),this.detailInfo.digits)
          }
        })
      },
      deep: true
    }
  },
  created () {
    this.getASICData()
  },
  methods: {
    // 新增入金汇率深度
    addCoinType () {
      this.coinTypeList.push({
        depositMargin: 0,
        depositRate: 0,
      })
    },
    // 删除入金汇率深度
    delCoinType (index) {
      this.coinTypeList.splice(index, 1)
    },
    // 新增	出金汇率深度
    addBalance () {
      this.balanceAlarmList.push({
        withdrawalMargin: 0,
        withdrawalRate: 0,
        spread: 0
      })
    },
    // 删除	出金汇率深度
    delBalance (index) {
      this.balanceAlarmList.splice(index, 1)
    },
    // 切换tag
    changeTag(key) {
      this.currentTag = key
      this.searchForm.name = undefined
      this.getASICData(this.searchForm)
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
        exchangeRate(this.searchForm).then(res => {
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
        this.getASICData(this.searchForm)
      }
    },
    // 重置
    resetSearchEnterprise (type) {
      this.searchForm = {
        name: undefined,
      },
      this.pagination.current = 1
      this.getASICData(this.searchForm)
    },
    // 加载数据
    getASICData() {
      this.tableLoading = true
      exchangeRate(Object.assign(this.pagination,this.searchForm)).then(res => {
        this.tableLoading = false
        if (res.code===200) {
          this.pagination.total = res.data.total
          this.loadASICList = res.data.records
          this.loadASICList.forEach(list => {
            list.index = 1
            list.depositRate = getPointNumber(list.depositRate,list.digits)
            list.withdrawalRate = getPointNumber(list.withdrawalRate,list.digits)
            if (list.spreadLevels.length>0) {
              list.spreadLevels.forEach((item,index) => {
                item.index = index + 2
                item.depositRate = getPointNumber((Math.ceil((list.depositRate)*(10**list.digits)) + Number(item.depositMargin))/(10**list.digits),list.digits)
                item.withdrawalRate = getPointNumber((Math.ceil((list.withdrawalRate)*(10**list.digits)) + Number(item.withdrawalMargin))/(10**list.digits),list.digits)
              })
            }
            list.children = list.spreadLevels.length===0?null:list.spreadLevels
          })

        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取详情
    getDetail (params) {
      exchangeRateDetail(params).then(res => {
        console.log('detail',res)
        if (res.code === 200) {
          this.detailInfo = res.data
          this.detailInfoRemark = JSON.parse(JSON.stringify(this.detailInfo))
          this.coinTypeList = []
          this.balanceAlarmList = []
          if (this.detailInfo.spreadLevels.length > 0) {
            this.detailInfo.spreadLevels.forEach(item => {
              this.coinTypeList.push({
                depositMargin: item.depositMargin,
                depositRate: getPointNumber((Math.ceil((this.detailInfo.depositRate)*(10**this.detailInfo.digits)) + Number(item.depositMargin))/(10**this.detailInfo.digits),this.detailInfo.digits)
              })
              this.balanceAlarmList.push({
                withdrawalMargin: item.withdrawalMargin,
                withdrawalRate: getPointNumber((Math.ceil((this.detailInfo.withdrawalRate)*(10**this.detailInfo.digits)) + Number(item.withdrawalMargin))/(10**this.detailInfo.digits),this.detailInfo.digits),
                spread: 0
              })
            })
          } else {
            this.coinTypeList = [{
              depositMargin: 0,
              depositRate: 0,
            }]
            this.balanceAlarmList = [{
              withdrawalMargin: 0,
              withdrawalRate: 0,
              spread: 0
            }]
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 特例配置
    dialog (record) {
      this.record = record
      this.getDetail(record.baseExchangeRateId)
      this.visibleASIC = true
    },
    // 确认更新特例配置
    handleOkASIC () {
      this.handleCancelASIC()
    },
    // 取消特例配置更新
    handleCancelASIC () {
      this.confirmLoadingASIC = false
      this.visibleASIC = false
      this.coinTypeList = [
        {
          depositMargin: 0,
          depositRate: 0,
        }
      ]
      this.balanceAlarmList = [
        {
          withdrawalMargin: 0,
          withdrawalRate: 0,
          spread: 0
        }
      ]
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
.base-info{
  padding: 0;
  margin: 20px 0 20px 0;
  list-style: none;
  li{
    display: flex;
    align-items: center;
    margin: 10px 0;
    span{
      &:first-child{
        width: 120px;
        // text-align: right;
      }
    }
  }
}
.content{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
<style>
.upload-re .ant-upload-list{
  display: none !important;
}
</style>