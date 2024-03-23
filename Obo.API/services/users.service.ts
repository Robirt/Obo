import { UserEntity } from "../entities/user.entity";
import { UsersRepository } from "../repositories/users.repository";

/**
 * Users Service.
 */
export class UsersService {

    /**
     * Users Repository.
     */
    private readonly usersRepository: UsersRepository;

    /**
     * Initializes a new instance of the {@link UsersService} class.
     * @param usersRepository Users Repository.
     */
    public constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    /**
     * Gets users.
     * @returns Users.
     */
    public async getUsersAsync(): Promise<Array<UserEntity>> {
        return await this.usersRepository.getUsersAsync();
    }

    /**
     * Gets User by Id.
     * @param id Id.
     * @returns User.
     */
    public async getUserByIdAsync(id: string): Promise<UserEntity | undefined> {
        return await this.usersRepository.getUserByIdAsync(id);
    }

    /**
     * Creates User.
     * @param user User.
     */
    public async createUserAsync(user: UserEntity): Promise<void> {
        await this.usersRepository.createUserAsync(user);
    }

    /**
     * Updates User.
     * @param user User.
     */
    public async updateUserAsync(user: UserEntity): Promise<void> {
        await this.usersRepository.updateUserAsync(user);
    }

    /**
     * Deletes User.
     * @param id Id.
     */
    public async deleteUserAsync(id: string): Promise<void> {
        await this.usersRepository.deleteUserAsync(id);
    }
    
}
