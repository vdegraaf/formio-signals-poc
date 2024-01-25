import baseEditForm from "formiojs/components/_classes/component/Component.form";

const settings = (...extend) => {
  return baseEditForm(
    [
      {
        key: "display",
        components: [
          {
            // You can ignore existing fields.
            key: "placeholder",
            value: "Type hier je bericht",
          },
          {
            // Or add your own. The syntax is form.io component definitions.
            type: "textfield",
            input: true,
            label: "My Custom Input",
            weight: 12,
            key: "myCustomSettingInput", // This will be available as component.myCustomSetting
          },
        ],
      },
      {
        key: "data",
        components: [],
      },
      {
        key: "validation",
        components: [],
      },
      {
        key: "api",
        components: [],
      },
      {
        key: "conditional",
        components: [],
      },
      {
        key: "logic",
        components: [],
      },
    ],
    ...extend
  );
};

export default settings;
