type PType = string[];
type RType = string | null;

const can = (permission: string):boolean => {
    
    const permissions: PType = JSON.parse(localStorage.getItem('user-permissions') || '' );
    const role: RType = localStorage.getItem('user-roles');

    if (role == 'Super Admin'){
        return true;
    }
    else if(permissions.includes(permission)){
        return true
    } else {
        return false;
    }
    
}

export default can;