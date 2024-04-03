<?php

it('has a homepage', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
