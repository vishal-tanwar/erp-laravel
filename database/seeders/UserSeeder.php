<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'firstname' => 'Super',
            'lastname' => 'Admin',
            'username' => 'admin',
            'phone'    => '1800123789',
            'email' => 'admin@gmail.com',
            'password'  => Hash::make('Admin@123')
        ]);

        $role = Role::create(['name' => 'Super Admin']);
        $user->assignRole($role);
    }
}
