using GestaoEscolarApi.src.Models;
using Microsoft.EntityFrameworkCore;

namespace GestaoEscolarApi.src.Data
{
    public class GestaoEscolarContext : DbContext
    {
        public GestaoEscolarContext(DbContextOptions<GestaoEscolarContext> options)
: base(options) { }
        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Disciplina> Disciplinas { get; set; }
        public DbSet<Nota> Notas { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aluno>()
            .HasMany(a => a.Notas)
            .WithOne(n => n.Aluno)
            .HasForeignKey(n => n.AlunoId);
            modelBuilder.Entity<Disciplina>()
            .HasMany(d => d.Notas)
            .WithOne(n => n.Disciplina)
            .HasForeignKey(n => n.DisciplinaId);
        }
    }
}

