# task
> 用于存放各自在完成任务时的一些代码或笔记，方便交流。  

**大家有好的想法都可以写到文档里告诉大家**  

## 注意
**请先看完文档再提交代码！**  

GitHub 的默认分支现在变成了 `main` 而不是 `master`，望周知。  

为了避免过多的冲突，在修改代码前一定要新建一个分支提交，再在本地 `merge` 到 `main`，最后再推送到远程仓库的 `main` 分支。  

## 推荐的工作流程（待完善）
1. 使用 SSH 克隆到本地：  
    ```bash
    git clone git@github.com:NoTalkFiveDe/task.git
    ```
2. 新建本地分支并切换：  
    ```bash
    git switch -c local # 或 git checkout -b local
    ```
3. 修改文件、暂存、提交：  
    ```bash
    # 添加或修改一些文件
    git add <some file>
    git commit -m <some information>
    ```
4. 测试没问题后合并到主分支：  
    ```bash
    git switch main # 或 git checkout main
    git merge local
    # 处理一些冲突
    ```
5. 推送到远程仓库：  
    ```bash
    # 可能需要先拉取远程仓库数据，但不是必须的
    # 千万不要使用 -f 参数推送到远程仓库
    git push -u origin main # 记录默认仓库和分支
    # 或
    git push # 有默认值后就可以直接使用了
    ```

## 规范
仓库的目录结构以任务划分，每个任务有一个 `task-x` 目录，在 `task-x` 目录下再根据使用人创建一个使用人的目录，如 `yk`。这样大家就可以在同一个仓库同一个分支工作而互不影响。  

你也可以在远程仓库新建一个你的分支，但是除了特殊原因不推荐这么做，因为这样大家就看不到各自最新的代码了。  

### 1. 命名规范
所有的文件名都推荐使用*小写字母*，分隔单词推荐使用*短横线*“-”，不推荐使用*空格*和*下划线*“_”，更不应该出现*中文*，原因参见[关于大小写和空格的提示](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/Dealing_with_files#%E5%85%B3%E4%BA%8E%E5%A4%A7%E5%B0%8F%E5%86%99%E5%92%8C%E7%A9%BA%E6%A0%BC%E7%9A%84%E6%8F%90%E7%A4%BA)。  

### 2. 文档规范
排版请参照[中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines/blob/master/README.zh-CN.md#%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%88%E6%8E%92%E7%89%88%E6%8C%87%E5%8C%97)。  

注意在文档里添加适当的空行增加可读性，一般一个空行就足够了。  

## 仓库目录结构
1. [task-1（安装 Linux 操作系统）](task-1)  

2. [task-2（GitHub Pages）](task-2)  

3. [task-3（程序逻辑与操作系统原理）](task-3)  

4. [task-4（编程语言）](task-4)  