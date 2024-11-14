const chessboard = document.querySelector('.chessboard');
const pieces = document.querySelector('.pieces');
const timer = document.getElementById("timer");
const timeperclick = document.getElementById("timeperclick");
let pressed=0;
let time=0;
let circlecount=0;
timer.classList.add('timer');
timeperclick.classList.add('timer');
timeperclick.textContent="click to see your time in between each click";
timer.textContent="click to see your time";
const matrix = [
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1]
];
function regenboard(){
  for(let a=0; a<8; a++){
    for(let b=0; b<8; b++){
      let d=Math.floor(Math.random()*2);
      if (d==1){
        matrix[a][b]=1;
      }
      if(d==0){
        matrix[a][b]=0;
      }
    }
  }
}
regenboard();
function reset(){
  pressed=0;
  time=0;
  circlecount=0;
  timeperclick.textContent="click to see your time in between each click";
  timer.textContent="click to see your time";
  const matrix = [
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1]
  ];
  regenboard();
}
function main(){
    function createSquare(isLight) {
      const square = document.createElement('div');
    square.classList.add('square');
    if (isLight==0) {
      square.classList.add('light-square');
    } else if(isLight==1) {
      square.classList.add('dark-square');
    }
    return square;
  }

  function addPiece(isLight, row, col) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    if (matrix[row][col]==0){
      circle.classList.add('opacity');
    }else{
      circle.addEventListener('click', () => {
        console.log('circle clicked:', circle);
        if (matrix[row][col]==1){
          circlecount+=1;
          console.log(circlecount)
        }
        matrix[row][col] = 0;
        console.log(matrix);
      });
    }
    return circle;
  }

  function getMousePosition(event) {
    const x = event.clientX;
    const y = event.clientY;
    return { x, y };
  }

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const isLight = (row + col) % 2;
        const square = createSquare(isLight);
        chessboard.appendChild(square);
    }
  }



  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const isLight = (row + col) % 2;
        const circle = addPiece(isLight, row, col);
        pieces.appendChild(circle);
    }
  }

  document.addEventListener('mousemove', (event) => {
    const position = getMousePosition(event);
    console.log(`Mouse position: x=${position.x}, y=${position.y}`);
  });
}
main();
pieces.addEventListener('click', () => {
  if (pressed==0){
    time=Date.now();
    pressed=1;
    console.log(pressed);
  }
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    square.remove();
  });
  console.log(matrix.some(innerArray=>innerArray.includes(1)));
  if (matrix.some(innerArray => innerArray.includes(1))) {
      const length = (((time-Date.now()) / -1000)).toFixed(3);
      const circleclick= (length/circlecount).toFixed(3);
      timer.textContent = length.toString() + " total seconds clicked";
      timeperclick.textContent=circleclick.toString()+ " seconds per circle click";
  }
  const circle = document.querySelectorAll('.circle');
  circle.forEach(circle => {
    circle.remove();
  });
  main();
});
