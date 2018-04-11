function getStudentsAlternate() {
  var students = $("textarea#students").val();

  var studentList = students.split(","); 
  
  for (var i=0; i<studentList.length; i++) {
    var trimmedStudent = studentList[i].trim();
    console.log(trimmedStudent);    
  }
}

function addStudent() {
   console.log("hello")
   var nameInput = document.getElementById("studentNameInput");
    var nameInputValue = nameInput.value;
   console.log(nameInputValue);
   var studentLexileInput = document.getElementById("studentLexileInput");
    var studentLexileValue = studentLexileInput.value;
    console.log(studentLexileValue);
    myDiv=document.getElementById("student-list");
    myDiv.innerHTML=nameInputValue+": "+studentLexileValue
    
    //create new student name input box
    var newStudentNameInput = document.createElement("input");
    newStudentNameInput.setAttribute("type", "text");
    newStudentNameInput.setAttribute("placeholder", "Name");
    var studentInputBoxes = document.getElementById("studentInputBoxes")
    studentInputBoxes.appendChild(document.createElement("br"));
    $("#studentInputBoxes").append(newStudentNameInput);
    
    //create new student lexile input box
    var newStudentLexileInput = document.createElement("input");
    newStudentLexileInput.setAttribute("type", "text");
    newStudentLexileInput.setAttribute("placeholder", "Lexile");
    $("#studentInputBoxes").append(newStudentLexileInput);
    
    

}
 