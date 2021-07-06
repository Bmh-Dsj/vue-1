<template>
  <div>
    <el-upload
      style="margin: 10px"
      class="upload-demo"
      action="http://39.102.203.193:9090/ttpai/signup/readexcel58"
      :headers="headers"
      :show-file-list="false"
      name="file"
      accept =".xls"
      :on-change="handleChange"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            headers:{
              // "Content-Type": "multipart/form-data",
              'token': localStorage.token
            },
            fileList:[],
          }
      },
      methods:{
        handleChange(file, fileList){
          console.log(file, fileList)
        },
      }
    }
</script>

<style scoped>

</style>
