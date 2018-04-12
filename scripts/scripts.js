var numSubgroups = 1;

function getStudents() {
  var students = $("textarea#students").val();
  console.log(students.split(",")); 
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
  
  var contentDiv = document.createElement('div'); 
  contentDiv.className = "content-div"; 
  contentDiv.innerHTML = name + ":" + level; 
  
  var delButton = document.createElement('button'); 
  delButton.className="content-delete-button";
  contentDiv.appendChild(delButton); 
  
  $("#"+containerId).append(contentDiv); 

  console.log(name+":"+level); 
}