import React, { Component } from 'react';
import axios from 'axios';
import TableComp from './table'

class  EmpTab extends Component {

    initialState={
        tableData:[]
    }

    constructor(props){
        super(props);
        this.state=this.initialState;
        this.getData();
    }

    getData(){
        axios.get('http://localhost:1234/admin/employees')
         .then(res=>{
             if(res){
                 console.log(res)
                 this.setState({...this.state,tableData:res.data?.data}) 
             }
         })
         .catch(err=>{
             console.log(err)
         })
    }
    render() {
        return (
            <div>
                {this.state.tableData?(<div>
                    <TableComp data={this.state.tableData}></TableComp>
                </div>):(<div>No records found</div>)}
            </div>
        );
    }
}

export default EmpTab;