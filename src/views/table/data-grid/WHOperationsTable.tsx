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
import { PinCodeTableRowsType } from "src/@fake-db/types";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";
import { PinCodeTableRows } from "src/@fake-db/table/static-data";

interface StatusObj {
  [key: number]: {
    title: string;
    color: ThemeColor;
  };
}

type SortType = "asc" | "desc" | undefined | null;

const columns: GridColDef[] = [
  
  {
    flex: 0.175,
    minWidth: 110,
    field: "wh",
    headerName: "WH",
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.wh}
      </Typography>
    ),
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: "couriers.courierType",
    headerName: "couriers",
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.city}
      </Typography>
    ),
  },
  
  {
    flex: 0.175,
    minWidth: 110,
    field: "status",
    headerName: "Status",
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.city}
      </Typography>
    ),
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: "sun",
    headerName: "Sunday",
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.city}
      </Typography>
    ),
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: "mon",
    headerName: "Monday",
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.city}
      </Typography>
    ),
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: "tue",
    headerName: "Tuesday",
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.city}
      </Typography>
    ),
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: "wed",
    headerName: "Wednesday",
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.city}
      </Typography>
    ),
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: "thu",
    headerName: "Thursday",
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.city}
      </Typography>
    ),
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: "fri",
    headerName: "Friday",
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.city}
      </Typography>
    ),
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: "sat",
    headerName: "Saturday",
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.city}
      </Typography>
    ),
  },
  
  
];

const WHOperationsTable = () => {
  const [total, setTotal] = useState<number>(0);
  const [sort, setSort] = useState<SortType>("asc");
  const [rows, setRows] = useState<PinCodeTableRowsType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string>("stateFullName");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  function loadServerRows(currentPage: number, data: PinCodeTableRowsType[]) {
    return data.slice(
      currentPage * paginationModel.pageSize,
      (currentPage + 1) * paginationModel.pageSize
    );
  }

  const fetchTableData = useCallback(
    async (sort: SortType, q: string, column: string) => {
      await axios
        .get("/api/table/WHOperationList", {
          params: {
            q,
            sort,
            column,
          },
        })
        .then((res) => {
          setTotal(res.data.total);
          setRows(loadServerRows(paginationModel.page, res.data.data));
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel]
  );

  useEffect(() => {
    fetchTableData(sort, searchValue, sortColumn);
  }, [fetchTableData, searchValue, sort, sortColumn]);

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort);
      setSortColumn(newModel[0].field);
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field);
    } else {
      setSort("asc");
      setSortColumn("id");
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    fetchTableData(sort, value, sortColumn);
  };

  return (
    <Card>
      <CardHeader title="Pin Code" />
      <DataGrid
        autoHeight
        pagination
        rows={rows}
        rowCount={total}
        columns={columns}
        checkboxSelection
        sortingMode="server"
        paginationMode="server"
        pageSizeOptions={[5, 10, 25, 50]}
        paginationModel={paginationModel}
        onSortModelChange={handleSortModel}
        slots={{ toolbar: ServerSideToolbar }}
        onPaginationModelChange={setPaginationModel}
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
  );
};

export default WHOperationsTable;
