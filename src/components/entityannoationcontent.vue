<template>
<div id="entityannoationcontent" > 

    <!-- 5、很多细节问题：选择区域是否有效 在makelabel时要考虑的    -->
    
 <div class="entityannoation">
     <h6><b>实体人工标注</b></h6>
     </br>

      <div class="row entitycontent">   
           <div class="leftcontent ">            
           <!-- 共多少多少条 -->
           <div class="inline">
               <div >
           <p style="font-size:17px;color:green">您人工实体标注的任务共有{{maxcount}}条</p> </div>
          <div style="margin-bottom:13px;"> <button class="btn-sm" @click="shaixuan()">点击筛选未标注的</button>    </div>  
</div>
    <div>

    <ul class="grocery">
        <li v-for="item in groceryList" :id="item.id" @click="showtext({id:item.id,sub:item.sub,dom:item.dom,job:item.job_id,sta:item.sta})">{{item.sta == true ? "√" : "×"}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.te}}
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

            <div class="rightcontent">
              <div style="border:2px solid grey;padding:10px;height:20%;background-color: royalblue;" class="is-grouped">        
         
                <div v-for="label in labelList" class="control" >
                <button type="button" class="btn btn-sm"  :style="label.styleObject" @click="makelabel({para:label.paragraph,lab:label.id,sty:label.styleObject})">{{label.lab}}&nbsp;&nbsp;&nbsp;{{label.shortcut}}</button>    
               </div>            
            
        </div>
      
             <div id="textare" style="height:70%;padding-top:20px;border:1px solid grey;padding-left:20px;padding-right:20px;" @mouseup="txt($event)">
        <span v-for="item in texta" :key="item.itemid" :style="item.styleObject" :value="item.itemid" :class="item.class">{{item.value}}<button type="button" class="btn btn-sm" aria-label="Close" v-if="item.shows" @click="del(item.id)">
                <img src="../../static/icon.png" aria-hidden="true" style="height:10px;weight:10px"></img> 
            </button>
        </span >
                                 
         </div>  

         <div style="padding-top:20px" class="row">         
        <button type="button" class="btn-sm" style="float:left" @click.prevent="pre()">
         < 上一个      
        </button>
         <button type="button" class="btn-sm" style="margin:auto" @click="modelannoation({text:textb,id:currentparagraph})">
         点击进行模型预标注            
        </button>
        <button type="button" class="btn-sm" style="float:right" @click.prevent="next()">
         下一个 >          
        </button>


             </div>     
                  </div>
                </div>     
       </div>

    </div>
</div>
</template>

