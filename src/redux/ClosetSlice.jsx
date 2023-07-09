import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const getClosetDataAsync = createAsyncThunk(
  "closet/getClothesAsync",
  async () => {
    let storedData = localStorage.getItem("closetData");

    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (error) {
        console.error("Error parsing locally stored data:", error);
      }
    }

    try {
      const res = await axios.get(
        `https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94`
      );
      const apiData = res.data;

      // Save initial data in local storage
      localStorage.setItem("closetData", JSON.stringify(apiData));

      return apiData;
    } catch (error) {
      console.error("Error fetching data from API:", error);
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

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "short" });
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

function elapsedTime(startTime) {
  const elapsed = new Date().getTime() - startTime;
  const hours = Math.floor(elapsed / 3600000);
  const minutes = Math.floor((elapsed % 3600000) / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")} `;
}

function deletClothesFromData(data, set) {
  const newData = data.filter(
    (setClothes) =>
      setClothes.id !== set.shirt.id &&
      setClothes.id !== set.pants.id &&
      setClothes.id !== set.shoes.id
  );
  localStorage.setItem("data", JSON.stringify(newData));
  return newData;
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
      state.set = {
        shirt: {},
        pants: {},
        shoes: {},
      };
      state.garmentsPage = false;
      state.startTime = null;
    },
    navigateToGarments: (state, action) => {
      state.garmentsPage = true;
      state.startTime = new Date().getTime();
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    buildSet: (state, action) => {
      state.set = action.payload;
      let date = getCurrentDate();
      state.set["date"] = date;
      state.set["id"] = uuidv4();
      state.set["elapsedTime"] = elapsedTime(state.startTime);

      state.data = deletClothesFromData(state.data, state.set);

      state.shirts = countClothes(state.data, "shirt");
      localStorage.setItem("shirt", JSON.stringify(state.shirts));

      state.pants = countClothes(state.data, "pants");
      localStorage.setItem("pants", JSON.stringify(state.pants));

      state.shoes = countClothes(state.data, "shoes");
      localStorage.setItem("shoes", JSON.stringify(state.shoes));

      state.sets = [...state.sets, state.set];
      state.set = {
        shirt: {},
        pants: {},
        shoes: {},
      };
      state.filterSelection = {
        shoes: false,
        shirt: false,
        pants: false,
      };
      localStorage.setItem("closetData", JSON.stringify(state.data));
      localStorage.setItem("sets", JSON.stringify(state.sets));
    },
    deleteSet: (state, action) => {
      state.data = [
        ...state.data,
        action.payload.shirt,
        action.payload.pants,
        action.payload.shoes,
      ];

      state.shirts = countClothes(state.data, "shirt");
      localStorage.setItem("shirt", JSON.stringify(state.shirts));

      state.pants = countClothes(state.data, "pants");
      localStorage.setItem("pants", JSON.stringify(state.pants));

      state.shoes = countClothes(state.data, "shoes");
      localStorage.setItem("shoes", JSON.stringify(state.shoes));
      state.sets = state.sets.filter((set) => set.id !== action.payload.id);
      localStorage.setItem("sets", JSON.stringify(state.sets));
    },
    filterGarmentsSelection: (state, action) => {
      const setObj = JSON.parse(localStorage.getItem("set"));
      switch (action.payload.type) {
        case "shirt":
          {
            state.filterSelection.shirt = false;
            if (Object.keys(setObj.pants).length === 0) {
              state.filterSelection.pants = true;
            } else if (Object.keys(setObj.shoes).length === 0) {
              state.filterSelection.shoes = true;
            }
          }
          break;
        case "pants":
          {
            state.filterSelection.pants = false;
            if (Object.keys(setObj.shirt).length === 0) {
              state.filterSelection.shirt = true;
            } else if (Object.keys(setObj.shoes).length === 0) {
              state.filterSelection.shoes = true;
            }
          }
          break;
        case "shoes":
          {
            state.filterSelection.shoes = false;
            if (Object.keys(setObj.pants).length === 0) {
              state.filterSelection.pants = true;
            } else if (Object.keys(setObj.shirt).length === 0) {
              state.filterSelection.shirt = true;
            }
          }
          break;

        default:
          break;
      }
    },
  },
  extraReducers: {
    [getClosetDataAsync.fulfilled]: (state, action) => {
      state.data = action.payload;

      state.shirts = countClothes(state.data, "shirt");
      localStorage.setItem("shirt", JSON.stringify(state.shirts));

      state.pants = countClothes(state.data, "pants");
      localStorage.setItem("pants", JSON.stringify(state.pants));

      state.shoes = countClothes(state.data, "shoes");
      localStorage.setItem("shoes", JSON.stringify(state.shoes));

      state.shirtsArray = action.payload.filter(
        (item) => item.type === "shirt"
      );
      state.pantsArray = action.payload.filter((item) => item.type === "pants");
      state.shoesArray = action.payload.filter((item) => item.type === "shoes");
      state.lengthOfData = action.payload.length;

      state.itemsTypesObj = filterSizesColors(action.payload);
      const sets = localStorage.getItem("sets");

      if (sets) {
        state.sets = JSON.parse(sets);
      } else {
        state.sets = [];
        localStorage.setItem("sets", JSON.stringify([]));
        localStorage.setItem(
          "set",
          JSON.stringify({
            shirt: {},
            pants: {},
            shoes: {},
          })
        );
      }
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
  deleteSet,
  filterGarmentsSelection,
  setBuild,
} = ClosetDataSlice.actions;

export default ClosetDataSlice.reducer;
