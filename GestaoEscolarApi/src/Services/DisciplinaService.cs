using GestaoEscolarApi.src.DTOs;
using GestaoEscolarApi.src.Models;

public class DisciplinaService : IDisciplinaService
{
    private readonly IDisciplinaRepository _repository;

    public DisciplinaService(IDisciplinaRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<DisciplinaDto>> GetAllAsync()
    {
        var disciplinas = await _repository.GetAllAsync();
        return disciplinas.Select(MapToDto);
    }

    public async Task<DisciplinaDto> AddAsync(DisciplinaDto disciplinaDto)
    {
        var disciplina = new Disciplina
        {
            Codigo = disciplinaDto.Codigo,
            Nome = disciplinaDto.Nome
        };

        var disciplinaCriada = await _repository.AddAsync(disciplina);
        return MapToDto(disciplinaCriada);
    }

    private DisciplinaDto MapToDto(Disciplina disciplina)
    {
        return new DisciplinaDto
        {
            Id = disciplina.Id,
            Codigo = disciplina.Codigo,
            Nome = disciplina.Nome
        };
    }
}