<script>
  export default {
      name: 'entityannoationcontent',   
      data(){         
        return{              
            enti:[],
            range:[],
            texta:[],
            textb:"",
            startOffset:0,
            endOffset:0,
            currentpage:1,
            currentparagraph:0,
            limitpage:[-2,-1,0,1,2],
            limitcontent:15,
            job_id:1,
            status:false,
            sta:"",
           
            groceryList:[],
            labelList:[],
            maxpage:0,
            maxcount:0,
           
        }        
      },
      computed:{

      },
       watch:{
          enti : function () {
              this.texta.splice(0);

              var position = 0;
              var len = this.textb.length;
              var itemid=0;

            //   console.log("now",this.enti);   

              this.enti.forEach(element => {
                  var position2 = parseInt(element.startposition) ;
                  var position3 = parseInt(element.endposition) ;
                   if(position2 == position){
                       this.texta.push({"styleObject":element.styleObject,"value":element.value,"shows":true,"id":element.id,"itemid":itemid,"class":"text"});
                       itemid = itemid + 1;
                       position = position3;
                   }else{
                    this.texta.push({"styleObject":"","value":this.textb.slice(position,position2),"shows":false,"id":0,"itemid":itemid,"class":"text"})
                    itemid = itemid +1;
                    position=position3;
                   this.texta.push({"styleObject":element.styleObject,"value":element.value,"shows":true,"id":element.id,"itemid":itemid,"class":"text"})
                   itemid = itemid +1 ;
                   };                   
              });            

              if(position != len){
                      this.texta.push({"styleObject":"","value":this.textb.slice(position,len),"shows":false,"id":0,"itemid":itemid,"class":"text"})
                   };   
           
              console.log(this.texta)
          },
      
      },

      methods:{   
          shaixuan(){
              this.sta=false;
                var path = "http://202.202.5.140:81/job/job_user/?job=1&status="+this.sta+"&limit="+this.limitcontent;
              this.$http.get(path,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
                              //  用于个别用户查看自己的标注任务     
            this.maxcount=response.body.count;
             var pag =Math.ceil(response.body.count / this.limitcontent) ;             
             console.log("maxpage",pag);
             this.maxpage = pag;   
              });
              this.pag("first");
          },
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
                    this.showtext({id:this.groceryList[i+1]['id'],sub:this.groceryList[i+1]['sub'],dom:this.groceryList[i+1]['dom'],job:this.groceryList[i+1]['job_id'],sta:this.groceryList[i+1]['sta']});
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
                    this.showtext({id:this.groceryList[i-1]['id'],sub:this.groceryList[i-1]['sub'],dom:this.groceryList[i-1]['dom'],job:this.groceryList[i-1]['job_id'],sta:this.groceryList[i-1]['sta']});
                    };                  
                };
                
            }
          },

    // 页码栏跳转
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
              var path = "http://202.202.5.140:81/job/job_user/?job=1&status="+this.sta+"&limit="+this.limitcontent+"&offset="+off;
              this.$http.get(path,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
             //  用于个别用户查看自己的标注任务      
            response.body.results.forEach(element => {
                textannoation.push({sta:element.status,te:element.paragraph_content,id:element.paragraph,sub:element.subject,dom:element.domain,job_id:element.id})   
            });  
            this.groceryList=textannoation;  
            
            if(button_pag=="pre"){
                 this.showtext({id:this.groceryList[this.groceryList.length-1]['id'],sub:this.groceryList[this.groceryList.length-1]['sub'],dom:this.groceryList[this.groceryList.length-1]['dom'],job:this.groceryList[this.groceryList.length-1]['job_id'],sta:this.groceryList[this.groceryList.length-1]['sta']});
            }else if(button_pag=="next"){
                this.showtext({id:this.groceryList[0]['id'],sub:this.groceryList[0]['sub'],dom:this.groceryList[0]['dom'],job:this.groceryList[0]['job_id'],sta:this.groceryList[0]['sta']});                
            }else{
                 this.showtext({id:this.groceryList[0]['id'],sub:this.groceryList[0]['sub'],dom:this.groceryList[0]['dom'],job:this.groceryList[0]['job_id'],sta:this.groceryList[0]['sta']});
            }
            
            console.log("任务",this.groceryList);              
            
            },function(){
                 alert("任务显示错误");
      });           
        },

    // 输入页码跳转
         trip:function(){
              var trip_page=parseInt(document.getElementById("trips").value);  
              this.pag(trip_page);
              console.log("跳转页为",this.currentpage);
          },

    // 获得选择区域起始、终止位置
        txt(event){
           
            let start;
         let end;      

      if (window.getSelection) {
        const range = window.getSelection().getRangeAt(0);
        const preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(event.currentTarget);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        start = [...preSelectionRange.toString()].length;
        end = start + [...range.toString()].length;
      } else if (document.selection && document.selection.type !== 'Control') {
        const selectedTextRange = document.selection.createRange();
        const preSelectionTextRange = document.body.createTextRange();
        preSelectionTextRange.moveToElementText(event.currentTarget);
        preSelectionTextRange.setEndPoint('EndToStart', selectedTextRange);
        start = [...preSelectionTextRange.text].length;
        end = start + [...selectedTextRange.text].length;
      }
      
    // 确定有效边界
      for(let i = 0;i<this.range.length;i++){
           console.log(this.range[i][0],this.range[i][1]);
           if(end>this.range[i][0]&end<this.range[i][1]&start>this.range[i][0]&start<this.range[i][1]){
               end=0;start=0;
           }else if(end>this.range[i][0]&end<this.range[i][1]){
              end=this.range[i][0];
            //   console.log("end",end);
          }else if(start>this.range[i][0]&start<this.range[i][1]){
              start=this.range[i][1];
            //   console.log("start",start);
          }else if(start<this.range[0][0]&end>this.range[this.range.length-1][1]){
              end=0;start=0;
          };
      }

      this.startOffset = start;
      this.endOffset = end;
      console.log(this.startOffset, this.endOffset); 
 
          },

          //点击左侧需标注段落列表，刷新右侧文本及标签  还要请求entity
          showtext:function(data){
             this.enti.splice(0);
             this.range.splice(0);
              this.texta.splice(0);   
             this.currentparagraph=data.id;  
             this.job_id=data.job;     
             this.status=data.sta;
             this.textb="";
            
             console.log("status",this.status); 

              console.log("标注的第几个文本任务",this.job_id);
               this.$http.get("http://202.202.5.140:81/paper/paragraph/"+data.id,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
                  
                   this.textb=response.body.paragraph_content;
                   this.texta.push({"styleObject":"","value":this.textb,"shows":false,"id":0})
                   },function(){ 
                       alert('请求标注文本失败！');
                });  
                
               var labels=[];
             this.$http.get("http://202.202.5.140:81/job/label/?job=1&subject="+data.sub+"&domain="+data.dom,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
          
            response.body.forEach(element => {
                labels.push({id:element.id,lab:element.name,shortcut:element.shortcut,styleObject:{"background-color":element.background_color,"color":element.text_color,"margin":"auto"},paragraph:data.id})
            });
            this.labelList=labels;

               },function(){
             alert('请求标签失败！');
               });

                var entis=[];
                var ranges=[];
               this.$http.get("http://202.202.5.140:81/job/entity/?ordering=start_offset&paragraph="+data.id,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
                  
                   response.body.forEach(element=>{
                        this.$http.get("http://202.202.5.140:81/job/label/?id="+element.label,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response2)=>{
                            
                            var styy = {"background-color":response2.body[0].background_color,"color":response2.body[0].text_color};                           
                            entis.push({"styleObject":styy,"startposition":element.start_offset,"endposition":element.end_offset,"value":element.name,"shows":true,"id":element.id,"para":element.paragraph});
                            ranges.push([element.start_offset,element.end_offset]);
                            this.sort(entis);
                        },function(){
                            alert("请求该段落对应实体css失败");
                        });                        
                   });    
               this.range=ranges;   
                console.log("range",this.range);
               },function(){
                    alert('请求该段落对应实体失败！');
               })
          },

    // 给实体排序以正确的显示标注文本区域
          sort:function(data){
            var min;
            for(var i=0; i<data.length; i++){
                for(var j=i; j<data.length;j++){
                    if(data[i].startposition>data[j].startposition){
                      min=data[j];
                      data[j]=data[i];
                      data[i]=min;
                    }                   
                }
            };
            this.enti=data;           
          },

    // 实体标注函数
        makelabel:function(data){      
            if(this.endOffset!=0){
                 var txtt = this.textb.slice(this.startOffset,this.endOffset);

                this.$http.post("http://202.202.5.140:81/job/entity/",{name:txtt,start_offset:this.startOffset,end_offset:this.endOffset,paragraph:data.para,label:data.lab},{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{                    
                    console.log("成功",this.startOffset,this.endOffset,txtt);
                     this.enti.push({"styleObject":data.sty,"startposition":this.startOffset,"endposition":this.endOffset,"value":txtt,"shows":true,"id":response.data.id,"para":data.para});    
                     this.range.push([this.startOffset,this.endOffset]);   
                     this.sort(this.enti);              
                },function(){
                    alert("上传实体失败");
                });                 
                
                  this.$http.get("http://202.202.5.140:81/job/job_user/"+this.job_id+"/set_status_true",{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
                      console.log("更新为已标注");
                  },function(){
                    alert("标注状态2更新错误");
                  })
                         
            }else{
                alert("请选择文本进行标注");
            }
           
          },

    // 删除实体函数
           del(data){
              this.$http.delete("http://202.202.5.140:81/job/entity/"+data,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
                 this.enti=this.enti.filter(function(item){
                     return item.id != data
                  });
                  if(this.enti.length==0){

                  this.$http.get("http://202.202.5.140:81/job/job_user/"+this.job_id+"/set_status_false",{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
                      console.log("更新为未标注");
                  },function(){
                    alert("标注状态1更新错误");
                  });
                  };              
              },function(){
                  console.log("删除实体失败")
              })      
          },     

            //   模型预标注函数
          modelannoation:function(data){           

              console.log(data);
              this.enti.splice(0);
              this.range.splice(0);
              this.$http.get("http://202.202.5.140:81/job/entity/?paragraph="+data.id,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
                  console.log(response.body);
                  response.body.forEach(element => {
                      console.log(element.id);
                      this.$http.delete("http://202.202.5.140:81/job/entity/"+element.id,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
                          console.log("原标注实体删除成功"+element.id);
                      },function(){
                          alert("原标注实体删除失败")
                      })
                  });
              });

              this.$http.get("http://39.100.48.36:3000/predict_ner?sentence="+data.text,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{               
                var entis=[];
                console.log("model",response.body.entities);
                response.body.entities.forEach(element => {
                    console.log(element);
                    
                    var style = this.labelList.filter(function(item){
                        return item.id==element.tag
                    });

                    if(style.length==0){
                        console.log("未找到实体");
                    }else{
                       console.log("entity",style[0].styleObject);

                    this.$http.post("http://202.202.5.140:81/job/entity/",{name:element.entity,start_offset:element.begin,end_offset:element.end+1,paragraph:this.currentparagraph,label:element.tag,user:2},{headers:{Authorization:' Token 88f7d403e81c77c2a9f018f193c201b9e969c54f'}}).then((response)=>{                    
                    console.log("成功",element.begin,element.end+1);
                     this.enti.push({"styleObject":style[0].styleObject,"startposition":element.begin,"endposition":element.end+1,"value":element.entity,"shows":true,"id":response.data.id,"para":data.para});      
                     this.range.push([element.begin,element.end+1]);
                     this.sort(this.enti);              
                },function(){
                    alert("上传实体失败");
                });     
                    }                    
                    
                });
              },function(){
                  alert("模型预标注失败");
              });

               this.$http.get("http://202.202.5.140:81/job/job_user/"+this.job_id+"/set_status_true",{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response)=>{
                      console.log("更新为已标注");
                  },function(){
                    alert("标注状态2更新错误");
                  })
          },
      },

      mounted(){            
            // 初始化第一页任务
             var textannoation=[];
              var path = "http://202.202.5.140:81/job/job_user/?job=1&status="+this.sta+"&limit="+this.limitcontent;
              this.$http.get(path,{headers:{Authorization:window.localStorage.getItem('Authorization')}}).then((response) => {
                              //  用于个别用户查看自己的标注任务     
                console.log(response);
            this.maxcount=response.body.count;
             var pag =Math.ceil(response.body.count / this.limitcontent) ;             
             console.log("maxpage",pag);
             this.maxpage = pag;     
            response.body.results.forEach(element => {
                textannoation.push({sta:element.status,te:element.paragraph_content,id:element.paragraph,sub:element.subject,dom:element.domain,job_id:element.id})   
            });  
            this.groceryList=textannoation;     
            this.showtext({id:this.groceryList[0]['id'],sub:this.groceryList[0]['sub'],dom:this.groceryList[0]['dom'],job:this.groceryList[0]['job_id'],sta:this.groceryList[0]['sta']});   
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
                     _self.makelabel({para:_self.currentparagraph,lab:labe[0].id,sty:labe[0].styleObject});
                }
            }
      }
   
  }
</script>

<style>

.entityannoationcontent{
    height:100%;
    width:100%
}

.entityannoation{
  background-color:white;
  height:auto;
  width:auto;
  margin-left:2%;
  padding:2%;
  min-height:500px;
}

.entitycontent{   
    width:100%
}

.leftcontent{
    width:35%;
    margin-left:1%;
    height:auto
    
}

.rightcontent{
    width:61%;
     margin-left:3%;     
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
</style>