import * as PIXI from 'pixi.js';
import * as Key from 'mousetrap';
import {settings} from '../../world/settings';

interface KeyEvent{
    u: boolean;
    d: boolean;
    r: boolean;
    l: boolean;
}

interface IsoCoord{
    x: number;
    y: number;
}

interface ActiveModelTexture{
    play: Array<string>;
    stop: Array<string>;
}

interface ModelTexture{
    u : ActiveModelTexture;
    ur : ActiveModelTexture;
    r : ActiveModelTexture;
    dr : ActiveModelTexture;
    d : ActiveModelTexture;
    dl : ActiveModelTexture;
    l : ActiveModelTexture;
    ul : ActiveModelTexture;
}

interface SaveActiveModelTexture{
    play: Array<PIXI.Texture>;
    stop: Array<PIXI.Texture>;
}

interface SaveModelTexture{
    u : SaveActiveModelTexture;
    ur : SaveActiveModelTexture;
    r : SaveActiveModelTexture;
    dr : SaveActiveModelTexture;
    d : SaveActiveModelTexture;
    dl : SaveActiveModelTexture;
    l : SaveActiveModelTexture;
    ul : SaveActiveModelTexture;
}

class Charter extends PIXI.extras.AnimatedSprite{

    private _model : boolean;
    private _name : string;
    private _speed : number;
    private _outlook : string;
    private _saveTexture : SaveModelTexture;
    private _move : boolean = false;
    private _keyEvent : KeyEvent = {
        u : false,
        d : false,
        r : false,
        l : false
    };
    private _dx: number;
    private _dy: number;
    private callMove: number = 0;
    private _windowWidth : number;
    private _windowHeight : number;
    private _halfWindowWidth :number;
    private _halfWindowHeight :number;
    private _worldMinY : number;
    private _worldMaxY : number;
    private _worldMinX : number;
    private _worldMaxX : number;
    private _centerPositionY : number;
    private _centerPositionX : number;
    private _unitMaxX : number;
    private _unitMaxY : number;

    static SQRT2 : number = 1.4142135624;

    public urlTexture : ModelTexture;

    constructor(texture : string, _model :boolean = true){
        super([PIXI.Texture.from(texture)]);
        this._model = _model;
        if(this._model)
            this.eventBind();

        this.anchor.set(0.5);
        this.scale.set(0.5);

        this._dx = this.x;
        this._dy = this.y;

    }

    get dx():number{
        return this._dx;
    }

    set dx(dx:number){

        this._dx = dx;
    }

    get dy():number{
        return this._dy;
    }

    set dy(dy:number){
        this._dy = dy;
    }

    set outlook(outlook: string){
        this._outlook = outlook;
        this.resetTexture();
    }

    get outlook() : string{
        return this._outlook;
    }

    get name (): string{
        return this._name;
    }

    set name (name : string){
        this._name = name;
    }

    get speed():number {
        return (1000/1000);
    }

    public customSetParent(parent : PIXI.Container): void{
        this.setParent(parent);
        this.worldPositionStart();
    }

    private worldPositionStart(){
        this._windowWidth       = window.innerWidth;
        this._windowHeight      = window.innerHeight - 200;
        this._halfWindowWidth   = this._windowWidth/2;
        this._halfWindowHeight  = this._windowHeight/2;
        this._worldMinY         = settings.padding;
        this._worldMaxY         = this.parent.height + settings.padding - this._windowHeight;
        this._worldMinX         = settings.width + settings.padding;
        this._worldMaxX         = - settings.width + this._windowWidth - settings.padding;
        this._centerPositionY   = this._halfWindowHeight + settings.padding;
        this._centerPositionX   = this._halfWindowWidth - settings.width - settings.padding;
        this._unitMaxX = settings.width - ((this.width/4)*3);
        this._unitMaxY = settings.height - (this.height/2);

        this.worldPosition();
    }

    private worldPosition(){
        if(this.y > this._halfWindowHeight){
            let worldSdvigY = -this.y + this._centerPositionY;
            if(Math.abs(worldSdvigY) > this._worldMaxY){
                this.parent.y = -this._worldMaxY;
            }else{
                this.parent.y = worldSdvigY;
            }
        }else{
            this.parent.y = this._worldMinY;
        }

        if(this.x > this._centerPositionX){
            let worldSdvigX = -this.x + this._halfWindowWidth;
            if(worldSdvigX > this._worldMaxX){
                this.parent.x = worldSdvigX;
            }else{
                this.parent.x = this._worldMaxX;
            }
        }else{
            this.parent.x = this._worldMinX;
        }
    }

