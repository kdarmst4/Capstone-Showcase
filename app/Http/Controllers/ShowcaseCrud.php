<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Validator;
use Session;

class ShowcaseCrud extends Controller
{
    //change auto increment - ALTER TABLE `ShowcaseEntries` AUTO_INCREMENT=6
    public function add(Request $request){
        $validator = Validator::make($request->all(), [
            'Email' => 'required|email|regex:/@asu\.edu$/i',
            'Name' => 'required',
            'ProjectTitle' => 'required|unique:ShowcaseEntries,ProjectTitle',
            "ProjectDescription"=>"required",
            "Sponsor"=>"required",
            "MemberNames"=>"required",
            "CourseNumber"=>"required",
            "NumberOfMembers"=> "required|integer|min:1",
            "Demo"=>"required",
            "Power"=>"required",
            "NDA"=> "required",
            'VideoLink' => 'required|url',
        ], [
            'Email.regex' => 'The email must be an "@asu.edu" email address',
            'ProjectTitle.unique' => 'This project name already exists, duplicate entry detected.',
            'VideoLink.url' => 'The video link must be a valid url'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $videolink = $request->input('VideoLink');

        $embedlink = "";

        //determine if they put the embed link in already - shouldn't be the case, but handle it anyways
        if(str_contains($videolink, 'embed')){
            $embedlink = $videolink;
        }else{
            $embedlink = $this->getYouTubeEmbedLink($videolink);
        }
        
        //$request->merge(['VideoLink' => $embedlink]);

        //$request->validate([
            //"Email"=>"required",
            //"ProjectTitle"=>"required",
            
            //"VideoLink"=>"required"
        //]); shouldnt need anymore

        $NDADisplay = $request->input('NDA') == "Yes" ? "NO":"YES";

        $query = DB::table('ShowcaseEntries')->insert([
            "Email"=>$request->input("Email"),
            "Name"=>$request->input("Name"),
            "ProjectTitle"=>$request->input("ProjectTitle"),
            "ProjectDescription"=>$request->input("ProjectDescription"),
            "Sponsor"=>$request->input("Sponsor"),
            "MemberNames"=>$request->input("MemberNames"),
            "CourseNumber"=>$request->input("CourseNumber"),
            "NumberOfMembers"=>$request->input("NumberOfMembers"),
            "Demo"=>$request->input("Demo"),
            "Power"=>$request->input("Power"),
            "NDA"=>$request->input("NDA"),
            "VideoLink"=>$embedlink,
            "VideoLinkRaw"=>$request->input('VideoLink'),
            "DateStamp"=> date("Y-m-d H:i:s"),
            "ShouldDisplay" =>$NDADisplay
        ]);

        //THIS ISNT EFFICIENT - on a time crunch here, but this is used as the info in the email thats sent on success
        $Email = $request->input("Email");
        $Name = $request->input("Name");
        $ProjectTitle=$request->input("ProjectTitle");
        $ProjectDescription=$request->input("ProjectDescription");
        $Sponsor=$request->input("Sponsor");
        $MemberNames=$request->input("MemberNames");
        $CourseNumber=$request->input("CourseNumber");
        $NumberOfMembers=$request->input("NumberOfMembers");
        $Demo=$request->input("Demo");
        $Power=$request->input("Power");
        $NDA=$request->input("NDA");
        $VideoLink=$request->input("VideoLink");

        if($query){
            //SEND EMAIL RECIEPT

            $message = "Thank you for submitting your capstone survey information. Below is a reciept outlining the information you have entered.
            \n
            \n
            Email: $Email \n
            Name: $Name \n
            Project Title: $ProjectTitle \n
            Project Description: $ProjectDescription \n
            Sponsor: $Sponsor \n
            Team Member Names: $MemberNames \n
            Course Number: $CourseNumber \n
            Number Of Members: $NumberOfMembers \n
            Demo: $Demo \n
            Power: $Power \n
            NDA: $NDA \n
            Video Link: $VideoLink \n
            \n
            
            Remember: if you need to edit information submitted in this form, please email: showcasewebsite@asu.edu with - \n
            1. The name of your project (exactly as listed above) 
            2. The name of the information you wish to edit (Example: Team Member Names) 
            3. The new information";
            
            $headers = "From: showcase@showcase.asucapstone.com";

            //might need a failsafe for if the email is weird or innacurate
            mail($Email, 'Thank you for submitting your capstone survey information', $message, $headers);

            return view("/surveySuccess");
        }else{
            return back()->with("fail","Something went wrong - data have NOT been inserted");
        }
    }

    private function getYouTubeEmbedLink($watchLink)
    {
        //$youtubeLinkLong = "";
        //$videoId = "";

        //if(str_contains($watchLink,".be")){
            //$youtubeLinkLong = 
            //$youtubeLinkLong = explode("/", $watchLink);
            //
            //$youtubeLink = "https://www.youtube.com/watch?v=" . $youtubeLinkExt;
            //$videoId = $this->getYouTubeVideoId($youtubeLink);
        //}else{
        //    $videoId = $this->getYouTubeVideoId($watchLink);
        //}

        $youtubeLinkLong = explode("/", $watchLink);
        $youtubeLinkExt= $youtubeLinkLong[3];

        if(str_contains($youtubeLinkExt, "watch")){
            $youtubeLinkExt = explode("=", $youtubeLinkExt)[1];
        }
        
        return 'https://www.youtube.com/embed/' . $youtubeLinkExt;
    }

    private function getYouTubeVideoId($watchLink)
    {
        $query = parse_url($watchLink, PHP_URL_QUERY);
        parse_str($query, $params);
        return isset($params['v']) ? $params['v'] : null;
    }

    public function surveyIndex(){
        //$projectNames = DB::table('teams_and_teams_ids___sheet1')->pluck('Teams')->map(function($item,$key) {
        //    return($key + 1) . ' - ' . $item;
        //});

        $projectNames = DB::table('teams_and_teams_ids___sheet1')->get();


        

        foreach($projectNames as $projectName){
            $projectName->Teams = $projectName->{'Team ID'} . " " . $projectName->Teams;
        }

        $data = array(
            'projectNames' => $projectNames
        );

        return view("/survey", $data);
    }

    public function showcaseSort($a, $b){
        info($a);
        return 0;
        /*if($a < $b){
            return -1;
        }else if($a > $b){
            return 1;
        }else{
            return 0;
        }*/
    }

    public function showcaseIndex(){

        $data = array(
            'list' => DB::table("ShowcaseEntries")->where("ShouldDisplay", "=", "YES")->get()->toArray()
        );

        //sort list currently by alphanumeric order
        usort($data['list'], function($a, $b){
            return strcmp($a->ProjectTitle, $b->ProjectTitle);
        });

        return view("CSE-Showcase", $data);
    }

    

    public function adminIndex(){
        return view("admin");
    }

    public function getPass(Request $request){
        $data = array(
            'list' => DB::table("admin_pass_hash")->get()
        );
        
        foreach( $data['list'] as $key ){
            if(Hash::check($request->input('pass'), $key->pass_hash)){
                info("Admin Successfuly Logged In");
                Session::put("isAuth", 1);
                return redirect("/adminAuth"); // THIS SETUP IS BAD - TODO: Session IDs/cookies/setup the whole user situation
                //It'll use the "Auth" Facade, so if you're seeing this and want to do it (depends on how secure they
                //want this info to be), look that up
            }
        }
        //sample comment
        info("COULD NOT VERIFY ADMINISTRATION LOGIN");
        return back()->withErrors(['message' => 'Incorrect Password']);
    }

    public function adminAuthIndex(){
        if(Session::has("isAuth")){
            return view("adminAuth");
        }
        else{
            return redirect('admin')->with("error","Incorrect Password");
        }
    }

    public function adminDownload(){

        $csvFileName = 'CSE-Showcase-Data.csv';

        $headers = [
            'Content-type' => 'text/csv',
            'Content-Disposition' => 'attatchment; filename="' . $csvFileName . '"',
        ];

        $callback = function() {
            $newdata = array(
                'list' => DB::table("ShowcaseEntries")->get()
            );
    
            
    
            $handle = fopen('php://output','w');
            
            $columnNames = array_map(
                function($col){ 
                    return $col->Field; 
                }, 
                DB::select('SHOW FULL COLUMNS FROM ShowcaseEntries')
            );
    
            fputcsv($handle, $columnNames);
    
            foreach($newdata['list'] as $listing){
                $row = [];
                foreach($listing as $key => $value){
                    array_push($row, $value);
                }
    
                fputcsv($handle, $row);
            }
    
            fclose($handle);
        };
        
        Session::forget('isAuth');

        return response()->stream($callback, 200, $headers);
    }
}