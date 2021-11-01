import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Api } from "../axios";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AuthorForm from "../components2/AuthorForm"
// import {DateGrid} from"@mui/x-date/grid";
import * as React from "react";
import Paper from "@mui/material/Paper";
import api from "../axios"
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from "@mui/icons-material/Delete";

const Authors = () => {
  const [authorFormDialogStatus, setAuthorFormDialogStatus] = useState(false);
  const [authorToEdit, setAuthorToEdit] = useState(undefined);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    Api.get("authors").then((res) => {
      console.log(res);
      setAuthors(res.data);
      console.log(Authors);
    });
  }, []);

  return (
    <div>
    <Table>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setAuthorToEdit(null);
          setAuthorFormDialogStatus(true);
        }}
      >
        Add Author
      </Button>

      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>NAME</TableCell>
          <TableCell>AGE</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {authors.map((Author) => (
          <TableRow key={Author.id}>
            <TableCell>{Author.id}</TableCell>
            <TableCell>{Author.name}</TableCell>
            <TableCell>{Author.age}</TableCell>
            <TableCell>
              <IconButton 
              onClick={()=>{
                setAuthorFormDialogStatus(true)
                setAuthorToEdit(Author)
              }}>
              <EditIcon/>
              </IconButton>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    {authorFormDialogStatus&&(
      <AuthorForm
      open={authorFormDialogStatus}
      author={authorToEdit}
      closeHandler={()=>{
        setAuthorFormDialogStatus(false)
        setAuthorToEdit(null);
      }}

      submit={(data)=>{
        if (authorToEdit){
          console.log("update")
          console.log(data)
        }
        else
        {
          console.log("create")
          console.log(data)
        }
      }}
      />
    )}
    </div>
  );
};

export default Authors;
