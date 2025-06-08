using GestaoEscolarApi.src.DTOs;
using GestaoEscolarApi.src.Models;

public class AlunoService : IAlunoService
{
    private readonly IAlunoRepository _repository;

    public AlunoService(IAlunoRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<AlunoDto>> GetAllAsync()
    {
        var alunos = await _repository.GetAllAsync();
        return alunos.Select(MapToDto);
    }

    public async Task<AlunoDto> AddAsync(AlunoDto alunoDto)
    {
        var cpfNumerico = new string(alunoDto.CPF.Where(char.IsDigit).ToArray());
        var aluno = new Aluno
        {
            NomeCompleto = alunoDto.NomeCompleto,
            DataNascimento = alunoDto.DataNascimento,
            CPF = cpfNumerico
        };

        var alunoCriado = await _repository.AddAsync(aluno);
        return MapToDto(alunoCriado);
    }

    private AlunoDto MapToDto(Aluno aluno)
    {
        return new AlunoDto
        {
            Id = aluno.Id,
            NomeCompleto = aluno.NomeCompleto,
            DataNascimento = aluno.DataNascimento,
            CPF = aluno.CPF
        };
    }
}