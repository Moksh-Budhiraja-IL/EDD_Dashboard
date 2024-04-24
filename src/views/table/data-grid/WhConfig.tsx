// ** React Imports
import {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";

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
import { SDD_NDD_Superfast_PincodesRowType, WHConfigRowType } from "src/@fake-db/types";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";
import { PinCodeTableRows } from "src/@fake-db/table/static-data";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { log } from "console";

interface StatusObj {
  [key: number]: {
    title: string;
    color: ThemeColor;
  };
}

type SortType = "asc" | "desc" | undefined | null;

const WHConfig = () => {
  const [formData, setFormData] = useState<WHConfigRowType>({
    id: 0, // Assuming id is required and should be initialized
    wh: "",
    panIndiaStatus: false,
    panIndiaEDDConfigCsv: null,
    SDDStatus: false,
    SDDPincodesCsv: null,
    NDDStatus: false,
    NDDPincodesCsv: null,
    SuperfastStatus: false,
    SuperfastPincodesCsv: null,
    panIndiaCutOff: "00:00", // Default value for cutoff times
    SDDCutOff: "00:00",
    NDDCutOff: "00:00",
    SuperfastCutOff: "00:00",
    workingDays: 0,
    SBD: 0,
  });
  

  const handleChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | { name?: string; value: unknown; files?: FileList }
    >
  ) => {
    if ("name" in e.target) {
      const { name, value, type } = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement;
      if (type === "file") {
        const files = (e.target as HTMLInputElement).files;
        setFormData((prevData) => ({
          ...prevData,
          [name]: files?.[0] || null,
        }));
      } else if (type === "checkbox") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: (e.target as HTMLInputElement).checked,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
  };
  const fetchTableData = useCallback(
    async () => {
      await axios.get("http://localhost:3333/WHConfig/").then((res) => {
        // setTotal(res.data.length);
        // setFormData(res.data);
        console.log(formData)
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // axios
    //   .post("http://localhost:3333/WHConfig/", formData)
    //   .then((response) => {
    //     console.log("Data saved successfully:", response);
    //   })
    //   .catch((error) => {
    //     console.error("Error saving data:", error);
    //   });
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <TextField
        name="number"
        label="ID Number"
        value={formData.number}
        onChange={handleChange}
        
        margin="normal"
      /> */}
      <TextField
        name="wh"
        label="WH"
        value={formData.wh}
        onChange={handleChange}
        margin="normal"
      />{" "}
      <br />
      <br />
      <TableContainer>
        <Table>
          <TableHead>Serviceability</TableHead>
          <TableRow>
            <TableCell>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.panIndiaStatus}
                    onChange={handleChange}
                    name="panIndiaStatus"
                  />
                }
                label="Pan India Status"
                sx={{ fontSize: "0.75rem" }}
              />
            </TableCell>
            <TableCell>
              <input
                accept=".csv"
                id="panIndiaEDDConfigCsv"
                name="panIndiaEDDConfigCsv"
                type="file"
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.SDDStatus}
                    onChange={handleChange}
                    name="SDDStatus"
                  />
                }
                label="SDD Status"
                sx={{ fontSize: "0.75rem" }}
              />
            </TableCell>
            <TableCell>
              <input
                accept=".csv"
                id="SDDPincodesCsv"
                name="SDDPincodesCsv"
                type="file"
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.NDDStatus}
                    onChange={handleChange}
                    name="NDDStatus"
                  />
                }
                label="NDD Status"
              />
            </TableCell>
            <TableCell>
              <input
                accept=".csv"
                id="NDDPincodesCsv"
                name="NDDPincodesCsv"
                type="file"
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.SuperfastStatus}
                    onChange={handleChange}
                    name="SuperfastStatus"
                  />
                }
                label="Superfast Status"
              />
            </TableCell>
            <TableCell>
              <input
                accept=".csv"
                id="SuperfastPincodesCsv"
                name="SuperfastPincodesCsv"
                type="file"
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <br />
      <TableHead>Courier wise Cut-Off Time:</TableHead>
      <TextField
        type="time"
        placeholder="00:00"
        name="panIndiaCutOff"
        label="panIndiaCutOff"
        value={formData.panIndiaCutOff || "00:00"}
        onChange={handleChange}
        margin="normal"
        sx={{ fontSize: "0.75rem" }} // Adjust font size as needed
      />{" "}
      &nbsp;&nbsp;&nbsp;
      <TextField
        type="time"
        placeholder="00:00"
        name="SDDCutOff"
        label="SDD Cut Off"
        value={formData.SDDCutOff || "00:00"}
        onChange={handleChange}
        margin="normal"
        sx={{ fontSize: "0.75rem" }} // Adjust font size as needed
      />
      &nbsp;&nbsp;&nbsp;
      <TextField
        type="time"
        placeholder="00:00"
        name="NDDCutOff"
        label="NDDCutOff"
        value={formData.NDDCutOff || "00:00"}
        onChange={handleChange}
        margin="normal"
        sx={{ fontSize: "0.75rem" }} // Adjust font size as needed
      />
      &nbsp;&nbsp;&nbsp;
      <TextField
        type="time"
        placeholder="00:00"
        name="SuperfastCutOff"
        label="SuperfastCutOff"
        value={formData.SuperfastCutOff || "00:00"}
        onChange={handleChange}
        margin="normal"
        sx={{ fontSize: "0.75rem" }} // Adjust font size as needed
      /> <br /> <br />
      <TextField
        name="workingDays"
        label="Working Days"
        type="number"
        value={formData.workingDays || 0}
        onChange={handleChange}
        margin="normal"
      />{" "}
      &nbsp;&nbsp;&nbsp;
      <TextField
        name="SBD"
        label="SBD"
        value={formData.SBD || 0}
        onChange={handleChange}
        type="number"
        margin="normal"
      />{" "}
      <br /> <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};
export default WHConfig;
