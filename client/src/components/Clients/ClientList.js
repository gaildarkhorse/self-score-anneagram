/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Clients from './Clients'
import AddClient from './AddClient'
import { getClientsByUser } from '../../actions/clientActions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import NoData from '../svgIcons/NoData'
import Spinner from '../Spinner/Spinner'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ClientList = () => {

  const history = useHistory()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const { clients } = useSelector((state) => state.clients)
  const isLoading = useSelector(state => state.clients.isLoading)
  useEffect(() => {
    dispatch(getClientsByUser({ search: user?.result?._id || user.result.googleId }));
  }, [location, dispatch])

  if (!user) {
    history.push('/login')
  }


  if (isLoading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px' }}>
      <Spinner />
    </div>
  }

  if (clients.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px' }}>
        <List >
          <ListItem >
            <BusinessCenterIcon style={{ marginRight: '20px', color: 'gray' }} />
            <ListItemText primary="My Business" />
          </ListItem>

          <ListItem >
            <LocationOnIcon style={{ marginRight: '20px', color: 'gray' }} />
            <ListItemText primary="Toronto" />
          </ListItem>

          <ListItem >
            <PhoneInTalkIcon style={{ marginRight: '20px', color: 'gray' }} />
            <ListItemText primary="+12345678900" />
          </ListItem>

          <ListItem >
            <AlternateEmailIcon style={{ marginRight: '20px', color: 'gray' }} />
            <ListItemText primary="abc.www@xyz.com" />
          </ListItem>



        </List>

      </div>)
  }

}

export default ClientList

