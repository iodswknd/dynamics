function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var savedData = {}
var dataID = null;
var form = {};

var columns = ["Iwa_Nicknames", "Oi_Nicknames", "Dai_Nicknames", "Sug_Nicknames","cb_budgets", "cb_decisions", "cb_dates", "cb_cooks", "cb_cleans", "cb_confess", "cb_apologize", "iwa_howithappens", "oi_howithappens", "dai_howithappens", "sug_howithappens", "iwa_misadventures", "oi_misadventures", "dai_misadventures", "sug_misadventures", "little_bigspoon", "lends_borrowsclothes", "doesntuse_lovespetnames", "introverted_extroverted"];
var formIDs = ['entry.1585191424', 'entry.1698431986', 'entry.2133776019', 'entry.438505046', 'entry.2114878919', 'entry.1520086278', 'entry.1565308950', 'entry.1345651638', 'entry.1068116319', 'entry.578264511', 'entry.678755395', 'entry.780992694', 'entry.21446769', 'entry.1435325567', 'entry.170180370', 'entry.1916324367', 'entry.48069107', 'entry.1237505231', 'entry.1964309255', 'entry.456826551', 'entry.1951479820', 'entry.792238866', 'entry.455031031', 'entry.1269101513'];

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

function saveInputs(columns) {
	htmlInputs = $('.user-input');

	htmlInputs.each(function(i) {
		var formID = columns[Math.floor(i/3)];
		if (!(formID in form)) {
			form[formID] = [];
		}
		form[formID].push(this.value)
	});
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

function saveCheckboxes(columns) {
	htmlCB = $('.cb');

	htmlCB.each(function(i) {
		var formID = columns[Math.floor(i/4)]
		var value = this.classList.value.replace(' ', '').replace('cb', '');

		if (!(formID in form)) {
			form[formID] = [];
		}
		form[formID].push(value)
	});
}

function setCheckboxes(data, columns) {
	// console.log(columns);
	htmlCB = $('.cb');

	htmlCB.each(function(i) {
		var column = columns[Math.floor(i/4)]
		var cls = data[column][i%4];

		if (cls.length == 2) {
			this.classList.add(cls);
		}
	});
}

function saveBoxes(columns) {
	htmlBoxes = $('.free');

	htmlBoxes.each(function(i) {
		var formID = columns[i];
		var left = this.style.left;
		var top = this.style.top

		form[formID] = [left,top];
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

function saveSliders(columns) {
	htmlSliders = $('.slide');

	htmlSliders.each(function(i) {
		var formID = columns[Math.floor(i/4)]
		var left = this.style.left;

		if (!(formID in form)) {
			form[formID] = [];
		}
		form[formID].push(left);
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


function saveData() {
	dataID = makeid();
	form = {}

	while(dataID in savedData) {
		dataID = makeid();
	}
	// console.log(dataID, form);

	inputs = formIDs.slice(1,5);
	checkboxes = formIDs.slice(5,12);
	boxes = formIDs.slice(12,20);
	sliders = formIDs.slice(20);

	saveInputs(inputs);
	saveCheckboxes(checkboxes);
	saveBoxes(boxes);
	saveSliders(sliders);

	formIDs.slice(1).forEach( id => (form[id] = form[id].join(';')))
	// console.log(form);

	form[formIDs[0]] = dataID;
	// console.log(form);

	setTimeout(function() {

	    // Validate form
	    var formSuccess = true;
	    Object.keys(form).forEach(function(key, index) {
	      if (!form[key]) {
	        formSuccess = false;
	        console.log('missing key');
	      }
	    });

	    if (formSuccess) {
	      // Send request
	      $.ajax({
	        url: 'https://docs.google.com/forms/d/e/1FAIpQLScfJPtEYcPwjoZLQb7oq5RR7Ov_T8oCXhmH8ZleTdrdw2H1xA/formResponse',
	        type: 'POST',
	        crossDomain: true,
	        dataType: "xml",
	        data: form,
	        success: function(jqXHR, textStatus, errorThrown) {
	          console.log('Enter on success');
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	          console.log('Enter on error');
	        }
	      });
	    }
	}, 300);
}