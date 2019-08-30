<template>
  <div id="login">
    <div>
    <b-navbar type="light" variant="white" text-variant="black">
     <b-navbar-nav>
      <b-navbar-brand><img src="../../static/logo.png" aria-hidden="true" style="height:30px"></img> <b>专业知识标注系统</b></b-navbar-brand>
    </b-navbar-nav>
  </b-navbar>
</div>

  <div id="login_box">
   
 <div style="width:100%;text-align:center;">
       <h5>用户登录</h5>
      </div>
       
       </br>

      <div>
<b-form>    

      <b-form-group id="input-group-1" label="用户名" label-size="sm" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="密码" label-size="sm" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"          
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

    </br>
    

      <b-button block  variant="secondary" @click="submit()" pill> 登录</b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>

    
        </div>
    
  </div>
 

  </div>
</template>

<script>


export default {
  name: 'login', 
   data() {
  
      return {
        form: {          
          name: '',
          password: '',          
        },   
        
       
      }
    },


    methods: {
      submit() {
        
        window.localStorage.clear();
       

       this.$http.post("http://202.202.5.140:81/api-token-auth/",{"username":this.form.name,"password":this.form.password}).then((response) => {
          console.log(response);
          window.localStorage.setItem('Authorization',' Token  '+ response.body.token);    
          window.localStorage.setItem('user',this.form.name);
          
          // this.$http.get("http://202.202.5.140:81/user/user/?username="+this.form.name).then((response2)=>{
          //   console.log(response2);
          
          // },function(){
          //   alert('获取身份失败');
          // });

          console.log( window.localStorage.getItem(['Authorization']));      
             this.$router.push({path:'/home'})         
        },function(){
          alert('用户名或密码输入错误！');
        });
        
          
      },
     
    }
}
</script>

<style>

#login_box{
  width:400px;
  height:400px;
  margin:auto;
  background-color:white;
  margin-top:10%;
  padding:30px;
}

</style>
