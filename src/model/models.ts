import {VenueModel} from "@/model/venues.model";
import {EventModel} from "@/model/events.model";
import {ImageModel} from "@/model/image.model";

export enum Model {
    // @ts-ignore
    Venue = VenueModel,
    // @ts-ignore

    Event = EventModel,
    // @ts-ignore
    Image = ImageModel,
}