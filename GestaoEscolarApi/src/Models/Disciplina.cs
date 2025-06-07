using System.ComponentModel.DataAnnotations;

namespace GestaoEscolarApi.src.Models
{
    public class Disciplina
    {
        public int Id { get; set; }
        [Required, StringLength(10)]
        public string Codigo { get; set; }
        [Required, StringLength(100)]
        public string Nome { get; set; }
        public List<Nota> Notas { get; set; }
    }
}
