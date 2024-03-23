import express, { Express } from "express";
import { CosmosClient } from "@azure/cosmos";
import { environment } from "./environment";
import { DependencyService } from "./dependency.service";
import { UsersRepository } from "./repositories/users.repository";
import { LocationsRepository } from "./repositories/locations.repository";
import { ActivitiesRepository } from "./repositories/activities.repository";
import { UsersService } from "./services/users.service";
import { LocationsService } from "./services/locations.service";
import { ActivitiesService } from "./services/activities.service";
import { UsersController } from "./controllers/users.controller";
import { LocationsController } from "./controllers/locations.controller";
import { ActivitiesController } from "./controllers/activities.controller";

/**
 * Application.
 */
export class Application {
    
    /**
     * Express Application.
     */
    private readonly express: Express;

    /**
     * Initializes a new instance of the {@link Application} class.
     */
    public constructor() {
        this.express = express();
    }

    /**
     * Starts Application.
     */
    public run(): void {
        this.express.listen(3000, () => console.log('Now listening on: http://localhost:3000.', 'Application started. Press Ctrl+C to shut down.'));
    }

    /**
     * Configures Services.
     */
    public configureServices(): void {
        DependencyService.addService(CosmosClient, new CosmosClient({ endpoint: environment.azureCosmosDB.endpoint, key: environment.azureCosmosDB.key }));

        DependencyService.addService(UsersRepository, new UsersRepository(DependencyService.getService(CosmosClient)));
        DependencyService.addService(LocationsRepository, new LocationsRepository(DependencyService.getService(CosmosClient)));
        DependencyService.addService(ActivitiesRepository, new ActivitiesRepository(DependencyService.getService(CosmosClient)));

        DependencyService.addService(UsersService, new UsersService(DependencyService.getService(UsersRepository)));
        DependencyService.addService(LocationsService, new LocationsService(DependencyService.getService(LocationsRepository)));
        DependencyService.addService(ActivitiesService, new ActivitiesService(DependencyService.getService(ActivitiesRepository)));
    }

    /**
     * Configures Controllers.
     */
    public configureControllers(): void {
        DependencyService.addService(UsersController, new UsersController(DependencyService.getService(UsersService)));
        DependencyService.addService(LocationsController, new LocationsController(DependencyService.getService(LocationsService)));
        DependencyService.addService(ActivitiesController, new ActivitiesController(DependencyService.getService(ActivitiesService)));
    }

    /**
     * Configures Routing.
     */
    public configureRouting(): void {
        this.express.get('/Users', async (request, response) => await DependencyService.getService(UsersController).getUsersAsync(request, response));
        this.express.get('/Users/:id', async (request, response) => await DependencyService.getService(UsersController).getUserByIdAsync(request, response));
        this.express.post('/Users', async (request, response) => await DependencyService.getService(UsersController).createUserAsync(request, response));
        this.express.put('/Users', async (request, response) => await DependencyService.getService(UsersController).updateUserAsync(request, response));
        this.express.delete('/Users/:id', async (request, response) => await DependencyService.getService(UsersController).deleteUserAsync(request, response));

        this.express.get('/Locations', async (request, response) => await DependencyService.getService(LocationsController).getLocationsAsync(request, response));
        this.express.get('/Locations/:id', async (request, response) => await DependencyService.getService(LocationsController).getLocationByIdAsync(request, response));
        this.express.post('/Locations', async (request, response) => await DependencyService.getService(LocationsController).createLocationAsync(request, response));
        this.express.put('/Locations', async (request, response) => await DependencyService.getService(LocationsController).updateLocationAsync(request, response));
        this.express.delete('/Locations/:id', async (request, response) => await DependencyService.getService(LocationsController).deleteLocationAsync(request, response));

        this.express.get('/Activities', async (request, response) => await DependencyService.getService(ActivitiesController).getActivitiesAsync(request, response));
        this.express.get('/Activities/:id', async (request, response) => await DependencyService.getService(ActivitiesController).getActivityByIdAsync(request, response));
        this.express.post('/Activities', async (request, response) => await DependencyService.getService(ActivitiesController).createActivityAsync(request, response));
        this.express.put('/Activities', async (request, response) => await DependencyService.getService(ActivitiesController).updateActivityAsync(request, response));
        this.express.delete('/Activities/:id', async (request, response) => await DependencyService.getService(ActivitiesController).deleteActivityAsync(request, response));
    }

    public async configureDatabase(): Promise<void> {
        const cosmosClient: CosmosClient = DependencyService.getService(CosmosClient);

        const { database: oboDatabase } = await cosmosClient.databases.createIfNotExists({ id: 'Obo' })

        oboDatabase.containers.createIfNotExists({ id: 'Users' });
        oboDatabase.containers.createIfNotExists({ id: 'Locations' });
        oboDatabase.containers.createIfNotExists({ id: 'Activities' });

        const { container: rolesContainer } = await oboDatabase.containers.createIfNotExists({ id: 'Roles' });

        const { resources: roles } = await rolesContainer.items.readAll().fetchAll();

        if (roles.length === 0) {
            await rolesContainer.items.create({ id: '1', name: 'Administrator' });
            await rolesContainer.items.create({ id: '2', name: 'User' });
        }
    }

}
