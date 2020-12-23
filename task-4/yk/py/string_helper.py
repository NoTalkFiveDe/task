_A, _Z, _a, _z = 65, 90, 97, 122

def is_char(ch: str):
    return len(ch) == 1

def is_upper(ch: str):
    if not is_char(ch):
        return False
    code = ord(ch)
    return _A <= code and code <= _Z

def is_lower(ch: str):
    if not is_char(ch):
        return False
    code = ord(ch)
    return _a <= code and code <= _z

def is_letter(ch: str):
    return is_char(ch) and (is_upper(ch) or is_lower(ch))

def update_shift(shift: int):
    return (shift % 26 + 26) % 26

def char_shift(ch: str, shift: int = 0):
    if not is_char(ch):
        return ' '  # TODO(Jax): add exception
    return chr(ord(ch) + shift)

def letter_shift(ch: str, shift: int = 0):
    if not is_char(ch):
        return ' '
    if not is_letter(ch):
        return ch
    shift = update_shift(shift)
    code = ord(ch) + shift
    if ((is_lower(ch) and code > _z) or (is_upper(ch) and code > _Z)):
        code -= 26
    return chr(code)

def str_shift(s: str, shift: int = 0):
    arr = list(s)
    for i in range(len(s)):
        arr[i] = char_shift(arr[i], shift)
    return ''.join(arr)

def sentence_shift(s: str, shift: int = 0):
    arr = list(s)
    shift = update_shift(shift)
    for i in range(len(s)):
        arr[i] = letter_shift(arr[i], shift)
    return ''.join(arr)

def is_digit(ch: str):
    if not is_char(ch):
        return False
    code = ord(ch)
    return 30 <= code and code <= 39

def text_analyze(s: str):
    l, r = 0x4e00, 0x9fa5
