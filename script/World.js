World = function (game) {

    //set the global variable for ease of use
    var scene = game.scene;
    var _this = this;

    

    const DEF_TAR_SIZE = 1;

    this.targetSize = DEF_TAR_SIZE;

    const DEF_TAR_COLOR = "#FFFFFF";

    this.targetColor = DEF_TAR_COLOR;
    this.targetColor3 = new BABYLON.Color3.FromHexString(DEF_TAR_COLOR);

    var target;

    //"constructor"
    (function Wolrd() {
        

        //background color
		
		
        scene.clearColor = new BABYLON.Color3(0.192, .302, .475);
        var hemiLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        hemiLight.intensity = 1.2;        

        createBuilding();
        createOther();

    })();

    

    function createBuilding() {
        // built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground1 = BABYLON.Mesh.CreateGround("ground1", SIZE * 2, SIZE * 2, 1, scene);
        ground1.material = new BABYLON.StandardMaterial("groundMat", scene);
        ground1.material.diffuseColor = new BABYLON.Color3(.5, .5, .5);
        ground1.material.backFaceCulling = false;
        ground1.receiveShadows = true;
        ground1.checkCollisions = true;

        
// target wall
        var wall1 = BABYLON.MeshBuilder.CreatePlane("wall1", {height: SIZE - (SIZE * .05), width: SIZE * 2}, scene);
        wall1.material = new BABYLON.StandardMaterial("wallMat", scene);
        wall1.material.diffuseColor = new BABYLON.Color3(0,0,0);
        wall1.material.backFaceCulling = false;
        wall1.position = new BABYLON.Vector3(0, SIZE / 2 - (SIZE * .05), SIZE);
        wall1.checkCollisions = true;
        
// side walls
        var wall2 = createWall("wall2", [SIZE, SIZE / 2, 0], [0, Math.PI / 2, 0]);
        

        var wall3 = createWall("wall3", [-SIZE, SIZE / 2, 0], [0, Math.PI / 2, 0]);
        

        function createWall(id, position, rotation) {
            var wall = BABYLON.MeshBuilder.CreatePlane(id, {height: 6, width: SIZE * 2.05 + SIZE * 1.25 * 3}, scene);
            wall.material = new BABYLON.StandardMaterial("wall23Mat", scene);
            wall.material.diffuseColor = new BABYLON.Color3(.5, .5, .5);
            wall.material.backFaceCulling = false;
            wall.position = new BABYLON.Vector3(position[0], 3, -SIZE * 1.875);
            wall.rotation = new BABYLON.Vector3(rotation[0], rotation[1], rotation[2]);
            wall.checkCollisions = true;
            return wall;

        }
// front wall
        var littleWall1 = BABYLON.MeshBuilder.CreateBox("lw1", {height: 4.4, width: SIZE * 2 - .05, depth: .5}, scene);
        littleWall1.material = new BABYLON.StandardMaterial("lwallMat", scene);
        littleWall1.material.diffuseColor = new BABYLON.Color3(.35, .35, .35);
        littleWall1.material.backFaceCulling = false;
        littleWall1.position.z = SIZE * .1;
        littleWall1.receiveShadows = true;
        littleWall1.checkCollisions = true;
        
		
		
		
//back wall
		var littleWall2 = BABYLON.MeshBuilder.CreateBox("lw", {height: 7.5, width: SIZE * 2 - .05, depth: .5}, scene);
		littleWall2.material = new BABYLON.StandardMaterial("lwallMat", scene);
        littleWall2.material.diffuseColor = new BABYLON.Color3(.35, .35, .35);
        littleWall2.material.backFaceCulling = false;
        littleWall2.position.z = -SIZE - 0 * (SIZE * 2);
        littleWall2.position.y = 2.2 + 0 * 2;
        littleWall2.checkCollisions = true;


        
        
// score board

        var scoreBoard = BABYLON.MeshBuilder.CreatePlane("sb", {height:7, width:  SIZE * 2 + 1}, scene);
        scoreBoard.material = new BABYLON.StandardMaterial("sbMat", scene);
        scoreBoard.material.diffuseColor = new BABYLON.Color3(.5, .5, .5);
		
        scoreBoard.material.backFaceCulling = false;
        scoreBoard.position = new BABYLON.Vector3(0, 17,13.9);
		scoreBoard.rotation = new BABYLON.Vector3(-.5, 0, 0)
    }

    this.updateTargetSize = function (size) {
        _this.targetSize = size;
        target.scaling.x = size / DEF_TAR_SIZE;
        target.scaling.y = size / DEF_TAR_SIZE;

    };

    


    function createOther() {

        //start/stop
        var start = BABYLON.MeshBuilder.CreatePlane("st", {width: 2, height: 1.5}, scene);
        start.material = new BABYLON.StandardMaterial("texturebruh", scene);
        start.position = new BABYLON.Vector3(0, 1.2, 1.2);
        start.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
        start.material.specularColor = new BABYLON.Color3(0, 0, 0);
        start.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        start.material.backFaceCulling = false;
        start.material.diffuseTexture.drawText("Start!", 145, 600, "315px arial", "#595959", "#D3D3D3");

        

        _this.startStop = function () {
            if (!game.targetManager.start) {
                start.material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
                start.material.diffuseTexture.drawText("Stop!", 145, 600, "315px arial", "#595959", "#D3D3D3");
                game.targetManager.begin();

            } else {
                start.material.diffuseTexture.getContext().clearRect(0, 0, 1024, 1024);
                start.material.diffuseTexture.drawText("Start!", 145, 600, "315px arial", "#595959", "#D3D3D3");
                game.targetManager.end();
            }
            game.targetManager.start = !game.targetManager.start;
        };
// targets
        target = BABYLON.Mesh.CreateDisc("target", DEF_TAR_SIZE, 25, scene);
        target.material = new BABYLON.StandardMaterial("textureyo", scene);
        target.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        target.position = new BABYLON.Vector3(3, 11.25, SIZE - .1);
        target.material.backFaceCulling = false;
        target.visibility = 0;
        target.isPickable = true;

 // score board text       

        var hitsText = BABYLON.MeshBuilder.CreatePlane("ht", {width: 8, height: 8}, scene);
        hitsText.material = new BABYLON.StandardMaterial("htt", scene);
        hitsText.position = new BABYLON.Vector3(-6, 17, 13.25);
		hitsText.rotation = new BABYLON.Vector3(-.5, 0, 0)

        hitsText.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
        hitsText.material.diffuseTexture.drawText("00", 0, 850, "300px arial", "white", "transparent");
        hitsText.material.diffuseTexture.hasAlpha = true;
        hitsText.material.specularColor = new BABYLON.Color3(0, 0, 0);
        hitsText.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        hitsText.material.backFaceCulling = false;
		
		var hitText = BABYLON.MeshBuilder.CreatePlane("sFT", {width: 8, height: 8}, scene);
        hitText.material = new BABYLON.StandardMaterial("mtt", scene);
        hitText.position = new BABYLON.Vector3(-6, 19, 11);
		hitText.rotation = new BABYLON.Vector3(-.5, 0, 0)
		
		hitText.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
        hitText.material.diffuseTexture.drawText("Hit", 0, 850, "300px arial", "white", "transparent");
        hitText.material.diffuseTexture.hasAlpha = true;
        hitText.material.specularColor = new BABYLON.Color3(0, 0, 0);
        hitText.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        hitText.material.backFaceCulling = false;

        var missesText = BABYLON.MeshBuilder.CreatePlane("mt", {width: 10, height: 10}, scene);
        missesText.material = new BABYLON.StandardMaterial("mtt", scene);
        missesText.position = new BABYLON.Vector3(6, 15, 14.25);
		missesText.rotation = new BABYLON.Vector3(-.5, 0, 0)

        missesText.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
        missesText.material.diffuseTexture.drawText("00", 450, 550, "250px arial", "white", "transparent");
        missesText.material.diffuseTexture.hasAlpha = true;
        missesText.material.specularColor = new BABYLON.Color3(0, 0, 0);
        missesText.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        missesText.material.backFaceCulling = false;

        var shotsFailedText = BABYLON.MeshBuilder.CreatePlane("sFT", {width: 10, height: 10}, scene);
        shotsFailedText.material = new BABYLON.StandardMaterial("mtt", scene);
        shotsFailedText.position = new BABYLON.Vector3(6, 13.5, 13);
		shotsFailedText.rotation = new BABYLON.Vector3(-.5, 0, 0)

        shotsFailedText.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", 1024, scene, true);
        shotsFailedText.material.diffuseTexture.drawText("Missed", 250, 200, "250px arial", "white", "transparent");
        shotsFailedText.material.diffuseTexture.hasAlpha = true;
        shotsFailedText.material.specularColor = new BABYLON.Color3(0, 0, 0);
        shotsFailedText.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        shotsFailedText.material.backFaceCulling = false;


    }
};



