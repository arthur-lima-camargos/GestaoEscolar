namespace GestaoEscolarApi.src.DTOs
{
    public class NotaDto
    {
        public int Id { get; set; }
        public double Valor { get; set; }
        public int AlunoId { get; set; }
        public string NomeAluno { get; set; }
        public int DisciplinaId { get; set; }
        public string NomeDisciplina { get; set; }
    }
}