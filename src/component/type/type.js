import React, {useEffect, useState} from "react";
import '../../App.css';
import '../../assets/css/component/_type.scss'
import {
    Box,
    Container,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Alert
} from "@mui/material";
import DeleteType from "./deleteType";
import NewType from "./newType";
import EditType from "./editType";

function Type() {

    document.title = 'Page des types';

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // WIP
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/types`)
            .then((response) => response.json())
            .then((actualData) => {
                setLoading(true)
                setData(actualData.data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleDataChange = async (dataChange, message) => {
        await setData(dataChange)
        if (message && message === 'edit'){
            setToastMessage({message: "Type modifié !", severity: "success"});
            setShowToast(true);
        } else if(message && message === 'delete') {
            setToastMessage({message: "Type supprimé !", severity: "success"});
            setShowToast(true);
        }
    }

    return <Container maxWidth="md">
        <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 10}}>
            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Types de voiture</Typography>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des parkings...</Typography>
            ) : (
                <Box sx={{ maxWidth: '100%' }}>
                    <NewType newValue={{data}} handleDataChange={handleDataChange} />
                    <TableContainer sx={{ mt:4 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell key={1}>ID</TableCell>
                                    <TableCell key={2}>Nom</TableCell>
                                    <TableCell key={3} align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({id, name}) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={name+id}>
                                            <TableCell>{id}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>{name}</TableCell>
                                            <TableCell>
                                                <Box sx={{display: 'flex', justifyContent: 'right'}}>
                                                    <EditType updateValue={{id, name, data}} handleDataChange={handleDataChange} />
                                                    <DeleteType deleteValue={{id, name, data}} handleDataChange={handleDataChange}/>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            )}
        </Paper>

        <Snackbar
            open={toast}
            autoHideDuration={3000}
            onClose={() => setShowToast(false)}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={() => setShowToast(false)} severity={toastMessage.severity} sx={{width: '100%'}}>
                {toastMessage.message}
            </Alert>
        </Snackbar>
    </Container>
}

export default Type;