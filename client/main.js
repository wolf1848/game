//Создание игрового поля
let app = new Application({
        width: 768,
        height: 768,
        backgroundColor : 0x40deed
    }
),
render = true;

//На весь экран
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.addEventListener('DOMContentLoaded', () => {
    //Вывод
    document.body.appendChild(app.view);
});


PIXI.loader.add([
    "./source/charter/lady/lady.png",
    "./source/charter/lady/lady.json"
]).on("progress", loadProgressHandler).load(setup);

//Процесс загрузки ресурсов
function loadProgressHandler(loader, resource) {
    //console.log("loading: " + resource.url);
    //console.log("loading: " + resource.name);
    console.log("Прогресс загрузки: " + loader.progress + "%");
}
//Старт игры
let bunny,quad,squares;
function setup() {

    let model = new Model('test',400,400);

    var w = app.screen.width/2, h = app.screen.height/2;

    function createSquare(x, y) {
        var square = new PIXI.Sprite(PIXI.Texture.WHITE);
        square.tint = 0xff0000;
        square.factor = 1;
        square.anchor.set(0.5);
        square.position.set(x, y);
        return square;
    }

    var squares = [
        createSquare(w-15, h-50),
        createSquare(w+15, h-50),
        createSquare(w+15, h+20),
        createSquare(w-15, h+50)
    ];

    var quad = squares.map(function(s) { return s.position });

//add sprite itself
    var containerSprite = new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('backposition.png'));
    containerSprite.anchor.set(0.5);

    app.stage.addChild(containerSprite);
    squares.forEach(function(s) { app.stage.addChild(s); });

// Listen for animate update
    app.ticker.add(function (delta) {
        containerSprite.proj.mapSprite(containerSprite, quad);
    });

    squares.forEach(function(s) { addInteraction(s); });

// let us add sprite to make it more funny

    var bunny = new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('backposition.png'));
    bunny.anchor.set(0.5);
    containerSprite.addChild(bunny);

    addInteraction(bunny);

// === INTERACTION CODE  ===

    function toggle(obj) {
    }

    function snap(obj) {
        if (obj == bunny) {
            obj.position.set(0);
        } else {
            obj.position.x = Math.min(Math.max(obj.position.x, 0), app.screen.width);
            obj.position.y = Math.min(Math.max(obj.position.y, 0), app.screen.height);
        }
    }

    function addInteraction(obj) {
        obj.interactive = true;
        obj
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);
    }

    function onDragStart(event) {
        var obj = event.currentTarget;
        obj.dragData = event.data;
        obj.dragging = 1;
        obj.dragPointerStart = event.data.getLocalPosition(obj.parent);
        obj.dragObjStart = new PIXI.Point();
        obj.dragObjStart.copy(obj.position);
        obj.dragGlobalStart = new PIXI.Point();
        obj.dragGlobalStart.copy(event.data.global);
    }

    function onDragEnd(event) {
        var obj = event.currentTarget;
        if (obj.dragging == 1) {
            toggle(obj);
        } else {
            snap(obj);
        }
        obj.dragging = 0;
        obj.dragData = null;
        // set the interaction data to null
    }

    function onDragMove(event) {
        var obj = event.currentTarget;
        if (!obj.dragging) return;
        var data = obj.dragData; // it can be different pointer!
        if (obj.dragging == 1) {
            // click or drag?
            if (Math.abs(data.global.x - obj.dragGlobalStart.x) +
                Math.abs(data.global.y - obj.dragGlobalStart.y) >= 3) {
                // DRAG
                obj.dragging = 2;
            }
        }
        if (obj.dragging == 2) {
            var dragPointerEnd = data.getLocalPosition(obj.parent);
            // DRAG
            obj.position.set(
                obj.dragObjStart.x + (dragPointerEnd.x - obj.dragPointerStart.x),
                obj.dragObjStart.y + (dragPointerEnd.y - obj.dragPointerStart.y)
            );
        }
    }


    app.ticker.add(() => {
        //if(render){
            //console.log(123);
            app.renderer.render(app.stage);
            //render = false;
        //}
    });



    // let frames = [];
    //
    // for (let i = 1; i < 7; i++) {
    //
    //     // magically works since the spritesheet was loaded with the pixi loader
    //     frames.push(PIXI.Texture.from('frontperson' + i + '.png'));
    // }
    //
    // // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    // anim = new PIXI.AnimatedSprite(frames);
    //
    // /*
    //  * An AnimatedSprite inherits all the properties of a PIXI sprite
    //  * so you can change its position, its anchor, mask it, etc
    //  */
    // anim.x = anim.width / 2;
    // anim.y = anim.height / 2;
    // anim.anchor.set(0.5);
    // anim.animationSpeed = 0.09;
    // anim.play();
    // app.stage.addChild(anim);
    // //Create the `tileset` sprite from the texture
    // let texture = TextureCache["./source/img/lady.png"];
    //
    // //Create a rectangle object that defines the position and
    // //size of the sub-image you want to extract from the texture
    // //(`Rectangle` is an alias for `PIXI.Rectangle`)
    // let rectangle = new Rectangle(35,10,30,85);
    //
    // //Tell the texture to use that rectangular section
    // texture.frame = rectangle;
    //
    // //Create the sprite from the texture
    // rocket = new Sprite(texture);
    //
    // //Position the rocket sprite on the canvas
    // rocket.x = 32;
    // rocket.y = 32;
    //
    // //Add the rocket to the stage
    // app.stage.addChild(rocket);
    //
    // //Render the stage
    // app.renderer.render(app.stage);

}


