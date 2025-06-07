using GestaoEscolarApi.src.Data;
using GestaoEscolarApi.src.Models;
using Microsoft.EntityFrameworkCore;

public class NotaRepository : INotaRepository
{
    private readonly GestaoEscolarContext _context;

    public NotaRepository(GestaoEscolarContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Nota>> GetAllAsync()
    {
        return await _context.Notas
            .Include(n => n.Aluno)
            .Include(n => n.Disciplina)
            .ToListAsync();
    }

    public async Task<Nota> GetByIdAsync(int id)
    {
        return await _context.Notas
            .Include(n => n.Aluno)
            .Include(n => n.Disciplina)
            .FirstOrDefaultAsync(n => n.Id == id) ?? new Nota();
    }

    public async Task<Nota> AddAsync(Nota nota)
    {
        _context.Notas.Add(nota);
        await _context.SaveChangesAsync();

        return await _context.Notas
            .Include(n => n.Aluno)
            .Include(n => n.Disciplina)
            .FirstOrDefaultAsync(n => n.Id == nota.Id) ?? new Nota();
    }

    public async Task<IEnumerable<Nota>> GetNotasByAlunoIdAsync(int alunoId)
    {
        return await _context.Notas
            .Include(n => n.Disciplina)
            .Where(n => n.AlunoId == alunoId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Nota>> GetNotasByDisciplinaIdAsync(int disciplinaId)
    {
        return await _context.Notas
            .Include(n => n.Disciplina)
            .Include(n => n.Aluno)
            .Where(n => n.DisciplinaId == disciplinaId)
            .ToListAsync();
    }
}