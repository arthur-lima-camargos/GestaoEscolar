using GestaoEscolarApi.src.Data;
using GestaoEscolarApi.src.Models;
using Microsoft.EntityFrameworkCore;

public class AlunoRepository : IAlunoRepository
{
    private readonly GestaoEscolarContext _context;

    public AlunoRepository(GestaoEscolarContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Aluno>> GetAllAsync()
    {
        return await _context.Alunos.Include(a => a.Notas).ToListAsync();
    }

    public async Task<Aluno> AddAsync(Aluno aluno)
    {
        _context.Alunos.Add(aluno);
        await _context.SaveChangesAsync();
        return aluno;
    }
}
