using LarFix.Api.DTOs.Requests;
using LarFix.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LarFix.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly ITransacaoService _transacaoService;

    public TransacaoController(ITransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    [HttpPost]
    public async Task<ActionResult> Criar(TransacaoCreateRequest request)
    {
        var transacao = await _transacaoService.CriarAsync(request);

        return StatusCode(StatusCodes.Status201Created, transacao);
    }

    [HttpGet]
    public async Task<ActionResult> Listar()
    {
        var transacoes = await _transacaoService.ListarAsync();

        return Ok(transacoes);
    }
}