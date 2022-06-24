
/* Game States
    "WIN" - Player robot has defeated all enemy-robots
        * Fight all enemy robots
        * Defeat each enemy robot
    "LOSE" - Player robot's health is <= 0
*/


var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;



function fight(enemyName){
    
    //Repeat and execute as long as the enemy-robot is alive
    while (enemyHealth > 0){

        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

        if (promptFight === 'fight' || promptFight === 'FIGHT') {
            
            //Remove enemy's health by subtracting the amount set in the playerAttack variable
            enemyHealth -= playerAttack;
            console.log(playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.');
        
            //Check enemy's health
            if (enemyHealth <= 0 ){
                window.alert(enemyName + ' has died!');
            }else{
                window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
            }   

            //Remove player's health by subtracting the amount set in the enemyAttack variable
            playerHealth -= enemyAttack;
            console.log(enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.');

            //Check player's health
            if (playerHealth <= 0 ){
                window.alert(playerName + ' has died!');
            }else{
                window.alert(playerName + ' still has ' + playerHealth + ' health left.');
            }   
        
        }else if (promptFight === 'skip' || promptFight === 'SKIP'){
            
            var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");

            if (confirmSkip){
                window.alert(playerName + ' has decided to skip this fight. Goodbye!');
                playerMoney -= 2;
            }
            else{
                fight();
            }

        }else{
            window.alert('You need to choose a valid option. Try again!');
        }
    
    }

}

for(var i = 0; i < enemyNames.length; i++){
    
    var pickedEnemyName = enemyNames[i];

    enemyHealth = 50;

    fight(pickedEnemyName);

}