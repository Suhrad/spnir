<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class TranslationSeeder extends Seeder
{
    public function run(): void
    {
        // Disable query logging for speed & memory
        DB::disableQueryLog();

        $path = database_path('seeders/translations');
        $files = File::files($path);

        $uniqueTranslations = [];

        foreach ($files as $file) {
            $locale = pathinfo($file, PATHINFO_FILENAME); // 'en', 'ar', etc.
            $translations = require $file;

            foreach ($translations as $key => $value) {
                $compoundKey = $locale . '|' . $key;
                // Deduplicate within files and across locales by compound key
                $uniqueTranslations[$compoundKey] = [
                    'locale'     => $locale,
                    'key'        => $key,
                    'value'      => $value,
                    'is_default' => $locale === 'en' ? 1 : 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        $allTranslations = array_values($uniqueTranslations);
        DB::transaction(function () use ($allTranslations) {
            foreach ($allTranslations as $row) {
                DB::table('translations')->updateOrInsert(
                    ['locale' => $row['locale'], 'key' => $row['key']],
                    [
                        'value' => $row['value'],
                        'is_default' => $row['is_default'],
                        'created_at' => $row['created_at'],
                        'updated_at' => $row['updated_at'],
                    ]
                );
            }
        });
    }


}
