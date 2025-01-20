// Add this at the top of data.js
console.log('Data file loaded successfully');

// Initial timetable data
const timetableData = [
  {
    day: "Monday",
    periods: [
      "XO5004\nSA\n\nMJ 4001\nTF / XY",
      "WMM 2001\nSA\n\nMJ5002\nAM\n\nMJ 4002*\nXY / XZ",
      "WMM 2006\nTF\n\nWSBOMJ5003\nTF\n\nMJ 2001\nHH / SA",
      "WMM 2005\nAM\nMN 4004\nTF / AM\nMJ 2003\nTS/SA",
      "MN 2004\nHH/SA\nWMM 2006\nTF\n\nWMM 2011/2012(O)\nHH/XY",
      "WSBOMJ5001\nTF\nMN 2004\nHH / SA\nGE 2006\nTF/SA",
      "WMM 2002\nTS\nWMM 4013\nHH",
      "GE 4006\nAM / SA\nWMM 4012\nSA/ RS\nWMM 4013\nHH",
      "WMM 4011\nXY\nGE 4006\nSA / AM\nVAC 4007\nHH / XY"
    ]
  },
  {
    day: "Tuesday",
    periods: [
      "XO5004\nSA\n\nMJ 4001\nTF / XY",
      "WMM 2001\nSA\n\nMJ 4002*\nXY / XZ\n\nMJ 5002\nAM",
      "MJ5003\nTF\n\nMJ 2001\nHH / SA",
      "WMM 4002\nTS\n\nMN 4004\nTF / AM\n\nWMM 4004\nHH",
      "WMM 2006\nTF\nMJ 2003\nTS / SA\nXO 5007\nSA",
      "WMM 2011 / 2012 (O)\nHH / XY\n\nWSBOMJ5001\nTF\n\nMN 2005\nJG/XY",
      "GE 2006\nTF/SA\nWMM 4003\nTF\nGE 4006\nAM / SA",
      "WMM 2002\nTS\nMJ 2003\nTS / SA\nWMM 4012\nSA/ RS",
      "WMM 4013\nHH\nWMM 4011\nXY\n\nVAC 4007"
    ]
  },
  {
    day: "Wednesday",
    periods: [
      "XO5004\nSA\n\nMJ 4001\nTF / XY",
      "MJ5002\nAM\n\nMJ 2002\nTF / SA",
      "WMM 2002\nTS\nWSBOMJ5003\nTF\nMJ 4003\nTS",
      "WMM 4002\nTS\nMN 2004\nHH / SA\nMJ 2002\nTF/SA",
      "WMM 4004\nHH\nWMM 2006\nTF\nMN 4004\nTF / AM",
      "MN 2005\nJG/XY\nXO 5007\nSA\nXO5007\nSA",
      "MJ 2002\nTF / SA\n\nGE 2006\nTF/SA",
      "MJ 5001\nTF\nWMM 4003\nTF\n\nMN 2005\nJG/XY",
      "GE 4006\nSA/AM\nWMM 4011\nXY\nWMM 4013\nHH\n\nVAC 4007*"
    ]
  },
  {
    day: "Thursday",
    periods: [
      "XO5004\nSA\n\nMJ 4001\nTF / XY",
      "MJ5002\nAM\n\nMJ 2002\nTF / SA",
      "MJ 4003\nTS\nWMM 2002\nTS\nMJ 5003\nTF",
      "MJ 2001\nHH/SA\nMN 2004\nHH/SA\nMN 4004\nTF/AN",
      "WMM 2006\nTF\nWMM 4002\nTS\nWSBOMJ5003\nTF",
      "MN 2004\nHH / SA\nMJ 2002\nTF/SA\nWMM 4004\nHH",
      "WMM 2006\nTF\nMN 4004\nTF / AM\n\nMN 2005\nJG/XY",
      "XO 5007\nSA\nXO5007\nSA\n\nMJ 2002\nTF / SA",
      "GE 2006\nTF/SA\n\nMJ 5001\nTF\nWMM 4003\nTF\n\nMN 2005\nJG/XY\n\nGE 4006\nSA/AM\nVAC 4007*"
    ]
  },
  {
    day: "Friday",
    periods: [
      "MJ 2001\nHH / SA\n\nMJ 4002\nXY/YZ\nVOC 5008\nTF/SA",
      "WMM 4001\nTF\n\nMJ 2001\nHH / SA\n\nMJ 4003\nTS",
      "MJ 5002\nAN\nWMM 2011/ 2012 (O)\nHH / XY",
      "WMM 4001\nSA\nMJ 2003\nTS / SA\nMJ 5003\nTF",
      "WMM 4001\nSA\nWMM 2005\nAM\nWMM 4002\nTS",
      "MN 2004\nHH / SA\nWMM 2001\nTF\nWMM 4004\nHH",
      "MN 2005\nGJ /XY\n\nXO 5007\nSA\n\nMJ 5001\nTF"
    ]
  },
  {
    day: "Saturday",
    periods: [
      "MJ 2001\nHH / SA\n\nMJ 4002\nXY /XZ\n\nVOC 5008\nTF/SA",
      "WMM 4001\nTF\nMJ 4003*\nTS\n\nMJ 2001\nHH / SA",
      "WMM 2011/ 2012 (O)\nHH / XY\nWMM 4001\nSA\nMJ 2003\nTS / SA",
      "WMM 2005\nAM\nWMM 4002\nTS\nMN 4005\nTS / XY",
      "WMM 2001\nTF\n\nMN 1005\nSA",
      "WMM 4011\nXY\nWMM 4012\nSA\nWMM 4013\nHH",
      "WMM 4012\nSA\n\n\nWMM 4012\nSA"
    ]
  }
];

// Export the data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { timetableData };
}

// Add this at the bottom
console.log('Timetable data:', timetableData); 