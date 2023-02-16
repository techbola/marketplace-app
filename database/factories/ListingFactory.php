<?php

namespace Database\Factories;

use App\Models\Listing;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class ListingFactory extends Factory
{
    protected $model = Listing::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->sentence;
        $slug = Str::slug($title, '-');

        return [
            'title' => $title,
            'slug' => $slug,
            'description' => $this->faker->paragraph,
            'date_online' => now(),
            'date_offline' => now(),
            'price' => $this->faker->randomNumber(4),
            'currency' => $this->faker->randomElement(["Naira", "Rand"]),
            'mobile' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail(),
            'category' => $this->faker->randomElement(["Furniture", "Electronics", "Cars", "Property"]),
        ];
    }
}
