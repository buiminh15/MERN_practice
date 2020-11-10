export const processData = (data) => {
	var group1 = data.filter(item => item.group === 'group1');
	var group2 = data.filter(item => item.group === 'group2');
	var group3 = data.filter(item => item.group === 'group3');
	var group4 = data.filter(item => item.group === 'group4');

	if (group1.length !== 0 || group2.length !== 0 || group3.length !== 0 || group4.length !== 0 ) {
		var [input1, output1] = convertData(group1);
		var [input2, output2] = convertData(group2);
		var [input3, output3] = convertData(group3);
		var [input4, output4] = convertData(group4);
	}
	var text1 = [], cases1 = [[]];
	var text2 = [], cases2 = [[]];

	var merged1 = { ...input1, ...output1 };
	var merged2 = { ...input2, ...output2 };

	viewNode(text1, cases1, merged1, 0, Object.keys(input1).length);
	viewNode(text2, cases2, merged2, 0, Object.keys(input2).length);

	// tim vi tri dong result
	var rsIndex1 = 0, rsIndex2 = 0;
	var count;
	for (var i = 0, count = 0; i < text1.length; i++) {
		if (text1[i][0] === '\t') continue;
		count++;
		if (count === Object.keys(input1).length + 1) {
			rsIndex1 = i;
			break;
		}
	}
	for (var i = 0, count = 0; i < text2.length; i++) {
		if (text2[i][0] === '\t') continue;
		count++;
		if (count === Object.keys(input2).length + 1) {
			rsIndex2 = i;
			break;
		}
	}

	// console.log("===");
	// hien thi text
	var text_merged = text1.slice(0, rsIndex1)
		.concat(text2.slice(0, rsIndex2))
		.concat(text1.slice(rsIndex1))
		.concat(text2.slice(rsIndex2))

	// console.log(text_merged.join("\n"));

	// them dong empty va cases
	cases1.forEach(item => item.splice(text1.length, 0, ...new Array(text2.length - rsIndex2).fill("0")));
	cases1.forEach(item => item.splice(rsIndex1, 0, ...new Array(rsIndex2).fill("0")));

	cases2.forEach(item => item.splice(rsIndex2, 0, ...new Array(text1.length - rsIndex1).fill("0")));
	cases2.forEach(item => item.splice(0, 0, ...new Array(rsIndex1).fill("0")));

	// hien thi cases
	var cases_merged = [].concat(cases1).concat(cases2);
	var excelCases = [];
	var len = cases_merged[0].length;
	for (var i = 0; i < len; i++) {
		var row = "";
		for (var j = 0; j < cases_merged.length; j++) {
			row += (cases_merged[j][i] === "1" ? "\u25ef" : "") + "\t";
		}
		excelCases.push(row);
	}
	// console.log("===");
	// console.log(excelCases.join("\n"));
	// console.log("===");

	return [text_merged, excelCases]

}

function convertData(data) {
	var input = {}
	var output = {}

	for (var key in data) {
		var value = data[key];
		input[value.name] = {}
		input[value.name][value.key] = value.value.split(", ");
		for (var rs_name in value.result) {
			output[rs_name] = value.result[rs_name].split(", ");
		}
	}

	return [input, output]
}

function viewNode(text, cases, node, tab, rawConditionIndex) {
	if (Array.isArray(node) || typeof node === "object") {
		for (var key in node) {
			var value = node[key];

			if (Array.isArray(value)) {
				var step = cases.length;
				dupCases(cases, value.length - 1);
				for (var index in value) {
					var item = value[index];
					text.push("\t".repeat(tab) + key + " is " + item);
					addCases(cases, +index, step);
				}
			} else if (typeof value === "object") {
				text.push("\t".repeat(tab) + key);
				var step = cases.length;
				addCases(cases, -1, step);
				viewNode(text, cases, value, tab + 1);

			} else {
				text.push("\t".repeat(tab) + key + " is " + value);
				var step = cases.length;
				addCases(cases, -1, step);
			}
		}
	} else {
		text.push("\t".repeat(tab) + node);
		var step = cases.length;
		addCases(cases, -1, step);
	}
}

function dupCases(cases, num) {
	var len = cases.length;
	for (var i = 0; i < num; i++) {
		for (var j = 0; j < len; j++) {
			cases.push(JSON.parse(JSON.stringify(cases[j])));
		}
	}
}

function addCases(cases, index, step) {
	for (var i = 0; i < cases.length; i++) {
		if (index === -1) cases[i].push("1");
		else {
			if (index === ~~(i / step)) cases[i].push("1");
			else cases[i].push("0");
		}
	}
}
