'use strict';
class Model{
    constructor(name,x,y){
        var _sprite = this.setSprite();
        _sprite.anchor.set(0.5);
        _sprite.x = (_sprite.width / 2) + x;
        _sprite.y = (_sprite.height / 2) + y;
        app.stage.addChild(_sprite);

        _sprite.animateFrontStart = () => {
            let frames = [];
            for (let i = 1; i < 7; i++) {
                frames.push(Texture.from('frontstep' + i + '.png'));
            }

            _sprite.textures = frames;
            _sprite.gotoAndPlay(0);
        }

        _sprite.animateFrontStop = () => {
            _sprite.textures = [Texture.from('frontposition.png')];
            _sprite.gotoAndStop(0);
        }

        _sprite.animateBackStart = () => {
            let frames = [];
            for (let i = 1; i < 7; i++) {
                frames.push(Texture.from('backstep' + i + '.png'));
            }

            _sprite.textures = frames;
            _sprite.gotoAndPlay(0);
        }

        _sprite.animateBackStop = () => {
            _sprite.textures = [Texture.from('backposition.png')];
            _sprite.gotoAndStop(0);
        }

        _sprite.animateRightStart = () => {
            let frames = [];
            for (let i = 1; i < 7; i++) {
                frames.push(Texture.from('rightstep' + i + '.png'));
            }

            _sprite.textures = frames;
            _sprite.gotoAndPlay(0);
        }

        _sprite.animateRightStop = () => {
            _sprite.textures = [Texture.from('rightposition.png')];
            _sprite.gotoAndStop(0);
        }

        _sprite.animateLeftStart = () => {
            let frames = [];
            for (let i = 1; i < 7; i++) {
                frames.push(Texture.from('leftstep' + i + '.png'));
            }

            _sprite.textures = frames;
            _sprite.gotoAndPlay(0);
        }

        _sprite.animateLeftStop = () => {
            _sprite.textures = [Texture.from('leftposition.png')];
            _sprite.gotoAndStop(0);
        }


        let down = {
          isDown : false,
          isUp : true
        },
        up = {
            isDown : false,
            isUp : true
        },
        right = {
            isDown : false,
            isUp : true
        },
        left = {
            isDown : false,
            isUp : true
        };

        Mousetrap.bind('down', ()=>{
            if(!down.isDown) {
                down.isDown = true;
                down.isUp = false;
                _sprite.animateFrontStart();
            }
        },'keydown');

        Mousetrap.bind('down', ()=>{
            if(!down.isUp) {
                down.isDown = false;
                down.isUp = true;
                _sprite.animateFrontStop();
            }
        },'keyup');

        Mousetrap.bind('up', ()=>{
            if(!up.isDown) {
                up.isDown = true;
                up.isUp = false;
                _sprite.animateBackStart();
            }
        },'keydown');

        Mousetrap.bind('up', ()=>{
            if(!up.isUp) {
                up.isDown = false;
                up.isUp = true;
                _sprite.animateBackStop();
            }
        },'keyup');

        Mousetrap.bind('right', ()=>{
            if(!right.isDown) {
                right.isDown = true;
                right.isUp = false;
                _sprite.animateRightStart();
            }
        },'keydown');

        Mousetrap.bind('right', ()=>{
            if(!right.isUp) {
                right.isDown = false;
                right.isUp = true;
                _sprite.animateRightStop();
            }
        },'keyup');

        Mousetrap.bind('left', ()=>{
            if(!left.isDown) {
                left.isDown = true;
                left.isUp = false;
                _sprite.animateLeftStart();
            }
        },'keydown');

        Mousetrap.bind('left', ()=>{
            if(!left.isUp) {
                left.isDown = false;
                left.isUp = true;
                _sprite.animateLeftStop();
            }
        },'keyup');

        // let left = this.keyboard(37),
        //     up = this.keyboard(38),
        //     right = this.keyboard(39),
        //     down = this.keyboard(40);


        // down.press = () => {
        //     _sprite.animateFrontStart();
        // };
        //
        // down.release = () => {
        //     if (!up.isDown && _sprite.vx === 0) {
        //         _sprite.animateFrontStop();
        //     }
        // };



        // let frames = [];
        //
        // for (let i = 1; i < 7; i++) {
        //
        //     // magically works since the spritesheet was loaded with the pixi loader
        //     frames.push(PIXI.Texture.from('frontperson' + i + '.png'));
        // }
        //
        // // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
        // let sprite = new PIXI.AnimatedSprite(frames);
        //
        // /*
        //  * An AnimatedSprite inherits all the properties of a PIXI sprite
        //  * so you can change its position, its anchor, mask it, etc
        //  */
        // sprite.x = (sprite.width / 2)+200;
        // sprite.y = (sprite.height / 2)+200;
        // sprite.anchor.set(0.5);
        // sprite.animationSpeed = 0.09;
        // sprite.play();
        // app.stage.addChild(sprite);
        //
        // this.getSprite = () => { return sprite; }
    }

    setSprite(){
        let sprite = new PIXI.extras.AnimatedSprite([Texture.from('frontposition.png')]);
        sprite.animationSpeed = 0.09;
        return sprite;
    }

    keyboard(keyCode) {
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = event => {
            if (event.keyCode === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = event => {
            if (event.keyCode === key.code) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
            }
            event.preventDefault();
        };

        //Attach event listeners
        window.addEventListener(
            "keydown", key.downHandler.bind(key), false
        );
        window.addEventListener(
            "keyup", key.upHandler.bind(key), false
        );
        return key;
    }

}