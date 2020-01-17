// App main
(function(){

    // Main variables
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    
    var controls = new function() {
        this.shapes = "shapes";
        this.size = 1;
        this.color = 0xFF0000;
        this.showVariables = function() {
            console.log("Shapes: (" + this.shapes + ")");
            console.log("Size: (" + this.size + ")");
            console.log("Color: (" + this.color + ")");
        };
        this.createObject = function() {
            var newObject = new THREE.Mesh();

            if (this.shapes === "Box")
            {
                newObject.geometry = new THREE.BoxGeometry( this.size, this.size, this.size );
            }
            else if (this.shapes === "Sphere")
            {
                newObject.geometry = new THREE.SphereGeometry( this.size, 32, 32 );
            }
            
            newObject.material = new THREE.MeshLambertMaterial({ color: this.color });
            newObject.position.set( Math.random() * 50, Math.random() * 50, Math.random() * 50 );
            scene.add( newObject );

        };
    }
      
    // UI
    var gui = new dat.GUI();

    // Scene Objects
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
        UISetup();
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
        //scene.add( boxObject );

        cylinderObject.geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
        cylinderObject.material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        cylinderObject.position.set( 50, 0, 0 );
        scene.add( cylinderObject );

    }

    function UISetup()
    {
        var folder = gui.addFolder('Shape Properties');
        folder.add(controls, "shapes", { Box: 'Box', Sphere: 'Sphere'});
        folder.add(controls, "size", 2, 6, 1);
        folder.addColor(controls, "color");
        folder.add(controls, "createObject");
        folder.close();

        gui.add(controls, "showVariables");
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

