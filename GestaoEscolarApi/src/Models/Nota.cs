using System.ComponentModel.DataAnnotations;

namespace GestaoEscolarApi.src.Models
{
    public class Nota
    {
        public int Id { get; set; }
        [Range(0, 10)]
        public double Valor { get; set; } 
        public int AlunoId { get; set; }
        public Aluno Aluno { get; set; }
        public int DisciplinaId { get; set; }
        public Disciplina Disciplina { get; set; }
    }
}
