

Vue.filter('date',time=>moment(time).format('YYYY-MM-DD'));

// 新建一个Vuejs实例
var app = new Vue({
  el: '#notebook',
  data() {
    return {
      content:localStorage.getItem('content') || 'You can write in ** markdown**',
      // 笔记数组  从localStorage中加载保存的笔记列表
      notes:JSON.parse(localStorage.getItem('notes'))||[],
      // JSON.parse(localStorage.getItem('notes'))||[],
      // 选中笔记的ID
      selectedId:localStorage.getItem('selected-id')||NULL,
      
      // 此处代码为修改selectedNote.content的underfine问题所写
      // selectedNote:{ content:localStorage.getItem('content') || 'You can write in ** markdown**'}
    }
},
watch:{
  // 侦听content数据，
  // 1，简易写法
  content:'saveNote' ,
  //2.详细写法
  // content:{
  //   handler(val){
  //     console.log(val,'new value');
  //     localStorage.setItem('content2',val)
  //   }
  // } 
  // 3.
  // content:{
  //   handler:
  //   'saveNote'
  // } 
  // // 监听notes的变化，并存储 注此处需要深度监听，因为notes是对象
  notes:{
    // 方法名
    handler:'saveNotes',
    // 需要使用该选项来侦听数组中每个笔记属性的变化
    deep:true,
  },
  // // 保存选中项
  selectedId(val){
    localStorage.setItem('selected-id',val)
  }
},
methods:{ 
 saveNote(val){
  console.log('saving note:',this.content);
  localStorage.setItem('content',val)
  this.reportOperation('saving')
 },
 reportOperation(opName){
  console.log("The",opName, 'opration was completed !');
 },
 addNote:function(){
  // 用一些默认值添加一条笔记，并将其添加到笔记数组中
    const time = Date.now()
    //新笔记的默认值
    const note ={
      id:String(time),
      title: 'New note ' + (this.notes.length +1),
      content:'**Hi!** This notebook is using [markdown] for formatting!',
      created:time,
      favorite:false,
    }  
    // 添加到列表中
    this.notes.push(note)
},
// // 点击时选择笔记
selectNote(note){
  this.selectedId =note.id
  console.log('笔记点击',this.selectedId);
  console.log('selectedNote的内容：',this.selectedNote.content,this.selectedId,this.selectedNote);
},
// // 保存不同的数组
saveNotes(){
  // 在存储之前不用忘记把对象转换为JSON字符串，因为localStorage API 只能接受字符串
  localStorage.setItem('notes',JSON.stringify(this.notes))
  console.log('Notes saved',new Date());
},
// 删除组件
removeNote(){
  if(this.selectedNote && confirm('Delete the note ?')){
    // 将选中的笔记从笔记列表中移除
    const index = this.notes.indexOf(this.selectedNote)
    if(index !=-1){
      this.notes.splice(index,1)
    }
  }
},
// 收藏功能
favoriteNote(){
  this.selectedNote.favorite = !this.selectedNote.favorite
},
},

created(){
  // 将content设置为存储的内容
  // 如果没有保存任何内容，则将设置为一个默认字符串
  this.content = localStorage.getItem('content') || 'You can write in ** markdown**'
  
},
computed:{
  notePreview(){
    // markdown 渲染成html
    // return marked.parse(this.content)
    // 在预览框中的内容
    return this.selectedNote ? marked.parse(this.selectedNote.content) : ''
  },
  addButtonTitle(){
    return this.notes.length == 0 ? 'click  and add note': this.notes.length + ' notes already'
  },
  // 返回与selectedID匹配的笔记  返回的是一组note
  selectedNote(){
    // 返回与selected匹配的笔记
    return this.notes.find(note => note.id === this.selectedId);
  },
  // 排序功能
  sortedNotes(){
    return this.notes.slice().sort((a,b)=>a.created - b.created)
    .sort((a,b)=>(a.favorite ===b.favorite)? 0:a.favorite?-1:1)
  },
  // 计算行数
linesCount() {
  if (this.selectedNote) {
  // 计算换行符的个数
  return this.selectedNote.content.split(/\r\n|\r|\n/).length
    }
  },
  // 计算字数
  wordsCount() {
    if (this.selectedNote) {
    var s = this.selectedNote.content
    // 将换行符转换为空格
    s = s.replace(/\n/g, ' ')
    // 排除开头和结尾的空格
    s = s.replace(/(^\s*)|(\s*$)/gi, '')
    // 将多个重复空格转换为一个
    s = s.replace(/\s\s+/gi, ' ')
    // 返回空格数量
    return s.split(' ').length
  } 
},
charactersCount() {
if (this.selectedNote) 
{
return this.selectedNote.content.split('').length
}
}}
})
/*
Vue.createApp({
  data() {
      return {
        // content:localStorage.getItem('content') || 'You can write in ** markdown**',
        // 笔记数组  从localStorage中加载保存的笔记列表
        notes:JSON.parse(localStorage.getItem('notes'))||[],
        // JSON.parse(localStorage.getItem('notes'))||[],
        // 选中笔记的ID
        selectedId:null||localStorage.getItem('selected-id')
        // localStorage.getItem('selected-id') 
      }
  },

  watch:{
    // 侦听content数据，
    // 1，简易写法
    content:'saveNote' ,
    //2.详细写法
    // content:{
    //   handler(val){
    //     console.log(val,'new value');
    //     localStorage.setItem('content2',val)
    //   }
    // } 
    // 3.
    // content:{
    //   handler:
    //   'saveNote'
    // } 
    // // 监听notes的变化，并存储
    // notes:{
    //   // 方法名
    //   handler:'saveNotes',
    //   // 需要使用该选项来侦听数组中每个笔记属性的变化
    //   deep:true,
    // },
    // // 保存选中项
    // selectedId(val){
    //   localStorage.setItem('selected-id',val)
    // }
  },
  methods:{ 
   saveNote(val){
    console.log('saving note:',this.content);
    localStorage.setItem('content',val)
    this.reportOperation('saving')
   },
   reportOperation(opName){
    console.log("The",opName, 'opration was completed !');
   },
   addNote:function(){
    // 用一些默认值添加一条笔记，并将其添加到笔记数组中
      const time = Date.now()
      //新笔记的默认值
      const note ={
        id:String(time),
        title: 'New note ' + (this.notes.length +1),
        content:'**Hi!** This notebook is using [markdown] for formatting!',
        created:time,
        favorite:false,
      }  
      // 添加到列表中
      this.notes.push(note)
  },
  // // 点击时选择笔记
  selectNote(note){
    this.selectedId =note.id
    console.log('笔记点击',this.selectedId);
    console.log('selectedNote的内容：',this.selectedNote.content,this.selectedId,this.selectedNote);
  },
  // // 保存不同的数组
  // saveNotes(){
  //   // 在存储之前不用忘记把对象转换为JSON字符串，因为localStorage API 只能接受字符串
  //   localStorage.setItem('notes',JSON.stringify(this.notes))
  //   console.log('Notes saved',new Date());
  // },
  // 删除组件
  },


  created(){
    // 将content设置为存储的内容
    // 如果没有保存任何内容，则将设置为一个默认字符串
    this.content = localStorage.getItem('content') || 'You can write in ** markdown**'
    // this.selectedNote.content = localStorage.getItem('content') || selectedNote();
  },
  computed:{
    notePreview(){
      // markdown 渲染成html
      // return marked.parse(this.content)
      // 在预览框中的内容
      return this.selectedNote ? marked.parse(this.selectedNote.content) : ''
    },
    addButtonTitle(){
      return this.notes.length == 0 ? 'click  and add note': this.notes.length + ' notes already'
    },
    // 返回与selectedID匹配的笔记  返回的是一组note
    selectedNote(){
      // 返回与selected匹配的笔记
      return this.notes.find(note => note.id === this.selectedId);
    }
  },

}).mount('#notebook') */
  