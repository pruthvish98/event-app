import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { FormControl } from "@mui/material";

export default function BasicDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
        <DatePicker label="Basic date picker" {...props} />
      </FormControl>
    </LocalizationProvider>
  );
}
