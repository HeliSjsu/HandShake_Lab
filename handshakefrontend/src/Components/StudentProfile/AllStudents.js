
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import StudentCommon from './StudentCommon';
import backendconfig from '../../backendConfig';

//Define a StudentProfile Component
class AllStudents extends Component {
   
    constructor(props) {

    super(props);
    
    this.state = {
        studentList : [],
        searchname:'',
        searchSchool : '',
        searchmajor : '',
        filteredResult : [],
        authFlag : false,
    }
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.search = this.search.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    }


 
    inputChangeHandler = (event) => {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    search = (event) => {

        event.preventDefault(); 
        console.log("Calling Search" +this.state.searchSchool);
        if(this.state.searchname === '' && this.state.searchSchool === '' && this.state.searchmajor === ''){
            console.log("All is well");
            console.log(this.state.studentList);
            this.setState({
                filteredResult : this.state.studentList
            });
            return;
        }else{
            console.log("===========in else",this.state.searchname)
        }
        axios.get(backendconfig+'/user/getAllStudents',{
            params: {
              name: this.state.searchname,
              school : this.state.searchSchool,
              major : this.state.searchmajor
            }
          }).then((response) =>{
            console.log(response.data);
            this.setState({
                filteredResult : response.data
            });
          }).catch((err) =>{

          })
    }

    onClickHandler = (e) =>{
       if(this.state.editFlag === true) {
        
        this.setState({
            editFlag : false
       })
       } else {     
        this.setState({
            editFlag : true
       })
       }      
    }

     //get Student List from backend  
    componentDidMount(){
        console.log(" Component Did mount");

        axios.get(backendconfig+'/user/getAllStudents')
        .then((response) => {
            let data = response.data;
            console.log('Student data',data);
            if(response.status === 200) {
                this.setState({
                    studentList : data,
                    filteredResult : data
                });
            } else {
                this.setState({
                    authFlag : false
                });
            }
       
     }).catch(error => {
         this.setState({
             errorMsg : "Error has occured"
         })
     });
       
    }

    componentWillMount() {
       
    }
    render() {
        //redirect based on successful login
        let msg;
        let allStudent ;

        allStudent = 
        <div> {
            this.state.filteredResult.map(item => {
                return <StudentCommon student={item} history={this.props.history}></StudentCommon>          
            })
            }
           
        </div>;
        if(this.state.userType === '2') {
            
        }
      
        if (this.state.errorMsg) {
            msg = <div class="alert alert-danger" role="alert">{this.state.errorMsg}</div>;
        }
        return (
            <div class="container">
                <input type="text" class="form-control" name="searchname" id="searchName" placeholder="Search Name" onChange={this.inputChangeHandler}/>
                <input type="text" class="form-control" name="searchSchool" id="searchSchool" placeholder="Search School" onChange={this.inputChangeHandler}/>
                <input type="text" class="form-control" name="searchmajor" id="searchMajor" placeholder="Search Major" onChange={this.inputChangeHandler}/>
               <button  type="button" name="Search" value="Search" onClick={this.search}>Search</button> 
                {allStudent}
                {msg}
            </div>
           )
    }
}



export default AllStudents;
