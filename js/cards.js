function changeH1TitleDescriptionDisplay() {
	let descriptionStyle = document.getElementById("h1-title-description").style.display;
	if (descriptionStyle == "none" || descriptionStyle == "") {
		document.getElementById("h1-title-description").style.display = "block"
	}
	else {
		document.getElementById("h1-title-description").style.display = "none"
	}
}

function changeCardsDisplay(isShown) {
	if (isShown) {
		document.getElementById("removeCardButton").style.display = "block";
		document.getElementById("nextCardButton").style.display = "block"
	} else {
		document.getElementById("removeCardButton").style.display = "none";
		document.getElementById("nextCardButton").style.display = "none"
	}
}

class Queue {
	constructor() {
		this.items = new Array()
	}

	isEmpty() {
		return this.items.length == 0
	}

	//добавляет в начало
	enqueue(item) {
		this.items.unshift(item)
	}

	//удаляет из конца и возращает
	dequeue() {
		return this.items.pop()
	}

	deleteFirst() {
		this.items.shift()
	}

	printQueue() {
		console.log(this.items)
	}
}

function cardMaker(theme, number, date, text, cipher) {
	this.theme = theme;
	this.number = number;
	this.date = date;
	this.text = text;
	this.cipher = cipher
}

function randomInteger(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand
}

function randomizeArr(list) {
	l = [];
	h = 0;
	iter = list.length;
	for (i = 0; i < iter; i++) {
		h = randomInteger(0, list.length - 1);
		l.push(list[h]);
		list.splice(h, 1)
	}
	return l
}

function nextCard() {
	document.getElementById("removeCardButton").removeAttribute("disabled");
	if (cardsQueue.isEmpty()) {
		document.getElementById("frontCardText").innerText = "Ви запам'ятали усі картки";
		document.getElementById("backCardDate").innerText = "Ви запам'ятали усі картки"
	}
	else if (cardsQueue.items.length == 1) changeCardsDisplay(0);
	document.getElementById("h1-title").innerText = "Карток залишилось: " + cardsQueue.items.length;
	lastItem = cardsQueue.dequeue();
	document.getElementById("frontCardTheme").innerText = lastItem.theme;
	document.getElementById("backCardTheme").innerText = lastItem.theme;
	document.getElementById("frontCardNumber").innerText = "№" + lastItem.number;
	document.getElementById("backCardNumber").innerText = "№" + lastItem.number;
	document.getElementById("frontCardText").innerText = lastItem.text;
	document.getElementById("backCardDate").innerText = lastItem.date;
	if(document.getElementById("cardCipherDiv").innerText == "undefined" || lastItem.cipher == undefined) {
		document.getElementById("cardCipherDiv").innerText = "Редагувати шифр"
	} else {
		document.getElementById("cardCipherDiv").innerText = lastItem.cipher;
	}
	cardsQueue.enqueue(lastItem);

	document.getElementById("changeCardCipherModalDate").innerText = lastItem.date
}

function addCipherToYourself() {
	lastItem.cipher = document.getElementById("cipherInput").value;
	document.getElementById("cardCipherDiv").innerText = lastItem.cipher;
}

function removeCard() {
	cardsQueue.deleteFirst();
	nextCard()
}

function removeAllCards() {
	cardsQueue.items = [];
	console.log(cardsQueue.items);
	document.getElementById("removeCardButton").setAttribute("disabled", "disabled");
	document.getElementById("nextCardButton").setAttribute("disabled", "disabled");
	document.getElementById("h1-title").innerText = "";
	document.getElementById("frontCardTheme").innerText = "";
	document.getElementById("backCardTheme").innerText = "";
	document.getElementById("frontCardNumber").innerText = "";
	document.getElementById("backCardNumber").innerText = "";
	document.getElementById("frontCardText").innerText = "Карток немає";
	document.getElementById("backCardDate").innerText = "Додайте карток у чергу нижче"
}

function addToQueueAllCards() {
	cardsQueue.items = [];
	for (var i = 0; i < cardsArray.length; i++) {
		cardsQueue.enqueue(cardsArray[i]);
	}
	nextCard();
	changeCardsDisplay(1)
}


