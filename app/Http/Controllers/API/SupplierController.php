<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use App\Models\SupplierContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illuminate\Http\Response;

class SupplierController extends Controller
{

    public function __construct()
    {
        $this->middleware("auth:api");
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $suppliers = Supplier::with("contacts")->get();
        return response()->json([
            "success" => true,
            "code" => Response::HTTP_OK,
            "message" => "All supplier fetched successfully",
            "data" => [
                "supplier" => $suppliers
            ]
        ]);

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

        if ($request->contacts) {

            foreach ($request->contacts as $contacts) {
                $validator = Validator::make($contacts, [
                    "name" => "required",
                    "designation" => "required",
                    "email" => "required|unique:supplier_contacts,email",
                    "phone" => "required|unique:supplier_contacts,phone",
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        "status" => false,
                        "code" => Response::HTTP_BAD_REQUEST,
                        "data" => [
                            "errors" => $validator->errors()
                        ],
                        "message" => "Check All Inputs"
                    ], Response::HTTP_BAD_REQUEST, );
                }
            }

        }

        $validator = Validator::make($request->all(), [
            "SupplierName" => "required|string",
            "Address1" => "required|string",
            "Email" => "required|email",
            "Mobile" => "required|min:10|max:10",
            "STDCode" => "required",
            "Phone" => "required|min:10|max:10",
            "Fax" => "required|string",
            "Website" => "nullable|string",
            "NatureOfCompany" => "nullable|string",
            "NatureOfBusiness" => "nullable|string",
            "IsCertified" => "boolean",
            "RelativeWorkingWithUs" => "nullable|string",
            "SizeOfCompany" => "required|string",
            "YearOfEstablishment" => "required|string",
            "InvestmentValue" => "nullable|string",
            "RegistrationNo" => "required|string",
            "RegistrationDate" => "required|string",
            "GSTRegistrationNo" => "required|string",
            "GSTRegistrationDate" => "required|string",
            "PANNo" => "required|string",
            "PANRegistrationDate" => "required|string",
            "ExpectedDateOfCertificateRecieve" => "nullable|string",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "code" => Response::HTTP_BAD_REQUEST,
                "data" => [
                    "errors" => $validator->errors()
                ],
                "message" => "Check All Inputs"
            ], Response::HTTP_BAD_REQUEST, );
        }

        $supplier = Supplier::create([
            "firm_name" => $request->SupplierName,
            "address" => $request->Address1,
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
            "is_iso_resgitered" => $request->IsCertified ? "yes" : "no",
            "related_working" => $request->RelativeWorkingWithUs,
            "company_size" => $request->SizeOfCompany,
            "established_year" => $request->YearOfEstablishment,
            "investment_value" => $request->InvestmentValue,
            "registration_number" => $request->RegistrationNo,
            "registration_date" => $request->RegistrationDate,
            "gst_number" => $request->GSTRegistrationNo,
            "gst_reg_date" => $request->GSTRegistrationDate,
            "pan" => $request->PANNo,
            "pan_reg_date" => $request->PANRegistrationDate,
            "receipt_date" => $request->ExpectedDateOfCertificateRecieve,
            "have_certification_copy" => 'no'
        ]);



        $supplier_id = $supplier->id;

        $manupulated = array_map(function ($a) use ($supplier_id) {
            $a["supplier_id"] = $supplier_id;
            return $a;
        }, $request->contacts);

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
     * 
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $supplier = Supplier::find( $id );

        $isDeleted = $supplier->delete();

        return response()->json([
            "success" => $isDeleted,
            "message" => "",
            "data" => [],
            "code" => Response::HTTP_OK
        ]);
    }
}