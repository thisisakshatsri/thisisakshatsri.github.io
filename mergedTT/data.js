// Add this at the top of data.js
console.log('Data file loaded successfully');

// Initial timetable data
const timetableData = [
  {
    day: "Monday",
    periods: [
      "XO5004\nSA\nMJ 4001\nTF / XY",
      "WMM 2001\nSA\nMJ5002\nAM\nMJ 4002*\nXY / XZ",
      "WMM 2006\nTF\nWSBOMJ5003\nTF\nMJ 2001\nHH / SA",
      "WMM 2005\nAM\nMN 4004\nTF / AM\nMJ 2003\nTS/SA",
      "MN 2004\nHH/SA\nWMM 2006\nTF\nWMM 2011/2012(O)\nHH/XY",
      "WSBOMJ5001\nTF\nMN 2004\nHH / SA\nGE 2006\nTF/SA",
      "WMM 2002\nTS\nWMM 4013\nHH\nGE 4006\nAM / SA",
      "WMM 4012\nSA/ RS\nWMM 4013\nHH\nWMM 4011\nXY\nGE 4006\nSA / AM",
      "VAC 4007\nHH / XY"
    ]
  },
  {
    day: "Tuesday",
    periods: [
      "XO5004\nSA\nMJ 4001\nTF / XY",
      "WMM 2001\nSA\nMJ 4002*\nXY / XZ\nMJ 5002\nAM",
      "MJ5003\nTF\nMJ 2001\nHH / SA",
      "WMM 4002\nTS\nMN 4004\nTF / AM\nWMM 4004\nHH",
      "WMM 2006\nTF\nMJ 2003\nTS / SA\nXO 5007\nSA",
      "WMM 2011 / 2012 (O)\nHH / XY\nWSBOMJ5001\nTF\nMN 2005\nJG/XY\nGE 2006\nTF/SA",
      "WMM 4003\nTF\nGE 4006\nAM / SA\nWMM 2002\nTS",
      "MJ 2003\nTS / SA\nWMM 4012\nSA/ RS\nWMM 4013\nHH\nWMM 4011\nXY",
      "VAC 4007"
    ]
  },
  {
    day: "Wednesday",
    periods: [
      "XO5004\nSA\nMJ 4001\nTF / XY",
      "MJ5002\nAM\nMJ 2002\nTF / SA",
      "WMM 2002\nTS\nWSBOMJ5003\nTF\nMJ 4003\nTS",
      "WMM 4002\nTS\nMN 2004\nHH / SA\nMJ 2002\nTF/SA",
      "WMM 4004\nHH\nWMM 2006\nTF\nMN 4004\nTF / AM\nMN 2005\nJG/XY\nXO 5007\nSA",
      "XO5007\nSA\nMJ 2002\nTF / SA\nGE 2006\nTF/SA\nMJ 5001\nTF",
      "WMM 4003\nTF\nMN 2005\nJG/XY\nGE 4006\nSA/AM",
      "WMM 4011\nXY\nWMM 4013\nHH",
      "VAC 4007*"
    ]
  },
  {
    day: "Thursday",
    periods: [
      "XO5004\nSA\nMJ 4001\nTF / XY",
      "MJ5002\nAM\nMJ 2002\nTF / SA\nMJ 4003\nTS",
      "WMM 2002\nTS\nMJ 5003\nTF\nMJ 2001\nHH/SA\nMN 2004\nHH/SA\nMN 4004\nTF/AN",
      "WMM 2006\nTF\nWMM 4002\nTS\nWSBOMJ5003\nTF\nMN 2004\nHH / SA\nMJ 2002\nTF/SA",
      "WMM 4004\nHH\nWMM 2006\nTF\nMN 4004\nTF / AM\nMN 2005\nJG/XY\nXO 5007\nSA",
      "XO5007\nSA\nMJ 2002\nTF / SA\nGE 2006\nTF/SA\nMJ 5001\nTF",
      "WMM 4003\nTF\nMN 2005\nJG/XY\nGE 4006\nSA/AM",
      "",
      "VAC 4007*"
    ]
  },
  {
    day: "Friday",
    periods: [
      "MJ 2001\nHH / SA\nMJ 4002\nXY/YZ\nVOC 5008\nTF/SA",
      "WMM 4001\nTF\nMJ 2001\nHH / SA\nMJ 4003\nTS\nMJ 5002\nAN",
      "WMM 2011/ 2012 (O)\nHH / XY\nWMM 4001\nSA\nMJ 2003\nTS / SA\nMJ 5003\nTF",
      "WMM 4001\nSA\nWMM 2005\nAM\nWMM 4002\nTS\nMN 2004\nHH / SA",
      "WMM 2001\nTF\nWMM 4004\nHH\nMN 2005\nGJ /XY\nXO 5007\nSA",
      "MJ 5001\nTF",
      "",
      "",
      ""
    ]
  },
  {
    day: "Saturday",
    periods: [
      "MJ 2001\nHH / SA\nMJ 4002\nXY /XZ\nVOC 5008\nTF/SA",
      "WMM 4001\nTF\nMJ 4003*\nTS\nMJ 2001\nHH / SA",
      "WMM 2011/ 2012 (O)\nHH / XY\nWMM 4001\nSA\nMJ 2003\nTS / SA",
      "WMM 2005\nAM\nWMM 4002\nTS\nMN 4005\nTS / XY",
      "WMM 2001\nTF\nMN 1005\nSA",
      "WMM 4011\nXY\nWMM 4012\nSA\nWMM 4013\nHH",
      "WMM 4012\nSA",
      "WMM 4012\nSA",
      ""
    ]
  }
];

// Export the data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { timetableData };
}

// Log data loading
console.log('Timetable data loaded successfully'); 