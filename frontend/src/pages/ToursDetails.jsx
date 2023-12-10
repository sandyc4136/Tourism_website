import React, {useRef, useState} from 'react' ;
import '../styles/tour-details.css' ;
import {  Container, Row, Col, Form, ListGroup, ListGroupItemHeading } from 'reactstrap';
import {useParams} from 'react-router-dom';
import tourDate from '../assets/data/tours';
import calculateAvgRating from '../utils/avgRating';
import avatar from "../assets/images/avatar.jpg";
import Booking from '../Components/Booking/Booking';
import useFetch from "../hooks/useFetch";
import {BASE_URL} from "../utils/config";
import { useEffect } from 'react';

const ToursDetails = () => {
  const {id} = useParams()
  const reviewMsgRef = useRef('')
  const [tourRating, setTourRating]=useState(null)
   

  //fetch data from database
  const{data:tour, loading, error}= useFetch(`${BASE_URL}/tours/${id}`);
  
  const {
     photo,
     title, 
     desc, 
     price,
     address,
      reviews,
      city, 
      distance,
       maxGroupSize
  } = tour;
 
  const {totalRating, avgRating}  = calculateAvgRating(reviews)

  const options = {day: 'numeric', month: 'long' , year:'numeric'}

  const submitHandler = e=>{
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value;
  };

  useEffect(()=>{
    window.scrollTo(0,0)
  },[tour])

  return <>
  
  <section>
    <Container>
      {
        loading && <h4 className="text-center pt-5">Loading.......</h4>
      }
      {
        error && <h4 className="text-center pt-5">{error}</h4>
      }
      {
        !loading && !error && (<Row>
          <Col lg='8'>
            <div className="tour__content">
              <img src={photo} alt="" />
  
              <div className="tour__info">
                <h2>{title}</h2>
                <div className="d-flex align-item-center" gap-5 > </div>
                <span className="d-flex align-items-center gap-1">
            <i class="ri-star-s-fill" 
              style={{color : "var(--secondary-color)"}} 
              ></i>
            {calculateAvgRating == 0 ? null : avgRating}
            {totalRating == 0 ? (
              "Not rated"
              )  : (
                <span>({reviews?.length})</span>
              )} 
                </span>
                  <span>
                    <i class="ri-map-pin-user-fill"></i> {address}
                  </span>
              </div>
  
              <div className="tour__extra-details">
                <span>
                  <i class="ri-map-pin-2-line"></i> {city} 
                  </span>
                <span>
                  <i class="ri-money-dollar-circle-line"></i> ${price} per person 
                  </span>
                <span>
                  <i class="ri-map-pin-time--line"></i> ${distance} k/m
                  </span>
                <span>
                  <i class="ri-group-line"></i> {maxGroupSize}
                   </span>
              </div>
              <h5>Description</h5>
              <p>{desc}</p>
            </div>
              {/* ======= tour review section ======= */}
               <div className="tour__reviews mt-4">
                <h4>Reviews ({reviews?.length} review)</h4>
  
                <form onSubmit = {submitHandler}>
                  <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                    <span onClick={()=> setTourRating(1) } >
                     1 <i class="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setTourRating(2) } >
                     2 <i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={()=> setTourRating(3) } >
                     3 <i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={()=> setTourRating(4) } >
                     4 <i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={()=> setTourRating(5) } >
                      5 <i class="ri-star-s-fill"></i>
                      </span>
                  </div>
                  <div className="review__input">
                    <input type="text" ref={reviewMsgRef} placeholder="share your thoughts" required />
                    <button className="btn primary__btn text-white" type="submit">Submit
                    </button>
                  </div>
                </form>
                <ListGroup className="user__reviews mt-4">
                  {
                    reviews?.map(review=>(
                      <div className="review__item">
                        <img src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-item-center justify-content-between">
                            <div>
                              <h5>muhib</h5>
                              <p>
                                {new Date("01-18-2023").toLocaleDateString("en-US" , options) 
                                }
                              </p>
                            </div>
                            <span className="d-flex align-item-center">
                              5<i class="ri-star-s-fill"></i>
                            </span>
                          </div>
  
                          <h6>Amazing tour</h6>
                        </div>
                      </div>
                    ))
                  }
                </ListGroup>
               </div>
              {/* ======= tour review section end ======= */}
          </Col>
          <Col lg="4">
                <Booking tour={tour} avgRating={avgRating}/> 
          </Col>
        </Row>)
      }
      
    </Container>
  </section>
  </>
};

export default ToursDetails;