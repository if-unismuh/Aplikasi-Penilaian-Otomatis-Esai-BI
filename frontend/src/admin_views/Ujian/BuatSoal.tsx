import React, { PureComponent } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardHeader, Col, Row, TabContent, Container } from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';
import { Link, RouteComponentProps } from 'react-router-dom';
import SoalTab from './SoalTab';
import { initDataSoal, updateDataSoal } from './../../models/SoalData';
import DataSoal from './../../models/item_model';

/**
 *  Modal
 */
interface SoalModal { submit:boolean; batal:boolean; }

interface BuatSoalState 
{ 
  soalTab: number; 
  modal: SoalModal;
  listsoal: Array<DataSoal>;
}

interface BuatSoalAttribute { className?: string; }

interface RouteParam { idujian: string; }

/**
 * Kelas untuk membuat soal
 */
class BuatSoal extends PureComponent<BuatSoalAttribute & RouteComponentProps<RouteParam>, BuatSoalState>
{
  /**
   * ID UJIAN yang dibuatkan soalnya
   */
  private idujian: string;

  constructor(props: any) 
  {
    super(props);
    this.state = {
      soalTab: 0,
      listsoal: [],
      modal: {
        submit: false,
        batal: false
      }	
    };

    this.idujian = props.match.params.idujian;

    this.toggleSubmitSoal = this.toggleSubmitSoal.bind(this);
    this.toggleBatalUjian = this.toggleBatalUjian.bind(this);
    this.toggleSoal = this.toggleSoal.bind(this);

    this.getColorButton = this.getColorButton.bind(this);
  }

  componentDidMount()
  {
    initDataSoal(this.idujian).then(list => {
      this.setState({ listsoal: list });
    });
  }

  //---------------------------------- TOGGLE ------------------------------------//
 	public toggleSubmitSoal() : void 
 	{
    var modal = this.state.modal;
    modal.submit = !modal.submit;
    this.setState({ modal: modal });
  }
  
 	public toggleBatalUjian() : void
 	{
    var modal = this.state.modal;
    modal.batal = !modal.batal;
    this.setState({ modal: modal });
  }
  
  toggleSoal(tab: number) 
  {
    if (this.state.soalTab !== tab) 
    {
      this.setState({ soalTab: tab });
    }
  }

  //---------------------------------- RENDER -------------------------------------------------//

  renderModalBatal()
  {
    return (
      <Modal isOpen={this.state.modal.batal} toggle={this.toggleBatalUjian} className={'modal-danger ' + this.props.className}>
        <ModalHeader toggle={this.toggleBatalUjian}>Batal Input Soal</ModalHeader>
          <ModalBody>
            <p> Apakah anda yakin ingin membatalkan input soal ? <b>jika tekan "YA", maka semua soal yang anda inputkan sebelumnya tidak akan disimpan</b> dari data guru ?</p>
          </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.toggleBatalUjian}>Tidak</Button>
          <Link to="/ujian/tambah">
            <Button color="success" onClick={this.toggleBatalUjian}>Ya</Button>
          </Link>
        </ModalFooter>
      </Modal>
    );
  }

  renderModalSubmit()
  {
    return (
      <Modal isOpen={this.state.modal.submit} toggle={this.toggleSubmitSoal} className={'modal-success ' + this.props.className}>
        <ModalHeader toggle={this.toggleSubmitSoal}>Submit Ujian</ModalHeader>
          <ModalBody>
            <p> Apakah anda yakin ingin submit soal ? <b>Pastikan soal yang anda submit telah diinput dengan benar</b></p>
          </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={this.toggleSubmitSoal}>Tidak</Button>
            <Link to="/ujian">
              <Button color="success" onClick={this.toggleSubmitSoal}>Ya</Button>
            </Link>
        </ModalFooter>
      </Modal>
    );
  }

  getColorButton(tab: number)
  {
    if(this.state.soalTab === tab) return "success";
    else return "default";
  }

  public render() : JSX.Element 
  {
    return (
      <div className="animated fadeIn">
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" lg="12">

            <Card>
              <CardHeader>
                <h4 className="text-center">INPUT SOAL</h4>
              </CardHeader>
              <CardBody>
                <Row>
                      
                  <Col xs="12">
                    <TabContent activeTab={this.state.soalTab}>
                      {
                        this.state.listsoal.map((soal, index, array) => {
                          return(
                            <SoalTab 
                              key={soal.idsoal}
                              tabId={index}
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
                        <Button size='md' color={this.getColorButton(index)} className=" btn-outline-default" onClick={() => this.toggleSoal(index)}>
                        {index+1}
                        </Button>
                      )
                    })
                  }
                  </Col>
                      
                  { this.renderModalBatal() }

                  { this.renderModalSubmit() }

                  <Col className="col-sm-12 text-right">
                    <Button  color="primary"  onClick={this.toggleBatalUjian} >Kembali</Button>
                    <Button  color="success"  onClick={this.toggleSubmitSoal} >Submit Ujian</Button>
                  </Col>
        
                </Row>
              </CardBody>
            </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default BuatSoal;