using LarFix.Api.Data;
using LarFix.Api.DTOs.Requests;
using LarFix.Api.DTOs.Responses;
using LarFix.Api.Enums;
using LarFix.Api.Models;
using LarFix.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LarFix.Api.Services;

public class TransacaoService : ITransacaoService
{
    private readonly LarFixDbContext _context;

    public TransacaoService(LarFixDbContext context)
    {
        _context = context;
    }

    public async Task<TransacaoResponse> CriarAsync(TransacaoCreateRequest request)
    {
        var pessoa = await _context.Pessoas.FindAsync(request.PessoaId);

        if (pessoa is null)
            throw new KeyNotFoundException("A pessoa informada não foi encontrada.");

        if (!Enum.TryParse(request.Tipo, true, out TipoTransacao tipo))
            throw new ArgumentException("Tipo de transação inválido.");

        // Regra de negócio: menores de idade podem registrar apenas despesas.
        if (pessoa.Idade < 18 && tipo == TipoTransacao.Receita)
            throw new InvalidOperationException("Menores de idade não podem cadastrar receitas.");

        var transacao = new Transacao
        {
            Descricao = request.Descricao,
            Valor = request.Valor,
            Tipo = tipo,
            PessoaId = request.PessoaId
        };

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return new TransacaoResponse
        {
            Id = transacao.Id,
            Descricao = transacao.Descricao,
            Valor = transacao.Valor,
            Tipo = transacao.Tipo,
            PessoaId = transacao.PessoaId
        };
    }

    public async Task<IEnumerable<TransacaoResponse>> ListarAsync()
    {
        return await _context.Transacoes
            .Select(t => new TransacaoResponse
            {
                Id = t.Id,
                Descricao = t.Descricao,
                Valor = t.Valor,
                Tipo = t.Tipo,
                PessoaId = t.PessoaId,
                PessoaNome = t.Pessoa.Nome
            })
            .ToListAsync();
    }
}