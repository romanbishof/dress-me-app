import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const getClosetDataAsync = createAsyncThunk(
  "closet/getClothesAsync",
  async () => {
    const storedData = localStorage.getItem("closetData");
    let res;
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      res = await axios.get(
        `https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94`
      );
      const newData = res.data;
      // Compare the fetched data with the stored data
      if (JSON.stringify(newData) !== JSON.stringify(parsedData)) {
        // Update local storage with new data
        localStorage.setItem("closetData", JSON.stringify(newData));
      }
      return newData;
    } else {
      res = await axios.get(
        `https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94`
      );
      const data = res.data;
      // Save initial data in local storage
      localStorage.setItem("closetData", JSON.stringify(data));
      return data;
    }
  }
);

const countClothes = (data, type) => {
  return data.reduce((count, item) => {
    if (item.type === type) {
      return count + 1;
    }
    return count;
  }, 0);
};

function filterSizesColors(data) {
  const typeObjects = {};

  data.forEach((item) => {
    const item_type = item.type;
    const item_size = item.size;
    const item_color = item.color;

    if (!typeObjects[item_type]) {
      typeObjects[item_type] = { sizes: [], colors: [] };
    }

    if (!typeObjects[item_type].sizes.includes(item_size)) {
      typeObjects[item_type].sizes.push(item_size);
    }

    if (!typeObjects[item_type].colors.includes(item_color)) {
      typeObjects[item_type].colors.push(item_color);
    }
  });

  return typeObjects;
}

function checkEmptyObjects(set) {
  for (let item in set) {
    if (Object.keys(set[item]).length === 0) {
      return false;
    }
  }
  return true;
}

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "short" });
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

const initialValues = {
  data: [],
  shirts: 0,
  pants: 0,
  shoes: 0,
  filterSelection: {
    shoes: false,
    shirt: false,
    pants: false,
  },
  lengthOfData: 0,
  shirtSelected: true,
  pantsSelected: true,
  shoesSelected: true,
  itemsTypesObj: {},
  garmentsPage: false,
  selectedColor: "",
  selectedSize: "",
  sets: [],
  set: {
    shirt: {},
    pants: {},
    shoes: {},
  },
};

const ClosetDataSlice = createSlice({
  name: "ClosetData",
  initialState: initialValues,
  reducers: {
    filterSelectionFrom: (state, action) => {
      switch (action.payload) {
        case "shirt":
          state.filterSelection = {
            ...state.filterSelection,
            shirt: !state.filterSelection.shirt,
          };

          break;
        case "pants":
          state.filterSelection = {
            ...state.filterSelection,
            pants: !state.filterSelection.pants,
          };
          break;
        case "shoes":
          state.filterSelection = {
            ...state.filterSelection,
            shoes: !state.filterSelection.shoes,
          };
          break;

        default:
          break;
      }
    },
    returnHome: (state, action) => {
      state.filterSelection = {
        shoes: false,
        shirt: false,
        pants: false,
      };
      state.garmentsPage = false;
    },
    navigateToGarments: (state, action) => {
      state.garmentsPage = true;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    buildSet: (state, action) => {
      switch (action.payload.type) {
        case "shirt":
          {
            let temp = checkEmptyObjects(state.set);

            if (temp) {
              // let date = getCurrentDate();
              // state.set["date"] = date;
              // state.sets = [...state.sets, state.set];
              // state.set = {
              //   shirt: {},
              //   pants: {},
              //   shoes: {},
              // };
            } else {
              state.set.shirt = action.payload;
            }
          }
          break;
        case "pants":
          {
            let temp = checkEmptyObjects(state.set);

            if (temp) {
              // let date = new Date().toLocaleDateString();
              // state.set["date"] = date;
              // state.sets.push(state.set);
              // state.set = {
              //   shirt: {},
              //   pants: {},
              //   shoes: {},
              // };
            } else {
              state.set.pants = action.payload;
            }
          }
          break;
        case "shoes":
          {
            let temp = checkEmptyObjects(state.set);

            if (temp) {
              // let date = new Date().toLocaleDateString();
              // state.set["date"] = date;
              // state.sets.push(state.set);
              // state.set = {
              //   shirt: {},
              //   pants: {},
              //   shoes: {},
              // };
            } else {
              state.set.shoes = action.payload;
            }
          }
          break;

        default:
          break;
      }
      console.log(current(state));
    },
  },
  extraReducers: {
    [getClosetDataAsync.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.shirts = countClothes(action.payload, "shirt");
      state.pants = countClothes(action.payload, "pants");
      state.shoes = countClothes(action.payload, "shoes");
      state.shirtsArray = action.payload.filter(
        (item) => item.type === "shirt"
      );
      state.pantsArray = action.payload.filter((item) => item.type === "pants");
      state.shoesArray = action.payload.filter((item) => item.type === "shoes");
      state.lengthOfData = action.payload.length;

      state.itemsTypesObj = filterSizesColors(action.payload);
    },
  },
});

export const {
  filterSelectionFrom,
  returnHome,
  navigateToGarments,
  setSelectedColor,
  setSelectedSize,
  buildSet,
} = ClosetDataSlice.actions;

export default ClosetDataSlice.reducer;
