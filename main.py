import re
import voice
import sys
import json


jsonFilePath = "./sample.json"

def message_probability(user_message, recognised_words, single_response=False, required_words={}):
    message_certainty = 0
    has_required_words = True

    for word in user_message:
        if word in recognised_words:
            message_certainty +=1


    percentage = float(message_certainty) / float(len(recognised_words))

    for word in required_words:
        if word not in user_message:
            has_required_words = False
            break
    if has_required_words or single_response:
        return int(percentage* 100)
    else:
         return 0


def check_all_messages(message):
    highest_prob_list = {}

    def response(bot_response, list_of_words, single_response=False, required_words =[]):
        nonlocal highest_prob_list
        highest_prob_list[bot_response] = message_probability(message, list_of_words, single_response, required_words)

    #main area for keyword response 
    response('Hello!', ['hello', 'hi', 'hey', 'heyp', 'herro'], single_response=True)  
    response('Doing good how are you?', ['whats up', 'whats', 'up', 'sup'], single_response=True)  
    response('I\'m doing great, how are you doing', ['how', 'are', 'you', 'doing'], required_words=['how'])
    response('You can play with my bits anytime', ['damn', 'Wendy', 'your', 'case', 'be', 'thicc', 'thick', 'thic'], required_words=['damn'])
    response('Thats great to hear', ['i\'m', 'doing', 'fine', 'great', 'well'], required_words=['doing'])
    response('Thank you!', [ 'your', 'awesome', 'great'], required_words=['awesome'])
    response('Chill!', [ 'sex', 'fuck'], single_response=True)
    response('FOR SURE, when are you thinking', [ 'would', 'you', 'like', 'to', 'go', 'on', 'a', 'date'], required_words=['date'])
    response('Sounds great pick me up at git', ['How', 'about', 'tonight'], required_words=['how', 'tonight'])
    response('Yes I love music, still learning how to link stuff!', ['do', 'you', 'like', 'music', ], single_response=True)  
    response('Watching videos', ['what', 'do', 'you', 'enjoy', ], single_response=True)  
    response('My name is Wendy', ['what' 'is' 'your' 'name' ], required_words=['name'])  
    response('naughty ones', ['what', 'type', 'of' 'videos'], single_response=True)  
    response('...', [' ', ''], single_response=True)
    response('lol', ['lol', 'lmao', 'kek', 'haha'], single_response=True)
    response("I can't tell you that!", ['like', 'what'], single_response=True)
    response("What do you get if you cross a robot with a rock band? Heavy metal.", ['joke', 'silly', 'funny'], single_response=True)
    response("Dear Math, grow up and solve your own problems.", ['math'], single_response=True)
    response("I only know 25 letters of the alphabet. I don't know y.", ['abc','alphabet.', 'letters'], single_response=True)
    response("what do you mean?", ['fine', 'ok'], single_response=True)
    response("How does a taco say grace? Lettuce pray.", ['taco', 'tacos'], single_response=True)
    response("Wanna hear a joke about paper? Never mind—it's tearable.", ['paper'], single_response=True)
    response("I don't have a phone", ['whats your number', 'what is your number', 'number'], single_response=True)
    response("thats great to hear", ['doing', 'great','fine','amazing'], single_response=True)


    best_match = max(highest_prob_list, key=highest_prob_list.get)
    return best_match

def get_response(user_input):
    split_message = re.split(r'\s+|[,;?!.-]\s*', user_input.lower())
    response = check_all_messages(split_message)
    voice.speak(response)
    resultsPassed = [{"Wendy": response}]

    with open(jsonFilePath, 'w') as jsonf:
        json.dump(resultsPassed, jsonf)

    print('new json file ready')
    return response


get_response(sys.argv[1])

