from string_helper import sentence_shift as ss

def code(s: str, shift: int = 0):
    return ss(s, shift)

def decode(s: str, shift: int = 0):
    return ss(s, -shift)

def rot13(s: str):
    return code(s, 13)

def get_input(s: str):
    ret = None
    while not ret:
        ret = input(s)
        print()
    return ret

def code_msg():
    msg = get_input('请输入要加密的原文：')
    shift = int(get_input('请输入加密位移：'))
    print('加密后的密文是：' + code(msg, shift) + '\n')

def decode_msg():
    code = get_input('请输入要解密的密文：')
    shift = int(get_input('请输入加密位移：'))
    print('解密出的原文是：' + decode(code, shift) + '\n')

def try_decode():
    code = get_input('请输入尝试解密的密文：')
    shift = 0
    while True:
        msg = decode(code, shift)
        print('当前猜测的加密位移是：', shift)
        print('猜测的原文是：' + msg)
        some_input = get_input('是否正确？\nY：正确；N：错误\n')
        # print()
        if some_input in ['Y', 'y']:
            print('加密位移是：' + str(shift))
            print('原文是：' + msg, '\n')
            break
        shift = (shift + 1) % 26

def launch_menu():
    print('请输入数字选择：')
    while True:
        selection = get_input('1：加密原文；2：解密密文；3：尝试解密密文\n')
        if selection == '1':
            code_msg()
        elif selection == '2':
            decode_msg()
        else:
            try_decode()
        want_again = input('再玩一次？\nY\\N\n')
        if want_again != 'Y' and want_again != 'y':
            break


def main():
    print('欢迎来到凯撒密码小游戏：）')
    launch_menu()

if __name__ == '__main__':
    main()
