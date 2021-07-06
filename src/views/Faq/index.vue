<template>
 <div>
<!--  话术字faq  -->
   <div class="half">
     <div class="left">
       <p>话术</p>
       <div class="scroll" v-html="dialogImageUrl"></div>
     </div>
     <div class="right">
       <p>FAQ</p>
       <div class="scroll" v-html="wordsContent"></div>
     </div>

   </div>

<!--   <img width="100%" :src="dialogImageUrl" alt="">-->
 </div>
</template>

<script>
import axios from "axios";

export default {
  name: "index",
  data(){
    return{
      baseURL:this.$store.state.baseURL,
      wordsContent:'',//FAQ内容
      dialogImageUrl:'',//话术内容


    }
  },
  methods:{
    newFaq(){
      axios({
        method: 'get',
        url: `${this.baseURL}/words/getfaq?professionalWork=核桃编程`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': localStorage.token,
        },
      }).then(res => {
        console.log(res)
        this.wordsContent = res.data.data.content
        //console.log(this.wordsContent)
      }).catch(err => {
        console.log(err)
      })

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

      if(this.$route.query.one){
        console.log('dyc')
      }else {
        // 跳转页面
        let url = this.$router.resolve({
          path: '/walnut/words',
          query:{//通过query 传递参数
            one:'true',
          }
        });
        window.open(url.href, "_blank");
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
  },
  created() {
    this.branch(4)
    this.newFaq()
  },
  mounted(){

  }
}
</script>

<style scoped>
.half{
  display: flex;
}
.half p{
  text-align: center;
  font-weight: 900;
  font-size: 25px;
  margin: 0;
  height: 40px;
  line-height: 40px;
}
.left{
  width: 50%;
  /*border-right: #cccccc 2px solid;*/
  /*box-shadow: rgb(11, 234, 235) 0px 0px 10px inset;*/
  /*box-shadow: 3px 0 15px #cccccc;*/
  box-shadow: 1px 0px 5px #cccccc;
  padding: 10px;
  height: calc(100vh - 60px);
}
.right{
  width: 50%;
  padding: 10px;
  box-shadow:  -1px 0px 5px #cccccc;
  height: calc(100vh - 60px);
}
.scroll{
  overflow: auto;
  height: calc(100% - 40px);
}
</style>
