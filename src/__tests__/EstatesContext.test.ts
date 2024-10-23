import { describe, expect, it } from "@jest/globals";
import { ACTIONS } from "../config/constants";
import { estatesReducer, initialState } from "../context/estatesReducer";
import { Estate } from "../types/estate";

describe("EstatesContext reducer", () => {
  it("should add a new estate", () => {
    const newEstate = {
      name: "Test Estate",
      price: 5000000,
      locality: "Praha",
    };

    const newState = estatesReducer(initialState, {
      type: ACTIONS.ADD_ESTATE,
      payload: newEstate as Estate,
    });

    expect(newState.estates).toHaveLength(1);
    expect(newState.estates[0]).toEqual(newEstate);
  });

  it("should edit an existing estate", () => {
    const testState = {
      ...initialState,
      estates: [
        { hash_id: "1", name: "Old Name", locality: "Praha", price: 5000000 },
      ],
    };
    const updatedEstate = {
      hash_id: "1",
      name: "New Name",
      locality: "Praha",
      price: 5000000,
    };

    const newState = estatesReducer(testState, {
      type: ACTIONS.EDIT_ESTATE,
      payload: updatedEstate,
    });

    expect(newState.estates[0].name).toBe("New Name");
  });

  it("should delete en existing estate", () => {
    const testState = {
      ...initialState,
      estates: [
        {
          hash_id: "1",
          name: "Test Estate",
          locality: "Praha",
          price: 5000000,
        },
      ],
    };

    const newState = estatesReducer(testState, {
      type: ACTIONS.DELETE_ESTATE,
      payload: testState.estates[0].hash_id,
    });

    expect(newState.estates.length).toBe(0);
  });

  it("should handle unknown action type", () => {
    const newState = estatesReducer(initialState, {
      type: "UNKNOWN_ACTION",
      payload: "Unknown action",
    });

    expect(newState).toEqual(initialState);
  });
});
