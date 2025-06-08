using GestaoEscolarApi.src.DTOs;
using GestaoEscolarApi.src.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AlunosController : ControllerBase
{
    private readonly IAlunoService _service;

    public AlunosController(IAlunoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAlunos()
    {
        var alunos = await _service.GetAllAsync();
        return Ok(alunos);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] AlunoDto alunoDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var alunoCriado = await _service.AddAsync(alunoDto);
        
        return CreatedAtAction(nameof(GetAlunos), new { id = alunoCriado.Id }, alunoCriado);
    }
}
