<template>
  <div  v-loading="sc" element-loading-text="上传中">
    <div>
      <el-collapse class="sstj" v-model="activeNames">
        <el-collapse-item>
          <span class="sstitle" slot="title">
            搜索条件  家装全部工单
            <!--            <i class="header-icon el-icon-info"></i>-->
          </span>
          <el-form @keyup.enter.native="fromShow" ref="from" :inline="true" :model="from" class="demo-form-inline">
            <el-form-item style="display: block">
              <div class="buttonDiv">
                <el-button class="mrr"  :loading="allocationLoading" @click="distribution " size="small" type="success">分配数据</el-button>

                <el-button class="mrr" :loading="recoverLoading" size="small" @click="manualRecycling" type="primary">手动回收</el-button>
                <el-button class="mrr"  size="small" @click="exportFile" type="success">导出数据</el-button>
                <el-button class="mrr"  :loading="lostLoading" size="small" @click="activation" type="danger">战败激活</el-button>
<!--                <el-button class="mrr" size="small" @click="autoCallList" type="success">添加自动外呼数据</el-button>-->

                <!--              <el-button size="small" @click="fromShow" type="primary" icon="el-icon-search">搜索</el-button>-->
                <!--              <el-button size="small" @click="fromClear('from')" type="info">清空<i class="el-icon-delete el-icon&#45;&#45;right"></i></el-button>-->
                <!--      <el-button type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
                <!--                  <el-button size="small" type="primary">获取处理结果</el-button>-->

                <el-button class="mrr" size="small" @click="dialogDescribe2 = true" type="success">上传数据</el-button>

