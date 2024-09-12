import json
filename1 = input('first filename: ')
filename2 = input('second filename: ')
file1 = open(filename1, 'r', encoding='utf-8')
file2 = open(filename2, 'r', encoding='utf-8')

first_language = json.load(file1)
second_language = json.load(file2)

for category in first_language:
    if not category == 'nicknames':
        for entry in first_language[category]:
            if entry not in second_language[category]:
                print(f'{category}:{entry} not in {filename2}')