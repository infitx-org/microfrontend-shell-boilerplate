type Callback = (message: string) => void;

export default class PubSub {
  private topics: Record<string, Callback[]> = {};

  subscribe(topic: string, callback: Callback) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    this.topics[topic].push(callback);

    return this.unsubscribe(topic, callback);
  }

  unsubscribe(topic: string, callback: Callback) {
    const callbacks = this.topics[topic];
    return function unregister() {
      callbacks.splice(callbacks.indexOf(callback), 1);
    };
  }

  dispatch(topic: string, message: string) {
    const callbacks = this.topics[topic];
    if (callbacks) {
      callbacks.forEach((callback) => callback(message));
    }
  }
}
