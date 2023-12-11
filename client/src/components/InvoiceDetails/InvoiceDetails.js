import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialState } from '../../initialState'
import { getInvoice } from '../../actions/invoiceActions'
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
// import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Spinner from '../Spinner/Spinner'
import ProgressButton from 'react-progress-button'
import axios from 'axios';
import { saveAs } from 'file-saver';
import Modal from '../Payments/Modal'
import styles from './InvoiceDetails.module.css'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { REACT_APP_API, REACT_APP_URL } from '../../config/constants'
import checkImg from '../../img/btn_check_on-b.png';

const InvoiceDetails = () => {

  const location = useLocation()
  const [invoiceData, setInvoiceData] = useState(initialState)
  const [company, setCompany] = useState({})
  const { id } = useParams()
  const { invoice } = useSelector((state) => state.invoices)
  const dispatch = useDispatch()
  const history = useHistory()
  const [sendStatus, setSendStatus] = useState(null)
  const [downloadStatus, setDownloadStatus] = useState(null)
  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const user = JSON.parse(localStorage.getItem('profile'))
  const data = require('../../config/data.json');

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
      backgroundColor: '#f2f2f2',
      borderRadius: '10px 10px 0px 0px'
    }
  }));


  const classes = useStyles()

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [id, dispatch, location]);

  useEffect(() => {
    if (invoice) {
      //Automatically set the default invoice values as the ones in the invoice to be updated
      setInvoiceData(invoice)
      setCompany(invoice?.businessDetails?.data?.data)
    }
  }, [invoice])

  // //Get the total amount paid
  // let totalAmountReceived = 0
  // for (var i = 0; i < invoice?.paymentRecords?.length; i++) {
  //   totalAmountReceived += Number(invoice?.paymentRecords[i]?.amountPaid)
  // }


  const editInvoice = (id) => {
    history.push(`/edit/invoice/${id}`)
  }

  const createAndDownloadPdf = () => {
    setDownloadStatus('loading')
    axios.post(`${REACT_APP_API}/create-pdf`,
      {
        date: invoice.createdAt,
        id: invoice.invoiceNumber,
        notes: invoice.notes,
        company: company,
        result: invoice.quizState,
      })
      .then(() => axios.get(`${REACT_APP_API}/fetch-pdf`, { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'invoice.pdf')
      }).then(() => setDownloadStatus('success'))
  }


  //SEND PDF INVOICE VIA EMAIL
  const sendPdf = (e) => {
    e.preventDefault()
    setSendStatus('loading')
    axios.post(`${REACT_APP_API}/send-pdf`,
      {
        date: invoice.createdAt,
        id: invoice.invoiceNumber,
        notes: invoice.notes,
        link: `${REACT_APP_URL}/invoice/${invoice._id}`,
        company: company,
        result: invoice.quizState,
      })
      // .then(() => console.log("invoice sent successfully"))
      .then(() => setSendStatus('success'))
      .catch((error) => {
        console.log(error)
        setSendStatus('error')
      })
  }


  const [open, setOpen] = useState(false)

  if (!invoice) {
    return (
      <Spinner />
    )
  }

  return (
    <div className={styles.PageLayout}>
      {invoice?.creator?.includes(user?.result?._id || user?.result?.googleId) && (
        <div className={styles.buttons}>
          <ProgressButton
            onClick={sendPdf}
            state={sendStatus}
            onSuccess={() => openSnackbar("Your report sent successfully")}
          >
            Send Result
          </ProgressButton>

          <ProgressButton
            onClick={createAndDownloadPdf}
            state={downloadStatus}>
            Download
          </ProgressButton>

          <ProgressButton
            onClick={() => editInvoice(invoiceData._id)}
          >
            Edit
          </ProgressButton>
        </div>
      )}

      <Modal open={open} setOpen={setOpen} invoice={invoice} />
      <div className={styles.invoiceLayout}>
        <Container className={classes.headerContainer}>
          <Grid container justifyContent="space-between" style={{ padding: '30px 0px' }}>
            {!invoice?.creator?.includes(user?.result._id || user?.result?.googleId) ?
              (
                <Grid item>
                </Grid>
              )
              : (
                <Grid item onClick={() => history.push('/settings')} style={{ cursor: 'pointer' }}>
                  {company?.logo ? <img src={company?.logo} alt="Logo" className={styles.logo} />
                    :
                    <h2>{company?.name}</h2>
                  }
                </Grid>
              )}
            <Grid item>
              {invoice?.creator?.includes(user?.result._id) && (
                <Container style={{ marginBottom: '20px' }}>
                  <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>From</Typography>
                  <Typography variant="subtitle2">{invoice?.businessDetails?.data?.data?.businessName}</Typography>
                  <Typography variant="body2">{invoice?.businessDetails?.data?.data?.email}</Typography>
                  <Typography variant="body2">{invoice?.businessDetails?.data?.data?.phoneNumber}</Typography>
                  <Typography variant="body2" gutterBottom>{invoice?.businessDetails?.data?.data?.address}</Typography>
                </Container>
              )}
            </Grid>
            <Grid item style={{ marginRight: 40, textAlign: 'right' }}>
              <Typography style={{ lineSpacing: 1, fontSize: 45, fontWeight: 700, color: 'gray' }} >Report</Typography>
              <Typography variant="overline" style={{ color: 'gray' }} >No: </Typography>
              <Typography variant="body2">{invoiceData?.invoiceNumber}</Typography>
            </Grid>
          </Grid >
        </Container>
        <Divider />
        <Container>
          <Grid container justifyContent="space-between" style={{ marginTop: '40px' }} >
          </Grid>
        </Container>
        <div>
          <div class="font-extrabold fixed bottom-50 right-10 ">
            <div class="p-5  bg-blue-500 text-white rounded-full border-2">
              Total Count: {invoice.totalCount}
            </div>
            <div class=" p-5 bg-blue-500 text-white rounded-full border-2">
              Limit Count: {invoice.limitCount}
            </div>
          </div>
          {data.map((question) => {
            return (
              <center>
                <div class="grid grid-flow-row-dense grid-cols-8 grid-rows-4">
                  <div class="text-left pl-20 m-1 col-span-8 row-span-1 font-bold">
                    {question.no + 1}: {question.quiz}
                  </div>
                  {/* Option 1: */}
                  <div class="text-left pl-24 m-1 col-span-5  hover:bg-blue-200" key={question.option.id}>
                    {question.option[0].text}
                  </div>
                  <div class="col-span-1">
                    {
                      (invoice.quizState[question.no] === 1) &&
                      <img src={checkImg} width="20px" height="20px" alt="img2" />
                    }
                  </div>

                  {/* Option 3:*/}
                  <div class="m-1  hover:bg-blue-200" key={question.option.id}>
                    {question.option[2].text}
                  </div>
                  <div>
                    {
                      (invoice.quizState[question.no] === 3) &&
                      <img src={checkImg} width="20px" height="20px" alt="img2" />
                    }
                  </div>
                  {/* Option 2: */}
                  <div class="text-left pl-24 m-1 col-span-5  hover:bg-blue-200" key={question.option.id}>
                    {question.option[1].text}

                  </div>
                  <div>
                    {
                      (invoice.quizState[question.no] === 2) &&
                      <img src={checkImg} width="20px" height="20px" alt="img2" />
                    }
                  </div>
                  {/* Option 4:*/}
                  <div className="m-1  hover:bg-blue-200" key={question.option.id}>
                    {question.option[3].text}
                  </div>
                  <div>
                    {
                      (invoice.quizState[question.no] === 4) &&
                      <img src={checkImg} width="20px" height="20px" alt="img2" />
                    }
                  </div>
                </div>
              </center>
            );
          })}
        </div>
        <form>
          <div>
            <div className={styles.addButton}>
            </div>
          </div>
          <div className={styles.note}>
            <h4 style={{ marginLeft: '-10px' }}>Note</h4>
            <p style={{ fontSize: '14px' }}>{invoiceData.notes}</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InvoiceDetails
