function relativeMousePosition(event) {
    var $element = $(event.target);
    var posX = $element.offset().left;
    var posY = $element.offset().top;
    return {x: event.pageX - posX, y: event.pageY - posY};
}

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
    var fov = 70;   // field of view
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

function createAmbientLight(scene) {
    var lightColor = 0xaaAAaa;
    var ambientLight = new THREE.AmbientLight(lightColor);
    ambientLight.position.set(0, 0, 1);

    scene.add(ambientLight);
    return ambientLight;
}

function createLight(scene) {
    var lightColor = 0x222222;
    // var lightColor = 0x999999;
    var light = new THREE.DirectionalLight(lightColor, 1.0);
    light.position.set(0, 0, 1);

    scene.add(light);
    return light;
}

function modelsManager(scene) {
    // loads models and works with them...
    var _DEFAULTS = {
        position: {x: 0, y: 0, z: 0},
        // scale: {x: 1, y: 1, z: 1},
        scale: {x: 2.5, y: 2.5, z: 2.5},
        rotation: {x: 0, y: 0, z: 0},
        animates: false,
        animate: function(mesh, manager) {},
        onLoad: function(mesh, manager) {},
    }

    return {
        _scene: scene,
        _jsonLoader: new THREE.JSONLoader(),
        models: {},
        meshes: function() {
            var meshes = [];
            for (modelName in this.models) {
                meshes.push(this.mesh(modelName));
            }
            return meshes;
        },

        load: function(url, modelName, initial) {
            var that = this;
            var initial = _.defaults({}, initial, _DEFAULTS);
            // console.log('initial', initial);

            var addModelToScene = function(geometry, materials) {
                var material = new THREE.MeshFaceMaterial(materials);
                var mesh = new THREE.Mesh(geometry, material);

                mesh.position.set(
                    initial.position.x,
                    initial.position.y,
                    initial.position.z
                );
                mesh.scale.set(
                    initial.scale.x,
                    initial.scale.y,
                    initial.scale.z
                );
                mesh.rotation.set(
                    initial.rotation.x,
                    initial.rotation.y,
                    initial.rotation.z
                );

                that._scene.add(mesh);
                that.models[modelName] = {
                    mesh: mesh,
                    animates: initial.animates,
                    animate: initial.animate,
                    colors: [],
                    ambients: [],
                }

                that.models

                initial.onLoad(mesh, that);
            }

            this._jsonLoader.load(url, addModelToScene);
        },

        get: function(modelName) {
            // returns whole model info
            if (this.models[modelName]) {
                return this.models[modelName];
            }
        },

        mesh: function(modelName) {
            // returns mesh object
            if (this.models[modelName]) {
                return this.models[modelName].mesh;
            }
        },

        animate: function() {
            for (modelName in this.models) {
                // console.log('modelName:', modelName, 'animates:', this.get(modelName).animates);
                if (this.get(modelName).animates) {
                    this.get(modelName).animate(this.mesh(modelName), this);
                }
            }
        },
    };
}

$(document).ready(function() {
    var renderer = createRenderer();
    var scene = new THREE.Scene();
    var camera = createCamera();
    var raycaster = new THREE.Raycaster();
    // var cube = createCube(scene);
    createAmbientLight(scene);
    createLight(scene);

    var manager = modelsManager(scene);
    manager.load(
        '../static/models/v1.json',
        'hanger',
        {position: {x: 3, y: 1, z: 0}}
    );
    manager.load(
        '../static/models/v1.json',
        'hanger2',
        {
            position: {x: -3, y: 0, z: 0},
            rotation: {x: 0, y: 1.5707963, z: 0},
            animates: true,
            animate: function(mesh, manager) {
                mesh.rotation.x += 0.03;
                mesh.rotation.y += 0.02;
                mesh.rotation.z += 0.01;
            },
            onLoad: function(mesh, manager) {
                
            },
        }
    );

    $(renderer.domElement).on('click', function(event) {
        // console.log('event', event);

        event.preventDefault();

        var clickPosition = relativeMousePosition(event);
        var x = 2 * clickPosition.x / renderer.domElement.width - 1;
        var y = -2 * clickPosition.y / renderer.domElement.height + 1;
        // console.log('click position', clickPosition);
        // console.log('counted ... x:', x, 'y:', y);
        // console.log('canvas width:', renderer.domElement.width)
        // console.log('canvas width:', $('#canvas').width());

        var vector = new THREE.Vector3();
        vector.set(x, y, 0.5);

        vector.unproject(camera);

        raycaster.ray.set(
            camera.position, vector.sub(camera.position).normalize());

        var intersects = raycaster.intersectObjects(manager.meshes());
        // console.log(manager.objects());

        if (intersects.length > 0) {
            console.log('... INTERSECTED ...');
            console.log('object:', intersects[0].object);
            console.log('material:', intersects[0].object.material);

            for (n in intersects[0].object.material.materials) {
                var material = intersects[0].object.material.materials[n];
                // console.log(material);
                material.ambient.setHex(
                    Math.random() * 0xffffff
                );
                material.color.setHex(
                    Math.random() * 0xffffff
                );
            }

        }
    });

    function render() {
        // TODO: ensure requestAnimationFrame exists:
        // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        // http://creativejs.com/resources/requestanimationframe/
        // https://gist.github.com/paulirish/1579671
        requestAnimationFrame(render);

        // cube.rotation.x += 0.03;
        // cube.rotation.y += 0.02;
        // cube.rotation.z += 0.01;

        manager.animate();

        renderer.render(scene, camera);
    }

    render();
});
