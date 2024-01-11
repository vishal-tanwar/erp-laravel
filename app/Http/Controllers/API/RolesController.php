<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    public function index(){
        $roles = Role::select('id', 'name')->orderBy("id")->where("name","<>", "Super Admin")->withCount('users')->get();
        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Roles fetched successfully',
            'data' => ["roles" => $roles]
        ]);
    }

    public function store(Request $request){
        $role = Role::create($request->all());

        $createdRole = Role::select('id', 'name')->where('id', $role->id)->withCount('users')->first();

        return response()->json([
            "status" => true,
            "code" => Response::HTTP_CREATED,
            'message' => 'Role created successfully',
            'data' => ["role" => $createdRole]
        ], Response::HTTP_CREATED);
    }

    public function update( $id, Request $request ){
        $role = ROle::findById($id);
        $role->name = $request->name;
        $role->save();

        return response()->json([
            "success" => true,
            "message" => "",
            "code" => Response::HTTP_ACCEPTED,
            "data" => [ "role" => $role ],
        ], Response::HTTP_ACCEPTED);
    }

    public function destroy( int $id ){
        $role = Role::findById( $id );

        if( $role->users()->exists() ){
            return response()->json([
                "success" => false,
                "message"  => "This role can't be deleted because of assigned to users.",
                "code" => Response::HTTP_UNAUTHORIZED,
                "data" => [],
            ], Response::HTTP_UNAUTHORIZED);
        }

        $role->delete();
        $role->permissions()->delete();
        return response()->json([
            "success" => true,
            "data" => [ "role" => $role ],
            "code" => Response::HTTP_ACCEPTED,
            "message" => "Role deleted successfully!"
        ], Response::HTTP_ACCEPTED);
    }


    public function rolePermissions( $roleId ){

        $role = Role::findById( $roleId );

        return response()->json([
            "success" => true,
            "message"   => "Permissions fetched successfully",
            "code"  => Response::HTTP_OK,
            "data" => $role->permissions
        ]);

    }

    public function syncPermissionsWithRoles( Request $request ){

        $role = Role::findById($request->role_id);

        foreach( $request->permissions as $p ){
            Permission::firstOrCreate(["name" => $p ]);
        }

        $role->syncPermissions($request->permissions);

        return response()->json([
            "success" => true,
            "code" => Response::HTTP_ACCEPTED,
            "message" => "Permissions assigned successfully",
            "data" => $role->permissions->pluck('name'),
        ], Response::HTTP_ACCEPTED);
    }
}
