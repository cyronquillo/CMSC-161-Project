/*DRAW HALF RING*/
function half_ring (is_silhouette,scene){
    var geometry = new THREE.RingGeometry( 18.7, 10, 8, 16, 4, 3.2 );
    if (!is_silhouette){
        var texture = new THREE.TextureLoader().load("abstract_texture2.jpg");
        var material = new THREE.MeshBasicMaterial( { map:texture, side: THREE.DoubleSide } );
    }
    else var material = new THREE.MeshBasicMaterial( { color: 0xff0000  } );

    var mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x = 3.5;
    mesh.rotation.y = 1.0;
    if (is_silhouette)
    {
        // mesh.rotation.x = 2.5;
        // mesh.rotation.y = 1.0;

        mesh.rotation.x = 6.0;
        mesh.rotation.y = 4;
    }
    mesh.position.set(0,0,-30);
    scene.add( mesh );
    return mesh;
}
/*DRAW CUBE CLUSTER*/
function draw_cube_cluster (is_silhouette,scene)
    {
        if (!is_silhouette) var material = new THREE.MeshPhongMaterial( { color: 0x4283f4 } );
        else {
            var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
            console.log("_____________");
        }

        material.side = THREE.DoubleSide;
        var group = new THREE.Group();

        // Cube
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.15320661216709408 * v1 - v2;
        cube.position.y = 0.07876428314069295 * v1 - v2;
        cube.position.z = 0.8142309474976139 * v1 - v2;
        cube.scale.multiplyScalar( 0.6073612142471205 + v3 );
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.8238856026329542 * v1 - v2;
        cube.position.y = 0.66234543201572 * v1 - v2;
        cube.position.z = 0.19729624573916293 * v1 - v2;
        cube.scale.multiplyScalar( 0.943280559550606 + v3 );
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.9926546696804588 * v1 - v2;
        cube.position.y = 0.8765778360719039 * v1 - v2;
        cube.position.z = 0.3813242309186571 * v1 - v2;
        cube.scale.multiplyScalar( 0.7053419691199112 + v3 );
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.6031081092923989 * v1 - v2;
        cube.position.y = 0.8956021196243023 * v1 - v2;
        cube.position.z = 0.4731741849321296 * v1 - v2;
        cube.scale.multiplyScalar( 0.23116386542098222 + v3 );
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.6045386623736511 * v1 - v2;
        cube.position.y = 0.1515978218003433 * v1 - v2;
        cube.position.z = 0.8493106134514443 * v1 - v2;
        cube.scale.multiplyScalar( 0.40668949065033777 + v3 );
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.5256624623464787 * v1 - v2;
        cube.position.y = 0.9443117513492909 * v1 - v2;
        cube.position.z = 0.7097300006134728 * v1 - v2;
        cube.scale.multiplyScalar( 0.3425465034979849 + v3 );
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.1499476982591419 * v1 - v2;
        cube.position.y = 0.6475285864064242 * v1 - v2;
        cube.position.z = 0.9503485391441944 * v1 - v2;
        cube.scale.multiplyScalar( 0.10376880382116371 + v3 );
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.7703502139752667 * v1 - v2;
        cube.position.y = 0.5734314508105554 * v1 - v2;
        cube.position.z = 0.4395017168141062 * v1 - v2;
        cube.scale.multiplyScalar( 0.7686332584105269 + v3 );
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.5502084500031799 * v1 - v2;
        cube.position.y = 0.9254106876840575 * v1 - v2;
        cube.position.z = 0.9319475056412949 * v1 - v2;
        cube.scale.multiplyScalar( 0.6358699022891223 + v3 );
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.6798803741571171 * v1 - v2;
        cube.position.y = 0.38257666783122146 * v1 - v2;
        cube.position.z = 0.830885184120336 * v1 - v2;
        cube.scale.multiplyScalar( 0.055655523163026466 + v3 );
        group.add( cube );

        var mesh = new THREE.Mesh( group, material );

        if(is_silhouette){
            group.rotation.x = 1.5
            group.rotation.y = 8

            // group.rotation.x = 5
            // group.rotation.y = 2
        }

        scene.add(group);
        return group;
    }
/*DRAW CROSS*/
function draw_cross (is_silhouette,scene)
    {
        if (!is_silhouette) var material = new THREE.MeshPhongMaterial( { color: 0x4283f4 } );
        else var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

        material.side = THREE.DoubleSide;
        var group = new THREE.Group();

        // Cube
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 0;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 1;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = -1;
        cube.position.y = 1;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 1;
        cube.position.y = 1;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 2;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 3;
        cube.position.z = 0;
        group.add( cube );

        var mesh = new THREE.Mesh( group, material );


        if(is_silhouette){
            // group.rotation.x = 1.5
            // group.rotation.y = 8
            // group.rotation.z = 0

            group.rotation.x = 5
            group.rotation.y = 3
        }

        scene.add(group);
        return group;
    }
