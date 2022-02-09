import { HexWithColons } from "./hexWithColons";

function GenerateHex (obj) {
  var type = obj.type;
  var ip = obj.ip;
  var aa, bb, vc, hexResult, formattedHex;

  if (type === "SCG") {
    aa = "06";
  } else {
    aa = "03";
  }
  
  bb = "0" + (ip.length).toString(16);

  var i, hex;
  for (i=0; i<ip.length; i++) {
    hex = ip.charCodeAt(i).toString(16);
    vc += hex;
  }

  hexResult = aa + bb + vc;

  formattedHex = HexWithColons(hexResult, 2, ":");

  var resultObj = {
    ip: obj.ip,
    hexResult,
    formattedHex
  }

  return resultObj;
}

export { GenerateHex };