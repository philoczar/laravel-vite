<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name' => ['required','min:4'],
            'email' => ['required','email','unique:users'],
            'password' => ['required','min:6','confirmed']
        ]);
        User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);
    }

    public function login(Request $request){
       $request->validate([
            'email'=> ['required','email'],
            'password' => ['required','min:6']
        ]);
        if(Auth::attempt($request->only('email','password'))){
            return response()->json(Auth::user(),200);
        }
        throw ValidationException::withMessages([
            'email'=> ['Invalid login credentials']
        ]);
    }

    public function logout(){
        Auth::logout();
    }

}
