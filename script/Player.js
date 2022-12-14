
Player = function (game) {
    //mouse movement is wack on chrome on windows 10, but temporary hack in place in babylon.max

    this.currentSens = DEF_SENS;
    this.currentYaw = 0.022;
    var currentPitch = 0.022;
    const DEGREE_RAD_CONV = 57.2958;
    this.invertYRot = false;
    this.invertXRot = false;
    const CAMERA_INIT_Z = -2;

    var camera;
    var noclip = false;
    var scene = game.scene;
    var canvas = game.canvas;

    var _this = this;

    const IS_TESTING = false;


    //"constructor"
    (function Player() {
        createCamera();
        handleMouse();
    })();

  
    

    function createCamera() {
        // Need a free camera for collisions
        camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 4, -4), scene);

        // This targets the camera to scene origin
        camera.setTarget(new BABYLON.Vector3(0, 4.5, 0));

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);


        if (!noclip) {
            camera.applyGravity = true;
            camera.checkCollisions = true;
        }

        
        camera.fov = 1.309;
		updateSens(DEF_SENS, 0.022);
        camera.ellipsoid = new BABYLON.Vector3(1.5, 2, 1.5);

        // Enable Collisions
        scene.collisionsEnabled = true;

    }
	this.updateSensitivity = function (sens, yaw) {
        updateSens(sens, yaw);
    };

    function updateSens(sens, yaw) {

        currentPitch = yaw;
        if (!_this.invertXRot) {
            camera.angularSensibilityX = DEGREE_RAD_CONV / (currentPitch * sens);
        } else {
            camera.angularSensibilityX = DEGREE_RAD_CONV / (-currentPitch * sens);
        }

        if (!_this.invertYRot) {
            camera.angularSensibilityY = DEGREE_RAD_CONV / (yaw * sens);
        } else {
            camera.angularSensibilityY = DEGREE_RAD_CONV / (-yaw * sens);
        }
        _this.currentSens = sens;
        _this.currentYaw = yaw;
    }

    

   

    function handleMouse() {
        handlePicking();
        handlePointerLock();
    }

    var isLocked = false;


    function handlePicking() {

        // On click event, request pointer lock
        scene.onPointerDown = function (evt) {

            //true/false check if we're locked, faster than checking pointerlock on each single click.
            if (!isLocked) {
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
                if (canvas.requestPointerLock) {
                    canvas.requestPointerLock();
                }
            }

            var pickResult = scene.pick(scene.getEngine().getRenderWidth() / 2, scene.getEngine().getRenderHeight() / 2);
            if (pickResult.pickedMesh != null) {
                var pickName = pickResult.pickedMesh.name;

                if (pickName === "target" && pickResult.pickedMesh.visibility !== 0) {
                    game.targetManager.disableTarget();
                } else if (pickName === "st") {
                    game.world.startStop();
                }

            }

        };
    }

    function handlePointerLock() {

        // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
        var pointerlockchange = function (event) {
            
            var controlEnabled = document.pointerLockElement || document.mozPointerLockElement
                || document.webkitPointerLockElement || document.msPointerLockElement || false;

            // If the user is already locked
            if (!controlEnabled) {
                game.isFullScreen = false;
                camera.detachControl(canvas);
                isLocked = false;
            } else {
                camera.attachControl(canvas);
                isLocked = true;
            }
        };

        //Attach events to the document
        document.addEventListener("pointerlockchange", pointerlockchange, false);
        document.addEventListener("mspointerlockchange", pointerlockchange, false);
        document.addEventListener("mozpointerlockchange", pointerlockchange, false);
        document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
    }
    window.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 78:
                if (IS_TESTING) {
                    noclip = !noclip;
                    if (noclip) {
                        camera.applyGravity = false;
                        //Then apply collisions and gravity to the active camera
                        camera.checkCollisions = false;
                    } else {
                        camera.applyGravity = true;
                        //Then apply collisions and gravity to the active camera
                        camera.checkCollisions = true;
                    }
                    break;
                }

        }
    });
};