/*
 * Useage: caesar_code <string for code> [shift for code (default is 0)]
 *
 * Effect: output a string which is coded by Caesar Code
 *
 * Note: this program only make shift on alphabet character
 */

#include <iostream>
using namespace std;    // TODO: remove using namespace

inline char code(char ch, int shift) {
    shift = ((shift % 26) + 26) % 26;   // in case of negative shift and overflow
    if (isupper(ch)) {
        return 'A' + (ch - 'A' + shift) % 26;
    } else if (islower(ch)) {
        return 'a' + (ch - 'a' + shift) % 26;
    } else {
        return ch;
    }
}

string code(const string &s, int shift) {
    string ret = s;
    shift %= 26;    // in case of overflow
    shift = (shift + 26) % 26;  // in case of negetive shift
    cout << "equivalent shift = " << shift << endl;
    // use anonymous function to avoid redundant % 26 operation
    // maybe you could use a private function _safe_code instead
    auto code = [&](char ch) {
        if (isupper(ch)) {
            return char('A' + (ch - 'A' + shift) % 26);
        } else if (islower(ch)) {
            return char('a' + (ch - 'a' + shift) % 26);
        } else {
            return ch;
        }
    };
    for (auto &ch : ret) {
        ch = code(ch);
    }
    return ret;
}

int main(const int argc, const char *argv[]) {
    // TODO: write a exception here to handle parameter missing
    const string &s = argv[1];
    const int shift = stoi(argv[2]);

   cout << code(s, shift) << endl; 
}
