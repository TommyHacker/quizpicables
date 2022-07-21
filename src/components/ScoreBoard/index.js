import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";



function ScoreBoard() {
  const rows = [
    { user: "QuizMaster", score: 1000 },
    { user: "QuizSenior", score: 750 },
    { user: "Quizzer", score: 500 },
    { user: "QuizNoob", score: 250 },
    { user: "QuizLoser", score: 0 },
  ];

  const navigate = useNavigate();

	const handleMove = (e) => {
		e.preventDefault();
		navigate("/");
	  };

  return (
    <div>
      <Typography style={{color:'white', margin: '25px auto', textAlign: 'center', fontSize: '2rem' }}>
        <h1>Final Results</h1>
        </Typography>
      <div>
        <TableContainer style={{marginLeft:'12.5%'}} >
          <Table component={Paper} style={{ width: '75%' }} aria-label="a dense table">
            {/* Table head */}

            <TableHead >
              <TableRow
                sx={{ "&:first-child td, &:first-child th": { borderBottom: 2 } }}
              >
                <TableCell style={{fontSize: '2rem'}}  align="center">User:</TableCell>
                <TableCell style={{fontSize: '2rem'}}  align="center">Score</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.user}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{fontSize: '2rem'}}  align="center" component="th" scope="row">
                    {row.user}
                  </TableCell>
                  <TableCell style={{fontSize: '2rem'}}  align="center">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '25px'}}>
          <Button
            onClick={handleMove}
            variant="contained"
            style={{ fontWeight: "bold", height: "50px", width: '200px' }}
            sx={{ p: 4, m: 2.6 }}>
            <h2>Play Again?</h2>
          </Button>
        </div>
      </div>
    </div>

  
  );
}

export default ScoreBoard;
