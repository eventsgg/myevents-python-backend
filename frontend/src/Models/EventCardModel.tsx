export interface IEventCardImage {
    src: string;
    title: string;
}

export class EventCardModel {
    constructor(public image: IEventCardImage, public title: string) {
        this.image = image;
        this.title = title;
    }
}