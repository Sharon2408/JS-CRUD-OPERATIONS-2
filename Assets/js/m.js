const StudentName = document.getElementById("StudentName").value;
const ClassNo = document.getElementById("ClassNo").value;
const SchoolName = document.getElementById("SchoolName").value;
const Average = document.getElementById("Average").value;
const Grade = document.getElementById("Grade").value;
const studentNameRegex = /^[a-zA-Z\- ]{3,50}$/;
const classRegex = /^[0-9]{1,2}$/;
const schoolNameRegex = /^[a-zA-Z0-9\- ,]{5,100}$/;
const averageRegex = /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/;
const gradeRegex = /^[A-Z]{1}$/;
        if(!StudentName|| !ClassNo||!SchoolName||!Average||!Grade){
          Swal.showValidationMessage("These Fields Cannot be Empty");
        }
        else if(!studentNameRegex.test(StudentName)){
          Swal.showValidationMessage("Name Shoud atleast be 3 charachters in length ");
        }
        else if(!classRegex.test(ClassNo)){
            Swal.showValidationMessage("Please enter only Numbers For Class 1-12");
          }
          else if(!schoolNameRegex.test(SchoolName)){
            Swal.showValidationMessage("Please enter atleast 5 charachters for School Name");
          }
          else if(!gradeRegex.test(Grade)) {
            Swal.showValidationMessage("Please Enter any 1 letter A,B,C,D");
          }
          else if(!averageRegex.test(Average)){
            Swal.showValidationMessage("Enter number between 0-100");
          }













          
        // Average Validation
       
        
       
        if(!Average ){
          Swal.showValidationMessage("These Fields Cannot be Empty");
        }
      
        // Grade Validation
       
      
        if (!Grade){
          Swal.showValidationMessage("These Fields Cannot be Empty");
        }
        
        // Class No Validation
        
         
         if(!ClassNo){
          Swal.showValidationMessage("These Fields Cannot be Empty");
        }
          
         // School Name Validation
        
         
         if(!SchoolName){
           Swal.showValidationMessage("These Fields Cannot be Empty");
         }
        