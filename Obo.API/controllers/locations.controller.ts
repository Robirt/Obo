import { LocationsService } from "../services/locations.service";

/**
 * Locations Controller.
 */
export class LocationsController {

    /**
     * Locations Service.
     */
    private readonly locationsService: LocationsService;

    /**
     * Initializes a new instance of the {@link LocationsController} class.
     * @param locationsService Locations Service.
     */
    public constructor(locationsService: LocationsService) {
        this.locationsService = locationsService;
    }

    /**
     * Gets Locations.
     * @param request Request.
     * @param response Response.
     */
    public async getLocationsAsync(request: any, response: any): Promise<void> {
        response.json(await this.locationsService.getLocationsAsync());
    }

    /**
     * Gets Location by Id.
     * @param request Request.
     * @param response Response.
     */
    public async getLocationByIdAsync(request: any, response: any): Promise<void> {
        response.json(await this.locationsService.getLocationByIdAsync(request.params.id));
    }

    /**
     * Creates Location.
     * @param request Request.
     * @param response Response.
     */
    public async createLocationAsync(request: any, response: any): Promise<void> {
        await this.locationsService.createLocationAsync(request.body);
        response.sendStatus(201);
    }

    /**
     * Updates Location.
     * @param request Request.
     * @param response Response.
     */
    public async updateLocationAsync(request: any, response: any): Promise<void> {
        await this.locationsService.updateLocationAsync(request.body);
        response.sendStatus(204);
    }

    /**
     * Deletes Location.
     * @param request Request.
     * @param response Response.
     */
    public async deleteLocationAsync(request: any, response: any): Promise<void> {
        await this.locationsService.deleteLocationAsync(request.params.id);
        response.sendStatus(204);
    }

}
