import React, { useEffect } from 'react'
import styles from './Dashboard.module.css'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getInvoicesByUser } from '../../actions/invoiceActions'
import Spinner from '../Spinner/Spinner'


const Dashboard = () => {

    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const {isLoading } = useSelector((state) => state?.invoices)

    // let totalPaid = 0
    // for (let i = 0; i < invoices.length; i++) {
    //     if (invoices[i].totalAmountReceived !== undefined) {
    //         totalPaid += invoices[i].totalAmountReceived
    //     }

    // }

    // let totalAmount = 0
    // for (let i = 0; i < invoices.length; i++) {
    //     totalAmount += invoices[i].total
    // }

    useEffect(() => {
        dispatch(getInvoicesByUser({ search: user?.result._id || user?.result?.googleId }));
        // eslint-disable-next-line
    }, [location, dispatch]);


    if (!user) {
        history.push('/login')
    }


    if (isLoading) {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px' }}>
            <Spinner />
        </div>
    }

    return (
        <div className={styles.pageContainer}>
            <section className={styles.stat}>
                <ul className={styles.autoGrid}>
                </ul>
            </section>
        </div>
    )
}

export default Dashboard
