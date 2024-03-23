import { CosmosClient } from "@azure/cosmos";
import { ActivityEntity } from "../entities/activitiy.entity";

/**
 * Activities Repository.
 */
export class ActivitiesRepository {

    /**
     * Cosmos Client.
     */
    private readonly cosmosClient: CosmosClient;

    /**
     * Initializes a new instance of the {@link ActivitiesRepository} class.
     * @param cosmosClient Cosmos Client.
     */
    public constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient;
    }

    /**
     * Gets Activities.
     * @returns Activities.
     */
    public async getActivitiesAsync(): Promise<Array<ActivityEntity>> {
        const { resources: activities } = await this.cosmosClient.database('Obo').container('Activities').items.query<ActivityEntity>('SELECT * FROM Activities').fetchAll();
        return activities;
    }

    /**
     * Gets Activity by Id.
     * @param id Id.
     * @returns Activity.
     */
    public async getActivityByIdAsync(id: string): Promise<ActivityEntity | undefined> {
        const { resource: activity } = await this.cosmosClient.database('Obo').container('Activities').item(id).read<ActivityEntity>();
        return activity;
    }

    /**
     * Creates Activity.
     * @param activity Activity.
     */
    public async createActivityAsync(activity: ActivityEntity): Promise<void> {
        await this.cosmosClient.database('Obo').container('Activities').items.create<ActivityEntity>(activity);
    }

    /**
     * Updates Activity.
     * @param activity Activity.
     */
    public async updateActivityAsync(activity: ActivityEntity): Promise<void> {
        await this.cosmosClient.database('Obo').container('Activities').item(activity.id).replace<ActivityEntity>(activity);
    }

    /**
     * Deletes Activity.
     * @param id Id.
     */
    public async deleteActivityAsync(id: string): Promise<void> {
        await this.cosmosClient.database('Obo').container('Activities').item(id).delete();
    }

}