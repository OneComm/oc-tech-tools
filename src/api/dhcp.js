import { HexWithColons } from "./hexWithColons";

function GenerateHex (obj) {
  var id = obj.id;
  var sw_tftp = obj.sw_tftp;
  var call_srv = obj.call_srv;
  var vlan = obj.vlan;
  var l2p = obj.l2p_default + "v" + obj.l2p_voice + "s" + obj.l2p_signaling;
  var dscp = obj.dscp_default + "v" + obj.dscp_voice + "s" + obj.dscp_signaling;
  var vc = "";
  var hexResult = "";
  var formattedHex = "";

  var ascii = "id:" + id + ";sw_tftp:" + sw_tftp + ";call_srv:" + call_srv + ";vlan:" + vlan + ";l2p:" + l2p + ";dscp:" + dscp + ";";
  var i, hex;
  for (i=0; i<ascii.length; i++) {
    hex = ascii.charCodeAt(i).toString(16);
    vc += hex;
  }
  hexResult = "000004035D" + vc.toUpperCase();
  formattedHex = HexWithColons(hexResult, 2, ":");

  var resultObj = {
    ascii,
    hexResult,
    formattedHex
  }

  return resultObj;
}

export { GenerateHex };