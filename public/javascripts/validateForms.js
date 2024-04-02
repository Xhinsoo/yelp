
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".validated-form");

  // Loop over them and prevent submission
  Array.from(forms) //make array of form
    .forEach(function (form) {
      //call forEach of the array
      form.addEventListener(
        "submit",
        (event) => {
          //add eL to each form
          if (!form.checkValidity()) {
            //check each form validity, if return false, stop form submission and propagation
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
})();
