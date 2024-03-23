import { ActivityEntity } from "../entities/activitiy.entity";
import { ActivitiesRepository } from "../repositories/activities.repository";

/**
 * Activites Service.
 */
export class ActivitiesService {

    /**
     * Activities Repository.
     */
    private readonly activitiesRepository: ActivitiesRepository;
    
    /**
     * Initializes a new instance of the {@link ActivitesService} class.
     * @param activitiesRepository 
     */
    public constructor(activitiesRepository: ActivitiesRepository) {
        this.activitiesRepository = activitiesRepository;
    }

    /**
     * Gets Activities.
     * @returns Activities.
     */
    public async getActivitiesAsync(): Promise<Array<ActivityEntity>> {
        return await this.activitiesRepository.getActivitiesAsync();
    }

    /**
     * Gets Activity by Id.
     * @param id Id.
     * @returns Activity.
     */
    public async getActivityByIdAsync(id: string): Promise<ActivityEntity | undefined> {
        return await this.activitiesRepository.getActivityByIdAsync(id);
    }

    /**
     * Creates Activity.
     * @param activity Activity.
     */
    public async createActivityAsync(activity: ActivityEntity): Promise<void> {
        await this.activitiesRepository.createActivityAsync(activity);
    }

    /**
     * Updates Activity.
     * @param activity Activity.
     */
    public async updateActivityAsync(activity: ActivityEntity): Promise<void> {
        await this.activitiesRepository.updateActivityAsync(activity);
    }

    /**
     * Deletes Activity.
     * @param id Id.
     */
    public async deleteActivityAsync(id: string): Promise<void> {
        await this.activitiesRepository.deleteActivityAsync(id);
    }

}
