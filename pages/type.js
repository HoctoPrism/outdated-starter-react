import React, {useEffect, useState} from "react";
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
    Alert, Button
} from "@mui/material";
import axios from "axios";
import defineTitle from "../services/defineTitle";
import New from "../components/elements/type/new";
import Update from "../components/elements/type/update";
import Delete from "../components/elements/type/delete";
import {useSession} from "next-auth/react";

function Type() {

    defineTitle('Liste des types');

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // WIP
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { data: session, status } = useSession();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        axios.get('/api/types').then((actualData) => {
            actualData = actualData.data;
            setLoading(true)
            setData(actualData.data);
            setError(null);
        }).catch((err) => {
            setError(err.message);
            setData(null);
        }).finally(() => {
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

    // gestion des droits
    if (status === "loading") {
        return  <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement...</Typography>
    }
    if (status === "unauthenticated") {
        return <Box className="f-c-c-c">
            <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Vous devez être connecté pour accéder à cette ressource</Typography>
            <Button variant="contained" sx={{ mt: 5 }} href="login">Connexion</Button>
        </Box>
    }
    if (session && session?.user?.role !== "ROLE_ADMIN"){
        return  <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Vous n&apos;êtes pas autorisé à accéder à cette ressource...</Typography>
    }

    return <Container maxWidth="md" id="type">
        <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 10}}>
            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Types de voiture</Typography>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des parkings...</Typography>
            ) : (
                <Box sx={{ maxWidth: '100%' }}>
                    <New newValue={{data}} handleDataChange={handleDataChange} />
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
                                                    <Update updateValue={{id, name, data}} handleDataChange={handleDataChange} />
                                                    <Delete deleteValue={{id, name, data}} handleDataChange={handleDataChange}/>
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