function countDownOne(){
    var weekOne = {
      Mon: {
        1000: "PC LAB",
        1050: "PC LAB",
        1140: "CO(Deepti Sharma)",
        1230: "OS(Diksha Shukla)",
        1320: "LUNCH",
        1420: "DM(Ram Avatar)",
        1510: "CCP(Suman Lata)"
      },
      Tue: {
        1050: "OS(Diksha Shukla)",
        1140: "CCP(Suman Lata)",
        1230: "CCP(Suman Lata)",
        1320: "LUNCH",
        1420: "FOM(Sonam Gupta)",
        1510: "IJP(Amit Seth)"
      },
      Wed: {
        1050: "CO(Deepti Sharma)",
        1140: "OS(Diksha Shukla)",
        1230: "CCP(Suman Lata)",
        1320: "LUNCH",
        1420: "FOM(Sonam Gupta)",
        1510: "IJP(Amit Seth)"
      },
      Thu: {
        1050: "DM(Ram Avatar",
        1140: "CO(Deepti Sharma)",
        1230: "CCP(Suman Lata)",
        1320: "LUNCH",
        1420: "FOM(Sonam Gupta)",
        1510: "OS(Diksha Shukla)",
      },
      Fri: {
        1050: "IJP(Amit Seth)",
        1230: "CO(Deepti Sharma)",
        1320: "LUNCH",
        1420: "FOM(Sonam Gupta)",
      },
      Sat: {
        1000: "DM(Ram Avatar)",
        1050: "IJP(Amit Seth)",
        1140: "IJP Lab(Amit Seth)",
        1230: "IJP Lab(Amit Seth)",
        1320: "LUNCH",
        1420: "CCP(Suman Lata)"
      },
      Sun: {}
    }
  
    var nowOne = new Date();
    var todayOne = new Date().toString().slice(0, 16);
    var dayOne = new Date().toString().slice(0,3);
    var timeOne = new Date().toString().slice(16,21);
    timeOne = timeOne.replace(":", "");
  
    // Display next day time table if time is more than 04:30 PM
    if(timeOne > 1600) {
      var dayOne = new Date(nowOne.getTime() + (24 * 60 * 60 * 1000)).toDateString().slice(0,3);
      document.getElementById("today").textContent = "Tomorrow";
      document.getElementById("nextClassOne").textContent = "All the classes are over!"
    }
  
    if(dayOne === "Sun") {
      document.getElementById("nextClassOne").textContent = "It's Sunday! Go get some sleep."
    }
  
  
    var eventDate = Object.keys(weekOne[dayOne]);
  
    // iterate to latest time
    for (var i in eventDate) {
      if(parseInt(timeOne) < parseInt(eventDate[i])) {
        timeOne = eventDate[i];
        break;
      }
    }
  
    // Convert class time strings to actual dates (doesn't work past midnight yet)
    for(var i=0, l=eventDate.length; i<l; i++){
      for (var x in eventDate) {
        // convert 9  to 09
        if(parseInt(eventDate[i])==9) {
          eventDate[i] = "0" + eventDate[i];
        }
      }
      eventDate[i] = new Date(todayOne+" "+ `${Math.floor(eventDate[i]/100)}`+ `:${Math.floor(eventDate[i]%100)}`);    
    }
  
  
    var currentTime = nowOne.getTime();
    var eventTime = 0;
    for(var i=0, l=eventDate.length; i<l; i++){
      eventTime = eventDate[i].getTime();
  
      if(eventTime>currentTime) {
        
        var remTime = eventTime - currentTime;
        break;
      }
    }
  
    var s = Math.floor(remTime/1000);
    var m = Math.floor(s/60);
    var h = Math.floor(m/60);
    var d = Math.floor(h/24);
  
    h %= 24;
    m %= 60;
    s %= 60;
  
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
  
  
    if(weekOne[dayOne][timeOne] != undefined) {
      document.getElementById("hoursOne").textContent = h + " h";
      document.getElementById("minutesOne").textContent = m + " m";
      document.getElementById("secondsOne").textContent = s + " s";
      document.getElementById("nextClassOne").textContent = weekOne[dayOne][timeOne];
    }
  
  
    classId = ["ten", "tenFifty", "elevenForty", "twelveThirty", "oneTwenty", "twoTwenty", "threeTen"];
  var key = 1000;
  // var dayToday = new Date().toString().slice(0,3);
  for (var x in classId) {
    if(weekOne[dayOne][key] != undefined) {
      // document.getElementById("currentClassSectionOne").textContent = weekOne[dayToday][String(key)]
      document.getElementById(classId[x]).textContent = weekOne[dayOne][String(key)];
    } else {
      document.getElementById(classId[x]).textContent = "No Class, Yay!"
    }
    if(key == 1050) {
      key += 90;
    } else if (key == 1140){
      key += 90;
    }else if(key == 1230) {
      key+=90 ; 
    }else if(key == 1320) {
      key+=100 ; 
    }else if(key == 1420) {
      key+=90 ; 
    }else if(key == 1310) {
      key+=90 ; 
    }else {
      key += 100 - 50;
    }
  }
  setTimeout(countDownOne, 1000);
}

countDownOne()