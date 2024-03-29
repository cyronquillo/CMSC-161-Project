/*Calls Timer Function on load*/
// runs the time once the page has loaded
window.onload = function () {
    setTime();
};

var millisecondsLabel = document.getElementById("milliseconds");
var secondsLabel = document.getElementById("seconds");
setInterval(setTime, 0);
var totalSeconds = 0;
var rotateContainer = document.getElementById("rotateCanvas");
var sillContainer = document.getElementById("sillhouetteCanvas");
var sillCanvasDimension = 400;
var rotateCanvasWidth = 900;
var rotateCanvasHeight = 500;
var three = THREE;
var scene = new three.Scene();
var sillScene = new three.Scene();
var sillCamera = new three.PerspectiveCamera(70, sillCanvasDimension / sillCanvasDimension, 0.1, 1000);
var camera = new three.PerspectiveCamera(70, rotateCanvasWidth / rotateCanvasHeight, 0.1, 1000);
var count = 1;
var sillRenderer = new three.WebGLRenderer();
var renderer = new three.WebGLRenderer();
var local = localStorage;

sillRenderer.setSize(400, 400);
renderer.setSize(900, 500);
document.body.appendChild(sillRenderer.domElement);
document.body.appendChild(renderer.domElement);


var spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-0, 30, 60)
spotLight.intensity = 0.6
scene.add(spotLight)

sillhouette = half_ring(true, sillScene, 0)
currentObject = half_ring(false, scene, 0)



sillContainer.appendChild(sillRenderer.domElement);
rotateContainer.appendChild(renderer.domElement);

// sets the z coordinate of the sillhouette object and the rotating object 
camera.position.z = 5;
sillCamera.position.z = 5;


var isDragging = false;

// initial rotation angle of the object
var previousMousePosition = {
    x: 0,
    y: 0
};

// jquery snippet for rotating the object using the mouse
$(renderer.domElement).on('mousedown', function (e) {
    isDragging = true;
}).on('mousemove', function (e) {
    // the basis of the object rotation is the previous position of the mouse
    var deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
    };

    if (isDragging) {
        var deltaRotationQuaternion = new three.Quaternion()
            .setFromEuler(new three.Euler(
                toRadians(deltaMove.y),
                toRadians(deltaMove.x),
                0,
                'XYZ'
            )).normalize();
        currentObject.mesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, currentObject.mesh.quaternion);

    }
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});

// keylistener when the mouse is released
$(document).on('mouseup', function (e) {
    isDragging = false;
});

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// renders the sillhouette scene and the main game canvase scene
function render() {
    renderer.render(scene, camera);
    sillRenderer.render(sillScene, sillCamera)
    requestAnimFrame(render);
}
render();

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

//function for displaying the time
var lastFrameTime = new Date().getTime() / 1000;
var totalGameTime = 0;
function update(dt, t) {
    setTimeout(function () {
        var currTime = new Date().getTime() / 1000;
        var dt = currTime - (lastFrameTime || currTime);
        totalGameTime += dt;
        update(dt, totalGameTime);
        lastFrameTime = currTime;
    }, 0);
}
update(0, totalGameTime);

/*Function for Timer*/
function setTime() {
    totalSeconds += 5;
    secondsLabel.innerHTML = pad(parseInt(totalSeconds / 1000));
    millisecondsLabel.innerHTML = pad(parseInt(totalSeconds % 1000));
}

function setLocal(key, value) {
    localStorage.setItem(key, value);
}

function getLocal(key) {
    return localStorage.getItem(key);
}


// function called when the player reached and finished the 10th stage of the game
function addHighScore(score) {
    var time = score.split(",");
    var seconds = time[0];
    var milli = time[1];
    for (var i = 0; i < 5; i += 1) {
        var curr_time = getLocal(i).split(",");
        var curr_sec = curr_time[0];
        var curr_milli = curr_time[1];
        if (parseInt(seconds) < parseInt(curr_sec) || (parseInt(seconds) == parseInt(curr_sec) && parseInt(milli) < parseInt(curr_milli))) {
            console.log("setting " + i + " : " + score);
            seconds = curr_sec;
            milli = curr_milli;
            setLocal(i, score);
            if (i + 1 < 5 && score != '99999999, 999') setLocal(i + 1, curr_sec + "," + curr_milli);
            break;
        }
    }
}

