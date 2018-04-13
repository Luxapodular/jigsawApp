function getStudentsAlternate() {
  var students = $("textarea#students").val();

  var studentList = students.split(","); 
  
  for (var i=0; i<studentList.length; i++) {
    var trimmedStudent = studentList[i].trim();
    console.log(trimmedStudent);    
  }
}

studentNum = 1; 
function addStudent() {
   console.log("hello")
   var nameInput = document.getElementById("studentNameInput");
    var nameInputValue = nameInput.value;
   console.log(nameInputValue);
   var studentLexileInput = document.getElementById("studentLexileInput");
    var studentLexileValue = studentLexileInput.value;
    console.log(studentLexileValue);
    if (nameInputValue == "") {
        alert("Please enter a Student")
    } else {
        studentList=document.getElementById("student-list");
      
        var studentDiv = document.createElement('div');
        studentDiv.id="student-div-"+studentNum
        studentDiv.className = "student-div";
        studentDiv.innerHTML = nameInputValue + ": " + studentLexileValue;
        console.log(studentDiv);
        studentList.appendChild(studentDiv);
        console.log(studentList);
        
        var delButton = document.createElement('button');
        delButton.id = "student-delete-button-" + studentNum; 
        delButton.className="content-delete-button";
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