function addCardFromForm() {

	cardsQueue.enqueue(new cardMaker(
		document.getElementById("inputCardTheme").value,
		document.getElementById("inputCardNumber").value,
		document.getElementById("inputCardDate").value,
		document.getElementById("inputCardEvent").value
		));

	cardsQueue.items = randomizeArr(cardsQueue.items);

	if(document.getElementById("frontCardText").innerText == "Карток немає" || document.getElementById("backCardDate").innerText == "Додайте карток у чергу нижче") {
		document.getElementById("frontCardText").innerText = 'Натисніть "Наступна" для початку гри';
		document.getElementById("backCardDate").innerText = 'Натисніть "Наступна"'
	}

	document.getElementById("removeCardButton").removeAttribute("disabled");
	document.getElementById("nextCardButton").removeAttribute("disabled");
	document.getElementById("h1-title").innerText = "Карток залишилось: " + cardsQueue.items.length;
	changeCardsDisplay(1)

}


cardsArray = [
new cardMaker(0, 1, "1 млн. років тому", "Поява найдавніших людей на території сучасної України."),
new cardMaker(0, 2, "1 млн – 11 тис. років тому", "Палеоліт або давній кам'яний вік."),
new cardMaker(0, 3, "Близько 40–35 тис. років тому", "Поява на території сучасної України лю­дини сучасного типу."),
new cardMaker(0, 4, "10–8 тис. років тому", "Мезоліт або середній кам'яний вік."),
new cardMaker(0, 5, "8–5 тис. років тому", "Неоліт або новий кам'яний вік."),
new cardMaker(0, 6, "Початок 4 – середина 3 тис. до н. е.", "Енеоліт або мідно-кам'яний вік."),
new cardMaker(0, 7, "2 тис. р. до н.е. – VIII ст. до н.е.", "Бронзовий вік."),
new cardMaker(0, 8, "VIII-IV ст. до н.е.", "Ранній залізний вік."),
new cardMaker(0, 9, "IX-VII ст. до н.е.", "Панування в північних степах України кімерійців."),
new cardMaker(0, 10, "VII-III ст. до н.е.", "Перебування на українських землях “скіфів”"),
new cardMaker(0, 11, "III ст. до н.е. – III ст. н.е.", "Проживання на півдні України сарматів."),
new cardMaker(0, 12, "І-ІІ ст.", "Перші згадки про слов'ян-венедів у писемних джерелах."),
new cardMaker(0, 13, "	III-IV ст.", "Перебування готів на українських землях."),
new cardMaker(0, 14, "V-VII ст.", "Велике слов'янське розселення."),
new cardMaker(1, 15, "Кінець VIII – початок IX ст.", "Утворення Київського князівства."),
new cardMaker(1, 16, "860 р.", "Перший похід русичів, очолюваних князем Аскольдом на Константинополь (Царгород)."),
new cardMaker(1, 17, "882 р.", "Убивство князя Аскольда та захоплення князівської влади в Києві Олегом. Виникнення держави Київська Русь."),
new cardMaker(1, 18, "907, 911р.", "Походи князя Олега на Царгород."),
new cardMaker(1, 19, "941, 944 р.", "Походи князя Ігоря на Візантію."),
new cardMaker(1, 20, "945 р.", " Повстання деревлян і вбивство князя Ігоря."),
new cardMaker(1, 21, "946 р.", "Посольство княгині Ольги до Царгорода."),
new cardMaker(1, 22, "968 р.", "Перший Балканський похід князя Святослава."),
new cardMaker(1, 23, "969–971 pp.", "Другий Балканський похід князя Святослава."),
new cardMaker(1, 24, "988 р.", "Початок запровадження князем Володимиром християнства як державної релігії Київської Русі"),
new cardMaker(1, 25, "1036 р.", "Розгром князем Ярославом Мудрим печенігів під Києвом."),
new cardMaker(1, 26, "1054 р.", "Перша згадка в літописі Києво-Печерського монастиря."),
new cardMaker(1, 27, "1054–1113 рр.", "Співправління трьох братів Ярославичів – Ізяслава, Святослава та Всеволода."),
new cardMaker(1, 28, "1068 р.", "Повстання в Києві проти Ярославичів."),
new cardMaker(1, 29, "1097 р.", "Любецький з'їзд князів."),
new cardMaker(1, 30, "1113р.", "Народне повстання в Києві."),
new cardMaker(1, 31, "1113 р.", 'Прийняття "Статуту" Володимира Мономаха.'),
new cardMaker(2, 32, "1152–1187 рр.", "Зміцнення Галицького князівства за правління Ярослава Осмомисла."),
new cardMaker(2, 33, "1169 р.", "Захоплення й розорення Києва об'єднаним військом 12 руських князів, очолюваним Андрієм Боголюбським."),
new cardMaker(2, 34, "1185 р.", 'Невдалий похід новгород-сіверського князя Ігоря Святославича проти половців, що став підґрунтям для поеми "Слово о полку Ігоревім".'),
new cardMaker(2, 35, "1187р.", 'Перша літописна згадка назви "Україна" стосовно земель Південної Київщини та Переяславщини.'),
new cardMaker(2, 36, "1199 р.", "Об'єднання волинським князем Романом Мстиславичем Галицької і Волинської земель."),
new cardMaker(2, 37, "1206–1238 pp.", "Утворення Галицько-Волинського князівства Період міжусобиць, боярських змов та іноземного втручання в галицько-волинські справи."),
new cardMaker(2, 38, "31 травня 1223 р.", "Битва на річці Калці."),
new cardMaker(2, 39, "1238 р.", "Утвердження князя Данила Романовича в Галичі. Розгром військом Данила Галицького рицарів-хрестоносців під Дорогочином."),
new cardMaker(2, 40, "1239 р.", "Спустошення монголами Переяславської й Чернігівської земель."),
new cardMaker(2, 41, "Кінець листопада – початок грудня 1240 р.", "Облога й захоплення Києва військами монгольського хана Батия."),
new cardMaker(2, 42, "Грудень 1240 р. – березень 1241 р.", "Спустошення монголами земель Київського та Галицько-Волинського князівств."),
new cardMaker(2, 43, "17 серпня 1245 р.", "Ярославська битва."),
new cardMaker(2, 44, "1253 р.", "Коронування Данила Галицького послами Папи Римського Інокентія IV."),
new cardMaker(2, 45, "1264 р.", "Смерть Данила Галицького."),
new cardMaker(2, 46, "1264–1301 pp.", "Князювання Лева Даниловича  (сина Данила Галицького) у Галицькій та Перемишльській землях."),
new cardMaker(2, 47, "1269–1288 pp.", "Князювання Володимира Васильковича (сина Василька Романовича, брата Данила Галицького) на Волині."),
new cardMaker(2, 48, "1301–1308(15) pp.", "Правління Юрія І Львовича, що об'єднав під своєю владою всі землі Галицько-Волинської держави"),
new cardMaker(2, 49, "1315–1323 pp.", "Князювання в Галицько-Волинському князівстві Андрія та Лева II Юрійовичів"),
new cardMaker(2, 50, "1324–1340 pp.", "Князювання в Галицько-Волинській державі Мазовецького княжича Болеслава Юрія II"),
new cardMaker(2, 51, "1340 р", "Смерть Юрія II. Перший похід польського короля Казимира III на Львів. Початок боротьби за галицько-волинські землі між Литвою та Польщею"),
new cardMaker(2, 52, "1349 p.", "Похід польського короля Казимира III на Галицько-Волинську Русь і підкорення більшості її земель"),
new cardMaker(3, 53, "992–996 pp.", "Спорудження Десятинної церкви в Києві"),
new cardMaker(3, 54, "1037 р.", "Спорудження Софійського собору в Києві"),
new cardMaker(3, 55, "1037–1039 pp.", "При Софійському соборі в Києві створено літопис, названий найдавнішим Київським зводом"),
new cardMaker(3, 56, "1056–1057 рр.", "Створення 'Остромирового Євангелія'' – найдавнішої з книг, яка збереглася до наших днів"),
new cardMaker(3, 57, "1073, 1076 р.", "Створення 'Ізборників'' для князя Святослава Ярославича"),
new cardMaker(3, 58, "1108 р.", "Заснування онуком Ярослава Мудрого Святополком Михайлівського Золотоверхого монастиря в Києві"),
new cardMaker(3, 59, "1113 р.", "Завершення ченцем Києво-Печерської лаври Несто­ром написання літопису 'Повість минулих літ'"),
new cardMaker(3, 60, "1117 р.", "Укладення 'Повчання'' Володимира Мономаха"),
new cardMaker(3, 61, "Близько 1200 р.", "Спорудження церкви Святого Пантелеймона в Галичі"),
new cardMaker(3, 62, "1230–ті рр.", "Написання 'Слова про погибель Руської землі'"),
new cardMaker(3, 63, "1256 р.", "Перша літописна згадка про місто Львів"),
new cardMaker(3, 64, "Друга половина ХІІІ ст.", "Укладення Галицько-Волинського літопису, що містить дві самостійні частини: Галицьку (1201 – 1261) і Волинську (1262–1292)"),
new cardMaker(3, 65, "1324 р.", "Перша писемна згадка про чинність на українських землях (у Володимирі-Волинському) магдебурзького права"),
new cardMaker(4, 66, "1349 р.", "Приєднання до Угорського королівства Шипинської землі (Буковини)"),
new cardMaker(4, 67, "1352 р.", "Укладення польсько-литовської угоди, за якою до Польського королівства відійшли Галичина та частина Поділля, а до Великого князівства Литовського – Волинь і Берестейська земля"),
new cardMaker(4, 68, "1359 р.", "Утворення Молдавського князівства та включення до нього Шипинської землі (Буковини)"),
new cardMaker(4, 69, "1362 р.", "Розгром великим князем Литовським Ольґердом татарського війська в битві на Синіх Водах і вигнання їх з українських земель. Приєднання до Великого князівства Литовського Київщини, Поділля й Переяславщини"),
new cardMaker(4, 70, "14 серпня 1385 р.", "Укладення Кревської унії"),
new cardMaker(4, 71, "1387 р.", "Остаточне приєднання Галичини до Польського королівства"),
new cardMaker(4, 72, "1393 р.", "Приєднання Поділля до Польського королівства"),
new cardMaker(4, 73, "12 серпня 1399 р.", "Поразка литовсько-руського війська, очолювано­го князем Вітовтом, у битві з ординцями на річці Ворсклі"),
new cardMaker(4, 74, "15 липня 1410 р.", "Грюнвальдська битва (битва під Таненбергом)"),
new cardMaker(4, 75, "2 жовтня 1413 р.", "Укладення Городельської унії"),
new cardMaker(4, 76, "Липень 1416 р.", "Розорення Києва ногайською ордою хана Едигея"),
new cardMaker(4, 77, "1435 р.", "Битва під Вількомиром (сучасне місто Укмерге в Литві)"),
new cardMaker(4, 78, "1443 р.", "Відокремлення Кримського ханства від Золотої Орди"),
new cardMaker(4, 79, "1447 р.", "Перший напад військ кримського хана на ук­раїнські землі"),
new cardMaker(4, 80, "1449 p.", "Утворення Кримського ханства."),
new cardMaker(4, 81, "1458 p.", "Поділ Київської митрополії на Київську та Московську."),
new cardMaker(4, 82, "1463 р.", "Перша згадка про існування у Львові Успенського православного братства"),
new cardMaker(4, 83, "1481 р.", "'Змова руських князів''"),
new cardMaker(4, 84, "1482 р.", "Спустошення Києва ордами кримського хана Менглі-Ґірея"),
new cardMaker(4, 85, "1489 р.", "Перша згадка про українських козаків у писемних джерелах."),
new cardMaker(4, 86, "1490-1492 pp.", "Організація селянського повстання на Буковині та на Покутті."),
new cardMaker(4, 87, "1492 р.", "Документальна згадка про козаків у листі великого князя литовського Олександра Казимировича до кримського хана Менглі-Гірея"),
new cardMaker(4, 88, "1508 р.", "Повстання Михайла Глинського"),
new cardMaker(4, 89, "1526 р.", "Загарбання західної частини Закарпаття австрійськими Габсбургами, східної – Трансільванським князівством"),
new cardMaker(4, 90, "1529 р.", "Прийняття Першого Литовського статуту"),
new cardMaker(4, 91, "1529 р.", "Запровадження Першого Литовського статуту"),
new cardMaker(4, 92, "1555 (1556)р.", "Спорудження Дмитром Вишневеньким оборонного замку на острові Мала Хортиця"),
new cardMaker(4, 93, "1557 р.", "Прийняття 'Устави на волоки'."),
new cardMaker(4, 94, "1566 р.", "Прийняття Другого Литовського статуту"),
new cardMaker(5, 95, "1569 р.", "Укладення Люблінської унії."),
new cardMaker(5, 96, "1572 р.", "Універсал польського короля Сиґізмунда II Авґуста про залучення на військову службу 300 запорозьких козаків. Початок формування реєстрового козацького війська."),
new cardMaker(5, 97, "1577 р.", "Похід запорозьких козаків, очолюваних Іваном Підковою, до Молдавії."),
new cardMaker(5, 98, "1578 р.", "Козацька реформа короля Стефана Баторія. Збільшення реєстру до 500 козаків."),
new cardMaker(5, 99, "1588 р.", "Прийняття Третього Литовського статуту."),
new cardMaker(5, 100, "1591–1593 pp.", "Козацьке повстання під проводом Криштофа Косинського."),
new cardMaker(5, 101, "1594–1596 pp.", "Козацьке повстання під проводом Северина Наливайка."),
new cardMaker(5, 102, "1596 р.", "Берестейська церковна унія."),
new cardMaker(5, 103, "1599 р.", "Повстання запорожців на турецьких галерах, очолюване Самійлом Кішкою."),
new cardMaker(5, 104, "1606 р.", "Узяття запорозькими козаками турецької фортеці Варна."),
new cardMaker(5, 105, "1609 р.", "Похід запорозьких козаків на турецькі фортеці Ізмаїл, Кілію та Акерман."),
new cardMaker(5, 106, "1609–1612 рр.", "Участь запорозьких козаків у поході польсько-литовського війська на Москву."),
new cardMaker(5, 107, "1616 р.", "Похід запорозьких козаків, очолюваних гетьманом Петром Конашевичем-Сагайдачним, на Кафу, узяття її та звільнення невільників."),
new cardMaker(5, 108, "1617р.", "Укладення Вільшанської польсько-козацької угоди, за якою козаки, не внесені до реєстру, повинні були повернутися під владу шляхти."),
new cardMaker(5, 109, "1619 р.", "Укладення Роставицької польсько-козацької угоди, за якою реєстр обмежувався 3 тис. козаків і встановлювалася заборона їх походів до турецьких володінь."),
new cardMaker(5, 110, "1620 р.", "Цецорська битва."),
new cardMaker(5, 111, "1620 р.", "Відновлення ієрархії Православної україно-біло-руської церкви."),
new cardMaker(5, 112, "1621 р.", "Хотинська війна."),
new cardMaker(5, 113, "1625 р.", "Виступ козаків на чолі з гетьманом Марком Жмайлом."),
new cardMaker(5, 114, "1625 р.", "Укладення Куруківської польсько-козацької угоди. Збільшення реєстру до 6 тис. козаків."),
new cardMaker(5, 115, "1630 р.", "Козацьке повстання під проводом Тараса Федоровича (Трясила)."),
new cardMaker(5, 116, "1632 р.", "Ухвалення сеймом Речі Посполитої 'Статей про заспокоєння грецької віри'. Легалізація Православної церкви."),
new cardMaker(5, 117, "1635 р.", "Зруйнування запорозькими козаками на чолі з Іваном Сулимою фортеці Кодак."),
new cardMaker(5, 118, "1637–1638 pp.", "Козацьке повстання під проводом Павла Бута (Павлюка), Якова Острянина та Дмитра Гуні."),
new cardMaker(5, 119, "1638 р.", "Прийняття сеймом Речі Посполитої 'Ординації Війська Запорозького реєстрового'."),
new cardMaker(6, 120, "1556–1561 pp.", "Створення Пересопницького Євангелія."),
new cardMaker(6, 121, "1574 р.", "Видання І. Федоровим у Львові 'Апостола'' – першої друкованої книги та 'Букваря'' – першого друкованого шкільного підручника на українських землях."),
new cardMaker(6, 122, "1578 р.", "Заснування князем К.-В. Острозьким в Острозі друкарні й школи."),
new cardMaker(6, 123, "1581р.", "Видання І. Федоровим в Острозі першого повного видання Біблії церковнослов'янською мовою."),
new cardMaker(6, 124, "1585–1586 pp.", "Заснування Львівського Успенського братства. Організація братської друкарні й школи."),
new cardMaker(6, 125, "1587 р.", "Видання в Острозі першого полемічного твору Герасима Смотрицького 'Ключ царства небесного'."),
new cardMaker(6, 126, "1596 р.", "Берестейська церковна унія."),
new cardMaker(6, 127, "1615 р.", "Заснування Київського Богоявленського братства та школи при ньому."),
new cardMaker(6, 128, "1615 р.", "Початок діяльності друкарні Києво-Печерського монастиря, створеної архімандритом Єлисеєм Плетенецьким."),
new cardMaker(6, 129, "20–ті pp. XVII ст.", "Укладення Густинського літопису."),
new cardMaker(6, 130, "1631р.", "Відкриття архімандритом Києво-Печерського монастиря Петром Могилою Лаврської школи."),
new cardMaker(6, 131, "1632 р.", "Початок діяльності Києво-Могилянського колегіуму, утвореного внаслідок об'єднання Братської й Лаврської шкіл."),
new cardMaker(7, 132, "25 січня 1648 р.", "Початок Національно-визвольної війни. Повстання козаків на Запорозькій Січі й обрання гетьманом Богдана Хмельницького"),
new cardMaker(7, 133, "5–6 травня 1648 р.", "Битва під Жовтими Водами."),
new cardMaker(7, 134, "16 травня 1648 р.", "Битва під Корсунем."),
new cardMaker(7, 135, "11 -13 серпня 1648 р.", "Битва під Пилявцями."),
new cardMaker(7, 136, "23 грудня 1648 р.", "Урочистий в'їзд гетьмана Богдана Хмельницького до Києва."),
new cardMaker(7, 137, "30 червня, 13 серпня 1649 р.", "Облога повстанським військом фортеці Збараж."),
new cardMaker(7, 138, "5–6 серпня 1649 р.", "Битва під Зборовом."),
new cardMaker(7, 149, "8 серпня 1649 р.", "Укладення Зборівського мирного договору."),
new cardMaker(7, 140, "Серпень 1650 р.", "Перший похід війська Богдана Хмельницького до Молдавії."),
new cardMaker(7, 141, "18–30 червня 1651 р.", "Битва під Берестечком."),
new cardMaker(7, 142, "18 вересня 1651 р.", "Укладення Білоцерківського мирного договору."),
new cardMaker(7, 143, "22–23 травня 1652 р.", "Битва під Батогом."),
new cardMaker(7, 144, "Липень – серпень 1652 р.", "Другий молдавський похід."),
new cardMaker(7, 145, "Квітень – травень 1653 р.", "Третій молдавський похід."),
new cardMaker(7, 146, "Серпень – вересень 1653 р.", "Четвертий молдавський похід. Загибель Тимоша Хмельницького."),
new cardMaker(7, 147, "1 жовтня 1653 р.", "Земський собор у Москві ухвалив рішення про прийняття Війська Запорозького під протекцію московського царя."),
new cardMaker(7, 148, "11 жовтня, 5 грудня 1653 р.", "Жванецька облога"),
new cardMaker(7, 149, "8 січня 1654 р.", "Козацька рада, скликана Богданом Хмельницьким у Переяславі, ухвалила присягнути на вірність московському цареві"),
new cardMaker(7, 150, "27 березня 1654 р.", "У Москві було укладено 'Березневі статті'' – договір між Московською державою та Гетьманщиною."),
new cardMaker(7, 151, "18–20 листопада 1654 р.", "Героїчна оборона повстанцями м. Бужі."),
new cardMaker(7, 152, "14–17 січня 1655 р.", "Героїчна оборона Умані загонами Івана Богуна."),
new cardMaker(7, 153, "19–20 січня 1655 р.", "Битва під Охматовим."),
new cardMaker(7, 154, "19 вересня – 29 жовтня 1655 р.", "Облога Львова військом Богдана Хмельницького."),
new cardMaker(7, 155, "26 жовтня 1656 р.", "Укладення у Вільно перемир'я між Московською державою й Річчю Посполитою."),
new cardMaker(7, 156, "27 липня 1657 р.", "Смерть гетьмана Богдана Хмельницького."),
new cardMaker(8, 157, "25 жовтня 1657 р.", "Генеральна козацька рада в Корсуні обрала гетьманом Івана Виговського."),
new cardMaker(8, 158, "15 травня 1658 р", "Придушення І. Виговським антигетьманського виступу, очолюваного полтавським полковником М. Пушкарем та запорозьким кошовим отаманом Я. Барабашем."),
new cardMaker(8, 159, "6 вересня 1658 р.", "Укладення україно-польської Гадяцької угоди."),
new cardMaker(8, 160, "1658–1659 pp.", "Україно-московська війна."),
new cardMaker(8, 161, "28–29 червня 1659 р.", "Конотопська битва."),
new cardMaker(8, 162, "11 вересня 1659 р.", "Зречення гетьманства І. Виговським за вимогою козацької ради під Германівкою."),
new cardMaker(8, 163, "17 жовтня 1659 р.", "Новообраний гетьман Юрій Хмельницький підписав із Московською державою Переяславські статті."),
new cardMaker(8, 164, "50–ті pp. XVII ст.", "Формування Харківського, Острогозького, Сумського, Ізюмського та Охтирського козацьких полків на Слобожанщині."),
new cardMaker(8, 165, "Серпень-вересень 1660 p.", "Чуднівська кампанія"),
new cardMaker(8, 166, "Жовтень 1660 p.", "Укладення україно-польського Слободищенського трактату."),
new cardMaker(8, 167, "1663 р.", "Поділ Війська Запорозького на лівобережний і правобережний гетьманати."),
new cardMaker(8, 168, "1663–1665 pp.", "Гетьманування на Правобережжі Павла Тетері."),
new cardMaker(8, 169, "1665 р.", "Укладення лівобережним гетьманом Іваном Брюховецьким україно-московської угоди – Московських статей."),
new cardMaker(8, 170, "Січень 1666 р.", "На козацькій раді в Чигирині правобережним гетьманом обрано Петра Дорошенка."),
new cardMaker(8, 171, "30 січня 1667 р.", "Укладення між Московською державою та Річчю Посполитою Андрусівського перемир'я."),
new cardMaker(8, 172, "3 березня 1669 р.", "Укладення новообраним лівобережним гетьманом Дем'яном Многогрішним україно-московської угоди – Глухівських статей."),
new cardMaker(8, 173, "10–12березня 1669 р.", "Старшинська козацька рада в Корсуні за пропозицією П. Дорошенка ухвалює рішення про визнання протекторату Османської імперії над Правобережною Україною."),
new cardMaker(8, 174, "13 березня 1672 р.", "Обрання на козацькій раді в Конотопі гетьманом Лівобережної України Івана Самойловича. Укладення україно-московських Конотопських статей."),
new cardMaker(8, 175, "18 жовтня 1672 р.", "Укладення Бучацького мирного договору між Річчю Посполитою та Османською імперією."),
new cardMaker(8, 176, "1673–1676 pp.", "Польсько-турецька війна за Правобережну Україну."),
new cardMaker(8, 177, "1676 р.", "Укладення Журавненської мирної угоди між Річчю Посполитою та Османською імперією."),
new cardMaker(8, 178, "1677 р.", "Перший Чигиринський похід турецько-татарської армії."),
new cardMaker(8, 179, "1677–1681 pp.", "Московсько-турецька війна за Правобережну Україну."),
new cardMaker(8, 180, "1678 р.", "Другий Чигиринський похід турецько-татарської армії."),
new cardMaker(8, 181, "13 січня 1681 р.", "Укладення Бахчисарайської мирної угоди між Московською державою, Кримським ханством та Османською імперією."),
new cardMaker(8, 182, "1685 р.", "Відновлення урядом Речі Посполитої козацького устрою на Правобережній Україні – Богуславського, Брацлавського, Фастівського та Корсунського полків."),
new cardMaker(8, 183, "6 травня 1686 p.", "Укладення 'Трактату про вічний мир між Московською державою та Річчю Посполитою'."),
new cardMaker(8, 184, "травень-червень 1687 р.", "Перший кримський похід об'єднаної московсько-української армії."),
new cardMaker(9, 185, "25 липня 1687 р.", "Обрання гетьманом І. Мазепи. Укладення українсько-московських Коломацьких статей."),
new cardMaker(9, 186, "1689 р.", "Другий Кримський похід московсько-української армії."),
new cardMaker(9, 187, "1699 р.", "Постанова сейму Речі Посполитої про ліквідацію козацтва на Правобережній Україні."),
new cardMaker(9, 188, "1700–1721 pp.", "Північна війна Росії зі Швецією."),
new cardMaker(9, 189, "1702–1704 pp.", "Національно-визвольне повстання проти польського панування на Правобережжі."),
new cardMaker(9, 190, "Жовтень 1708 р.", "Перехід І. Мазепи з п'ятитисячним козацьким військом на бік шведського короля Карла XII."),
new cardMaker(9, 191, "14 травня 1709 р.", "Зруйнування за наказом царя Петра І Чортомлицької Січі."),
new cardMaker(9, 192, "27 червня 1709 р.", "Полтавська битва."),
new cardMaker(9, 193, "1709 р.", "Прийняття Решетилівських статей."),
new cardMaker(9, 194, "1709–1711 pp.", "Кам'янська Січ"),
new cardMaker(9, 195, "5 квітня 1710 р.", "Прийняття Конституції П. Орлика – 'Пактів і Конституцій прав і свобод Війська Запорозького'."),
new cardMaker(9, 196, "Весна 1711 р.", "Похід П. Орлика разом із татарами на Правобережну Україну."),
new cardMaker(9, 197, "12 липня 1711 р.", "Укладення російсько-турецького Прутського договору."),
new cardMaker(9, 198, "1711 – 1734 pp.", "Олешківська Січ"),
new cardMaker(9, 199, "1712р.", "Укладення російсько-турецького Адріанопольського договору"),
new cardMaker(9, 200, "2 квітня 1722 р.", "Указ російського імператора Петра І про скасування в Лівобережній Україні гетьманства й утворення для управління нею Малоросійської колегії."),
new cardMaker(9, 201, "1723 р.", "Подання українською старшиною Петру І Коломацьких чолобитних."),
new cardMaker(9, 202, "Червень 1727 р.", "Обрання гетьманом Данила Апостола."),
new cardMaker(9, 203, "1728 р.", "Прийняття 'Рішительних пунктів'."),
new cardMaker(9, 204, "1734 р.", "Гайдамацьке повстання проти польського панування на Правобережжі, очолюване Верланом."),
new cardMaker(9, 205, "1734–1750 pp.", "Управління Гетьманщиною Правлінням гетьманського уряду."),
new cardMaker(9, 206, "1734–1775 pp.", "Нова (Підпільненська) Січ."),
new cardMaker(9, 207, "1738–1745 рр.", "Виступи опришків під проводом О. Довбуша на Прикарпатті."),
new cardMaker(10, 208, "1750 р.", "Відновлення гетьманства на Лівобережній Україні. Початок гетьманування К. Розумовського."),
new cardMaker(10, 209, "1753 р.", "Утворення Слов'яно-Сербії.")
];

