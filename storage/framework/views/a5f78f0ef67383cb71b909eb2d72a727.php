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
    <?php echo $__env->make("header", \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <!-- END HEADER !-->

    <!-- SURVEY COMPONENT !-->
    
    
    <!--<div><?php 
    
    //if(DB::connection()->getPdo()){
    //    echo 'Successfully connected to Database with name: '.DB::connection()->getDatabaseName().'';
    //} debug - uncomment when unsure if connecting to database properly

    ?></div>!-->

    <form action="add" method="post">

        <?php echo csrf_field(); ?>
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
                    <input type="text" class="survey-input survey-input-short" placeholder="Your answer: " name="Email" value="<?php echo e(old('Email')); ?>"></input>
                    <br/><span><?php $__errorArgs = ['Email'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Your Name: </p>
                    <p class="survey-description">Name of the person filling out the form (no other team names)</p>
                    <p class="survey-description">Note: Upon submitting this form, you will be the primary source of contact for your team during/before the presentation and will be responsible for picking up your poster.</p>
                    <input type="text" class="survey-input survey-input-short" placeholder="Your answer: " name="Name" value="<?php echo e(old('Name')); ?>"></input>
                    <br/><span><?php $__errorArgs = ['Name'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Project Title: </p>
                    <p class="survey-description">Please select the project title</p>
                    <select class="survey-input" name="ProjectTitle">
                    <option value ="" selected disabled hidden>&lt;Select your team&gt;</option>
                        <?php $__currentLoopData = $projectNames; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $projectName): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <option value="<?php echo e($projectName->Teams); ?>" <?php if(old('ProjectTitle') == $projectName->Teams): ?> selected <?php endif; ?>><?php echo e($projectName->Teams); ?></option>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </select>
                    <br/><span><?php $__errorArgs = ['ProjectTitle'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Project Description (3 sentences or less): </p>
                    <p class="survey-description">This is the text that will accompany your video thumbnail on the main webpage</p>
                    <input type="text" class="survey-input survey-input-long" placeholder="Your answer: " name="ProjectDescription" value="<?php echo e(old('ProjectDescription')); ?>"></input>
                    <br/><span><?php $__errorArgs = ['ProjectDescription'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
                </div>
                
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Sponsor/Mentor: </p>
                    <p class="survey-description">If your team had a sponsor or mentor for your project, please list the organization or the individual. If you didn't have a sponsor, enter "NONE"</p>
                    <input type="text" class="survey-input survey-input-short" placeholder="Your answer: " name="Sponsor" value="<?php echo e(old('Sponsor')); ?>"></input>
                    <br/><span><?php $__errorArgs = ['Sponsor'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Number of Team Members: </p>
                    <p class="survey-description"></p>
                    <input type="text" class="survey-input survey-input-long" placeholder="Your answer: " name="NumberOfMembers" value="<?php echo e(old('NumberOfMembers')); ?>"></input>
                    <br/><span><?php $__errorArgs = ['NumberOfMembers'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Team Members Full Names: </p>
                    <p class="survey-description">Please type out all team members full names (including you), separated by a comas</p>
                    <input type="text" class="survey-input survey-input-long" placeholder="Your answer: " name="MemberNames" value="<?php echo e(old('MemberNames')); ?>"></input>
                    <br/><span><?php $__errorArgs = ['MemberNames'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Course Number (Example: CSE486):</p>
                    <p class="survey-description">If your team has students from diverse majors (e.g., CSE486 and CSE424) please add the numbers separated by a comma</p>
                    <input type="text" class="survey-input survey-input-short" placeholder="Your answer: " name="CourseNumber" value="<?php echo e(old('CourseNumber')); ?>"></input>
                    <br/><span><?php $__errorArgs = ['CourseNumber'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Will your group be bringing a demo in addition to your poster?</p>
                    <p class="survey-description"></p>
                    <ul>
                        <li><input type="radio" name="Demo" class="survey-input-checkbox" value="Yes">Yes</input></li>
                        <li><input type="radio" name="Demo" class="survey-input-checkbox" value="No">No</input></li>
                    </ul>
                    <br/><span><?php $__errorArgs = ['Demo'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">If so, will your group need power for your demo? </p>
                    <p class="survey-description">If you answered no to the previous question, select no here as well</p>
                    <ul>
                        <li><input type="radio" name="Power" class="survey-input-checkbox" value="Yes">Yes</input></li>
                        <li><input type="radio" name="Power" class="survey-input-checkbox" value="No">No</input></li>
                    </ul>
                    <br/><span><?php $__errorArgs = ['Power'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">Did your group sign an NDA or IP?</p>
                    <p class="survey-description">If yes, your project information will potentially not be displayed in the showcase event/website - please reach out to your instructor for next steps</p>
                    <ul>
                        <li><input type="radio" name="NDA" class="survey-input-checkbox" value="Yes">Yes</input></li>
                        <li><input type="radio" name="NDA" class="survey-input-checkbox" value="No">No</input></li>
                    </ul>
                    <br/><span><?php $__errorArgs = ['NDA'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
                </div>
                <div class="survey-question info-wrapper">
                    <p class="survey-label">YouTube Video Link: </p>
                    <p class="survey-description">This is the YouTube link for the video overview of your project, and should have the graphic abstract you created as the thumbnail. The project name should be the title of the YouTube video.</p>
                    <p class="survey-description">Note - the link that goes here is exactly what appears in your url bar at the top of your browser. Do not submit the embedded or any other link.</p>
                    <input type="text" class="survey-input survey-input-long" placeholder="Your answer: " name="VideoLink" value="<?php echo e(old('VideoLink')); ?>"></input>
                    <br/><span><?php $__errorArgs = ['VideoLink'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
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
    <?php echo $__env->make("footer", \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <!-- END FOOTER !-->

</body><?php /**PATH /home3/jmtlqnmy/showcase.asucapstone.com/CapstoneWebsite/resources/views//survey.blade.php ENDPATH**/ ?>