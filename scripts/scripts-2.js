function getStudents() {
  var studentDivs = document.getElementsByClassName("student-div"); 
  studentDivs = Array.prototype.slice.call(studentDivs); 

  studentsAttached = []
  studentDivs.forEach(function (div) {
    studentsAttached.push(div.innerText); 
  });
  
  var students = []
  studentsAttached.forEach(function(elem){
    var splitElem = elem.split(":"); 
    var name = splitElem[0].trim(); 
    var lexile = parseInt(splitElem[1].trim()); 
    students.push({name:name, lexile:lexile}); 
  }); 
  
  return students; 
}

function getStudentsAlternate() {
  var students = $("textarea#students").val();

  var studentList = students.split(","); 
  
  for (var i=0; i<studentList.length; i++) {
    var trimmedStudent = studentList[i].trim();   
  }
}

studentNum = 1; 
function addStudent() {
   var nameInput = document.getElementById("studentNameInput");
    var nameInputValue = nameInput.value;
   var studentLexileInput = document.getElementById("studentLexileInput");
    var studentLexileValue = studentLexileInput.value;
    if (nameInputValue == "") {
      alert("Please enter a name for the Student.")
      return; 
    } else if (studentLexileValue == "" || !$.isNumeric(studentLexileValue)){
      alert("Please enter a Lexile level for the student.")
      return;
    } else {
        studentList=document.getElementById("student-list");
      
        var studentDiv = document.createElement('div');
        studentDiv.id="student-div-"+studentNum
        studentDiv.className = "student-div";
        studentDiv.innerHTML = nameInputValue + ": " + studentLexileValue;
        studentList.appendChild(studentDiv);
        
        var delButton = document.createElement('button');
        delButton.id = "student-delete-button-" + studentNum; 
        delButton.className="content-delete-button";
        delButton.innerText = "-"; 
        studentDiv.appendChild(delButton);
        delButton.onclick= deleteStudent; 
      
        studentNum += 1; 
        
    }

    $('#studentNameInput').val('');
    $('#studentLexileInput').val('');
    
}
 
function deleteStudent(event) {
  srcId = event.srcElement.id; 
  contentId = srcId.replace("student-delete-button", "student-div"); 
  content = document.getElementById(contentId);
  content.parentNode.removeChild(content); 
}
