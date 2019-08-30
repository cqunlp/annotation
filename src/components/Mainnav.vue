<template>
<div id="mainnav" class="mainnav ml-auto"> 
        <div class="quarter-div">
            <div class="nav-box blue" @click="route('findtext')">
             <img src="../../static/1.png" aria-hidden="true" style="height:100%"></img>
                </div>
        </div>
         <div class="quarter-div">
             <div class="nav-box green" @click="route('entityannoation')">
                  <img src="../../static/3.png" aria-hidden="true" style="height:100%"></img>
                </div>
         </div>
         <div class="quarter-div">
             <div class="nav-box orange" @click="route('relation')">
                  <img src="../../static/2.png" aria-hidden="true" style="height:100%"></img>
                </div>
         </div>
         <div class="quarter-div" v-show="staff">
             <div class="nav-box yellow" @click="route('allocate')">
                  <img src="../../static/4.png" aria-hidden="true" style="height:100%"></img>
                </div>
         </div>
</div>
</template>


<script>
  export default {
      name: 'mainnav',
      data(){
        return{
          staff:false,         
        }
      },
      methods:{
          route:function (data) {
              this.$router.push({path:'/'+data})
          }
      },
      mounted(){
        this.$http.get("http://202.202.5.140:81/user/user/?username="+window.localStorage.getItem(['user']),{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{            
            this.staff=response.body[0].is_staff;
            console.log("admin",this.staff);
          },function(){
            alert('获取身份失败');
          });
      }
    
  }
</script>

<style>
.mainnav{
             width: 100%;
             height: 840px;
             position: absolute;
         }
         .quarter-div{
             width: 50%;
             height: 50%;
             float: left;
         }
         .blue{
             background-color: #5BC0DE;
         }
         .green{
             background-color: #5CB85C;
         }
         .orange{
             background-color: #F0AD4E;
         }
         .yellow{
             background-color: #FFC706;
         }
.nav-box{
  width:310px;
  height:200px;
  margin:auto;  
  margin-top:10%;
  padding:30px;
}


</style>