    findOutlook(mouseX:number,mouseY:number){
        let gpo = this.getGlobalPosition(),
            side,
            x,
            outlook;
        if(mouseX > gpo.x){
            x = mouseX - gpo.x;
            side = 'r';
        }else{
            x = gpo.x - mouseX;
            side = 'l';
        }

        if(mouseY < (gpo.y - (x*3)))
            outlook = 'u';
        else if(mouseY > (gpo.y - (x*3)) && mouseY < (gpo.y - (x/3)))
            outlook = 'u' + side;
        else if(mouseY > (gpo.y - (x/3)) && mouseY < (gpo.y + (x/3)))
            outlook = side;
        else if(mouseY > (gpo.y + (x/3)) && mouseY < (gpo.y + (x*3)))
            outlook = 'd' + side;
        else if(mouseY > (gpo.y + (x*3)))
            outlook = 'd';

        if(outlook != this.outlook)
            this.outlook = outlook;
    }

    private resetTexture():void {
        if(typeof(this.outlook) != 'undefined')
            this.textures = this._saveTexture[this.outlook]['stop'];
    }

    protected loadTexture():void{
        if(typeof(this.urlTexture) == 'undefined')
            console.error('Не указаны текстуры!!!');
        else{
            this._saveTexture = {
                u : {
                    play : [],
                    stop : []
                },
                ur : {
                    play : [],
                    stop : []
                },
                r : {
                    play : [],
                    stop : []
                },
                dr : {
                    play : [],
                    stop : []
                },
                d : {
                    play : [],
                    stop : []
                },
                dl : {
                    play : [],
                    stop : []
                },
                l : {
                    play : [],
                    stop : []
                },
                ul : {
                    play : [],
                    stop : []
                }
            };
            for(let outlook in this.urlTexture){
                for(let action in this.urlTexture[outlook]){
                    for(let i = 0;i < this.urlTexture[outlook][action].length;i++){
                        this._saveTexture[outlook][action].push(PIXI.Texture.from(this.urlTexture[outlook][action][i]));
                    }
                }
            }
            delete this.urlTexture;
        }
    }

    move(){
        if(!this._move)
            this._move = true;
        else
            return false;
        let start = performance.now(),
            previewTime = 0,
            self = this;
        this.callMove += 1;

        requestAnimationFrame(function moves(time) {
            if(self.callMove > 1){
                self.callMove -= 1;
                return false;
            }

            let timeStep = time - start;
            let step = self.speed*(timeStep - previewTime);

            if(step > 0) {
                let sx = 0,
                    sy = 0;
                if(self._keyEvent.d && self._keyEvent.r){
                    sx = step;
                }else if(self._keyEvent.d && self._keyEvent.l){
                    sy = step;
                }else if(self._keyEvent.u && self._keyEvent.l){
                    sx = -step;
                }else if(self._keyEvent.u && self._keyEvent.r){
                    sy = -step;
                }else if(self._keyEvent.d){
                    sx = step;
                    sy = step;
                }else if(self._keyEvent.u){
                    sx = -step;
                    sy = -step;
                }else if(self._keyEvent.r){
                    step = Charter.SQRT2 * ((step*step)/(step+step));
                    sy = -step;
                    sx = step;
                }else if(self._keyEvent.l){
                    step = Charter.SQRT2 * ((step*step)/(step+step));
                    sx = -step;
                    sy = step;
                }

                self.mainPosition((self.dx+sx),(self.dy+sy));
            }

            if (self._move) {
                previewTime = timeStep;
                requestAnimationFrame(moves);
            }else
                self.callMove -= 1;
        });
    }

    private mainPosition(x : number, y : number) {
        if (x <= 0) x = 0;
        if (x >= this._unitMaxX) x = this._unitMaxX;
        if (y <= 0) y = 0;
        if (y >= this._unitMaxY) y = this._unitMaxY;

        this.dx = x;
        this.x = x - y;
        this.dy = y;
        this.y = (x + y) / 2;

        this.worldPosition();
    }

    private keyPress(a:string, b:string):void{
        if(!this._keyEvent[a])
            this._keyEvent[a] = true;
        if(this._keyEvent[b])
            this._keyEvent[b] = false;
        if(!this._move)
            this.move();
    }

    private eventBind():void {
        Key.bind('d', ()=>{
            this.keyPress('r','l');
        },'keydown');
        Key.bind('d', ()=>{
            this._keyEvent.r = false;
            if(!this._keyEvent.l && !this._keyEvent.u && !this._keyEvent.d)
                this._move = false;
        },'keyup');

        Key.bind('a', ()=>{
            this.keyPress('l','r');
        },'keydown');
        Key.bind('a', ()=>{
            this._keyEvent.l = false;
            if(!this._keyEvent.r && !this._keyEvent.u && !this._keyEvent.d)
                this._move = false;
        },'keyup');

        Key.bind('w', ()=>{
            this.keyPress('u','d');
        },'keydown');
        Key.bind('w', ()=>{
            this._keyEvent.u = false;
            if(!this._keyEvent.r && !this._keyEvent.l && !this._keyEvent.d)
                this._move = false;
        },'keyup');

        Key.bind('s', ()=>{
            this.keyPress('d','u');
        },'keydown');
        Key.bind('s', ()=>{
            this._keyEvent.d = false;
            if(!this._keyEvent.r && !this._keyEvent.l && !this._keyEvent.u)
                this._move = false;
        },'keyup');
    }

}

export {Charter};