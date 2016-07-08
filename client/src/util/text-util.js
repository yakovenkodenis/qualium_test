
// Cuts the provided string argument and adds '...'
// after the n-th character. The function can make use
// of word boundaries in order to leave the words uncut.
export function truncate(str, n = 300, useWordBoundary = true) {
    let isTooLong = str.length > n,
        s_ = isTooLong ? str.substr(0, n - 1) : str;
    s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
    return isTooLong ? s_ + ' ...' : s_;
}
