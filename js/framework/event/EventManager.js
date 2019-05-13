class EventManager {

    static _events = [];

    static emit(event) {
        each(EventManager._events, e => e.emit(event));
    }

    static index() {
        EventManager._events = G.game.indexEvent();
        console.log(EventManager._events.length);
    }

    static remove(node) {
        EventManager._events = EventManager._events.filter(n => n !== node);
    }
}