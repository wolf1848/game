declare var Promise: any;

import * as PIXI from 'pixi.js';
import * as Unit from './charter/unit';
import Connect from './network/connect';

//Создание игрового поля
let app = new PIXI.Application({
        width: 768,
        height: 768,
        backgroundColor : 0x40deed
});

//На весь экран
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);

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

function setup() {
    let world;
    let promise = new Promise((resolve, reject) => {
        world = new Connect(resolve,reject);
    });

    promise.then(result => {
            world.connect();
            app.stage.addChild(world.world);
        let basicText = new PIXI.Text("Debug",{fontSize: 16});
            basicText.x = 0;
            basicText.y = 0;
            app.stage.addChild(basicText);

            app.ticker.add(() => {
                //world.update(app.renderer.plugins.interaction.mouse.global.x,app.renderer.plugins.interaction.mouse.global.y);

                basicText.text = "mouse x : " + app.renderer.plugins.interaction.mouse.global.x + "\n" +
                    "mouse y : " + app.renderer.plugins.interaction.mouse.global.y + "\n";
                //"position : " + golem2.outlook;


            });
            }, error => {
                alert("ОШИБКААААА !");
            }
        );


    //world.debug();
    //app.stage.addChild(world);

    //let golem = new Unit.Golem('GDP.png');
    //golem.customSetParent(world);

    // container.x = (app.screen.width / 2);
    // container.y = 100;
    //container.y = (app.screen.height / 2) - (container.height/2);

//console.log(wr);
    //let golem = new Unit.Golem('GDP.png');
    //let golem2 = new Unit.Golem('GDP.png');
    //golem2.position.set(0,300)

    //console.log(golem2);
    //console.log(golem.texture);

    //golem.x = -500;
    // golem.y = 300;
    //
    // if(golem.x < (abunny.y*2)) {
    //     golem.x = -(golem.y * 2)
    // }
    //
    // golem.scale.set(0.5);
    // golem.anchor.set(0.5);
    //container.addChild(golem);
    //container.addChild(golem2);
    //console.log(container.x,container.y,golem.width,bunny.height);




}


