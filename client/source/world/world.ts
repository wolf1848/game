import * as PIXI from 'pixi.js';
import * as Unit from '../charter/unit';
import {settings} from './settings';
import Connect from "../network/connect";

export default class World extends PIXI.Container{

    private _hero : any;
    private _connect : Connect;
    private _mapObject : any;

    constructor(_connect){
        super();
        this._connect = _connect;
        console.log(456654);
        this.setWorldSize(0.3,100);
        this.addHero('Golem');
    }

    public addObject(obj){
        obj.forEach(function(){

            this.addHero('Golem');
        });
    }

    private addHero(typeHero:string){
        this._hero = new Unit[typeHero](Unit.scins[typeHero]);
        this._hero.customSetParent(this);
    }

    private setWorldSize(visible = 0 , gridSize = settings.width, color = 0){
        let graphics : PIXI.Graphics = new PIXI.Graphics();
        graphics.lineStyle(1, color, visible);
        let step = gridSize,
            cntX = settings.width/step,
            cntY = settings.height/step,
            i = 0;
        while(i <= cntX){
            let sx = i*step,
                sy = 0,
                fy = settings.height;
            graphics.moveTo((sx - sy),((sx + sy) / 2));
            graphics.lineTo((sx - fy),((sx + fy) / 2));
            graphics.endFill();
            i++;
        }
        i = 0;
        while(i <= cntY){
            let sx = 0,
                sy = i*step,
                fx = settings.width;
            graphics.moveTo((sx - sy),((sx + sy) / 2));
            graphics.lineTo((fx - sy),((fx + sy) / 2));
            graphics.endFill();
            i++;
        }
        this.addChild(graphics);
    }

    update(mouseX,MouseY):void{
        this._hero.findOutlook(mouseX,MouseY);
    }
}