// function for formatting the time elapsed being displayed
function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

/*DRAW HALF RING*/
// draws the first object
function half_ring(is_silhouette, scene, i) {
    var geometry = new THREE.RingGeometry(18.7, 10, 8, 16, 4, 3.2);
    if (!is_silhouette) {
        var texture = new THREE.TextureLoader().load("imgs/abstract_texture2.jpg");
        var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    }
    else if (is_silhouette && i == 0) var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    else var material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = 3.5;
    mesh.rotation.y = 1.0;
    if (!is_silhouette) {
        mesh.rotation.x = 6.0;
        mesh.rotation.y = 4;
    }
    mesh.position.set(0, 0, -30);
    scene.add(mesh);
    return {
        mesh: mesh,
        solutions: [
            [3.5, 1],
            [-0.75, -0.83],
            [-3.12, 1],
            [0.36, -0.97]
        ]
    }
}

/*DRAW TORUS KNOT*/
// draws the 2nd object
function draw_torus_knot(is_silhouette, scene, i) {
    var geometry = new THREE.TorusKnotGeometry(10, 3, 100, 35);
    var material;
    if (!is_silhouette) {
        var texture = new THREE.TextureLoader().load("imgs/abstract_texture.jpg");
        material = new THREE.MeshPhongMaterial({ map: texture });
    }
    else if (is_silhouette && i == 0) {
        material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    }
    else {
        material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.2 });
    }
    material.side = THREE.DoubleSide;
    var torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.position.set(0, 0, -25);

    if (is_silhouette) {
        torusKnot.rotation.z = 0;
        torusKnot.rotation.x = 2.5;
        torusKnot.rotation.y = 2.0;
    }

    scene.add(torusKnot);
    return {
        mesh: torusKnot,
        solutions: [
            [2.5, 2.0],
            [-0.88, 1.09],
            [2.33, -1.07],
        ],
    };
}

/*DRAW CUBE CLUSTER*/
// draws the 3rd object of the game
function draw_cube_cluster(is_silhouette, scene, i) {
    const v1 = 2;
    const v2 = 1;
    const v3 = 0.5;


    if (!is_silhouette) var material = new THREE.MeshPhongMaterial({ color: 0x4283f4 });
    else if (is_silhouette && i == 0) {
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    }
    else {
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.2 });
    }

    material.side = THREE.DoubleSide;
    var group = new THREE.Group();

    // Cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.15320661216709408 * v1 - v2;
    cube.position.y = 0.07876428314069295 * v1 - v2;
    cube.position.z = 0.8142309474976139 * v1 - v2;
    cube.scale.multiplyScalar(0.6073612142471205 + v3);
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.8238856026329542 * v1 - v2;
    cube.position.y = 0.66234543201572 * v1 - v2;
    cube.position.z = 0.19729624573916293 * v1 - v2;
    cube.scale.multiplyScalar(0.943280559550606 + v3);
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.9926546696804588 * v1 - v2;
    cube.position.y = 0.8765778360719039 * v1 - v2;
    cube.position.z = 0.3813242309186571 * v1 - v2;
    cube.scale.multiplyScalar(0.7053419691199112 + v3);
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.6031081092923989 * v1 - v2;
    cube.position.y = 0.8956021196243023 * v1 - v2;
    cube.position.z = 0.4731741849321296 * v1 - v2;
    cube.scale.multiplyScalar(0.23116386542098222 + v3);
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.6045386623736511 * v1 - v2;
    cube.position.y = 0.1515978218003433 * v1 - v2;
    cube.position.z = 0.8493106134514443 * v1 - v2;
    cube.scale.multiplyScalar(0.40668949065033777 + v3);
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.5256624623464787 * v1 - v2;
    cube.position.y = 0.9443117513492909 * v1 - v2;
    cube.position.z = 0.7097300006134728 * v1 - v2;
    cube.scale.multiplyScalar(0.3425465034979849 + v3);
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.1499476982591419 * v1 - v2;
    cube.position.y = 0.6475285864064242 * v1 - v2;
    cube.position.z = 0.9503485391441944 * v1 - v2;
    cube.scale.multiplyScalar(0.10376880382116371 + v3);
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.7703502139752667 * v1 - v2;
    cube.position.y = 0.5734314508105554 * v1 - v2;
    cube.position.z = 0.4395017168141062 * v1 - v2;
    cube.scale.multiplyScalar(0.7686332584105269 + v3);
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.5502084500031799 * v1 - v2;
    cube.position.y = 0.9254106876840575 * v1 - v2;
    cube.position.z = 0.9319475056412949 * v1 - v2;
    cube.scale.multiplyScalar(0.6358699022891223 + v3);
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.6798803741571171 * v1 - v2;
    cube.position.y = 0.38257666783122146 * v1 - v2;
    cube.position.z = 0.830885184120336 * v1 - v2;
    cube.scale.multiplyScalar(0.055655523163026466 + v3);
    group.add(cube);

    var mesh = new THREE.Mesh(group, material);
    if (is_silhouette) {
        group.rotation.x = 1.5
        group.rotation.y = 8

        // group.rotation.x = 5
        // group.rotation.y = 2
    }
    scene.add(group);
    return {
        mesh: group,
        solutions: [
            [1.5, 8],
            [-1.78, 1.46]

        ]
    }
}

