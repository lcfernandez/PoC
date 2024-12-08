import './index.css';

const FormInstituicao = () => {
    return (
        <form>
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" required="required" />
            
            <label for="uf">UF</label>
            <input type="text" id="uf" name="uf" maxLength="2" required="required" />
            
            <label for="qtd-alunos">Quantidade de alunos</label>
            <input type="number" id="qtd-alunos" name="qtd-alunos" min="0" required="required" />
        </form>
    );
}

export default FormInstituicao;