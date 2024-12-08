const FormInstituicao = () => {
    return (
        <form>
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" required="required" />
            
            <label for="uf">UF</label>
            <input type="text" id="uf" name="uf" maxLength="2" required="required" />
            
            <label for="qtd_alunos">Quantidade de alunos</label>
            <input type="number" id="qtd_alunos" name="qtd_alunos" min="0" required="required" />
        </form>
    );
}

export default FormInstituicao;