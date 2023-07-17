import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import BasicDatePicker from "../components/BasicDatePicker";
import InputField from "../components/InputField";
import { addEventAction, updateEventAction } from "../redux/Event/action";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddEvent({ isEditing, props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { eventList } = useSelector((state) => state.Event);
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      startDate: null,
      endDate: null,
      description: "",
      handleBy: "",
      organization: "",
      totalSubEvent: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Not more that 20 charactor are allowed!")
        .required("Required"),
      type: Yup.string().required("Required"),
      startDate: Yup.date()
        .max(Yup.ref("endDate"), "Start Date can't be after End Date")
        .typeError("Invalid date")
        .required("Required")
        .default(null),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End Date can't be before Start Date")
        .typeError("Invalid date")
        .required("Required")
        .default(null),
      description: Yup.string()
        .max(500, "Not more that 500 charactor are allowed!")
        .required("Required"),
      handleBy: Yup.string()
        .max(15, "Not more that 15 charactor are allowed!")
        .required("Required"),
      organization: Yup.string()
        .max(15, "Not more that 15 charactor are allowed!")
        .required("Required"),
      totalSubEvent: Yup.number()
        .min(0, "Negative values not allowed!")
        .max(100, "Not more that 100 charactor are allowed!")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        id: isEditing ? values.id : eventList.length + 1,
        startDate: values.startDate.format("DD/MM/YYYY"),
        endDate: values.endDate.format("DD/MM/YYYY"),
      };
      if (isEditing) {
        dispatch(updateEventAction(payload));
        navigate("/");
      } else {
        dispatch(addEventAction(payload));
      }
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (eventList.length > 0 && isEditing) {
      Object.keys(state).map((val) =>
        formik.setFieldValue(
          val,
          val === "startDate" || val === "endDate"
            ? moment(state[val], "DD/MM/YYYY")
            : state[val]
        )
      );
    } else {
      formik.resetForm();
      navigate("/add-event");
    }
  }, [isEditing, eventList]);

  return (
    <Container component="main" maxWidth="sm">
      <div style={{ marginTop: 20 }}>
        <Grid container>
          <Paper>
            <Box>
              <h2> {isEditing ? "Edit" : "Add"} Event Form </h2>
              <Button variant="outlined" onClick={() => navigate("/")}>
                Go to Event list
              </Button>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid item>
                <InputField
                  style={{ width: 500 }}
                  name="name"
                  type="text"
                  label="Event Name"
                  className="form-control form-control-lg text-center"
                  placeholder="Enter Event Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && formik.errors?.name}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item>
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="type">Type</InputLabel>
                  <Select
                    labelId="type"
                    id="type"
                    value={formik.values.type}
                    label="Type"
                    onChange={(e) =>
                      formik.setFieldValue("type", e.target.value)
                    }
                    error={formik.touched.type && formik.errors?.type}
                  >
                    {["Sports", "Music", "General", "Children", "School"].map(
                      (val,i) => (
                        <MenuItem key={i} value={val}>{val}</MenuItem>
                      )
                    )}
                  </Select>
                  {formik.touched.type && (
                    <span className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root">
                      {formik.errors.type}
                    </span>
                  )}
                </FormControl>

                <InputField
                  name="totalSubEvent"
                  type="number"
                  label="Total sub events"
                  className="form-control form-control-lg"
                  placeholder="Enter Total sub events"
                  onChange={formik.handleChange}
                  value={formik.values.totalSubEvent}
                  error={
                    formik.touched.totalSubEvent && formik.errors?.totalSubEvent
                  }
                  helperText={
                    formik.touched.totalSubEvent && formik.errors.totalSubEvent
                  }
                />
              </Grid>

              <Grid item>
                <BasicDatePicker
                  label="Start Date"
                  name="startDate"
                  format="DD/MM/YYYY"
                  value={formik.values?.startDate}
                  onChange={(value) => {
                    formik.setFieldValue("startDate", moment(value));
                  }}
                  slotProps={{
                    textField: {
                      helperText:
                        formik.touched.hasOwnProperty("startDate") &&
                        formik.errors.startDate,
                    },
                  }}
                />

                <BasicDatePicker
                  label="End Date"
                  name="endDate"
                  format="DD/MM/YYYY"
                  value={formik.values?.endDate}
                  onChange={(value) => {
                    formik.setFieldValue("endDate", moment(value));
                  }}
                  slotProps={{
                    textField: {
                      helperText:
                        formik.touched.hasOwnProperty("endDate") &&
                        formik.errors.endDate,
                    },
                  }}
                />
              </Grid>

              <Grid item>
                <InputField
                  name="handleBy"
                  type="text"
                  label="Handle By"
                  className="form-control form-control-lg"
                  placeholder="Enter Handle By"
                  onChange={formik.handleChange}
                  value={formik.values.handleBy}
                  error={formik.touched.handleBy && formik.errors?.handleBy}
                  helperText={formik.touched.handleBy && formik.errors.handleBy}
                />
                <InputField
                  name="organization"
                  type="text"
                  label="Organization"
                  className="form-control form-control-lg"
                  placeholder="Enter organization"
                  onChange={formik.handleChange}
                  value={formik.values.organization}
                  error={
                    formik.touched.organization && formik.errors?.organization
                  }
                  helperText={
                    formik.touched.organization && formik.errors.organization
                  }
                />
              </Grid>

              <Grid item>
                <InputField
                  name="description"
                  rows={8}
                  style={{ width: 500 }}
                  multiline
                  type="text"
                  label="Description"
                  className="form-control form-control-lg"
                  placeholder="Enter description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  error={
                    formik.touched.description && formik.errors?.description
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>

              <Grid item>
                <Button variant="outlined" type="submit">
                  {isEditing ? "Update" : "Add"} Event
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => formik.resetForm()}
                >
                  Reset
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </div>
    </Container>
  );
}
