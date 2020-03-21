<template>
  <div id="allocate">
       <navbar></navbar>
       </br>   
      
       <div class="content">   
           <div id="joballocate"  > 
 <div class="alloca" id="alloca">
   <div>
     <h5><b>任务分配</b></h5>
     </div>
<div class="row">

     <div class="leftcont">
 <div>
    <b-form @submit="onSubmit" v-if="show" style="font-size:15px">  
      <div class="row">
      <div class="three">
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
      
   <div class="three">
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

            <div class="three">
 <label class="mr-sm-2" for="input-3">任务类型</label>
    <b-form-select
      class="mb-2 mr-sm-5 mb-sm-0"
      v-model="form.job"
      :value="null"
      :options="jobs"
      id="input-3"
      style="font-size:13px"
    >
      <option slot="first" :value="null" >Choose...</option>
    </b-form-select>  
           </div>  
      <div class="three" style="padding-top:4%;padding-left:2%">       
        <b-button type="submit" variant="primary" style="font-size:13px;margin:auto;">筛选</b-button>    
          </div>   
           </div>
</br>     
    
    </b-form>
    </div>

    <input type="checkbox" style="margin-left:10px" id="all"><label>&nbsp;全选</label>
       
    <div class="table-responsive table-hover" style="min-height:500px;padding:1%">

       <table class="table table-striped table-sm">
          <thead>
    <tr>
      <th scope="col">操作</th>
      <th scope="col">序号</th>  
      <th scope="col" style="width:85%;text-align:center">文章标题</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="item in papers">
        <td style="text-align:center"><input :disabled="item.status" type="checkbox" :id="item.paperid"></td>
        <td style="text-align:center">{{item.id}}</td>      
        <td style="width:85%;text-align:center">{{item.title}}</td>
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

  <div class="rightcont">
    <h6><b>可分配人员</b></h6>
    </br>
    <div>
     <b-form-group>
      <b-form-checkbox-group
        v-model="selected"
        :options="user"  
        stacked       
      ></b-form-checkbox-group>
    </b-form-group>
      </div>
      </br>
        <b-button variant="primary" style="font-size:13px;margin:auto;" @click="box()">选择</b-button>
        </br>

        <p style="color:red">分配任务正在进行：已分配  {{number}}  个</p>
      </div> 

       
             </div>
    
    </div>
  
</div>

       </div>
  </div>
</template>

<script>