<!--                              <el-upload-->
<!--                                class="upload-demo mrr"-->
<!--                                :action="this.baseURL + '/jz/admin/readdata'"-->
<!--                                :headers="headers"-->
<!--                                :show-file-list="false"-->
<!--                                name="file"-->
<!--                                accept =".xls"-->
<!--                                :on-progress="progress"-->
<!--                                :on-error="err"-->
<!--                                :on-success="handleChange"-->
<!--                                :file-list="fileList">-->
<!--                                <el-button size="small" type="primary">上传数据</el-button>-->
<!--                              </el-upload>-->


                <!--                  <el-button size="small" @click="xz" type="primary">下载</el-button>-->
                <!--              <el-upload-->
                <!--                class="upload-demo mrr"-->
                <!--                :action="this.baseURL + '/jz/admin/exceltransferolddata'"-->
                <!--                :headers="headers"-->
                <!--                :show-file-list="false"-->
                <!--                name="file"-->
                <!--                accept =".xls"-->
                <!--                :on-progress="progress"-->
                <!--                :on-error="err"-->
                <!--                :on-success="handleChange"-->
                <!--                :file-list="fileList">-->
                <!--                <el-button size="small" type="primary">上传老数据</el-button>-->
                <!--              </el-upload>-->
              </div>
            </el-form-item><!-- 提交按钮 -->
            <el-form-item prop="day">
              <el-date-picker
                @change="time"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                class="shou"
                :editable='false'
                v-model="from.day"
                type="datetimerange"
                range-separator="~"
                start-placeholder="操作开始时间"
                end-placeholder="操作结束时间">
              </el-date-picker><!-- 开始结束时间 -->
            </el-form-item><!-- 操作开始结束时间 -->
            <el-form-item prop="day2">
              <el-date-picker
                @change="time2"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                class="shou"
                :editable='false'
                v-model="from.day2"
                type="datetimerange"
                range-separator="~"
                start-placeholder="创建开始时间"
                end-placeholder="创建结束时间">
              </el-date-picker><!-- 开始结束时间 -->
            </el-form-item><!-- 创建开始结束时间 -->
            <el-form-item prop="guid">
              <el-input
                size="small"
                placeholder="数据编号"
                v-model="from.guid">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 数据编号 -->
            <el-form-item prop="jobNumber">
              <el-input
                size="small"
                placeholder="工号"
                v-model="from.jobNumber">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 工号 -->
            <el-form-item prop="status">
              <el-cascader
                size="mini"
                @change="stateSwitching2"
                placeholder="业务状态"
                v-model="from.status"
                :options="options4"
                :props="{ expandTrigger: 'click' ,checkStrictly: true }"
              ></el-cascader>
              <!--            <el-cascader-->
              <!--              placeholder="工单状态"-->
              <!--              v-model="value"-->
              <!--              :options="options"-->
              <!--              :props="{ expandTrigger: 'hover' }"-->
              <!--              @change="handle"></el-cascader>-->
              <!--            <el-select v-model="from.status" placeholder="工单状态">-->
              <!--              <el-option label="空" value="空"></el-option>-->
              <!--              <el-option label="无人接听" value="无人接听"></el-option>-->
              <!--              <el-option label="关机" value="关机"></el-option>-->
              <!--              <el-option label="停机" value="停机"></el-option>-->
              <!--              <el-option label="无法接通" value="无法接通"></el-option>-->
              <!--              <el-option label="通话中" value="通话中"></el-option>-->
              <!--              <el-option label="信息有误" value="信息有误"></el-option>-->
              <!--              <el-option label="开场白拒绝" value="开场白拒绝"></el-option>-->
              <!--              <el-option label="拒绝" value="拒绝"></el-option>-->
              <!--              <el-option label="有意加微信通过" value="有意加微信通过"></el-option>-->
              <!--              <el-option label="有意加微信未通过" value="有意加微信未通过"></el-option>-->
              <!--              <el-option label="已下单" value="已下单"></el-option>-->
              <!--              <el-option label="年龄不符" value="年龄不符"></el-option>-->
              <!--              <el-option label="空号" value="空号"></el-option>-->
              <!--              <el-option label="再联系" value="再联系"></el-option>-->
              <!--            </el-select>-->
            </el-form-item><!-- 工单状态 -->
            <el-form-item prop="call">
              <!--            <el-cascader-->
              <!--              size="mini"-->
              <!--              @change="stateSwitching2"-->
              <!--              placeholder="业务状态"-->
              <!--              v-model="from.status"-->
              <!--              :options="options4"-->
              <!--              :props="{ expandTrigger: 'click' ,checkStrictly: true }"-->
              <!--            ></el-cascader>-->
              <el-cascader
                size="mini"
                @change="stateSwitching1"
                placeholder="接通状态"
                v-model="from.call"
                :options="options"
                :props="{ expandTrigger: 'hover',checkStrictly: true }"
              ></el-cascader>
            </el-form-item><!-- 接通状态 -->
            <el-form-item prop="intentionality">
              <el-select v-model="from.intentionality" placeholder="意向度">
                <el-option label="强" value='强'></el-option>
                <el-option label="中" value='中'></el-option>
                <el-option label="弱" value='弱'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="name">
              <el-input
                size="small"
                placeholder="联系人"
                v-model="from.name">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 联系人 -->
            <el-form-item prop="phone">
              <el-input
                size="small"
                placeholder="联系电话"
                v-model="from.phone">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 联系电话 -->
            <el-form-item prop="sex">
              <el-input
                size="small"
                placeholder="联系人性别"
                v-model="from.sex">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 联系人性别 -->
            <el-form-item prop="spareName">
              <el-input
                size="small"
                placeholder="备用联系人"
                v-model="from.spareName">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 备用联系人 -->
            <el-form-item prop="sparePhone">
              <el-input
                size="small"
                placeholder="备用联系电话"
                v-model="from.sparePhone">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 备用联系电话 -->
            <el-form-item prop="spareSex">
              <el-input
                size="small"
                placeholder="备用联系人性别"
                v-model="from.spareSex">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 备用联系人性别 -->



            <el-form-item prop="province">
              <el-input
                size="small"
                placeholder="省份"
                v-model="from.province">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 省份 -->
            <el-form-item prop="city">
              <el-input
                size="small"
                placeholder="城市"
                v-model="from.city">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 城市 -->
            <el-form-item prop="region">
              <el-input
                size="small"
                placeholder="区域"
                v-model="from.region">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 区域 -->
            <el-form-item prop="callNum">
              <el-input
                size="small"
                placeholder="拨打次数"
                v-model="from.callNum">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 拨打次数 -->
            <el-form-item prop="seatNote">
              <el-input
                size="small"
                placeholder="备注"
                v-model="from.seatNote">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 备注 -->
            <el-form-item prop="batchNum">
              <el-input
                size="small"
                placeholder="批次号"
                v-model="from.batchNum">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 批次号 -->

            <el-form-item prop="sourceChannel">
              <el-input
                size="small"
                placeholder="来源渠道"
                v-model="from.sourceChannel">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item><!-- 来源渠道 -->
            <el-form-item>
              <div class="buttonDiv">
                <el-button style="margin-right: 10px;" size="small" @click="fromShow" type="primary" icon="el-icon-search">搜索</el-button>
                <el-button size="small" @click="fromClear('from')" type="info">清空<i class="el-icon-delete el-icon--right"></i></el-button>
                <!--      <el-button type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
                <!--              <el-button size="small" @click="shanchu" type="danger">删除所选</el-button>-->
                <!--              &lt;!&ndash;                  <el-button size="small" type="primary">获取处理结果</el-button>&ndash;&gt;-->
                <!--              <el-button size="small" @click="exportFile" type="success">导出数据</el-button>-->
                <!--              <el-upload-->
                <!--                style="display: inline-block;margin-left: 10px"-->
                <!--                class="upload-demo"-->
                <!--                action="http://192.168.2.127:9090/jz/admin/readdata"-->
                <!--                :headers="headers"-->
                <!--                :show-file-list="false"-->
                <!--                name="file"-->
                <!--                accept =".xls"-->
                <!--                :on-progress="progress"-->
                <!--                :on-error="err"-->
                <!--                :on-success="handleChange"-->
                <!--                :file-list="fileList">-->
                <!--                <el-button size="small" type="primary">点击上传</el-button>-->
                <!--              </el-upload>-->
                <!--              <el-button style="margin-left: 10px" @click="distribution " size="small" type="success">分配数据</el-button>-->
                <!--                  <el-button size="small" @click="xz" type="primary">下载</el-button>-->
              </div>
            </el-form-item><!-- 提交按钮 -->
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="gdt">
      <div class="table" v-loading="loading">
        <el-table
          height="calc(100vh - 120px)"
          size="mini"
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            header-align="center"
            align="center"
            type="selection"
            width="38">
          </el-table-column>
          <!--          操作记录-->
          <el-table-column
            min-width="150"
            header-align="center"
            align="center"
            prop="address"
            label="操作记录"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button style="margin-right: 10px;" @click="record(scope.row)" type="primary"
                         size="mini">查看
              </el-button>
              <el-button @click="editor(scope.row)" type="primary"
                         size="mini">编辑
              </el-button>
            </template>
          </el-table-column>
          <!--          数据编号-->
          <el-table-column
            class="ycbt"
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="guid"
            label="数据编号"
            min-width="70">
          </el-table-column>
          <!--          创建时间-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            label="创建时间"
            min-width="140">
            <template slot-scope="scope">{{ scope.row.createTime }}</template>
          </el-table-column>
          <!--          操作时间-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            label="操作时间"
            min-width="140">
            <template slot-scope="scope">{{ scope.row.operateTime }}</template>
          </el-table-column>
          <!--          需跟进时间-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            label="需跟进时间"
            min-width="140">
            <template slot-scope="scope">{{ scope.row.followUpTime }}</template>
          </el-table-column>
          <!--          坐席-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="jobNumber"
            label="坐席"
            min-width="90">
          </el-table-column>
          <!--          流转坐席-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="flowJobNumber"
            label="流转坐席"
            min-width="90">
          </el-table-column>
          <!--          接通状态-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="status"
            label="接通状态"
            min-width="90">
          </el-table-column>
          <!--          拨打次数-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="callNum"
            label="拨打次数"
            min-width="70">
          </el-table-column>
          <!--          业务状态-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="businessStatus"
            label="业务状态"
            min-width="80">
          </el-table-column>
          <!--          意向度-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="intentionality"
            label="意向度"
            min-width="80">
          </el-table-column>
          <!--          联系人-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="name"
            label="联系人"
            min-width="60">
          </el-table-column>
          <!--          联系电话-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="phone"
            label="联系电话"
            min-width="100">
          </el-table-column>
          <!--          备注-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="seatNote"
            label="备注"
            min-width="100">
          </el-table-column>
          <!--          性别-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="sex"
            label="性别"
            min-width="50">
          </el-table-column>
          <!--          备用联系人-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="spareName"
            label="备用联系人"
            min-width="100">
          </el-table-column>
          <!--          备用联系人电话-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="sparePhone"
            label="备用联系人电话"
            min-width="120">
          </el-table-column>
          <!--          备用联系人性别-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="spareSex"
            label="备用联系人性别"
            min-width="120">
          </el-table-column>
          <!--          省份-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="province"
            label="省份"
            min-width="60">
          </el-table-column>
          <!--          城市-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="city"
            label="城市"
            min-width="60">
          </el-table-column>
          <!--          区域-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="region"
            label="区域"
            min-width="60">
          </el-table-column>
          <!--          家庭住址-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="address"
            label="家庭住址"
            min-width="95">
          </el-table-column>
          <!--          来源渠道-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            prop="sourceChannel"
            label="来源渠道"
            min-width="70">
          </el-table-column>
          <!--          批次号-->
          <el-table-column
            :show-overflow-tooltip="true"
            header-align="center"
            prop="batchNum"
            label="批次号"
            min-width="140">
          </el-table-column>
          <!--          <el-table-column-->
          <!--            :show-overflow-tooltip="true"-->
          <!--            header-align="center"-->
          <!--            prop="lastContactTime"-->
          <!--            label="最后联系时间"-->
          <!--            min-width="110">-->
          <!--          </el-table-column>-->

          <!--          <el-table-column :show-overflow-tooltip="true" header-align="center" prop="queryResultInvite" min-width="120">-->
          <!--            <template slot="header" slot-scope="scope">-->
          <!--              &lt;!&ndash;                <el-tooltip class="item" effect="dark" content="天天拍车邀约结果" placement="left">&ndash;&gt;-->
          <!--              <span class="spot">天天拍车邀约结果</span>-->
          <!--              &lt;!&ndash;                </el-tooltip>&ndash;&gt;-->
          <!--            </template>-->
          <!--          </el-table-column>-->

          <!--          <el-table-column-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--            prop="address"-->
          <!--            label="查看报名结果"-->
          <!--            current-row-key="31313513"-->
          <!--            min-width="100"-->
          <!--            show-overflow-tooltip>-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button type="primary" @click="handleEdit(scope.row)"-->
          <!--                         size="mini">查看-->
          <!--              </el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
      </div>
      <div class="fywDiv">
        <div class="block">
          <!--        <span class="demonstration">显示总数</span>-->
          <!--         分页   -->
          <el-pagination
            background
            :pager-count="5"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="from.current"
            :page-sizes="[50,100, 200, 300, 400]"
            layout="sizes,total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 分配工单 -->
    <el-dialog
      v-loading="dlgLoading"
      title="分配工单"
      :visible.sync="dialog"
      width="60%">


      <div>
        <el-select v-model="oneZx" placeholder="请选择">
          <el-option
            v-for="item in optionsZx"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-switch
          style="margin-left: 20px;"
          v-model="readable"
          active-color="#13ce66"
          active-text="查看操作记录"
          inactive-text="">
        </el-switch>
        <!--        <el-switch-->
        <!--          v-model="cccc"-->
        <!--          active-color="#13ce66"-->
        <!--          inactive-color="#ff4949">-->
        <!--        </el-switch>-->
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="choiceZx">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 操作记录 -->
    <el-dialog title="操作记录" :visible.sync="recordDialog">
      <div class="dlgjl">
        <div v-for="a in this.recordLog">
          <span>{{a.detail}}</span><br>
          <!--          <div v-if="a.audio">asdasdad</div>-->
          <audio v-if="a.audio" style="outline: none;height: 25px;" controls="controls" :src="a.soundUrl">
          </audio>
          <!--        <span>{{a.soundUrl}}</span>-->
        </div>
      </div>
    </el-dialog>

    <!--  全部工单  -->
    <el-dialog custom-class="dialogbig" title="全部工单" :visible.sync="allWorkDialog">
      <div style="width: 100%; height: 80vh;overflow: auto">
        <div class="allHeart">
          <div style="background: rgb(245,245,245)">
            <div class="flex" style="width: 100%;">
              <div style="width:75%;">
                <div>
                  <el-steps simple style="width:100%;font-size: 12px" space="10" :active="active" finish-status="success">
                    <el-step title="任务创建"></el-step>
                    <el-step title="首次跟进"></el-step>
                    <el-step title="跟进中"></el-step>
                    <el-step title="已添加微信"></el-step>
                    <el-step title="成功下单"></el-step>
                  </el-steps>
                </div>
                <div class="right-s" style="width:100%; border-bottom: 1px #666 solid;background: rgba(245,245,245,0.5)">
                  <!--              <div class="right-sd"><span :title="this.onedata.guid">客户等级：</span><span>{{this.onedata.guid}}</span></div>-->
                  <div class="right-sd"><span :title="this.onedata.guid">数据编号：</span><span>{{this.onedata.guid}}</span></div>
                  <!--              <div class="right-sd"><span :title="this.onedata.phone">手机号码：</span><span>{{this.onedata.phone}}</span></div>-->
                  <div class="right-sd"><span :title="this.onedata.sourceChannel">来源渠道：</span><span>{{this.onedata.sourceChannel}}</span></div>
                  <!--              <div class="right-sd"><span title="I-8">XXXX：</span><span>XXXX</span></div>-->
                  <div class="right-sd"><span :title="this.onedata.phone">联系方式：</span><span>{{this.onedata.phone}}</span></div>
                  <div class="right-sd"><span :title="this.onedata.addressOfNumber">号码归属地：</span><span>{{this.onedata.addressOfNumber}}</span></div>
                  <!--              <div class="right-sd"><span title="天津和凌">XXXX：</span><span>XXXX</span></div>-->
                </div>
              </div>
              <div class="zux" style="width: 25%;">
                <div><span style="font-weight: 900;margin-bottom: 5px;">成功下单量排名:</span></div>
                <div><span>第一名 : {{this.first.seatName}}  </span><span>成功下单 : {{this.first.successAmount}}单</span></div>
                <div><span>第二名 : {{this.second?this.second.seatName:'无'}}  </span><span>成功下单 : {{this.second?this.second.successAmount:'0'}}单</span></div>
                <div><span>第三名 : {{this.third?this.third.seatName:'无'}}  </span><span>成功下单 : {{this.third?this.third.successAmount:'0'}}单</span></div>
                <div><div style="margin-right: 10px;">本&nbsp;&nbsp;&nbsp;人 : </div>成功下单 : {{this.own.successAmount}}单</div>
              </div>
            </div>
          </div>

          <div class="right-d">
            <div class="right-w1 jbkxg wb" style="border-right: none">
              <!--          <p>客户基础信息</p>-->
              <div>
                <el-form class="tablewb" :label-position="titleLeft" :inline="true" size="mini" ref="form" :model="form" label-width="100%">
                  <el-form-item style="width: 20%;" label="工号">
                    <el-select v-model="form.jobNumber" placeholder="工号">
                      <el-option
                        v-for="item in optionsZx"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>

                    <!--                    <el-select v-model="oneZx" placeholder="请选择">-->
                    <!--                      <el-option-->
                    <!--                        v-for="item in optionsZx"-->
                    <!--                        :key="item.value"-->
                    <!--                        :label="item.label"-->
                    <!--                        :value="item.value">-->
                    <!--                      </el-option>-->
                    <!--                    </el-select>-->
                    <!--                    <el-input @change="((val)=>{modify(val,form.guid,'jobNumber')})" placeholder="工号" v-model="form.jobNumber"></el-input>-->
                  </el-form-item>
                  <el-form-item style="width: 20%;" label="姓名">
                    <el-input placeholder="姓名" v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 22%;" label="性别">
                    <!--                style="width:92%"-->
                    <el-select v-model="form.sex" placeholder="性别">
                      <el-option label="男" value='男'></el-option>
                      <el-option label="女" value='女'></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="width: 20%;" label=" ">
                    <el-button :loading="swopLoading" @click="swop" size="mini" type="primary">主备信息交换</el-button>
                  </el-form-item>
                  <br>
                  <el-form-item label-width="120px" style="width: 30%;" label="备用联系人姓名">
                    <el-input placeholder="备用联系人姓名" v-model="form.spareName"></el-input>
                  </el-form-item>
                  <el-form-item label-width="120px" style="width: 30%;" label="备用联系方式">
                    <el-input placeholder="备用联系方式" v-model="form.sparePhone"></el-input>
                  </el-form-item>

                  <el-form-item label-width="120px" style="width: 30%;" label="备用联系人性别">
                    <el-select v-model="form.spareSex" placeholder="备用联系人性别">
                      <el-option label="男" value="男"></el-option>
                      <el-option label="女" value="女"></el-option>
                    </el-select>
                    <!--                <el-input placeholder="备用联系人性别" v-model="form.spareSex"></el-input>-->
                  </el-form-item>
                  <br>

                  <!--              <el-form-item style="width: 35%;" label="出生日期">-->
                  <!--                <el-date-picker-->
                  <!--                  v-model="form.birthday"-->
                  <!--                  type="date"-->
                  <!--                  placeholder="出生日期">-->
                  <!--                </el-date-picker>-->
                  <!--                &lt;!&ndash;                <el-input placeholder="出生日期" v-model="form.name"></el-input>&ndash;&gt;-->
                  <!--              </el-form-item>-->
                  <!--              <br>-->

                  <el-form-item style="width: 26%;" label="省份">
                    <el-input placeholder="省份" v-model="form.province"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 26%;" label="城市">
                    <el-input placeholder="城市" v-model="form.city"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 26%;" label="区域">
                    <el-input placeholder="区域" v-model="form.region"></el-input>
                  </el-form-item>
                  <br>
                  <el-form-item style="width: 50%;" label="家庭住址">
                    <el-input
                      style="width: 100%;"
                      type="textarea"
                      :rows="2"
                      resize="none"
                      placeholder="家庭住址"
                      v-model="form.address">
                    </el-input>
                  </el-form-item>
                  <!--                  <el-form-item style="width: 40%;" label="操作时间">-->
                  <!--&lt;!&ndash;                    <el-input&ndash;&gt;-->
                  <!--&lt;!&ndash;                      @change="((val)=>{modify(val,form.guid,'address')})"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      style="width: 100%;"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      type="textarea"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      :rows="2"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      resize="none"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      placeholder="家庭住址"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      v-model="form.address">&ndash;&gt;-->
                  <!--&lt;!&ndash;                    </el-input>&ndash;&gt;-->
                  <!--&lt;!&ndash;                    <el-date-picker&ndash;&gt;-->
                  <!--&lt;!&ndash;                      v-model="value1"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      type="datetime"&ndash;&gt;-->
                  <!--&lt;!&ndash;                      placeholder="选择日期时间">&ndash;&gt;-->
                  <!--&lt;!&ndash;                    </el-date-picker>&ndash;&gt;-->
                  <!--                    <el-date-picker-->
                  <!--                      @change="((val)=>{modify(val,form.guid,'operateTime')})"-->
                  <!--                      value-format="yyyy-MM-dd HH:mm:ss"-->
                  <!--                      size="small"-->
                  <!--                      class="shou"-->
                  <!--                      :editable='false'-->
                  <!--                      v-model="form.operateTime"-->
                  <!--                      type="datetime"-->
                  <!--                      placeholder="操作时间"-->
                  <!--                      >-->
                  <!--                    </el-date-picker>-->
                  <!--                  </el-form-item>-->


                  <!--              <el-form-item style="width: auto;" label="备注">-->
                  <!--                <el-input-->
                  <!--                  style="width: 100%;"-->
                  <!--                  type="textarea"-->
                  <!--                  :rows="2"-->
                  <!--                  resize="none"-->
                  <!--                  placeholder="备注"-->
                  <!--                  v-model="form.seatNote">-->
                  <!--                </el-input>-->
                  <!--              </el-form-item>-->
                  <!--              <el-form-item label="备注">-->

                  <!--              </el-form-item>-->

                  <!--              <el-form-item>-->
                  <!--                <el-button type="primary" @click="onSubmit">提交</el-button>-->
                  <!--&lt;!&ndash;                <el-button>取消</el-button>&ndash;&gt;-->
                  <!--              </el-form-item>-->
                </el-form>
              </div>

            </div>
            <div class="wb xtxxDiv">
              <!--          <h4>填选信息</h4>-->
              <br>
              <div class="mBottom">
                <span class="required">接通状态：</span>
                <el-cascader
                  style="width: calc(100% - 60px);"
                  size="mini"
                  @change="stateSwitchinglog1"
                  placeholder="接通状态"
                  v-model="form.call"
                  :options="options"
                  :props="{ expandTrigger: 'hover'}"
                ></el-cascader>
              </div>
              <div class="mBottom">
                <span style="width: 60px; display: inline-block">意 向 度 ：</span>
                <el-radio-group size="mini" v-model="form.intentionality">
                  <el-radio label="强">强</el-radio>
                  <el-radio label="中">中</el-radio>
                  <el-radio label="弱">弱</el-radio>
                </el-radio-group>
                <el-button style="margin-left: 10px;" @click="clearIntention" size="mini" type="primary">清除</el-button>
              </div>
              <div class="gjsj mBottom">
                <span>跟进时间：</span>
                <span class="statusWidth"><el-date-picker
                  size="mini"
                  v-model="form.followUpTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
            </el-date-picker></span>
                <br>
                <span>上次跟进时间：</span>
                <span>{{this.followUpTime}}</span>
              </div>
              <div class="mBottom">
                <span class="required">添加微信：</span>
                <el-radio v-model="form.addWechat" label="是">是</el-radio>
                <el-radio v-model="form.addWechat" label="否">否</el-radio>
              </div>
              <div class="mBottom">
                <span class="required">业务状态：</span>
                <el-cascader
                  size="mini"
                  style="width: calc(100% - 60px);"
                  @change="stateSwitchinglog2"
                  placeholder="业务状态"
                  v-model="form.Business"
                  :options="options4"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </div>


              <!--          <div class="gjsj mBottom">-->
              <!--            -->
              <!--          </div>-->

              <div class="color mBottom">
                <span>个人标签：</span>
                <span class="statusWidth">
              <el-radio-group @change="colorValue" size="mini" :fill="this.form.personalLabel" v-model="form.personalLabel">
              <el-radio-button label="#00BFFF">蓝</el-radio-button>
              <el-radio-button label="#00FF7F">绿</el-radio-button>
              <el-radio-button label="#D81E06">红</el-radio-button>
              <el-radio-button label="#DA70D6">紫</el-radio-button>
            </el-radio-group>
            </span>
              </div>
              <!--          <div>-->
              <!--            <span>历史备注：</span>-->
              <!--            <el-input-->
              <!--              style="width: 100%;border: none"-->
              <!--              type="textarea"-->
              <!--              :rows="3"-->
              <!--              readonly-->
              <!--              resize="none"-->
              <!--              placeholder="历史备注"-->
              <!--              v-model="form.seatNote">-->
              <!--            </el-input>-->
              <!--          </div>-->
              <div>
                <span>备注：</span>
                <!--            <el-input-->
                <!--              readonly-->
                <!--              style="width: 100%;"-->
                <!--              type="textarea"-->
                <!--              :rows="2"-->
                <!--              resize="none"-->
                <!--              v-model="form.seatNote">-->
                <!--            </el-input>-->
                <div class="history">
              <span v-for="a in pastNote">
                {{a}}<br>
              </span>
                </div>
                <el-input
                  style="width: 100%;"
                  type="textarea"
                  :rows="3"
                  resize="none"
                  placeholder="备注"
                  v-model="form.seatNote">
                </el-input>
              </div>
              <div>

              </div>

            </div>
            <div class="czjlDid">
              <div class="record">
                <span style="font-weight: 900">操作记录：</span><br>
                <p v-for="a in records">
                  {{a.details}}
                </p>
              </div>
              <div class="buttonsDiv">
                <!--                <div class="buttonDiv">-->
                <!--                  &lt;!&ndash;              Telephone2         dphone&ndash;&gt;-->
                <!--                  <el-button :disabled="sfbddh" @click="dphone" size="small" :type="phonezt">{{this.bddh}}-->
                <!--                    <i class="el-icon-phone el-icon&#45;&#45;right"></i>-->
                <!--                  </el-button>-->
                <!--                </div>-->
                <div class="buttonTDiv">
                  <el-button :loading="loadingT" @click="alldata" type="primary">确认修改</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!--    生成新批次填写自动外呼描述-->
    <el-dialog title="自动外呼描述" :visible.sync="dialogDescribe">
      <el-input placeholder="自动外呼描述" v-model="describe"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="describeShow">取 消</el-button>
        <el-button type="primary" @click="describeSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--    上传数据填写自动外呼描述-->
    <el-dialog title="添加描述" :visible.sync="dialogDescribe2">
      <el-input @input="disDisabled" placeholder="添加描述" v-model="describe2"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" style="margin-right: 10px;" @click="describeShow2">取 消</el-button>
        <el-upload
          class="upload-demo mrr"
          :action =" this.baseURL+'/jz/admin/readdata/'+this.describe2"
          :headers="headers"
          :show-file-list="false"
          name="file"
          accept =".xls"
          :on-progress="progress"
          :on-error="err"
          :on-success="handleChange"
          :file-list="fileList">
          <el-button size="small" @click="shutDown" :disabled="describeDisabled" type="primary">上传数据</el-button>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {Message} from "element-ui";

