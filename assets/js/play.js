/* 
glTF import:
- glTF loader imported + enabled
-Global variable added to store cat gltf
-Two directional lights added to view glTF
- Added HELPERS to debug light position (disable after you place them)
-glTF imported from blender (not it is an *embedded* .glTF file, not .glb)
-Changed material on ball from BASIC to STANDARD so that the geometry catches light
*/


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~ Declare Global Variables~~~~~~~~~~~~~~~~
let scene, camera, renderer, cat, dog, bunny, fish, mixer, mixer1, mixer2;
let sceneContainer = document.querySelector("#scene-container");

// animation variables
let actionNod, actionHand, actionNod1, actionTail, actionNod2, actionChill;

// ~~~~~~~~~~~~~~~~ Initialize Scene in init() ~~~~~~~~~~~~~~~~
function init() {

    // ~~~~~~Set up scene, camera, + renderer ~~~~~~

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth/ sceneContainer.clientHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);


    // ~~~~~~ Add Lights ~~~~~~
    // Add helpers to debug the lights' position - COMMENT OUT WHEN DONE placing the light! https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper

    // ~~ add Hemisphere light 
    const light = new THREE.HemisphereLight( 0xffffcc, 0x080820, 5 );
    scene.add( light );







    // ~~~~~~ Initiate add-ons ~~~~~~

    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models


        // --> Load glTF

        // load fish dish model
        loader.load('assets/fish.gltf', function (gltf) {
            fish = gltf.scene;
            scene.add(fish);
            fish.scale.set(1.5, 1.5, 1.5); // scale your model
            fish.position.set(0,0,0);
            fish.position.y = -2; // set initial position

        })

        // // load cat model
        loader.load('assets/cat_3.gltf', function (gltf) {
            cat = gltf.scene;
            scene.add(cat);
            cat.scale.set(1, 1, 1); // scale your model
            cat.position.y = 0; // set initial position

            // animation
            mixer = new THREE.AnimationMixer(cat);
            const clips = gltf.animations;

            clips.forEach(function(clip){
                const action = mixer.clipAction(clip);
                action.play();
            });

        
            // // load + play animation
            const clipNod = THREE.AnimationClip.findByName(clips, 'Noddinghead');
            actionNod = mixer.clipAction(clipNod);
            actionNod.setLoop(THREE.LoopRepeat);
            actionNod.paused = true;

            const clipHand = THREE.AnimationClip.findByName(clips,'Wavinghand');
            actionHand = mixer.clipAction(clipHand);
            actionHand.play();
        
         }); 

        // load dog model
        loader.load('assets/dog3.gltf', function (gltf) {
            dog = gltf.scene;
            scene.add(dog);
            dog.scale.set(1, 1, 1); // scale your model
            dog.position.x = -3; // set initial position
            dog.position.y = 0; // set initial position
            dog.position.z = -0.1; // set initial position
            dog.rotation.y = 13; // set initial position

            

                // animation
            mixer1 = new THREE.AnimationMixer(dog);
            const clips1 = gltf.animations;

            clips1.forEach(function(clip){
                const action1 = mixer1.clipAction(clip);
                action1.play();

            });

            // load + play animation
            const clipNod1 = THREE.AnimationClip.findByName(clips1, 'Noddinghead');
            actionNod1 = mixer1.clipAction(clipNod1);
            actionNod1.setLoop(THREE.LoopRepeat);
            actionNod1.paused = true; // ← DO NOT auto-play

            const clipTail = THREE.AnimationClip.findByName(clips1,'Tail');
            actionTail = mixer1.clipAction(clipTail);
            actionTail.play();


         });

          // load bunny

         loader.load('assets/bunny1.gltf', function (gltf) {
            bunny = gltf.scene;
            scene.add(bunny);
            bunny.scale.set(1, 1, 1); // scale your model
            bunny.position.x = 3; // set initial position
            bunny.position.y = 0; // set initial position
            bunny.position.z = 0.1; // set initial position
            bunny.rotation.y = 12; // set initial position

            

                // animation
            mixer2 = new THREE.AnimationMixer(bunny);
            const clips2 = gltf.animations;

            clips2.forEach(function(clip){
                const action1 = mixer2.clipAction(clip);
                action1.play();

            });

            // load + play animation
            const clipNod2 = THREE.AnimationClip.findByName(clips2, 'Noddinghead');
            actionNod2 = mixer2.clipAction(clipNod2);
            actionNod2.setLoop(THREE.LoopRepeat);
            actionNod2.paused = true; // ← DO NOT auto-play

            const clipChill = THREE.AnimationClip.findByName(clips2,'Chill');
            actionChill = mixer2.clipAction(clipChill);
            actionChill.play();


         });

        // ~~~~~~Position Camera~~~~~~
        camera.position.z = 5;

    
       

}

// event listener

// cat
let isNodding = false;

document.querySelector("#catBtn").addEventListener("click", () => {
    if (!isNodding) {
        if (actionNod) {
            actionNod.reset();
            actionNod.play();
            actionNod.paused = false;
        }
        if (actionNod1) {
            actionNod1.reset();
            actionNod1.play();
            actionNod1.paused = false;
        }
        if (actionNod2) {
            actionNod2.reset();
            actionNod2.play();
            actionNod2.paused = false;
        }
    } else {
        if (actionNod) actionNod.paused = true;
        if (actionNod1) actionNod1.paused = true;
        if (actionNod2) actionNod2.paused = true;

    }
    isNodding = !isNodding;
});


let mouseIsDown = false;

// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    const delta = clock.getDelta();

    if (mixer) {
        mixer.update(delta);
    }
    if (mixer1) {
        mixer1.update(delta);
    }
    if (mixer2) {
        mixer2.update(delta);
    }

    fish.position.x += 0.2;
    fish.position.y += 0.2;
   

    fish.position.x = Math.sin(Date.now() / 2000) * 1.5;
    fish.position.y = Math.sin(Date.now() / 4000) * 1.5;
    fish.position.z = Math.sin(Date.now() / 2000) * 1.5;

   

    
    

    // always end animation loop with renderer
    renderer.render(scene, camera);
    
}


function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth/ sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);

}

window.addEventListener('resize', onWindowResize, false);

init(); // execute initialize function
animate(); // execute animation function

