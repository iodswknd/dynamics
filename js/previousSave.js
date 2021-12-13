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

var columns = [
	"unique_id",
    "nicknames_iwa",
    "nicknames_oi",
    "nicknames_dai",
    "nicknames_sug",
    "cb_1",
    "cb_2",
    "cb_3",
    "cb_4",
    "cb_5",
    "cb_6",
    "cb_7",
    "cb_8",
    "cb_9",
    "cb_10",
    "cb_11",
    "cb_12",
    "cb_13",
    "cb_14",
    "cb_15",
    "ch_1_iwa",
    "ch_1_oi",
    "ch_1_dai",
    "ch_1_sug",
    "ch_2_iwa",
    "ch_2_oi",
    "ch_2_dai",
    "ch_2_sug",
    "ch_3_iwa",
    "ch_3_oi",
    "ch_3_dai",
    "ch_3_sug",
    "ch_4_iwa",
    "ch_4_oi",
    "ch_4_dai",
    "ch_4_sug",
    "s_1",
    "s_2",
    "s_3",
    "s_4",
    "s_5",
    "s_6",
    "s_7",
    "s_8",
    "s_9",
    "s_10",
    "s_11",
    "s_12",
    "s_13",
    "s_14",
    "s_15",
    "s_16",
    "tr_1_iwa",
    "tr_1_oi",
    "tr_1_dai",
    "tr_1_sug",
    "tr_2_iwa",
    "tr_2_oi",
    "tr_2_dai",
    "tr_2_sug",
    "tr_3_iwa",
    "tr_3_oi",
    "tr_3_dai",
    "tr_3_sug"
];
var formIDs = [
    "entry.1585191424",
    "entry.1698431986",
    "entry.2133776019",
    "entry.438505046",
    "entry.2114878919",
    "entry.1520086278",
    "entry.1565308950",
    "entry.1345651638",
    "entry.1068116319",
    "entry.578264511",
    "entry.678755395",
    "entry.780992694",
    "entry.997886833",
    "entry.1052260950",
    "entry.1639384151",
    "entry.247342645",
    "entry.519169177",
    "entry.929615647",
    "entry.1500929023",
    "entry.1432582497",
    "entry.21446769",
    "entry.1435325567",
    "entry.170180370",
    "entry.1916324367",
    "entry.48069107",
    "entry.1237505231",
    "entry.1964309255",
    "entry.456826551",
    "entry.569672242",
    "entry.1444093288",
    "entry.911451037",
    "entry.1573041261",
    "entry.391847614",
    "entry.1678770624",
    "entry.158745544",
    "entry.2070994854",
    "entry.1951479820",
    "entry.792238866",
    "entry.455031031",
    "entry.1269101513",
    "entry.1467067489",
    "entry.1905584741",
    "entry.1092029485",
    "entry.1171111455",
    "entry.1283569873",
    "entry.1279158097",
    "entry.2136470687",
    "entry.242442710",
    "entry.2050963428",
    "entry.857653266",
    "entry.1999530424",
    "entry.1743214955",
    "entry.1062052674",
    "entry.1848017167",
    "entry.281002515",
    "entry.1384888900",
    "entry.236782703",
    "entry.1612823789",
    "entry.1484922073",
    "entry.1464094100",
    "entry.893258575",
    "entry.2010601925",
    "entry.6855485",
    "entry.2113441679"
];

var sheet = new spreadSheet(
  "1jDmSQ2Y99kKUx9heFHYbYLOwmGCjCeegM-9-MTol1L8",
  null,
  function(data) {
     json = data.getAsObjects()
     for (const i in json) {
     	const entry = json[i];
     	const id = entry["unique_id"]
     	var obj = {};
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
		var offset = parseInt(this.dataset.index);
		var j = Math.floor(i / 4);
		var formID = columns[(j*4)+offset];
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
		var index = parseInt(this.dataset.index);
		var left = this.style.left;

		if (!(formID in form)) {
			form[formID] = ["","","",""];
		}
		form[formID][index] = left;
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
		throw "ERROR: ID not in savedData";
	} else {
		data = savedData[ID];
		inputs = columns.slice(1,5);
		checkboxes = columns.slice(5,20);
		boxes = columns.slice(20,36);
		sliders = columns.slice(36,52);
		triangles = columns.slice(52);

		setInputs(data, inputs);
		setCheckboxes(data, checkboxes);
		setBoxes(data, boxes.concat(triangles));
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
	checkboxes = formIDs.slice(5,20);
	boxes = formIDs.slice(20,36);
	sliders = formIDs.slice(36,52);
	triangles = formIDs.slice(52);

	saveInputs(inputs);
	saveCheckboxes(checkboxes);
	saveBoxes(boxes.concat(triangles));
	saveSliders(sliders);

	savedData[dataID] = form;

	formIDs.slice(1).forEach( id => (form[id] = form[id].join(';')));
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
	          // console.log('Enter on success');
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	          // console.log('Enter on error');
	        }
	      });
	    }
	}, 300);

	$('#saveLink').text('iodswknd.github.io/dynamics/?data=' + dataID);
	$('#saveLink').attr('href', 'https://'+$('#saveLink').text());
}