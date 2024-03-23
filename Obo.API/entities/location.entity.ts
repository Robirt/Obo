import { ActivityEntity } from "./activitiy.entity";

/**
 * Location Entity.
 */
export class LocationEntity {

    /**
     * Id.
     */
    public id: string = '';

    /**
     * Name.
     */
    public name: string = '';

    /**
     * Description.
     */
    public description: string = '';

    /**
     * Activities.
     */
    public activities: Array<ActivityEntity> = new Array<ActivityEntity>();

}
