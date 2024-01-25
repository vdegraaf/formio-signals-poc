import { Container } from "react-bootstrap";

import { Form } from "@formio/react";
import step1 from "../IncidentForm-example/step-1";
import step2 from "../IncidentForm-example/step-2";
import step3 from "../IncidentForm-example/step-3";
import step4 from "../IncidentForm-example/step-4";

const Renderer = () => {
  return (
    <>
      <Container style={{ margin: "50px 0" }}>
        <Form form={step1} />
      </Container>
      <Container style={{ margin: "50px 0" }}>
        <Form form={step2} />
      </Container>
      <Container style={{ margin: "50px 0" }}>
        <Form form={step3} />
      </Container>
      <Container style={{ margin: "50px 0" }}>
        <Form form={step4} />
      </Container>
    </>
  );
};
export default Renderer;
