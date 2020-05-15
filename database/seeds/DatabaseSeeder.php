<?php

use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class)->create([
            'name' => 'William Jordan',
            'email' => 'w@w.com',
            'expert' => 'Doctor',
            'isExpert' => true,
            'country' => 'Anabar',
            'timezone' => 'Pacific/Auckland',
            'expert_start_time' => new DateTime(now()->format('yy-m-d') . ' 6 pm', new DateTimeZone('Pacific/Auckland')),
            'expert_end_time' => new DateTime(now()->format('yy-m-d') . ' 5 pm', new DateTimeZone('Pacific/Auckland')),
        ]);
        factory(User::class)->create([
            'name' => 'Quasi Shawa',
            'email' => 'q@q.com',
            'expert' => 'Civil engineer',
            'isExpert' => true,
            'country' => 'Syria',
            'timezone' => 'Asia/Damascus',
            'expert_start_time' => new DateTime(now()->format('yy-m-d') . ' 6 am', new DateTimeZone('Asia/Damascus')),
            'expert_end_time' => new DateTime(now()->format('yy-m-d') . ' 12 pm', new DateTimeZone('Asia/Damascus')),
        ]);
        factory(User::class)->create([
            'name' => ' Shimaa Badawy',
            'email' => 's@s.com',
            'expert' => 'Computer Engineer',
            'isExpert' => true,
            'country' => 'Egypt',
            'timezone' => 'Africa/Cairo',
            'expert_start_time' => new DateTime(now()->format('yy-m-d') . ' 1 pm', new DateTimeZone('Africa/Cairo')),
            'expert_end_time' => new DateTime(now()->format('yy-m-d') . ' 2 pm', new DateTimeZone('Africa/Cairo')),
        ]);

    }
}
