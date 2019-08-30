<template>
<div id="navbarfour" class="navbarfour"> 
  <b-nav vertical>
    <b-nav-item style="font-size:18px;text-align:center;" disabled ><b>实体关系标注</b></b-nav-item>
    </br>    
    <b-nav-item id="textadd" style="font-size:15px;text-align:center;" :class="{'active':relations}" @click="relation()">实体关系人工标注</b-nav-item>
    <b-nav-item id="textfind" style="font-size:15px;text-align:center;" :class="{'active':audit}" @click="routefind()">实体关系标注审计</b-nav-item>
     <b-nav-item id="textfind" style="font-size:15px;text-align:center;" :class="{'active':exportentity}" @click="routefind()">实体关系导出</b-nav-item>
  </b-nav>

  

</div>
</template>


<script>
  export default {
      name: 'navbarfour',   
      props:['relations','audit','exportentity'],
      methods:{
        relation(){         
       this.$router.push({
            path:'/relation',
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
.navbarfour{
  background-color:white;
  height:100%;
  width:100%;

  
}


.navbarfour .nav-link{
  color:black;
}

.navbarfour .active{
  background-color:#dadfe6;
}
</style>