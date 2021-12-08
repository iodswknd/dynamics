/**
 * GSpreadSheet2json - A JavaScript Module to convert Google Spreadsheet to json objects or arrays
 * 
 * @author : Pasindu Perera
 * @email : perera.pasindu@gmail.com
 * @website : http://rumal.github.com/Gsheet2json/
 *
 */
var spreadSheet = (spreadSheet) || function(key, fields, success) {
    var key = key;
    var apiCallURL = "https://docs.google.com/spreadsheets/d/{key}/gviz/tq?tqx=out:json"
            .replace("{key}", key);
    var fields = (fields) ? fields : [];
    var data = [];
    var dataReady = false;

    function generateFields(table) {
        //TODO
         return table.cols.map(({label}) => label);;
    }
    
    function prepareField(field){
        return field.replace(/\s/,"").toLowerCase();
    }
    
    function getJSONP(link) {

        $.ajax({url: link, type: 'GET', dataType: 'text'})
		.done(function(data) {
		  const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
		  
		  if (r && r.length == 2) {
			  callBack(r[1])
		  }
		})
		.fail((e) => console.log(e.status));

    }

    function callBack(response) {
        data = [];
        const obj = JSON.parse(response);
	    var table = obj.table;
        fields = (fields.length > 0) ? fields : generateFields(table);
	    const rows = table.rows.map(({c}) => c.map(e => e ? (e.v || "") : "")); // Modified from const rows = table.rows.map(({c}) => c.map(({v}) => v));
        // console.log(rows);
        // console.log(fields);
        for (var i = 0; i < rows.length; i++) {
            var entry = {};
            var row = rows[i]
            // console.log(row);
            for (var j = 0; j < fields.length; j++) {
                var field = fields[j];
                entry[field] = row[j];
            }
            data.push(entry);
        }
        dataReady = true;
        success(retValue);
    }
    var retValue = {
        getKey: function() {
            return key;
        },
        getFields: function() {
            return fields;
        },
        getAsObjects: function() {
            if (!dataReady)
                throw new Error("Called before the data is returned from the server");
            return data;
        },
        getAsArray: function() {
            if (!dataReady)
                throw new Error("Called before the data is returned from the server");
            var asArray = [];
            for (var i = 0; i < data.length; i++) {
                var line = data[i];
                var inner = [];
                for (var j = 0; j < fields.length; j++) {
                    var field = fields[j];
                    if (line.hasOwnProperty(field)) {
                        inner.push(line[field]);
                    }
                }
                asArray.push(inner);
            }
            return asArray;
        }
    };

 getJSONP(apiCallURL);
    return retValue;
};