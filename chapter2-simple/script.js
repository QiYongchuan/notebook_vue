// New VueJS instance
new Vue({
  name: 'notebook',

  // 创建实例，并挂载
  el: '#notebook',

  // Some data
  data () {
    return {
      // content: 'This is a note',
      // content: localStorage.getItem('content') || 'You can write in **lmarkdown**',
      notes:[],
      selectedId:null,
    }
  },

    // Computed properties
    computed: {
      selectedNote(){
        return this.notes.find(note => note.id === this.selectedId)
        },
      noteProview(){
        //将markdown渲染成HTML
          // return marked.parse(this.content)
        // return this.selectedNote && this.selectedNote.content ? marked.parse(this.selectedNote.content) : ''
         return this.selectedNote ? marked.parse(this.selectedNote.content):''
      },
      // 找出选中的笔记，返回Id与selectedId 相同的笔记； 选择笔记中id与刚刚存起来的id相同的一项
     
    },

  // Change watchers
  // watch: {
  //    content: 'saveNote',
  // },

  // watch:{
  //   content:{
  //     handler(val,oldval){
  //       console.log('val,oldval监听中');
  //      this.saveNote();
  //     }
  //   }
  // },

  methods: {
   
    //  saveNote (val) {
     
    //   localStorage.setItem('content', this.content)
    //    this.reportOperation('saving')
    //  },

    selectedNotetest(){
      let test= this.notes.find(note => note.id === this.selectedId)
      console.log('testselecteddNode',test);
      // console.log('note.id',note.id);
      console.log('s.id',this.selecteId);
      console.log("notes",this.notes);
      },


   
    reportOperation (opName) {
      console.log('The', opName, 'operation was completed!')
    },
    tellmeNotesNum(){
      return this.notes.length + 'note(s) already'
    },

    addNote(){
      const time = Date.now()
      const note = {
        id: String(time),
        title:"New note" + (this.notes.length + 1),
        content:'**Hi** This notebook is using [markdown](https://gith)for formatting!',
        created:time,
        favorite:false,
      }
      this.notes.push(note)
      console.log("push");
      console.log("notes1",this.notes);
        // // Select
        // this.selectNote(note)
    },
    // 此方法的功能是根据点击，判断出点击的是哪一个笔记，并把该笔记的id，赋值给selectedId 存起来
    selectNote(note){
      this.selectedId = note.id
      console.log("selectedId:", this.selectedId);
      console.log("notes:", this.notes);
      console.log(`现在点击的笔记的note.id是${note.id}and selectedNode is ${ this.selectedId}`);
    },
  
  },

  // 钩子函数 在实例准备就绪之后调用，此时实例还没有挂载到DoM中
   created () {

    this.selectedNotetest();
    // if (this.notes.length > 0) {
    //   this.selectedId = this.notes[0].id;
    // }
    this.content = localStorage.getItem('content') || 'You can write in **this.markdown**';

    // 如果笔记数组为空，则添加一条默认笔记
  // if (this.notes.length === 0) {
  //   this.addNote();
  // }
  }, 
})

