<template>
<div id="findtext" > 
 <div class="find">
     <h6><b>查询语料</b></h6>
     </br>

     <div>
  <b-form  inline @submit="onSubmit">
    <label class="mr-sm-2" for="subjet" style="font-size:13px">学科</label>
    <b-form-select
      class="mb-2 mr-sm-4 mb-sm-0"
      v-model="form.subject"
      :value="null"
      :options="subjects"
      id="subject"
      style="font-size:13px;width:15%"
    >
      <option slot="first" :value="null">Choose...</option>
    </b-form-select>

    <label class="mr-sm-2" for="field" style="font-size:13px">应用领域</label>
    <b-form-select
      class="mb-2 mr-sm-4 mb-sm-0"
      :value="null"
      v-model="form.field"
      :options="fields"
      id="field"
      style="font-size:13px;width:15%"
    >
      <option slot="first" :value="null">Choose...</option>
    </b-form-select>  

    <label class="mr-sm-2" for="keyword" style="font-size:13px">关键词</label>
    <b-form-input
      id="keyword"
      class="mb-2 mr-sm-4 mb-sm-0"
       v-model="form.keyword"
      placeholder="输入关键词"
       style="font-size:13px;width:15%"
    ></b-form-input>   
   
    <b-button type="submit" variant="primary" style="font-size:13px;width:7%" >点击查询</b-button>
  </b-form>
</div>

</br>      
</br> 

<div class="table-responsive table-hover table-sm" style="height:auto;">
             <table class="table">
            
  <thead>
    <tr>
      <th scope="col">序号</th>
      <th scope="col" style="width:40%;text-align:center">文章名</th>
      <th scope="col">文章期刊</th>
      <th scope="col">学科</th> 
      <th scope="col" >操作</th>
    </tr>
  </thead>
  <tbody>   
    <tr v-for="item in items">
        <th scope="row">{{item.id}}</th>
        <td style="width:40%;text-align:center">{{item.name}}</td>
        <td>{{item.journal}}</td>
        <td>{{item.subject}}</td>
        <td> <b-button variant="danger" style="font-size:13px;margin:auto;" @click="deletepaper(item.paperid)">delete</b-button></td>
    </tr>
  
  </tbody>
            </table>
                </div>   

                <div>
        <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item"><a class="page-link" @click="pag('first')">第一页</a></li>      
    <li v-for="n in limitpage"  v-if = "(currentpage+n)>0&&(currentpage+n)<=maxpage"  @click="pag(currentpage + n)"><span class="page-link">{{currentpage + n}}</span></li>
    <li class="page-item"><a class="page-link" @click="pag('end')">最后一页</a></li>
  </ul>
</nav>

    </div>      
     </div>
</div>
</template>


<script>
  export default {
      name: 'findtext',
       data() {
      return {
          form:{
              subject:null,
              field:null,             
              keyword:""
          },    
          fields:[],
          subjects:[],   
          limitcontent:13,
          items: [],
          currentpage:1,
          maxpage:0,
          limitpage:[-2,-1,0,1,2],
      }
    },
     mounted(){

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

      },
 methods: {
      onSubmit(evt) {
        evt.preventDefault()
        console.log(JSON.stringify(this.form))
     
        var ID=1 
        var paper = []
        this.$http.get("http://202.202.5.140:81/paper/paper/?domain"+this.form.field+"&subject="+this.form.subject+"&limit="+this.limitcontent,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
          console.log(response);      
            var pag =Math.ceil(response.body.count / this.limitcontent) ;             
           console.log("maxpage",pag);
             this.maxpage = pag;          
          response.body.results.forEach(element => {   
                 paper.push({id:(this.currentpage-1)*this.limitcontent+ID,name:element.paper_title,journal:element.journal,paperid:element.id,subject:element.subject_name});
                 ID=ID+1;             
          });
          this.items=paper;
          console.log("papers",this.items);

          },function(){
          alert('请求失败！');
        });
      },

       pag(data){
            console.log(this.currentpage);
            var off=0;
            var ID=1;
            if(data=="first"){
                off=0;
                this.currentpage=1;
            }else if(data == "end"){
                off=(this.maxpage-1)*this.limitcontent;
                this.currentpage=this.maxpage;
            }else{
                off = (data-1)*this.limitcontent;
                this.currentpage = data;
            }
            var pap = [];
              var path = "http://202.202.5.140:81/paper/paper/?domain"+this.form.field+"&subject="+this.form.subject+"&limit="+this.limitcontent+"&offset="+off;
              this.$http.get(path,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {      
                response.body.results.forEach(element => {       
                 pap.push({id:(this.currentpage-1)*this.limitcontent+ID,name:element.paper_title,journal:element.journal,paperid:element.id,subject:element.subject_name});
                 ID=ID+1;              
          });
           this.items=pap;              
            console.log("papers",this.items);    
            },function(){
                 alert("语料显示错误");
      });           
        },

        deletepaper:function(data){
          this.$http.delete("http://202.202.5.140:81/paper/paper/"+data,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
            alert("删除成功");
            this.pag(this.currentpage);
          },function(){
            alert("删除语料的失败");
          })
        },
 } 
      
  }
</script>

<style>

.findtext{
    height:100%;
    width:100%
}

.find{
  background-color:white;
  height:auto;
  width:auto;
  margin-left:2%;
  padding:2%  
}



</style>