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
        if (await isDisciplinaExists(disciplinaDto.Nome))
        {
            throw new InvalidOperationException("Disciplina com esse Nome já existe no banco de dados.");
        }

        var disciplina = new Disciplina
        {
            Codigo = disciplinaDto.Codigo,
            Nome = disciplinaDto.Nome
        };

        var disciplinaCriada = await _repository.AddAsync(disciplina);
        return MapToDto(disciplinaCriada);
    }

    public async Task<bool> isDisciplinaExists(string nome)
    {
        var alunos = await _repository.GetAllAsync();
        return alunos.Any(a => a.Nome == nome);
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