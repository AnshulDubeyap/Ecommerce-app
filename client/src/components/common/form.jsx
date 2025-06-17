//! Step-24, Create a component common form

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ✅ Corrected import path
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

//! Step-24-1, receive the formControl(received by parent component)

//! Step-24-7, apart from formControl, we will also receive formData, setFormData, onSubmit, and buttonText
function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  //! Step-24-5, the function for rendering the component based in input
  function renderInputByComponentType(getControlItem) {
    //! declare the element variable
    let element = null;

    //! Step-24-10, get the value of the input from formData
    const value = formData[getControlItem.name] || "";

    //! Using switch for guessing the input
    switch (getControlItem.componentType) {
      //! Step-24-5-1, If the component type is input, render the input
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value} //! Step-24-10-1, set the value from formData
            //! Step-24-11, add an onChange handler to the input
            onChange={(event) => {
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              });
            }}
          />
        );
        break;

      //! Step-24-5-2, If the component type is select, render the select
      case "select":
        element = (
          //! Step-24-10-2, set the value of the select from formData
          //! Step-24-11-1, add an onValueChange handler to the select
          <Select
            value={value}
            onValueChange={(value) => {
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      //! Step-24-5-3, If the component type is textarea, render the textarea
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value} //! Step-24-10-3, set the value from formData
            //! Step-24-11-2, add an onChange handler to the textarea
            onChange={(event) => {
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              });
            }}
          />
        );
        break;

      //! Step-24-5-4, As a default case, render the input
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type="text"
            value={value} //! Step-24-10-4, set the value from formData
            //! Step-24-11-3, add an onChange handler to the input
            onChange={(event) => {
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              });
            }}
          />
        );
        break;
    }

    //! Step-24-6, return the element
    return element;
  }

  return (
    //! Step-24-9, add a onSubmit handler to the form and give it the onSubmit prop
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {/* Step-24-2, map over the formControl and display them*/}
        {formControls.map((controlItem) => (
          <div className="w-full grid gap-1ro.5" key={controlItem.name}>
            {/* Step-24-3, Render the label for each of the control item*/}
            <label className="mb-1">{controlItem.label}</label>
            {/* Step-24-4, Render the input for based on the component type by using a function*/}
            {renderInputByComponentType(controlItem)}
          </div>
        ))}
      </div>
      {/* Step-24-8, Add a button and give it buttontext*/}
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
