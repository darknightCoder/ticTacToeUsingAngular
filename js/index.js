
var app = angular.module('ticTocGame',[]);
app.controller('gameController',function($scope) {
  $scope.type= 'single';
  $scope.userInput = null;
  $scope.AI = false;
  $scope.gameTypeNotSelected = true;
  $scope.SymbolNotSelected =false;
  $scope.gameState = null;
  $scope.initialSymbol ='X';
  $scope.player1={name : 'human1',
                 symbol : '',
                  wins:0};
  $scope.player2={name : 'human2',
                 symbol : '',
                 wins:0};
  $scope.turn = $scope.player1.name;
  $scope.boxModel = {
    box1:'',
    box2:'',
    box3:'',
    box4:'',
    box5:'',
    box6:'',
    box7:'',
    box8:'',
    box9:''
  }
  
  // this function is called initially at first when user select single or multiplayer
  $scope.setGameType = function(type) {
    $scope.type = type;
    $scope.gameTypeNotSelected = false;
    $scope.SymbolNotSelected =true;    
//  $scope.gameType = new gameConfig($scope.type);
    if(type!=='single') {
    $scope.AI = true;
    $scope.player2.name = 'computer'; 
    }
    $scope.startGame();
  }
  
  //select symbol 
  $scope.selectedSymbol = function (symbol,nextSymbol) {
$scope.SymbolNotSelected = false;
    $scope.player1.symbol = symbol;
    $scope.player2.symbol = nextSymbol;
  }
 //starting point of the game 
  $scope.startGame = function() {
    
    //initialization
    // $scope.gameState = new GameState();
    // $scope.gameState.initializeGame();
   if($scope.AI) {
     $scope.playWithComputer();
   }
    else {
      $scope.playWithHuman();
    }
  }
  
  $scope.boxClicked = function (index) {
    //console.log(index);
    if($scope.turn !='computer' ) {
    if($scope.turn === $scope.player1.name){
      $scope.setSymbol(index,$scope.player1.symbol);
      $scope.turn = $scope.player2.name;
      var result = $scope.checkWin($scope.player1.name,$scope.player1.symbol);
      if(result && result == $scope.player1.name) {
        alert($scope.player1.name+': wins');
        $scope.player1.wins++;
        $scope.reset();
      }
      else if($scope.isDraw()){
        alert('draw');
        $scope.reset();
      }
    }
    else {
     
      $scope.setSymbol(index,$scope.player2.symbol);
      $scope.turn = $scope.player1.name;
      var result = $scope.checkWin($scope.player2.name,$scope.player2.symbol);
      if(result && result == $scope.player2.name) {
        alert($scope.player2.name+': wins');
        $scope.player2.wins++;
        $scope.reset();
      }
      else if($scope.isDraw()){
        alert('draw');
        $scope.reset();
      }
    }
    }
    if($scope.turn == 'computer') {
      var moved = $scope.chooseNextStep();
      if(!moved) {
        $scope.AIMove();
      }
      $scope.turn = $scope.player1.name;
      var result = $scope.checkWin($scope.player2.name,$scope.player2.symbol);
      if(result && result == $scope.player2.name) {
        alert($scope.player2.name+': wins');
        $scope.player2.wins++;
        $scope.reset();
      }
      else if($scope.isDraw()){
        alert('draw');
        $scope.reset();
      }
      
    }
  }
  
  $scope.checkWin = function(name,symbol) {
    if($scope.boxModel.box1 == symbol && $scope.boxModel.box2 == symbol && $scope.boxModel.box3 == symbol) {
      return name;
    }
    else if($scope.boxModel.box4 == symbol && $scope.boxModel.box5 == symbol && $scope.boxModel.box6 == symbol) {
      return name;
    }
    else if($scope.boxModel.box7 == symbol && $scope.boxModel.box8 == symbol && $scope.boxModel.box9 == symbol) {
      return name;
    }
    else if($scope.boxModel.box1 == symbol && $scope.boxModel.box5 == symbol && $scope.boxModel.box9 == symbol) {
      return name;
    }
    else if($scope.boxModel.box1 == symbol && $scope.boxModel.box4 == symbol && $scope.boxModel.box7 == symbol) {
      return name;
    }
    else if($scope.boxModel.box2 == symbol && $scope.boxModel.box5 == symbol && $scope.boxModel.box8 == symbol) {
      return name;
    }    
    else if($scope.boxModel.box3 == symbol && $scope.boxModel.box6 == symbol && $scope.boxModel.box9 == symbol) {
      return name;
    }    
    else if($scope.boxModel.box3 == symbol && $scope.boxModel.box5 == symbol && $scope.boxModel.box7 == symbol) {
      return name;
    }    
    else return null;
  }
  
  $scope.reset = function () {
    for(var i in $scope.boxModel){
      $scope.boxModel[i]='';
    }
  }
   //depends on game type i.e computer
  $scope.playWithComputer = function () {
    
  }
  $scope.isDraw = function() {
    var count = 0;
    for(var i in $scope.boxModel) {
      $scope.boxModel[i] == 'X' || $scope.boxModel[i] == 'O' ? count ++:null;
    }
    if(count == 9) {
      return true;
    }
    return false;
  }
  
  //depends on game type i.e person
  
  $scope.playWithHuman = function () {
    
  }
  
  $scope.chooseNextStep = function () {
    var symbol = $scope.player1.symbol;
    var sym2 = $scope.player2.symbol;
    //  x x stop
    if($scope.boxModel.box1==symbol && $scope.boxModel.box2==symbol && $scope.boxModel.box3==''){
      $scope.boxModel.box3 = sym2;
      return true
    }
   if($scope.boxModel.box2==symbol && $scope.boxModel.box3==symbol && $scope.boxModel.box1==''){
      $scope.boxModel.box1 = sym2;
     return true
    }
    if($scope.boxModel.box3==symbol && $scope.boxModel.box1==symbol && $scope.boxModel.box2==''){
      $scope.boxModel.box2 = sym2;return true;
    }
    
    
    if($scope.boxModel.box4==symbol && $scope.boxModel.box5==symbol && $scope.boxModel.box6==''){
      $scope.boxModel.box6 = sym2;return true;
    }
       if($scope.boxModel.box5==symbol && $scope.boxModel.box6==symbol && $scope.boxModel.box4==''){
      $scope.boxModel.box4 = sym2;return true;
    }
    
       if($scope.boxModel.box6==symbol && $scope.boxModel.box4==symbol && $scope.boxModel.box5==''){
      $scope.boxModel.box5 = sym2;return true;
    }
    
    
    
     if($scope.boxModel.box7==symbol && $scope.boxModel.box8==symbol && $scope.boxModel.box9==''){
      $scope.boxModel.box9 = sym2;return true;
    }
     if($scope.boxModel.box8==symbol && $scope.boxModel.box9==symbol && $scope.boxModel.box7==''){
      $scope.boxModel.box7 = sym2; return true;
    }
    if($scope.boxModel.box9==symbol && $scope.boxModel.box7==symbol && $scope.boxModel.box8==''){
      $scope.boxModel.box8 = sym2; return true;
    }
    
    
    
    
      if($scope.boxModel.box1==symbol && $scope.boxModel.box5==symbol && $scope.boxModel.box9==''){
      $scope.boxModel.box9 = sym2; return true;
    }
       if($scope.boxModel.box5==symbol && $scope.boxModel.box9==symbol && $scope.boxModel.box1==''){
      $scope.boxModel.box1 = sym2; return true;
    }
       if($scope.boxModel.box9==symbol && $scope.boxModel.box1==symbol && $scope.boxModel.box5==''){
      $scope.boxModel.box5 = sym2; return true;
    }
     
       if($scope.boxModel.box3==symbol && $scope.boxModel.box5==symbol && $scope.boxModel.box7==''){
      $scope.boxModel.box7 = sym2;return true;
    }
    
       if($scope.boxModel.box5==symbol && $scope.boxModel.box7==symbol && $scope.boxModel.box3==''){
      $scope.boxModel.box3 = sym2;return true;
    }
    
       if($scope.boxModel.box7==symbol && $scope.boxModel.box3==symbol && $scope.boxModel.box5==''){
      $scope.boxModel.box5 = sym2;return true;
    }
    
    
       if($scope.boxModel.box1==symbol && $scope.boxModel.box4==symbol && $scope.boxModel.box7==''){
      $scope.boxModel.box7 = sym2;return true;
    }
    
       if($scope.boxModel.box4==symbol && $scope.boxModel.box7==symbol && $scope.boxModel.box1==''){
      $scope.boxModel.box1 = sym2;return true;
    }
    
       if($scope.boxModel.box1==symbol && $scope.boxModel.box7==symbol && $scope.boxModel.box4==''){
      $scope.boxModel.box4 = sym2;return true;
    }
    
    
    
    
       if($scope.boxModel.box2==symbol && $scope.boxModel.box5==symbol && $scope.boxModel.box8==''){
      $scope.boxModel.box8 = sym2;return true;
    }
    
       if($scope.boxModel.box5==symbol && $scope.boxModel.box8==symbol && $scope.boxModel.box2==''){
      $scope.boxModel.box2 = sym2;return true;
    }
    
       if($scope.boxModel.box2==symbol && $scope.boxModel.box8==symbol && $scope.boxModel.box5==''){
      $scope.boxModel.box5 = sym2;return true;
    }
    
    
    
       if($scope.boxModel.box3==symbol && $scope.boxModel.box6==symbol && $scope.boxModel.box9==''){
      $scope.boxModel.box9 = sym2;return true;
    }
    
       if($scope.boxModel.box6==symbol && $scope.boxModel.box9==symbol && $scope.boxModel.box3==''){
      $scope.boxModel.box9 = sym2;return true;
    }
    
       if($scope.boxModel.box9==symbol && $scope.boxModel.box3==symbol && $scope.boxModel.box6==''){
      $scope.boxModel.box6 = sym2;return true;
    }
    return false;
    
  }
  $scope.setSymbol = function(index,symbol) {
    console.log($scope.boxModel);
    $scope.boxModel['box'+index] = symbol;
  }
  $scope.AIMove = function() {
   var sym2 = $scope.player2.symbol;
    if($scope.boxModel.box5==''){
      $scope.boxModel.box5 = sym2;
      return;
    }
    if($scope.boxModel.box1==''){
      $scope.boxModel.box1 = sym2;
      return;
    }
    
        if($scope.boxModel.box59==''){
      $scope.boxModel.box59 = sym2;
          return;
    }
    
        if($scope.boxModel.box6==''){
      $scope.boxModel.box6 = sym2;
          return;
    }
    
        if($scope.boxModel.box2==''){
      $scope.boxModel.box2 = sym2;
          return;
    }
        if($scope.boxModel.box8==''){
      $scope.boxModel.box8 = sym2;
          return;
    }
        if($scope.boxModel.box3==''){
      $scope.boxModel.box3 = sym2;
          return;
    }
        if($scope.boxModel.box7==''){
      $scope.boxModel.box7 = sym2;
          return;
    }
        if($scope.boxModel.box4==''){
      $scope.boxModel.box4 = sym2;
          return;
    }
    
    
  }

});