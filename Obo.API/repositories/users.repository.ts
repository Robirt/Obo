import { CosmosClient, SqlQuerySpec, User } from '@azure/cosmos';
import { UserEntity } from '../entities/user.entity';

/**
 * Users Repository.
 */
export class UsersRepository {

    /**
     * Cosmos Client.
     */
    private readonly cosmosClient: CosmosClient;

    /**
     * Initializes a new instance of the {@link UsersRepository} class.
     * @param cosmosClient Cosmos Client.
     */
    public constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient; 
    }

    /**
     * Gets Users.
     * @returns Users.
     */
    public async getUsersAsync(): Promise<Array<UserEntity>> {
        const { resources: users } = await this.cosmosClient.database('Obo').container('Users').items.query<UserEntity>('SELECT * FROM Users').fetchAll();
        return users;
    }

    /**
     * Gets User by Id.
     * @param id Id.
     * @returns User.
     */
    public async getUserByIdAsync(id: string): Promise<UserEntity | undefined> {
        const { resource: user } = await this.cosmosClient.database('Obo').container('Users').item(id).read<UserEntity>();
        return user;
    }

    /**
     * Gets User by User Name.
     * @param userName User Name.
     * @returns User.
     */
    public async getUserByUserNameAsync(userName: string): Promise<UserEntity | undefined> {
        const { resources: users } = await this.cosmosClient.database('Obo').container('Users').items.query<UserEntity>({ query: 'SELECT * FROM Users WHERE Users.userName = @userName', parameters: [{ name: '@userName', value: userName }] }).fetchAll();
        return users[0];
    }

    /**
     * Creates User.
     * @param user User.
     */
    public async createUserAsync(user: UserEntity): Promise<void> {
        await this.cosmosClient.database('Obo').container('Users').items.create<UserEntity>(user);
    }

    /**
     * Updates User.
     * @param user User.
     */
    public async updateUserAsync(user: UserEntity): Promise<void> {
        await this.cosmosClient.database('Obo').container('Users').item(user.id).replace<UserEntity>(user);
    }

    /**
     * Deletes User.
     * @param id Id.
     */
    public async deleteUserAsync(id: string): Promise<void> {
        await this.cosmosClient.database('Obo').container('Users').item(id).delete<UserEntity>();
    }

}
