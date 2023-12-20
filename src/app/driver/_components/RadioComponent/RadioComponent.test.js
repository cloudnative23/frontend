import { createRef } from "react";

import { cleanup, fireEvent, render } from "@testing-library/react";

import RadioComponent from "./RadioComponent";

describe("RadioComponent testing", () => {
  test("test 1", () => {
    const workStatusRef = createRef(null);

    const { container } = render(
      <RadioComponent
        list={[
          { id: "on", text: "上班" },
          { id: "off", text: "下班" },
        ]}
        defaultValue={"on"}
        onChange={(id) => (workStatusRef.current = id)}
      />,
    );

    fireEvent.click(container.querySelector("input[id='off']"));
    expect(workStatusRef.current).toBe("off");
  });
});
