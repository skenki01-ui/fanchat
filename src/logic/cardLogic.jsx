export function drawCard(characterId){

// 1〜12のカード
const card = Math.floor(Math.random() * 12) + 1;

return card;

}

export function getUniqueCards(cards){

const unique = [];

cards.forEach(c=>{
if(!unique.includes(c.card_no)){
unique.push(c.card_no);
}
});

return unique;

}