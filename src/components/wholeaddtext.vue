<template>
  <div id="wholeaddtext">
       <navbar></navbar>
       </br>   
      
       <div class="row content">   
           <div class="left">
               <navbartwo  :add="true" :find="false"></navbartwo>    
               </div>

            <div class="right">
              <addtext></addtext>   
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
