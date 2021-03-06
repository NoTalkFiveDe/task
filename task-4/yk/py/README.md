## 凯撒密码
想在命令行玩凯撒密码？试试运行 `caesar_code.py`。

## 简介
Python 的特点：
1. 适合写脚本  
2. 拥有高级的内置数据类型  
3. 允许划分程序模块  
4. 是解释型语言，可以节省编译和连接的时间  
5. 书写紧凑易读  
6. 可以使用其他语言编写的扩展  

## 变量
1. Python 的变量是动态类型，可以在运行时改变变量的类型；  
    也是强类型语言，因为 Python 倾向于不对变量的类型做隐式转换。  

2. 变量类型：  
    | 常用类型 | 描述 |
    |--------|------|
    | None | 空 |
    | int | 整型 |
    | bool | 布尔型 |
    | float | 双精度浮点型 |

    | 不可变序列 | 描述 |
    |----------|-----|
    | str | 字符串 |
    | | 元组 |
    | | 字节串 |

    | 可变序列 | 描述 |
    |--------|------|
    | | 列表 |
    | | 字节数组 |

    | 集合类型 | 描述 |
    |--------|------|
    | set | 集合 |
    | frozenset | 冻结集合 |

    | 映射 | 描述 |
    |-----|-----|
    | | 字典 |

3. 是值传递  

4. 时间函数：  
    | time 库 | 返回值 |
    |--------|------|
    | time | 时间戳小数 |
    | gmtime | 时间元组 |
    | localtime | 时间元组 |
    | 

    | calendar 库 | 返回值 |
    |------------|-------|
    | timegm | 自纪元以来的秒数 |

5. 字符串的实现方式是不可变的列表  

## 容器
1. 种类：  
    1. list（有序可修改）
    2. tuple（有序不可修改）
    3. dict（无序可修改）

2. 可用 `for ... in` 遍历，或容器方法遍历  

3. 等号是直接传递引用，使用 `copy` 方法是浅复制，深复制使用 `copy.deepcopy(XX)`  

4. 序列化使用 `json.dumps()`，反序列化使用 `json.loads()`  

5. 常用 `count()`，`index()`  

## 抽象

1. 使用 `def` 定义函数  

2. 可设置默认参数，不支持同名函数，支持运算符重载，使用 `*` 向函数传递任意数量的值，`**` 向函数传递任意数量的键值对  

3. 支持类和对象  

4. 可多重继承，接口需提前声明  

5. 设计模式待学习  

## 函数式编程

## 内置高级功能