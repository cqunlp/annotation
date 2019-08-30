<template>
  <div id="relation">
       <navbar></navbar>
       </br>   
      
       <div class="row content">   
           <div class="left">
               <navbarfour  :relations="true" :audit="false" :exportentity="false"></navbarfour>    
               </div>

            <div class="right">
              <relationcontent></relationcontent>   
                </div>

             
          

       </div>
  </div>
</template>

<script>

export default {
  name: 'relation',  
}



</script>

<style>
.content{   
    width:100%;
    height:auto;
}

.left{
    width:10%
}

.right{
    width:90%
}
</style>
