let canvas = document.querySelector("#main-frame");
let context = canvas.getContext('2d');

let x = 10;
let y = 240;
let len = 10;
let width = 10;
let xFood = 0;
let yFood = 0;
let level = 1;
let Speed = 10;
var hzSpeed = 0;
var vtSpeed = 0;
var points = 0;
var selfKill = false;
var biteWall = false;


document.onkeydown = KeyDirection;
document.addEventListener("keydown", KeyDirection);

let anaconda = [{x:10, y:240},
			 	{x:20, y:250}, 
			 	{x:30, y:240}, 
			 	{x:40, y:240}]
play();
generateFood();

function randomPosition(){
	xFood = Math.round(Math.random() * (canvas.width - 10)/10) * 10;
	yFood = Math.round(Math.random() * (canvas.height - 10)/10) * 10;
}

function generateFood(){
	randomPosition();
	/*var swallowed = false;
	context.fillStyle = "#000000";
	context.strokestyle = "#000000";
	context.fillRect(xFood, yFood, 10, 10);
	context.strokeRect(xFood, yFood, 10, 10);*/

	anaconda.forEach(function swallow(body){
		if(body.x == xFood && body.y == yFood){
			generateFood();
		}
	});

}


function print(){
	anaconda.forEach(placeAnaconda)
}

function placeAnaconda(place){
	/*setTimeout(function(){
		//context.clearRect(0,0,canvas.width,canvas.height);
		//context.fillStyle = '#000000';
		//context.fillRect(x,y,len,width);
	}, (time* 50));*/

	context.fillStyle = "#f4d03f";
	context.strokestyle = "#17202a";
	context.fillRect(place.x, place.y, len, width);
	context.strokeRect(place.x, place.y, len, width);
}

function placeFood(){
	context.fillStyle = "#1d8348 ";
	context.strokestyle = "#cb4335";
	context.fillRect(xFood, yFood, len, width);
	context.strokeRect(xFood, yFood, len, width);
}

function move(){
	let front = {x: anaconda[0].x + hzSpeed, y: anaconda[0].y + vtSpeed};
	anaconda.unshift(front);
	var swallow = anaconda[0].x === xFood && anaconda[0].y === yFood;
	//console.log(swallow);
	//console.log(xFood + " " + yFood);
	//console.log(anaconda[0].x + "--" + anaconda[0].y);
	if(swallow){
		generateFood();
		points += 20;
		console.log("touch");
	}else{
		anaconda.pop();
	}

	document.querySelector("#score-board").innerHTML = points;
	
}

function KeyDirection(event){
	var arrow = event.keyCode;

	if (arrow == 37 && hzSpeed != Speed){ //Moving Left
		hzSpeed = -Speed;
		vtSpeed = 0;
	}else if(arrow == 39 && hzSpeed != -Speed){ //Movig Right
		hzSpeed = Speed;
		vtSpeed = 0;
	}else if(arrow == 38 && vtSpeed != Speed){ // Moving UP
		hzSpeed = 0;
		vtSpeed = -Speed;
	}else if (arrow == 40 && vtSpeed != - Speed){ //Movid down
		hzSpeed = 0;
		vtSpeed = Speed;
	}else if (arrow == 32){
		pause();
	}
}

function GameOver(){

	for(let i = 4; i < anaconda.length; i++){
		if((anaconda[i].x === anaconda[0].x) && (anaconda[i].y === anaconda[0].y)){
			selfKill = true;
		}
	}

	if((anaconda[0].x < 0) || (anaconda[0].x > (canvas.width - 10)) ||
		(anaconda[0].y < 0) || (anaconda[0].y > (canvas.height - 10))){
		biteWall = true;
	}

	return (selfKill || biteWall);

}

function play(){

	if(level == 1){
		Speed = 10;
	}/*else if (level == 2){
		
	}else if (level == 3){
		
	}*/
	if(GameOver()){
		GameOver() = false;
		return;
	}

	KeyDirection = false;
	setTimeout(function onTick(){
		context.fillStyle = "#ffffff";
		context.clearRect(0, 0, canvas.width, canvas.height);
		placeFood();
		move();
		print();
		play();
	}, 100)
		
}

function pause(){
	KeyDirection = false;
	hzSpeed = 0;
	vtSpeed = 0;

}
function refreshPage(){
    history.go(0);
}


/*Source: https://www.educative.io/blog/javascript-snake-game-tutorial*/
