import { createRef } from "react";

import StationComponent from "./StationComponent";
import { cleanup, fireEvent, render } from "@testing-library/react";

const mockStationList = [
  {
    id: 1,
    name: "台北車站",
  },
  {
    id: 2,
    name: "台大校門口",
  },
  {
    id: 3,
    name: "台積電新竹3廠東側門",
  },
  {
    id: 4,
    name: "台積電台南2廠西側門",
  },
];

describe("StationComponent testing", () => {
  test("test 1", () => {
    const stationRef = createRef(null);

    const { container } = render(
      <StationComponent
        initialStations={[]}
        passengers={[]}
        stationList={mockStationList}
        ref={stationRef}
      />,
    );

    expect(stationRef.current.stations().length).toBe(0);

    expect(fireEvent.click(container.querySelector("button"))).toBe(true);
    expect(stationRef.current.stations().length).toBe(1);

    fireEvent.change(container.querySelector("select"), {
      target: { value: "2" },
    });
    expect(stationRef.current.stations()[0].id).toBe(2);

    fireEvent.change(container.querySelector("input[type=time]"), {
      target: { value: "10:00" },
    });
    expect(stationRef.current.stations()[0].time).toBe("10:00");

    expect(fireEvent.click(container.querySelector("button[id=del]"))).toBe(
      true,
    );
    expect(stationRef.current.stations().length).toBe(0);
  });
});
