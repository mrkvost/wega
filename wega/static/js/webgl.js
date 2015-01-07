function createRenderer() {
    var $canvas = $('#canvas');
    var canvas_width = $canvas.width();
    var canvas_height = $canvas.height();

    var renderer = new THREE.WebGLRenderer({canvas: $canvas.get(0)});
    renderer.setSize(canvas_width, canvas_height);
    // document.body.appendChild( renderer.domElement );

    return renderer;
}

function createCamera() {
    var $canvas = $('#canvas');
    var aspect_ratio = $canvas.width() / $canvas.height();
    var fov = 75;   // field of view
    var near = 0.1;
    var far = 1000

    var camera = new THREE.PerspectiveCamera(fov, aspect_ratio, near, far);
    camera.position.z = 5;

    return camera;
}

function createCube(scene) {
    var mapUrl = "../static/img/kamene.jpg"
    var map = THREE.ImageUtils.loadTexture(mapUrl);

    // Create a Phong material to SHOW SHADING
    // var material = new THREE.MeshPhongMaterial({color: 0xD87F40});
    var material = new THREE.MeshPhongMaterial({ map: map });

    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // Put the geometry and material together into a mesh
    cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    return cube;
}

function createLight(scene) {
    var lightColor = 0xffFFff;
    // var lightColor = 0x999999;
    var light = new THREE.DirectionalLight(lightColor, 1.0);
    light.position.set(0, 0, 1);

    scene.add(light);
    return light;
}

$(document).ready(function() {
    var renderer = createRenderer();
    var scene = new THREE.Scene();
    var camera = createCamera();
    var cube = createCube(scene);
    var light = createLight(scene);

    function render() {
        requestAnimationFrame(render);

        cube.rotation.x += 0.03;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.01;

        renderer.render(scene, camera);
    }

    render();
});
