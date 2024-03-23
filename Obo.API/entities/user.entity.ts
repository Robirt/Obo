import { RoleEntity } from "./role.entity";

/**
 * User Entity.
 */
export class UserEntity {

    /**
     * Id.
     */
    public id: string = '';

    /**
     * User Name.
     */
    public userName: string = '';

    /**
     * Email.
     */
    public email: string = '';

    /**
     * Role Id.
     */
    public roleId: string = '';

    /**
     * Role.
     */
    public role: RoleEntity = new RoleEntity();

}
