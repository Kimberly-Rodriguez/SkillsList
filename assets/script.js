$(document).ready(function () {
  let formEl = $("#skills-form");
  let nameInputEl = $("#skill-name");
  let dateInputEl = $("#datepicker");
  let skillsListEl = $("#skills-list");
  let tableBody = $("#repo-table");
  let fetchButton = $("#fetch-button");

  // creating a funtion that dinamically creates a list of skills that have a name and date
  let printSkills = function (name, date) {
    let listEl = $("<li>");
    let listDetail = name.concat(" on ", date);
    listEl.addClass("list-group-item").text(listDetail);
    listEl.appendTo(skillsListEl);
  };

  // creating an event prevent default for the input form
  let handleFormSubmit = function (event) {
    event.preventDefault();

    // getting the value for name and date and setting them up as nameInput & dateInput
    let nameInput = nameInputEl.val();
    let dateInput = dateInputEl.val();

    // creating and if statment to check if name/date input have been sumbited if funtion is returned
    if (!nameInput || !dateInput) {
      console.log("You need to fill out the form!");
      return;
    }

    // name/date input are being past to the printSkills function
    printSkills(nameInput, dateInput);
    // then name/date inputEl is being cleared so that next input start fresh
    nameInputEl.val("");
    dateInputEl.val("");
  };

  formEl.on("submit", handleFormSubmit);

  // Autocomplete widget
  $(function () {
    let skillNames = [
      "Bootstrap",
      "C",
      "C++",
      "CSS",
      "Express.js",
      "Git",
      "HTML",
      "Java",
      "JavaScript",
      "jQuery",
      "JSON",
      "MySQL",
      "Node.js",
      "NoSQL",
      "PHP",
      "Python",
      "React",
      "Ruby",
    ];
    $("#skill-name").autocomplete({
      source: skillNames,
    });
  });

  // Datepicker widget
  $(function () {
    $("#datepicker").datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });

  // Add interaction here
  $(function () {
    $("#skills-list").sortable({
      placeholder: "ui-state-highlight",
    });
    $("#skills-list").disableSelection();
  });
 
  //fetch request to the github url 
  fetchButton.on("click", async () => {
    let requestUrl = "https://api.github.com/orgs/nodejs/repos";
    let response = await fetch(requestUrl);

    response = await response.json();
    response.forEach((data) => {
      let url = data.html_url;
      tableBody.append(`<tr><td><a href="${url}">${url}</a></td></tr>`);
    });
  });
});
