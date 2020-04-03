import json
import urllib.request
import requests


def request(action, **params):
    return {'action': action, 'params': params, 'version': 6}


def invoke(action, **params):
    requestJson = json.dumps(request(action, **params)).encode('utf-8')
    response = json.load(urllib.request.urlopen(
        urllib.request.Request('http://localhost:8765', requestJson)))
    if len(response) != 2:
        raise Exception('response has an unexpected number of fields')
    if 'error' not in response:
        raise Exception('response is missing required error field')
    if 'result' not in response:
        raise Exception('response is missing required result field')
    if response['error'] is not None:
        raise Exception(response['error'])
    return response['result']


result = invoke('findCards', query="deck:current")

cards_info = invoke('cardsInfo', cards=result)

print(cards_info[0]['fields']['Khmer']['value'])
print(cards_info[0]['fields']['English']['value'])

all_words_file = open("all-words.txt", "w+", encoding="utf8", errors="ignore")
success_words_file = open("success-words.txt", "w+",
                          encoding="utf8", errors="ignore")
fail_words_file = open("fail-words.txt", "w+",
                       encoding="utf8", errors="ignore")

success_word_dict = {}
fail_word_dict = {}

for card in cards_info:
    all_words_file.write(
        "{}/{} ".format(card['fields']['Khmer']['value'], card['fields']['English']['value']))

    url = "https://kheng.info/static/dictionary/audio/{}.mp3".format(
        card['fields']['Khmer']['value'])

    if requests.head(url).status_code == 200:
        success_word_dict[card['fields']['Khmer']['value']
                          ] = card['fields']['English']['value']
        print('succesfully added {}'.format(
            card['fields']['English']['value']))

    else:
        fail_word_dict[card['fields']['Khmer']['value']
                       ] = card['fields']['English']['value']
        print('succesfully added {}'.format(
            card['fields']['Khmer']['value']))

    break

success_words_file.write(json.dumps(success_word_dict, ensure_ascii=False))
fail_words_file.write(json.dumps(fail_word_dict, ensure_ascii=False))
print(success_word_dict)
print(fail_word_dict)
