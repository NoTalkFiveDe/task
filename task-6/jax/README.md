## 简介

这是一个用 `python` 编写的简单区块链项目，区块链服务器运行在本地指定的端口上，需要通过 `HTTP` 请求与之交互，也可以通过封装好相应请求的 `Shell` 脚本进行交互，使用方法见下文。  

强烈推荐阅读原教程：[从零到一用 Python 写一个区块链](https://juejin.cn/post/6844903508060143630#heading-13)  

## 使用方法

### 1. 启动区块链服务

1. blockchain.py:  
    ```bash
    # 在本地（127.0.0.1:port）启动区块链结点
    py blockchain.py [port]
    ```

2. mine.sh:  
    ```bash
    # 用 localhost:port 挖一个区块
    .\mine.sh <port>
    ```

3. new_transaction.sh:  
    ```bash
    # 在 localhost:port 创建一笔新的交易
    .\new_transaction.sh <port>
    ```

4. register.sh:  
    ```bash
    # 在 localhost:server_port 上登记 localhost:neighbour_port
    .\register.sh <neighbour_port> <server_port>
    ```

5. resolve.sh:  
    ```bash
    # 为结点 localhost:port 解决冲突
    # 也就是用所在网络里的所有结点的最长有效区块链更新自身
    .\resolve.sh <port>
    ```

### 2. 查看区块链

一个结点的区块链可以通过浏览器访问 `node/chain` 获取，例如：`localhost:5000/chain`。  

也可以通过 `cURL` 获取：  
```bash
curl "localhost:5000/chain"

# 示例输出
{"chain":[{"index":1,"previous_hash":1,"proof":100,"timestamp":1619015964.2798216,"transactions":[]}],"length":1}
```

## 完整参考
[从零到一用 Python 写一个区块链](https://juejin.cn/post/6844903508060143630#heading-13)