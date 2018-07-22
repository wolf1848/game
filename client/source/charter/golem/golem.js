'use strict';

class Golem extends Character{
    constructor(){
        const personParams = {
            name    : 'demo',
            x       : 400,
            y       : 400,
            scale   : 0.5,
            texture : [Texture.from('GDP.png')]
        };
        super(personParams);

        this.perspectiveSkin = {
            up:'GUP',
            upright:'GURP',
            right:'GRP',
            downright:'GDRP',
            down:'GDP',
            downleft:'GDLP',
            left:'GLP',
            upleft:'GULP'
        };

        this.animationSpeed = 0.08;
    }

    animateMoveUp(){

    }

    animateMoveUpToRight(){

    }

    animateMoveRight(){

    }

    animateMoveDownToRight(){

    }

    animateMoveDown(invirce = false){
        let frames = [];
        if(invirce){
            for (let i = 0; i < 4; i++) {
                frames.push(Texture.from('GDPS_' + i + '.png'));
            }
        }else{
            for (let i = 0; i < 4; i++) {
                frames.push(Texture.from('GDPS_' + i + '.png'));
            }
        }
        this.textures = frames;
        this.gotoAndPlay(0);
    }
    animateMoveDownToLeft(){

    }
    animateMoveLeft(){

    }

    animateMoveUpToLeft(){

    }
}