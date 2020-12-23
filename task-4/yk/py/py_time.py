import time

# current_time = time.time()  # 获取当前时间戳，以秒为单位的浮点数
# print(current_time)

localtime = time.localtime(time.time()) # 根据时间戳转换为时间元组
print(time.localtime()) # 默认根据当前时间生成
print(localtime)

# format_time = time.asctime(localtime)   # 根据时间元组获取可读时间
# print(format_time)
# print(time.asctime())

print(time.gmtime())
