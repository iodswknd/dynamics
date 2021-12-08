function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var savedData = {}
var dataID = null;

var columns = ["Iwa_Nicknames", "Oi_Nicknames", "Dai_Nicknames", "Sug_Nicknames","cb_budgets", "cb_decisions", "cb_dates", "cb_cooks", "cb_cleans", "cb_confess", "cb_apologize", "iwa_howithappens", "oi_howithappens", "dai_howithappens", "sug_howithappens", "iwa_misadventures", "oi_misadventures", "dai_misadventures", "sug_misadventures", "little_bigspoon", "lends_borrowsclothes", "doesntuse_lovespetnames", "introverted_extroverted"];
var sheet = new spreadSheet(
  "1CyUB0-dYJxjqx7tu6h0yFS7f3zyR7s9TrSHgpeMFphM",
  null,
  function(data) {
     json = data.getAsObjects()
     for (const i in json) {
     	const entry = json[i];
     	const id = entry["Unique_ID"]
     	var obj = {};
     	// console.log(id);
     	for (const j in columns) {
     		const column = columns[j];
     		obj[column] = entry[column].split(';');
     	}
     	savedData[id] = obj
     }
     if (dataID != null) {
     	setData(dataID);
     }
});

function setID(id) {
	dataID = id;
}

function setInputs(data, columns) {
	// console.log(data);
	htmlInputs = $('.user-input');

	htmlInputs.each(function(i) {
		var column = columns[Math.floor(i/3)]
		var value = data[column][i%3];

		this.value = value
	});
}

function setCheckboxes(data, columns) {
	// console.log(columns);
	htmlCB = $('.cb');

	htmlCB.each(function(i) {
		var column = columns[Math.floor(i/4)]
		console.log(column);
		var cls = data[column][i%4];

		if (cls.length == 2) {
			this.classList.add(cls);
		}
	});
}

function setBoxes(data, columns) {
	// console.log(data);
	htmlBoxes = $('.free');

	htmlBoxes.each(function(i) {
		var column = columns[i];
		var left = data[column][0];
		var top = data[column][1];

		$(this).css("left", left).css("top", top);
	});
}

function setSliders(data, columns) {
	// console.log(data);
	htmlSliders = $('.slide');

	htmlSliders.each(function(i) {
		var column = columns[Math.floor(i/4)]
		var left = data[column][i%4];

		$(this).css("left", left);
	});
}

function setData(ID) {
	var data = {};
	if (!(ID in savedData)) {
		throw "ERROR: ID not in savedData"
	} else {
		data = savedData[ID];
		inputs = columns.slice(0,4);
		checkboxes = columns.slice(4,11);
		boxes = columns.slice(11,19);
		sliders = columns.slice(19);

		setInputs(data, inputs);
		setCheckboxes(data, checkboxes);
		setBoxes(data, boxes);
		setSliders(data, sliders);
	}
}