<template>
  <div>
    <h1>特例配置</h1>
    <!-- <a-tabs type="card" @change="changeTag">
      <a-tab-pane key="1" tab="ASIC">
        <div class="table-page-search-wrapper">
          <a-form layout="inline" labelAlign="left">
            <a-row :gutter="24">
              <a-col :lg="5" :md="8" :sm="12">
                <a-form-item label="配置名字" :labelCol="{lg: {span: 8}, sm: {span: 7}}" :wrapperCol="{lg: {span: 16}, sm: {span: 17} }">
                  <a-input v-model="searchForm.name" placeholder="请输入配置名字"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6" :md="8" :sm="12">
                <span class="table-page-search-submitButtons">
                  <a-button type="primary" @click="handleToSearchEnterprise('1')">查询</a-button>
                  <a-button style="margin-left: 15px" icon="reload" @click="resetSearchEnterprise('1')">重置</a-button>
                  <a-button type="primary" style="margin-left: 15px" icon="plus" @click="add">新增</a-button>
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
          bordered
        >
          <a slot="name" slot-scope="text, record" @click="dialog(record)">{{record.name}}</a>
          <span slot="action" slot-scope="text, record">
            <a @click="del(record)">删除</a>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="STV">
        <div class="table-page-search-wrapper">
          <a-form layout="inline" labelAlign="left">
            <a-row :gutter="24">
              <a-col :lg="6" :md="8" :sm="12">
                <a-form-item label="ConfigurationName" :labelCol="{lg: {span: 10}, sm: {span: 7}}" :wrapperCol="{lg: {span: 14}, sm: {span: 17} }">
                  <a-input v-model="searchForm.name" placeholder="Configuration Name"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6" :md="8" :sm="12">
                <span class="table-page-search-submitButtons">
                  <a-button type="primary" @click="handleToSearchEnterprise('2')">查询</a-button>
                  <a-button style="margin-left: 8px" icon="reload" @click="resetSearchEnterprise('2')">重置</a-button>
                  <a-button type="primary" style="margin-left: 15px" icon="plus" @click="add">新增</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <a-table
          ref="STVTable"
          size="default"
          :rowKey="(record) => record.id"
          :columns="STVColumns"
          :data-source="loadSTVList"
          bordered
          :loading="tableLoading"
        >
          <a slot="name" slot-scope="text, record" @click="dialog(record)">{{record.name}}</a>
          <span slot="action" slot-scope="text, record">
            <a @click="del(record)">delete</a>
          </span>
        </a-table>
      </a-tab-pane>
    </a-tabs> -->
    <!-- 新增、编辑 -->
    <a-modal
      :title="title"
      :visible="visibleASIC"
      :confirm-loading="confirmLoadingASIC"
      width="1000px"
      @ok="handleOkASIC"
      @cancel="handleCancelASIC"
      v-if="commonList"
    >
      <!-- 新增 -->
      <div class="container" v-if="isAdd">
        <h3>配置</h3>
        <a-divider class="no-mg" />
        <table class="tbl" cellpadding='0' cellspacing='0'>
          <tr>
            <td>配置名字</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <a-input type='text' placeholder="请输入配置名字" style="width:200px"></a-input>
            </td>
            <td></td>
            <td></td>
            <td style="width:103px"></td>
          </tr>
          <tr>
            <td>入金通道</td>
            <td>排序分数</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in coinTypeList" :key="index">
            <td>
              <a-select placeholder="请选择入金通道" style="width:200px">
                <a-select-option :value="item" v-for="(item,index) in commonList.currencies" :key="index">
                  {{item}}
                </a-select-option>
              </a-select>
            </td>
            <td>
              <a-input type='number' placeholder="请输入排序分数" style="width:200px"></a-input>
            </td>
            <td style="width:103px">
              <a-button type="dashed" icon="delete" shape="circle" style="margin-right:10px" @click="delCoinType(index)" v-show="coinTypeList.length>1"></a-button>
              <a-button type="primary" icon="plus" shape="circle" @click="addCoinType" v-show="index===coinTypeList.length-1"></a-button>
            </td>
          </tr>
        </table>
        <h3>适用于</h3>
        <a-divider class="no-mg" />
        <table class="tbl" cellpadding='0' cellspacing='0'>
          <tr>
            <td>国家</td>
            <td>用户</td>
            <td style="width:380px"></td>
          </tr>
          <tr>
            <td>
              <a-select mode="multiple" v-model="selectedItems" @change="handleChange" placeholder="请选择国家" style="width:200px">
                <a-select-option :value="item" v-for="(item,index) in commonList.countries" :key="index">
                  {{item}}
                </a-select-option>
              </a-select>
            </td>
            <td class="ssy">
              <a-upload
                name="file"
                :multiple="true"
                :headers="headers"
                :data="uploadBlackParams"
                :customRequest="handleChangeBlackImport"
                accept=".xls,.xlsx"
              >
                <a-button type="primary" class="ml" :loading="blackListUpload" style="margin:0">Import</a-button>
              </a-upload>
              <a-button type="primary" class="ml" @click="blackListDownload('user')">Download</a-button>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>IB</td>
            <td>操作</td>
            <td></td>
          </tr>
          <tr v-for="(item,index) in balanceAlarmList" :key="index">
            <td>
              <a-input type='number' placeholder="请输入IB" style="width:200px"></a-input>
            </td>
            <td style="width:103px">
              <a-button type="dashed" icon="delete" shape="circle" style="margin-right:10px" @click="delBalance(index)" v-show="balanceAlarmList.length>1"></a-button>
              <a-button type="primary" icon="plus" shape="circle" @click="addBalance" v-show="index===balanceAlarmList.length-1"></a-button>
            </td>
            <td></td>
          </tr>
        </table>
      </div>
      <!-- 编辑 -->
      <div class="container" v-else>
        <h3>配置</h3>
        <a-divider class="no-mg" />
        <table class="tbl" cellpadding='0' cellspacing='0'>
          <tr>
            <td>配置名字</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <a-input type='text' placeholder="请输入配置名字" style="width:200px"></a-input>
            </td>
            <td></td>
            <td></td>
            <td style="width:103px"></td>
          </tr>
          <tr>
            <td>入金通道</td>
            <td>排序分数</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in coinTypeList" :key="index">
            <td>
              <a-select placeholder="请选择入金通道" style="width:200px">
                <a-select-option :value="item" v-for="(item,index) in commonList.currencies" :key="index">
                  {{item}}
                </a-select-option>
              </a-select>
            </td>
            <td>
              <a-input type='number' placeholder="请输入排序分数" style="width:200px"></a-input>
            </td>
            <td style="width:103px">
              <a-button type="dashed" icon="delete" shape="circle" style="margin-right:10px" @click="delCoinType(index)" v-show="coinTypeList.length>1"></a-button>
              <a-button type="primary" icon="plus" shape="circle" @click="addCoinType" v-show="index===coinTypeList.length-1"></a-button>
            </td>
          </tr>
        </table>
        <h3>适用于</h3>
        <a-divider class="no-mg" />
        <table class="tbl" cellpadding='0' cellspacing='0'>
          <tr>
            <td>国家</td>
            <td>用户</td>
            <td style="width:380px"></td>
          </tr>
          <tr>
            <td>
              <a-select mode="multiple" v-model="selectedItems" @change="handleChange" placeholder="请选择国家" style="width:200px">
                <a-select-option :value="item" v-for="(item,index) in commonList.countries" :key="index">
                  {{item}}
                </a-select-option>
              </a-select>
            </td>
            <td class="ssy">
              <a-upload
                name="file"
                :multiple="true"
                :headers="headers"
                :data="uploadBlackParams"
                :customRequest="handleChangeBlackImport"
                accept=".xls,.xlsx"
              >
                <a-button type="primary" class="ml" :loading="blackListUpload" style="margin:0">Import</a-button>
              </a-upload>
              <a-button type="primary" class="ml" @click="blackListDownload('user')">Download</a-button>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>IB</td>
            <td>操作</td>
            <td></td>
          </tr>
          <tr v-for="(item,index) in balanceAlarmList" :key="index">
            <td>
              <a-input type='number' placeholder="请输入IB" style="width:200px"></a-input>
            </td>
            <td style="width:103px">
              <a-button type="dashed" icon="delete" shape="circle" style="margin-right:10px" @click="delBalance(index)" v-show="balanceAlarmList.length>1"></a-button>
              <a-button type="primary" icon="plus" shape="circle" @click="addBalance" v-show="index===balanceAlarmList.length-1"></a-button>
            </td>
            <td></td>
          </tr>
        </table>
      </div>
    </a-modal>
  </div>