themesArray = [
"МЛН років тому - VII ст",
"Виникнення та розквіт  Київської Русі",
"Київська Русь за часів роздробленості. Галицько-Волинська держава",
"Політичний устрій, соціально-економічний, культурний розвиток Київської Русі та Галицько-Волинської держави в IX-XIV ст.",
"Українські землі у складі Великого князівства Литовського та інших держав (друга половина XIV – середина XVI ст.)",
"Українські землі під владою Речі Посполитої. Наростання національно визвольної боротьби українського народу",
"Національно-культурний рух (друга половина XVI –  перша половина XVII ст.)",
"Національно-визвольна війна українського народу  проти Речі Посполитої середини XVII ст.",
"Українські землі у другій половині ХVІІ ст.",
"Українські землі наприкінці XVII – у першій половині XVIII ст.",
"Українські землі в другій половині XVIII ст."
];

function generateModalThemeList() {

	var currentList = document.getElementById("modalThemeList").innerHTML;
	for (var i = 0; i < themesArray.length; i++) {
		document.getElementById("modalThemeList").innerHTML = currentList + '<li class="hover-blackout" data-dismiss="modal" onclick="sortCardsByTheme(' + themesArray.indexOf(themesArray[i]) + ')">'+ themesArray[i] +'</li>';
		currentList = document.getElementById("modalThemeList").innerHTML;
	}

}

generateModalThemeList();

cardsArray = randomizeArr(cardsArray);
cardsQueue = new Queue;

function sortCardsByTheme(themeIndex) {
	currentThemeArray = [];
	cardsQueue.items = [];
	for (var i = 0; i < cardsArray.length; i++) {
		if (themesArray.indexOf(cardsArray[i].theme) == themeIndex) currentThemeArray.unshift(cardsArray[i])
	}
	for (var i = 0; i < currentThemeArray.length; i++) cardsQueue.enqueue(currentThemeArray[i]);
	nextCard();
	changeCardsDisplay(1)
}

for (var i = 0; i < cardsArray.length; i++) {
	cardsArray[i].theme = themesArray[cardsArray[i].theme];
	cardsQueue.enqueue(cardsArray[i]);
}



document.getElementById("h1-title").innerText = "Карток залишилось: " + cardsQueue.items.length;	