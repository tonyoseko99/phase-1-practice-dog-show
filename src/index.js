document.addEventListener(
    "DOMContentLoaded",
    () => {
      function fetchDogs() {
        fetch("http://localhost:3000/dogs")
          .then((resp) => resp.json())
          .then((data) => data.forEach((dog) => renderDog(dog)));
      }
      function renderDog(dog) {
        const tableBody = document.querySelector("#table-body");
        const newRow = document.createElement("tr");
        const newNameData = document.createElement("td");
        const newBreedData = document.createElement("td");
        const newSexData = document.createElement("td");
        const newEditDogData = document.createElement("td");
        const editDogBttn = document.createElement("button");
        editDogBttn.innerText = "Edit Dog";
        tableBody.append(newRow);
        newRow.append(newNameData, newBreedData, newSexData, newEditDogData);
        newNameData.innerText = dog.name;
        newBreedData.innerText = dog.breed;
        newSexData.innerText = dog.sex;
        newRow.id = dog.id;
        newEditDogData.append(editDogBttn);
        editDogBttn.addEventListener("click", function () {
          const form = document.querySelector("#dog-form");
          const nameInput = document.querySelector("#dog-form").firstElementChild;
          const breedInput =
            document.querySelector("#dog-form").firstElementChild
              .nextElementSibling;
          const sexInput =
            document.querySelector("#dog-form").firstElementChild
              .nextElementSibling.nextElementSibling;
          const nameCell = newRow.firstElementChild;
          const breedCell = newRow.firstElementChild.nextSibling;
          const sexCell = newRow.firstElementChild.nextSibling.nextSibling;
          nameInput.value = nameCell.innerText;
          breedInput.value = breedCell.innerText;
          sexInput.value = sexCell.innerText;
          const newDogObj = {};
          form.addEventListener("submit", function (e) {
            e.preventDefault();
            newDogObj.id = dog.id;
            newDogObj.name = nameInput.value;
            newDogObj.breed = breedInput.value;
            newDogObj.sex = sexInput.value;
            //const nameCell = document.querySelector(`#${dog.name}`);
            //const breedCell = document.querySelector(`#${dog.name + dog.id}`);
            //const sexCell = document.querySelector(`#${dog.sex + dog.id}`);
            //nameCell.innerText = newDogObj.name;
            //breedCell.innerText = newDogObj.breed;
            //sexCell.innerText = newDogObj.sex;
  
            fetch(`http://localhost:3000/dogs/${dog.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newDogObj),
            })
              .then((resp) => resp.json())
              .then((data) => updateRow(data));
            //fetchDogs();
          });
        });
        function updateRow(dog) {
          const nameCell = newRow.firstElementChild;
          const breedCell = newRow.firstElementChild.nextSibling;
          const sexCell = newRow.firstElementChild.nextSibling.nextSibling;
          nameCell.innerText = dog.name;
          breedCell.innerText = dog.breed;
          sexCell.innerText = dog.sex;
          const form = document.querySelector("#dog-form");
          form.reset();
        }
      }
      fetchDogs();
    }
);