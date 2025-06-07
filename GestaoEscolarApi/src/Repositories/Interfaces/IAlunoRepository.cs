using GestaoEscolarApi.src.Models;

public interface IAlunoRepository
{
    Task<IEnumerable<Aluno>> GetAllAsync();
    Task<Aluno> AddAsync(Aluno aluno);
}

