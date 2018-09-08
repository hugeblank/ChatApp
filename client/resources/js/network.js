class Network {

    constructor()
    {
      this.addr = `ws://127.0.0.1:8080`;
    }

    initialize()
    {
        this.socket = new WebSocket(this.addr);
        this.socket.binaryType = "arraybuffer";
        this.socket.onclose = this.onError.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onopen = this.onOpen.bind(this);
    }

    onOpen()
    {
        $('#chatArea').fadeIn();
    }

    onError(e)
    {
        this.onClose(e, true);
    }

}