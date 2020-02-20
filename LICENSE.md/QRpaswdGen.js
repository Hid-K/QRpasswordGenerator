var args = require('minimist')(process.argv.slice(2));

if("help" in args || 'h' in args)
{
	console.log("Usage: QRpaswdGen.js [Options]");
	console.log("Options:");
	console.log("-s <wifi SSID>:            Wifi's SSID (necessarily).");
	console.log("-p <wifi password>:        Wifi's password.");
	console.log("-l <length>:               If you want to generate password automatically, you can just pass password len.");
	console.log("-h || --help:              Display this and exit.");
	console.log("--path <codes folder path>");
	process.kill(process.pid);
}

if (!('s' in args))
{
	throw new Error("!No SSID passed!");
};

var QR = require("qrcode");
var SSID = '';
var passwd = '';
var path = "codes";

SSID = args.s;


if("path" in args)
{
	path = args.path;
}


function gen(length)
{
	var result			= '';
	var characters		= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for ( var i = 0; i < length; i++ ) {
	result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

if('p' in args)
{
	passwd = args.p;
}

else if(!('l' in args))
{
	throw new Error("!No password (or password length) passed!");
}

else
{
	passwd = gen(args.l);
}

QR.toFile(path + '/' + SSID + '.png', 'WIFI:S:' + SSID + ';T:WPA;P:' + passwd + ';;');
console.log(passwd);
console.log(SSID);