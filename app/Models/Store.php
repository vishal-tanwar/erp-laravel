<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;


    protected $fillable = [
        'name', 'slug'
    ];


    public static function slug($title, $id = 0)
    {   
        
        $instance = new self();

        $slug = $instance->slugify($title);
        $allSlugs = $instance->getRelatedSlugs($slug, $id);
        if (!$allSlugs->contains('slug', $slug)) {
            return $slug;
        }

        $i = 1;
        $is_contain = true;
        do {
            $newSlug = $slug . '-' . $i;
            if (!$allSlugs->contains('slug', $newSlug)) {
                $is_contain = false;
                return $newSlug;
            }
            $i++;
        } while ($is_contain);
    }
    protected function getRelatedSlugs($slug, $id = 0)
    {
        return $this->select('slug')->where('slug', 'like', $slug . '%')
            ->where('id', '<>', $id)
            ->get();
    }


    protected function slugify( string $title ): string
    {
        $slug = strtolower($title);
        $slug = str_replace(array('[\', \']'), '', $slug);
        $slug = preg_replace('/\[.*\]/U', '', $slug);
        $slug = preg_replace('/&(amp;)?#?[a-z0-9]+;/i', '-', $slug);
        $slug = htmlentities($slug, ENT_COMPAT, 'utf-8');
        $slug = preg_replace('/&([a-z])(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig|quot|rsquo);/i', '\\1', $slug);
        $slug = preg_replace(array('/[^a-z0-9]/i', '/[-]+/'), '-', $slug);

        return $slug;
    }


    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function locations(){
        return $this->hasMany(Location::class);
    }

}
