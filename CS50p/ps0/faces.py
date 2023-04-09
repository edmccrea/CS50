emojis = {
    ':)': '😀',
    ':(': '😞',
}

input = input("Write something here with a smiley or frowny face: \n")
strings = input.split(' ')
for emoji in emojis:
    if emoji in strings:
        strings[strings.index(emoji)] = emojis[emoji]

output = ' '.join(strings)

print(f"Here's your string: {output}")
