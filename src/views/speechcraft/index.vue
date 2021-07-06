<template>
  <div>
    <!--  话术图片  -->
    <img width="100%" :src="dialogImageUrl" alt="">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "index",
  data(){
    return{
      baseURL:this.$store.state.baseURL,
      //话术图片
      dialogImageUrl:'',
    }
  },
  methods:{
    newImg(){
      axios({
        method: 'get',
        url: `${this.baseURL}/words/getimg?professionalWork=核桃编程`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        this.dialogImageUrl = res.data.data.url
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted(){
    this.newImg()
  }
}
</script>

<style scoped>

</style>
