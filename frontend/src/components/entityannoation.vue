<template>
  <div id="entityannoation">
       <navbar></navbar>
       </br>   
      
       <div class="row content">   
           <div class="left">
               <navbarthree  :annoation="true" :audit="false" :exportentity="false"></navbarthree>    
               </div>

            <div class="right">
              <entityannoationcontent></entityannoationcontent>   
                </div>

             
          

       </div>
  </div>
</template>

<script>

export default {
  name: 'entityannoation',  
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
