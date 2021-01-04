## 任务要求
我把任务要求的 JS 用法都在 [task-4.js](task-4.js) 里简单地写了一下。  

## 凯撒密码
因为 Node.js 读取命令行输入比较麻烦，所以我用了网页来实现。  

网页的代码需要部署到服务器上才能正常，所以我就没把代码复制过来了，直接贴链接。  

[网页链接](https://jaxvanyang.github.io/jekyll-site/web-study/caesar-code/)  

[源码链接](https://github.com/JaxVanYang/jekyll-site/tree/main/web-study/caesar-code)  

仓库里的文件是按照标准的网页要求分文件夹存放的，源码在链接里的 `script/` 文件夹里，网页是通过 `index.html` 引入 JS 脚本做到的交互  

另外我也把用到的 JS 脚本复制到了当前的文件夹下，它们躺在 `module\` 下，扩展名都是 `.mjs`，因为 ES6 要求网页引入的脚本必须采用这种 `module JS` 的模块扩展名  

里面的 `StringHelper.mjs` 是用来处理字符串的，因为凯撒密码涉及到字符的变化，所以写了这个模块方便操作  

`CaesarCode.mjs` 则是对 `StringHelper.mjs` 做了一层封装，其中定义的函数对字符串的操作只符合凯撒密码的加密规则  

`CaesarCodeApp.mjs` 就是最终实现消息循环的模块，只要调用其中的 `launchMenu()` 就可以实现一个消息循环的凯撒密码小游戏了  

`main.mjs` 才是 `index.html` 引入的脚本，它通过将网页里的按钮的点击函数 `onclick` 设置成 `CaesarCodeApp.launchMenu()`，实现了点击就能调用消息循环：  
```js
const buttonStart = document.querySelector('button')
buttonStart.onclick = () => CaesarCodeApp.launchMenu()
```