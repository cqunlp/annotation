<template>
<div id="navbarthree" class="navbarthree"> 
  <b-nav vertical>
    <b-nav-item style="font-size:18px;text-align:center;" disabled ><b>实体标注</b></b-nav-item>
    </br>    
    <b-nav-item id="textadd" style="font-size:15px;text-align:center;" :class="{'active':annoation}" @click="entityannoation()">实体人工标注</b-nav-item>
    <b-nav-item id="textfind" style="font-size:15px;text-align:center;" :class="{'active':audit}" @click="routefind()">实体标注审计</b-nav-item>
     <b-nav-item id="textfind" style="font-size:15px;text-align:center;" :class="{'active':exportentity}" @click="routefind()">实体标注导出</b-nav-item>
  </b-nav>

  

</div>
</template>


<script>
  export default {
      name: 'navbarthree',   
      props:['annoation','audit','exportentity'],
      methods:{
        entityannoation(){         
       this.$router.push({
            path:'/entityannoation',
            })
        },
        routefind(){
        //    this.$router.push({
        //     path:'/findtext',    
        //     })
        // }
        }
      }
  }
  
</script>

<style>
.navbarthree{
  background-color:white;
  height:100%;
  width:100%;

  
}


.navbarthree .nav-link{
  color:black;
}

.navbarthree .active{
  background-color:#dadfe6;
}
</style>