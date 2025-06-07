using GestaoEscolarApi.src.DTOs;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class NotasController : ControllerBase
{
    private readonly INotaService _service;

    public NotasController(INotaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetNotas()
    {
        var notas = await _service.GetAllAsync();
        return Ok(notas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetNota(int id)
    {
        var nota = await _service.GetByIdAsync(id);
        if (nota == null)
            return NotFound();
        return Ok(nota);
    }

    [HttpGet("aluno/{alunoId}")]
    public async Task<IActionResult> GetNotasByAluno(int alunoId)
    {
        var notas = await _service.GetNotasByAlunoIdAsync(alunoId);
        return Ok(notas);
    }

    [HttpGet("disciplina/{disciplinaId}")]
    public async Task<IActionResult> GetNotasByDisciplina(int disciplinaId)
    {
        var notas = await _service.GetNotasByDisciplinaIdAsync(disciplinaId);
        return Ok(notas);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] NotaDto notaDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var notaCriada = await _service.AddAsync(notaDto);
        return CreatedAtAction(nameof(GetNota), new { id = notaCriada.AlunoId }, notaCriada);
    }
}