using LarFix.Api.Data;
using LarFix.Api.DTOs.Requests;
using LarFix.Api.DTOs.Responses;
using LarFix.Api.Enums;
using LarFix.Api.Models;
using LarFix.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LarFix.Api.Services;

public class PessoaService : IPessoaService
{
    private readonly LarFixDbContext _context;

    public PessoaService(LarFixDbContext context)
    {
        _context = context;
    }

    public async Task<PessoaResponse> CriarAsync(PessoaCreateRequest request)
    {
        var pessoa = new Pessoa
        {
            Nome = request.Nome,
            Idade = request.Idade
        };

        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return new PessoaResponse
        {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade
        };
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa is null)
            return false;

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<IEnumerable<PessoaResponse>> ListarAsync()
    {
        return await _context.Pessoas
            .Select(p => new PessoaResponse
            {
                Id = p.Id,
                Nome = p.Nome,
                Idade = p.Idade
            })
            .ToListAsync();
    }

    public async Task<ResumoGeralResponse> ObterResumoAsync()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .ToListAsync();

        var resumoPessoas = pessoas.Select(p =>
        {
            var totalReceitas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);

            var totalDespesas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);

            return new PessoaResumoResponse
            {
                Id = p.Id,
                Nome = p.Nome,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Saldo = totalReceitas - totalDespesas
            };
        }).ToList();

        return new ResumoGeralResponse
        {
            Pessoas = resumoPessoas,
            TotalReceitas = resumoPessoas.Sum(p => p.TotalReceitas),
            TotalDespesas = resumoPessoas.Sum(p => p.TotalDespesas),
            Saldo = resumoPessoas.Sum(p => p.Saldo)
        };
    }
}