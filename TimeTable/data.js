// Initial timetable data
const timetableData = [
  {
    day: "Monday",
    periods: [
      "WMM 2001\nSA\n\nXO5004\nSA\n\nMJ 4001\nTF / XY",
      "WMM 2005\nAM\n\nMJ5002\nAM\n\nMJ 4002*\nXY / XZ",
      "WMM 2006\nTF\n\nWSBOMJ5003\nTF\n\nMJ 2001\nHH / SA",
      "WMM 2011 / 2012 (O)\nHH / XY\n\nMN 4004\nTF / AM",
      "WMM 2002\nTS\n\nMJ 2003\nTS / XY",
      "WMM 4003\nTF\nWMM 4011\nXY\n\nWSBOMJ5001\nTF\n\nMN 2004\nHH / SA",
      "WMM 4012\nSA/ RS\nWMM 4013\nHH\n\nGE 2006\nTF / SA",
      "GE 4006\nSA / AM",
      "VAC 4007\nHH / XY"
    ]
  },
  {
    day: "Tuesday",
    periods: [
      "WMM 2001\nSA\n\nXO5004\nSA\n\nMJ 4001\nTF / XY",
      "WMM 2002\nTS\n\nMJ 4002*\nXY / XZ",
      "WMM 2005\nAM\n\nMJ5002\nAM\n\nMJ 2001\nHH / SA",
      "WMM 2006\nTF\n\nWSBOMJ5003\nTF\n\nMN 4004\nTF / AM",
      "WMM 4004\nHH\n\nMJ 2003\nTS / XY",
      "WMM 2011 / 2012 (O)\nHH / XY\n\nWSBOMJ5001\nTF\n\nMN 2005\nTS / RS",
      "WMM 4003\nTF\nWMM 4011\nXY\n\nGE 2006\nTF / SA",
      "WMM 4012\nSA/ RS\nWMM 4013\nHH\n\nGE 4006\nSA / AM",
      "VAC 4007\nHH / XY"
    ]
  },
  {
    day: "Wednesday",
    periods: [
      "XO5004\nSA\n\nMJ 4001\nTF / XY",
      "MJ5002\nAM\n\nMJ 2002\nTF / SA",
      "WMM 2002\nTS\nWMM 4002\nTS\n\nWSBOMJ5003\nTF\n\nMJ 4003\nTS",
      "WMM 2006\nTF\n\nMN 2004\nHH / SA",
      "WMM 4004\nHH\n\nMN 4004\nTF / AM",
      "XO5007\nSA\n\nMJ 2002\nTF / SA",
      "WMM 4003\nTF\n\nWSBOMJ5001\nTF\n\nMN 2005\nTS / RS",
      "WMM 4011\nXY\nWMM 4013\nHH\n\nGE 4006\nSA / AM",
      "VAC 4007*"
    ]
  },
  {
    day: "Thursday",
    periods: [
      "XO5004\nSA\n\nMJ 4001\nTF / XY",
      "MJ5002\nAM\n\nMJ 2002\nTF / SA",
      "WMM 2002\nTS\nWMM 4002\nTS\n\nMJ 4003\nTS",
      "WMM 2006\nTF\n\nWSBOMJ5003\nTF\n\nMN 2004\nHH / SA",
      "WMM 4004\nHH\n\nMN 4004\nTF / AM",
      "XO5007\nSA\n\nMJ 2002\nTF / SA",
      "WMM 4003\nTF\n\nWSBOMJ5001\nTF\n\nMN 2005*",
      "GE 4006\nSA / AM",
      "VAC 4007*"
    ]
  },
  {
    day: "Friday",
    periods: [
      "VOC5008\nTF/ SA (WC)\n\nMJ 4002\nXY / XZ",
      "WMM 4001\nTF\n\nMJ 2001\nHH / SA",
      "WMM 2011/ 2012 (O)\nHH / XY\n\nMJ 4003*\nTS",
      "WMM 4001\nSA\n\nMJ 2003*",
      "WMM 2005\nAM\n\nMN 4005\nTS / XY",
      "WMM 4002\nTS\n\nMN 2004\nHH / SA",
      "WMM 2001\nTF\nWMM 4004\nHH\n\nMN 2005*",
      "",
      ""
    ]
  },
  {
    day: "Saturday",
    periods: [
      "VOC5008\nSA (WC) / TF\n\nMJ 4002\nXY / XZ",
      "WMM 4001\nTF\n\nMJ 2001\nHH / SA",
      "WMM 2011/ 2012 (O)\nHH / XY\n\nMJ 4003*\nTS",
      "WMM 4001\nSA\n\nMJ 2003*",
      "WMM 2005\nAM\n\nMN 4005\nTS / XY",
      "WMM 4002\nTS",
      "WMM 2001\nTF\nWMM 4011\nXY\nWMM 4012\nSA\nWMM 4013\nHH",
      "WMM 4012\nSA",
      ""
    ]
  }
]; 