// let rocket, anim;
// function graf(a,b,c,d){
//     let texture = TextureCache["./source/img/person.png"];
//     let rectangle = new Rectangle(a,b,c,d);
//     texture.frame = rectangle;
//     rocket = new Sprite(texture);
//     app.renderer.render(app.stage);
// }
//
// function frontStep(){
//     anim.gotoAndStop(0);
//     let frames = [];
//
//     for (let i = 1; i < 7; i++) {
//
//         // magically works since the spritesheet was loaded with the pixi loader
//         frames.push(PIXI.Texture.fromFrame('./source/charter/lady/frontperson' + i + '.png'));
//     }
//
//     // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
//     anim.textures = frames;
//     anim.gotoAndPlay(0);
// }
// function backStep(){
//     anim.gotoAndStop(0);
//     let frames = [];
//
//     for (let i = 1; i < 7; i++) {
//
//         // magically works since the spritesheet was loaded with the pixi loader
//         frames.push(PIXI.Texture.fromFrame('backperson' + i + '.png'));
//     }
//
//     // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
//     anim.textures = frames;
//     anim.gotoAndPlay(0);
// }
//
//
// //let model;
//
//
//
// function test(second, sx, sy, fx ,fy, stx, sty){
//     var start = performance.now();
//     requestAnimationFrame(function test(time) {
//
//         var timeFraction = (time - start) / second;
//         if (timeFraction > 1) timeFraction = 1;
//
//         vtaims = time - start < 0 ? 0 : time - start;
//         rx = stx + (sx * vtaims);
//         ry = sty + (sy * vtaims);
//
//
//         if(sx > 0)
//             unit.x = unit.x+0.1 < fx ? rx : fx;
//         else if(sx < 0)
//             unit.x = unit.x > fx ? rx : fx;
//
//         if(sy > 0)
//             unit.y = unit.y < fy ? ry : fy;
//         else if(sy < 0)
//             unit.y = unit.y > fy ? ry : fy;
//         app.render(container);
//         if (timeFraction < 1) {
//             requestAnimationFrame (test);
//         }else{
//             unit.x = fx;
//             unit.y = fy;
//             if(unit.savePath.length > 0)
//                 mapContainer.children[unit.savePath[unit.savePath.length-1].pos].alpha = 1;
//             unit.savePath.splice(-1,1);
//             app.render(container);
//             unitStep();
//         }
//     });
// }