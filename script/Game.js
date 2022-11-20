//global varible used in player and world class
const SIZE = 15;
//used in MenuInputManager and Player
const DEF_SENS = 4;

window.addEventListener('DOMContentLoaded', function () {
        
    new Game();
});

Game = function () {
    this.canvas = document.getElementById('renderCanvas');
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    var _this = this;

    this.world = new World(this);
    this.player = new Player(this);
    this.targetManager = new TargetManager(this);
    

    this.engine.runRenderLoop(function () {
        _this.scene.render();
    });
	
    

};

