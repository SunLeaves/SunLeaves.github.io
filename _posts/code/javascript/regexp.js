var re = null, i

for (i = 0; i < 10; i++) {
    re = /cat/g
    console.log(re.test('catastroneafdfdh'))
}

for (i = 0; i < 10; i++) {
    re = new RegExp('cat', 'g')
    console.log(re.test('catastroneafdfdh'))
}
