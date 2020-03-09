
import React, { Component } from 'react';
import '../../App.css';
import JobMoreDetail from './JobMoredetail';
import { Link } from 'react-router-dom';

//Define a StudentProfile Component
class JobDetails extends Component {

    constructor(props) {
        super(props);
        console.log("Inside JobDetails" + props.userType + " other:" + props.details.title);
        this.state = {
            userType: props.userType,
            jid: props.details.jid,
            c_userId: props.details.user_id,
            title: props.details.title,
            catagory: props.details.job_category,
            c_name: props.details.c_name,
            c_city: props.details.city,
            c_state: props.details.state,
            c_country: props.details.scountry,
            loc: props.details.location,
            errorMsg: "",
            selectedFile: null,
            editFlag: false,
            authFlag: false,
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        this.setState()
    }

    inputChangeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    onClickHandler = (e) => {
        if (this.state.editFlag === true) {

            this.setState({
                editFlag: false
            })
        } else {
            this.setState({
                editFlag: true
            })
        }
    }

    render() {
        //redirect based on successful login
        // let msg;
        let editedValues, userSpecificDisplay;
        userSpecificDisplay = "";
        console.log("User type is", this.state.userType, typeof this.state.userType);
        if (this.state.userType === "1") {
            userSpecificDisplay = <Link to={{
                pathname: '/company',
                id: this.state.c_userId,
                userType: this.state.userType
            }} > <span> {this.state.c_name} </span> </Link>;
        }


        console.log("JobDetail State", this.props);
        if (this.state.editFlag) {
           // editedValues ="";
            editedValues =
                <div>
                    <JobMoreDetail moredetail={this.props.details}></JobMoreDetail>
                </div>;
        }
        return (
            <div>
                <div class="row">
                    <div class="col-sm-4" style={{overflowY :"scroll"}}>
                        <div style={{ borderBottom: "solid black" }}>
                            <li>
                            <div>
                        <label class="h4"> Job Title :</label>
                        <span style={{ display: 'block', width: 100 }}>{this.state.title}</span>
                    </div>
                    <div>
                        <label class="h5">Job Location: </label>
                        <span style={{ display: 'block', width: 100 }}>{this.state.loc}</span>
                    </div>
                    <div>
                        {userSpecificDisplay}
                    </div>
                    {/* <span>{this.state.c_city},{this.state.c_state}</span> */}
                    <div>
                        <label class="h5"> Job Category: </label>
                        <span style={{ display: 'block', width: 100 }}>{this.state.catagory}</span>
                    </div>
                    <div>
                        <a onClick={this.onClickHandler}>Click here for more info</a>
                    </div>
                            </li>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        {editedValues}
                    </div>
                </div>

            </div>
        )
    }
}



export default JobDetails;


//export default CompanyBasicDetail 