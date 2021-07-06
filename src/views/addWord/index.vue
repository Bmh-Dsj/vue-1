<template>
  <div>
<!--  :data="this.from" :headers="headers"   :action=" this.baseURL+'/words/addrecord'"-->
    <div style="display: flex;justify-content: center; margin: 10px;">
      <div>
        <el-radio-group @change="editWords" v-model="radio1">
          <el-radio-button label="FAQ"></el-radio-button>
          <el-radio-button label="话术"></el-radio-button>
        </el-radio-group>
      </div>
<!--      <el-upload-->
<!--        class="upload-demo mrr"-->
<!--        ref="upload"-->
<!--        :show-file-list="false"-->
<!--        accept=".jpg, .png"-->
<!--        :action=" this.baseURL+'/words/addrecord'"-->
<!--        :auto-upload="false"-->
<!--        :on-change="getFile"-->
<!--        :file-list="fileList">-->
<!--        <el-button slot="trigger" size="small" type="primary">选取图片</el-button>-->
<!--      </el-upload>-->
<!--      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
    </div>

    <editor v-model="content" id="tinymce" :init="init"></editor>

    <div style="margin: 10px;">
<!--      <el-button size="small" type="primary" @click="yulan">内容预览</el-button>-->
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传话术</el-button>
    </div>

<!--    <img width="100%" :src="dialogImageUrl" alt="">-->

    <el-dialog title="内容预览" :visible.sync="show" width="80%">
      <!-- <div v-html="title"></div>
      <div v-html="canyu"></div>
      <div v-html="zhiyuan"></div> -->
      <div v-html="content"></div>
    </el-dialog>


  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver";
import Editor from "@tinymce/tinymce-vue";

import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import icons from "../../../static/tinymce/icons/default";
import axios from "axios";
import {Message} from "element-ui";


export default {
  name: "index",
  components: {Editor},
  data() {
    return {
      baseURL: this.$store.state.baseURL,
      radio1:'FAQ',
      headers: {
        // "Content-Type": "multipart/form-data",
        'token': localStorage.token
      },//请求头
      fileList: [],//上传的文件列表
      dialogImageUrl: '',
      from: {
        wordsContent: '',//FAQ
        professionalWork: '核桃编程',
        wordsImg:'',//话术图片
      },

      show: false,
      title: "",
      content: "",
      init: {
        language_url: "/tinymce/langs/zh_CN.js", //语言包文件路径
        language: "zh_CN", //什么语言
        skin_url: "/tinymce/skins/ui/oxide", //主题样式
        height: 700, //编辑器大小
        plugins:
          "link lists code table colorpicker textcolor wordcount contextmenu", //功能配置
        toolbar: [
          "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
          "hr bullist numlist link charmap preview anchor pagebreak insertdatetime media table  fontsizeselect  fontselect emoticons forecolor backcolor fullscreen",
        ],
        // plugins:
        //   "link lists image code table colorpicker textcolor wordcount contextmenu", //功能配置
        // toolbar: [
        //   "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
        //   "hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table  fontsizeselect  fontselect emoticons forecolor backcolor fullscreen",
        // ],
        //导航栏上的功能键
        branding: false,
        icon: icons,
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        },
      },
    };
  },
  methods: {
    //编辑话术
    editWords(val){
      //console.log('话术',val)
      // if(val == '话术'){
      //   console.log('话术')
      //   this.content = this.from.wordsImg
      // }else if(val == 'FAQ'){
      //   console.log('FAQ')
      //   this.content = this.from.wordsContent
      // }

      console.log(this.radio1)
      this.backfill()
    },
    //上传失败
    err(err) {
      console.log(err)
    },
    //上传中
    progress(event) {
      console.log(event)
      console.log('上传中')
    },
    //上传成功钩子
    // handleChange(res, file, fileList) {
    //   console.log(res)
    //   //console.log(this.fileList)
    //   console.log(file, fileList)
    //   this.dialogImageUrl = file.url;
    // },

    //预览
    yulan() {
      this.show = true;
    },
    //转换图片
    getFile(file, fileList) {
      console.log(file)
      this.getBase64(file.raw).then(res => {
        //console.log(res)
        this.from.wordsImg = res
        this.dialogImageUrl = res
      });
    },
    //上传
    submitUpload() {
      //this.$refs.upload.submit();
      if(this.radio1 == 'FAQ'){
        this.from.wordsContent = this.content
      }else if(this.radio1 == '话术'){
        this.from.wordsImg = this.content
      }
      console.log(this.from)

      axios({
        method: 'post',
        url: `${this.baseURL}/words/addrecord`,
        headers: {
          //"Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
        data:this.from
      }).then(res => {
        console.log(res)
        Message({
          message:res.data.message,
          type:"success",
          duration:3*1000
        })
      }).catch(err => {
        console.log(err)
      })

    },
    //图片转Base64编码
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    //回填 查询
    backfill(){
      if(this.radio1 === '话术'){
        axios({
          method: 'get',
          url: `${this.baseURL}/words/getimg?professionalWork=核桃编程`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          // if(res.data.message === "该业务无话术"){
          //   this.from.wordsImg = ' '
          // }else {
            this.content = res.data.data.url
          // }
          //this.content = this.from.wordsImg
        }).catch(err => {
          console.log(err)
        })
      }else if(this.radio1 === 'FAQ'){
        axios({
          method: 'get',
          url: `${this.baseURL}/words/getfaq?professionalWork=核桃编程`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            'token': localStorage.token,
          },
        }).then(res => {
          console.log(res)
          // if(res.data.message === "该业务无话术"){
          //   this.from.wordsContent = ' '
          // }else {
            this.content = res.data.data.content
          // }
          //this.content = this.from.wordsContent
          //console.log(this.wordsContent)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    //初始值
    initialValue(){
      axios({
        method: 'get',
        url: `${this.baseURL}/words/getimg?professionalWork=核桃编程`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        // if(res.data.message === "该业务无话术"){
        //   this.from.wordsImg = ' '
        // }else {
          this.from.wordsImg = res.data.data.url
        // }
      }).catch(err => {
        console.log(err)
      })
      axios({
        method: 'get',
        url: `${this.baseURL}/words/getfaq?professionalWork=核桃编程`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        // if(res.data.message === "该业务无话术"){
        //   this.from.wordsContent = ' '
        // }else {
          this.from.wordsContent = res.data.data.content
        // }
        //this.content = this.from.wordsContent
        //console.log(this.wordsContent)
      }).catch(err => {
        console.log(err)
      })
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
  },
  created() {
    this.branch(4)
    this.initialValue()
  },
  mounted() {
    tinymce.init({});
    this.editWords()
    //this.backfill()

  }
};
</script>

<style scoped>
</style>
