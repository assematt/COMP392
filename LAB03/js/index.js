// App main
(function(){

    // Main variables
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    
    var controls = new function() {
        // Ambient light
        this.ambientLight = true;
        this.ambientColor = 0x333333;

        // Spot light
        this.spotLight = true;
        this.spotColor = 0xcc6666;

        // Point light
        this.pointLight = true;
        this.pointColor = 0x6666ff;

        // Directional light
        this.directionalLight = true;
        this.directionalColor = 0x77ff77;

        // RectArea light
        this.rectAreaLight = true;
        this.rectAreaColor = 0xff00000;

        // RectArea light
        this.hemisphereLight = true;
        this.hemisphereColor = 0xffFF000;

        this.groundColor = 0xeeeeee;
    }
      
    // UI
    var gui = new dat.GUI();

    // Scene Objects
    var sphereObject = new THREE.Mesh();
    var boxObject = new THREE.Mesh();
    var planeObject = new THREE.Mesh();

    // Scene lights
    var ambientLight = new THREE.AmbientLight(0x0000ff);
    var spotLight = new THREE.SpotLight(0xff00ff);
    var pointLight = new THREE.PointLight(0x00ffff);
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1, 100 );
    var areaLight = new THREE.RectAreaLight( 0x00FF00, 1, 100, 30 );
    var hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );

    // App main entry point
    function Main()
    {        
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;
        document.body.appendChild( renderer.domElement );

        CreateCameraAndLights();
        CreateGeometry();
        UISetup();
        Render();
    }

    function CreateCameraAndLights()
    {        
        camera.position.set(150, 80, 150);
        camera.lookAt(0, 0, 0);

        var axesHelper = new THREE.AxesHelper( 75 );
        scene.add( axesHelper );

        // Create an ambient light
        ambientLight.visible = controls.ambientLight;
        ambientLight.color = new THREE.Color(controls.ambientColor);
        scene.add(ambientLight);

        // Create a spotlight        
        spotLight.position.set(0, 100, 50);
        spotLight.castShadow = true;
        scene.add(spotLight);

        // Create a pointlight        
        pointLight.position.set(10, 10, 10);
        pointLight.castShadow = true;
        scene.add(pointLight);

        // Create a DirectionalLIght        
        directionalLight.position.set( 50, 60, 50 ); 
        directionalLight.target = boxObject;
        directionalLight.castShadow = true;

        //Set up shadow properties for the light
        directionalLight.shadow.mapSize.width = 512;  // default
        directionalLight.shadow.mapSize.height = 512; // default
        directionalLight.shadow.camera.near = 0.5;    // default
        directionalLight.shadow.camera.far = 500;     // default
        scene.add( directionalLight.target );
        scene.add( directionalLight );

        // Create a AreaLight        
        areaLight.position.set( 0, 30, 50 ); 
        areaLight.lookAt(10, 0, 10 );        
        scene.add( areaLight );

        areaLightHelper = new THREE.RectAreaLightHelper( areaLight );
        areaLight.add( areaLightHelper );

        // And an hemisphere light
        scene.add( hemisphereLight );
       
    }

    function CreateGeometry()
    {
        sphereObject.geometry = new THREE.SphereGeometry( 10, 32, 32 );;
        sphereObject.material = new THREE.MeshPhongMaterial({ color: 0x66aa66, specular: 0x0000ff });
        sphereObject.position.set( 75, 15, 50 );
        sphereObject.castShadow = true;
        sphereObject.receiveShadow = true;
        scene.add( sphereObject );

        boxObject.geometry = new THREE.BoxGeometry( 40, 40, 10 );
        boxObject.material = new THREE.MeshLambertMaterial( {color: 0xeeeeee} );
        boxObject.position.set( 50, 40, 50 );
        boxObject.rotateX(0.5 * 3.14);
        boxObject.castShadow = true;
        boxObject.receiveShadow = true;
        scene.add( boxObject );

        planeObject.geometry = new THREE.PlaneGeometry( 100, 100, 10 );
        planeObject.material = new THREE.MeshLambertMaterial( {color: 0xeeeeee, side: THREE.DoubleSide} );
        planeObject.position.set( 50, 0, 50 );
        planeObject.rotateX(0.5 * 3.14);
        planeObject.castShadow = true;
        planeObject.receiveShadow = true;
        scene.add( planeObject );

    }

    function UISetup()
    {
        gui.add(controls, "ambientLight");
        gui.addColor(controls, "ambientColor");

        gui.add(controls, "spotLight");
        gui.addColor(controls, "spotColor");

        gui.add(controls, "pointLight");
        gui.addColor(controls, "pointColor");

        gui.add(controls, "directionalLight");
        gui.addColor(controls, "directionalColor");

        gui.add(controls, "rectAreaLight");
        gui.addColor(controls, "rectAreaColor");

        gui.add(controls, "hemisphereLight");
        gui.addColor(controls, "hemisphereColor");

        gui.addColor(controls, "groundColor");
    }

    function Render()
    {
        requestAnimationFrame( Render );

        // Update ambient light
        ambientLight.visible = controls.ambientLight;
        ambientLight.color = new THREE.Color(controls.ambientColor);

        // Update ambient light
        spotLight.visible = controls.spotLight;
        spotLight.color = new THREE.Color(controls.spotColor);

        // Update ambient light
        pointLight.visible = controls.pointLight;
        pointLight.color = new THREE.Color(controls.pointColor);

        // Update ambient light
        directionalLight.visible = controls.directionalLight;
        directionalLight.color = new THREE.Color(controls.directionalColor);

        // Update ambient light
        areaLight.visible = controls.rectAreaLight;
        areaLight.color = new THREE.Color(controls.rectAreaColor);

        // Update ambient light
        hemisphereLight.visible = controls.hemisphereLight;
        hemisphereLight.color = new THREE.Color(controls.hemisphereColor);

        planeObject.material.color = new THREE.Color(controls.groundColor);

        renderer.render( scene, camera );
    }

    window.addEventListener("load", Main);

})();

