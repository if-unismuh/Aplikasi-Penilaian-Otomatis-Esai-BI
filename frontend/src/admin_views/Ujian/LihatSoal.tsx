import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Modal, Form, CardGroup,  ModalBody, ModalFooter, ModalHeader, Badge, Input, Button, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane, Container } from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';
import { initDataSoal, updateDataSoal } from './../../models/SoalData';
import DataSoal from './../../models/item_model';

interface LihatSoalState { activeTab: number; listsoal: Array<DataSoal>;}

interface LihatSoalAttribute { className: string; }

interface RouteParam { idujian:string; }

/**
 * Kelas untuk melihat soal
 */
class LihatSoal extends Component<LihatSoalAttribute & RouteComponentProps<RouteParam>, LihatSoalState>
{
  /**
   * ID UJIAN
   * Keterangan Ujian
   */
  private idujian: string;

  /**
   * Konstruktor
   */
	constructor(props:any) 
	{
		super(props);
    
    this.idujian = props.match.params.idujian;

    this.state = { activeTab: 1, listsoal: [] };
    this.toggleSoal = this.toggleSoal.bind(this);
  }

  componentDidMount()
  {
    initDataSoal(this.idujian).then(list => {
      this.setState({ listsoal: list });
    });
  }

  toggleSoal(tab:any) 
  {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

	public render() : JSX.Element
	{
    return (
      <div className="animated fadeIn">
        <Container>
          <Row className="justify-content-center">
            <Col md="12">
              <CardGroup>
                <Card className="p-4">
                  <CardHeader>
                    <h5 className="text-center">LIHAT SOAL</h5>
                  </CardHeader>
                        
                  <CardBody>
                    <Row>
                      <Col xs="12">
                        <TabContent soalTab={this.state.soalTab}>
                          {
                            this.state.listsoal.map((soal, index, array) => {
                              return(
                                <SoalTab 
                                  tabId={index}
                                  viewonly={true}
                                  idujian={this.idujian} 
                                  idsoal={soal.idsoal}
                                  skorMin={soal.skorMin} 
                                  skorMax={soal.skorMax}
                                  materiPokok={soal.materiPokok} 
                                  kompetensiDasar={soal.kompetensiDasar} 
                                  soalEsai={soal.soalEsai} 
                                  />
                              );
                            })
                          }
                        </TabContent>
                      </Col>

                      <Col className="col-sm-12 text-center">
                      {
                        this.state.listsoal.map((soal, index, array) => {
                          return (
                            <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggleSoal(index)}>
                            {index}
                            </Button>
                          )
                        })
                      }
                      </Col>

                      <Col className="col-sm-12 text-right">
                        <Button  color="primary">Kembali</Button>
                      </Col>
            
                    </Row>
                  </CardBody>
                    
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LihatSoal;