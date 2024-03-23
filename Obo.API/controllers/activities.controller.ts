import { ActivitiesService } from "../services/activities.service";

/**
 * Activities Controller.
 */
export class ActivitiesController {

    /**
     * Activites Service.
     */
    private readonly activitiesService: ActivitiesService;

    /**
     * Initializes a new instance of the {@link ActivitesController} class.
     * @param activitiesService Activities Service.
     */
    public constructor(activitiesService: ActivitiesService) {
        this.activitiesService = activitiesService;
    }

    /**
     * Gets Activities.
     * @param request Request.
     * @param response Response.
     */
    public async getActivitiesAsync(request: any, response: any): Promise<void> {
        response.json(await this.activitiesService.getActivitiesAsync());
    }

    /**
     * Gets Activity by Id.
     * @param request Request.
     * @param response Response.
     */
    public async getActivityByIdAsync(request: any, response: any): Promise<void> {
        response.json(await this.activitiesService.getActivityByIdAsync(request.params.id));
    }

    /**
     * Creates Activity.
     * @param request Request.
     * @param response Response.
     */
    public async createActivityAsync(request: any, response: any): Promise<void> {
        await this.activitiesService.createActivityAsync(request.body);
        response.sendStatus(201);
    }

    /**
     * Updates Activity.
     * @param request Request.
     * @param response Response.
     */
    public async updateActivityAsync(request: any, response: any): Promise<void> {
        await this.activitiesService.updateActivityAsync(request.body);
        response.sendStatus(204);
    }

    /**
     * Deletes Activity.
     * @param request Request.
     * @param response Response.
     */
    public async deleteActivityAsync(request: any, response: any): Promise<void> {
        await this.activitiesService.deleteActivityAsync(request.params.id);
        response.sendStatus(204);
    }

}