/*DRAW CROSS*/
// draws the 4th object of the game
function draw_cross(is_silhouette, scene, i) {
    const v1 = 2;
    const v2 = 1;
    const v3 = 0.5;

    if (!is_silhouette) var material = new THREE.MeshPhongMaterial({ color: 0x4283f4 });
    else if (is_silhouette && i == 0) var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    else var material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.2 });
    material.side = THREE.DoubleSide;
    var group = new THREE.Group();

    // Cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -1;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 1;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 2;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 3;
    cube.position.z = 0;
    group.add(cube);

    var mesh = new THREE.Mesh(group, material);

    if (is_silhouette) {
        // group.rotation.x = 1.5
        // group.rotation.y = 8
        // group.rotation.z = 0

        group.rotation.x = 5
        group.rotation.y = 3
    }
    scene.add(group);
    return {
        mesh: group,
        solutions: [
            [5, 3],
            [1.85, 0.15],
            [-1.30, -0.08]

        ]
    }
}

/*DRAW STAIRS*/
//draws the 5th object of the game
function draw_stairs(is_silhouette, scene, i) {
    const v1 = 2;
    const v2 = 1;
    const v3 = 0.5;

    if (!is_silhouette) var material = new THREE.MeshPhongMaterial({ color: 0x4283f4 });
    else if (is_silhouette && i == 0) var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    else var material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.2 });

    material.side = THREE.DoubleSide;
    var group = new THREE.Group();

    // Cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 1;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 3;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 4;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);


    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    cube.position.y = 0;
    cube.position.z = -4;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 3;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);


    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 2;
    cube.position.z = 0;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 1;
    cube.position.y = 2;
    cube.position.z = 0;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    cube.position.y = 2;
    cube.position.z = 0;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 3;
    cube.position.z = 0;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 1;
    cube.position.y = 3;
    cube.position.z = 0;
    group.add(cube);

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 4;
    cube.position.z = 0;
    group.add(cube);

    var mesh = new THREE.Mesh(group, material);

    group.position.set(1, 0.5, -3);
    if (is_silhouette) {
        // group.rotation.x = -1;
        // group.rotation.y = 1.9;
        // group.rotation.y = 1;
        //group.position.set(1,0.5,-3);
        group.rotation.y = 1;
        group.rotation.x = -4;
    }

    scene.add(group);
    return {
        mesh: group,
        solutions: [
            [2.25, 1],
            [-4, 1]
        ]
    }
}

/*DRAW TETRIS*/
// draws the 6th object of the game
function draw_tetris_z1(is_silhouette, scene, i) {
    const v1 = 2;
    const v2 = 1;
    const v3 = 0.5;

    if (!is_silhouette) var material = new THREE.MeshPhongMaterial({ color: 0x4283f4 });
    else if (is_silhouette && i == 0) var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    else var material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.2 });

    material.side = THREE.DoubleSide;
    var group = new THREE.Group();

    // Cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);


    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 1;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -1;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -2;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var mesh = new THREE.Mesh(group, material);
    if (is_silhouette) {
        group.rotation.x = 1.67;
        group.rotation.y = 5.33;
    }
    scene.add(group);
    return {
        mesh: group,
        solutions: [
            [1.67, 5.33],
            [1.78, -0.91]
        ]
    };
}


