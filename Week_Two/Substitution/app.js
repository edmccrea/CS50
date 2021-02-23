let testKey = 'YTNSHKVEFXRBAUQZCLWDMIPGJO';
let 
let subStr = '';

function sub(str, key) {
    str = str.split('');
    key = key.split('');

    for (let charOne in str){
        let strChar = str[charOne].charCodeAt(0);
        console.log(strChar)
        for (let charTwo in key){

        }
    }
    
    for (let charTwo in key){
        let keyChar = key[charTwo].charCodeAt(0);
        console.log(keyChar)
        // if (strChar >= 65 && strChar <= 90){
        //     strChar += keyChar;
        // } else  if (strChar >= 97 && strChar <= 122){
        //     strChar += keyChar;
        // }
    }
        // subStr += String.fromCharCode(strChar);
}

sub('Testing', testKey)

console.log(subStr)