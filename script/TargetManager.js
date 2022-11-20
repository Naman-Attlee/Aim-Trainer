TargetManager = function (game) {
    
    const MAXX = 12.5;
    const MINX = -12.5;
    const MAXY = 11.25;
    const MINY = 1.75;

    //used in world file
    this.start = false;

    this.maxTargets = 25; //no of targets
    this.delay = .25; //after how much time target show up
    this.tarDuration = .75; //till how much time target is visible
	

    var targetsHit = 0;
    var totalTargets = 0;

    var scene = game.scene;

    var target = scene.getMeshByName("target");

    var targetDurTimer = new Timer(this.tarDuration * 1000, scene, moveTarget);

    //short delay for visual feedback upon shooting target
    var shotTimer = new Timer(100, scene, moveTarget);

    var delayTimer = new Timer(this.delay * 1000, scene, startTarget);

    

    

    var _this = this;

    var whiteTarColor = new BABYLON.Color3(255,255,255);
    var blackTarColor = new BABYLON.Color3(0,255,0);
    this.isDarkColor = false;

    
        

    this.disableTarget = function () {
        targetsHit++;
        scene.getMeshByName("ht").material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
        scene.getMeshByName("ht").material.diffuseTexture.drawText(scoreString(targetsHit), 0, 850, "300px arial", "white", "transparent");

        targetDurTimer.reset();
        delayTimer.reset();

        if(_this.isDarkColor){
            target.material.diffuseColor = whiteTarColor;
        } else {
            target.material.diffuseColor = blackTarColor;
        }

        shotTimer.reset();
        shotTimer.start();
        
    };
// missed targets
    function moveTarget() {

        totalTargets++;

        scene.getMeshByName("mt").material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
        scene.getMeshByName("mt").material.diffuseTexture.drawText(scoreString(totalTargets - targetsHit),
            450, 550, "250px arial", "white", "transparent");

        target.visibility = 0;
        target.position = getNextPosition();

        if (totalTargets < _this.maxTargets) {
            delayTimer.reset();

            delayTimer.start();
        } else {
            game.world.startStop();
        }

    }

    this.updateDelay = function(tarDelay){
        this.delay = tarDelay;
        delayTimer = new Timer(this.delay * 1000, scene, startTarget);
    };

    this.updateTargetDuration = function(duration){
        this.tarDuration = duration;
        targetDurTimer = new Timer(this.tarDuration * 1000, scene, moveTarget);
    };
    function startTarget() {

        targetDurTimer.reset();
        target.material.diffuseColor = game.world.targetColor3;
        target.visibility = 1;
        targetDurTimer.start();

    }

    //return Babylon vector3
    function getNextPosition() {
        var x = 0;
        var y = 0;
		
        while ((x < 2 && x > -2) || (y < 8 && y > 4)) {
			
			x = Math.random() * Math.abs(MAXX - MINX) - MAXX;			
            y = Math.random() * Math.abs(MAXY - MINY) + MINY;
			
			
        }
		
        return new BABYLON.Vector3(x, y, target.position.z);
		
    }

    function scoreString(count) {
        if (count >= 0 && count < 10)
            return "0" + count;
        else if (count >= 10 && count < 100)
            return "" + count;
        else
            return count + "";
    }

    this.begin = function () {
        scene.getMeshByName("ht").material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
        scene.getMeshByName("ht").material.diffuseTexture.drawText("00",  0, 850, "300px arial",
            "white", "transparent");
        scene.getMeshByName("mt").material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
        scene.getMeshByName("mt").material.diffuseTexture.drawText("00", 450, 550, "250px arial",
         "white", "transparent");

        totalTargets = 0;
        targetsHit = 0;
        target.position = getNextPosition();
        delayTimer.start();
    };

    this.end = function () {
        targetDurTimer.reset();
        delayTimer.reset();
        shotTimer.reset();
        target.visibility = 0;
    };

};




