import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,Breadcrumb, BreadcrumbItem,Button,
  Modal, ModalHeader, ModalBody,
  Form, FormGroup,Input,Label, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';  
import { Control, Errors,LocalForm } from 'react-redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
}
 
  render(){
    const RenderDish = ({dish})=> {
      console.log(dish);
        return (
          <div className="col-xs-12 col-sm-12 col-md-10 m-1">
                <Card>
                  <CardImg top src={dish.image} alt={dish.name} >
                  </CardImg>
                  <CardBody>
                    <CardTitle >{dish.name}</CardTitle>
                    <CardTitle >{dish.description}</CardTitle>
                  </CardBody>
                </Card>
            </div>
    
            
        );
    }
    
    const RenderComments = ({comments}) =>{
      const element = <FontAwesomeIcon icon={faPencilAlt} />
      if ({comments}!=null) {
        return(
          <div  className="col-xs-12 col-sm-12 col-md-10 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
            {comments.map((comment)=>{
                comment.date=new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));
                return(
                  <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>-- {comment.author},{comment.date}</p>
                  </li>
                )
              })}
            </ul>
            <Button outline type="submit" value="submit" onClick={this.toggleModal}>
                  <div>{element} Submit Comment</div>
            </Button>
          </div>
        )
      }
      else {
        return(
          <div></div>
        )
        
      }
      
    }
    const DishDetail = (props) => {
      console.log(props);
      if (props.dish!=null){
        return (
          <div className="container">
                <div className="row">
                    <Breadcrumb>
    
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div> 
          );
      }
      else {
        return (
            <div></div>
        );
      }
    }
    
    return(
        <div>{DishDetail(this.props)}
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
              <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                      <Row className="form-group">
                          <Col md={{size: 12}}>
                              <Label>Rating</Label>
                              <Control.select model=".rating" name="rating"
                                  className="form-control">
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                              </Control.select>
                          </Col>
                      </Row>
                      <Row className="form-group" style={{display:'block'}}>
                                <Label htmlFor="author" md={5} >Your name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: '',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                      <Row className="form-group" style={{display:'block'}}>
                          <Label htmlFor="message" style={{marginLeft:'16px'}}>Comment</Label>
                          <p></p>
                          <Col md={12}>
                              <Control.textarea model=".comment" 
                                  rows="10"
                                  className="form-control" />
                          </Col>
                      </Row>
                      <Button type="submit" value="submit" color="primary">Submit</Button>
                  </LocalForm>
              </ModalBody>
            </Modal>
          </div>
        //,RenderComments(this.props.comments)
    )
  }
  
}   

export default CommentForm;

