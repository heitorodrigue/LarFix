using LarFix.Api.DTOs.Requests;
using LarFix.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LarFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private readonly IPessoaService _pessoaService;

    public PessoaController(IPessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    [HttpPost]
    public async Task<ActionResult> Criar(PessoaCreateRequest request)
    {
        var pessoa = await _pessoaService.CriarAsync(request);

        return StatusCode(StatusCodes.Status201Created, pessoa);
    }

    [HttpGet]
    public async Task<ActionResult> Listar()
    {
        var pessoas = await _pessoaService.ListarAsync();

        return Ok(pessoas);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Excluir(int id)
    {
        var removido = await _pessoaService.ExcluirAsync(id);

        if (!removido)
            return NotFound();

        return NoContent();
    }

    [HttpGet("resumo")]
    public async Task<ActionResult> ObterResumo()
    {
        var resumo = await _pessoaService.ObterResumoAsync();

        return Ok(resumo);
    }
}