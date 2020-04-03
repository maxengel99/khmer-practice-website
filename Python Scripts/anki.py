import json
import urllib.request
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

lock = threading.Lock()


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


def check_url(card, success_word_dict, fail_word_dict):
    url = "https://kheng.info/static/dictionary/audio/{}.mp3".format(
        card['fields']['Khmer']['value'])

    status = requests.head(url).status_code
    try:
        lock.acquire()
        if status == 200:
            success_word_dict[card['fields']['Khmer']['value']
                              ] = card['fields']['English']['value']
            print('added to success list {}'.format(
                card['fields']['English']['value']))

        else:
            fail_word_dict[card['fields']['Khmer']['value']
                           ] = card['fields']['English']['value']
            print('added to fail list {}'.format(
                card['fields']['English']['value']))

        return card['fields']['English']['value'] + ' is done'
    finally:
        lock.release()


result = invoke('findCards', query="deck:current")
cards_info = invoke('cardsInfo', cards=result)

success_word_dict = {}
fail_word_dict = {}
word_set = {None}
processes = []

with ThreadPoolExecutor(max_workers=100) as executor:
    for card in cards_info:
        if(card['fields']['Khmer']['value'] in word_set):
            print('skpping ' + card['fields']['English']['value'])
            continue

        processes.append(executor.submit(
            check_url, card, success_word_dict, fail_word_dict))
        word_set.add(card['fields']['Khmer']['value'])


for task in as_completed(processes):
    print(task.result())

all_words_file = open("all-words.txt", "w+", encoding="utf8", errors="ignore")
success_words_file = open("success-words.txt", "w+",
                          encoding="utf8", errors="ignore")
fail_words_file = open("fail-words.txt", "w+",
                       encoding="utf8", errors="ignore")

all_words_file.write(json.dumps(
    {**success_word_dict, **fail_word_dict}, ensure_ascii=False))
success_words_file.write(json.dumps(success_word_dict, ensure_ascii=False))
fail_words_file.write(json.dumps(fail_word_dict, ensure_ascii=False))
