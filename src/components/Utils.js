export function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

export function match(text, words) {
    let found = false;
    if (words) {
        words.split(' ').forEach(word => {
            if (text.match(new RegExp('(\\w*'+ word +'\\w*)','gi'))) {
                found = true;
            }
        });
    }
    return found;
}
