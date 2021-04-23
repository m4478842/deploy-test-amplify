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
      <!-- pairs -->
      <span slot="name" slot-scope="text,record">{{record.sourceCurrency}}{{record.targetCurrency}}</span>
      <!-- digits -->
      <span slot="digits" slot-scope="text, record">
        <a class="extend" v-if="!record.editDigts" @click="showEditDigits(record)">{{record.digits}}</a>
        <span v-else>
          <a-input style="width:100px" ref="digitsInput" type="number" min="0" placeholder="digits" v-model="record.digits" @pressEnter="digitsMove(record)" @blur="sourceData(record,'editDigts')"></a-input>
        </span>
      </span>
      <!-- depositMargin -->
      <span slot="depositMargin" slot-scope="text, record">
        <a class="extend" v-if="!record.editIpt" @click="showEditDepositMargin(record)">{{record.depositMargin}}</a>
        <span v-else>
          <a-input style="width:100px" ref="iptInput" type="number" placeholder="depositMargin" v-model="record.depositMargin" @pressEnter="digitsMove(record)" @blur="sourceData(record,'editIpt')"></a-input>
        </span>
      </span>
      <!-- withdrawalMargin -->
      <span slot="withdrawalMargin" slot-scope="text, record">
        <a class="extend" v-if="!record.editOpt" @click="showEditWithdrawalMargin(record)">{{record.withdrawalMargin}}</a>
        <span v-else>
          <a-input style="width:100px" ref="optInput" type="number" placeholder="withdrawalMargin" v-model="record.withdrawalMargin" @pressEnter="digitsMove(record)" @blur="sourceData(record,'editOpt')"></a-input>
        </span>
      </span>
      <!-- status -->
      <span slot="status" slot-scope="text, record">
        <a v-if="record.status==='Pending'" style="color:#f00" @click="dialog(record)">异常</a>
        <a v-else-if="record.status==='Update Failed'" style="color:#faad14" @click="()=>$message.warning('更新失败,请联系IT介入处理！')">更新失败</a>
        <a v-else style="color:#10a365">正常</a>
      </span>
    </a-table>
    <!-- 异常处理 -->
    <a-modal
      :title="title"
      :visible="visibleASIC"
      :confirm-loading="confirmLoadingASIC"
      @ok="handleOkASIC"
      @cancel="handleCancelASIC"
      v-if="detailInfo"
    >
      <h3>{{record.sourceCurrency}}{{record.targetCurrency}}</h3>
      <a-divider class="no-mg" />
      <ul class="err-md">
        <li>
          <span class="nm-l">现使用API汇率：</span>
          <span class="nm-r">{{detailInfo.lastRate.rate}}</span>
        </li>
        <li>
          <span class="nm-l">待更新API汇率：</span>
          <span class="nm-r">{{detailInfo.pendingRate.rate}}</span>
        </li>
        <li>
          <span class="nm-l">变化率：</span>
          <span class="nm-r">{{detailInfo.changeRate}}</span>
        </li>
        <li>
          <span class="nm-l">变化率阈值：</span>
          <a-input min="0" class="nm-input" type="number" v-model="detailInfo.exchangeRateConfig.rateChangeAlarm" placeholder="请输入阈值" suffix="%"></a-input>
        </li>
      </ul>
      <h3>处理更新方法</h3>
      <a-divider class="no-mg" />
      <ul class="err-md">
        <li>
          <span class="nm-l">处理方法：</span>
          <div>
            <a-select placeholder="请选择" style="width: 150px" v-model="handleMethod">
              <a-select-option :value="item" v-for="(item,index) in detailInfo.handleTypes" :key="index">
                {{item}}
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
  getAPIRateList,
  getAPIRateListUpdate,
  getAPIRateListDetail,
  getAPIRateUpdate
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
          title: 'Digits',
          align: 'center',
          dataIndex: 'digits',
          scopedSlots: { customRender: 'digits' },
        },
        {
          title: '基准入金',
          align: 'center',
          dataIndex: 'ipt',
        },
        {
          title: '入金点差',
          align: 'center',
          dataIndex: 'depositMargin',
          scopedSlots: { customRender: 'depositMargin' },
        },
        {
          title: 'API Rate',
          align: 'center',
          dataIndex: 'rate',
        },
        {
          title: '出金点差',
          align: 'center',
          dataIndex: 'withdrawalMargin',
          scopedSlots: { customRender: 'withdrawalMargin' },
        },
        {
          title: '基准出金',
          align: 'center',
          dataIndex: 'opt',
        },
        {
          title: 'Spread Rate',
          align: 'center',
          dataIndex: 'srt',
        },
        {
          title: 'Last Update',
          align: 'center',
          dataIndex: 'updated',
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
      ],
      searchForm: {
        regulator: 'ASIC',
        name: undefined,
      },
      loadASICList: [],
      remarkList: [],
      title: '异常处理',
      record: null,
      visibleASIC: false,
      confirmLoadingASIC: false,
      uploadBlackParams: {
        blacklistType: 'Black',
        paymentGatewayId: ''
      },
      commonList: null,
      detailInfo: null,
      tableLoading: false,
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
      handleMethod: undefined
    };
  },
  watch: {
    loadASICList: {
      handler (newV,oldV) {
        newV.forEach((item,index) => {
          item.rate = getPointNumber(this.remarkList[index].rate,item.digits)
          item.ipt = getPointNumber((Math.ceil((item.rate)*(10**item.digits)) + Number(item.depositMargin))/(10**item.digits),item.digits)
          item.opt = getPointNumber((Math.ceil((item.rate)*(10**item.digits)) + Number(item.withdrawalMargin))/(10**item.digits),item.digits)
          item.srt = getPointNumber((item.depositMargin - item.withdrawalMargin)/item.rate * 100,2) + '%'
        })
      },
      deep:true
    }
  },
  created () {
    this.getASICData()
  },
  methods: {
    // 编辑digits、deposit Margin、withdrawal Margin
    showEditDigits (record) {
      record.editDigts = true
      setTimeout(() => {
        this.$refs.digitsInput.focus()
      }, 0)
    },
    showEditDepositMargin (record) {
      record.editIpt = true
      setTimeout(() => {
        this.$refs.iptInput.focus()
      }, 0)
    },
    showEditWithdrawalMargin (record) {
      record.editOpt = true
      setTimeout(() => {
        this.$refs.optInput.focus()
      }, 0)
    },
    // 失去焦点返回原始数据值
    sourceData (record, params) {
      if (params === 'editDigts') {
        record.editDigts = false
      } else if (params === 'editIpt') {
        record.editIpt = false
      } else {
        record.editOpt = false
      }
      this.loadASICList = JSON.parse(JSON.stringify(this.remarkList))
    },
    // 确认编辑
    updateItem (params) {
      getAPIRateListUpdate(params).then(res => {
        if (res.code === 200) {
          this.$message.success('更新成功')
          this.getASICData()
        } else {
          this.$message.error('更新失败')
          this.getASICData()
        }
      })
    },
    // 保存编辑
    digitsMove (record) {
      this.updateItem(record)
    },
    // 分页查询
    handleTableChange (pagination) {
      this.pagination.current = pagination.current
      this.loadASICList = []
      let current = (this.pagination.current-1)*10
      if (this.pagination.total%this.pagination.pageSize<(this.pagination.total-current)) {
        for (let i=current;i<current+10;i++) {
          this.loadASICList.push(this.remarkList[i])
        }
      } else {
        for (let i=current;i<current+this.pagination.total%this.pagination.pageSize;i++) {
          this.loadASICList.push(this.remarkList[i])
        }
      }
    },
    // 条件查询
    handleToSearchEnterprise (type) {
      this.pagination.current = 1
      if (this.searchForm.name) {
        this.tableLoading = true
        getAPIRateList(this.searchForm).then(res => {
          this.tableLoading = false
          if (res.code===200) {
            this.loadASICList = res.data
            this.loadASICList = this.loadASICList.filter(value => {
              let rems = [value.sourceCurrency,value.targetCurrency]
              return rems.includes(this.searchForm.name)
            })
            this.pagination.total = this.loadASICList.length
            res.data.forEach(item => {
              let localIpt = item.depositMargin/(10**item.digits)
              let localOpt = item.withdrawalMargin/(10**item.digits)
              item.ipt = getPointNumber((Number(item.rate) + Number(localIpt)),item.digits)
              item.opt = getPointNumber((Number(item.rate) + Number(localOpt)),item.digits)
              item.srt = getPointNumber((item.depositMargin - item.withdrawalMargin)/item.rate,2) * 100 + '%'
              item.editDigts = false
              item.editIpt = false
              item.editOpt = false
            })
            this.loadASICList = this.loadASICList.slice((this.pagination.current-1)*10)
            this.remarkList = JSON.parse(JSON.stringify(this.loadASICList))
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
        this.pagination.pageNo = 1
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
      getAPIRateList().then(res => {
        this.tableLoading = false
        if (res.code===200) {
          this.pagination.total = res.data.length
          res.data.forEach(item => {
            let localIpt = item.depositMargin/(10**item.digits)
            let localOpt = item.withdrawalMargin/(10**item.digits)
            item.ipt = getPointNumber((Number(item.rate) + Number(localIpt)),item.digits)
            item.opt = getPointNumber((Number(item.rate) + Number(localOpt)),item.digits)
            item.srt = getPointNumber((item.depositMargin - item.withdrawalMargin)/item.rate,2) * 100 + '%'
            item.editDigts = false
            item.editIpt = false
            item.editOpt = false
          })
          this.remarkList = JSON.parse(JSON.stringify(res.data))
          this.loadASICList = []
          let current = (this.pagination.current-1)*10
          if (this.pagination.total%this.pagination.pageSize<(this.pagination.total-current)) {
            for (let i=current;i<current+10;i++) {
              this.loadASICList.push(this.remarkList[i])
            }
          } else {
            for (let i=current;i<current+this.pagination.total%this.pagination.pageSize;i++) {
              this.loadASICList.push(this.remarkList[i])
            }
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取详情
    getDetail (params) {
      getAPIRateListDetail(params).then(res => {
        if (res.code === 200) {
          this.detailInfo = res.data
          this.detailInfo.changeRate = getPointNumber((this.detailInfo.lastRate.rate - this.detailInfo.pendingRate.rate) / this.detailInfo.lastRate.rate,2) + '%'
          this.detailInfo.exchangeRateConfig.rateChangeAlarm = this.detailInfo.exchangeRateConfig.rateChangeAlarm * 100
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 异常处理
    dialog (record) {
      this.record = record
      this.getDetail(record.id)
      this.title = '异常处理'
      this.visibleASIC = true
    },
    // 确认更新异常处理
    handleOkASIC () {
      let params = {
        pendingRate: this.detailInfo.pendingRate,
        exchangeRateConfig: JSON.parse(JSON.stringify(this.detailInfo.exchangeRateConfig)),
        handleType: this.handleMethod,
      }
      if (!params.handleType) {
        this.$message.error('请选择处理方法！')
        return
      }
      this.confirmLoadingASIC = true
      params.exchangeRateConfig.rateChangeAlarm /= 100
      getAPIRateUpdate(params).then(res => {
        if (res.code === 200) {
          this.$message.success('更新成功')
          this.getASICData()
          this.handleCancelASIC()
        } else {
          this.$message.error('更新失败')
          this.confirmLoadingASIC = false
        }
      })
    },
    // 取消编辑异常处理
    handleCancelASIC () {
      this.confirmLoadingASIC = false
      this.visibleASIC = false
      this.handleMethod = undefined
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
