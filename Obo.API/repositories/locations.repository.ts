import { CosmosClient } from "@azure/cosmos";
import { LocationEntity } from "../entities/location.entity";

/**
 * Locations Repository.
 */
export class LocationsRepository {

    /**
     * Cosmos Client.
     */
    private readonly cosmosClient: CosmosClient;

    /**
     * Initializes a new instance of the {@link LocationsRepository} class.
     * @param cosmosClient Cosmos Client.
     */
    public constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient;
    }

    /**
     * Gets locations.
     * @returns Locations.
     */
    public async getLocationsAsync(): Promise<Array<LocationEntity>> {
        const { resources: locations } = await this.cosmosClient.database('Obo').container('Locations').items.query<LocationEntity>('SELECT * FROM Locations').fetchAll();
        return locations;
    }

    /**
     * Gets Location by Id.
     * @param id Id.
     * @returns Location.
     */
    public async getLocationByIdAsync(id: string): Promise<LocationEntity | undefined> {
        const { resource: location } = await this.cosmosClient.database('Obo').container('Locations').item(id).read<LocationEntity>();
        return location;
    }

    /**
     * Creates Location.
     * @param location Location.
     */
    public async createLocationAsync(location: LocationEntity): Promise<void> {
        await this.cosmosClient.database('Obo').container('Locations').items.create<LocationEntity>(location);
    }

    /**
     * Updates Location.
     * @param location Location.
     */
    public async updateLocationAsync(location: LocationEntity): Promise<void> {
        await this.cosmosClient.database('Obo').container('Locations').item(location.id).replace<LocationEntity>(location);
    }

    /**
     * Deletes Location.
     * @param id Id.
     */
    public async deleteLocationAsync(id: string): Promise<void> {
        await this.cosmosClient.database('Obo').container('Locations').item(id).delete();
    }

}
