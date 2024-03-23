import { LocationEntity } from "./location.entity";

/**
 * Activity Entity.
 */
export class ActivityEntity {

    /**
     * Id.
     */
    public id: string = '';

    /**
     * Name.
     */
    public name: string = '';

    /**
     * Locations.
     */
    public locations: Array<LocationEntity> = new Array<LocationEntity>();

}
