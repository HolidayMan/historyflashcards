<?php
	require("includes/db.php");
	date_default_timezone_set("Europe/Kiev");
	if (isset($_POST['next_card'])){
	
	}
?>
<!doctype html>
<html lang="uk">

<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="theme-color" content="#322727">

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

	<link rel="stylesheet" href="css/style.css">
	<link rel="icon" href="img/favicon.ico" type="image/x-icon">

	<?php
	    include "includes/favicon.php";
	?>

	<title>Картки</title>
</head>

<body>

	<nav class="navbar navbar-expand-lg navbar-dark bg-brown">
		<a class="navbar-brand" href="https://umbrien.github.io/history_flashcards">Картки</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a class="nav-link" href="#first-container">Головна <span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#form-container">Створення карток</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#tableDiv">Таблиця</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#themesModal" data-toggle="modal" data-target="#themesModal">Відсортувати за темою</a>
				</li>
			</ul>
			<?php if(isset($_SESSION['logged_user'])) :?>
				<span class="navbar-text">Авторизован як <?php echo $_SESSION['logged_user']->login?></span>
				<a href="logout.php"><button class="btn btn-nav-indent btn-danger my-2 my-sm-0">Вийти</button></a>
				<?php else: ?>
					<a href="login.php"><button class="btn btn-nav-indent btn-success my-2 my-sm-0">Увійти</button></a>
					<a href="sign_up.php"><button class="btn btn-nav-indent btn-outline-success my-2 my-sm-0">Зареєструватися</button></a>
			<?php endif; ?>
			<button class="btn btn-nav-indent btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#infoModal">?</button>
		</div>
	</nav>


	<div id="first-container" class="container">
		<div class="row">
			<div class="col-sm">
				<h1 id="h1-title" onclick="changeH1TitleDescriptionDisplay()"></h1>
				<h5 id="h1-title-description">Тут можна вивчати різні дати з Історії.</h5>
			</div>
		</div>
	</div>

	<div class="container" id="card-container">
		<div class="row" id="card-row">
			<div class="card">
				<div class="front">
					<div class="card-body">
						<h5 id="frontCardTheme" class="card-title"></h5>
						<h5 id="frontCardNumber" class="card-title card-title-number"></h5>
						<p id="frontCardText" class="card-text text-center">Натисніть "Наступна" для початку гри</p>
					</div>
				</div>
				<div class="back">
					<div class="card-body">
						<h5 id="backCardTheme" class="card-title"></h5>
						<h5 id="backCardNumber" class="card-title card-title-number"></h5>
						<p id="backCardDate" class="card-text text-center">Натисніть "Наступна"</p>
						<div class="card-footer text-center" id="cardCipherDiv" data-toggle="modal" data-target="#changeCardCipherModal"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="row button-row">
			<div class="col-sm">
				<button type="button" id="removeCardButton" class="btn btn-success btn-lg" onclick="removeCard()" disabled>Запам'ятав</button>
			</div>
			<div class="col-sm">
				<button type="button" id="nextCardButton" class="btn btn-info btn-lg" onclick="nextCard()">Наступна</button>
			</div>
		</div>
	</div>


	<div id="form-container" class="container container-margin-bottom">
		<div class="row text-center bigHeaderDiv">
			<h1 class="bigHeader">Заповнення власних карток</h1>
		</div>
		<div class="row">
			<div class="col-12 col-sm-8 col-lg-6">
				<input type="text" class="form-control" id="inputCardTheme" placeholder="Тема картки">
			</div>
			<div class="col-12 col-sm-4 col-lg-3">
				<input type="number" class="form-control" id="inputCardNumber" placeholder="Номер">
			</div>
			<div class="col-12 col-lg-3">
				<input type="text" class="form-control" id="inputCardDate" placeholder="Дата">
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<input type="text" class="form-control form-control-lg" id="inputCardEvent" placeholder="Подія">
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<button type="button" class="btn btn-warning btn-lg" onclick="addCardFromForm()">Додати картку</button>
			</div>
			<div class="col-sm-6">
				<button type="button" class="btn btn-danger btn-lg" data-toggle="modal" data-target="#deleteAllCardsModal">Прибрати усі</button>
			</div>
		</div>
	</div>



	<div id="tableDiv" class="container container-margin-bottom">
		<div class="row text-center bigHeaderDiv">
			<h1 class="bigHeader">Таблиця з шифром</h1>
		</div>
		<table class="table table-responsive-sm table-dark">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Код кольору</th>
					<th scope="col">Прикметник</th>
					<th scope="col">Суб'єкт</th>
					<th scope="col">Дія</th>
					<th scope="col">Об'єкт</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row" class="bgRainbowRed">0</th>
					<td>Чарівна</td>
					<td class="bgRainbowRed">Червоний</td>
					<td>Чаклун</td>
					<td>Чекає</td>
					<td>Човен</td>
				</tr>
				<tr>
					<th scope="row" class="bgRainbowOrange">1</th>
					<td>Пташка</td>
					<td class="bgRainbowOrange">Помаранчевий</td>
					<td>Папуга</td>
					<td>Перебирає</td>
					<td>Просо</td>
				</tr>
				<tr>
					<th scope="row" class="bgRainbowYellow">2</th>
					<td>Життя</td>
					<td class="bgRainbowYellow">Жовтий</td>
					<td>Жан</td>
					<td>Жує</td>
					<td>Жупан</td>
				</tr>
				<tr>
					<th scope="row" class="bgRainbowGreen">3</th>
					<td>Звеселяє</td>
					<td class="bgRainbowGreen">Зелений</td>
					<td>Змій</td>
					<td>Зварив</td>
					<td>Зілля</td>
				</tr>
				<tr>
					<th scope="row" class="bgRainbowBlue">4</th>
					<td>бо</td>
					<td class="bgRainbowBlue">Блакитний</td>
					<td>Баран</td>
					<td>б'є в</td>
					<td>Барабан</td>
				</tr>
				<tr>
					<th scope="row" class="bgRainbowDarkBlue">5</th>
					<td>Співає</td>
					<td class="bgRainbowDarkBlue">Синій</td>
					<td>Султан</td>
					<td>Сушить</td>
					<td>Сарафан</td>
				</tr>
				<tr>
					<th scope="row" class="bgRainbowPurple">6</th>
					<td>Файно</td>
					<td class="bgRainbowPurple">Філолетова</td>
					<td>Фея</td>
					<td>Фарширує</td>
					<td>Форель</td>
				</tr>
				<tr>
					<th scope="row" class="bgRainbowCherry">7</th>
					<td>Всім</td>
					<td class="bgRainbowCherry">Вишневі</td>
					<td>Верблюд</td>
					<td>Взуває</td>
					<td>Валянки</td>
				</tr>
				<tr>
					<th scope="row" class="bgRainbowSmoky">8</th>
					<td>Добрим</td>
					<td class="bgRainbowSmoky">Димчастого</td>
					<td>Дога</td>
					<td>Дражнить</td>
					<td>Дуремар</td>
				</tr>
				<tr>
					<th scope="row" class="bgRainbowViolet">9</th>
					<td>Людям</td>
					<td class="bgRainbowViolet">Ліловий</td>
					<td>Лілінгут</td>
					<td>Лиже</td>
					<td>Льодяник</td>
				</tr>
			</tbody>
		</table>
	</div>


	<!-- Modal -->

	<div class="modal" id="changeCardCipherModal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Додавання шифру</h5>
					<div class="dropdown dropright">
						<button class="btn btn-warning btn-sm dropdown-toggle" type="button" id="modalTableDropdownButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Схема кодування</button>
						<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
							<a class="dropdown-item" href="#">Схема 1</a>
							<a class="dropdown-item" href="#">Схема 2</a>
							<a class="dropdown-item" href="#">Схема 3</a>
						</div>
					</div>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<h4 id="changeCardCipherModalDate"></h4>
					<input type="text" class="form-control" id="cipherInput" placeholder="Ваш шифр">
					<div class="row">
						<div class="col-sm-6">
							<button type="button" class="btn btn-success btn-block btn-margin-top-bottom" data-dismiss="modal" onclick="addCipherToYourself()">Додати шифр собі</button>
						</div>
						<div class="col-sm-6">
							<button type="button" class="btn btn-info btn-block btn-margin-top-bottom" data-dismiss="modal" disabled>також запропонувати</button>
						</div>
					</div>
					<table class="table table-responsive-lg">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Код кольору</th>
								<th scope="col">Прикметник</th>
								<th scope="col">Суб'єкт</th>
								<th scope="col">Дія</th>
								<th scope="col">Об'єкт</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row" class="bgRainbowRed color-white">0</th>
								<td>Чарівна</td>
								<td class="bgRainbowRed color-white">Червоний</td>
								<td>Чаклун</td>
								<td>Чекає</td>
								<td>Човен</td>
							</tr>
							<tr>
								<th scope="row" class="bgRainbowOrange">1</th>
								<td>Пташка</td>
								<td class="bgRainbowOrange">Помаранчевий</td>
								<td>Папуга</td>
								<td>Перебирає</td>
								<td>Просо</td>
							</tr>
							<tr>
								<th scope="row" class="bgRainbowYellow">2</th>
								<td>Життя</td>
								<td class="bgRainbowYellow">Жовтий</td>
								<td>Жан</td>
								<td>Жує</td>
								<td>Жупан</td>
							</tr>
							<tr>
								<th scope="row" class="bgRainbowGreen">3</th>
								<td>Звеселяє</td>
								<td class="bgRainbowGreen">Зелений</td>
								<td>Змій</td>
								<td>Зварив</td>
								<td>Зілля</td>
							</tr>
							<tr>
								<th scope="row" class="bgRainbowBlue">4</th>
								<td>бо</td>
								<td class="bgRainbowBlue">Блакитний</td>
								<td>Баран</td>
								<td>б'є в</td>
								<td>Барабан</td>
							</tr>
							<tr>
								<th scope="row" class="bgRainbowDarkBlue color-white">5</th>
								<td>Співає</td>
								<td class="bgRainbowDarkBlue color-white">Синій</td>
								<td>Султан</td>
								<td>Сушить</td>
								<td>Сарафан</td>
							</tr>
							<tr>
								<th scope="row" class="bgRainbowPurple color-white">6</th>
								<td>Файно</td>
								<td class="bgRainbowPurple color-white">Філолетова</td>
								<td>Фея</td>
								<td>Фарширує</td>
								<td>Форель</td>
							</tr>
							<tr>
								<th scope="row" class="bgRainbowCherry color-white">7</th>
								<td>Всім</td>
								<td class="bgRainbowCherry color-white">Вишневі</td>
								<td>Верблюд</td>
								<td>Взуває</td>
								<td>Валянки</td>
							</tr>
							<tr>
								<th scope="row" class="bgRainbowSmoky color-white">8</th>
								<td>Добрим</td>
								<td class="bgRainbowSmoky color-white">Димчастого</td>
								<td>Дога</td>
								<td>Дражнить</td>
								<td>Дуремар</td>
							</tr>
							<tr>
								<th scope="row" class="bgRainbowViolet color-white">9</th>
								<td>Людям</td>
								<td class="bgRainbowViolet color-white">Ліловий</td>
								<td>Лілінгут</td>
								<td>Лиже</td>
								<td>Льодяник</td>
							</tr>
						</tbody>
					</table>
					<h4 class="m-top-3 text-center">Користувацькі шифри</h4>
					<div class="community-cipher-wrapper">
						<div class="list-group">
							<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
								<div class="d-flex w-100 justify-content-between">
									<small class="text-muted">Стів Джобс</small>
									<small>3 дні назад</small>
								</div>
								<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
							</a>
							<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
								<div class="d-flex w-100 justify-content-between">
									<small class="text-muted">Білл Гейтс</small>
									<small class="text-muted">7 днів назад</small>
								</div>
								<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
							</a>
							<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
								<div class="d-flex w-100 justify-content-between">
									<small class="text-muted">Лінус Торвальдс</small>
									<small class="text-muted">2 роки назад</small>
								</div>
								<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
							</a>
							<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
								<div class="d-flex w-100 justify-content-between">
									<small class="text-muted">Стів Джобс</small>
									<small>3 дні назад</small>
								</div>
								<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
							</a>
							<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
								<div class="d-flex w-100 justify-content-between">
									<small class="text-muted">Білл Гейтс</small>
									<small class="text-muted">7 днів назад</small>
								</div>
								<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
							</a>
							<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
								<div class="d-flex w-100 justify-content-between">
									<small class="text-muted">Лінус Торвальдс</small>
									<small class="text-muted">2 роки назад</small>
								</div>
								<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
							</a>
							<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
								<div class="d-flex w-100 justify-content-between">
									<small class="text-muted">Стів Джобс</small>
									<small>3 дні назад</small>
								</div>
								<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
							</a>
							<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
								<div class="d-flex w-100 justify-content-between">
									<small class="text-muted">Білл Гейтс</small>
									<small class="text-muted">7 днів назад</small>
								</div>
								<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
							</a>
							<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
								<div class="d-flex w-100 justify-content-between">
									<small class="text-muted">Лінус Торвальдс</small>
									<small class="text-muted">2 роки назад</small>
								</div>
								<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
							</a>
							<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
								<div class="d-flex w-100 justify-content-between">
									<small class="text-muted">Стів Джобс</small>
									<small>3 дні назад</small>
								</div>
								<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
							</a>
						</div>	
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="themesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Теми</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<p>Тут можна зробити щоб у колоді залишились лише картки за однією темою.</p>
					<button type="button" data-dismiss="modal" class="btn btn-outline-danger btn-block btn-margin-top-bottom" onclick="addToQueueAllCards()">Усі картки</button>
					<ul id="modalThemeList"></ul>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="deleteAllCardsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Видалити картки</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<p>Ви дійсно бажаєте видалити усі картки? Скасувати цю дію буде неможливо.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Скасувати</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal" onclick="removeAllCards()">Видалити</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Додаткова інформація</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<h5>Над проектом працювали:</h5>
					<br>
					<ul>
						<h5>Прогамування: </h5>
						<ul>
							<li>Олексій Пітенко</li>
							<li>Сергій Калугін</li>
						</ul>
						<br>
						<h5>Наповняли картки: </h5>
						<ul>
							<li>Ольга Жулінська</li>
							<li>Нікіта Галайко</li>
						</ul>
					</ul>
					<br>
					<h5>Справка користувача: </h5>
					<p>Треба нажати на карточку щоби вона обернулась, також можна створювати власні картки.</p>
				</div>
			</div>
		</div>
	</div>

	<footer class="footer">
      <div class="container text-center">
        <p class="mt-5 mb-3 text-muted">&copy; 2017 - 2018 PINKER:tone</p>
      </div>
    </footer>



	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

	<script src="js/anime.min.js"></script>
	<script src="js/animate.js"></script>
	<script src="js/cards.js"></script>
</body>
</html>