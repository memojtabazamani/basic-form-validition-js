console.log("That Work");
const CLASS_FORMS = ['has-success', 'has-info', 'has-danger', 'has-warning'];

var myForm = document.getElementById("formValidation");

myForm.onsubmit = function (event) {
    // First Stop a submit Form!
    event.stopPropagation();
    event.preventDefault();
    var formGroups = myForm.getElementsByClassName('form-group');

    // First remove all label error from form
    resetClass(formGroups);

    for (var groupIndex = 0, group; group = formGroups[groupIndex++];) {

        /// Check Required!
        checkRequired(group);
    }
}

function resetClass(formGroups) {
    // First remove a label
    for (var i = 0, labelErr; labelErr = myForm.getElementsByClassName("label-error")[i++];) {
        labelErr.remove();
    }

    for(var i =0 , group; group = formGroups[i++];) {
        // Check the name of class and delete there!
        CLASS_FORMS.forEach(function (item) {
            if(group.classList.contains(item)) {
                group.className = group.className.replace(item, "");
            }
        })
    }

}

/*
    This function will be use for required inputs
    In here must be check value of input
    if empty so must show error
    or not show success!
 */
function checkRequired(group) {
    var inputRequired = group.getElementsByClassName("required");
    for (var i=0, element; element = inputRequired[i++];) {
        // IF EMPTY!
        if (element.value === "" || element.value === null) {
            // Generate a label error
            var label = document.createElement("span");
            label.className = "label-error text-danger small";

            // Check this element have a custom message
            var message = "";
            if(element.hasAttribute("messageError")) {
                message = element.getAttribute("messageError");
            } else {
                message = ucFirst(element.name) + " Must Be Entred";
            }

            label.innerHTML = message;
            var parentNode = element.parentNode;
            parentNode.appendChild(label);
            group.className = group.className + " has-warning"; // Add error
        } else { // Add Success
            group.className = group.className + " has-success";
        }
    }
}
// This function return a uppercase first char!
function ucFirst(value) {
    return value.charAt(0).toUpperCase() + value.substr(1);
}