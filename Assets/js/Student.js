// To load the table display the details from db.json
function loadTable(StudentName='') {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/Students?StudentName_like=${StudentName}`);
    xhttp.send();
   
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = "";
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + object["id"] + "</td>";
          trHTML += "<td>" + object["StudentName"] + "</td>";
          trHTML += "<td>" + object["ClassNo"] + "</td>";
          trHTML += "<td>" + object["SchoolName"] + "</td>";
          trHTML += "<td>" + object["Average"] + "</td>"; 
          trHTML += "<td>" + object["Grade"] + "</td>";
          trHTML +=
            '<td><img width="50px" src="' +
            object["StudentPhoto"] +
            '" class="avatar"></td>';
        // EDIT and DELETE Button
          trHTML +=
            '<td><button type="button" class="btn btn-outline-success" onclick="showUserEditBox(' +
            object["id"] +
            ')">&nbsp&nbsp&nbspEDIT&nbsp&nbsp&nbsp</button>';
          trHTML +=
            '&nbsp&nbsp&nbsp&nbsp<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')">&nbspDELETE&nbsp</button></td>';
          trHTML += "</tr>";
        } 
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();
  // Search 
function search() {
  const StudentName = document.getElementById("searchvalue").value;
  loadTable(StudentName);
}

// To show the dialog box When the ENTER DETAILS button is clicked using sweet Alert
  function showUserCreateBox() {
    Swal.fire({
      title: "Create user",
      html:
      '<input id="StudentID" type="hidden">' +
      '<input id="StudentName" class="swal2-input" placeholder="Student Name">' +
      '<input id="ClassNo" class="swal2-input" placeholder="Class">' +
      '<input id="SchoolName" class="swal2-input" placeholder="School Name">' +
      '<input id="Average" class="swal2-input" placeholder="Average in %">' +
      '<input id="Grade" class="swal2-input" placeholder="Grade A,B,C,D">'+
      '<input id="StudentPhoto" type="file" class="swal2-input" placeholder="Student Photo">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      // To Validate the details entered by the user before creating
      preConfirm: () => {
        const StudentName = document.getElementById("StudentName").value;
        const studentNameRegex = /^[a-zA-Z\- ]{3,50}$/;
        if(!StudentName){
          Swal.showValidationMessage("These Fields Cannot be Empty");
        }
        else if(!studentNameRegex.test(StudentName)){
          Swal.showValidationMessage("Name Shoud atleast be 3 charachters in length ");
        }
        const ClassNo = document.getElementById("ClassNo").value;
         const classRegex = /^[0-9]{1,2}$/;
         if(!ClassNo){
          Swal.showValidationMessage("These Fields Cannot be Empty");
        }
          else if(!classRegex.test(ClassNo)){
           Swal.showValidationMessage("Please enter only Numbers For Class 1-12");
         }
         const SchoolName = document.getElementById("SchoolName").value;
        const schoolNameRegex = /^[a-zA-Z0-9\- ,]{5,100}$/;
        if(!SchoolName){
          Swal.showValidationMessage("These Fields Cannot be Empty");
        }
        else if(!schoolNameRegex.test(SchoolName)){
          Swal.showValidationMessage("Please enter atleast 5 charachters for School Name");
        }
        const Average = document.getElementById("Average").value;
        const averageRegex = /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/;
        if(!Average){
          Swal.showValidationMessage("These Fields Cannot be Empty");
        }
        else if(!averageRegex.test(Average)){
          Swal.showValidationMessage("Enter number between 0-100");
        }
        //  const Grade = document.getElementById("Grade").value;
        // const gradeRegex = /^[A-Z]{1}$/;
        //  if(!Grade){
        //    Swal.showValidationMessage("These Fields Cannot be Empty");
        //  }
        //  else if(!Grade.test(gradeRegex)){
        //    Swal.showValidationMessage("Please Enter any 1 letter A,B,C,D");
        //  }
        else{
      userCreate();}
      },
    });
  }
  
  // This Function is used to post the details to the table after validation
  function userCreate() {
    const StudentName = document.getElementById("StudentName").value;
    const ClassNo = document.getElementById("ClassNo").value;
    const SchoolName = document.getElementById("SchoolName").value;
    const Average = document.getElementById("Average").value;
    const Grade = document.getElementById("Grade").value;
  const StudentPhotoUser = document.getElementById("StudentPhoto").value;
  const StudentPhoto = StudentPhotoUser.files;
  const xhttp = new XMLHttpRequest();
    if (StudentPhoto) {
      const reader = new FileReader();
      reader.onload = function () {
          const dataUrl = reader.result;
          xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                  const objects = JSON.parse(this.responseText);
                  Swal.fire({
                      icon: 'success',
                      title: 'Student Details Entered',
                      text: objects["message"]
                  });
                  loadTable();
              }
          };
    xhttp.open("POST", "http://localhost:3000/Students/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        StudentName: StudentName,
        ClassNo:ClassNo ,
        SchoolName: SchoolName,
        Average: Average,
        Grade:Grade,
        StudentPhoto: dataUrl,
      })
    );
      };
      reader.readAsDataURL(StudentPhoto);
    }
    else{
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire({
          icon: 'success',
          title: 'Student Details Entered',
          text: objects["message"]
      }); 
        loadTable();
      }
    };
    xhttp.open("POST", "http://localhost:3000/Students");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
          StudentName: StudentName,
          ClassNo:ClassNo ,
          SchoolName: SchoolName,
          Average: Average,
          Grade:Grade,
          StudentPhoto: null,
        })
    );
  }
}

// This function is to show the user edit box When the EDIT button is clicked

  function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/Students/${id}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        console.log(objects);
        Swal.fire({
          title: "Edit Student Details",
          html:
            '<input id="id" type="hidden" value="' +
            objects[`${id}`] +
            '">' +
            '<input id="StudentName" class="swal2-input" placeholder="StudentName" value="' +
            objects["StudentName"] +
            '">' +
            '<input id="ClassNo" class="swal2-input" placeholder="ClassNo" value="' +
            objects["ClassNo"] +
            '">' +
            '<input id="SchoolName" class="swal2-input" placeholder="SchoolName" value="' +
            objects["SchoolName"] +
            '">' +
            '<input id="Average" class="swal2-input" placeholder="Average" value="' +
            objects["Average"] +
            '">' +
            '<input id="Grade" class="swal2-input" placeholder="Grade" value="' +
            objects["Grade"] +
            '">',
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonColor: '#d33',
          preConfirm: () => {
            const StudentName = document.getElementById("StudentName").value;
            const studentNameRegex = /^[a-zA-Z\- ]{3,50}$/;
            if(!StudentName){
              Swal.showValidationMessage("These Fields Cannot be Empty");
            }
            else if(!studentNameRegex.test(StudentName)){
              Swal.showValidationMessage("Name Shoud atleast be 3 charachters in length ");
            }
            const ClassNo = document.getElementById("ClassNo").value;
             const classRegex = /^[0-9]{1,2}$/;
             if(!ClassNo){
              Swal.showValidationMessage("These Fields Cannot be Empty");
            }
              else if(!classRegex.test(ClassNo)){
               Swal.showValidationMessage("Please enter only Numbers For Class 1-12");
             }
             const SchoolName = document.getElementById("SchoolName").value;
            const schoolNameRegex = /^[a-zA-Z0-9\- ,]{5,100}$/;
            if(!SchoolName){
              Swal.showValidationMessage("These Fields Cannot be Empty");
            }
            else if(!schoolNameRegex.test(SchoolName)){
              Swal.showValidationMessage("Please enter atleast 5 charachters for School Name");
            }
            const Average = document.getElementById("Average").value;
            const averageRegex = /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/;
            if(!Average){
              Swal.showValidationMessage("These Fields Cannot be Empty");
            }
            else if(!averageRegex.test(Average)){
              Swal.showValidationMessage("Enter number between 0-100");
            }
            else{
            userEdit(id);}
          },
        });
      }
    };
  }
  
  // This function is to post the user edited details to the table
  function userEdit(id) {
    //const id = document.getElementById("id").value;
    const StudentName = document.getElementById("StudentName").value;
    const ClassNo = document.getElementById("ClassNo").value;
    const SchoolName = document.getElementById("SchoolName").value;
    const Average = document.getElementById("Average").value;
    const Grade = document.getElementById("Grade").value;
    console.log(id);
    console.log(StudentName);
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `http://localhost:3000/Students/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    if (StudentPhoto) {
      const reader = new FileReader();
      reader.onload = function () {
          const dataUrl = reader.result;
          xhttp.send(
              JSON.stringify({
                StudentName: StudentName,
                ClassNo:ClassNo ,
                SchoolName: SchoolName,
                Average: Average,
                Grade:Grade,
                StudentPhoto: dataUrl,
              })
          );
      };
      reader.readAsDataURL(StudentPhoto);
  } else{
    xhttp.send(
      JSON.stringify({
       StudentName: StudentName,
       ClassNo:ClassNo ,
       SchoolName: SchoolName,
       Average: Average,
       Grade:Grade,
       StudentPhoto: null,
      })
    );
  }
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        loadTable();
            Swal.fire({
                title: 'Your Change Was Saved',
                text: objects["message"],
                icon: 'success'
            });
      }
    };
  }

// This function is to DELETE the user records when the DELETE button is clicked
  function userDelete(id) {
    console.log(id);
    Swal.fire({
        title: "This Record Will Be Deleted",
        text: "You won't be able to recover this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", `http://localhost:3000/Students/${id}`);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(
                JSON.stringify({
                    id: id,
                })
            );
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const objects = JSON.parse(this.responseText);
                    Swal.fire({
                        title: 'Deleted!',
                        text: objects["message"],
                        icon: 'success'
                    })
                }
            };
        }
    });
}

  