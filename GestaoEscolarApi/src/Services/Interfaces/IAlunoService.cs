using GestaoEscolarApi.src.DTOs;

public interface IAlunoService
{
    Task<IEnumerable<AlunoDto>> GetAllAsync();
    Task<AlunoDto> AddAsync(AlunoDto aluno);
}