//function for rendering the 7th object of the game
function rand_1(is_silhouette, scene, i) {
    const v1 = 2;
    const v2 = 1;
    const v3 = 0.5;

    var group = new THREE.Group();

    // Cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    console.log(is_silhouette && i == 0);
    if (is_silhouette && i == 0) {
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        console.log("SILL")
    }
    else if (is_silhouette && i == 1) {
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.2 });
        console.log("OVERLAY")
    }

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.1;
    cube.position.y = 0.1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0.5;
    cube.position.y = 1.5;
    cube.position.z = 0.0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -1;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -1.5;
    cube.position.y = 1.5;
    cube.position.z = 0;
    group.add(cube);

    var mesh = new THREE.Mesh(group, material);

    if (is_silhouette) {
        group.rotation.x = 0.5;
        group.rotation.y = 1.5;
    }
    scene.add(group);

    //group.position.set(3, 0, 5)
    return {
        mesh: group,
        solutions: [
            [0.5, 1.5],
            [-1.78, 1.25]
            [1.00, 1.25]
        ]
    }
}

// function for rendering the 8th object of the game
function rand_2(is_silhouette, scene, i) {
    var group = new THREE.Group();

    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    if (is_silhouette && i == 0) var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    else if (is_silhouette && i == 1) var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.2 });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -2;
    cube.position.y = -2;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -1;
    cube.position.y = -2;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = -2;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 1;
    cube.position.y = -2;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    cube.position.y = -2;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    cube.position.y = -1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = -2;
    cube.position.z = -1;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = -2;
    cube.position.z = -2;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = -1;
    cube.position.z = -2;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -2;
    cube.position.y = -3;
    cube.position.z = 0;
    group.add(cube);

    var mesh = new THREE.Mesh(group, material);

    if (is_silhouette) {
        // group.rotation.x = 1.4;
        // group.rotation.y = 1;

        group.rotation.x = 6;
        group.rotation.y = 4;
    }
    scene.add(group);

    group.position.set(-1, 0, -3)
    return {
        mesh: group,
        solutions: [
            [6, 4],
            [2.9, -1.0]
        ]
    }
}

// function for rendering the 9th object of the game
function rand_3(is_silhouette, scene, i) {
    var group = new THREE.Group();

    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    if (is_silhouette && i == 0) var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    else if (is_silhouette && i == 1) var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.2 });

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 1;
    cube.position.y = 1;
    cube.position.z = -1;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -1;
    cube.position.y = 0;
    cube.position.z = -1;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    cube.position.y = 2;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    cube.position.y = 3;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 1;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 3;
    cube.position.y = 3;
    cube.position.z = -1;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 3;
    cube.position.y = 2;
    cube.position.z = -1;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var mesh = new THREE.Mesh(group, material);
    group.position.set(0, 1.5, -5)
    if (is_silhouette) {
        group.rotation.x = 4;
        group.rotation.y = 1;
    }
    scene.add(group);


    return {
        mesh: group,
        solutions: [
            [4, 1],
            [-2.15, 1.06]
        ]
    }
}

// function for rendering the 10th object of the game
function rand_4(is_silhouette, scene, i) {
    var group = new THREE.Group();

    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    if (is_silhouette && i == 0) var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    else if (is_silhouette && i == 1) var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.2 });

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = -1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 1;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -1;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 1;
    cube.position.y = -1;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 2;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 1;
    cube.position.y = 2;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -2;
    cube.position.y = 0;
    cube.position.z = 0;
    group.add(cube);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = -2;
    cube.position.y = 1;
    cube.position.z = 0;
    group.add(cube);

    var mesh = new THREE.Mesh(group, material);
    group.position.set(0, 0, -5)
    if (is_silhouette) {
        group.rotation.x = 2;
        group.rotation.y = 3;

        // group.rotation.x = 4;
        // group.rotation.y = 7;
    }
    scene.add(group);


    return {
        mesh: group,
        solutions: [
            [-1.21, -0.03],
            [2, 3]
        ]
    }
}

