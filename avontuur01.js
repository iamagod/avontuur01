var width = 1024;
var heigth = 500;
var game = new Phaser.Game(width, heigth, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var mans,cursors,man;
var gotoX=0;

function preload()
{
    game.load.image      ('level01'    , 'assets/level01_klein2.jpg'           );
    //game.load.image      ('level01'    , 'assets/field2.png'           );
    game.load.spritesheet('mannetje'     , 'assets/mannetje.png'    ,150,300,5);
}

function create()
{
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 4000, 500);
    bg = game.add.sprite(0, 0, 'level01');
    cursors = game.input.keyboard.createCursorKeys();

    mans = game.add.group();
    mans.enableBody = true;
    game.input.onDown.add(click, self);

    man = mans.create(200, 300 , "mannetje");
    man.anchor.setTo(0.5, 0.5);
    man.animations.add('left', [3,4], 5, true);
    man.animations.add('right', [0,1], 5, true);
    man.animations.add('rest', [2], 5, true);

    game.camera.follow(man);

    //man =
}


function click(event){

    gotoX = event.x + game.camera.x;
    if (gotoX > man.body.position.x){
        man.body.velocity.x = 250;
        man.animations.play("right");
    }else if (gotoX < man.body.position.x){
        man.body.velocity.x = -250;
        man.animations.play("left");
    }else {
        man.body.velocity.x = 0;
        man.animations.play("rest");
    }
}

function update(){

    console.log("event.x: " + gotoX + " man.x: " + man.body.position.x);
    /*if (cursors.left.isDown){
                game.camera.x -= 4;
    }else if (cursors.right.isDown){
                game.camera.x += 4;
    }*/

    if (man && Math.abs(man.body.position.x+75 - gotoX) <= 5){
        man.body.velocity.x = 0;
        man.animations.play("rest");
    }


}

function render(){
    //game.debug.text('event: '+gotoX, 100,  100);
}
