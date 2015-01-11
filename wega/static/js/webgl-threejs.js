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

function createAmbientLight(scene) {
    var lightColor = 0xaaAAaa;
    var ambientLight = new THREE.AmbientLight(lightColor);
    ambientLight.position.set(0, 0, 1);

    scene.add(ambientLight);
    return ambientLight;
}

function createLight(scene) {
    var lightColor = 0x222222;
    var light = new THREE.DirectionalLight(lightColor, 1.0);
    light.position.set(0, 0, 1);

    scene.add(light);
    return light;
}

function hangerAnimate(model, app) {
    model.mesh.rotation.z = Math.sin(app.delta*app.tick);
    model.mesh.position.x += Math.sin(Math.PI/2 + app.delta*app.tick) / 16.2;
    model.mesh.position.y -= Math.cos(Math.PI/2 + 2*app.delta*app.tick) / 32.4;
}

function App() {
    var _DEFAULTS = {
        position: {x: 0, y: 0, z: 0},
        // scale: {x: 1, y: 1, z: 1},
        scale: {x: 2.5, y: 2.5, z: 2.5},
        rotation: {x: 0, y: 0, z: 0},
        animates: false,
        animate: function(model, app) {},
        onLoad: function(mesh, app) {},
        onClick: function(event, modelName, app) {
            console.log(' ===> clicked:', modelName);
        },
    }

    var app = {
        tick: 0,
        delta: (Math.PI * 2 / 360),
        scene: new THREE.Scene(),
        renderer: createRenderer(),
        camera: createCamera(),
        raycaster: new THREE.Raycaster(),
        jsonLoader: new THREE.JSONLoader(),
        models: {},
        meshes: function() {
            var meshes = [];
            for (var modelName in this.models) {
                meshes.push(this.mesh(modelName));
            }
            return meshes;
        },

        load: function(url, modelName, initial) {
            var that = this;
            var initial = _.defaults({}, initial, _DEFAULTS);

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
                mesh.name = modelName;

                that.scene.add(mesh);
                var model = {
                    modelName: modelName,
                    mesh: mesh,
                    animates: initial.animates,
                    animate: initial.animate,
                    onClick: initial.onClick,
                }

                initial.onLoad(mesh, that);
                that.models[modelName] = model;
            }

            this.jsonLoader.load(url, addModelToScene);
        },

        get: function(modelName) {
            // returns whole model info
            var model = this.models[modelName];
            if (model) {
                return model;
            }
        },

        mesh: function(modelName) {
            // returns mesh object
            var model = this.get(modelName);
            if (model) {
                return model.mesh;
            }
        },

        animate: function() {
            for (var modelName in this.models) {
                // console.log('modelName:', modelName, 'animates:', this.get(modelName).animates);
                var model = this.get(modelName);
                if (model.animates) {
                    model.animate(model, this);
                }
            }
            ++this.tick;
        },

        onClick: function(event) {
            event.preventDefault();

            var clickPosition = relativeMousePosition(event);
            var x = 2 * clickPosition.x / app.renderer.domElement.width - 1;
            var y = -2 * clickPosition.y / app.renderer.domElement.height + 1;
            var vector = new THREE.Vector3();
            vector.set(x, y, 0.5);

            vector.unproject(app.camera);

            app.raycaster.ray.set(
                app.camera.position,
                vector.sub(app.camera.position).normalize()
            );

            var intersects = app.raycaster.intersectObjects(app.meshes());

            if (intersects.length > 0) {
                var modelName = intersects[0].object.name;
                app.get(intersects[0].object.name).onClick(event, modelName, app);
            }
        },

        run: function() {
            render();
        },
    };

    $(app.renderer.domElement).on('click', app.onClick);

    app.light = createLight(app.scene);
    app.ambientLight = createAmbientLight(app.scene);

    var render = function() {
        // TODO: write it like app.render...
        // TODO: ensure requestAnimationFrame exists:
        // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        // http://creativejs.com/resources/requestanimationframe/
        // https://gist.github.com/paulirish/1579671
        requestAnimationFrame(render);
        app.renderer.render(app.scene, app.camera);

        app.animate();
    };

    return app;
}

$(document).ready(function() {
    var app = App();

    app.load(
        '../static/models/v1.json',
        'hanger',
        {
            position: {x: 3, y: 1, z: 0},
            animates: true,
            animate: hangerAnimate,
        }
    );

    app.load(
        '../static/models/v2.json',
        'hanger2',
        {
            position: {x: -5, y: 0, z: -10},
            rotation: {x: 0, y: 0, z: 0},
            scale: {x: 1, y: 1, z: 1},
            animates: true,
            animate: hangerAnimate,
        }
    );

    app.run();
});
