import { RolesRepository } from "../repositories/roles.repository";
import { RoleEntity } from "../entities/role.entity";

/**
 * Roles Service.
 */
export class RolesService {

    /**
     * Roles Repository.
     */
    private readonly rolesRepository: RolesRepository;

    /**
     * Initializes a new instance of the {@link RolesService} class.
     * @param rolesRepository Roles Repository.
     */
    public constructor(rolesRepository: RolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * Gets Roles.
     * @returns Roles.
     */
    public async getRolesAsync(): Promise<Array<RoleEntity>> {
        return await this.rolesRepository.getRolesAsync();
    }

    /**
     * Gets Role by Id.
     * @param id Id.
     * @returns Role.
     */
    public async getRoleByIdAsync(id: string): Promise<RoleEntity | undefined> {
        return await this.rolesRepository.getRoleByIdAsync(id);
    }

    /**
     * Gets Role by Name.
     * @param name Name.
     * @returns Role.
     */
    public async getRoleByNameAsync(name: string): Promise<RoleEntity | undefined> {
        return await this.rolesRepository.getRoleByNameAsync(name);
    }

}
