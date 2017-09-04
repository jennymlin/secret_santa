//init variables
var dan = {
  name: "Daniel",
  slug: "mufasa",
  available_matches: null,
  match: null
};
var jen = {
  name: "Jenny",
  slug: "sarabi",
  available_matches: null,
  match: null
};
var tiff = {
  name: "Tiffany",
  slug: "rafiki",
  available_matches: null,
  match: null
};
var judy = {
  name: "Judy",
  slug: "zazu",
  available_matches: null,
  match: null
};
var kun = {
  name: "Kun",
  slug: "timon",
  available_matches: null,
  match: null
};
var caleb = {
  name: "Caleb",
  slug: "pumbaa",
  available_matches: null,
  match: null
};
var baby = {
  name: "Baby",
  slug: "nala",
  available_matches: null,
  match: null
};

//hard-code allowed matches
judy.available_matches = [tiff, dan, caleb, baby];
kun.available_matches = [tiff, jen, caleb, baby];
tiff.available_matches = [jen, dan, judy, baby];
caleb.available_matches = [jen, dan, judy, kun, baby];
jen.available_matches = [judy, kun, caleb];
dan.available_matches = [tiff, kun, caleb];
baby.available_matches = [tiff, judy, kun, caleb];

var people = [dan, jen, tiff, judy, kun, caleb, baby];
var tries = 0;
var hashvalue;

init();
showDebug();

function init() {
  $( document ).ready(function() {
    console.log( "ready!" );
    //pseudo random generator seed
    var seed = "water";
    console.log(seed);
    Math.seedrandom(seed);
    do {
      tries++;
      generateMatches();
    } while (hasSelfAssignments() || hasExtraLoops());
    console.log(tries);
    showResults();
  });
};

//randomly assign matches
function generateMatches() {
  for (i = 0; i < people.length; i++) {
    var j = getRandomInt(0, people[i].available_matches.length - 1);
    people[i].match = people[i].available_matches[j];
    console.log("Tried to match " + people[i].name + " to " + people[i].available_matches[j].name);
  }
};

//check if anyone is assigned to themselves
function hasSelfAssignments() {
  for (j = 0; j < people.length; j++) {
    for (k = j + 1; k < people.length; k++) {
      if (k != j && people[k].match == people[j].match) {
        return true;
      }
    }
  }
  return false;
};

function hasExtraLoops(){
  var counter = 0;
  var originalPerson = people[0];
  var firstPerson = originalPerson;
  var secondPerson;
  while (secondPerson != originalPerson) {
    secondPerson = firstPerson.match;
    firstPerson = people[people.indexOf(secondPerson)];
    counter++;
  }
  // console.log(counter);
  if (counter != people.length){
    return true;
  }
}

/*** DISPLAY FUNCTIONS ***/

//tell user who their match is
function showResults() {
  //get hash value from the URL and display the corresponding match
  hashvalue = window.location.hash.substr(1);
  for (i = 0; i < people.length; i++) {
    if (hashvalue.toLowerCase() == people[i].slug.toLowerCase()) {
      document.getElementById("intro-user").innerHTML = "Hello, " + people[i].name + "!<br><br>Your Secret Santa match is:";
      document.getElementById("intro-match").innerHTML = people[i].match.name;
    }
  }
};

//show all matches
function showDebug() {
  document.getElementById("debugging").style.visibility = "visible";
  document.getElementById("hash-value").innerHTML = hashvalue;

  for (i = 0; i < people.length; i++) {
    document.getElementById("person" + i).innerHTML = people[i].name + ": matched with " + people[i].match.name;
  }
  document.getElementById("duplicates").innerHTML = (hasSelfAssignments()) ? "Yes" : "No";
  document.getElementById("loops").innerHTML = (hasExtraLoops()) ? "Yes" : "No";
  document.getElementById("tries").innerHTML = tries;
};

/*** UTILS ***/

//random integer generator
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
