//Control visibility of member functions with closure
//Globe Renderer
$( document ).ready(function() {

    var webglEl = document.getElementById('globe');

    if (!Detector.webgl) {
        Detector.addGetWebGLMessage(webglEl);
        return;
    }

    var width = window.innerWidth,
		height = window.innerHeight;

    // Earth params
    var radius = 200,
		segments = 200;


    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(65, width / height, 1, 1000);
    camera.position.z = 400;
    scene.add(camera);
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * (.75), window.innerHeight * (.75));

    scene.add(new THREE.AmbientLight(0xcccccc)); //controls sphere lighting
    
    //influences sphere oriention
    var sphere = createSphere(radius, segments);
    sphere.rotation.y = 0;
    scene.add(sphere);
    
    var stars = createStars(radius, segments);
    scene.add(stars);
    
    //OrbitControls performs rotation and zoom as needed 
    //limiting rotation in Trackballcontrols was near impossible
    var controls = new THREE.OrbitControls(camera);
    //to limit rotation of the earth and add controls to object view.
    controls.target.set(0,0,0);
    controls.minDistance = 220.0;
    controls.maxDistance = 500.0;
    
    // ADD SPRITES FOR MARKERS
    var pin = THREE.ImageUtils.loadTexture( './images/pin.png' );
    var marker = new THREE.SpriteMaterial( { map: pin } );
    var sprite = new THREE.Sprite( marker );
    sprite.position.set(0, 0, 202.5 );
    sprite.scale.set(10.0, 10.0, 1.0 );
    scene.add(sprite);
    
    //mapping equation that was found on stack overflow
    function latLongMap(lat,lon){
        var phi   = (90-lat)*(Math.PI/180),
            theta = (lon+180)*(Math.PI/180),
            x = -((radius) * Math.sin(phi)*Math.cos(theta)),
            z = ((radius) * Math.sin(phi)*Math.sin(theta)),
            y = ((radius) * Math.cos(phi));
        return new THREE.Vector3(x,y,z);
    }
    
    //for geolocation
    function onGlobeClick(event){
        
    }
    webglEl.appendChild(renderer.domElement);

    render();

    THREE.ImageUtils.crossOrigin = '';

    function render() {
        controls.update();
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function createSphere(radius, segments) {
        return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
			    map: THREE.ImageUtils.loadTexture('./images/2_no_clouds_4k.jpg'),
			    bumpMap: THREE.ImageUtils.loadTexture('./images/elev_bump_4k.jpg'),
			    bumpScale: 0.005,
			    specularMap: THREE.ImageUtils.loadTexture('./images/water_4k.png'),
			    specular: new THREE.Color('grey')
			})
		);
    }
    /*
    function createClouds(radius, segments) {
        return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),
			new THREE.MeshPhongMaterial({
			    map: THREE.ImageUtils.loadTexture('./images/fair_clouds_4k.png'),
			    transparent: true
			})
		);
    }*/
    
    function createStars(radius, segments) {
        return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshBasicMaterial({
			    map: THREE.ImageUtils.loadTexture('./images/galaxy_starfield.png'),
			    side: THREE.BackSide
			})
		);
    }


});