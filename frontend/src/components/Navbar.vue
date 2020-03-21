<template>
  <div id="navbar">
 <b-navbar variant="white" text-variant="black">
  
       <b-navbar-brand @click="rout('home')"><img src="../../static/logo.png" aria-hidden="true" style="height:30px"></img> <b>专业知识标注系统</b></b-navbar-brand>
       
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

    <b-navbar-nav style="font-size:18px;width=100%">

      <b-nav-item-dropdown text="语料维护" right>
        <b-dropdown-item  @click="rout('addtext')" v-show="staff">添加语料</b-dropdown-item>
        <b-dropdown-item  @click="rout('findtext')">查询语料</b-dropdown-item>       
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="实体标注" right>
        <b-dropdown-item @click="rout('entityannoation')">实体人工标注</b-dropdown-item>
        <b-dropdown-item href="#">实体标注审计</b-dropdown-item>
        <b-dropdown-item href="#">实体标注导出</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="关系标注" right>
        <b-dropdown-item @click="rout('relation')">实体关系人工标注</b-dropdown-item>
        <b-dropdown-item href="#">实体关系标注审计</b-dropdown-item>
        <b-dropdown-item href="#">实体关系导出</b-dropdown-item>
      </b-nav-item-dropdown> 

    </b-navbar-nav>

     <b-navbar-nav style="font-size:18px;width=100%">
       <b-nav-item  @click="rout('allocate')" v-show="staff"> 任务分配
       </b-nav-item>
       </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
        <b-button variant="secondary" pill size="sm" class="my-sm-0" @click="quit()" > {{username}} 登出 </b-button>
      </b-navbar-nav>            
  
   </b-collapse>

   </b-navbar>
</div>
</template>

<script>
  export default {
      name: 'navbar',
      data(){
        return{
          staff:false,
          username:""
        }
      },
      methods:{
        quit(){
          window.localStorage.removeItem('token');
          this.$router.push({path:'/'})
        },
        rout(data){
          this.$router.push({
            path:'/'+data,
          })
        },
      

      },
      mounted(){
        this.$http.get("http://202.202.5.140:81/user/user/?username="+window.localStorage.getItem(['user']),{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
            this.username=window.localStorage.getItem(['user']);
            this.staff=response.body[0].is_staff;
            console.log("admin",this.staff);
          },function(){
            alert('获取身份失败');
          });
      }
    
  }
</script>

<style>


</style>