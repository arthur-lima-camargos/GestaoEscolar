using GestaoEscolarApi.src.Models;

public interface IDisciplinaRepository
{
    public Task<IEnumerable<Disciplina>> GetAllAsync();
    public Task<Disciplina> AddAsync(Disciplina disciplina);
}