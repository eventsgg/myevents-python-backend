interface eventCardImage {
    src: string;
    title: string;
}

class EventCardModel {
    constructor(public image: eventCardImage, public title: string) {
        this.image = image;
        this.title = title;
    }
}

export default EventCardModel;