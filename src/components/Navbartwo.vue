<template>
<div id="navbartwo" class="navbartwo"> 
  <b-nav vertical>
    <b-nav-item style="font-size:18px;text-align:center;" disabled ><b>语料维护</b></b-nav-item>
    </br>    
    <b-nav-item id="textadd" style="font-size:15px;text-align:center;" :class="{'active':add}" @click="routeadd()" v-show="staff">添加语料</b-nav-item>
    <b-nav-item id="textfind" style="font-size:15px;text-align:center;" :class="{'active':find}" @click="routefind()">查询修改语料</b-nav-item>
  </b-nav>

  

</div>
</template>


<script>
  export default {
      name: 'navbartwo',   
      data(){
        return{
          staff:false,         
        }
      },
      props:['add','find'],
      methods:{
        routeadd(){         
          this.$router.push({
            path:'/addtext',
        })
        },
        routefind(){
           this.$router.push({
            path:'/findtext',    
            })
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
.navbartwo{
  background-color:white;
  height:100%;
  width:100%;

  
}


.navbartwo .nav-link{
  color:black;
}

.navbartwo .active{
  background-color:#dadfe6;
}
</style>