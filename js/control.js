FlyControls = function (camera, height) {



    var pitchObject = new THREE.Object3D();
    pitchObject.add(camera);


    var yawObject = new THREE.Object3D();
    yawObject.add( pitchObject );
    yawObject.position.y = 20;
    yawObject.position.z = 10;

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var moveUp = false;
    var moveDown = false;
    var enabled = false;
    var speed = 10000;

    var prevTime = performance.now();

    var velocity = new THREE.Vector3();

    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {
    	if (enabled == false) return;
        var movementX = event.movementX || event.mozMovementX ||  0;
        var movementY = event.movementY || event.mozMovementY ||  0;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

    };



    var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true; break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
            	moveUp = true;
            	break;
            case 18: // ctrl
            	moveDown = true;
            	break;



        }

    };

    var onKeyUp = function ( event ) {

        switch( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

             case 32: // space
            	moveUp = false;
            	break;
            case 18: // ctrl
            	moveDown = false;
            	break;

        }

    };

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );



    this.getObject = function () {

		return yawObject;

	};



     var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
            if(havePointerLock){
                var element = document.body;
                var pointerlockchange = function(event){
                    if( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
                        velocity.z = 0;
                        velocity.x = 0;
                        velocity.y = 0;
                        enabled = true;
                    }else{
                        velocity.z = 0;
                        velocity.x = 0;
                        velocity.y = 0;
                        enabled = false;
                    }
                 }



                document.addEventListener( 'pointerlockchange', pointerlockchange, false );
				document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
				document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
                document.addEventListener( 'click', function ( event ) {
					if(event.clientX >= document.width*0.8) {
						return;
					}
					// Ask the browser to lock the pointer
					element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

					if ( navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
					console.log("Mozilla");
						var fullscreenchange = function ( event ) {

							if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

								document.removeEventListener( 'fullscreenchange', fullscreenchange );
								document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

								element.requestPointerLock();
							}

						}

						document.addEventListener( 'fullscreenchange', fullscreenchange, false );
						document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

						element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

						element.requestFullscreen();

					} else {
						console.log("Not Mozilla");
						element.requestPointerLock();

					}

				}, false );

			} else {

				document.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

			}



    this.update = function () {
    	if (enabled == false) return;


        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= velocity.y * 10.0 * delta;



        if ( moveForward ) velocity.z -= speed * delta;
        if ( moveBackward ) velocity.z += speed * delta;

        if ( moveLeft ) velocity.x -= speed * delta;
        if ( moveRight ) velocity.x += speed * delta;

        if (moveUp && yawObject.position.y < height*2) velocity.y += speed * delta;
        if(moveDown && yawObject.position.y > 30)velocity.y -= speed * delta;


        yawObject.translateX( velocity.x * delta );
        yawObject.translateY( velocity.y * delta );
        yawObject.translateZ( velocity.z * delta );



        prevTime = time;

    };

    this.setPosRot = function(pos,rot){
        yawObject.position.x = pos.x;
        yawObject.position.y = pos.y;
        yawObject.position.z = pos.z;
        pitchObject.rotation.x = rot;
    }

};
