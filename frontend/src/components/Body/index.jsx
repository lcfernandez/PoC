import { useState } from 'react';
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

    // Estado para a atualização da listagem de Instituições
    const [update, setUpdate] = useState(false);

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
            <ChartQtdAlunos />
        </div>
    );
}

export default Body;