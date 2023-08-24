<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use App\Models\SupplierContact;
use Illuminate\Http\Request;

class SupplierController extends Controller
{

    public function __construct(){
        $this->middleware("auth:api");
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $supplier = Supplier::create([
            "firm_name" => $request->SupplierName,
            "address"   => $request->Address1,
            "email" => $request->Email,
            "tel_country_code" => "+91",
            "tel_std_code" => $request->STDCode,
            "tel_number" => $request->Phone,
            "fax_country_code" => "+91",
            "fax_std_code" => $request->STDCode,
            "fax_number" => $request->Fax,
            "country_code" => "+91",
            "number" => $request->Mobile,
            "website" => $request->Website,
            "company_nature" => $request->NatureOfCompany,
            "business_nature" => $request->NatureOfBusiness,
            "is_iso_resgitered" => $request->IsCertified ? "yes" : "no" ,
            "related_working"   => $request->RelativeWorkingWithUs,
            "company_size"  => $request->SizeOfCompany,
            "established_year"  => $request->YearOfEstablishment,
            "investment_value"  => $request->InvestmentValue,
            "registration_number"   => $request->RegistrationNo,
            "registration_date" => $request->RegistrationDate,
            "gst_number"    => $request->GSTRegistrationNo,
            "gst_reg_date"  => $request->GSTRegistrationDate,
            "pan"   => $request->PANNo,
            "pan_reg_date"  => $request->PANRegistrationDate,
            "receipt_date"  => $request->ExpectedDateOfCertificateRecieve,
            "have_certification_copy" => 'no' 
        ]);



        $supplier_id = $supplier->id;

        $manupulated = array_map( function( $a ) use($supplier_id) {
            $a["supplier_id"] = $supplier_id;
            return $a;
        },$request->contacts);

        // return json_encode( $manupulated );
        SupplierContact::insert($manupulated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
