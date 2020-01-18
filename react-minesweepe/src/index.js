import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: ''
    }
  }
  render() {
    return (
      <button 
        className="square" 
        onClick={
          ()=>{
            if(!this.props.gameover){
              this.props.onClick(this.props.pos);
            }
          }
        }
      >
        {
          this.props.click[this.props.pos.x][this.props.pos.y] && this.props.value
        }
      </button>
    );
  }
} 
  
class Board extends React.Component {
  constructor(props) {
    super(props);
    const bomb = this.setMine(5);
    this.state = {
      bomb: bomb,
      values: this.getValues(bomb),
      isClick: (new Array(5)).fill("").map(() => (new Array(5)).fill(false)),
      gameover: false
    }
  }
  setMine(num){
    let base = (new Array(5)).fill("").map(() => (new Array(5)).fill(false));
    for(let i=0; i<num; i++){
      let x = Math.floor(Math.random()*5);
      let y = Math.floor(Math.random()*5);
      if(base[x][y]){
        i--;
        continue;
      }
      base[x][y] = true;
    }
    return base;
  }
  getValues(bomb){
    let len = bomb.length;
    let mineValues = [];
    for(let i=0; i<len; i++){
      let mine = [];
      for(let j=0; j<len; j++){
        let bombNum = 0;
        for(let x=j-1; x<=j+1; x++){
          for(let y=i-1; y<=i+1; y++){
            if(x<0 || x>len-1 || y<0 || y>len-1){
              continue;
            }
            if(bomb[y][x]){
              bombNum++;
            }
          }
        }
        mine.push(bombNum);
      }
      mineValues.push(mine);
    }
    return mineValues;
  }
  renderSquare(pos) {
    const bomb = this.state.bomb[pos.x][pos.y];
    const roundBomb = this.state.values[pos.x][pos.y];
    const value = bomb? '*': roundBomb;
    return <Square 
      pos={pos} 
      bomb={bomb}
      value={value}
      click={this.state.isClick}
      key={`${pos.x}${pos.y}`}
      gameover={this.state.gameover}
      onClick={(pos)=>{
        let click = this.state.isClick;
        click[pos.x][pos.y] = true;
        this.setState({
          isClick: click
        });
        if (bomb) {
          this.setState({
            gameover: true
          })
          console.log("ゲームオーバー！");
        }
      }}
    />;
  }
  resetGame() {
    const bomb = this.setMine(5);
    this.setState({
      bomb: bomb,
      values: this.getValues(bomb),
      isClick: (new Array(5)).fill("").map(() => (new Array(5)).fill(false)),
      gameover: false
    })
  }

  render() {
    return (
      <div>
        <div className="status"> State: {this.state.gameover? 'GameOver': 'Playing'} </div>
        {
          this.state.values.map((line, lineIndex) => (
            <div className="board-row" key={lineIndex}>
              {
                line.map((square, index) => {
                  return this.renderSquare({x:index, y:lineIndex});
                })
              }
            </div>
          ))
        }
        <br />
        <Button variant="contained" color="primary" onClick={() => this.resetGame()}>
          Restart Game
        </Button>
      </div>
    );
  }
}
  
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
  
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  