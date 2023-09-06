function ConvertSmdr (str) {
  interface smdrObject {
    longCall: string,
    date: string,
    startTime: string,
    duration: string,
    callingParty: string,
    attendantInvolved: boolean,
    timeToAnswer: string,
    digitsDialed: string,
    callCompletionStatus: string,
    speedCallCallForwardFlag: string,
    calledParty: string,
  }

  let smdrStr = str;
  let attendant = smdrStr.substr(35,1);
  let attendantBool = false;
  if (attendant === 'f') attendantBool = true;

  let smdrObj: smdrObject = {
    longCall: smdrStr.substr(0,1),
    date: smdrStr.substr(1,5),
    startTime: smdrStr.substr(7,8),
    duration: smdrStr.substr(17,10),
    callingParty: smdrStr.substr(28,7),
    attendantInvolved: attendantBool,
    timeToAnswer: smdrStr.substr(36,4),
    digitsDialed: smdrStr.substr(41,25),
    callCompletionStatus: smdrStr.substr(67,1),
    speedCallCallForwardFlag: smdrStr.substr(68,1),
    calledParty: smdrStr.substr(69,7),
  }

  return smdrObj;
}
export { ConvertSmdr };