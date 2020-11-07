export const convertData = (data) => {		
	var input = {}
	var output = {}

	for (var key in data) {
		var value = data[key];
		value.result = JSON.parse(value['result'])
		input[value.name] = {}
		input[value.name][value.option] = value.value.split(", ");
		for (var rs_name in value.result) {
			output[rs_name] = value.result[rs_name].split(", ");
		}
	}

	var merge = {
		...input, ...output
	}
	console.log(merge);
	return merge;
}

export const getText = (root) => {
    var text = [];
    var cases = [[]];
    viewNode(text, cases, root, 0);
    return [text, cases];
}

function viewNode(text, cases, node, tab) {
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
    for (var i=0; i<num; i++) {
        for (var j=0; j<len; j++) {
            cases.push(JSON.parse(JSON.stringify(cases[j])));
        }
    }
}

function addCases(cases, index, step) {
    for (var i=0; i<cases.length; i++) {
        if (index === -1) cases[i].push("1");
        else {
            if (index === ~~(i/step)) cases[i].push("1");
            else cases[i].push("0");
        }
    }
}
