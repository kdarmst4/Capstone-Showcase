<head>

<link rel="stylesheet" href="<?php echo asset('/css/admin.css')?>" type="text/css">


</head>

<body>

<div class="password-form-wrapper">
    <form action="getPass">
        <label>Password: </label>
        <input type="password" name="pass"></input>
        <button>Submit</button>
        <?php if($errors->any()): ?>
            <br/><span><?php $__errorArgs = ['message'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
        <?php endif; ?>
    </form>

</div>

</body><?php /**PATH /home3/jmtlqnmy/showcase.asucapstone.com/CapstoneWebsite/resources/views/admin.blade.php ENDPATH**/ ?>