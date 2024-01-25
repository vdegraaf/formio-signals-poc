import React, { useState } from "react";
import { ReactComponent } from "@formio/react";
import settingsForm from "./Input.settingsForm";
import { createRoot } from "react-dom/client";
import "../styles.css";

const CustomInput = (props) => {
  const [value, setValue] = useState(props.value);

  return <textarea onClick={setValue} />;
};

/**
 * An example React component
 * source: https://codesandbox.io/p/sandbox/custom-formio-component-in-react-81qb6?file=%2Fsrc%2FCustom%2FToggle%2Findex.js
 *
 * Replace this with your custom react component. It needs to have two things.
 * 1. The value should be stored is state as "value"
 * 2. When the value changes, call props.onChange(null, newValue);
 *
 * notes:
 * - changed ReactDom.create since it doesn't exist in react 18> anymore.
 * - not sure if detachReact method is necessary
 *
 * This component is very simple. When clicked, it will set its value to "Changed".
 */

export default class Toggle extends ReactComponent {
  /**
   * This function tells the form builder about your component. It's name, icon and what group it should be in.
   *
   * @returns {{title: string, icon: string, group: string, documentation: string, weight: number, schema: *}}
   */
  static get builderInfo() {
    return {
      title: "Custom input",
      icon: "square",
      group: "Data",
      documentation: "",
      weight: -10,
      schema: Toggle.schema(),
    };
  }

  /**
   * This function is the default settings for the component. At a minimum you want to set the type to the registered
   * type of your component (i.e. when you call Components.setComponent('type', MyComponent) these types should match.
   *
   * @param sources
   * @returns {*}
   */
  static schema() {
    return ReactComponent.schema({
      type: "customInput",
      label: "Default Label",
    });
  }

  /*
   * Defines the settingsForm when editing a component in the builder.
   */
  static editForm = settingsForm;

  /**
   * This function is called when the DIV has been rendered and added to the DOM. You can now instantiate the react component.
   *
   * @param DOMElement
   * #returns ReactInstance
   */
  attachReact(element) {
    const root = createRoot(element);

    return root.render(
      <CustomInput
        component={this.component} // These are the component settings if you want to use them to render the component.
        value={this.dataValue} // The starting value of the component.
        onChange={this.updateValue} // The onChange event to call when the value changes.
      />
    );
  }

  /**
   * Automatically detach any react components.
   *
   * @param element
   */
  //   detachReact(element) {
  //     if (element) {
  //       root.unmout(element);
  //       ReactDOM.unmountComponentAtNode(element);
  //     }
  //   }
}
