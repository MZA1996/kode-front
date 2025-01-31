import { Button, Card, CardContent, Grid, makeStyles, Table, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TableCell } from '@mui/material';
import { loadStudent } from '../../actions';

const StudentList = () =>  {
    const dispatch = useDispatch();
    const [classRoster, setClassRoster] = useState([]);
    const userId = useSelector(state => state.userId);

    useEffect(() => {
        async function getClassRoster() {
            const response = await fetch (`https://kode-server.herokuapp.com/teachers/${userId}/class`,{
                method: 'GET',
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('token') }});
            let data = await response.json();
            console.log(data)
            setClassRoster(data)
        }
        getClassRoster();
    },[])

    const navigate = useNavigate();

    const handleStudentSelect = async (studentId, studentFname, studentLname) => {
        dispatch(loadStudent(studentId, studentFname, studentLname))
        navigate('/details')
    }

    const addStudents = () => {
        navigate('/addStudents')
    };

    // Adding material ui
    const useStyles = makeStyles({
        container: {
            backgroundColor: "white",
            width: "400px",
            height: "400px",
            padding: "20px",
            borderRadius: "30px",
            marginRight: "100px",
            border: "1px solid black"
            },
        header: {
            backgroundColor: "lightGrey"
        },
        h3: {
            color: "black",
            // textAlign: "left",
            paddingLeft: "20px"
        },
        button: {
            backgroundColor: "lightblue",
            color: "black",
            borderRadius: "10px",
            marginTop: "10px",
            borderColor: "lightblue",
            width: "200px",
            height: "40px",
            '&:hover': {
                backgroundColor: '#006dbc',
                color: "white"
        
        }},

        buttonDetail: {
            backgroundColor: "lightblue",
            color: "black",
            borderRadius: "10px",
            marginTop: "10px",
            borderColor: "lightblue",
            width: "100px",
            height: "40px",
            '&:hover': {
                backgroundColor: '#006dbc',
                color: "white"
        
        }},

        paper: {
            height: "250px",
            marginTop: "theme.spacing.unit * 3",
            overflowY: "auto"
        }
    })

    const classes = useStyles();

    return (
        <Grid>
            <Card className={classes.container}>
                <h3 className={classes.h3}>Class</h3>
                <Button variant="contained" onClick={addStudents} className={classes.button}>
                    Add Students
                    <AddIcon />
                </Button>
            

            <CardContent>
                <Paper className={classes.paper}>
                {classRoster.map(student => 
                <Table>
                <TableCell align="left" className={classes.tablecell}>{student.firstname} {student.lastname}</TableCell>
                <TableCell align="right" className={classes.tablecell}><Button className={classes.buttonDetail} onClick={() => handleStudentSelect(student.id, student.firstname, student.lastname)} id={student.username}>Details</Button>
                </TableCell>
                </Table>)}
                </Paper>
            </CardContent>
            </Card>
        </Grid>
    )
}

export default StudentList;