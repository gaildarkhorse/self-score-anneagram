import React, { useState, useEffect } from 'react'
import styles from './Invoice.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Container, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { initialState } from '../../initialState'
import { createInvoice, getInvoice, updateInvoice } from '../../actions/invoiceActions';
import { getClientsByUser } from '../../actions/clientActions'
import AddClient from './AddClient';
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { REACT_APP_API } from '../../config/constants'
import checkImg from '../../img/btn_check_on-b.png';

// import moment from 'moment'
// import { toCommas } from '../../utils/utils'
// import IconButton from '@material-ui/core/IconButton';
// import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import Avatar from '@material-ui/core/Avatar';
// import Chip from '@material-ui/core/Chip';
// import InvoiceType from './InvoiceType';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    table: {
        minWidth: 650,
    },

    headerContainer: {
        // display: 'flex'
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(1),
    }
}));

const Invoice = () => {

    const location = useLocation()
    const [invoiceData, setInvoiceData] = useState(initialState)
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today.getTime());
    const { id } = useParams()
    const { invoice } = useSelector((state) => state.invoices);
    const dispatch = useDispatch()
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'))
    const data = require('../../config/data.json');

    let initArray = Array.from({ length: 72 }, () => 0);
    const [limitCount, setLimitCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [quizState, updateQuizState] = useState(invoice ? invoice.quizState : initArray);

    const optionClickOne = (question) => {
        let temp = totalCount;
        let temp_limit = limitCount;
        if (question.option[1].isChecked) {
            question.option[1].isChecked = (!question.option[1].isChecked);
            temp--;
        }
        if (question.option[2].isChecked) {
            question.option[2].isChecked = (!question.option[2].isChecked);
            temp--;
            temp_limit--;
        }
        if (question.option[3].isChecked) {
            question.option[3].isChecked = (!question.option[3].isChecked);
            temp--;
            temp_limit--;
        }

        question.option[0].isChecked = (!question.option[0].isChecked);
        if (question.option[0].isChecked) {
            temp++;
            let tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 1;
            updateQuizState(tmpQuizState);
        } else {
            temp--;
            const tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 0;
            updateQuizState(tmpQuizState);
        }
        setTotalCount(temp);
        setLimitCount(temp_limit);
    }

    const optionClickTwo = (question) => {
        let temp = totalCount;
        let temp_limit = limitCount;
        if (question.option[0].isChecked) {
            question.option[0].isChecked = (!question.option[0].isChecked);
            temp--;
        }
        if (question.option[2].isChecked) {
            question.option[2].isChecked = (!question.option[2].isChecked);
            temp--;
            temp_limit--;
        }
        if (question.option[3].isChecked) {
            question.option[3].isChecked = (!question.option[3].isChecked);
            temp--;
            temp_limit--;
        }

        question.option[1].isChecked = (!question.option[1].isChecked);
        if (question.option[1].isChecked) {
            temp++;
            let tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 2;
            updateQuizState(tmpQuizState);
        } else {
            temp--;
            let tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 0;
            updateQuizState(tmpQuizState);
        }
        setTotalCount(temp);
        setLimitCount(temp_limit);
    }

    const optionClickThree = (question) => {
        let temp = totalCount;
        let temp_limit = limitCount;
        if (question.option[0].isChecked) {
            question.option[0].isChecked = (!question.option[0].isChecked);
            temp--;
        }
        if (question.option[1].isChecked) {
            question.option[1].isChecked = (!question.option[1].isChecked);
            temp--;
        }
        if (question.option[3].isChecked) {
            question.option[3].isChecked = (!question.option[3].isChecked);
            temp--;
            temp_limit--;
        }

        question.option[2].isChecked = (!question.option[2].isChecked);
        if (question.option[2].isChecked) {
            setTotalCount(totalCount + 1);
            let tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 3;
            updateQuizState(tmpQuizState);
            temp++;
            temp_limit++;
        } else {
            setTotalCount(totalCount - 1);
            let tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 0;
            updateQuizState(tmpQuizState);
            temp--;
            temp_limit--;
        }
        setTotalCount(temp);
        setLimitCount(temp_limit);
    }

    const optionClickFour = (question) => {
        let temp = totalCount;
        let temp_limit = limitCount;
        if (question.option[0].isChecked) {
            question.option[0].isChecked = (!question.option[0].isChecked);
            temp--;
        }
        if (question.option[2].isChecked) {
            question.option[2].isChecked = (!question.option[2].isChecked);
            temp--;
            temp_limit--;
        }
        if (question.option[1].isChecked) {
            question.option[1].isChecked = (!question.option[1].isChecked);
            temp--;
        }

        question.option[3].isChecked = (!question.option[3].isChecked);
        if (question.option[3].isChecked) {
            temp++;
            temp_limit++;
            const tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 4;
            updateQuizState(tmpQuizState);
        } else {
            temp--;
            temp_limit--;
            const tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 0;
            updateQuizState(tmpQuizState);
        }
        setTotalCount(temp);
        setLimitCount(temp_limit);
    }

    useEffect(() => {
        getTotalCount()
        // eslint-disable-next-line
    }, [location])


    const getTotalCount = async () => {
        try {
            const response = await axios.get(`${REACT_APP_API}/invoices/count?searchQuery=${user?.result?._id}`);
            //   console.log(response.data);
            //Get total count of invoice from the server and increment by one to serialized numbering of invoice
            setInvoiceData({ ...invoiceData, invoiceNumber: (Number(response.data) + 1).toString().padStart(3, '0') })
        } catch (error) {
            console.error(error);
        }
    }




    useEffect(() => {
        dispatch(getInvoice(id));
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        dispatch(getClientsByUser({ search: user?.result._id || user?.result?.googleId }));
        // eslint-disable-next-line
    }, [dispatch]);


    useEffect(() => {
        if (invoice) {
            //Automatically set the default invoice values as the ones in the invoice to be updated
            setInvoiceData(invoice)
            setSelectedDate(invoice.dueDate)
        }
    }, [invoice])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    console.log(invoiceData)

    const handleSubmit = async (e) => {
        e.preventDefault()
        localStorage.setItem('data', JSON.stringify({ ...data }));
        if (invoice) {
            dispatch(updateInvoice(invoice._id, {
                ...invoiceData,
                invoiceNumber: `${invoiceData.invoiceNumber < 100 ?
                    (Number(invoiceData.invoiceNumber)).toString().padStart(3, '0')
                    : Number(invoiceData.invoiceNumber)
                    }`,
                quizState: quizState,
                creator: [user?.result?._id || user?.result?.googleId],
                totalCount: totalCount,
                limitCount: limitCount,
            }))
            history.push(`/invoice/${invoice._id}`)
        } else {

            dispatch(createInvoice({
                ...invoiceData,
                invoiceNumber: `${invoiceData.invoiceNumber < 100 ?
                    (Number(invoiceData.invoiceNumber)).toString().padStart(3, '0')
                    : Number(invoiceData.invoiceNumber)
                    }`,
                quizState: quizState,
                creator: [user?.result?._id || user?.result?.googleId],
                totalCount: totalCount,
                limitCount: limitCount,
            },
                history
            ))
        }
        // setInvoiceData(initialState)
    }

    const classes = useStyles()
    const [open, setOpen] = useState(false);

    if (!user) {
        history.push('/login')
    }
    return (
        <div className={styles.invoiceLayout}>
            <form onSubmit={handleSubmit} className="mu-form">
                <AddClient setOpen={setOpen} open={open} />
                <Container className={classes.headerContainer}>
                    <Grid container justifyContent="space-between" >
                    </Grid >
                </Container>
                <Divider />
                <div>
                    <TableContainer component={Paper} className="tb-container">
                    </TableContainer>
                </div>
                <div className={styles.toolBar}>
                    <Container >
                        <Grid container >
                            <Grid item style={{ marginRight: 5}} >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Due date"
                                        format="MM/dd/yyyy"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </ MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <Divider />
                <div>
                    <div class = "font-extrabold fixed bottom-20 right-10 ">
                        <div class = {`p-5  ${totalCount >= 72 ? "bg-green-500" : "bg-blue-500" } text-white rounded-full border-2`}>
                            Total Count: {totalCount}
                        </div>
                        <div class = {` p-5 ${ limitCount>= 1? (limitCount>= 5? "bg-red-500":"bg-blue-500") :"bg-green-500" } text-white rounded-full border-2 `}>
                            Limit Count: {limitCount}
                        </div>
                    </div>
                    <p class = "font-extrabold m-5 "><center>Choose the statement of each pair that best descripbes you.</center></p>
                    <Divider />
                    
                    {data.map((question) => {
                        return (
                            <center>
                                <div class="grid grid-flow-row-dense grid-cols-8 grid-rows-4">
                                    <div class="text-left pl-20 m-1 col-span-8 row-span-1 font-bold">
                                        {question.no + 1}: {question.quiz}
                                    </div>
                                    {/* Option 1: */}
                                    <div class="text-left pl-24 m-1 col-span-5  hover:bg-blue-200" onClick={() => optionClickOne(question)} key={question.option.id}>
                                        {question.option[0].text}
                                    </div>
                                    <div class="col-span-1">
                                        {
                                            (quizState[question.no] === 1) &&
                                            <img src={checkImg} width="20px" height="20px" alt="img2" />
                                        }
                                    </div>
                                    
                                    {/* Option 3:*/}
                                    <div class="m-1  hover:bg-blue-200" onClick={() => optionClickThree(question)} key={question.option.id}>
                                        {question.option[2].text}
                                    </div>
                                    <div>
                                        {
                                            (quizState[question.no] === 3) &&
                                            <img src={checkImg} width="20px" height="20px" alt="img2" />
                                        }
                                    </div>
                                    {/* Option 2: */}
                                    <div class="text-left pl-24 m-1 col-span-5  hover:bg-blue-200" onClick={() => optionClickTwo(question)} key={question.option.id}>
                                        {question.option[1].text}
                                        
                                    </div>
                                    <div>
                                        {
                                            (quizState[question.no] === 2) &&
                                            <img src={checkImg} width="20px" height="20px" alt="img2" />
                                        }    
                                    </div>    
                                    {/* Option 4:*/}
                                    <div className="m-1  hover:bg-blue-200" onClick={() => optionClickFour(question)} key={question.option.id}>
                                        {question.option[3].text}
                                    </div>
                                    <div>
                                        {
                                            (quizState[question.no] === 4) &&
                                            <img src={checkImg} width="20px" height="20px" alt="img2" />
                                        }
                                    </div>
                                </div>
                            </center>
                        );
                    })}
                </div>

                <div className={styles.note}>
                    <h4>Memo</h4>
                    <textarea
                        style={{ border: 'solid 1px #d6d6d6', padding: '10px' }}
                        placeholder="Provide additional details or terms of service"
                        onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                        value={invoiceData.notes}
                    />
                </div>

                <Grid container justifyContent="center">
                    <Button
                        variant="contained"
                        style={{ justifyContentContent: 'center' }}
                        type="submit"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save and Continue
                    </Button>
                </Grid>
            </form >
        </div >
    )
}

export default Invoice
