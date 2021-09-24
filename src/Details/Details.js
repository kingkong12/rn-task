
import React , {useEffect, useState} from 'react';
import {
    useParams, 
  } from "react-router-dom";
import axios from "axios";
import {  Spinner, Image, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {getDetailsApi} from '../Helpers/getDetailsApi'
import {errorMessage} from '../Constonts/errorMessgaes'


const Details = () =>{
    let { id } = useParams();
    const [ state, setState ] = useState({})
    const [error , changeError ] = useState('')
    const [showSpinner , toggleSpinenr ] = useState(false)
    let history = useHistory();

    useEffect(()=> {
        toggleSpinenr(true)
        axios.get(getDetailsApi(id)).then((response) => {
            const { data }  =  response;
            setState(data)
            console.log('response', data)
          }).catch((response)=>{
      
            changeError(errorMessage)
            setTimeout(()=>{
                history.push(`/`);
            }, 3000 )
          }).finally(() =>{
            toggleSpinenr(false)
          });
    }, [id])


    const renderRow = (heading, content ) => {
        if(!content) return
        return   (
            <div>
                <div className="fw-bold">{heading}</div>
                <div>{content}</div>
            </div>
        )
    }
    
    return (
        <Container>
        {error}
        {showSpinner && (<Spinner animation="grow" variant="dark" />) }
        {
        (!showSpinner && !error && 
        <>
          <div className="d-inline-flex align-items-center ">
          <Image src={state?.data?.avatar} roundedCircle />
           <p className="fs-5 ms-4 fw-bold">{state?.data?.first_name}</p>
           <p className="fs-5 mx-1 fw-bold">{state?.data?.last_name}</p>
          </div>

            <Container className="card ">
                <h3   className="text-center" > General Information </h3>
                <div   className="d-inline-flex justify-content-around">
                    {renderRow('ID',state?.data?.id )}
                    {renderRow('Email',state?.data?.email)}
                </div>
                <div  className="d-inline-flex justify-content-around">
                    {renderRow('First Name',state?.data?.first_name )}
                    {renderRow('Last Name',state?.data?.last_name)}
    
                </div>
            </Container>
            </>
            )}
           
                  </Container>
    );
  
}

export default Details;