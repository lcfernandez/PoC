import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FormInstituicao from '../FormInstituicao';
import axios from 'axios';
import backendUrl from '../../../utils/backend-url';

const AddButton = (props) => {
    const {
        nome,
        setNome,
        uf,
        setUf,
        qtdAlunos,
        setQtdAlunos,
        update,
        setUpdate
    } = props;

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setNome(undefined);
        setUf(undefined);
        setQtdAlunos(undefined);
    };
    
    const handleShow = () => setShow(true);

    // Evento para salvar o registro
    const handleSubmit = async () => {
        try {
            const body = {
                "nome": nome, "uf": uf, "qtdAlunos": parseInt(qtdAlunos)
            };

            await axios.post(`${backendUrl}/instituicoes`, body);
            setUpdate(!update);
            setShow(false);
            setNome(undefined);
            setUf(undefined);
            setQtdAlunos(undefined);
        } catch (error) {
            console.error(error);
        }
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