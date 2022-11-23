<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        'user_id',
        'isDone',
        'task'
    ];

    use HasFactory;

    public function user() {
      return $this->belongsTo("App\Models\User");
    }
}