</template>

<script>
import STable from '@/components/table/';
import {
  paymentList,
  getPaymentCommons,
  paymentListDetail,
  paymentListUpdate,
  blacklistDownload,
  blacklistImport
} from '@/api/api'
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
          title: '配置名字',
          align: 'center',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '目标客户',
          align: 'center',
          dataIndex: 'showName'
        },
        {
          title: '目标IB',
          align: 'center',
          dataIndex: 'enabled'
        },
        {
          title: '目标国家',
          align: 'center',
          dataIndex: 'balance',
        },
        {
          title: '是否生效',
          align: 'center',
          dataIndex: 'rankScore',
        },
        {
          title: '操作',
          align: 'center',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      STVColumns: [
        {
          title: 'Configuration Name',
          align: 'center',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Target Customer',
          align: 'center',
          dataIndex: 'showName'
        },
        {
          title: 'Target IB',
          align: 'center',
          dataIndex: 'enabled'
        },
        {
          title: 'Target Country',
          align: 'center',
          dataIndex: 'balance',
        },
        {
          title: 'Enabled',
          align: 'center',
          dataIndex: 'rankScore',
        },
        {
          title: 'operation',
          align: 'center',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      searchForm: {
        regulator: 'ASIC',
        name: undefined,
      },
      loadASICList: [],
      loadSTVList: [],
      selectedItems: [],
      title: '',
      record: null,
      visibleASIC: false,
      confirmLoadingASIC: false,
      createForm: this.$form.createForm(this),
      coinTypeList: [
        {
          sourceCurrency: 'IDR',
          minTransactionAmount: 10,
          maxTransactionAmount: 100,
        },
        {
          sourceCurrency: 'IDR',
          minTransactionAmount: 100,
          maxTransactionAmount: 500,
        },
        {
          sourceCurrency: 'IDR',
          minTransactionAmount: 500,
          maxTransactionAmount: 5000,
        }
      ],
      balanceAlarmList: [
        {
          name: 'Yellow',
          alarmAmount: 2000
        },
        {
          name: 'Orange',
          alarmAmount: 2000
        },
      ],
      blackListEnabled: true,
      blackListImportEnabled: true,
      blackListDownEnabled: true,
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
      currentTag: '1',
      tableLoading: false,
      isAdd: false
    };
  },
  // components: {
  //   STable,
  // },
  computed: {
    filteredOptions() {
      return OPTIONS.filter(o => !this.selectedItems.includes(o));
    },
  },
  created () {
    this.changeTag('1')
    this.getCommons()
  },
  methods: {
    // 黑名单下载
    blackListDownload (fileName) {
      if(!fileName || typeof fileName != "string"){
        fileName = "导出文件"
      }
      let param = {
        blacklistType: 'Black',
        paymentGatewayId: this.record.id
      };
      blacklistDownload(param).then((data)=>{
        if (!data) {
          this.$message.warning("文件下载失败")
          return
        } else {
          this.$message.success('导出成功')
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data]), fileName+'.xls')
        }else{
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName+'.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) //下载完成移除元素
          window.URL.revokeObjectURL(url) //释放掉blob对象
        }
      })
    },
    // 上传文件
    handleChangeBlackImport(info) {
      const formData = new FormData()
      formData.append('file',info.file,info.file.name)
      formData.append('blacklistType',this.uploadBlackParams.blacklistType)
      formData.append('paymentGatewayId',this.record.id)
      blacklistImport(formData).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 新增IB
    addBalance () {
      this.balanceAlarmList.push({
        name: undefined,
        alarmAmount: ''
      })
    },
    // 删除IB
    delBalance (index) {
      this.balanceAlarmList.splice(index, 1)
    },
    // 新增入今通道
    addCoinType () {
      this.coinTypeList.push({
        sourceCurrency: undefined,
        minTransactionAmount: '',
        maxTransactionAmount: '',
      })
    },
    // 删除入今通道
    delCoinType (index) {
      this.coinTypeList.splice(index, 1)
    },
    // 获取国家、汇率、手续费类型、黑白名单类型、启用枚举、余额报警颜色
    getCommons () {
      getPaymentCommons().then(res => {
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
      console.log(this.selectedItems)
    },
    // 切换tag
    changeTag(key) {
      this.currentTag = key
      this.searchForm.name = undefined
      if (this.currentTag == '1') {
        this.searchForm.regulator = 'ASIC'
      } else {
        this.searchForm.regulator = 'STV'
      }
      this.getASICData(this.searchForm)
    },
    // 查询
    handleToSearchEnterprise (type) {
      if (type == '1') {
        this.currentTag==='1'
        this.searchForm.regulator = 'ASIC'
        if (this.searchForm.name) {
          this.tableLoading = true
          paymentList(this.searchForm).then(res => {
            this.tableLoading = false
            if (res.code===200) {
              this.loadASICList = res.data
              this.loadASICList = this.loadASICList.filter(value => {
                return value.name===this.searchForm.name
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.getASICData(this.searchForm)
        }
      } else {
        this.currentTag==='2'
        this.searchForm.regulator = 'STV'
        if (this.searchForm.name) {
          this.tableLoading = true
          paymentList(this.searchForm).then(res => {
            this.tableLoading = false
            if (res.code===200) {
              this.loadSTVList = res.data
              this.loadSTVList = this.loadSTVList.filter(value => {
                return value.name===this.searchForm.name
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.getASICData(this.searchForm)
        }
      }
    },
    // 重置
    resetSearchEnterprise (type) {
      if (type == '1') {
        this.searchForm = {
          regulator: 'ASIC',
          name: undefined,
        },
        this.getASICData(this.searchForm)
      } else {
        this.searchForm = {
          regulator: 'STV',
          name: undefined,
        },
        this.getASICData(this.searchForm)
      }
    },
    // 加载数据
    getASICData(params) {
      this.tableLoading = true
      paymentList(params).then(res => {
        this.tableLoading = false
        if (res.code===200 && this.currentTag==='1') {
          this.loadASICList = res.data
        } else if (res.code===200 && this.currentTag==='2') {
          this.loadSTVList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取详情
    getDetail (params) {
      paymentListDetail(params).then(res => {
        if (res.code === 200) {
          this.detailInfo = res.data
          this.detailInfo.enabled = this.detailInfo.enabled === "Yes" ? true : false
          this.detailInfo.callbackEnabled = this.detailInfo.callbackEnabled === "Yes" ? true : false
          this.detailInfo.commissionFee = this.detailInfo.commissionFeeType === 'Percent' ? this.detailInfo.commissionFee*100 + '' : this.detailInfo.commissionFee + ''
          this.coinTypeList = this.detailInfo.depositCurrencyList
          this.balanceAlarmList = this.detailInfo.balanceAlarmList
          this.blackListEnabled = this.detailInfo.blacklistType === 'Black' ? true : this.detailInfo.blacklistType === 'Black,White' ? true : false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 新增
    add () {
      this.title = '新增'
      this.isAdd = true
      this.visibleASIC = true
    },
    // 特例配置
    dialog (record) {
      this.isAdd = false
      this.uploadBlackParams.paymentGatewayId = record.id
      this.record = record
      this.getDetail(record.id)
      this.title = record.name
      this.visibleASIC = true
    },
    // 确认更新特例配置
    handleOkASIC () {
      let coinType = true
      let balanceType = true
      this.coinTypeList.forEach(item => {
        if (item.sourceCurrency===undefined || item.minTransactionAmount==='' || item.maxTransactionAmount==='') {
          this.$message.error('入金通道中数据不能为空')
          coinType = false
          return
        }
      })
      this.balanceAlarmList.forEach(item => {
        if (item.name===undefined || item.alarmAmount==='') {
          this.$message.error('IB数据不能为空')
          balanceType = false
          return
        }
      })
      if (!coinType || !balanceType) {
        return
      }
      let requestParams = JSON.parse(JSON.stringify(this.detailInfo))
      if (this.blackListEnabled&&!this.whiteListEnabled) {
        requestParams.blacklistType = 'Black'
      } else if (!this.blackListEnabled&&this.whiteListEnabled) {
        requestParams.blacklistType = 'White'
      } else if (this.blackListEnabled&&this.whiteListEnabled) {
        requestParams.blacklistType = 'Black,White'
      } else {
        requestParams.blacklistType = undefined
      }
      requestParams.depositCurrencyList = this.coinTypeList
      requestParams.balanceAlarmList = this.balanceAlarmList
      const formParams = this.createForm.getFieldsValue()
      formParams.supportCountries = formParams.supportCountries.join(',')
      formParams.commissionFee = formParams.commissionFeeType === 'Percent' ? formParams.commissionFee/100 : formParams.commissionFee
      requestParams.enabled = requestParams.enabled === true ? "Yes" : "No"
      requestParams.callbackEnabled = requestParams.callbackEnabled === true ? "Yes" : "No"
      console.log(Object.assign(requestParams,formParams))
      this.createForm.validateFields((err, values) => {
        if (!err) {
          this.confirmLoadingASIC = true
          paymentListUpdate(Object.assign(requestParams,formParams)).then(res => {
            if (res.code === 200) {
              this.confirmLoadingASIC = false
              this.$message.success(res.msg)
              this.getASICData({regulator: 'ASIC'})
              this.getASICData({regulator: 'STV'})
              this.handleCancelASIC()
            } else {
              this.confirmLoadingASIC = false
              this.$message.error(res.msg)
            }
          })
        }
      });
    },
    // 取消特例配置更新
    handleCancelASIC () {
      this.confirmLoadingASIC = false
      this.visibleASIC = false
    },
    // 删除
    del (record) {
      console.log(record)
    }
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
</style>
<style>
.operation-footer .ant-upload-list{
  display: none !important;
}
</style>