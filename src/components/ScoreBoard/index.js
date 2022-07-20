import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

function ScoreBoard() {
  const { score } = useSelector((state) => state.score);
  const { username } = useSelector((state) => state.username);
  const { players } = useSelector((state) => state.players);
  console.log(players);
  const rows = [
    { user: "QuizMaster", score: 1000 },
    { user: "QuizSenior", score: 750 },
    { user: "Quizzer", score: 500 },
    { user: "QuizNoob", score: 250 },
    { user: "QuizLoser", score: 0 },
  ];

  return (
    <div>
      <h1>Scores!</h1>
      <br></br>
      <h2>Dummy table</h2>

      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="a dense table">
            {/* Table head */}

            <TableHead>
              <TableRow
                sx={{ "&:first-child td, &:first-child th": { border: 5 } }}
              >
                <TableCell align="center">Users</TableCell>
                <TableCell align="center">Scores</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}

            <TableBody>
              {players.map((row) => (
                <TableRow
                  key={row.username}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="center">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ScoreBoard;
