import React, { useLayoutEffect, useState } from 'react';
import AddButton from './AddButton';
import BackendStatus from './BackendStatus';
import ChartQtdAlunos from './ChartQtdAlunos';
import InstituicoesTable from './InstituicoesTable';
import './index.css'
import axios from 'axios';
import backendUrl from '../../utils/backend-url';

const Body = () => {
    // Estados para os dados da Instituição
    const [nome, setNome] = useState(undefined);
    const [uf, setUf] = useState(undefined);
    const [qtdAlunos, setQtdAlunos] = useState(undefined);

    // Estado para a atualização da listagem de Instituições
    const [update, setUpdate] = useState(false);

    // Estado e evento para os dados do gráfico
    // Implementados aqui por problemas de ciclo de vida quando presentes no ChartQtdAlunos
    const [dataChart, setDataChart] = useState([]);

    const fetchChart = async () => {
        try {
            const res = await axios.get(`${backendUrl}/instituicoes/chart`);
            setDataChart(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useLayoutEffect(() => {
        fetchChart();
    }, [update])

    return (
        <div className="body">
            <BackendStatus />
            <AddButton
                nome={nome}
                setNome={setNome}
                uf={uf}
                setUf={setUf}
                qtdAlunos={qtdAlunos}
                setQtdAlunos={setQtdAlunos}
                update={update}
                setUpdate={setUpdate}
            />
            <InstituicoesTable
                nome={nome}
                setNome={setNome}
                uf={uf}
                setUf={setUf}
                qtdAlunos={qtdAlunos}
                setQtdAlunos={setQtdAlunos}
                update={update}
                setUpdate={setUpdate}
            />
            <ChartQtdAlunos dataChart={dataChart} />
        </div>
    );
}

export default Body;