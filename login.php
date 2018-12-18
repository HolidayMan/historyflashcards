<?php
	require("includes/db.php");
	date_default_timezone_set("Europe/Kiev");
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<title>Вхід у систему</title>

	<!-- Bootstrap core CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

	<!-- Custom styles for this template -->
	<link href="css/login.css" rel="stylesheet">
	
	<?php
	    include "includes/favicon.php";
	?>
</head>

<body class="text-center">
	<form class="form-signin" action="login.php" method="POST">
		<h1 class="h3 mb-3 font-weight-normal">Вхід у систему</h1>
		<?php
		$data = $_POST;
		if (isset($data['do_login'])){
			$errors = array();
			$user = R::findOne('users', "login = ?", array($data['login']));
			if( $user ){
				if(password_verify($data['password'], $user->password)){
					$_SESSION['logged_user'] = $user;
					?>
                    <script type="text/javascript">
                    window.location = "index.php";
                    </script>      
                    <?php
				} else{
					$errors[] = 'Невірний пароль.';	
				}
			}
			else{
				$errors[] = 'Користувач з таким паролем не знайдений.';
			}
			if(!empty($errors)){
				echo '<div style="color: red;">'.array_shift($errors).'</div><hr/>';
			}
		}
		?>
		<label for="inputLogin" class="sr-only">Логін</label>
		<input type="text" name="login" value="<?php echo @$data['login']?>" id="inputLogin" class="form-control" placeholder="Логін"  minlength="6" maxlength="14" required autofocus>
		<label for="inputPassword" class="sr-only">Пароль</label>
		<input type="password" name="password" value="<?php echo @$data['password']?>" id="inputPassword" class="form-control" placeholder="Пароль"  minlength="8" maxlength="16" required>
		<div class="checkbox mb-3">
		</div>
		<button class="btn btn-lg btn-info btn-block" type="submit" name="do_login">Війти</button>
		<p class="mt-5 mb-3 text-muted">&copy; 2017 - <?php echo date('Y')?> PINKER:tone</p>
	</form>
</body>
</html>