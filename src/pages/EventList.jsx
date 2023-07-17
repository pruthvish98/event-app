import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material/";
import { visuallyHidden } from "@mui/utils";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeEventAction } from "../redux/Event/action";
import InputField from "../components/InputField";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "startDate",
    numeric: true,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "endDate",
    numeric: true,
    disablePadding: false,
    label: "End Date",
  },
  {
    id: "handleBy",
    numeric: true,
    disablePadding: false,
    label: "Handle By",
  },
  {
    id: "organization",
    numeric: true,
    disablePadding: false,
    label: "Organization",
  },
  {
    id: "totalSubEvent",
    numeric: true,
    disablePadding: false,
    label: "Sub events",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({ handleSearch, navigate, ...props }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Events
      </Typography>
      <InputField
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Button
        variant="outlined"
        sx={{ flex: "1 1 20%" }}
        onClick={() => navigate("/add-event")}
      >
        Add Event
      </Button>
    </Toolbar>
  );
}

export default function EventList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //   const [search, setSearch] = useState("");
  const { eventList } = useSelector((state) => state.Event);

  const [data, setData] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchValue) => {
    setData(
      eventList.filter((val) => JSON.stringify(val).toLowerCase().includes(searchValue.toLowerCase()))
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty data.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, data]
  );

  useEffect(() => {
    setData(eventList);
  }, [eventList]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar navigate={navigate} handleSearch={handleSearch} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.startDate}</TableCell>
                    <TableCell align="right">{row.endDate}</TableCell>
                    <TableCell align="right">{row.handleBy}</TableCell>
                    <TableCell align="right">{row.organization}</TableCell>
                    <TableCell align="right">{row.totalSubEvent}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        sx={{ flex: "1 1 20%" }}
                        onClick={() => navigate("/edit-event", { state: row })}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          dispatch(removeEventAction(row), navigate("/"))
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
