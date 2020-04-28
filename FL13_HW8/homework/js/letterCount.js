function letterCount (str, count) {
    return str.split('').reduce((acc, ch) => ch.toLowerCase() === count.toLowerCase() ? acc + 1: acc, 0)
}
letterCount();