import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import './index.css';
import backendUrl from '../../../utils/backend-url';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import FormInstituicao from '../FormInstituicao';

const InstituicoesTable = (props) => {
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

    // Estados e eventos para o modal de Editar
    const [id, setId] = useState(undefined);
    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = instituicao => {
        setNome(instituicao.nome);
        setUf(instituicao.uf);
        setQtdAlunos(instituicao.qtdAlunos);
        setId(instituicao._id);
        setShowEdit(true);
    }

    // Estado para a listagem de Instituições
    const [data, setData] = useState([]);

    // Evento para capturar os registros
    const fetchInstituicaoList = React.useMemo(() => async () => {
        try {
            const res = await axios.get(`${backendUrl}/instituicoes`);
            setData(res.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    // Evento para excluir o registro
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendUrl}/instituicoes/${id}`);
            setUpdate(!update);
        } catch (error) {
            console.error(error);
        }
    }

    // Evento para editar o registro
    const handleSubmitEdit = async () => {
        try {
            const body = {
                "nome": nome, "uf": uf, "qtdAlunos": parseInt(qtdAlunos)
            };

            await axios.put(`${backendUrl}/instituicoes/${id}`, body);
            setUpdate(!update);
        } catch (error) {
            console.error(error);
        }
    }    

    // Inicialização/atualização da listagem
    useEffect(() => {
        fetchInstituicaoList();
    }, [update]);

    const columns = React.useMemo(
        () => [
            { Header: 'Nome', accessor: 'nome' },
            { Header: 'UF', accessor: 'uf' },
            { Header: 'Qtd Alunos', accessor: 'qtdAlunos' },            
        ],
        []
    );

    // Criação das colunas e botões para edição/exclusão
    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "editar",
                Cell: ({row}) => (
                    <div className="action-button-container">
                        <Button size="sm" onClick={() => handleShowEdit(row.original)}>Editar</Button>
                    </div>
                )
            },
            {
                id: "excluir",
                Cell: ({row}) => (
                    <div className="action-button-container">
                        <Button variant="danger" onClick={() => handleDelete(row.original._id)} size="sm">Excluir</Button>
                    </div>
                )
            }
        ])
    }
    
    const tableInstance = useTable({ columns, data }, tableHooks)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div className="table-container">
            <table {...getTableProps()} style={{ width: '100%', maxHeight: '400px', overflowY: 'auto' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        // Como o id nesse objeto é inexistente e só é necessário um, estou colocando estaticamente para evitar o Warning
                        <tr {...headerGroup.getHeaderGroupProps()} key={1}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} key={column.id}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {data.length === 0 ? <tr><td colSpan="5">Não há registros de Instituições.</td></tr> : rows.map(row => { // Tratamento para banco vazio adicionado
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} key={cell.column.id}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Modal para Editar Instituição*/}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Instituição</Modal.Title>
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
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSubmitEdit}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InstituicoesTable;