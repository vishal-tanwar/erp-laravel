export interface IRole {
    id: number,
    name: string,
    users_count?: number
}


export interface IPermission {
    id: number,
    name: string
}


interface ResponseData {
    status: boolean,
    code: number,
    message: string
}


export interface IUserRegisterErrors {
    firstname: string[],
    lastname: string[],
    phone: string[],
    email: string[],
    username: string[],
    password: string[]
}

export interface IUserResponse<M = string | IUserRegisterErrors, D = any> {
    status: boolean,
    code: number,
    message: M,
    data: D
}

export interface RolesData extends ResponseData {
    data: {
        roles: IRole[]
    }
}

export interface RoleData extends ResponseData {
    data: {
        role: IRole
    }
}

export interface PermissionsData extends ResponseData {
    data: IPermission[]
}


export interface Iusers {
    id: number,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    phone: number|string,
    roles: IRole[],
    permissions: IPermission[],
    created_at: string,
    updated_at: string,
}

export type RoleOptions = { label: string, value: number };
