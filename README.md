# notebook_vue
source code

markdown的笔记代码，基于vue2

- 目前实现的效果如图所示

![image](https://user-images.githubusercontent.com/105039020/233316367-ec530711-1649-4508-afef-4f7a85a3577e.png)

-本仓库上传了项目的代码，但是想基于github的page页面实现这个项目的部署，可以在线使用，但是目前没有成功。

因为整个项目是手动创建的，现在还不清楚在不用npm run build 进行打包的操作的情况下，该怎么处理:) 

这个项目算是第一个完整的简单的vue项目，其中遇到了不少的困难。第一次做是22年10月份，卡在了两个地方：
一是在某一步时，执行删除操作，最后竟然把所有的数据全部删完了，最后无法回退到前一步的代码。（今天读了一篇git版本控制的文章，才恍然大悟！ 原来git是干这个的，版本控制，像闯关一样保存一下，保存关卡，怪掉了，退回前一关）
但当时不会，半夜程序崩溃了懊恼不已，经过大概几天，才慢慢解决那个bug。

第二个地方是到了最后一步，样式怎么也调不好了。很无奈，经过几天的挣扎，依然没有调好，最终算是烂尾结束了.....

最近又重新敲这个项目，这次依然不是那么顺利。卡在了这一步：

```
  selectedNote(){
    // 返回与selected匹配的笔记
    return this.notes.find(note => note.id === this.selectedId);
  },
  
 ```
存在一个问题是无法返回数据，因为notes里面没有note数据. notes的数据是通过addNote函数点击之后才生成的，我的理解是点击之后就会生成，生成之后就可以选择出点击的哪一条了，也就有数据了.....

但是逻辑上应该是：在没有点击之前，笔记也会有一条默认笔记的，所以不是undefine的。【这应该也是书上代码设计的最初逻辑】

但现在的问题是默认值没有生效，没有默认的笔记，所以在index中，如果展示selectedNote.content的时候，是报错的。打在控制台中的notes this.selectedId 均是undefined，在点击之后才出现有效的笔记，这下又回到最开始那个理解了

这个问题是这几天遇到的，但是没有解决掉。将这一版的代码也上传一下，先继续做别的项目吧，先暂时不想继续处理这个bug了，有点精疲力尽了。

现在上传的源码是之前样式调整不好的那一版代码，今天将样式调整了一下，修改成了固定高度。

```
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
```