// function for checking
function check_threshold(obj) {
    var sols = obj.solutions;
    for (var i = 0; i < sols.length; i++) {
        var x = obj.mesh.rotation.x - sols[i][0];
        var y = obj.mesh.rotation.y - sols[i][1];

        // gets the distance between the rotation coordinates of the original
        // from the solution. assigns a threshold of 1.00. if the distance is
        // below 1.00, the object matches the sillhouette
        var dist = Math.sqrt(x * x + y * y);
        if (dist <= 1) return true;
    }
    return false;
}
// button function for checking if the shape matches the sillhouette
// proceeds to the next stage if it does
// if not, adds 5 secs to time penalty and presents an alert saying the object doesn't match the sillhouette
function checkAnswer() {
    var boo = check_threshold(currentObject);
    if (!boo) {
        totalSeconds += 5000;
        alert("does not match sillhouette!")
    } else {
        count++;
        console.log("count: " + count);
        console.log("children: " + scene.children.length)
        console.log("sillchildren: " + sillScene.children.length)
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]); //clear canvas
        }
        sillScene.remove(sillScene.children[0]); //clear canvas
        var spotLight = new THREE.SpotLight(0xffffff)
        spotLight.position.set(-0, 30, 60)
        spotLight.intensity = 1
        scene.add(spotLight)

        if (count == 2) {
            sillhouette = draw_torus_knot(true, sillScene, 0)
            currentObject = draw_torus_knot(false, scene, 0)
        }
        else if (count == 3) {
            sillhouette = draw_cube_cluster(true, sillScene, 0)
            currentObject = draw_cube_cluster(false, scene, 0)
        }
        else if (count == 4) {
            sillhouette = draw_cross(true, sillScene, 0)
            currentObject = draw_cross(false, scene, 0)
        }
        else if (count == 5) {
            sillhouette = draw_stairs(true, sillScene, 0)
            currentObject = draw_stairs(false, scene, 0)
        }
        else if (count == 6) {
            sillhouette = draw_tetris_z1(true, sillScene, 0)
            currentObject = draw_tetris_z1(false, scene, 0)
        }
        else if (count == 7) {
            sillhouette = rand_1(true, sillScene, 0)
            currentObject = rand_1(false, scene, 0)
        }
        else if (count == 8) {
            sillhouette = rand_2(true, sillScene, 0)
            currentObject = rand_2(false, scene, 0)
        }
        else if (count == 9) {
            sillhouette = rand_3(true, sillScene, 0);
            currentObject = rand_3(false, scene, 0);
        }
        else if (count == 10) {
            sillhouette = rand_4(true, sillScene, 0);
            currentObject = rand_4(false, scene, 0);
        }
        else if (count > 10) {
            final_time = document.getElementById("seconds").innerHTML + "," + document.getElementById("milliseconds").innerHTML;
            console.log("FT:" + final_time);
            addHighScore(final_time);
            window.location.href = "highscore.html"
        }
    }
}

// displays the overlay or hint in the playing canvas
// adds 10 secs as penalty to the total time
function showOverlay() {
    totalSeconds += 10000
    if (count == 1) {
        if (scene.children.length == 2) overlay = half_ring(true, scene, 1);
    }
    else if (count == 2) {
        if (scene.children.length == 2) overlay = draw_torus_knot(true, scene, 1);
    }
    else if (count == 3) {
        if (scene.children.length == 2) overlay = draw_cube_cluster(true, scene, 1);
    }
    else if (count == 4) {
        if (scene.children.length == 2) overlay = draw_cross(true, scene, 1);
    }
    else if (count == 5) {
        if (scene.children.length == 2) overlay = draw_stairs(true, scene, 1);
    }
    else if (count == 6) {
        if (scene.children.length == 2) overlay = draw_tetris_z1(true, scene, 1);
    }
    else if (count == 7) {
        if (scene.children.length == 2) overlay = rand_1(true, scene, 1);
    }
    else if (count == 8) {
        if (scene.children.length == 2) overlay = rand_2(true, scene, 1);
    }
    else if (count == 9) {
        if (scene.children.length == 2) overlay = rand_3(true, scene, 1);
    }
    else if (count == 10) {
        if (scene.children.length == 2) overlay = rand_4(true, scene, 1);
    }
}

// removes the overlay in the playing canvas
function removeOverlay() {
    if (scene.children.length == 3) {
        scene.remove(scene.children[2])
    }
}