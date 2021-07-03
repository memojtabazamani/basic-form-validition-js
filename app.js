console.log("That Work");
const CLASS_FORMS = ['has-success', 'has-info', 'has-danger', 'has-warning'];

var myForm = document.getElementById("formValidation");
var arSuccess = true;
myForm.onsubmit = function (event) {
    // First Stop a submit Form!
    arSuccess = true;
    event.stopPropagation();
    event.preventDefault();
    var formGroups = myForm.getElementsByClassName('form-group');

    for (var groupIndex = 0, group; group = formGroups[groupIndex++];) {

        /// Check Required!
        checkRequired(group);
        if(arSuccess)
        {   checkNumeric(group); }

    }
}

function resetClass(group) {
        // Check the name of class and delete there!
        CLASS_FORMS.forEach(function (item) {
            if(group.classList.contains(item)) {
                group.className = group.className.replace(item, "");
            }
        })
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
        var parentNode = element.parentNode;
        // IF EMPTY!
        console.log(parentNode.getElementsByClassName('label-error'));
        if ( element.value === ""  &&
            (parentNode.getElementsByClassName('label-error').length == 0)) {
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

            parentNode.appendChild(label);
            group.className =  "has-warning " +  group.className; // Add error
            arSuccess = false;
        } else if(  element.value !== "" ) { // Add Success
            resetClass(group);
            group.className = group.className + " has-success";
            console.log(parentNode);
            if(parentNode.getElementsByClassName('label-error').length >= 1) {
                parentNode.getElementsByClassName('label-error')[0].remove();
            }
        }
    }
}
function checkNumeric(group) {
    var inputRequired = group.getElementsByClassName("numeric");
    for (var i=0, element; element = inputRequired[i++];) {
        var parentNode = element.parentNode;
        // IF EMPTY!
        console.log(parentNode.getElementsByClassName('label-error'));
        if (isNaN(element.value) == true &&
            (parentNode.getElementsByClassName('label-error').length == 0)) {
            // Generate a label error
            var label = document.createElement("span");
            label.className = "label-error text-danger small";

            // Check this element have a custom message
            var message = "";
            if(element.hasAttribute("messageError")) {
                message = element.getAttribute("messageError");
            } else {
                message = ucFirst(element.name) + " Must Be A Number";
            }

            label.innerHTML = message;

            parentNode.appendChild(label);
            group.className =  "has-warning " +  group.className; // Add error
        } else if(  isNaN(element.value) == false ) { // Add Success
            resetClass(group);
            group.className = group.className + " has-success";
            console.log(parentNode);
            if(parentNode.getElementsByClassName('label-error').length >= 1) {
                parentNode.getElementsByClassName('label-error')[0].remove();
            }
        }
    }
}
// This function return a uppercase first char!
function ucFirst(value) {
    return value.charAt(0).toUpperCase() + value.substr(1);
}