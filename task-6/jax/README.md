## 使用方法

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

## 完整学习参考
[从零到一用 Python 写一个区块链](https://juejin.cn/post/6844903508060143630#heading-13)