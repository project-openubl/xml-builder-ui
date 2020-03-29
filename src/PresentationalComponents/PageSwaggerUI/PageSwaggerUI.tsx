import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text
} from "@patternfly/react-core";
import { IframeComponent } from "../IframeComponent";

interface Props {}

export const PageSwaggerUI: React.FC<Props> = () => {
  // This will work only when it is deployed inside xml-builder Quarkus
  // const origin = `http://localhost:8080/swagger-ui/`;
  const origin = `${window.location.origin}/swagger-ui/`;
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">OpenAPI v3</Text>
          <Text component="small">
            Interactúa con todos los endpoints utilizando las herramientas que
            te ofrecemos.
          </Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <IframeComponent
          title="Swagger UI"
          src={origin}
          height="100%"
          width="100%"
        />
      </PageSection>
    </React.Fragment>
  );
};
