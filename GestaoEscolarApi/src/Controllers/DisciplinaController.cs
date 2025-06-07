using GestaoEscolarApi.src.DTOs;
using GestaoEscolarApi.src.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class DisciplinaController : ControllerBase
{
    private readonly IDisciplinaService _service;

    public DisciplinaController(IDisciplinaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetDisciplinas()
    {
        var disciplinas = await _service.GetAllAsync();
        return Ok(disciplinas);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] DisciplinaDto disciplinaDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var newDisciplina = await _service.AddAsync(disciplinaDto);

        return CreatedAtAction(nameof(GetDisciplinas), new { id = newDisciplina.Id }, newDisciplina);
    }
}