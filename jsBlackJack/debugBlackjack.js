const BlackJack = require("./blackjack.js");
const blackjack = new BlackJack();
console.log("Enterを押してスタートします。");
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function (data) {
  let input = data.replace(/\r?\n/g,"");
  if(input === "y" || input === "n"){
    blackjack.hit_player(input === "y")
  }
  if(blackjack.end){
    console.log(blackjack.end_show());
    blackjack.init();
  }
  console.log(blackjack.show_status());
  console.log("ヒットしますか？ y/n");
});