/*DRAW STAIRS*/
function draw_stairs (is_silhouette,scene)
    {
        if (!is_silhouette) var material = new THREE.MeshPhongMaterial( { color: 0x4283f4 } );
        else var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

        material.side = THREE.DoubleSide;
        var group = new THREE.Group();

        // Cube
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = -2;
        cube.position.y = 0-2;
        cube.position.z = 0;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = -1;
        cube.position.y = 0-2;
        cube.position.z = 0;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 0-2;
        cube.position.z = 0;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 1;
        cube.position.y = 0-2;
        cube.position.z = 0;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 2;
        cube.position.y = 0-2;
        cube.position.z = 0;
        group.add( cube );


        cube = new THREE.Mesh( geometry, material );
        cube.position.x = -2;
        cube.position.y = 1-2;
        cube.position.z = 0;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = -1;
        cube.position.y = 0;
        cube.position.z = -2;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 1-2;
        cube.position.z = 0;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 1;
        cube.position.y = 1-2;
        cube.position.z = 0;
        group.add( cube );


        cube = new THREE.Mesh( geometry, material );
        cube.position.x = -2;
        cube.position.y = 2-2;
        cube.position.z = 0;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = -1;
        cube.position.y = 2-2;
        cube.position.z = 0;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 2-2;
        cube.position.z = 0;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = -2;
        cube.position.y = 3-2;
        cube.position.z = 0;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = -1;
        cube.position.y = 3-2;
        cube.position.z = 0;
        group.add( cube );

        cube = new THREE.Mesh( geometry, material );
        cube.position.x = -2;
        cube.position.y = 4-2;
        cube.position.z = 0;
        group.add( cube );

        var mesh = new THREE.Mesh( group, material );

        if(is_silhouette){
            // group.rotation.x = -1;
            // group.rotation.y = 1.9;
            // group.rotation.y = 1;

            group.rotation.y = -1;
        }

        group.position.set(1,0.5,-3);
        scene.add(group);
        return group;
}
/*DRAW TETRIS*/
function draw_tetris_z1 (is_silhouette,scene)
    {
        if (!is_silhouette) var material = new THREE.MeshPhongMaterial( { color: 0x4283f4 } );
        else var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

        material.side = THREE.DoubleSide;
        var group = new THREE.Group();

        // Cube
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );


        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 0;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 1;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 1;
        cube.position.y = 1;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = -1;
        cube.position.y = 0;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = -2;
        cube.position.y = 0;
        cube.position.z = 0;
        group.add( cube );

        var mesh = new THREE.Mesh( group, material );


        if(is_silhouette){
            // group.rotation.x = 0;
            // group.rotation.y = 1.67;

            group.rotation.x = 1.67;
            group.rotation.y = 5.33;
        }

        scene.add(group);
        return group;
    }
    function rand_1 (is_silhouette,scene)
    {
        var group = new THREE.Group();

        // Cube
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        for ( var i = 0; i < geometry.faces.length; i += 2 ) {
                var hex = Math.random() * 0xffffff;
                geometry.faces[ i ].color.setHex( hex );
                geometry.faces[ i + 1 ].color.setHex( hex );
        }
        var material = new THREE.MeshPhongMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

        if (is_silhouette) var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 0;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = 1;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.1;
        cube.position.y = 0.1;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.5;
        cube.position.y = 1.5;
        cube.position.z = 0.0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = -1;
        cube.position.y = 1;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = -1.5;
        cube.position.y = 1.5;
        cube.position.z = 0;
        group.add( cube );

        var mesh = new THREE.Mesh( group, material );

        if (is_silhouette)
        {
            group.rotation.x = 0.5;
            group.rotation.y = 1.5;


            group.rotation.x = 1.5;
            group.rotation.y = 0.5;
        }
        scene.add(group);

        //group.position.set(3, 0, 5)
        return group;
    }

    function rand_2 (is_silhouette,scene)
    {
        var group = new THREE.Group();

        var geometry = new THREE.CubeGeometry( 1, 1, 1 );
        var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
        if (is_silhouette) var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = -2;
        cube.position.y = -2;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = -1;
        cube.position.y = -2;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = -2;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 1;
        cube.position.y = -2;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 2;
        cube.position.y = -2;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 2;
        cube.position.y = -1;
        cube.position.z = 0;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = -2;
        cube.position.z = -1;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = -2;
        cube.position.z = -2;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0;
        cube.position.y = -1;
        cube.position.z = -2;
        group.add( cube );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = -2;
        cube.position.y = -3;
        cube.position.z = 0;
        group.add( cube );

        var mesh = new THREE.Mesh( group, material );

        if (is_silhouette)
        {
            // group.rotation.x = 1.4;
            // group.rotation.y = 1;

            group.rotation.x = 6;
            group.rotation.y = 4;
        }
        scene.add(group);

        group.position.set(-1, 0, -3)
        return group;
    }

    function rand_3 (is_silhouette,scene)
    {
        var group = new THREE.Group();

        var geometry = new THREE.CubeGeometry( 1, 1, 1 );
        var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
        if (is_silhouette) var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

        var cube = new THREE.Mesh( geometry, material );
        cube.position.x = -2;
        cube.position.y = -2;
        cube.position.z = 0;
        group.add( cube );

        var mesh = new THREE.Mesh( group, material );

        if (is_silhouette)
        {
            // group.rotation.x = 1.4;
            // group.rotation.y = 1;

            // group.rotation.x = 6;
            // group.rotation.y = 4;
        }
        scene.add(group);

        group.position.set(-1, 0, -3)
        return group;
    }
