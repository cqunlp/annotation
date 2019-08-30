<template>
<div id="addtext"  > 
 <div class="single_add" id="single_add">
   <div>
     <h6><b>单一语料导入</b></h6>
     </div>

     <div>
    <b-form @submit="onSubmit" v-if="show" style="font-size:13px">  
      <div class="row">
      <div class="half">
         <label class="mr-sm-2" for="input-1">学科类型</label>
    <b-form-select
      class="mb-2 mr-sm-5 mb-sm-0"
      v-model="form.subject"
      :value="null"
      :options="subjects"
      id="input-1"
      style="font-size:13px"
    >
      <option slot="first" :value="null">Choose...</option>
    </b-form-select>
  
        </div>  
      
   <div class="half">
 <label class="mr-sm-2" for="input-2">应用领域</label>
    <b-form-select
      class="mb-2 mr-sm-5 mb-sm-0"
      v-model="form.field"
      :value="null"
      :options="fields"
      id="input-2"
      style="font-size:13px"
    >
      <option slot="first" :value="null" >Choose...</option>
    </b-form-select>  
           </div>  
           </div>

     <div style="padding:1%">
<b-form-group>
  <label class="mr-sm-2" for="textarea">要导入的语料文本内容：</label>
    <b-form-textarea
      id="textarea"
      v-model="form.text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
      style="font-size:13px"
    ></b-form-textarea>
  </b-form-group>
  </div>
   
      <div class="row">
        <b-button type="submit" variant="primary" style="font-size:13px;margin:auto">导入</b-button>
        </div>  

    </b-form>
    </div>
    </div>

    </br>

  <div class="single_add" id="single_add">
    <div>
     <h6><b>批量语料导入</b></h6>
     </div>
    
    <div style="padding:1%">

   <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file..."
      drop-placeholder="Drop file here..."
       style="font-size:13px"
    ></b-form-file>
    <div class="mt-3"  style="font-size:13px">Selected file: {{ file ? file.name : '' }}</div>

    </div>

     <div class="row">
        <b-button type="submit" variant="primary" style="font-size:13px;margin:auto">导入</b-button>
        </div>  


    </div>
  
</div>
</template>


<script>
  export default {
      name: 'addtext',   
      data() {
      return {
        file: null,     
         form: {        
          subject: null,
          field:null,
          text:""      
        },
        subjects: [],
        fields:[],      
        show: true
      }
    },
    
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },  
    },   

    mounted(){
      console.log(window.localStorage.getItem('Authorization'));
      this.$http.get("http://202.202.5.140:81/paper/subject/",{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
          console.log(response);
       
          var sub=[]
          response.body.forEach(element => {
            sub.push({text:element.name,value:element.id})
          });

          this.subjects=sub;         

          },function(){
          alert('请求失败！');
        });

   this.$http.get("http://202.202.5.140:81/paper/domain/",{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
          console.log(response);
       
          var fie=[]
          response.body.forEach(element => {
            fie.push({text:element.name,value:element.id})
          });

          this.fields=fie;         

          },function(){
          alert('请求失败！');
        });

      } 
  }
</script>

<style>

.addtext{
  height:100%;
  width:100%
}

.single_add{
  background-color:white;
  height:auto;
  width:auto;
  margin-left:2%;
  padding:2%  
}

.half{
  width:50%;
   padding:2%
}



</style>