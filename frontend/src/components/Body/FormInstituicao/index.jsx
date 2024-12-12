import './index.css';

const FormInstituicao = (props) => {
    const {
        nome,
        setNome,
        uf,
        setUf,
        qtdAlunos,
        setQtdAlunos
    } = props;

    return (
        <form>
            <label htmlFor="nome">Nome</label>
            <input
                id="nome"
                name="nome"
                onChange={e => setNome(e.target.value)}
                placeholder="Ex: Universidade Federal do Rio de Janeiro"
                type="text"
                value={nome}
            />
            
            <label htmlFor="uf">UF</label>
            <input
                id="uf"
                maxLength="2" 
                name="uf"
                onChange={e => setUf(e.target.value)}
                placeholder="Ex: RJ"
                type="text"
                value={uf}
            />
            
            <label htmlFor="qtd-alunos">Quantidade de alunos</label>
            <input 
                id="qtd-alunos"
                min="0"
                name="qtd-alunos"
                onChange={e => setQtdAlunos(e.target.value)}
                placeholder="Ex: 69200"
                type="number"
                value={qtdAlunos}
            />
        </form>
    );
}

export default FormInstituicao;