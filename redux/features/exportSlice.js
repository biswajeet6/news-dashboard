import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exportType: "", // Can be "PDF", "CSV", "Google Sheets"
};

const exportSlice = createSlice({
  name: "export",
  initialState,
  reducers: {
    setExportType: (state, action) => {
      state.exportType = action.payload;
    },
  },
});

export const { setExportType } = exportSlice.actions;
export default exportSlice.reducer;
