<?php
	require("includes/db.php");
	date_default_timezone_set("Europe/Kiev");
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<title>Реєстрація в системі</title>

	<!-- Bootstrap core CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

	<!-- Custom styles for this template -->
	<link href="css/signup.css" rel="stylesheet">
	
	<?php
	    include "includes/favicon.php";
	?>
</head>

<body class="text-center">
	<form class="form-signin" action="sign_up.php" method="POST">
		<h1 class="h3 mb-3 font-weight-normal">Реєстрація</h1>
	<?php
		$data = $_POST;
	if(isset($data['do_singup'])){
		$errors = array();
		if(trim($data['login']) == ''){
			$errors[] = 'Введіть логін.';
		}
		$find_login = R::findOne('users', "login = ?", array($data['login']));
		if( $find_login ){
			$errors[] = 'Користувач із таким логіном вже існує.';
			}
		if(trim($data['email']) == ''){
			$errors[] = 'Введіть email.';
		}
		if(R::count('users', "email = ?", array($data['email'])) > 0){
			$errors[] = 'Користувач із таким Email вже існує.';
		}
		if($data['password'] == ''){
			$errors[] = 'Введіть пароль.';
		}
		if($data['password_2'] != $data['password']){
			$errors[] = 'Паролі не співпадають.';
		}
		if(empty($errors)){
			$user = R::dispense('users');
			$user->login = $data['login'];
			$user->email = $data['email'];
			$user->password = password_hash($data['password'], PASSWORD_DEFAULT);
			R::store($user);
			$_SESSION['logged_user'] = $user;
			?>
            <script type="text/javascript">
            window.location = "index.php";
            </script>      
            <?php
		}
		else{
			echo '<div style="color: red;">'.array_shift($errors).'</div><hr/>';
		}
	}
?>
		<label for="inputLogin" class="sr-only">Логін</label>
		<input type="text" id="inputLogin" class="form-control" placeholder="Логін"  minlength="6" maxlength="14"  name="login" value="<?php echo @$data['login']?>" required autofocus>
		<label for="inputEmail" class="sr-only">Пошта</label>
		<input type="email" id="inputEmail" class="form-control" placeholder="Пошта" name="email" value="<?php echo @$data['email']?>" required>
		<label for="inputPassword" class="sr-only">Пароль</label>
		<input type="password" id="inputPassword" class="form-control" placeholder="Пароль"  minlength="8" maxlength="16" name="password" required>
		<label for="repeatPassword" class="sr-only">Підтвердити пароль</label>
		<input type="password" id="repeatPassword" class="form-control" placeholder="Підтвердити пароль"  minlength="8" maxlength="16" name="password_2" required>
		<button class="btn btn-lg btn-success btn-block" type="submit" name="do_singup">Зареєструватись</button>
		<p class="mt-5 mb-3 text-muted">&copy; 2017 - <?php echo date("Y") ?> PINKER:tone</p>
	</form>
</body>
</html>
