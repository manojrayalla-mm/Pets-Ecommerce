const input = document.querySelector('input');
const btn = document.querySelector('button');

const dictionary = document.querySelector('.dictionary-app');


// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

async function dictionaryFn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then (res => res.json())


    return res[0]
}
btn.addEventListener('click', fetchandCreateCard)

async function fetchandCreateCard() {
const data = await dictionaryFn(input.value)
console.log(data)

let partofspeechArray =[]

for(let i=0;i<data.meanings.length-1;i++){
    partofspeechArray.push(data.meanings[i].partOfSpeech)
}



dictionary.innerHTML = `
 <div class="card">
 <div class="property">
               <span>word: </span>
                    <span>${data.word}</span>
                </div>


                <div class="property">
                    <span>phonetics: </span>
                    <span>${data.word}</span>
                </div>


                <div class="property">
                    <span><a href="${data.phonetics[0].audio}" target="_blank">Listen</a></span>
                </div>

                <div class="property">
                    <span>Definition </span>
                    <span>${data.meanings[0].definitions[0].definition}</span>
                </div>

                <div class="property">
                    <span>Example </span>
                    <span>${data.meanings[0].definitions[0].example}</span>
                </div>

                <div class="property">
                    <span>${partofspeechArray.map(e => e).join(', ')}</span>
                </div>   

            </div>

`
};