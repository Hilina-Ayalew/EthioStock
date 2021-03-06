import React, { Component } from 'react'
import {CREATE_STOCK_MUTATION} from '../../gql/mutation/stock'

import { Mutation } from "@apollo/client/react/components";
import auth from '../../Auth'
import SideBar from '../Businessowner/Sidebar'
import Notifications from '../Notification/NotificationList'
import withAuth from '../../routers/withAuth';
import "antd/dist/antd.css"
import {Form, Button, Modal,Input, Card, Affix,Layout} from 'antd'
import bg from '../../img/bg.jpg';

import {Redirect} from 'react-router-dom'
import Header3 from '../Post/Header3'
const {  Footer } = Layout;

class CreateStock extends Component{
    constructor(){
        super();
        this.state ={
            description:'',
            noOfStock:0,
            closingDate:'',
            price:0,
            minAmountOfStockToBuy:'', 
            openingDate:'',
            serviceChargePercentage:'',
            modalVisible:false,  
            errMessage : '',
            createSuccess:false,
        }
    }
    showModal = () => {
        this.setState({
          modalVisible: true,
        });
      };

      hideModal = () =>{
        this.setState({
            modalVisible: false,
          });       
      }
   
    displaySideBar=()=>{
        document.getElementById("sidebar-container-s").style.display = "block";
    }
    closeSideBar=()=>{
        document.getElementById("sidebar-container-s").style.display = "none";
    }
    handlelogout= (e)=>{
        auth.logOut()
        this.props.history.push('/login')
    }
    onFinish = (values) => {
        console.log(values)
        this.setState({
            openingDate:values.openingDate, 
            closingDate: values.closingDate, 
            description: values.description, 
            noOfStock: values.noOfStock, 
            serviceChargePercentage:values.serviceChargePercentage,
            price: values.price, 
            minAmountOfStockToBuy: values.minAmountOfStockToBuy
        });
        this.setState({modalVisible:true})

        };


        getMutationResponse = (data)=>{
            const { message , success} = data.createStock;
            console.log("success", success)
            console.log("message", message)
            console.log(data)
            this.hideModal()
            this.setState({createSuccess:success})
            this.setState({errMessage:message})
          }
      onReset = () => {
        this.formRef.current.resetFields();

      }
    render(){
        const { TextArea } = Input;
        
        const { user } = this.props;
        const {openingDate, closingDate, description, noOfStock, price, minAmountOfStockToBuy,serviceChargePercentage,createSuccess,errMessage} = this.state
    if(createSuccess){
            return ( <Redirect to="/createaccountsuccess"/>)
    }
    return(
            <div>
                <Modal
                  title="Create Stock"
                  visible={this.state.modalVisible}
                  footer={[
                      <Button key="cancel" onClick={this.hideModal}>Return</Button>,
                      <Mutation
                        key="creatUserMutation"
                        mutation={CREATE_STOCK_MUTATION}
                        variables={{ openingDate, closingDate, description, noOfStock, price, minAmountOfStockToBuy,serviceChargePercentage }}
                        onCompleted={data=>this.getMutationResponse(data)}
                      >{
                          (mutation, {loading, error})=>(
                              <span>
                                  <Button key="submit" onClick={mutation}>Submit</Button>
                              </span>
                          )
                        }
                      </Mutation>
                  ]}
                >
                  <p>Opening Date: {openingDate}</p>
                  <p>Closing Date: {closingDate}</p>
                  <p>Description: {description}</p>
                  <p>No of stock: {noOfStock}</p>
                  <p>Service Charge(In %): {serviceChargePercentage}</p>
                  
                  <p>Price: {price}</p>
                  <p>Minimum amount of stock to buy: {minAmountOfStockToBuy}</p>
                </Modal>
                <Affix>
                 <Header3 handleLogout = {this.handlelogout} headerButtons={false}  displaySideBar = {this.displaySideBar}/>
                 </Affix>
                 <Card bordered={false} cover={<img alt="example" src={bg}  style={{   transparent :1 , marginTop:-10 ,opacity: 0.3 , height:200 , display:"block" ,} }/> }></Card>
               
               
             <Card style={{width:750 ,height:750 , opacity: 0.7, marginLeft:200 ,background:"whitesmoke",marginTop:-150}}>
                    
                 <h1>Welcome: {user.username}</h1>
                    <p className="createstock-title">New Stock</p>
                    <br/><br/>
                    <div className="createstock-fields">
                    <Card style={{width:750 ,height:650 , marginTop:-25, marginLeft:-26, opacity: 0.9 ,background:"white"}}>
                      
                        <Form ref={this.formRef} onFinish={this.onFinish} >
                        <p  className="authentication-error">{errMessage}</p>
                        
                            
                            <Form.Item name="price" label="Price" rules={[  {  required: true,  message: "please input price of a single stock" }]}>
                                <Input className="mb2" type="number"  placeholder="Price" />
                            </Form.Item>

                            <Form.Item label="Number of stock" name="noOfStock"  rules={[  {   required: true,message: "please input stock description"  } ]}>  
                                <Input className="mb2" type="number"  placeholder="No Of Stock" />
                            </Form.Item>

                            <Form.Item name="minAmountOfStockToBuy" label="Minimum amount of stock to buy"
                                rules={[ {required: true, message: "please input stock description" } ]}>
                                <Input type="number"  placeholder="No Of Stock" />
                            </Form.Item>
                            
                            <Form.Item name="serviceChargePercentage" label="Service Charge(In %)"
                                rules={[ {required: true, message: "please input service charge" } ]}>
                                <Input type="number"  placeholder="Service Charge" />
                            </Form.Item>

                            <Form.Item name="openingDate" label="Opening Date"
                                rules={[ {  required: true,  message: "please input stock description"   }  ]}>
                                    <Input type="datetime-local" />
                            </Form.Item>
                            
                            <Form.Item name="closingDate" label="Closing Date"
                                  rules={[  { required: true,  message: "please input stock description" } ]} >
                                        <Input type="datetime-local"  />
                                    
                            </Form.Item> 

                            <Form.Item name="description" label="Description" rules={[ {required: true, message: "please input stock description"}]}>
                                  <TextArea  placeholder="Post Description"  rows={4} />
                            </Form.Item>
                            
                            <Form.Item>
                                <Button htmlType = "submit"  className="login-form-button login-submit-btn">
                                    Create Stock
                                </Button>
                            </Form.Item>

                        </Form>
                            
                    </Card>
                    </div>
                        
                        </Card>
                    
                         <Notifications/>
                        
                        <SideBar closeSideBar= {this.closeSideBar}/>
                        <br/><br/><br/>
                        <Footer style={{ textAlign: 'center'  , marginTop:'auto' ,background:'#CEECE8'}}>Ethiostock ©2020 </Footer>
                        
                    </div>
                   
        )
    }

}

export default withAuth(CreateStock);