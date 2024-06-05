<head>
    <link rel="stylesheet" href="<?php echo asset('/css/survey.css')?>" type="text/css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo asset('/css/header.css')?>" type="text/css">
    <link rel="stylesheet" href="<?php echo asset('/css/footer.css')?>" type="text/css">

    <style>
        .survey-input{
            width: 100%;
            height: 50px;
        }
    </style>
</head>


<body>
    <!-- HEADER !-->
    @include("header")
    <!-- END HEADER !-->

    <!-- SURVEY COMPONENT !-->
    
    
    <!--<div><?php 
    
    //if(DB::connection()->getPdo()){
    //    echo 'Successfully connected to Database with name: '.DB::connection()->getDatabaseName().'';
    //} debug - uncomment when unsure if connecting to database properly

    ?></div>!-->

    <form action="add" method="post">

        @csrf
        <div class="survey-wrapper">
            <div class="survey-wrapper-content">
            <!--survey questions !-->
                <div class="survey-header info-wrapper">
                    <h1 class="survey-header-title">Capstone Showcase Information Form: </h1>
                    <p class="survey-header-description">Read all questions and descriptions carefully. If you encounter issues with this form that prohibit you from submitting accurate information, email showcasewebsite@asu.edu with a detailed description of the problem.</p>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">ASU Email: </p>
                    <p class="survey-description">ASU Email of the person filling out the form (no other team emails)</p>
                    <input type="text" class="survey-input survey-input-short" placeholder="Your answer: " name="Email" value="{{old('Email')}}"></input>
                    <br/><span>@error('Email'){{ $message }}@enderror</span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Your Name: </p>
                    <p class="survey-description">Name of the person filling out the form (no other team names)</p>
                    <p class="survey-description">Note: Upon submitting this form, you will be the primary source of contact for your team during/before the presentation and will be responsible for picking up your poster.</p>
                    <input type="text" class="survey-input survey-input-short" placeholder="Your answer: " name="Name" value="{{old('Name')}}"></input>
                    <br/><span>@error('Name'){{ $message }}@enderror</span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Project Title: </p>
                    <p class="survey-description">Please select the project title</p>
                    <select class="survey-input" name="ProjectTitle">
                    <option value ="" selected disabled hidden>&lt;Select your team&gt;</option>
                        @foreach ($projectNames as $projectName)
                            <option value="{{ $projectName->Teams }}" @if(old('ProjectTitle') == $projectName->Teams) selected @endif>{{ $projectName->Teams }}</option>
                        @endforeach
                    </select>
                    <br/><span>@error('ProjectTitle'){{ $message }}@enderror</span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Project Description (3 sentences or less): </p>
                    <p class="survey-description">This is the text that will accompany your video thumbnail on the main webpage</p>
                    <input type="text" class="survey-input survey-input-long" placeholder="Your answer: " name="ProjectDescription" value="{{old('ProjectDescription')}}"></input>
                    <br/><span>@error('ProjectDescription'){{ $message }}@enderror</span>
                </div>
                
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Sponsor/Mentor: </p>
                    <p class="survey-description">If your team had a sponsor or mentor for your project, please list the organization or the individual. If you didn't have a sponsor, enter "NONE"</p>
                    <input type="text" class="survey-input survey-input-short" placeholder="Your answer: " name="Sponsor" value="{{old('Sponsor')}}"></input>
                    <br/><span>@error('Sponsor'){{ $message }}@enderror</span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Number of Team Members: </p>
                    <p class="survey-description"></p>
                    <input type="text" class="survey-input survey-input-long" placeholder="Your answer: " name="NumberOfMembers" value="{{old('NumberOfMembers')}}"></input>
                    <br/><span>@error('NumberOfMembers'){{ $message }}@enderror</span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Team Members Full Names: </p>
                    <p class="survey-description">Please type out all team members full names (including you), separated by a comas</p>
                    <input type="text" class="survey-input survey-input-long" placeholder="Your answer: " name="MemberNames" value="{{old('MemberNames')}}"></input>
                    <br/><span>@error('MemberNames'){{ $message }}@enderror</span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Course Number (Example: CSE486):</p>
                    <p class="survey-description">If your team has students from diverse majors (e.g., CSE486 and CSE424) please add the numbers separated by a comma</p>
                    <input type="text" class="survey-input survey-input-short" placeholder="Your answer: " name="CourseNumber" value="{{old('CourseNumber')}}"></input>
                    <br/><span>@error('CourseNumber'){{ $message }}@enderror</span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Will your group be bringing a demo in addition to your poster?</p>
                    <p class="survey-description"></p>
                    <ul>
                        <li><input type="radio" name="Demo" class="survey-input-checkbox" value="Yes">Yes</input></li>
                        <li><input type="radio" name="Demo" class="survey-input-checkbox" value="No">No</input></li>
                    </ul>
                    <br/><span>@error('Demo'){{ $message }}@enderror</span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">If so, will your group need power for your demo? </p>
                    <p class="survey-description">If you answered no to the previous question, select no here as well</p>
                    <ul>
                        <li><input type="radio" name="Power" class="survey-input-checkbox" value="Yes">Yes</input></li>
                        <li><input type="radio" name="Power" class="survey-input-checkbox" value="No">No</input></li>
                    </ul>
                    <br/><span>@error('Power'){{ $message }}@enderror</span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Did your group sign an NDA or IP?</p>
                    <p class="survey-description">If yes, your project information will potentially not be displayed in the showcase event/website - please reach out to your instructor for next steps</p>
                    <ul>
                        <li><input type="radio" name="NDA" class="survey-input-checkbox" value="Yes">Yes</input></li>
                        <li><input type="radio" name="NDA" class="survey-input-checkbox" value="No">No</input></li>
                    </ul>
                    <br/><span>@error('NDA'){{ $message }}@enderror</span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">YouTube Video Link: </p>
                    <p class="survey-description">This is the YouTube link for the video overview of your project, and should have the graphic abstract you created as the thumbnail. The project name should be the title of the YouTube video.</p>
                    <p class="survey-description">Note - the link that goes here is exactly what appears in your url bar at the top of your browser. Do not submit the embedded or any other link.</p>
                    <input type="text" class="survey-input survey-input-long" placeholder="Your answer: " name="VideoLink" value="{{old('VideoLink')}}"></input>
                    <br/><span>@error('VideoLink'){{ $message }}@enderror</span>
                </div>

                <div class="survey-submit">
                    <button id="button-submit">Submit</button>
                </div>
                <!--John Sucks!-->
            </div>
        </div>
    </form>

    <!-- END SURVEY COMPONENT !-->

    <!--FOOTER!-->
    @include("footer")
    <!-- END FOOTER !-->

</body>