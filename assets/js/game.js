
/* Game States
    "WIN" - Player robot has defeated all enemy-robots
        * Fight all enemy robots
        * Defeat each enemy robot
    "LOSE" - Player robot's health is <= 0
*/

function getPlayerName(){
    var name = '';

    while (name === '' || name === null)
        name = prompt("What is your robot's name?");

    console.log("Your robot's name is " + name);
    return name;
}


var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,

    reset: function(){
        this.health = 100;
        this.attack= 10;
        this.money = 10;
    },

    refillHealth: function(){
        if (this.money >= 7){
            window.alert("Refilling player's health by 20, costs 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }else
            window.alert("You don't have enough money!");        
    },

    upgradeAttack: function(){
        if (this.money >= 7){
            window.alert("Upgrading player's attack by 6, costs 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }else
            window.alert("You don't have enough money!");        
    }
}


function randomNumber(min, max){
    if (min > max)
        return randomNumber(max, min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var enemyInfo = [
    {
        name: 'Roborto',
        attack: randomNumber(10,14)
    },
    {
        name: 'Amy Android',
        attack: randomNumber(10,14)
    },
    {
        name: 'Robo Trumble',
        attack: randomNumber(10,14)
    }
];


function fightOrSkip(){
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    
    if (!promptFight){
        window.alert('You did not pick a valid option. Try again.');
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();
    if (promptFight === 'skip'){
        var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");
        if (confirmSkip){
            window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log('playerInfo.money', playerInfo.money);
            return true;
        }
    }
}



function fight(enemy){
    
    var isPlayerTurn = true;
    if (Math.random() > .5)
        isPlayerTurn = false;

    //Repeat and execute as long as the enemy-robot is alive
    while (playerInfo.health >0 && enemy.health > 0){

        if (isPlayerTurn){
            if (fightOrSkip())
                break;

            var damage;
    
            //Remove enemy's health by subtracting the amount set in playerInfo's attack property
            damage = randomNumber(playerInfo.attack-3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.');
        
            //Check enemy's health
            if (enemy.health <= 0 ){
                window.alert(enemy.name + ' has died!');
                break;
            }else{
                window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
            }   
        }else{
            //Remove player's health by subtracting the amount set in  enemyInfo's attack property
            damage = randomNumber(enemy.attack-3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.');

            //Check player's health
            if (playerInfo.health <= 0 ){
                window.alert(playerInfo.name + ' has died!');
                break;
            }else{
                window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
            }
        }

        isPlayerTurn = !isPlayerTurn;
    }
}


function startGame(){
    
    playerInfo.reset();
    
    for(var i = 0; i < enemyInfo.length; i++){
        if (playerInfo.health > 0){
            
            window.alert('Welcome to Robot Gladiators! Round ' + (i+1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40,60);
            fight(pickedEnemyObj);

            if (playerInfo.health > 0 && i < enemyInfo.length - 1){
                var storeConfirm = window.confirm('The fight is over. Visit the store before the next round?');
                if (storeConfirm)
                    shop();
            }

        }else{
            window.alert('You have lost your robot in battle! Game Over!');
            break;
        }
    }

    endGame();
}


function endGame(){
    
    if (playerInfo.health > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + '.');
    }else{
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm('Would you like to play again?');
    if (playAgainConfirm){
        startGame();
    }else{
        window.alert('Thank you for playing Robot Gladiators! Come back soon!');
    }

}


function shop(){
    var shopOptionPrompt = window.prompt(
        'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 to "REFILL", 2 to "UPGRADE", or 3 to "LEAVE".'
    )
    shopOptionPrompt = parseInt(shopOptionPrompt);   
    
    switch (shopOptionPrompt){
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert('Leaving the store.');
            break;
        default:
            window.alert('You did not pick a valid option. Try again.')
            shop();
    }
}


startGame();