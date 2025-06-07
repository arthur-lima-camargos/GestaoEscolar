using GestaoEscolarApi.src.Models;

public interface INotaRepository
{
    Task<IEnumerable<Nota>> GetAllAsync();
    Task<Nota> GetByIdAsync(int id);
    Task<Nota> AddAsync(Nota nota);
    Task<IEnumerable<Nota>> GetNotasByAlunoIdAsync(int alunoId);
    Task<IEnumerable<Nota>> GetNotasByDisciplinaIdAsync(int disciplinaId);
}

