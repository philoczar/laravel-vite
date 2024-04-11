<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('Should render homepage successfully', function () {
    $response=$this->get('/');
    $response->assertStatus(200);
});

/*it('test homepage access for authenticated user',function(){
    $user=User::factory()->create();

    $this->actingAs($user)
    ->get('/api/user')
    ->assertStatus(200);
});*/
