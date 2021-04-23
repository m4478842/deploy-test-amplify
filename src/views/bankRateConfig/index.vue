<template>
  <div>
    <!-- <h1>Bank汇率</h1> -->
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
      <!-- providerName -->
      <span slot="providerName" slot-scope="text, record">
        <a class="extend" v-if="!record.editIpt" @click="showEditDepositMargin(record)">{{record.providerName}}</a>
        <span v-else>
          <a-input style="width:100px" ref="iptInput" placeholder="providerName" v-model="record.providerName" @pressEnter="digitsMove(record)" @blur="sourceData(record,'editIpt')"></a-input>
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
          <span class="nm-l">入金汇率：</span>
          <span class="nm-r">{{detailInfo.lastRate.depositRate}}</span>
        </li>
        <li>
          <span class="nm-l">待更新入金汇率：</span>
          <span class="nm-r">{{detailInfo.pendingRate.depositRate}}</span>
        </li>
        <li>
          <span class="nm-l">变化率：</span>
          <span class="nm-r">{{detailInfo.changeRateIpt}}</span>
        </li>
        <li>
          <span class="nm-l">出金汇率：</span>
          <span class="nm-r">{{detailInfo.lastRate.withdrawalRate}}</span>
        </li>
        <li>
          <span class="nm-l">待更新出金汇率：</span>
          <span class="nm-r">{{detailInfo.pendingRate.withdrawalRate}}</span>
        </li>
        <li>
          <span class="nm-l">变化率：</span>
          <span class="nm-r">{{detailInfo.changeRateOpt}}</span>
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
  getBankRateList,
  getBankRateListUpdate,
  getBankRateListDetail,
  getBankRateUpdate
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
          title: '银行入金',
          align: 'center',
          dataIndex: 'depositRate',
        },
        {
          title: '银行出金',
          align: 'center',
          dataIndex: 'withdrawalRate',
        },
        {
          title: '来源',
          align: 'center',
          dataIndex: 'providerName',
          scopedSlots: { customRender: 'providerName' },
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
  created () {
    this.getASICData()
  },
  methods: {
    // 编辑来源
    showEditDepositMargin (record) {
      record.editIpt = true
      setTimeout(() => {
        this.$refs.iptInput.focus()
      }, 0)
    },
    // 失去焦点返回原始数据值
    sourceData (record, params) {
      record.editIpt = false
      this.loadASICList = JSON.parse(JSON.stringify(this.remarkList))
    },
    // 确认编辑
    updateItem (params) {
      getBankRateListUpdate(params).then(res => {
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
        getBankRateList(this.searchForm).then(res => {
          this.tableLoading = false
          if (res.code===200) {
            this.loadASICList = res.data
            this.loadASICList = this.loadASICList.filter(value => {
              let rems = [value.sourceCurrency,value.targetCurrency]
              return rems.includes(this.searchForm.name)
            })
            this.pagination.total = this.loadASICList.length
            res.data.forEach(item => {
              item.editIpt = false
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
      getBankRateList().then(res => {
        this.tableLoading = false
        if (res.code===200) {
          this.pagination.total = res.data.length
          res.data.forEach(item => {
            item.editIpt = false
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
      getBankRateListDetail(params).then(res => {
        if (res.code === 200) {
          this.detailInfo = res.data
          this.detailInfo.changeRateIpt = getPointNumber((this.detailInfo.lastRate.depositRate - this.detailInfo.pendingRate.depositRate) / this.detailInfo.lastRate.depositRate,2) + '%'
          this.detailInfo.changeRateOpt = getPointNumber((this.detailInfo.lastRate.withdrawalRate - this.detailInfo.pendingRate.withdrawalRate) / this.detailInfo.lastRate.withdrawalRate,2) + '%'
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
      getBankRateUpdate(params).then(res => {
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
