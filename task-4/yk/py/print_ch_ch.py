def print_common_chinese():
    l, r = 0x4e00, 0x9fa5
    i = l - 1
    while i < r + 1:
        j = i + 100 if i + 100 <= r + 2 else r + 2
        print(list(map(chr, [code for code in range(i, j)])))
        i = j

def main():
    print_common_chinese()

if __name__ == '__main__':
    main()