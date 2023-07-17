import { FormControl, TextField } from "@mui/material";
import React from "react";

export default function InputField({ isInvalid = false, ...props }) {
  return (
    <>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
        <label htmlFor={props.id}>{props.title}</label>
        <TextField {...props} />
      </FormControl>
    </>
  );
}
