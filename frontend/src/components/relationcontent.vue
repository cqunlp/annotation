<template>
<div id="relationcontent" >   
    <!-- 发布前要注意Job改为2!!!! -->
 <div class="entityrelation">
     <h6><b>实体关系人工标注</b></h6>
     </br>

      <div class="row relationcontent">   
           <div class="leftrelation ">    
           <p style="font-size:17px;color:green">您人工实体关系标注的任务共有{{maxcount}}条，选择任务点击开始标注</p>   
    <div>

    <ul class="grocery">
        <li v-for="item in groceryList" @click="getentity({id:item.id,sub:item.sub,dom:item.dom,job:item.job_id})">{{item.te}}
            </li>
        </ul>
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

    <div class="input-group" style="width:50%;margin:auto">
  <div class="input-group-prepend">
    <button class="btn btn-outline-secondary" type="button"  @click="trip()">跳转</button>
  </div>  
  <input type="text" id="trips" class="form-control" placeholder="请输入跳转页码" aria-describedby="button-addon1">

</div>
           
               </div>

            <div class="rightrelation">    

                <b-row class="my-1">
    <b-col sm="5">
      <label for="input-small">请输入您界定的实体最大间距：</label>
    </b-col>
    <b-col sm="7">
      <b-form-input v-model="distance" placeholder="100"></b-form-input>
    </b-col>
  </b-row>

               
                </br>    
      
             <div id="textare" style="height:auto;padding-top:20px;padding-bottom:20px;border:1px solid grey;padding-left:20px;padding-right:20px;">
         <span v-for="item in texta" :style="item.styleObject" :value="item.itemid">{{item.value}}</span >
                                 
         </div>  

      </br>
             <div class="table-responsive table-hover" style="height:auto;">
             <table class="table">
            
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">实体1名称</th>
      <th scope="col">实体1开始位置</th>
      <th scope="col">实体2名称</th>
      <th scope="col">实体2开始位置</th>
      <th scope="col">实体关系</th>
      <th scope="col" style="width:40%;text-align:center">操作</th>
    </tr>
  </thead>
  <tbody>   
    <tr v-for="item in tabledata" @mouseover="cons({entity1_id:item.entity1_id,entity2_id:item.entity2_id,ID:item.ID})" >
        <th scope="row">{{item.ID+1}}</th>
        <td>{{item.entity1_value}}</td>
        <td>{{item.entity1_startposition}}</td>
        <td>{{item.entity2_value}}</td>
        <td>{{item.entity2_startposition}}</td>
        <td :id="item.ID">{{item.relation == "" ? "不设关系" : item.relation}}</td>
        <td style="width:40%">
                <button  v-for="label in labelList" type="button" class="btn-sm"  style="margin-left:10px;margin-bottom:10px;" @click="makerelation({id:label.id,entity1_id:item.entity1_id,entity2_id:item.entity2_id,ID:item.ID,name:label.lab})">{{label.lab}}&nbsp;&nbsp;&nbsp;{{label.shortcut}}</button>    
               </td>
    </tr>
  
  </tbody>
            </table>
                </div>             
                  </div>

                </div>     
       </div>

    </div>
</div>
</template>

