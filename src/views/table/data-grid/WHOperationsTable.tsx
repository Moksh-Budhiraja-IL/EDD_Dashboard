// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSortModel,
} from "@mui/x-data-grid";

// ** ThirdParty Components
import axios from "axios";

// ** Custom Components
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";
import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";
import { SDD_NDD_Superfast_PincodesRowType } from "src/@fake-db/types";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";
import { PinCodeTableRows } from "src/@fake-db/table/static-data";
import { Button, Checkbox } from "@mui/material";
import { log } from "console";

interface StatusObj {
  [key: number]: {
    title: string;
    color: ThemeColor;
  };
}

type SortType = "asc" | "desc" | undefined | null;

const WHOperationsTable = () => {
  const [total, setTotal] = useState<number>(0);
  const [sort, setSort] = useState<SortType>("asc");
  const [isRowEditable, setIsRowEditable] = useState(false);
  const [editRowId, setEditRowId] = useState<number>(-1);
  const [rows, setRows] = useState<SDD_NDD_Superfast_PincodesRowType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string>("cc");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
    fieldName: string
  ) => {
    const { checked } = event.target;
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, [fieldName]: checked };
        }
        return row;
      })
    );
  };

  const handleSave = () => {
    axios
      .post("http://localhost:3333/SDD_NDD_Superfast_Pincodes/", rows)
      .then((response) => {
        fetchTableData();
        console.log("Data saved successfully:", response);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const handleCellEdit = (editRow: SDD_NDD_Superfast_PincodesRowType) => {
    const updatedRows = rows.map((row) =>
      row.id === editRow.id ? { ...row, ...editRow } : row
    );
    if (editRow.hasOwnProperty("priority")) {
      updatedRows.forEach((row) => {
        if (row.id === editRow.id) {
          row.priority = editRow.priority;
        }
      });
    }
    if (editRow.hasOwnProperty("LBD")) {
      updatedRows.forEach((row) => {
        if (row.id === editRow.id) {
          row.LBD = editRow.LBD;
        }
      });
    }
    if (editRow.hasOwnProperty("is2HourDelivery")) {
      updatedRows.forEach((row) => {
        if (row.id === editRow.id) {
          row.is2HourDelivery = editRow.is2HourDelivery;
        }
      });
    }
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
    const newRow = {
      id: newId,
      cPin: "",
      shipsCity: "",
      priority: false,
      LBD: false,
      is2HourDelivery: false,
    };
    const updatedRows = [newRow, ...rows];
    setRows(updatedRows.sort((a, b) => b.id - a.id));
    setEditRowId(newId);
    setIsRowEditable(true);
  };
  const handleCancel = () => {
    fetchTableData();
    setIsRowEditable(false);
    setEditRowId(-1);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    fetchTableData();
  };

  const columns: GridColDef[] = [
    {
      flex: 0.175,
      minWidth: 110,
      field: "id",
      headerName: "id",
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.id}
        </Typography>
      ),
    },
    { field: "wh", headerName: "Warehouse Name", flex: 0.25 },
    {
      flex: 0.175,
      minWidth: 110,
      field: "whStatus",
      headerName: "whStatus",
      renderCell: (params: GridRenderCellParams) => (
        <Checkbox
          checked={params.row.priority}
          onChange={(event) =>
            handleCheckboxChange(event, params.row.id, "whStatus")
          }
        />
      ),
    },
    { field: "courierName", headerName: "Courier Name", flex: 0.25 },
    {
      flex: 0.175,
      minWidth: 110,
      field: "cPin",
      headerName: "cPin",
      editable: isRowEditable,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.cPin}
        </Typography>
      ),
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: "shipsCity",
      headerName: "shipsCity",
      editable: isRowEditable,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.shipsCity}
        </Typography>
      ),
    },

    {
      flex: 0.175,
      minWidth: 110,
      field: "priority",
      headerName: "priority",
      renderCell: (params: GridRenderCellParams) => (
        <Checkbox
          checked={params.row.priority}
          onChange={(event) =>
            handleCheckboxChange(event, params.row.id, "priority")
          }
        />
      ),
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: "LBD",
      headerName: "LBD",
      renderCell: (params: GridRenderCellParams) => (
        <Checkbox
          checked={params.row.LBD}
          onChange={(event) =>
            handleCheckboxChange(event, params.row.id, "LBD")
          }
        />
      ),
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: "is2HourDelivery",
      headerName: "is2HourDelivery",
      renderCell: (params: GridRenderCellParams) => (
        <Checkbox
          checked={params.row.is2HourDelivery}
          onChange={(event) =>
            handleCheckboxChange(event, params.row.id, "is2HourDelivery")
          }
        />
      ),
    },
  ];

  // function loadServerRows(
  //   currentPage: number,
  //   data: SDD_NDD_Superfast_PincodesType[]
  // ) {
  //   return data.slice(
  //     currentPage * paginationModel.pageSize,
  //     (currentPage + 1) * paginationModel.pageSize
  //   );
  // }

  const fetchTableData = useCallback(
    async () => {
      await axios
        .get("http://localhost:3333/SDD_NDD_Superfast_Pincodes/")
        .then((res) => {
          setTotal(res.data.length);
          setRows(res.data);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel]
  );

  useEffect(() => {
    fetchTableData();
  }, []);
  return (
    <>
      <Card>
        <CardHeader title="WH Operations" />
        <DataGrid
          autoHeight
          pagination
          rows={rows}
          rowCount={total}
          columns={columns}
          disableRowSelectionOnClick
          paginationMode="client"
          pageSizeOptions={[5, 10, 25, 50]}
          paginationModel={paginationModel}
          isCellEditable={(params) => {
            return params.row.id === editRowId;
          }}
          components={{
            Toolbar: () => (
              <div style={{ marginLeft: 20 }}>
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>{" "}
                {isRowEditable ? (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" onClick={() => handleAddRow()}>
                    Add New Row
                  </Button>
                )}
                <br />
                <br />
              </div>
            ),
          }}
          // slots={{ toolbar: ServerSideToolbar }}
          onPaginationModelChange={setPaginationModel}
          onCellEditStop={(params) => handleCellEdit(params as any)}
          slotProps={{
            baseButton: {
              size: "medium",
              variant: "tonal",
            },
            toolbar: {
              value: searchValue,
              clearSearch: () => handleSearch(""),
              onChange: (event: ChangeEvent<HTMLInputElement>) =>
                handleSearch(event.target.value),
            },
          }}
        />
      </Card>
    </>
  );
};
export default WHOperationsTable;
