'use strict';

class Model extends PIXI.extras.AnimatedSprite{
    constructor(params) {

        if(!(params instanceof Object))
            throw new TypeError('incorrect data type params');

        if(params.texture === undefined)
            throw new TypeError('Undefined param texture');
        else
            super(params.texture);

        if(params.name === undefined)
            throw new TypeError('Undefined param name');
        else
            this.name = params.name;

        if(params.x === undefined || params.y === undefined)
            throw new TypeError('Undefined param position x,y');
        else
            this.position.set(params.x,params.y);

        if(params.scale === undefined)
            throw new TypeError('Undefined param size scale');
        else{
            this.scale.set(params.scale);
        }

        if(this.animateMoveUp === undefined)
            throw new TypeError('Undefined function animateMoveUp');
        if(this.animateMoveUpToRight === undefined)
            throw new TypeError('Undefined function animateMoveUpToRight');
        if(this.animateMoveRight === undefined)
            throw new TypeError('Undefined function animateMoveRight');
        if(this.animateMoveDownToRight === undefined)
            throw new TypeError('Undefined function animateMoveDownToRight');
        if(this.animateMoveDown === undefined)
            throw new TypeError('Undefined function animateMoveDown');
        if(this.animateMoveDownToLeft === undefined)
            throw new TypeError('Undefined function animateMoveDownToLeft');
        if(this.animateMoveLeft === undefined)
            throw new TypeError('Undefined function animateMoveLeft');
        if(this.animateMoveUpToLeft === undefined)
            throw new TypeError('Undefined function animateMoveUpToLeft');


        this.anchor.set(0.5);
        this.perspective = 'down';
        this.perspectiveAnimateFlag = false;

        this.moveFlag = false,
        this.isUp = false,
        this.isDown = false,
        this.isRight = false,
        this.isLeft = false;

        app.stage.addChild(this);
    }

    getSpeed(){
        return 100;
    }

    move(){
        let start = performance.now(),
            speed = this.getSpeed(),
            prevTimePassed = 0,
            self = this;
        self.animationPerspective();
        if(!self.moveFlag)
            self.moveFlag = true;
        else
            return false;

        requestAnimationFrame(function move(time) {
            let timePassed = time - start;

            let step = ((speed/1000)*(timePassed - prevTimePassed))

            if(self.isRight && step > 0)
                self.x += step;

            if(self.isLeft && step > 0)
                self.x -= step;

            if(self.isUp && step > 0)
                self.y -= step;

            if(self.isDown && step > 0)
                self.y += step;

            if (self.moveFlag) {
                prevTimePassed = timePassed;
                requestAnimationFrame(move);
            }
        });
    }

    animationPerspective(){
        if(this.isDown && this.perspectiveAnimateFlag && this.perspective === 'down')
            this.animateMoveDown();
        else if(this.isUp && this.perspectiveAnimateFlag && this.perspective === 'down')
            this.animateMoveDown(true);

        this.perspectiveAnimateFlag = false;
    }

}

class Character extends Model{
    constructor(params){
        super(params);

        Mousetrap.bind('d', ()=>{
            if(!this.isRight)
                this.perspectiveAnimateFlag = true;
            if(this.isLeft)
                this.isLeft = false;
            this.isRight = true;
            this.move();
        },'keydown');

        Mousetrap.bind('d', ()=>{
            this.perspectiveAnimateFlag = true;
            this.isRight = false;
            if(!this.isLeft && !this.isUp && !this.isDown)
                this.moveFlag = false;
        },'keyup');

        Mousetrap.bind('a', ()=>{
            if(!this.isLeft)
                this.perspectiveAnimateFlag = true;
            if(this.isRight)
                this.isRight = false;
            this.isLeft = true;
            this.move();
        },'keydown');

        Mousetrap.bind('a', ()=>{
            this.perspectiveAnimateFlag = true;
            this.isLeft = false;
            if(!this.isDown && !this.isUp && !this.isRight)
                this.moveFlag = false;
        },'keyup');

        Mousetrap.bind('s', ()=>{
            if(!this.isDown)
                this.perspectiveAnimateFlag = true;
            if(this.isUp)
                this.isUp = false;
            this.isDown = true;
            this.move();
        },'keydown');

        Mousetrap.bind('s', ()=>{
            this.perspectiveAnimateFlag = true;
            this.isDown = false;
            if(!this.isLeft && !this.isUp && !this.isRight)
                this.moveFlag = false;
        },'keyup');

        Mousetrap.bind('w', ()=>{
            if(!this.isUp)
                this.perspectiveAnimateFlag = true;
            if(this.isDown)
                this.isDown = false;
            this.isUp = true;
            this.move();
        },'keydown');

        Mousetrap.bind('w', ()=>{
            this.perspectiveAnimateFlag = true;
            this.isUp = false;
            if(!this.isLeft && !this.isDown && !this.isRight)
                this.moveFlag = false;
        },'keyup');
    }

    positionCharacter(){
        let mousex = app.renderer.plugins.interaction.mouse.global.x,
            mousey = app.renderer.plugins.interaction.mouse.global.y,
            gpo = this.getGlobalPosition();

        let lr,x,storyPerspective;
        if(mousex > gpo.x){
            x = mousex - gpo.x;
            lr = 'right';
        }else{
            x = gpo.x - mousex;
            lr = 'left';
        }
        storyPerspective = this.perspective;
        if(mousey < (gpo.y - (x*3)))
            this.perspective = 'up';
        else if(mousey > (gpo.y - (x*3)) && mousey < (gpo.y - (x/3)))
            this.perspective = 'up' + lr;
        else if(mousey > (gpo.y - (x/3)) && mousey < (gpo.y + (x/3)))
            this.perspective = lr;
        else if(mousey > (gpo.y + (x/3)) && mousey < (gpo.y + (x*3)))
            this.perspective = 'down' + lr;
        else if(mousey > (gpo.y + (x*3)))
            this.perspective = 'down';

        if(storyPerspective !== this.perspective)
            this.perspectiveAnimateFlag = true;
        if(!this.moveFlag)
            this.textures = [Texture.from(this.perspectiveSkin[this.perspective]+'.png')];
    }

}