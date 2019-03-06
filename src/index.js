module.exports = function solveSudoku(matrix) {
  isSolved = function(matrix){
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        if (matrix[i][j] == 0){
          nullRow = i;
          nullCol = j;
          return false;
        }
    return true;
  }

  findPossibleNumbers = function(row, col){
    var curNum;
    var possibleNumbers = [];
    var numbers = {};
    for (let i = 1; i < 10; i++){
      numbers[i] = 0;
    }

    // in row:
    for (let j = 0; j < 9; j++){
      curNum = matrix[row][j];
      if (curNum != 0 ) numbers[curNum] = curNum;
    }

    // in col:
    for (let i = 0; i < 9; i++){
      curNum = matrix[i][col];
      if (curNum != 0 ) numbers[curNum] = curNum;
    }

    // for square:
    var squareRow, squareCol;
    if (row <= 2) squareRow = 0; else
      if (row <= 5) squareRow = 3; else
        squareRow = 6;

      if (col <= 2) squareCol = 0; else
        if (col <= 5) squareCol = 3; else
          squareCol = 6;
      
      for (let i = squareRow; i < squareRow + 3; i++)
        for (let j = squareCol; j < squareCol + 3; j++){
          curNum = matrix[i][j];
          if (curNum != 0 ) numbers[curNum] = curNum;
        }
    
   // for (let i = 0; i < )

    for (number in numbers)
      if (numbers[number] == 0) possibleNumbers.push(number);
    

    return possibleNumbers;
  }

  //possibleNumbers.splice(0, 1);  
  var nullRow, nullCol;
  if (isSolved(matrix)) return true;
  possibleNumbers = findPossibleNumbers(nullRow, nullCol);

  //for (posNum in possibleNumbers){
  for (let i = 0; i < possibleNumbers.length ; i++){
    var posNum = possibleNumbers[i];
    matrix[nullRow][nullCol] = posNum;
    var i2 = i;
    if (solveSudoku(matrix)) return matrix;
    matrix[nullRow][nullCol] = 0;
    possibleNumbers = findPossibleNumbers(nullRow, nullCol);
    i = i2;
  }
  return false;

}