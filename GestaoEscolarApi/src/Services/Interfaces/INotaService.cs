using GestaoEscolarApi.src.DTOs;

public interface INotaService
{
    Task<IEnumerable<NotaDto>> GetAllAsync();
    Task<NotaDto> GetByIdAsync(int id);
    Task<NotaDto> AddAsync(NotaDto notaDto);
    Task<IEnumerable<NotaDto>> GetNotasByAlunoIdAsync(int alunoId);
    Task<IEnumerable<NotaDto>> GetNotasByDisciplinaIdAsync(int disciplinaId);
}