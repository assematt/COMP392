// App main
(function(){

    // Main variables
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();

    var sphereObject = new THREE.Mesh();
    var boxObject = new THREE.Mesh();
    var cylinderObject = new THREE.Mesh();

    // App main entry point
    function Main()
    {        
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        CreateCameraAndLights();
        CreateGeometry();
        Render();
    }

    function CreateCameraAndLights()
    {        
        camera.position.set(50, 50, 50);
        camera.lookAt(0, 0, 0);

        var axesHelper = new THREE.AxesHelper( 75 );
        scene.add( axesHelper );

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(200, 400, 300);
        scene.add(spotLight);
    }

    function CreateGeometry()
    {
        sphereObject.geometry = new THREE.SphereGeometry( 10, 32, 32 );;
        sphereObject.material = new THREE.MeshLambertMaterial({ color: 0x2194CE });
        sphereObject.position.set( 0, 0, 50 );
        scene.add( sphereObject );

        boxObject.geometry = new THREE.BoxGeometry( 10, 10, 10 );
        boxObject.material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        boxObject.position.set( 0, 0, 0 );
        scene.add( boxObject );

        cylinderObject.geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
        cylinderObject.material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        cylinderObject.position.set( 50, 0, 0 );
        scene.add( cylinderObject );

    }

    function Render()
    {
        requestAnimationFrame( Render );

        boxObject.rotation.x += 0.01;
        boxObject.rotation.y += 0.01;

        renderer.render( scene, camera );
    }

    window.addEventListener("load", Main);

})();

