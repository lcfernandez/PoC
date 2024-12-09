import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FormInstituicao from '../FormInstituicao';
import axios from 'axios';
import backendUrl from '../../../utils/backend-url';

const AddButton = (props) => {
    const {update, setUpdate} = props;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Estados para os dados da Instituição
    const [nome, setNome] = useState(undefined);
    const [uf, setUf] = useState(undefined);
    const [qtdAlunos, setQtdAlunos] = useState(undefined);

    // Evento para salvar o registro
    const handleSubmit = () => {
        const body = {
            "nome": nome, "uf": uf, "qtdAlunos": parseInt(qtdAlunos)
        };

        axios
            .post(`${backendUrl}/instituicoes`, body)
            .then(() => {
                setUpdate(!update);
            })
            .catch(err => alert(err.response.data.message || err.response.data));
    }

    return (
        <div className="add-button-container">
            <Button variant="success" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Nova Instituição
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nova Instituição</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInstituicao
                        nome={nome}
                        setNome={setNome}
                        uf={uf}
                        setUf={setUf}
                        qtdAlunos={qtdAlunos}
                        setQtdAlunos={setQtdAlunos}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddButton;