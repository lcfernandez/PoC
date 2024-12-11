import axios from 'axios';
import backendUrl from '../../utils/backend-url';
import React, { useLayoutEffect, useState } from 'react';
import AddButton from './AddButton';
import BackendStatus from './BackendStatus';
import ChartQtdAlunos from './ChartQtdAlunos';
import InstituicoesTable from './InstituicoesTable';
import './index.css'

const Body = () => {
    // Estados para os dados da Instituição
    const [nome, setNome] = useState(undefined);
    const [uf, setUf] = useState(undefined);
    const [qtdAlunos, setQtdAlunos] = useState(undefined);

    // Estado e evento para os dados da tabela
    const [data, setData] = useState([]);

    const fetchInstituicaoList = React.useMemo(() => async () => {
        try {
            const res = await axios.get(`${backendUrl}/instituicoes`);
            setData(res.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

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

    // Estado para a atualização dos dados da tabela e gráfico
    const [update, setUpdate] = useState(false);

    // Inicialização/atualização da tabela e gráfico
    useLayoutEffect(() => {
        fetchInstituicaoList();
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
                data={data}
                update={update}
                setUpdate={setUpdate}
            />
            <ChartQtdAlunos dataChart={dataChart} />
        </div>
    );
}

export default Body;