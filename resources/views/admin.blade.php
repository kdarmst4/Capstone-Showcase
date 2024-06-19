<head>

<link rel="stylesheet" href="<?php echo asset('/css/admin.css')?>" type="text/css">


</head>

<body>

<div class="password-form-wrapper">
    <form action="getPass">
        <label>Password: </label>
        <input type="password" name="pass"></input>
        <button>Submit</button>
        @if($errors->any())
            <br/><span>@error('message'){{ $message }}@enderror</span>
        @endif
    </form>

</div>

</body>