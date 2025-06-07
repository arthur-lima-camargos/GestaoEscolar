using System.ComponentModel.DataAnnotations;

namespace GestaoEscolarApi.src.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        [Required]
        public string NomeCompleto { get; set; }
        public DateTime DataNascimento { get; set; }
        [Required, StringLength(11)]
        public string CPF { get; set; }
        public List<Nota> Notas { get; set; }
    }
}
