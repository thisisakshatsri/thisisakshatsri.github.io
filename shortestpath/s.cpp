#include<bits/stdc++.h>
using namespace std;
int main() {
    string s;
    cin>>s;
        reverse(s.begin(), s.end());
        int start = 0;
        int end = 0;
        for(int i=0; i<s.size(); i++) {
            if(s[i] == '.'){
                end=i;
                reverse(s.begin()+start, s.begin()+end);
                start = end+1;
            }
        }
        cout<<s<<endl;
        reverse(s.begin()+start, s.end());
        cout<<s<<endl;
    return 0;
}