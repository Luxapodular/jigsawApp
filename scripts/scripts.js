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
        <div id="content-container-<GROUP_NUMBER>"></div>
      </div>`
  
  var expertGroupHTML = expertGroupHTML.replace("<EXPERT_GROUP_TITLE>", expertGroupName); 
  var expertGroupHTML = expertGroupHTML.replace(/<GROUP_NUMBER>/g, String(numSubgroups)); 
  
  numSubgroups += 1;
  
  document.getElementById("expertGroup-section").innerHTML += expertGroupHTML; 
  
}