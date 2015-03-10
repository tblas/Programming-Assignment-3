(function() {
	var win1 = tianium.UI.createwindow({
		title:'Select Color',
		backgroundColor: '#fff'
});
// open window
win1.open();
}) ();

var Teas = ['#F5F5DC', '#FFE4B5', '#FFE4C4', '#D2B48C', 
'#C3B091', '#C3B091', '#926F5B', '#804000', '#654321', 
'#3D2B1F'];

allRows = [];
var theColours = Ti.UI.createTableView({});

for (var i=0; i<Teas.length; i++) {
	theRow = Ti.UI.createTableViewRow ({backgroundColor : 
	Teas [i],height:50, TeaColour:Teas [i]});
	allRows.push(theRow);
}

theColours.setData(allRows);
win1.add(theColours);

function getVeridct(colour) {
	var indicator = colour.charAt(1);
	var msg;
	// Make a crude decision on the strength of the tea based 
	on the 2nd character of the hex color
	switch (indicator) {
		case 'F': msg = 'Milky'; break;
		case 'D': msg = 'Nice'; break;
		case 'C': msg = 'Perfect'; break;
		case '9': msg = 'A bit strong'; break;
		case '8': msg = 'Builders tea'; break;
		case '6': msg = 'Send it back'; break;
		case '3': msg = 'No milk here'; break;
	}
	return msg;
};

function showTeaVerdict (_args) {
	var teaVerdict = Ti.UI.createWindow ({layout:'vertical'});
	
	teaVerdict.backgroundColor = _args;
	teaVerdict.msg = getVerdict(_args);
	
	varjudgement = Ti.UI.createLabel
	({text:teaVerdict.msg, top:'50%'});
	var close = Ti.UI.createButton
	({title: 'Choose again', top: '25%'});
	close.addEventListener('click', function (e)
		{teaVerdict.close();
		// release the resources
		teaVerdict = null;
		});
		
	teaVerdict.add(judgement);
	teaVerdict.add(close);
	teaVerdict.open();
}

theColours.addEventListener('click',function(e) 
{showTeaVerdict(e.source.TeaColour)});

var win1 = Titanium.UI.createWindow ({
	backgroundColor: '#fff'
});

var masterVw = Ti.UI.createView ({layout: 'vertical'});

var rawSlider = Ti.UI.createSlider ({max: 2
									,min:-2});
var lowSlider = Ti.UI.createSlider({max: 2
								 ,min:-2});
var truncSlider = Ti.UI.createSlider ({max: 2
								 ,min:-2});
var rawLabel = Titanium.UI.createLabel ({});
var lowLabel = Titanium.UI.createLabel ({});
var truncLabel = Titanium.UI.createLable ({});

masterVw.add(rawSlider);
masterVw.add(rawLabel);
masterVw.add(lowSlider);
masterVw.add(lowLabel);
masterVw.add(truncSlider);
masterVw.add(truncLabel);

layout.add(rawSlider);
layout.add(rawLabel);
win1.add(masterVw);

updateSliders = function(e) {
	var raw = Math.atan(e.z/e.y);
	var low = lowPassFilter(raw);
	rawLabel.text = 'raw '+parseFloat(raw).toFixed(4);
	rawSlider.value = raw;
	lowLabel.text = 'low '+parseFloat(raw).toFixed(4);
	lowSlider.value = low;
	truncLabel.text = 'truncated '+parseFloat(raw).toFixed(1);
	truncSlider.value = parseFloat(raw).toFixed(1);
};

	win1.addEventListener('focus',function() {Ti.Accelerometer.
addEventListener("update", updateSliders),});	

var noiseAttenuation = 3;
var accelerometerMinStep = 0.02;
var filterConstant = 0.2;
var alpha     = 0;
var lastValue = 0;

clamp = fuction(val) {
	if (val > 1) return 1
	if (val < 0) return 0;
	return val;
}

lowPassFilter = function (val)
{
	var diff = clamp(Math.abs(lastValue - val) /
	accelerometerMinStep);
	
	alpha = (1.0 - diff) * filterConstant /
	noiseAttenuation + diff * filterConstant
	
	lastValue = val * alpha + lastValue * (1.0 - alpha);
	
	return lastValue;
}	

