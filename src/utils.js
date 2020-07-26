const EventBus = {
    channels: {},
    savedChannelName: [],
    fire (channelName, listener) {
        if (!this.channels[channelName]) {
            this.channels[channelName] = []
        }

        if (!this.savedChannelName.includes(channelName)) {
            this.savedChannelName.push(channelName);
            this.channels[channelName].push(listener);
        }
    },

    on (channelName, data) {
        const channel = this.channels[channelName]
        if (!channel || !channel.length) {
            return
        }

        channel.forEach(listener => listener(data))
    },
}
export default EventBus;