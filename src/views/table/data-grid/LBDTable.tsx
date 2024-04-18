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
import {
  PinCodeTableRowsType,
  SDD_NDD_Superfast_PincodesType,
} from "src/@fake-db/types";

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

const LBDTable = () => {
  const [total, setTotal] = useState<number>(0);
  const [sort, setSort] = useState<SortType>("asc");
  const [rows, setRows] = useState<PinCodeTableRowsType[]>([]);
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

  const [jsonData, setJsonData] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const content = event.target.result as string;
          const rows = content.split("\n");
          const headers = rows[0].split(",");
          const data = rows.slice(1).map((row) => {
            const values = row.split(",");
            return headers.reduce((obj, header, index) => {
              obj[header.trim()] = values[index].trim();
              return obj;
            }, {} as any);
          });
          setJsonData(data);
        }
      };
      reader.readAsText(file);
    }
  };
  const handleSave = () => {
    axios
      .post("http://localhost:3333/SDD_NDD_Superfast_Pincodes/", rows)
      .then((response) => {
        console.log("Data saved successfully:", response);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const columns: GridColDef[] = [
    {
      flex: 0.175,
      minWidth: 110,
      field: "cPin",
      headerName: "cPin",
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.cPin}
        </Typography>
      ),
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: "city",
      headerName: "city",
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.city}
        </Typography>
      ),
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: "state",
      headerName: "state",
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.state}
        </Typography>
      ),
    },
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
    {
      flex: 0.175,
      minWidth: 110,
      field: "stateFullName",
      headerName: "stateFullName",
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.stateFullName}
        </Typography>
      ),
    },
  ];
  function loadServerRows(
    currentPage: number,
    data: SDD_NDD_Superfast_PincodesType[]
  ) {
    return data.slice(
      currentPage * paginationModel.pageSize,
      (currentPage + 1) * paginationModel.pageSize
    );
  }

  const fetchTableData = useCallback(
    async (sort: SortType, q: string, column: string) => {
      await axios.get("http://localhost:3333/Pincodes/").then((res) => {
        // setTotal(res.data.total);
        setRows(res.data);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel]
  );

  useEffect(() => {
    fetchTableData(sort, searchValue, sortColumn);
  }, [fetchTableData, searchValue, sort, sortColumn]);

  // const handleCellEdit = (editRow: SDD_NDD_Superfast_PincodesType) => {
  //   const updatedRows = rows.map((row) =>
  //     row.id === editRow.id ? { ...row, ...editRow } : row
  //   );
  //   if (editRow.hasOwnProperty("priority")) {
  //     updatedRows.forEach((row) => {
  //       if (row.id === editRow.id) {
  //         row.priority = editRow.priority;
  //       }
  //     });
  //   }
  //   if (editRow.hasOwnProperty("LBD")) {
  //     updatedRows.forEach((row) => {
  //       if (row.id === editRow.id) {
  //         row.LBD = editRow.LBD;
  //       }
  //     });
  //   }
  //   if (editRow.hasOwnProperty("is2HourDelivery")) {
  //     updatedRows.forEach((row) => {
  //       if (row.id === editRow.id) {
  //         row.is2HourDelivery = editRow.is2HourDelivery;
  //       }
  //     });
  //   }
  //   setRows(updatedRows);
  // };

  // const handleSortModel = (newModel: GridSortModel) => {
  //   if (newModel.length) {
  //     setSort(newModel[0].sort);
  //     setSortColumn(newModel[0].field);
  //     fetchTableData(newModel[0].sort, searchValue, newModel[0].field);
  //   } else {
  //     setSort("asc");
  //     setSortColumn("id");
  //   }
  // };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    fetchTableData(sort, value, sortColumn);
  };

  return (
    <>
      <div>
        <label htmlFor="file-input">
          <Button variant="contained" component="span">
            Import CSV
          </Button>
        </label>
        <input
          id="file-input"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>
      <br />
      {/* <div>
        <h2>JSON Output:</h2>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div> */}

      <Card>
        <CardHeader title="Pincode List" />
        <DataGrid
          autoHeight
          pagination
          rows={rows}
          rowCount={total}
          columns={columns}
          disableRowSelectionOnClick
          sortingMode="server"
          paginationMode="server"
          pageSizeOptions={[5, 10, 25, 50]}
          paginationModel={paginationModel}
          // onSortModelChange={handleSortModel}
          slots={{ toolbar: ServerSideToolbar }}
          onPaginationModelChange={setPaginationModel}
          // onCellEditStop={(params) => handleCellEdit(params as any)}
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
export default LBDTable;
