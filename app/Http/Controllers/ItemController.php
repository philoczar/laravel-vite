<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
class ItemController extends Controller
{
    public function create(Request $request){
       $request->validate([
            'title'=>['required','min:10','max:255'],
            'description' => ['required','min:100']
        ]);


        $userID=$request->user()->id;
        $title=$request->title;
        $description=$request->description;
        $fileName='';

        if($request->hasFile('image')){
            $file=$request->file('image');
            $fileName=time().'.'.$file->getClientOriginalName();
            $file->move(public_path('uploads'),$fileName);
        }

       Item::create([
            'user_id'=>1,
            'itemName'=>$title,
            'itemImage'=>$fileName,
            'itemCategory'=>'category1',
            'itemDescription'=>$description
        ]);



        return array(
            'user_id'=>$userID,
            'title'=>$title,
            'description'=>$description
        );
    }
    public function fetch(){
        $items= Item::orderBy('created_at','desc')->paginate(20);
        return $items;
    }
    public function show(Request $request){
        $itemID=(int) $request->itemID;
        $item=Item::find($itemID);
        return $item;
    }
}
