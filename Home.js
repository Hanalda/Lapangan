import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import futsal from '../image/futsal.jpg';
import bt from '../image/bt.jpg';
import voli from '../image/voli.jpg';

export default class Home extends React.Component
{
    
    constructor(props) {
        super(props);
        this.state = {
            lapangan: [],
            find: "",
            filter:""
        }
    }
    bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    GetLapangan = () => {
        let url = "http://localhost:8080/lapangan/public/lapangan"
        axios.get(url)
        .then(res => {
            this.setState({lapangan: res.data.lapangan})
        })
        .catch(error => {
            console.log(error)
        })
    }


    componentDidMount(){
        this.GetLapangan()
    }

    render(){
        const renderData = this.state.lapangan.map((item, id)=>{

            })
        return(
            
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <h1 className="my-4">Booking Lapangan</h1>
                        <input type="text" className="form-control"
                        name="find" value={this.state.find} onChange={this.bind}
                        onKeyUp={this.Search} required placeholder="Pencarian.."/>
                                <hr></hr>
                                <h4>Panduan Booking </h4>
                                <p>
                                    1. Buka Website Ini
                               <br/>2. Pilih Lapangan yang akan dipesan
                               <br/>3. Lakukan Pembayaran
                                </p>
                                    
                                <p>
                                    <b>LOKASI</b>
                                <p><h7>Lamongan</h7></p>    
                                    <b>MORE INFO</b>
                                <p>0821-2040-7978</p>
                                    
                                </p>

                    </div>
                    <div className="col-lg-9">
                        <div id="slideshow" className="carousel slide my-4" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#slideshow" data-slide-to="0"
                                className="active"></li>
                                <li data-target="#slideshow" data-slide-to="1"></li>
                            </ol>
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active">
                                    <img className="d-block img-fluid" src={futsal} alt="First slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block img-fluid" src={bt} alt="Second Slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block img-fluid" src={voli} alt="Third Slide" />
                                </div>
                            </div>
                          <a className="carousel-control-prev" href="#slideshow" role="button"
                          data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                              </a>  
                              <a className="carousel-control-next" href="#slideshow" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                        </a>
                        </div>
                        <div className="row">
                            {renderData}
                                <hr></hr>
                    </div>
                </div>
            </div>
</div>
        );
    }
}
