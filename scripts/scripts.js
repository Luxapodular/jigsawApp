var numSubgroups = 1;
var numContent = 1; 

function getStudents() {
  var students = $("textarea#students").val();
}

function addContent(obj) {
  callerId = obj.id; 

  nameId = callerId.replace("content-add-button", "content-name-input");
  levelId = callerId.replace("content-add-button", "content-level-input");
  containerId = callerId.replace("content-add-button", "content-container");
  
  
  var nameInput = document.getElementById(nameId); 
  var levelInput = document.getElementById(levelId);

  var name = $("#"+nameId).val(); 
  var level = $("#"+levelId).val(); 

  if (name === "") {
    alert("Please enter a name for your content!"); 
    return; 
  }
  
  if (level === "") {
    alert("Please enter a level for your content!"); 
    return;
  } 
  
  if (!$.isNumeric(level)) {
    alert("Levels can only be numbers! [0-1300]"); 
    return;
  }
  
  var contentDiv = document.createElement('div');
  contentDiv.id = "content-div-" + numContent; 
  contentDiv.className = "content-div"; 
  contentDiv.innerHTML = name + ":" + level; 
  
  var delButton = document.createElement('button'); 
  delButton.id = "content-delete-button-" + numContent;
  delButton.className="content-delete-button";
  delButton.innerHTML = "-"
  delButton.onclick = deleteContent; 
  contentDiv.appendChild(delButton); 

  
  $("#"+containerId).append(contentDiv); 
  
  numContent += 1; 

}

function deleteContent(event) {
  srcId = event.srcElement.id; 
  contentId = srcId.replace("content-delete-button", "content-div"); 
  content = document.getElementById(contentId);
  content.parentNode.removeChild(content); 
}

function addExpertGroup(obj) {
  expertGroupName = $("#expertGroup-name-input").val();
  
  if (expertGroupName === "") {
    alert("Please enter a name for the expert group!");
    return; 
  }
  
  var expertGroupHTML = ` 
      <div class="expertGroup-container">
        <div class="expertGroup-title"><EXPERT_GROUP_TITLE></div>
        <input id="content-name-input-<GROUP_NUMBER>"class="info-input" type="text" placeholder="Content">
        <input id="content-level-input-<GROUP_NUMBER>" class="info-input" type="text" placeholder="Lexile">
        <button id="content-add-button-<GROUP_NUMBER>" type="button" onclick="addContent(this);">Add Content</button>
        <div id="content-container-<GROUP_NUMBER>" class="expert-content-container"></div>
      </div>`
  
  var expertGroupHTML = expertGroupHTML.replace("<EXPERT_GROUP_TITLE>", expertGroupName); 
  var expertGroupHTML = expertGroupHTML.replace(/<GROUP_NUMBER>/g, String(numSubgroups)); 
  
  numSubgroups += 1;
  
  document.getElementById("expertGroup-section").innerHTML += expertGroupHTML; 
  
}

function getExpertGroups() {
  var groupDivs = document.getElementsByClassName("expertGroup-container"); 
  groupDivs = Array.prototype.slice.call(groupDivs); 
  
  var groups = []; 
  groupDivs.forEach(function(elem) {
    var title = $(elem).find(".expertGroup-title").text();
    
    var contents = $(elem).find(".content-div");
    var carray = contents.toArray();
    contentArray =[];
    carray.forEach(function(elem) {
      var inner = elem.innerText; 
      var splitInner = inner.split(":"); 
      var name = splitInner[0].trim();
      var lexile = splitInner[1].trim(); 
      var obj = {name:name, lexile:lexile}; 
      contentArray.push(obj);    
    });
    
    expertGroup = {title:title, contents:contentArray};
    groups.push(expertGroup);
  });
  return groups; 
}

var LEXILE_BUFFER = 100; 

function startSorting() {
  var groups = getExpertGroups(); 
  var students = getStudents();
  var studentGroups = []; 
  
  // Determine max number of students per group. 
  var groupMax = Math.ceil(students.length / groups.length); 
  console.log(groupMax); 
  
  for (var j=0; j<groups.length; j++) {
    studentGroups.push([]); 
  }
  

  //determine max and min lexile levels
  groups.forEach(function(group) {
    var allContent = group.contents; 
    var max = 0; 
    var min = 2000; 
    for (var i=0; i<allContent.length; i++) {
      var con = allContent[i]; 
      if (con.lexile > max) {
        max = con.lexile; 
      } 
      if (con.lexile < min) {
        min = con.lexile; 
      }
    }
    group.max = max; 
    group.min = min; 
  });
  
  //split students into groups 
  students.forEach(function (student) {
    // Attempt to randomly assign to a group that works
    maxAttempts = groups.length * 3; 
    for (var attempt=0; attempt<maxAttempts; attempt++) {
      var randomIndex = Math.floor(Math.random()*groups.length); 
      var group = groups[randomIndex];
      
      if (student.lexile >= (group.lexile-LEXILE_BUFFER)) {
          if (studentGroups[randomIndex].length < groupMax) {
            studentGroups[randomIndex].push(student); 
            break;
          }
      }
      
      //If we couldn't do it randomly...
      if (attempt = maxAttempts-1) {
        for (var i=0; i<groups.length; i++) {
          if (studentGroups[i].length < groupMax) {
            studentGroups[i].push(student); 
            break;
          }
        }
      }
    }
  }); 
  
  displayGroups({groups:groups, studentGroups:studentGroups}) 
}

function displayGroups(obj) {
  var groups = obj.groups; 
  var studentGroups = obj.studentGroups; 
  
  
}