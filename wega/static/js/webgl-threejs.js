function rotateByX(angle, position) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    return {
        x: position.x,
        y: position.y * c - position.z * s,
        z: position.y * s + position.z * c,
    };
}

function rotateByY(angle, position) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    return {
        x: position.x * c + position.z * s,
        y: position.y,
        z: -position.x * s + position.z * c,
    };
}

function rotateByZ(angle, position) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    return {
        x: position.x * c - position.y * s,
        y: position.x * s + position.y * c,
        z: position.z,
    };
}

function rotate(rotation, position) {
    return rotateByX(
        rotation.x,
        rotateByY(
            rotation.y,
            rotateByZ(
                rotation.z,
                position
            )
        )
    );
}

function create_new_position(rotation, position, increment_vector) {
    var rotated_increment = rotate(rotation, increment_vector);
    var new_position = {
        x: position.x + rotated_increment.x,
        y: position.y + rotated_increment.y,
        z: position.z + rotated_increment.z,
    };

    return new_position;
}

function drawSprite(scene, point) {
    var particleMaterial = new THREE.SpriteMaterial({
        color: 0xEE9955,
        program: function (context) {
            context.beginPath();
            context.arc(0, 0, 0.01, 0, Math.PI * 2, true);
            context.fill();
        },
    });

    var particle = new THREE.Sprite(particleMaterial);
    particle.position.copy(point);
    particle.scale.x = particle.scale.y = 0.1;
    scene.add(particle);
}

function getIntersection(app, mousePosition) {
    var $element = $(app.renderer.domElement);
    var x = 2 * mousePosition.x / $element.innerWidth() - 1;
    var y = -2 * mousePosition.y / $element.innerHeight() + 1;
    var vector = new THREE.Vector3();
    vector.set(x, y, 0.1);

    vector.unproject(app.camera);

    app.raycaster.ray.set(
        app.camera.position,
        vector.sub(app.camera.position).normalize()
    );

    var intersects = app.raycaster.intersectObjects(app.meshes());
    return intersects;
}

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
    model.time += 4*Math.PI/360;

    model.mesh.rotation.z = model.amplitude * (-Math.sin((1/2)*Math.PI*model.time));
    model.amplitude = (Math.PI / 4) * Math.exp(-1/2*model.time);   //(1/800 * model.time);

    if (model.amplitude <= 0.007) { // zazracna konstanta... :)
        model.time = 0;
        model.mesh.rotation.z = 0;
        model.animates = false;
        model.amplitude = Math.PI/4;
    }
}

function App() {
    var _DEFAULTS = {
        position: {x: 0, y: 0, z: 0},
        scale: {x: 1, y: 1, z: 1},
        rotation: {x: 0, y: 0, z: 0},
        animates: false,
        amplitude: Math.PI / 4,
        animate: function(model, app) {},
        onLoad: function(mesh, app) {},
        onMove: function(event, modelName, app) {
            // console.log(' ===> moved:', modelName);
            app.get(modelName).animates = true;
        },
        onClick: function(event, modelName, app) {
            // console.log(' ===> clicked:', modelName);
        },
    }

    var app = {
        drawIntersection: false,
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
                    amplitude: initial.amplitude,
                    time: 0,
                    animate: initial.animate,
                    onClick: initial.onClick,
                    onMove: initial.onMove,
                    initial_position: initial.position,
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
                var model = this.get(modelName);
                if (model.animates) {
                    model.animate(model, this);
                }
            }
        },

        onMouseEvent: function(event) {
            event.preventDefault();

            var mousePosition = relativeMousePosition(event);
            var intersects = getIntersection(app, mousePosition);

            if (intersects.length > 0) {
                if (app.drawIntersection) {
                    drawSprite(app.scene, intersects[0].point);
                }

                var modelName = intersects[0].object.name;
                var model = app.get(intersects[0].object.name);

                if (event.type == 'mousemove') {
                    model.onMove(event, modelName, app);
                }
                else if (event.type == 'click') {
                    model.onClick(event, modelName, app);
                }
            }
        },

        run: function() {
            render();
        },
    };

    $(app.renderer.domElement).on('click', app.onMouseEvent);
    $(app.renderer.domElement).on('mousemove', app.onMouseEvent);

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

    var position = {x: 0, y: 0, z: -12,};
    var rotation = {
        x: Math.PI/4,
        y: Math.PI/16-3*Math.PI/8,
        z: 0,
    };

    app.load(
        '../static/models/bar.json',
        'bar',
        {
            position: position,
            rotation: rotation,
            scale: {x: 1, y: 1, z: 21},
        }
    );

    var new_position;
    var sgn = -1;
    for (var i = 0; i < 15; i++) {
        new_position = create_new_position(
            rotation,
            position,
            {x: 0, y: 0, z: sgn*Math.floor((1+i)/2)*2}
        );

        app.load(
            '../static/models/v3.json',
            'hanger' + i,
            {
                position: new_position,
                rotation: rotation,
                scale: {x: 1, y: 1, z: 1},
                animate: hangerAnimate,
            }
        );
        sgn = sgn * -1;
    }

    app.run();
});

