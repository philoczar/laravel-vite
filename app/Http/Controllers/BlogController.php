<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;

class BlogController extends Controller
{
    public function index(){
        $blogs=Blog::with('user')->get();
        return $blogs;
    }
    public function blogPost($blogID){
        $blog=Blog::with('user')->where('id',$blogID)->get();
        return $blog;
    }
}
