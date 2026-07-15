<?php

namespace App\Http\Controllers;

use App\Models\Transport;
use App\Models\Setting;
use App\utils\helpers;
use Carbon\Carbon;
use App\Models\Account;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use DB;

class TransportsController extends BaseController
{
    //----------- Get ALL Transports -------\\
    public function index(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Transport::class);

        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();

        $columns = array(0 => 'name', 1 => 'code', 2 => 'phone', 3 => 'email');
        $param = array(0 => 'like', 1 => 'like', 2 => 'like', 3 => 'like');
        $data = array();

        $transports = Transport::where('deleted_at', '=', null);

        $Filtred = $helpers->filter($transports, $columns, $param, $request)
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('name', 'LIKE', "%{$request->search}%")
                        ->orWhere('code', 'LIKE', "%{$request->search}%")
                        ->orWhere('phone', 'LIKE', "%{$request->search}%")
                        ->orWhere('email', 'LIKE', "%{$request->search}%");
                });
            });

        $totalRows = $Filtred->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }

        $transports = $Filtred->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($transports as $transport) {
            $item['id'] = $transport->id;
            $item['name'] = $transport->name;
            $item['phone'] = $transport->phone;
            $item['tax_number'] = $transport->tax_number;
            $item['code'] = $transport->code;
            $item['email'] = $transport->email;
            $item['country'] = $transport->country;
            $item['city'] = $transport->city;
            $item['adresse'] = $transport->adresse;
            $data[] = $item;
        }

        $company_info = Setting::where('deleted_at', '=', null)->first();
        $accounts = Account::where('deleted_at', '=', null)->orderBy('id', 'desc')->get(['id','account_name']);

        return response()->json([
            'transports' => $data,
            'company_info' => $company_info,
            'totalRows' => $totalRows,
            'accounts' => $accounts,
        ]);
    }

    //----------- Store new Transport -------\\
    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Transport::class);

        request()->validate([
            'name' => 'required',
        ]);

        Transport::create([
            'name' => $request['name'],
            'code' => $this->getNumberOrder(),
            'adresse' => $request['adresse'],
            'phone' => $request['phone'],
            'email' => $request['email'],
            'country' => $request['country'],
            'city' => $request['city'],
            'tax_number' => $request['tax_number'],
        ]);

        return response()->json(['success' => true]);
    }

    //------------ function show -----------\\
    public function show($id)
    {
        // not used for now
    }

    //----------- Update Transport -------\\
    public function update(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Transport::class);

        request()->validate([
            'name' => 'required',
        ]);

        Transport::whereId($id)->update([
            'name' => $request['name'],
            'adresse' => $request['adresse'],
            'phone' => $request['phone'],
            'email' => $request['email'],
            'country' => $request['country'],
            'city' => $request['city'],
            'tax_number' => $request['tax_number'],
        ]);

        return response()->json(['success' => true]);
    }

    //----------- Remove Transport -------\\
    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Transport::class);

        Transport::whereId($id)->update([
            'deleted_at' => Carbon::now(),
        ]);
        return response()->json(['success' => true]);
    }

    //-------------- Delete by selection  ---------------\\
    public function delete_by_selection(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Transport::class);

        $selectedIds = $request->selectedIds;
        foreach ($selectedIds as $transport_id) {
            Transport::whereId($transport_id)->update([
                'deleted_at' => Carbon::now(),
            ]);
        }
        return response()->json(['success' => true]);
    }

    //----------- get Number Order Of Transports -------\\
    public function getNumberOrder()
    {
        $last = DB::table('transports')->latest('id')->first();

        if ($last) {
            $code = $last->code + 1;
        } else {
            $code = 1;
        }
        return $code;
    }
}