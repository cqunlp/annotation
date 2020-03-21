<template>
  <div id="wholeaddtext">
       <navbar></navbar>
       </br>   
      
       <div class="row content">   
           <div class="left">
               <navbartwo  :add="false" :find="true"></navbartwo>    
               </div>

            <div class="right">
                 <findtext></findtext>   
                </div>

             
          

       </div>
  </div>
</template>

<script>

export default {
  name: 'wholeaddtext',  
}



</script>

<style>
.content{   
    width:100%
}

.left{
    width:10%
}

.right{
    width:90%
}
</style>
