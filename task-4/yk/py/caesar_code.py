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
    return ret

def code_msg():
    msg = get_input('请输入要加密的原文：')
    shift = int(get_input('请输入加密位移：'))
    print('加密后的密文是：' + code(msg, shift))

def decode_msg():
    code = get_input('请输入要解密的密文：')
    shift = int(get_input('请输入加密位移：'))
    print('解密出的原文是：' + decode(code, shift))

def try_decode():
    code = get_input('请输入尝试解密的密文：')

def main():
    decode_msg()

if __name__ == '__main__':
    main()
