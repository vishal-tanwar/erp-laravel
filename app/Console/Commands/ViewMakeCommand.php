<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;


class ViewMakeCommand extends Command
{
   
    protected $name = 'make:view';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */

    protected $signature = 'make:view {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new blade file';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $view = $this->argument('name');

        $path = $this->viewPath($view);

        $this->createViewDir($path);

        if (File::exists($path)) {
            $this->error("File {$path} already exists!");
            return;
        }

        File::put($path, $path);

        $this->info("File {$path} created.");
    }


    /**
     * Create View directory if not Exists
     * 
     * @param $path 
     * 
     * @return void
     */

     protected function createViewDir( string $path ):void
     {
        $dir = dirname($path);

        if( !file_exists($dir) ){
            mkdir( $dir, 0777, true );
        }
     }

    /**
     * Get the view full path.
     *
     * @param string $view
     *
     * @return string
     */
    protected function viewPath($view): string
    {
        $view = str_replace('.', '/', $view) . '.blade.php';

        $path = resource_path("views/{$view}");

        return $path;
    }
}