<script>
  export default {
      name: 'relationcontent',   
      data(){         
        return{              
            enti:[],
            tabledata:[],
            texta:[],
            textb:"",
            startOffset:0,
            endOffset:0,
            currentpage:1,
            currentparagraph:0,
            limitpage:[-2,-1,0,1,2],
            limitcontent:15,
            job_id:1,
            shortcutentity1:0,
            shortcutentity2:0,
            shortcutID:0,
            // groceryList: [{id:1,sta:false,te:'aaa'},{id:2,sta:true,te:'bbb'}],
            // labelList: [{id:1, lab:'label1', shortcut:'1',styleObject:{"background-color":"black","color":"white","font-size":"13px","margin":"auto"}},
            //             {id:2, lab:'label2',shortcut:'2',styleObject:{"background-color":"white","color":"black","font-size":"13px","margin":"auto"}}],
            groceryList:[],
            labelList:[],
            maxpage:0,
            maxcount:0,
            index:0,
            distance:100,
            // job_id:0,
            // sub:0,
            // dom:0,
            // para_id:0,
        }        
      },
     

      methods:{    
          //   下一段标注文本
        next(){
            for(let i =0;i<this.groceryList.length;i++){
                if(this.groceryList[i].job_id==this.job_id){
                    console.log(this.groceryList[i]);
                    if(i==this.groceryList.length-1){
                        if(this.currentpage!=this.maxpage){
                            this.pag(this.currentpage+1,"next"); 
                        }                    
                    }else{                  
                    this.getentity({id:this.groceryList[i+1]['id'],sub:this.groceryList[i+1]['sub'],dom:this.groceryList[i+1]['dom'],job:this.groceryList[i+1]['job_id']});
                    };      
                    break;              
                };
                
            }
          },

    // 上一段标注文本
          pre(){
            for(let i =0;i<this.groceryList.length;i++){
                if(this.groceryList[i].job_id==this.job_id){
                    console.log(this.groceryList[i]);
                    if(i==0){
                        if(this.currentpage!=1){
                           this.pag(this.currentpage-1,"pre");    
                        }                                     
                    }else{                     
                    this.getentity({id:this.groceryList[i-1]['id'],sub:this.groceryList[i-1]['sub'],dom:this.groceryList[i-1]['dom'],job:this.groceryList[i-1]['job_id']});
                    };                  
                };
                
            }
          },        

        pag(data,button_pag){
            console.log(this.currentpage);
            var off=0;
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
            var textannoation=[];
              var path = "http://202.202.5.140:81/job/job_user/?job=2&limit="+this.limitcontent+"&offset="+off;
              this.$http.get(path,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
             //  用于个别用户查看自己的标注任务      
            response.body.results.forEach(element => {
                textannoation.push({sta:element.status,te:element.paragraph_content,id:element.paragraph,sub:element.subject,dom:element.domain,job_id:element.id})   
            });  
            this.groceryList=textannoation;   

           if(button_pag=="pre"){
                 this.getentity({id:this.groceryList[this.groceryList.length-1]['id'],sub:this.groceryList[this.groceryList.length-1]['sub'],dom:this.groceryList[this.groceryList.length-1]['dom'],job:this.groceryList[this.groceryList.length-1]['job_id']});
            }else if(button_pag=="next"){
                this.getentity({id:this.groceryList[0]['id'],sub:this.groceryList[0]['sub'],dom:this.groceryList[0]['dom'],job:this.groceryList[0]['job_id']});                
            }else{
                 this.getentity({id:this.groceryList[0]['id'],sub:this.groceryList[0]['sub'],dom:this.groceryList[0]['dom'],job:this.groceryList[0]['job_id']});
            };
              
            console.log("任务",this.groceryList);              
            
            },function(){
                 alert("任务显示错误");
      });
        },

         trip:function(){
              var trip_page=parseInt(document.getElementById("trips").value);  
              this.pag(trip_page);
              console.log("跳转页为",this.currentpage);
          },

          //点击左侧需标注段落列表，刷新右侧文本及标签  还要请求entity
          getentity:function(data){

              console.log("entity更新",data);
             this.enti.splice(0);             
              this.tabledata.splice(0);  
               this.texta.splice(0);   
               this.job_id=data.job;           
                this.currentparagraph=data.id;        
           
              console.log("标注的第几个文本任务",data.job);
               this.$http.get("http://202.202.5.140:81/paper/paragraph/"+data.id,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
                  
                   this.textb=response.body.paragraph_content;      
                   this.texta.push({"styleObject":"","value":this.textb});    
                   },function(){ 
                       alert('请求标注文本失败！');
                });  
                
               var labels=[];
             this.$http.get("http://202.202.5.140:81/job/label/?job=2&subject="+data.sub+"&domain="+data.dom,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
          
            response.body.forEach(element => {
                labels.push({id:element.id,lab:element.name,shortcut:element.shortcut,styleObject:{"background-color":element.background_color,"color":element.text_color,"font-size":"13px","margin":"auto"},paragraph:data.id})
            });
            this.labelList=labels;

               },function(){
             alert('请求标签失败！');
               });

               var entis=[];
               
               this.$http.get("http://202.202.5.140:81/job/entity/?ordering=start_offset&paragraph="+data.id,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
                //   console.log("aa",response.body.length);
                 this.index = response.body.length;
                 console.log(response.body);
                 response.body.forEach(element=>{                                                  
                            entis.push({"startposition":element.start_offset,"endposition":element.end_offset,"value":element.name,"shows":true,"entityid":element.id,"para":element.paragraph});                            
                            
                   });  
                   this.enti=entis;  
                   this.table(entis,this.index,this);
                   console.log("实体",this.enti);     

               },function(){
                    alert('请求该段落对应实体失败！');
               });

              
          },

           table:function(datas,indexx,that){
               console.log("distance",this.distance);
               var data2=[]; 
               if(datas.length==indexx){
                   var ID=0;                              
               for(let i=0; i<datas.length-1; i++){
                for(let j=i+1; j<datas.length;j++){
                    
                    that.$http.get("http://202.202.5.140:81/job/relation/?entity1="+datas[i].entityid+"&entity2="+datas[j].entityid,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
                        if((datas[j]['startposition']-datas[i]['startposition'])<=this.distance){
                            if(response.body.length == 1){                         
                       
                            var labelitem = this.labelList.filter(function(item){
                                return item.id==response.body[0].label
                            });
                            console.log("labelitem",labelitem);
                            
                                data2.push({"entity1_id":datas[i]['entityid'],"entity1_startposition":datas[i]['startposition'],"entity1_value":datas[i]['value'],"entity2_id":datas[j]['entityid'],"entity2_startposition":datas[j]['startposition'],"entity2_value":datas[j]['value'],"ID":ID,"relation":labelitem[0]['lab']});                                                       
                            
                         }else{
                             data2.push({"entity1_id":datas[i]['entityid'],"entity1_startposition":datas[i]['startposition'],"entity1_value":datas[i]['value'],"entity2_id":datas[j]['entityid'],"entity2_startposition":datas[j]['startposition'],"entity2_value":datas[j]['value'],"ID":ID,"relation":""});
                         };
                         ID=ID+1;
                         }
                         
                    });     
                }
            };
            that.tabledata=data2;     
            console.log("table",that.tabledata);      
               }              
          },     

            cons:function(data){      
                
                this.shortcutentity1=data.entity1_id;
                this.shortcutentity2=data.entity2_id;
                this.shortcutID=data.ID;
              
                var position=this.textb.length;
           console.log("hover",data);
            var entity1=this.enti.filter(function(item){
                return item.entityid==data.entity1_id;
            });
            console.log("entity1",entity1);
            var entity2=this.enti.filter(function(item){
                return item.entityid==data.entity2_id;
            });
            console.log("entity2",entity2);

             this.texta.splice(0);

              this.texta.push({"styleObject":"","value":this.textb.slice(0,entity1[0]['startposition'])});
                this.texta.push({"styleObject":"color:red;font-size:20px","value":this.textb.slice(entity1[0]['startposition'],entity1[0]['endposition'])});
                this.texta.push({"styleObject":"","value":this.textb.slice(entity1[0]['endposition'],entity2[0]['startposition'])});
                this.texta.push({"styleObject":"color:blue;font-size:20px","value":this.textb.slice(entity2[0]['startposition'],entity2[0]['endposition'])});
                this.texta.push({"styleObject":"","value":this.textb.slice(entity2[0]['endposition'],position)});          
                          
            },            

        makerelation:function(data){
            document.getElementById(data.ID).innerHTML=data.name;
          this.$http.get("http://202.202.5.140:81/job/relation/?entity1="+data.entity1_id+"&entity2="+data.entity2_id,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
              if(response.body.length==1){
                  this.$http.delete("http://202.202.5.140:81/job/relation/"+response.body[0].id,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
                      this.$http.post("http://202.202.5.140:81/job/relation/",{entity1:data.entity1_id,entity2:data.entity2_id,label:data.id},{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{                    
                    console.log("成功",data.id);
                              
                },function(){
                    alert("更新关系失败");
                });   
                  },function(){
                      alert("删除关系失败 http://202.202.5.140:81/job/relation/"+response.body[0].id);
                  })
              }else{
                  this.$http.post("http://202.202.5.140:81/job/relation/",{entity1:data.entity1_id,entity2:data.entity2_id,label:data.id},{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{                    
                    console.log("成功",data.id);
                              
                },function(){
                    alert("上传关系失败");
                });                       
              }
          })


            },
                
      },

      mounted(){            
            // 初始化第一页任务
             var textannoation=[];
              var path = "http://202.202.5.140:81/job/job_user/?job=2&limit="+this.limitcontent;
              this.$http.get(path,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
                              //  用于个别用户查看自己的标注任务     
            this.maxcount=response.body.count;
             var pag =Math.ceil(response.body.count / this.limitcontent) ;             
             console.log("maxpage",pag);
             this.maxpage = pag;     
            response.body.results.forEach(element => {
                textannoation.push({sta:element.status,te:element.paragraph_content,id:element.paragraph,sub:element.subject,dom:element.domain,job_id:element.id})   
            });  
            this.groceryList=textannoation;   
            this.getentity({id:this.groceryList[0]['id'],sub:this.groceryList[0]['sub'],dom:this.groceryList[0]['dom'],job:this.groceryList[0]['job_id']});     
            console.log("任务",this.groceryList);                    
          
            },function(){
                 alert("任务显示错误");
      });           

      },
      
    // 快捷键函数
      created(){
          var _self = this;
            document.onkeydown = function(e){
                var key = window.event.keyCode;
                if(key == 37){
                    _self.pre();
                }else if(key == 39){
                    _self.next();
                }else if(key >=65 & key <= 90){                   
                     var ascii = key+32;
                     var zimu = String.fromCharCode(ascii); 
                     var labe = _self.labelList.filter(function(item){
                         return item.shortcut == zimu;                         
                     });
                     console.log(labe);
                     _self.makerelation({id:labe[0].id,entity1_id:_self.shortcutentity1,entity2_id:_self.shortcutentity2,ID:_self.shortcutID,name:labe[0].lab});
                }
            }
      }
   
  }
