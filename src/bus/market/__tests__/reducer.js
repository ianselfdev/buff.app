//Core
import { fromJS, List, Map } from "immutable";

//Actions
import { marketActions } from "../actions";

//Types
import { types } from "../types";

//Reducer
import { marketReducer } from "../reducer";

const initialState = Map({
  market: List(),
  user: List(),
  filters: Map({
    game: "dota"
  }),
  giftCode: ""
});

describe("market reducer: ", () => {
  test("should return initial state by default", () => {
    //* 'void 0' returns undefined - good practice insted of passing undefined itself
    expect(marketReducer(initialState, {})).toEqual(initialState);
  });

  test("should handle FILL_MARKET_ITEMS action", () => {
    expect(
      marketReducer(void 0, {
        type: types.FILL_MARKET_ITEMS,
        payload: [
          { description: "marketItem1", keyTwo: "key1", numeralKey: 1 },
          { description: "marketItem2", keyTwo: "key2", numeralKey: 2 },
          { description: "marketItem3", keyTwo: "key3", numeralKey: 3 }
        ]
      })
    ).toMatchInlineSnapshot(`
Immutable.Map {
  "market": Immutable.List [
    Immutable.Map {
      "description": "marketItem1",
      "keyTwo": "key1",
      "numeralKey": 1,
    },
    Immutable.Map {
      "description": "marketItem2",
      "keyTwo": "key2",
      "numeralKey": 2,
    },
    Immutable.Map {
      "description": "marketItem3",
      "keyTwo": "key3",
      "numeralKey": 3,
    },
  ],
  "user": Immutable.List [],
  "filters": Immutable.Map {},
  "giftCode": "",
}
`);
  });

  test("should handle FILL_USER_ITEMS action", () => {
    expect(
      marketReducer(void 0, {
        type: types.FILL_USER_ITEMS,
        payload: [
          { description: "userItem1", keyTwo: "key1", numeralKey: 1 },
          { description: "userItem2", keyTwo: "key2", numeralKey: 2 },
          { description: "userItem3", keyTwo: "key3", numeralKey: 3 }
        ]
      })
    ).toMatchInlineSnapshot(`
Immutable.Map {
  "market": Immutable.List [],
  "user": Immutable.List [
    Immutable.Map {
      "description": "userItem1",
      "keyTwo": "key1",
      "numeralKey": 1,
    },
    Immutable.Map {
      "description": "userItem2",
      "keyTwo": "key2",
      "numeralKey": 2,
    },
    Immutable.Map {
      "description": "userItem3",
      "keyTwo": "key3",
      "numeralKey": 3,
    },
  ],
  "filters": Immutable.Map {},
  "giftCode": "",
}
`);
  });

  test("should handle FILL_GIFT_CODE action", () => {
    expect(
      marketReducer(void 0, {
        type: types.FILL_GIFT_CODE,
        payload: "string"
      })
    ).toMatchInlineSnapshot(`
Immutable.Map {
  "market": Immutable.List [],
  "user": Immutable.List [],
  "filters": Immutable.Map {},
  "giftCode": "string",
}
`);
  });

  test("should handle ADD_FILTER_PARAMETER action", () => {
    expect(
      marketReducer(void 0, {
        type: types.ADD_FILTER_PARAMETER,
        payload: {
          parameter: "maxPrice",
          value: "42"
        }
      })
    ).toMatchInlineSnapshot(`
Immutable.Map {
  "market": Immutable.List [],
  "user": Immutable.List [],
  "filters": Immutable.Map {
    "maxPrice": "42",
  },
  "giftCode": "",
}
`);
  });

  test("should handle REMOVE_FILTER_PARAMETER action", () => {
    expect(
      marketReducer(initialState, {
        type: types.REMOVE_FILTER_PARAMETER,
        payload: "game"
      })
    ).toMatchInlineSnapshot(`
Immutable.Map {
  "market": Immutable.List [],
  "user": Immutable.List [],
  "filters": Immutable.Map {},
  "giftCode": "",
}
`);

    expect(
      marketReducer(initialState, {
        type: types.REMOVE_FILTER_PARAMETER,
        payload: "maxPrice"
      })
    ).toMatchInlineSnapshot(`
Immutable.Map {
  "market": Immutable.List [],
  "user": Immutable.List [],
  "filters": Immutable.Map {
    "game": "dota",
  },
  "giftCode": "",
}
`);

    expect(
      marketReducer(void 0, {
        type: types.REMOVE_FILTER_PARAMETER,
        payload: "maxPrice"
      })
    ).toMatchInlineSnapshot(`
Immutable.Map {
  "market": Immutable.List [],
  "user": Immutable.List [],
  "filters": Immutable.Map {},
  "giftCode": "",
}
`);
  });
});
