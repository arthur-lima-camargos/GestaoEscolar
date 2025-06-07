using GestaoEscolarApi.src.DTOs;
using GestaoEscolarApi.src.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class NotaService : INotaService
{
    private readonly INotaRepository _repository;

    public NotaService(INotaRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<NotaDto>> GetAllAsync()
    {
        var notas = await _repository.GetAllAsync();
        return notas.Select(MapToDto);
    }

    public async Task<NotaDto> GetByIdAsync(int id)
    {
        var nota = await _repository.GetByIdAsync(id);
        return nota != null ? MapToDto(nota) : null;
    }

    public async Task<NotaDto> AddAsync(NotaDto notaDto)
    {
        var nota = new Nota
        {
            Valor = notaDto.Valor,
            AlunoId = notaDto.AlunoId,
            DisciplinaId = notaDto.DisciplinaId
        };

        var notaCriada = await _repository.AddAsync(nota);
        return MapToDto(notaCriada);
    }

    public async Task<IEnumerable<NotaDto>> GetNotasByAlunoIdAsync(int alunoId)
    {
        var notas = await _repository.GetNotasByAlunoIdAsync(alunoId);
        return notas.Select(MapToDto);
    }

    public async Task<IEnumerable<NotaDto>> GetNotasByDisciplinaIdAsync(int disciplinaId)
    {
        var notas = await _repository.GetNotasByDisciplinaIdAsync(disciplinaId);
        return notas.Select(MapToDto);
    }

    private NotaDto MapToDto(Nota nota)
    {
        return new NotaDto
        {
            Id = nota.Id,
            Valor = nota.Valor,
            AlunoId = nota.AlunoId,
            NomeAluno = nota.Aluno?.NomeCompleto,
            DisciplinaId = nota.DisciplinaId,
            NomeDisciplina = nota.Disciplina?.Nome
        };
    }
}