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

// var defaultIcon = "url('https://pixijs.io/examples/required/assets/bunny.png'),auto";
//
// //Add custom cursor styles
// app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
// app.renderer.plugins.interaction.cursorStyles.hover = defaultIcon;

document.addEventListener('DOMContentLoaded', () => {
    //Вывод
    document.body.appendChild(app.view);
});


PIXI.loader.add([
    "./source/charter/lady/lady.json",
    "./source/charter/golem/golem.json"
]).on("progress", loadProgressHandler).load(setup);

//Процесс загрузки ресурсов
function loadProgressHandler(loader, resource) {
    //console.log("loading: " + resource.url);
    //console.log("loading: " + resource.name);
    console.log("Прогресс загрузки: " + loader.progress + "%");
}
let model, basicText,romb,rombx,rombxc = {x:400,y:400};
function setup() {

    basicText = new PIXI.Text("Debug",{fontSize: 16});
    basicText.x = 200;
    basicText.y = 0;

    app.stage.addChild(basicText);


    model = new Golem();


    let graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0x0000FF, 1);

    //model.addChild(graphics);

    graphics.drawRect(-(model.width/model.scale.x/2), -(model.height/model.scale.y/2), model.width/model.scale.x, model.height/model.scale.y);


    app.ticker.add(() => {

        model.positionCharacter();


        basicText.text = "mouse x : " + app.renderer.plugins.interaction.mouse.global.x + "\n"+
                    "mouse y : " + app.renderer.plugins.interaction.mouse.global.y + "\n"+
                    "unit x : " + model.x + "\n"+
                    "unit y : " + model.y + "\n" +
                    "unit position : " + model.perspective;
        //if(render){
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
