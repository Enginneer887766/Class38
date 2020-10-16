class Game {
  constructor(){

  }

  

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(carimg1);

    car2 = createSprite(300,200);
    car2.addImage(carimg2);

    car3 = createSprite(500,200);
    car3.addImage(carimg3);

    car4 = createSprite(700,200);
    car4.addImage(carimg4);


    cars = [car1, car2, car3, car4];
   
  }

  play(){
    
    form.hide();
    player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(ground);
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var X = 250;
      var Y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        X = X + 300;
        //use data form the database to display the cars in y direction
        Y = displayHeight - allPlayers[plr].distance;
        cars[index-1].X = X;
        cars[index-1].Y = Y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.X = displayWidth/2;
          camera.position.Y = cars[index-1].Y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyDown(UP_ARROW) && player.index !== null){
      player.distance += 10;
      player.update();
    }

    if (player.distance>2000) {
      gameState = 2;
    }

    drawSprites();

    
  }
  end() {
    console.log("GameEnded");

  }
}
