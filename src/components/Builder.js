import { Form, FormBuilder, Formio, Components } from "@formio/react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import ReactJson from "react-json-view";
import "../styles/Builder.css";

import step1 from "../IncidentForm-example/step-1";

import components from "./Custom";

Components.setComponents(components);

// Get the HTMLComponent from the components listing.
const HTMLComponent = Formio.Components.components.htmlelement;

/**
 * Create a Header compoennt and extend from the HTMLComponent.
 */
class HeaderComponent extends HTMLComponent {
  /**
   * Define the default schema to change the type and tag and label.
   */
  static schema(...extend) {
    return HTMLComponent.schema(
      {
        label: "Header",
        type: "header",
        tag: "h1",
      },
      ...extend
    );
  }

  static get builderInfo() {
    return {
      title: "Header",
      group: "layout",
      icon: "code",
      weight: 2,
      documentation: "/userguide/#html-element-component",
      schema: HeaderComponent.schema(),
    };
  }
}

/**
 * Change the edit form to make the "tag" component a select dropdown
 * instead of a textfield so that they can only configure the "h2" fields.
 */
HeaderComponent.editForm = (...args) => {
  const editForm = HTMLComponent.editForm(...args);
  const tagComponent = Formio.Utils.getComponent(editForm.components, "tag");
  tagComponent.type = "select";
  tagComponent.dataSrc = "values";
  tagComponent.data = {
    values: [
      { label: "H1", value: "h1" },
      { label: "H2", value: "h2" },
      { label: "H3", value: "h3" },
      { label: "H4", value: "h4" },
      { label: "H5", value: "h5" },
    ],
  };
  return editForm;
};

Formio.Components.addComponent("header", HeaderComponent);

const Builder = () => {
  const [jsonSchema, setSchema] = useState(step1);
  console.log("---  jsonSchema:", jsonSchema);
  const onFormChange = (schema) => {
    setSchema({ ...schema, components: [...schema.components] });
  };

  /** Custom Builder */
  // Formio.builder(
  //   document.getElementById("builder"),
  //   {},
  //   {
  //     builder: {
  //       basic: false,
  //       advanced: false,
  //       data: false,
  //       customBasic: {
  //         title: "Basic Components",
  //         default: true,
  //         weight: 0,
  //         components: {
  //           textfield: true,
  //           textarea: true,
  //           email: true,
  //           phoneNumber: true,
  //         },
  //       },
  //       custom: {
  //         title: "User Fields",
  //         weight: 10,
  //         components: {
  //           firstName: {
  //             title: "First Name",
  //             key: "firstName",
  //             icon: "terminal",
  //             schema: {
  //               label: "First Name",
  //               type: "textfield",
  //               key: "firstName",
  //               input: true,
  //             },
  //           },
  //           lastName: {
  //             title: "Last Name",
  //             key: "lastName",
  //             icon: "terminal",
  //             schema: {
  //               label: "Last Name",
  //               type: "textfield",
  //               key: "lastName",
  //               input: true,
  //             },
  //           },
  //           email: {
  //             title: "Email",
  //             key: "email",
  //             icon: "at",
  //             schema: {
  //               label: "Email",
  //               type: "email",
  //               key: "email",
  //               input: true,
  //             },
  //           },
  //           phoneNumber: {
  //             title: "Mobile Phone",
  //             key: "mobilePhone",
  //             icon: "phone-square",
  //             schema: {
  //               label: "Mobile Phone",
  //               type: "phoneNumber",
  //               key: "mobilePhone",
  //               input: true,
  //             },
  //           },
  //         },
  //       },
  //       layout: {
  //         components: {
  //           table: false,
  //         },
  //       },
  //     },
  //     editForm: {
  //       textfield: [
  //         {
  //           key: "api",
  //           ignore: true,
  //         },
  //       ],
  //     },
  //   }
  // ).then(function (builder) {
  //   builder.on("saveComponent", function () {
  //     console.log(builder.schema);
  //   });
  // });

  // return (<FormBuilder form={jsonSchema} onChange={onFormChange} )

  return (
    <>
      <FormBuilder
        form={jsonSchema}
        onChange={onFormChange}
        options={{
          builder: {
            basic: {
              components: {
                toggleCustomComp: true,
                customInput: true,
              },
            },
            advanced: false,
          },
        }}
      />

      {/* Custom builder */}
      {/* <div id="builder" form={jsonSchema} onChange={onFormChange} /> */}
      <Card title="Form JSON Schema" className="my-4">
        <Card.Body>
          <Card.Title className="text-center">As JSON Schema</Card.Title>
          <ReactJson src={jsonSchema} name={null} collapsed={true}></ReactJson>
        </Card.Body>
      </Card>
      <Card className="my-4">
        <Card.Body>
          <Card.Title className="text-center">As Rendered Form</Card.Title>
          <Form form={jsonSchema} />
        </Card.Body>
      </Card>
    </>
  );
};

export default Builder;
