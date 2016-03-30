//Control visibility of member functions with closure
//Globe Renderer
(function() {

    //Set Scene
        var scene = new THREE.Scene();

        //Set Camera
        var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.z = 10;


        //Configure Render
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth*(.75), window.innerHeight*(.75));
        renderer.setClearColor(0x2d3238);
        var globe = document.getElementById('globe');
        globe.appendChild(renderer.domElement);


        //Configure Sphere
        var geometry = new THREE.SphereGeometry(5, 32, 32, 6, 6.3, 6, 6.3);
        var material = new THREE.Material({
            transparent: true,
            opacity: 0.5,
            depthTest: true,
            depthWrite: true,
            alphaTest: 1,
            side: THREE.FrontSide
        });
        var sphere = new THREE.Mesh(geometry, material);
        var wireframe = new THREE.WireframeHelper(sphere, 0x00ffff);

        scene.add(sphere);
        scene.add(wireframe);

        function render() {
            requestAnimationFrame(render);

            sphere.rotation.y += 0.0001;
            renderer.render(scene, camera);
        }
        render();


})();
