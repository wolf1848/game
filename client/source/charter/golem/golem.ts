import {Charter} from "../model/model";



class Golem extends Charter{

    constructor(texture : string/*,public x : number,public y : number*/){
        super(texture);
        this.urlTexture = {
            u : {
                play : [],
                stop : ['GUP.png']
            },
            ur : {
                play : [],
                stop : ['GURP.png']
            },
            r : {
                play : [],
                stop : ['GRP.png']
            },
            dr : {
                play : [],
                stop : ['GDRP.png']
            },
            d : {
                play : [],
                stop : ['GDP.png']
            },
            dl : {
                play : [],
                stop : ['GDLP.png']
            },
            l : {
                play : [],
                stop : ['GLP.png']
            },
            ul : {
                play : [],
                stop : ['GULP.png']
            }
        };
        this.loadTexture();
    }


}


export {Golem};