</script>

<style>

.relationcontent{
    height:auto;
    width:100%
}

.entityrelation{
  background-color:white;
  height:auto;
  width:auto;
  margin-left:2%;
  padding:2%;
  min-height:500px;
}

.relationcontent{   
    width:100%
}

.leftrelation{
    width:25%;
    margin-left:1%;
    height:auto
    
}

.rightrelation{
    width:71%;
     margin-left:3%;
     height:auto;
     
}

.grocery{
    min-height:400px;    
}

.grocery li {   
    overflow: hidden;
    white-space: nowrap; 
    line-height:30px;
    text-overflow: ellipsis;
    font-size:15px;
    background-color:#F5F7FA;
   border-style:solid;
    border-width:1px;
    border-color:white;
    -webkit-user-select:none;
   -moz-user-select:none;
   -ms-user-select:none;
   user-select:none;    
}

.grocery li:hover {  
    background-color:Gainsboro;
    
}

ul {
    padding-inline-start: 0px;
}

.control{
  
    font-size: 1rem;
    position: relative;
    text-align: left;
    margin-left:10px;
    margin-bottom:10px;

}

.is-grouped {
    display: flex;
    justify-content: flex-start;  
    flex-wrap: wrap;
}

table tbody {
        display: block;
        height: 400px;
        overflow-y: scroll;
    }
    
    table thead{
        display: table;
       
        
    }
/*滚动条默认宽度是16px 将thead的宽度减16px*/
    table thead {
        width: calc( 100% - 1em);
    }
</style>