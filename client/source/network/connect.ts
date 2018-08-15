import World from '../world/world';

export default class Connect{
    private _socket : WebSocket;
    public world : World;

    constructor(resolve,reject){
        this._socket = new WebSocket('ws://localhost:9090');
        this._socket.onmessage = this.route;
        this._socket.onopen = resolve;
        this._socket.onerror = reject;
    }

    private route(mess){
        let data = JSON.parse(mess.data);
        switch (data.status) {
            case 'connect':
                this.world.addObject(data.object);
                break;
            default: console.log('Неизвестной сообщение от сервера' ,data);break;
        }
        console.log(data);
    }

    public connect(){
        this.world = new World(this);
    }

    private send(message){
        this._socket.send(JSON.stringify(message));
    }

}
