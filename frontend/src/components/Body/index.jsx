import { useState } from 'react';
import AddButton from './AddButton';
import BackendStatus from './BackendStatus';
import ChartQtdAlunos from './ChartQtdAlunos';
import InstituicoesTable from './InstituicoesTable';
import './index.css'

const Body = () => {
    // Estado para a atualização da listagem de Instituições
    const [update, setUpdate] = useState(false);

    return (
        <div className="body">
            <BackendStatus />
            <AddButton update={update} setUpdate={setUpdate} />
            <InstituicoesTable update={update} setUpdate={setUpdate} />
            <ChartQtdAlunos />
        </div>
    );
}

export default Body;