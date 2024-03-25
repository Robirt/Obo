import { UserEntity } from "../entities/user.entity";
import { UsersRepository } from "../repositories/users.repository";
import { RolesRepository } from "../repositories/roles.repository";
import { CreateUserRequest } from "../requests/create-user.request";
import { SignUpRequest } from "../requests/sign-up.request";
import bcrypt from 'bcrypt';
import { SignInRequest } from "../requests/sign-in.request";
import { SignInResponse } from "../responses/sign-in.response";
import jwt from 'jsonwebtoken';
import { environment } from "../environment";
import { UpdateUserPasswordRequest } from "../requests/update-user-password.request";


/**
 * Users Service.
 */
export class UsersService {

    /**
     * Users Repository.
     */
    private readonly usersRepository: UsersRepository;

    /**
     * Roles Repository.
     */
    private readonly rolesRepository: RolesRepository;

    /**
     * Initializes a new instance of the {@link UsersService} class.
     * @param usersRepository Users Repository.
     * @param rolesRepository Roles Repository.
     */
    public constructor(usersRepository: UsersRepository, rolesRepository: RolesRepository) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
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
     * Gets User by User Name.
     * @param userName User Name.
     * @returns User.
     */
    public async getUserByUserNameAsync(userName: string): Promise<UserEntity | undefined> {
        return await this.usersRepository.getUserByUserNameAsync(userName);
    }

    /**
     * Creates User.
     * @param createUserRequest Create User Request.
     */
    public async createUserAsync(createUserRequest: CreateUserRequest): Promise<void> {
        if ((await this.usersRepository.getUserByUserNameAsync(createUserRequest.userName))) throw new Error(`User with User Name ${createUserRequest.userName} already exists.`);
    }

    /**
     * Signs Up User.
     * @param signUpRequest Sign Up Request.
     */
    public async signUpAsync(signUpRequest: SignUpRequest): Promise<void> {
        if ((await this.usersRepository.getUserByUserNameAsync(signUpRequest.userName))) throw new Error(`User with User Name ${signUpRequest.userName} already exists.`);

        var user: UserEntity = new UserEntity();
        user.userName = signUpRequest.userName;
        user.email = signUpRequest.email;
        user.salt = await bcrypt.genSalt(10);
        user.hash = await bcrypt.hash(signUpRequest.password, user.salt);
        user.roleId = (await this.rolesRepository.getRoleByNameAsync('User'))!.id;

        await this.usersRepository.createUserAsync(user);
    }

    /**
     * Signs In User.
     * @param signInRequest Sign In Request.
     * @returns Sign In Response.
     */
    public async signInAsync(signInRequest: SignInRequest): Promise<SignInResponse> {
        var user = await this.usersRepository.getUserByUserNameAsync(signInRequest.userName);
        if (!user) throw new Error(`User with User Name ${signInRequest.userName} not found.`);

        if (user.hash !== (await bcrypt.hash(signInRequest.password, user.salt))) throw new Error('Invalid Password.');

        var signInResponse: SignInResponse = new SignInResponse();
        signInResponse.jwtBearerToken = jwt.sign({ userName: user.userName, role: (await this.rolesRepository.getRoleByIdAsync(user.roleId))!.name }, environment.jwtBearerToken.secret, { expiresIn: '7d' });

        return signInResponse;
    }

    /**
     * Updates User.
     * @param user User.
     */
    public async updateUserAsync(user: UserEntity): Promise<void> {
        await this.usersRepository.updateUserAsync(user);
    }

    /**
     * Updates User Password.
     * @param userName User Name.
     * @param updateUserPasswordRequest Update User Password Request.
     */
    public async updateUserPasswordAsync(userName: string, updateUserPasswordRequest: UpdateUserPasswordRequest): Promise<void> {
        var user = await this.usersRepository.getUserByUserNameAsync(userName);
        if (!user) throw new Error(`User with User Name ${userName} not found.`);

        user.salt = await bcrypt.genSalt(10);
        user.hash = await bcrypt.hash(updateUserPasswordRequest.password, user.salt);

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
