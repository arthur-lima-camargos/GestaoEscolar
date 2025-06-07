using GestaoEscolarApi.src.Data;
using GestaoEscolarApi.src.Models;
using Microsoft.EntityFrameworkCore;

public class DisciplinaRepository : IDisciplinaRepository
{
    private readonly GestaoEscolarContext _context;
    public DisciplinaRepository(GestaoEscolarContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Disciplina>> GetAllAsync()
    {
        return await _context.Disciplinas.Include(d => d.Notas).ToListAsync();
    }
    public async Task<Disciplina> AddAsync(Disciplina disciplina)
    {
        _context.Disciplinas.Add(disciplina);
        await _context.SaveChangesAsync();
        return disciplina;
    }
}