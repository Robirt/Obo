import { CosmosClient } from "@azure/cosmos";
import { RoleEntity } from "../entities/role.entity";

/**
 * Roles Repository.
 */
export class RolesRepository {

    /**
     * Cosmos Client.
     */
    private readonly cosmosClient: CosmosClient;

    /**
     * Initializes a new instance of the {@link RolesRepository} class.
     * @param cosmosClient Cosmos Client.
     */
    public constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient;
    }

    /**
     * Gets Roles.
     * @returns Roles.
     */
    public async getRolesAsync(): Promise<Array<RoleEntity>> {
        const { resources: roles } = await this.cosmosClient.database('Obo').container('Roles').items.query<RoleEntity>('SELECT * FROM Roles').fetchAll();
        return roles;
    }

    /**
     * Gets Role by Id.
     * @param id Id.
     * @returns Role.
     */
    public async getRoleByIdAsync(id: string): Promise<RoleEntity | undefined> {
        const { resource: role } = await this.cosmosClient.database('Obo').container('Roles').item(id).read<RoleEntity>();
        return role;
    }

    /**
     * Gets Role by Name.
     * @param name Name.
     * @returns Role.
     */
    public async getRoleByNameAsync(name: string): Promise<RoleEntity | undefined> {
        const { resources: roles } = await this.cosmosClient.database('Obo').container('Roles').items.query<RoleEntity>({ query: 'SELECT * FROM Roles WHERE Roles.name = @name', parameters: [{ name: '@name', value: name }] }).fetchAll();
        return roles[0];
    }

}