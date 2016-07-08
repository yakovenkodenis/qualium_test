export function validateUrl(str) {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    return str.match(regex) !== null;
}

export function validateUrlImage(str) {
    const endsWithImgFormat = (str.match(/\.(jpeg|jpg|gif|png)$/) !== null);
    return validateUrl(str) && endsWithImgFormat;
}

export function validateEmail(str) {
    const expression = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const regex = new RegExp(expression);
    return str.match(regex) !== null;
}
