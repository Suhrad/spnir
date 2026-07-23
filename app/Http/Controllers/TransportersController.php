<?php

namespace App\Http\Controllers;

use App\Models\Transporter;
use App\utils\helpers;
use Illuminate\Http\Request;

class TransportersController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Transporter::class);

        $perPage = $request->limit ? $request->limit : 10;
        $pageStart = $request->get('page', 1);
        $offSet = ($pageStart * $perPage) - $perPage;
        
        $order = $request->SortField ? $request->SortField : 'id';
        $dir = $request->SortType ? $request->SortType : 'desc';

        $query = Transporter::query();

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'LIKE', "%{$request->search}%")
                  ->orWhere('phone', 'LIKE', "%{$request->search}%")
                  ->orWhere('address', 'LIKE', "%{$request->search}%");
            });
        }

        $totalRows = $query->count();
        
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }

        $transporters = $query->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        return response()->json([
            'transporters' => $transporters,
            'totalRows' => $totalRows,
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Transporter::class);

        request()->validate([
            'name' => 'required',
        ]);

        Transporter::create([
            'name' => $request['name'],
            'phone' => $request['phone'],
            'address' => $request['address'],
        ]);

        return response()->json(['success' => true]);
    }

    public function update(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Transporter::class);

        request()->validate([
            'name' => 'required',
        ]);

        Transporter::whereId($id)->update([
            'name' => $request['name'],
            'phone' => $request['phone'],
            'address' => $request['address'],
        ]);

        return response()->json(['success' => true]);
    }

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Transporter::class);

        $transporter = Transporter::findOrFail($id);
        $transporter->delete();

        return response()->json(['success' => true]);
    }

    public function delete_by_selection(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Transporter::class);

        $selectedIds = $request->selectedIds;
        Transporter::whereIn('id', $selectedIds)->delete();

        return response()->json(['success' => true]);
    }
}
