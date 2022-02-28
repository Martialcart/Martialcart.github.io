const space = " ";
const line_brake = "\n";
let bot_name = "chad";
let default_response = "ok";
let conversation_starter = "hi";
let sentences = [];
let key_words = new Map();

function learn_logic() {
    const brain = document.getElementById("brain");
    let code = brain.value;
    let end_of_code = code.length;
    let pointer = 0;
    let char = '';
    let key_word_mode = false;
    let sentence_index = 0;

    for (i = 0; i < end_of_code; i++){
        char = code[i];
        if(key_word_mode) {
            if(char === space) {
                key_words.set(code.substring(pointer, i), sentence_index);
                pointer = i + 1;
            }else if(char === '|') {
                key_words.set(code.substring(pointer, i), sentence_index);
                key_word_mode = false;
                pointer = i + 1;
            }
        } 
        else if (char === line_brake || end_of_code <= i){
            sentences[sentence_index] = code.substring(pointer, i);
            key_word_mode = true;
            pointer = i + 1;
            sentence_index++;
        }
    }
}

function send_message() {
    const message = document.getElementById("chat_input")
    say("you", message.value);
    bot_respond(message.value);
    message.value = "";
}

function bot_respond(message) {
    if(message === "") return;
    const chars = message.toLowerCase().split(" ");
    console.log(chars);
    for (let i = 0; i < chars.length; i++) {
        if(key_words.has(chars[i])) {
            say(bot_name, sentences[key_words.get(chars[i])]);
            return;
        }
    }
    say(bot_name, default_response);
}

function say(sender, message) {
    if(message === "") return;
    const log = document.getElementById("chat_log");
    const para = document.createElement("P");
    const tekst = document.createTextNode(sender + ": " + message);
    para.append(tekst);
    log.appendChild(para);
    log.scrollBy(0,100);
}