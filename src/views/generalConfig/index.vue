<template>
  <div>
    <a-tabs type="card" @change="changeTag">
      <a-tab-pane key="1" tab="ASIC">
        <div class="table-page-search-wrapper">
          <a-form layout="inline" labelAlign="left">
            <a-row :gutter="24">
              <a-col :lg="5" :md="8" :sm="12">
                <a-form-item label="通道" :labelCol="{lg: {span: 8}, sm: {span: 7}}" :wrapperCol="{lg: {span: 16}, sm: {span: 17} }">
                  <a-input v-model="searchForm.name" placeholder="请输入通道名称"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6" :md="8" :sm="12">
                <span class="table-page-search-submitButtons">
                  <a-button type="primary" @click="handleToSearchEnterprise('1')">查询</a-button>
                  <a-button style="margin-left: 8px" icon="reload" @click="resetSearchEnterprise('1')">重置</a-button>
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
          <a slot="name" slot-scope="text, record" @click="dialog(record)">{{record.name}}</a>
          <span slot="balance" slot-scope="text, record" :style="{color: record.balanceAlarmColor}">{{record.balance}}</span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="STV">
        <div class="table-page-search-wrapper">
          <a-form layout="inline" labelAlign="left">
            <a-row :gutter="24">
              <a-col :lg="5" :md="8" :sm="12">
                <a-form-item label="Channel" :labelCol="{lg: {span: 8}, sm: {span: 7}}" :wrapperCol="{lg: {span: 16}, sm: {span: 17} }">
                  <a-input v-model="searchForm.name" placeholder="Channel"/>
                </a-form-item>
              </a-col>
              <a-col :lg="6" :md="8" :sm="12">
                <span class="table-page-search-submitButtons">
                  <a-button type="primary" @click="handleToSearchEnterprise('2')">查询</a-button>
                  <a-button style="margin-left: 8px" icon="reload" @click="resetSearchEnterprise('2')">重置</a-button>
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
          :pagination="pagination"
          @change="handleTableChange"
        >
          <a slot="name" slot-scope="text, record" @click="dialog(record)">{{record.name}}</a>
        </a-table>
      </a-tab-pane>
    </a-tabs>
    
    <a-modal
      :title="title"
      :visible="visibleASIC"
      :confirm-loading="confirmLoadingASIC"
      width="1000px"
      @ok="handleOkASIC"
      @cancel="handleCancelASIC"
    >
      <div class="container" v-if="commonList&&detailInfo">
        <h3>基本设置</h3>
        <a-divider class="no-mg" />
        <a-form class="form-row" labelAlign="left" :form="createForm">
          <a-row :gutter="24">
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item label="" :labelCol="{lg: {span: 8}, sm: {span: 7}}" :wrapperCol="{lg: {span: 16}, sm: {span: 17} }">
                <a-checkbox v-model="detailInfo.enabled">
                  生效
                </a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item label="" :labelCol="{lg: {span: 8}, sm: {span: 7}}" :wrapperCol="{lg: {span: 16}, sm: {span: 17} }">
                <a-checkbox v-model="detailInfo.callbackEnabled">
                  允许通道回调
                </a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item label="显示名称" :labelCol="{lg: {span: 8}, sm: {span: 7}}" :wrapperCol="{lg: {span: 16}, sm: {span: 17} }">
                <a-input placeholder="请输入显示名称"
                  v-decorator="['showName', {rules: [{ required: true, message: '请输入显示名称', whitespace: true}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item label="支持国家" :labelCol="{lg: {span: 8}, sm: {span: 7}}" :wrapperCol="{lg: {span: 16}, sm: {span: 17} }">
                <a-select
                  v-decorator="[
                    'supportCountries',
                    {
                      rules: [
                        { required: true, message: '请选择支持国家', type: 'array' },
                      ],
                    },
                  ]"
                  mode="multiple"
                  placeholder="请选择支持国家"
                >
                  <a-select-option :value="item" v-for="(item,index) in commonList.countries" :key="index">
                    {{item}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item label="手续费类型" :labelCol="{lg: {span: 8}, sm: {span: 7}}" :wrapperCol="{lg: {span: 16}, sm: {span: 17} }">
                <a-select
                  v-decorator="[
                    'commissionFeeType',
                    {
                      rules: [
                        { required: true, message: '请选择手续费类型' },
                      ],
                    },
                  ]"
                  @change="commissionFeeTypeChange"
                  placeholder="请选择"
                >
                  <a-select-option :value="item" v-for="(item,index) in commonList.commissionFeeTypes" :key="index">
                    {{item}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24">
              <a-form-item label="手续费" :labelCol="{lg: {span: 8}, sm: {span: 7}}" :wrapperCol="{lg: {span: 16}, sm: {span: 17} }">
                <a-input
                  placeholder="请输入手续费"
                  type="number"
                  v-if="isPercent"
                  suffix="%"
                  v-decorator="['commissionFee', {rules: [{ required: true, message: '请输入手续费', whitespace: true}]}]"
                />
                <a-input
                  placeholder="请输入手续费"
                  type="number"
                  v-else
                  v-decorator="['commissionFee', {rules: [{ required: true, message: '请输入手续费', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <h3>货币类型设置</h3>
        <a-divider class="no-mg" />
        <table class="tbl" cellpadding='0' cellspacing='0'>
          <tr>
            <td>支持货币类型</td>
            <td>最小金额</td>
            <td>最大金额</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in coinTypeList" :key="index">
            <td>
              <a-select placeholder="请选择货币类型" v-model="item.sourceCurrency" style="width:200px">
                <a-select-option :value="item" v-for="(item,index) in commonList.currencies" :key="index">
                  {{item}}
                </a-select-option>
              </a-select>
            </td>
            <td>
              <a-input type='number' placeholder="请输入最小金额" v-model="item.minTransactionAmount" style="width:200px"></a-input>
            </td>
            <td>
              <a-input type='number' placeholder="请输入最大金额" v-model="item.maxTransactionAmount" style="width:200px"></a-input>
            </td>
            <td style="width:103px">
              <a-button type="dashed" icon="delete" shape="circle" style="margin-right:10px" @click="delCoinType(index)" v-show="coinTypeList.length>1"></a-button>
              <a-button type="primary" icon="plus" shape="circle" @click="addCoinType" v-show="index===coinTypeList.length-1"></a-button>
            </td>
          </tr>
        </table>
        <h3>通道金额超限设置</h3>
        <a-divider class="no-mg" />
        <table class="tbl" cellpadding='0' cellspacing='0'>
          <tr>
            <td>Alarm Level</td>
            <td>Alarm Balance</td>
            <td></td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in balanceAlarmList" :key="index">
            <td>
              <a-select placeholder="请选择" v-model="item.name" style="width:200px">
                <a-select-option :value="item.name" v-for="(item,index) in commonList.balanceAlarmColors" :key="index">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </td>
            <td>
              <a-input type='number' v-model="item.alarmAmount" placeholder="请输入超限金额" style="width:200px"></a-input>
            </td>
            <td><div style="width:200px"></div></td>
            <td style="width:103px">
              <a-button type="dashed" icon="delete" shape="circle" style="margin-right:10px" @click="delBalance(index)" v-show="balanceAlarmList.length>1"></a-button>
              <a-button type="primary" icon="plus" shape="circle" @click="addBalance" v-show="index===balanceAlarmList.length-1"></a-button>
            </td>
          </tr>
        </table>
        <h3>入金金额限制</h3>
        <a-divider class="no-mg" />
        <table class="tbl" cellpadding='0' cellspacing='0'>
          <tr>
            <td>Hourly limit</td>
            <td>Daily limit</td>
            <td>One-time limit</td>
            <td></td>
          </tr>
          <tr>
            <td>
              <a-input type='number' v-model="detailInfo.hourCreditedLimit" placeholder="请输入金额限制" style="width:200px"></a-input>
            </td>
            <td>
              <a-input type='number' v-model="detailInfo.dayCreditedLimit" placeholder="请输入金额限制" style="width:200px"></a-input>
            </td>
            <td>
              <a-input type='number' v-model="detailInfo.transactionCreditedLimit" placeholder="请输入金额限制" style="width:200px"></a-input>
            </td>
            <td><div style="width:80px"></div></td>
          </tr>
          <tr>
            <td>Hourly limit per person</td>
            <td>Daily limit per person</td>
            <td>One-time limit per person</td>
            <td></td>
          </tr>
          <tr>
            <td>
              <a-input type='number' v-model="detailInfo.hourCreditedLimitUser" placeholder="请输入金额限制" style="width:200px"></a-input>
            </td>
            <td>
              <a-input type='number' v-model="detailInfo.dayCreditedLimitUser" placeholder="请输入金额限制" style="width:200px"></a-input>
            </td>
            <td>
              <a-input type='number' v-model="detailInfo.transactionCreditedLimitUser" placeholder="请输入金额限制" style="width:200px"></a-input>
            </td>
            <td><div style="width:80px"></div></td>
          </tr>
        </table>
        <h3>排序分数设置</h3>
        <a-divider class="no-mg" />
        <table class="tbl" cellpadding='0' cellspacing='0'>
          <tr>
            <td>超限分数（负数）</td>
            <td>手续费分数</td>
            <td>体验分数</td>
            <td></td>
          </tr>
          <tr>
            <td>
              <a-input type='number' v-model="detailInfo.overBalanceScore" placeholder="请输入超限分数" style="width:200px"></a-input>
            </td>
            <td>
              <a-input type='number' v-model="detailInfo.commissionFeeScore" placeholder="请输入手续费分数" style="width:200px"></a-input>
            </td>
            <td>
              <a-input type='number' v-model="detailInfo.userExperienceScore" placeholder="请输入体验分数" style="width:200px"></a-input>
            </td>
            <td><div style="width:80px"></div></td>
          </tr>
        </table>
        <h3>定时任务</h3>
        <a-divider class="no-mg" />
        <table class="tbl" cellpadding='0' cellspacing='0'>
          <tr>
            <td>公式</td>
            <td>动作</td>
            <td>Note</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in jobList" :key="index">
            <td>
              <a-input type='text' v-model="item.jobCron" placeholder="格式为：4 * * * ？ *" style="width:200px"></a-input>
            </td>
            <td>
              <a-select placeholder="请选择" v-model="item.jobActionType" style="width:200px">
                <a-select-option value="Enable">
                  打开通道
                </a-select-option>
                <a-select-option value="Disable">
                  关闭通道
                </a-select-option>
              </a-select>
            </td>
            <td><a-input type='text' v-model="item.jobNote" placeholder="请输入备注" style="width:200px"></a-input></td>
            <td style="width:103px">
              <a-button type="dashed" icon="delete" shape="circle" style="margin-right:10px" @click="delTimeoutRask(index)" v-show="jobList.length>1"></a-button>
              <a-button type="primary" icon="plus" shape="circle" @click="addTimeoutRask" v-show="index===jobList.length-1"></a-button>
            </td>
          </tr>
        </table>
        <a-divider class="no-mg" />
        <div class="operation-footer">
          <div>
            <a-checkbox v-model="blackListEnabled">
              Blacklist Enabled
            </a-checkbox>
            <a-upload
              name="file"
              :multiple="true"
              :headers="headers"
              :data="uploadBlackParams"
              :customRequest="handleChangeBlackImport"
              accept=".xls,.xlsx"
            >
              <a-button type="primary" class="ml" :loading="blackListUpload">Import</a-button>
            </a-upload>
            <!-- <a-button type="primary" class="ml" :disabled="blackListImportEnabled">Import</a-button> -->
            <a-button type="primary" class="ml" @click="blackListDownload('-blacklist-(Black)')">Download</a-button>
          </div>
          <div>
            <a-checkbox v-model="whiteListEnabled">
              Whitelist Enabled
            </a-checkbox>
            <a-upload
              name="file"
              :multiple="true"
              :headers="headers"
              :data="uploadWhiteParams"
              :customRequest="handleChangeWhiteImport"
              accept=".xls,.xlsx"
            >
              <a-button type="primary" class="ml" :loading="whiteListUpload">Import</a-button>
            </a-upload>
            <a-button type="primary" class="ml" @click="whiteListDownload('-blacklist-(White)')">Download</a-button>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  paymentList,
  getPaymentCommons,
  paymentListDetail,
  paymentListUpdate,
  blacklistDownload,
  blacklistImport
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
          title: '通道',
          align: 'center',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '显示名称',
          align: 'center',
          dataIndex: 'showName'
        },
        {
          title: '生效',
          align: 'center',
          dataIndex: 'enabled'
        },
        {
          title: '通道余额',
          align: 'center',
          dataIndex: 'balance',
          scopedSlots: { customRender: 'balance' },
        },
        {
          title: '排序分数',
          align: 'center',
          dataIndex: 'rankScore',
        },
        {
          title: '支持货币',
          align: 'center',
          dataIndex: 'supportCurrencies',
        },
        {
          title: '支持国家',
          align: 'center',
          dataIndex: 'supportCountries',
          customCell: () => {
            return {
              style: cellStyle
            }
          },
          customRender: (text) => <a-tooltip placement="top" title={text}>{text}</a-tooltip>
        },
        {
          title: '手续费',
          align: 'center',
          dataIndex: 'commissionFee',
        },
        {
          title: '黑/白名单',
          align: 'center',
          dataIndex: 'blacklistType',
        },
        {
          title: '允许通道回调',
          align: 'center',
          dataIndex: 'callbackEnabled',
        },
      ],
      STVColumns: [
        {
          title: 'Channel',
          align: 'center',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Display Name',
          align: 'center',
          dataIndex: 'showName'
        },
        {
          title: 'Support Currencies',
          align: 'center',
          dataIndex: 'supportCurrencies',
        },
        {
          title: 'Support Countries',
          align: 'center',
          dataIndex: 'supportCountries',
          customCell: () => {
            return {
              style: cellStyle
            }
          },
          customRender: (text) => <a-tooltip placement="top" title={text}>{text}</a-tooltip>
        },
        {
          title: 'Commission Type',
          align: 'center',
          dataIndex: 'commissionFeeType',
        },
        {
          title: 'Commission',
          align: 'center',
          dataIndex: 'commissionFee',
        },
        {
          title: 'Enabled',
          align: 'center',
          dataIndex: 'enabled'
        },
        {
          title: 'Enabled Callback',
          align: 'center',
          dataIndex: 'callbackEnabled',
        },
        {
          title: 'Filter Condition',
          align: 'center',
          dataIndex: 'blacklistType',
        },
      ],
      searchForm: {
        regulator: 'ASIC',
        name: undefined,
      },
      loadASICList: [],
      loadSTVList: [],
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
      whiteListEnabled: true,
      blackListImportEnabled: true,
      blackListDownEnabled: true,
      blackListUpload: false,
      whiteListUpload: false,
      headers: {
        authorization: 'authorization-text',
      },
      uploadBlackParams: {
        blacklistType: 'Black',
        paymentGatewayId: ''
      },
      uploadWhiteParams: {
        blacklistType: 'White',
        paymentGatewayId: ''
      },
      uploadUrl: window._CONFIG['domianURL'] + '/admin/payment-gateway/blacklist/import',
      commonList: null,
      detailInfo: null,
      currentTag: '1',
      tableLoading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 10
      },
      jobList: [
        {
          jobCron: '',
          jobNote: '',
          jobActionType: undefined
        }
      ],
      isPercent: false,
      remarkList: []
    };
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
          window.navigator.msSaveBlob(new Blob([data]), this.record.name+fileName+'.xls')
        }else{
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', this.record.name+fileName+'.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) //下载完成移除元素
          window.URL.revokeObjectURL(url) //释放掉blob对象
        }
      })
    },
    // 白名单下载
    whiteListDownload (fileName) {
      if(!fileName || typeof fileName != "string"){
        fileName = "导出文件"
      }
      let param = {
        blacklistType: 'White',
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
          window.navigator.msSaveBlob(new Blob([data]), this.record.name+fileName+'.xls')
        }else{
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', this.record.name+fileName+'.xls')
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
    handleChangeWhiteImport(info) {
      const formData = new FormData()
      formData.append('file',info.file,info.file.name)
      formData.append('blacklistType',this.uploadWhiteParams.blacklistType)
      formData.append('paymentGatewayId',this.record.id)
      blacklistImport(formData).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 新增通道金额超限设置
    addBalance () {
      this.balanceAlarmList.push({
        name: undefined,
        alarmAmount: ''
      })
    },
    // 删除通道金额超限设置
    delBalance (index) {
      this.balanceAlarmList.splice(index, 1)
    },
    // 新增货币类型
    addCoinType () {
      this.coinTypeList.push({
        sourceCurrency: undefined,
        minTransactionAmount: '',
        maxTransactionAmount: '',
      })
    },
    // 删除货币类型
    delCoinType (index) {
      this.coinTypeList.splice(index, 1)
    },
    // 新增定时任务
    addTimeoutRask () {
      this.jobList.push({
        jobActionType: undefined,
        jobCron: '',
        jobNote: '',
      })
    },
    // 删除定时任务
    delTimeoutRask (index) {
      this.jobList.splice(index, 1)
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
    // 切换tag
    changeTag(key) {
      this.pagination.current = 1
      this.currentTag = key
      this.searchForm.name = undefined
      if (this.currentTag == '1') {
        this.searchForm.regulator = 'ASIC'
      } else {
        this.searchForm.regulator = 'St. Vincent'
      }
      this.getASICData(this.searchForm)
    },
    // 分页查询
    handleTableChange (pagination) {
      this.pagination.current = pagination.current
      if (this.searchForm.regulator==='ASIC') {
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
        this.loadSTVList = []
        let current = (this.pagination.current-1)*10
        if (this.pagination.total%this.pagination.pageSize<(this.pagination.total-current)) {
          for (let i=current;i<current+10;i++) {
            this.loadSTVList.push(this.remarkList[i])
          }
        } else {
          for (let i=current;i<current+this.pagination.total%this.pagination.pageSize;i++) {
            this.loadSTVList.push(this.remarkList[i])
          }
        }
      }
    },
    // 条件查询
    handleToSearchEnterprise (type) {
      this.pagination.current = 1
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
              this.pagination.total = this.loadASICList.length
              this.remarkList = JSON.parse(JSON.stringify(this.loadASICList))
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
              this.loadASICList.forEach(item => {
                if(item.commissionFeeType==='Percent') {
                  item.commissionFee = getPointNumber(item.commissionFee * 100,0) + '%'
                }
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
        this.searchForm.regulator = 'St. Vincent'
        if (this.searchForm.name) {
          this.tableLoading = true
          paymentList(this.searchForm).then(res => {
            this.tableLoading = false
            if (res.code===200) {
              this.loadSTVList = res.data
              this.loadSTVList = this.loadSTVList.filter(value => {
                return value.name===this.searchForm.name
              })
              this.pagination.total = this.loadSTVList.length
              this.remarkList = JSON.parse(JSON.stringify(this.loadSTVList))
              this.loadSTVList = []
              let current = (this.pagination.current-1)*10
              if (this.pagination.total%this.pagination.pageSize<(this.pagination.total-current)) {
                for (let i=current;i<current+10;i++) {
                  this.loadSTVList.push(this.remarkList[i])
                }
              } else {
                for (let i=current;i<current+this.pagination.total%this.pagination.pageSize;i++) {
                  this.loadSTVList.push(this.remarkList[i])
                }
              }
              this.loadSTVList.forEach(item => {
                if(item.commissionFeeType==='Percent') {
                  item.commissionFee = getPointNumber(item.commissionFee * 100,0) + '%'
                }
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
        this.pagination.current = 1
        this.getASICData(this.searchForm)
      } else {
        this.searchForm = {
          regulator: 'St. Vincent',
          name: undefined,
        },
        this.pagination.current = 1
        this.getASICData(this.searchForm)
      }
    },
    // 加载数据
    getASICData(params) {
      this.tableLoading = true
      paymentList(params).then(res => {
        this.tableLoading = false
        if (res.code===200 && this.currentTag==='1') {
          this.pagination.total = res.data.length
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
          this.loadASICList.forEach(item => {
            if(item.commissionFeeType==='Percent') {
              item.commissionFee = getPointNumber(item.commissionFee * 100,0) + '%'
            }
          })
        } else if (res.code===200 && this.currentTag==='2') {
          this.pagination.total = res.data.length
          this.remarkList = JSON.parse(JSON.stringify(res.data))
          this.loadSTVList = []
          let current = (this.pagination.current-1)*10
          if (this.pagination.total%this.pagination.pageSize<(this.pagination.total-current)) {
            for (let i=current;i<current+10;i++) {
              this.loadSTVList.push(this.remarkList[i])
            }
          } else {
            for (let i=current;i<current+this.pagination.total%this.pagination.pageSize;i++) {
              this.loadSTVList.push(this.remarkList[i])
            }
          }
          this.loadSTVList.forEach(item => {
            if(item.commissionFeeType==='Percent') {
              item.commissionFee = getPointNumber(item.commissionFee * 100,0) + '%'
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取详情
    getDetail (params) {
      paymentListDetail(params).then(res => {
        if (res.code === 200) {
          let initJoblist = [{
            jobNote: '',
            jobCron: '',
            jobActionType: undefined
          }]
          this.detailInfo = res.data
          this.detailInfo.enabled = this.detailInfo.enabled === "Yes" ? true : false
          this.detailInfo.callbackEnabled = this.detailInfo.callbackEnabled === "Yes" ? true : false
          this.detailInfo.commissionFee = this.detailInfo.commissionFeeType === 'Percent' ? this.detailInfo.commissionFee*100 + '' : this.detailInfo.commissionFee + ''
          this.isPercent = this.detailInfo.commissionFeeType === 'Percent' ? true : false
          this.coinTypeList = this.detailInfo.depositCurrencyList
          this.balanceAlarmList = this.detailInfo.balanceAlarmList
          this.jobList = this.detailInfo.jobList&&this.detailInfo.jobList.length>0?this.detailInfo.jobList:initJoblist
          this.blackListEnabled = this.detailInfo.blacklistType === 'Black' ? true : this.detailInfo.blacklistType === 'Black,White' ? true : false
          this.whiteListEnabled = this.detailInfo.blacklistType === 'White' ? true : this.detailInfo.blacklistType === 'Black,White' ? true : false
          setTimeout(() => {
            this.createForm.setFieldsValue({
              showName: this.detailInfo.showName,
              supportCountries: this.detailInfo.supportCountries.split(','),
              commissionFeeType: this.detailInfo.commissionFeeType,
              commissionFee: this.detailInfo.commissionFee,
            })
          },0)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 手续费类型变更
    commissionFeeTypeChange (value) {
      this.isPercent = value === 'Percent' ? true : false
    },
    // 通道配置
    dialog (record) {
      this.uploadBlackParams.paymentGatewayId = record.id
      this.uploadWhiteParams.paymentGatewayId = record.id
      this.record = record
      this.getDetail(record.id)
      this.title = record.name
      this.visibleASIC = true
    },
    // 确认更新通道配置
    handleOkASIC () {
      let coinType = true
      let balanceType = true
      let jobType = true
      this.coinTypeList.forEach(item => {
        if (item.sourceCurrency===undefined || item.minTransactionAmount==='' || item.maxTransactionAmount==='') {
          this.$message.error('货币类型设置中数据不能为空')
          coinType = false
          return
        }
      })
      if (!coinType) {
        return
      }
      this.balanceAlarmList.forEach(item => {
        if (item.name===undefined || item.alarmAmount==='') {
          this.$message.error('通道金额超限设置中数据不能为空')
          balanceType = false
          return
        }
      })
      if (!balanceType) {
        return
      }
      // this.jobList.forEach(item => {
        //   if (item.jobActionType===undefined || item.jobCron==='') {
        //     this.$message.error('定时任务中数据不能为空')
        //     jobType = false
        //     return
        //   }
        // })
        // if (!jobType) {
        //   return
      // }
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
      requestParams.jobList = this.jobList
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
              this.getASICData({regulator: 'St. Vincent'})
              this.handleCancelASIC()
            } else {
              this.confirmLoadingASIC = false
              this.$message.error(res.msg)
            }
          })
        }
      });
    },
    // 取消通用配置更新
    handleCancelASIC () {
      this.confirmLoadingASIC = false
      this.visibleASIC = false
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
  height: 680px;
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
</style>
<style>
.operation-footer .ant-upload-list{
  display: none !important;
}
</style>