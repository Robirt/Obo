import { LocationEntity } from "../entities/location.entity";
import { LocationsRepository } from "../repositories/locations.repository";

/**
 * Locations Service.
 */
export class LocationsService {

    /**
     * Locations Repository.
     */
    private readonly locationsRepository: LocationsRepository;
    
    /**
     * Initializes a new instance of the {@link LocationsService} class.
     * @param locationsRepository 
     */
    public constructor(locationsRepository: LocationsRepository) {
        this.locationsRepository = locationsRepository;
    }

    /**
     * Gets Locations.
     * @returns Locations.
     */
    public async getLocationsAsync(): Promise<Array<LocationEntity>> {
        return await this.locationsRepository.getLocationsAsync();
    }

    /**
     * Gets Location by Id.
     * @param id Id.
     * @returns Location.
     */
    public async getLocationByIdAsync(id: string): Promise<LocationEntity | undefined> {
        return await this.locationsRepository.getLocationByIdAsync(id);
    }

    /**
     * Creates Location.
     * @param location Location.
     */
    public async createLocationAsync(location: LocationEntity): Promise<void> {
        await this.locationsRepository.createLocationAsync(location);
    }

    /**
     * Updates Location.
     * @param location Location.
     */
    public async updateLocationAsync(location: LocationEntity): Promise<void> {
        await this.locationsRepository.updateLocationAsync(location);
    }

    /**
     * Deletes Location.
     * @param id Id.
     */
    public async deleteLocationAsync(id: string): Promise<void> {
        await this.locationsRepository.deleteLocationAsync(id);
    }

}
