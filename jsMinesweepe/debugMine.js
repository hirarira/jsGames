const Mine = require("./mine.js");
const mine = new Mine();
console.log( mine.start_game(10) );
console.log( mine.show_board() );

process.stdin.setEncoding('utf-8');
process.stdin.on('data', function (data) {
    let input = data.replace(/\r?\n/g,"").split(".");
    console.log(input);
    if(input[0] === "show"){
      console.log(mine);
    }
    else{
      console.log( mine.open_board(input[0], input[1]) );
      // console.log( mine.show_board_discord() );
      console.log( mine.show_board() );
      console.log( mine.debug_show_board(0) );
      if(!mine.playing){
        console.log("ゲームリセット");
        mine.start_game(10);
      }
    }
});
