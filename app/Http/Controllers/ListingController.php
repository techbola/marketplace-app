<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ListingController extends Controller
{
    public function index(Request $request)
    {
        $query = Listing::query();

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }
        if ($request->has('search_query')) {
            $query->where('title', 'LIKE', '%' . $request->input('search_query') . '%');
        }

        $data = $query->get();

        return response([
            'success' => true,
            'listings' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'date_online' => 'required',
            'date_offline' => 'required',
            'price' => 'required|numeric',
            'currency' => 'required',
            'mobile' => 'required',
            'email' => 'required|email|string',
            'category' => 'required',
        ]);

        $listing = new Listing();

        $listing->title = $request->input('title');
        $listing->slug = Str::slug($request->input('title'), '-');
        $listing->description = $request->input('description');
        $listing->date_online = $request->input('date_online');
        $listing->date_offline = $request->input('date_offline');
        $listing->price = $request->input('price');
        $listing->currency = $request->input('currency');
        $listing->mobile = $request->input('mobile');
        $listing->email = $request->input('email');
        $listing->category = $request->input('category');

        $listing->save();

        return response([
            'success' => true,
            'listing' => $listing,
        ], 201);
    }
}