export default {
  name: 'allocate', 
   data() {
      return {
        file: null,
        file2: null,
         form: {        
          subject: null,
          field:null,
          job:null, 
          
        },
        subjects: [],
        fields:[],
        jobs:[{text:"实体标注",value:"1"},{text:"关系标注",value:"2"}],
        show: true,
        papers:[],
        limitcontent:50,
        maxpage:0,
        checks:[],
        currentpage:1,
        limitpage:[-2,-1,0,1,2],
 
        patched_entity:[],
        patched_relation:[],
        user:[],
       selected:[],
       number:0
      }
    },
   
    methods: {    
      onSubmit(evt) {
         evt.preventDefault();
         console.log(JSON.stringify(this.form));
        //  查看已分配任务
         
        
        // 显示未分配任务
        var pap = [];
        var ID=1;      
        this.$http.get("http://202.202.5.140:81/paper/paper/?&domain"+this.form.field+"&subject="+this.form.subject+"&limit="+this.limitcontent,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
          var pag =Math.ceil(response.body.count / this.limitcontent) ;     
          this.left = response.body.count % this.limitcontent;        
           console.log("maxpage",pag);
             this.maxpage = pag;          
          response.body.results.forEach(element => {  
            if(this.form.job==1){
              var patch = this.patched_entity.filter(function(item){
                return item == element.id
              });
            }else{
               var patch = this.patched_relation.filter(function(item){
                return item == element.id
              });
            };
              
              if(patch.length == 0){
                 pap.push({id:(this.currentpage-1)*this.limitcontent+ID,paperid:element.id,title:element.paper_title,status:false});
                 ID=ID+1;
              }else{
               pap.push({id:(this.currentpage-1)*this.limitcontent+ID,paperid:element.id,title:element.paper_title,status:true});
                 ID=ID+1;
              };   
          });
          this.papers=pap;
          console.log("papers",this.papers);
        },function(){
          alert("请选择学科领域");
        });

        // this.pag("first");

        // 全选
         var Input = document.getElementsByTagName("input");   
         var limit = this.limitcontent;
          Input[0].onclick = function(){
            console.log("check",limit);
           for(var i=1;i<limit+1;i++){                   
                   if(Input[i].disabled==true){                     
                   }else{
                     Input[i].checked=this.checked;
                   }
              
            }
          };  
      },

      fresh(){
         var dispatch=[];
          this.$http.get("http://202.202.5.140:81/job/dispatched/?job="+this.form.job,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{          
          response.body.forEach(element => {           
            dispatch.push(element.paper);
          });
          this.patched=dispatch;
          console.log("dispatched",dispatch);
        });        
         var Input = document.getElementsByTagName("input");   
          var num = (this.currentpage==this.maxpage) ? (this.left+1):(this.limitcontent+1);
          for(var i=0;i<num;i++){
              Input[i].checked=null;
            }
      },

       pag(data){
            this.fresh();
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
                if(this.form.job==1){
              var patch = this.patched_entity.filter(function(item){
                return item == element.id
              });
            }else{
               var patch = this.patched_relation.filter(function(item){
                return item == element.id
              });
            };

              if(patch.length == 0){
                 pap.push({id:(this.currentpage-1)*this.limitcontent+ID,paperid:element.id,title:element.paper_title,status:false});
                 ID=ID+1;
              }else{
                pap.push({id:(this.currentpage-1)*this.limitcontent+ID,paperid:element.id,title:element.paper_title,status:true});
                 ID=ID+1;
              };   
          });
           this.papers=pap;              
            console.log("任务",this.papers);    
            },function(){
                 alert("任务显示错误");
      });           
        },

        box(){
          console.log("user",this.selected);
          this.number=0;
        if(this.selected.length == 0){
          alert("请选择人员进行分配");
        }else{
          console.log(this.selected);
          for(var j = 0 ;j<this.selected.length;j++){
            console.log(this.selected[j]);
             var Input = document.getElementsByTagName("input");  
             var num = (this.currentpage==this.maxpage) ? (this.left+1):(this.limitcontent+1);
           console.log("num",num);
             for(var i =1;i<num;i++){
            if(Input[i].checked == true){
              console.log("selectpaper",Input[i].id);
              this.$http.get("http://202.202.5.140:81/job/job_user/Dispatchjob/?job_id="+this.form.job+"&user_id="+
              this.selected[j]+"&paper_id="+Input[i].id,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
                  console.log(response);
                this.number=this.number+1;
              },function(){
                alert("任务分配失败")
              })
           }
        };  
         this.pag(this.currentpage);
          }     
         
         } 
        }
    },    

    mounted(){

      this.$http.get("http://202.202.5.140:81/paper/subject/",{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
         
          var sub=[]
          response.body.forEach(element => {
            sub.push({text:element.name,value:element.id})
          });
          sub.push({text:"全部",value:""});
          this.subjects=sub;         

          },function(){
          alert('请求失败！');
        });

   this.$http.get("http://202.202.5.140:81/paper/domain/",{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
         
          var fie=[]
          response.body.forEach(element => {
            fie.push({text:element.name,value:element.id})
          });
          fie.push({text:"全部",value:""});
          this.fields=fie;         
          },function(){
          alert('请求失败！');
        });

     this.$http.get("http://202.202.5.140:81/user/user/?is_staff=false",{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
          console.log(response.body);
       
          var users=[]
          response.body.forEach(element => {
            users.push({text:element.username,value:element.id})
          });          
          this.user=users;         
          },function(){
          alert('请求失败！');
        });

      var dispatch=[];
          this.$http.get("http://202.202.5.140:81/job/dispatched/?job=1",{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{          
          response.body.forEach(element => {           
            dispatch.push(element.paper);
          });
          this.patched_entity=dispatch;
          console.log("dispatched",dispatch);
        },function(){
          alert("实体分配显示错误");
        });

         var dispatch2=[];
          this.$http.get("http://202.202.5.140:81/job/dispatched/?job=2",{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{          
          response.body.forEach(element => {           
            dispatch2.push(element.paper);
          });
          this.patched_relation=dispatch2;
          console.log("dispatched",dispatch2);
        },function(){
          alert("关系分配显示错误");
        });


      },


}

</script>

<style>
.content{   
    width:90%;
    height:100%;    
    margin:auto;
}

.joballocate{
  height:100%;
  width:100%;
}

.alloca{
  background-color:white;
  height:100%;
  width:100%;
  min-height:800px;
  padding:2%  
}

.leftcont{
  width:60%;
   padding-left:2%;
   padding-top:1%;
  
   margin-right:5%;
}

.rightcont{
   width:35%;
   padding-left:5%;
   padding-top:1%;
border-left:grey solid
}

.three{
     width:25%;
   padding-left:2%;
   padding-top:1%
}



</style>