export default {
  name: "index",
  data() {
    return {
      readable:true,//是否查看操作记录
      recordDialog:false,//录音历史记录对话框
      allWorkDialog:false,//全部工单对话框
      dlgLoading:false,//工单分配 选择坐席 加载
      dialog:false,//工单分配 选择坐席 是否弹出
      allocationLoading:false,//分配按钮加载
      lostLoading:false,//战败按钮加载
      recoverLoading:false,//手动回收按钮加载
      baseURL:this.$store.state.baseURL,
      // baseURL:'http://39.102.203.193:9090',
      oneZx:'',
      optionsZx:[],
      sc:false,
      value: [],
      options: [
        {
          value: '成功客户',
          label: '成功客户',
          children: [
            {
              value: '已下单',
              label: '已下单',
            }]
        },{
          value: '未接通',
          label: '未接通',
          children: [
            {
              value: '无人接听',
              label: '无人接听',
            }, {
              value: '关机',
              label: '关机',
            }, {
              value: '通话中',
              label: '通话中',
            }, {
              value: '无法接通',
              label: '无法接通',
            }]
        },{
          value: '无效数据',
          label: '无效数据',
          children: [
            {
              value: '空号',
              label: '空号',
            }, {
              value: '停机',
              label: '停机',
            }, {
              value: '已报核桃编程',
              label: '已报核桃编程',
            }]
        },{
          value: '信息不符',
          label: '信息不符',
          children: [
            {
              value: '年龄不符',
              label: '年龄不符',
            }, {
              value: '无孩子',
              label: '无孩子',
            },]
        },{
          value: '战败数据',
          label: '战败数据',
          children: [
            {
              value: '拒绝',
              label: '拒绝',
            }, {
              value: '无设备',
              label: '无设备',
            },{
              value: '开场白拒绝',
              label: '开场白拒绝',
            },]
        },{
          value: '意向客户',
          label: '意向客户',
          children: [
            {
              value: '有意加微信未通过',
              label: '有意加微信未通过',
            }, {
              value: '有意加微信通过',
              label: '有意加微信通过',
            },{
              value: '再联系',
              label: '再联系',
            },]
        }],//二级选择框
      loading:false,//表格加载
      activeNames: [],//是否显示搜索条件
      from:{
        call: '',//接通状态
        guid: '',//数据编号
        jobNumber:'',//工号
        sourceChannel:'',//来源渠道
        // statusClass:'',//工单状态 一级
        status:[],//工单状态 数组

        day: [],//操作时间数组
        day2: [],//创建时间数组

        size: 50,//个数
        current:1,//页数
        operateTime:'',//操作开始时间
        operateTime2:'',//操作结束时间
        createTime:'',//创建开始时间
        createTime2:'',//创建结束时间
        // allocateTime:'',//分配开始时间
        // allocateTime2:'',//分配结束时间
        name:'',//联系人
        phone: '',//联系电话
        sex:'',//联系人性别
        spareName:'',//备用联系人
        sparePhone:'',//备用联系人号码
        spareSex:'',//备用联系人性别

        // babyName:'',//孩子姓名
        // babySex:'',//孩子性别
        // babyAge:'',//孩子年龄
        // babySchoolAge:'',//孩子学龄
        // babySchool:'',//孩子学校
        // secondBabyName:'',//二宝姓名
        // secondBabySex:'',//二宝性别
        // secondBabyAge:'',//二宝年龄
        // secondBabySchoolAge:'',//二宝学龄
        // secondBabySchool:'',//二宝学校

        province:'',//省份
        city:'',//城市
        region:'',//区域
        businessStatusId:'',//业务状态id
        intentionality:'',//意向度
        statusId:'',//接通状态
        callNum:'',//拨打次数
        seatNote:'',//备注

      },//搜索表单
      headers:{
        // "Content-Type": "multipart/form-data",
        'token': localStorage.token
      },//请求头
      fileList:[],//上传的文件列表
      total:0,//分页总条数
      tableData:[],//表格数据
      multipleSelection: [],//复选框值
      guids:[],
      recordLog:[],//操作记录
      options4:[],//业务状态数据

      //弹窗数据
      optionsBabySchoolAge:[
        {
          value: '小班',
          label: '小班',
        },{
          value: '中班',
          label: '中班',
        },{
          value: '大班',
          label: '大班',
        },{
          value: '一年级',
          label: '一年级',
        },{
          value: '二年级',
          label: '二年级',
        },{
          value: '三年级',
          label: '三年级',
        },{
          value: '四年级',
          label: '四年级',
        },{
          value: '五年级',
          label: '五年级',
        },{
          value: '六年级',
          label: '六年级',
        },
      ],//孩子年级 下拉框
      optionsBabyAge:[
        {
          value: 5,
          label: 5,
        },{
          value: 6,
          label: 6,
        },{
          value: 7,
          label: 7,
        },{
          value: 8,
          label: 8,
        },{
          value: 9,
          label: 9,
        },{
          value: 10,
          label: 10,
        },{
          value: 11,
          label: 11,
        },{
          value: 12,
          label: 12,
        },{
          value: 13,
          label: 13,
        },
      ],//孩子年龄 下拉
      call: '',//接通状态
      onedata:{},//工单详细信息
      form:{
        guid:'',//主键
        jobNumber:'',//工号
        name:'',//家长姓名
        // phone:'',//手机号码
        sex: '' ,//性别
        province:'',//省份
        city:'',//城市
        region:'',//区域
        address:'',//家庭住址
        // babyName:'',//孩子姓名
        // babySex:'',//孩子性别
        // babyAge:'',//孩子年龄
        // babyGrade:'',//孩子年级
        //birthday:'',//出生日期

        followUpTime:'',//需跟进时间
        seatNote: '',//备注
        intentionality:'',//意向度
        addWechat:'',//是否添加微信
        Business:[],//业务状态 四级
        businessStatusId:'',//业务状态 ID
        call: [],//接通状态 两级
        statusId:'',//接通状态 ID
        personalLabel:'',//个人标签

        spareName:'',//备用联系人姓名
        sparePhone:'',//备用联系方式
        spareSex:'',//备用联系人性别
        // babySchoolAge:'',//孩子学龄
        // babySchool:'',//孩子学校
        // secondBabyName:'',//二宝姓名
        // secondBabySex:'',//二宝性别
        // secondBabyAge:'',//二宝年龄
        // secondBabySchoolAge:'',//二宝学龄
        // secondBabySchool:'',//二宝学校
        url:'',//录音链接
        soundGuid:'',//录音ID
        callId:'',//通话记录ID
      },//表单
      followUpTime:'',//跟进时间
      active:0,//步骤条进度
      records:[],//工单状态
      king:[],//排名
      own:{},//自己数量
      first:{},//第一
      second:{},//第二
      third:{},//第三
      colors:'',//选择颜色
      pastNote:[],//历史备注
      titleLeft:'left',
      loadingT:false,//提交按钮加载
      swopLoading:false,//信息交换加载
      dialogDescribe:false,//自动外呼描述 显示
      describe:'',//添加自动外呼描述

      dialogDescribe2:false,//自动外呼描述 显示 上传数据
      describe2:'',//添加自动外呼描述 上传数据
      describeDisabled:true,//上传禁用
    }
  },
  methods:{
    //搜索二级选择器格式转换
    handle(value) {
      console.log(value);
      this.from.statusClass =  value[0]
      this.from.status = value[1]
    },
    //接通状态转换
    stateSwitching1(val){
      console.log(val)
      if(val.length>0){
        this.from.statusId = val[val.length-1]
      }
      // console.log(val[val.length-1])
      // console.log(this.$store.state.baseURL)

      // this.form.status = val[1]
    },
    //操作开始结束时间
    time(val){
      if(val == null){
        val = []
        this.from.operateTime =""
        this.from.operateTime2 = ""
      }else {
        this.from.operateTime = val[0]
        this.from.operateTime2 = val[1]
      }
      console.log(val)
      console.log(this.from)
    },
    //创建开始结束时间
    time2(val){
      if(val == null){
        val = []
        this.from.createTime =""
        this.from.createTime2 = ""
      }else {
        this.from.createTime = val[0]
        this.from.createTime2 = val[1]
      }
      console.log(val)
      console.log(this.from)
    },
    //搜索按钮
    fromShow() {
      console.log(this.from)
      this.dataList(this.from)
    },
    //清空表单
    fromClear(from) {
      this.$refs[from].resetFields()
      this.from.operateTime = ''//操作开始时间
      this.from.operateTime2 = ''//操作结束时间
      this.from.createTime = ''//创建开始时间
      this.from.createTime2 = ''//创建结束时间
      this.value = []
      this.from.businessStatusId =  ''//业务状态
      this.from.status = []
      this.from.call = []
      this.from.statusId = ''//接通状态
    },
    //上传失败
    err(err){
      console.log(err)
      this.sc = false
    },
    // change(a){
    //   console.log(a)
    //   console.log('状态改变')
    // },
    //上传中
    progress(event){
      console.log(event)
      console.log('上传中')
      this.sc = true
    },
    //上传成功钩子
    handleChange(res,file, fileList){
      console.log(res)
      Message({
        message:`上传成功${res.data.success}条,失败${res.data.error}条`,
        type:"success",
        duration:5*1000
      })
      this.sc = false
      // console.log(file, fileList)
      this.dataList(this.from)
      this.describe2 = ''
    },
    //导出数据
    exportFile(){
      this.$confirm('是否确认下载文件', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.from)
        this.loading = true;
        axios({
          method: 'post',
          url: this.baseURL + '/jz/admin/exportalldatabycondition',
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          responseType: "blob",
          data:this.from
        })
          .then(res => {
            this.loading = false;
            console.log(res)
            if (res.data.type) {
              // 文件下载
              let contentDisposition = res.headers['content-disposition'];
              let fileName = window.decodeURI(contentDisposition.substring(contentDisposition.indexOf('=')+1));
              const blob = new Blob([res.data], {
                type: "application/vnd.ms-excel"
              });
              let link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.setAttribute('download', fileName);
              link.click();
              link = null;
              this.$message.success('导出成功');
            } else {
              // 返回json
              this.$message.warning(res.data.msg);
            }
          })
          .catch(err => {
            this.loading = false;
            this.$message.error("下载失败");
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });


    },
    //激活战败
    activation(){ // /jz/admin/defeatactivationbyguidlist
      if(this.guids.length > 0){
        this.lostLoading = true
        axios({
          method: 'post',
          url: this.baseURL + '/jz/admin/defeatactivationbyguidlist',
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          data:this.guids
        }).then(res => {
          this.lostLoading = false
          console.log(res)
          this.$message.success(res.data.message)
          this.dataList(this.from)
        }).catch(err => {
          this.lostLoading = false
          console.log(err)
        })
      }else {
        alert('请勾选数据')
      }
    },
    //手动回收  recoverLoading
    manualRecycling(){ // /jz/admin/recoverydatabyguidlist
      if(this.guids.length > 0){
        this.recoverLoading = true
        axios({
          method: 'post',
          url: this.baseURL + '/jz/admin/recoverydatabyguidlist',
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          data:this.guids
        }).then(res => {
          this.recoverLoading = false
          console.log(res)
          this.$message.success(res.data.message)
          this.dataList(this.from)
        }).catch(err => {
          this.recoverLoading = false
          console.log(err)
        })
      }else {
        alert('请勾选数据')
      }
    },
    //分页 页数改变钩子
    handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      this.from.current = val
      console.log(this.from);
      this.dataList(this.from)
    },
    //分配数据选择坐席
    choiceZx(){
      this.dlgLoading = true
      axios({
        method: 'post',
        // url: this.baseURL + '/jz/admin/allocatedatabyguids/'+this.oneZx+this.readable,
        url: `${this.baseURL}/jz/admin/allocatedatabyguids/${this.oneZx}/${this.readable}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data:this.guids
      }).then(res => {
        this.dlgLoading = false
        // alert(res.data.message)
        Message({
          message: `${res.data.message}`,
          type: 'success',
          duration: 5 * 1000,
        })
        this.dialog = false
        this.dataList(this.from)
      }).catch(err => {
        console.log(err)
        this.dialog = false
      })
      // console.log(this.oneZx)
      // this.$store.dispatch('user/htgdFp',{job:this.oneZx,guids:this.guids}).then(res=>{
      //   // console.log(res)
      //   alert(res.data.message)
      //   this.dialog = false
      //   this.dataList(this.from)
      // }).catch(err=>{i
      //   console.log(err)
      //   this.dialog = false
      // })
    },
    //分配数据 第一次 弹出坐席
    distribution(){//tyFp
      this.allocationLoading = true
      if(this.guids.length > 0){
        // this.$store.dispatch('user/tyFp').
        axios({
          method: 'get',
          // url: this.baseURL + '/jz/admin/allocatedatabyguids/'+this.oneZx+this.readable,
          url: `${this.baseURL}/user/depart/getseatsbydepartguids`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res=>{
          this.allocationLoading = false
          let jobs = []
          for (let a = 0; a < res.data.data.data.length; a++){
            let job = {}
            job.value = res.data.data.data[a].jobNumber
            job.label = res.data.data.data[a].jobNumber
            jobs.push(job)
          }
          this.optionsZx = jobs
          this.dialog = true
          // console.log(jobs)
          // let job = this.oneZx
        }).catch(err=>{
          console.log(err)
          this.allocationLoading = false
        })
      }else {
        this.allocationLoading = false
        alert('请勾选数据')
      }

      // let job = 201204003
      //
      // this.$store.dispatch('user/htgdFp',{job:job,guids:this.guids}).then(res=>{
      //   console.log(res)
      //   alert(res.data.message)
      //   this.dataList(this.from)
      // }).catch(err=>{
      //   console.log(err)
      //
      // })
      // // var fenp = this.guids
      // // fenp.jobNumber = 201204002
      // // fenp.guids = this.guids
      // // console.log(fenp)
      // axios({
      //   method: 'post',
      //   url: 'http://192.168.3.117:9090/jz/admin/allocatedatabyguids/'+job,
      //   headers: {
      //     "Content-Type": "application/json;charset=UTF-8",
      //     'token': localStorage.token,
      //   },
      //   // responseType: "blob",
      //   data:this.guids
      // }).then(res=>{
      //   console.log(res)
      //   alert(res.data.message)
      //   this.dataList(this.from)
      // }).catch(err=>{
      //   console.log(err)
      // })
    },
    //坐席列表
    seatList(){
      //this.$store.dispatch('user/tyFp').
      axios({
        method: 'get',
        // url: this.baseURL + '/jz/admin/allocatedatabyguids/'+this.oneZx+this.readable,
        url: `${this.baseURL}/user/depart/getseatsbydepartguids`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res=>{
        let jobs = []
        for (let a = 0; a < res.data.data.data.length; a++){
          let job = {}
          job.value = res.data.data.data[a].jobNumber
          job.label = res.data.data.data[a].jobNumber
          jobs.push(job)
        }
        this.optionsZx = jobs
        // console.log(jobs)
        // let job = this.oneZx
      }).catch(err=>{
        console.log(err)
      })
    },
    //分页 条数改变钩子
    handleSizeChange(val){
      console.log(`每页 ${val} 条`);
      this.from.size = val
      this.dataList(this.from)
    },
    //当复选框状态改变时获取复选框的值
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
      this.guids = []
      for (let a = 0; a < val.length; a++){
        this.guids.push(`${val[a].guid}`)
      }
      console.log(this.guids)
    },
    //获取所有数据
    dataList(data){
      this.loading = true
      //this.$store.dispatch('user/htgongdlist',data)
      axios({
        method: 'post',
        // url: this.baseURL + '/jz/admin/allocatedatabyguids/'+this.oneZx+this.readable,
        url: `${this.baseURL}/jz/admin/getalldatabyconditition`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data:data
      }).then(res=>{
        for (let i = 0; i < res.data.data.dataList.length; i++) {
          res.data.data.dataList[i].phone = this.transForm(res.data.data.dataList[i].phone)
          res.data.data.dataList[i].sparePhone = this.transForm(res.data.data.dataList[i].sparePhone)
        }
        this.tableData = res.data.data.dataList
        this.total = res.data.data.total
        console.log(res)
        this.loading = false
      }).catch(err=>{
        console.log(err)
        this.loading = false
      })
      // axios({
      //   method: 'post',
      //   url: 'http://192.168.2.127:9090/jz/admin/getalldatabyconditition',
      //   headers: {
      //     "Content-Type": "application/json;charset=UTF-8",
      //     'token': localStorage.token,
      //   },
      //   // responseType: "blob",
      //   data:data
      // }).then(res=>{
      //   this.tableData = res.data.data.dataList
      //   this.total = res.data.data.total
      //   console.log(res)
      //   this.loading = false
      // }).catch(err=>{
      //   console.log(err)
      // })
      // this.$store.dispatch('user/htgongdlist',data).then((res) => {
      //   // console.log(res.data.data.dataList)
      //   // this.total = res.data.data.total
      //   // const list = res.data.data.dataList
      //   //
      //   // this.tableData = list
      //   // this.loading = false
      // }).catch((err) => {
      //   console.log(err)
      //   // this.loading = false
      // })
    },
    //查看操作记录
    record(val){
      // console.log(val)
      console.log(val.guid)
      this.recordDialog = true
      // this.recordLog = val
      axios({
        method: 'get',
        url: this.baseURL + '/jz/jzrecord/getRecordByjzGuid?jzGuid='+val.guid,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res=>{
        console.log(res)
        for (let i = 0 ; i <res.data.data.dataList.length; i++){
          if(res.data.data.dataList[i].soundUrl == ''){
            res.data.data.dataList[i].audio = false
          }else {
            res.data.data.dataList[i].audio = true
            res.data.data.dataList[i].soundUrl = this.baseURL +  res.data.data.dataList[i].soundUrl
          }
        }
        this.recordLog = res.data.data.dataList
      }).catch(err=>{
        console.log(err)
      })
    },
    //操作数据
    editor(val){
      this.get(val.guid)
      this.allWorkDialog = true
    },
    //任务状态切换
    stateSwitching2(val){
      console.log(val)
      if(val.length>0){
        this.from.businessStatusId = val[val.length-1]
      }
    },
    //获取业务(2) 接通(1)状态
    dropDownBox(data){
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: this.baseURL + '/status/ynkStatus/getStatusTree/' + data,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          // console.log(res)
          resolve(res)
          // let obj = []
          // for (let i = 0; i < res.data.length ; i++){
          //   let aa = {}
          //   aa.label = res.data[i].title
          //   aa.value = res.data[i].guid
          //   obj.push(aa)
          //   aa.children = []
          //   for (let j = 0 ; j < res.data[i].children.length; j++){
          //     let bb = {}
          //     bb.label = res.data[i].children[j].title
          //     bb.value = res.data[i].children[j].guid
          //     aa.children.push(bb)
          //   }
          // }
          // console.log(obj)
          // this.options = obj
        }).catch(err => {
          // console.log(err)
          reject(err)
        })
      })
    },
    // 递归判断列表，把最后的children设为undefined
    getTreeData(data){
      for(let i=0;i<data.length;i++){
        if(data[i].children.length<1){
          // children若为空数组，则将children设为undefined
          data[i].children=undefined;
        }else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
    //成功量排名
    ranking(){
      axios({
        method: 'post',
        url: this.baseURL + '/jz/admin/getjzperformanceranking',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log('这个是请求参数',res)
        if(res.data.data.performanceRankingVos.length >1 ){
          this.own = res.data.data.performanceRankingVos[res.data.data.performanceRankingVos.length-1]
          this.king = res.data.data.performanceRankingVos.slice(0,-1)
          this.first = this.king[0]
          this.second = this.king[1]
          this.third = this.king[2]
        }else {
          console.log('无坐席')
        }
        // console.log(this.first,this.second,this.third)
      }).catch(err => {
        console.log(err)
      })
    },
    //单个工单详细数据 htgdoneList
    get(data){
      //this.$store.dispatch('user/htgdoneList',data)
      axios({
        method: 'get',
        url: this.baseURL + '/jz/admin/getdetail/'+data,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res=>{
        console.log(res)
        res.data.data.data.phone = this.transForm(res.data.data.data.phone)
        res.data.data.data.sparePhone = this.transForm(res.data.data.data.sparePhone)
        this.onedata = res.data.data.data
        this.form = res.data.data.data
        this.active = parseInt(this.onedata.plannedSpeed)
        this.form.call = []
        this.form.Business = []
        this.followUpTime = res.data.data.followUpTime
        this.pastNote = res.data.data.pastNote
        console.log(this.form)
        // console.log(this.$store.state.rest)


        // transForm
        //操作记录
        this.records = res.data.data.record
        this.ranking()//排名
      }).catch(err=>{
        console.log(err)
      })
    },
    //清除意向度
    clearIntention(){
      this.form.intentionality = ''
    },
    //提交工单
    alldata(){
      console.log(this.form)
      this.loadingT = true
      //this.$store.dispatch('user/htgongdtj',this.form)
      axios({
        method: 'post',
        url: this.baseURL + '/jz/admin/addstatus',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data:this.form
      }).then(res=>{
        this.loadingT = false
        console.log(res)
        this.dataList(this.from)
        Message({
          message: `修改成功`,
          type: 'success',
          duration: 5 * 1000,
        })
      }).catch(err=>{
        this.loadingT = false
        console.log(err)
      })
    },
    //实时修改字段
    modify(value,guid,a){
      console.log(value,guid,a)
      axios({
        method: 'get',
        url: `${this.baseURL}/jz/admin/updatebyguidandfieldnameandvalue/${guid}/${a}/${value}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log('这个是请求参数',res)
      }).catch(err => {
        console.log(err)
      })
    },
    //swop 主备信息交换
    swop(){
      this.swopLoading = true
      axios({
        method: 'get',
        url: `${this.baseURL}/jz/admin/primaryandstandbydataexchange?guid=${this.form.guid}&sparePhone=${this.form.sparePhone}&spareName=${this.form.spareName}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        this.swopLoading = false

        console.log('这个是请求参数',res)
        if(res.data.code == 400){
          Message({
            message: `${res.data.message}`,
            type: 'error',
            duration: 5 * 1000,
          })
        }else {
          res.data.data.data.phone = this.transForm(res.data.data.data.phone)
          res.data.data.data.sparePhone = this.transForm(res.data.data.data.sparePhone)
          this.onedata = res.data.data.data
          this.form = res.data.data.data
          this.form.call = []
          this.form.Business = []
        }
      }).catch(err => {
        this.swopLoading = false
        console.log(err)
      })
    },
    //个人标签颜色
    colorValue(val){
      console.log(val)
      this.form.personalLabel = val //require('../../../icons/svg/' + val + '.png')
      this.urlAddress = require('../../../icons/svg/' + this.form.personalLabel + '.png')

      this.form.urlAddress = this.urlAddress
      console.log(this.urlAddress)
      console.log(this.form)
    },

    //添加自动外呼数据
    autoCallList(){
      this.describe = ''
      if(this.guids.length > 0){
        this.dialogDescribe = true
      }else {
        Message({
          message:'请选择工单',
          type:'error',
          duration:5*1000
        })
      }

    },
    //
    shutDown(){
      this.dialogDescribe2 = false
    },

    //接通状态转换
    stateSwitchinglog1(val){
      console.log(val)
      if(val.length>0){
        this.form.statusId = val[val.length-1]
      }
      // console.log(val[val.length-1])
      // console.log(this.$store.state.baseURL)

      // this.form.status = val[1]
    },
    //任务状态切换
    stateSwitchinglog2(val){
      console.log(val)
      if(val.length>0){
        this.form.businessStatusId = val[val.length-1]
      }
    },
    //隐藏弹框 describeShow
    describeShow(){
      this.dialogDescribe = false
      this.describe = ''
    },
    //隐藏弹框 上传
    describeShow2(){
      this.dialogDescribe2 = false
      this.describe2 = ''
    },
    //弹框提交自动外呼批次
    describeSubmit(){
      console.log(this.describe)
      if(this.describe !== '' && this.guids.length > 0){
        axios({
          method: 'post',
          url: `${this.baseURL}/hetao/outboundlisthetao/importdata/${this.describe}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
          data: this.guids
        }).then(res => {
          console.log(res)
          this.dialogDescribe = false
          if(res.data.code=='200'){
            Message({
              message: res.data.message,
              type: 'success',
              duration: 5 * 1000,
            })
          }else {
            Message({
              message: res.data.message,
              type: 'error',
              duration: 5 * 1000,
            })
          }
        }).catch(err => {
          this.dialogDescribe = false
          console.log(err)
        })
      } else {
        Message({
          message: '批次描述为必填项',
          type: 'error',
          duration: 5 * 1000,
        })
      }
    },
    //解除上传禁用
    disDisabled(){
      if(this.describe2 !== ''){
        this.describeDisabled = false
      }else {
        this.describeDisabled = true
      }
    },
    //部门号
    branch(data){
      axios({
        method: 'get',
        url: `${this.baseURL}/user/lockdepartment/${data}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    //手机号转换
    transForm(val){
      let aa = val.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
      return aa
    },

  },
  created() {
    this.branch(8)
    this.dataList(this.from)
    //业务状态下拉
    this.dropDownBox(2).then(res=>{
      console.log(res)
      this.options4 = this.getTreeData(res.data)
    }).catch(err=>{
      console.log(err)
    })
    //接通状态下拉
    this.dropDownBox(1).then(res=>{
      console.log(res)
      this.options = this.getTreeData(res.data)
    }).catch(err=>{
      console.log(err)
    })
    //坐席列表
    this.seatList()
  }
}
</script>

<style scoped>
/*按钮边距*/
.mrr{
  margin-right: 10px;
  display: inline-block;
}
/*  按钮左边距*/
>>>.el-button+.el-button{
  margin-left: 0;
}
/*搜索框复选框边距*/
>>>.el-table-column--selection .cell{
  padding-right: 10px;
}
/*搜索框下边距*/
>>>.el-collapse-item__content{
  padding-bottom: 5px;
}
>>>.el-input--suffix .el-input__inner{
  height: 32px;
  line-height: 32px;
}
/*操作记录 弹出框样式*/
.dlgjl{
  height: 70vh;
  overflow: auto;
}
.dlgjl div{
  border-bottom: 1px #999999 solid;
  margin-bottom: 5px;
  padding-bottom: 5px;
}
/*搜索项*/
>>>.el-form-item{
  margin-bottom: 0;
}
/*搜索框高度*/
>>>.el-collapse-item__header{
  height: 40px;
}
/*搜索框标题*/
.sstitle {
  font-size: 16px;
  font-weight: 900;
}
/*搜索框左边距*/
.sstj {
  padding-left: 30px;
}
/*时间手*/
.shou {
  cursor: pointer;
  margin: 3px;
}
/* 弹窗标题边距 */
>>>.el-dialog__header{
  padding: 15px 20px 10px;
}
/* 弹窗文本边距 */
>>>.el-dialog__body{
  padding: 5px 20px 15px;
}
.fywDiv{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.gdt {
  width: 98%;
  /*height: 400px;*/
  /*border: 1px solid red;*/
  margin: 0 auto;
  white-space: nowrap;
}
.table {
  height: 100%;
}

.gdt ::-webkit-scrollbar {
  /* 设置竖向滚动条的宽度 */
  width: 7px;
  /* 设置横向滚动条的高度 */
  height: 7px;
}

.gdt ::-webkit-scrollbar-thumb {
  /*滚动条的背景色*/
  background-color: rgba(144, 147, 153, .3);
  border-radius: 35px;
  position: relative;
}
/* 全部工单格式 */
.allHeart{
  width: 100%;
}
.right-d {
  display: flex;
  height: 75vh;
  justify-content: space-between;
  padding: 0 15px;
}
.right-w1 {
  width: 50%;
  padding: 5px;
  font-size: 14px;
  border-right: 1px rgba(0,0,0,0.1) solid;
  /*line-height: 20px;*/
}

.right-w h4 {
  text-align: center;
}

.right-s {
  display: grid;
  /*grid-template-columns: repeat(4, 1fr);*/
  grid-template-columns: 15% 15% 25% 40%;
  padding: 10px;
}
/*成功量排名*/
.zux{
  /*margin-top: 10px;*/
  font-size: 12px;
  line-height: 14px;
  padding: 5px;
  border-bottom: black solid 1px;
}
.zux div{
  display: flex;
}
.zux div span{
  width: 50%;
}
.flex{
  display: flex;
  justify-content: space-between;
}
.right-d {
  display: flex;
  height: 75vh;
  justify-content: space-between;
  padding: 0 15px;
}
.right-s {
  display: grid;
  /*grid-template-columns: repeat(4, 1fr);*/
  grid-template-columns: 15% 15% 25% 40%;
  padding: 10px;
}
.wb{
  font-family: 微软雅黑 Light;
  line-height: 28px;
}
.right-w1 {
  width: 45%;
  padding: 5px;
  font-size: 14px;
  border-right: 1px rgba(0,0,0,0.1) solid;
  /*line-height: 20px;*/
}
.xtxxDiv{
  width: 25%;
  border-right: none;
  border-left: 1px rgba(0,0,0,0.1) solid;
  padding-right:20px ;
  padding-left:20px ;
  font-family: 微软雅黑 Light;
}
.czjlDid{
  width: 30%;
  border-left:1px rgba(0,0,0,0.1) solid;
  background: rgba(245,245,245,0.5);
  padding-left: 15px;
  position: relative;
}
.xtxxDiv div span{
  font-size: 12px;
}
/*操作记录*/
.record{
  height: calc(100% - 150px);
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
  padding-left: 15px;
  font-family: 微软雅黑 Light;
  font-size:13px;
  padding-top: 15px;
  border-bottom: 1px rgba(0,0,0,0.1) solid
  /*white-space: normal;*/
}
/*奇数行*/
.record p:nth-of-type(odd){
  background: #F0F0F0;
}
.buttonsDiv{
  width: 100%;
}
/*.buttonDiv{*/
/*  width: 100px;*/
/*  margin: 20px auto;*/
/*}*/
.mBottom{
  margin-bottom: 10px;
}
/* 历史备注 框 */
.history{
  padding: 5px;
  width: 100%;
  height: 140px;
  overflow: auto;
  border: 1px #d3dce6 solid;
  border-bottom:1px transparent solid ;
  font-size: 12px;
  line-height: 16px;
  word-break: break-all;
  white-space: pre-wrap;
}
.buttonTDiv{
  /*width: 100px;*/
  margin: 20px auto;
}

/*不换行*/
.noLineBreak{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
>>>.el-form-item__content{
  width: 100%;
}
/* dlg 外边距 */
>>>.dialogbig{
  margin-top:5vh !important;
  margin-left: 1vw;
  margin-right: 1vw;
  width: auto;
}
</style>
