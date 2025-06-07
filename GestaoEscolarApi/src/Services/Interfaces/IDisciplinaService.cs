using GestaoEscolarApi.src.DTOs;

public interface IDisciplinaService
{
    Task<IEnumerable<DisciplinaDto>> GetAllAsync();
    Task<DisciplinaDto> AddAsync(DisciplinaDto disciplina);
}