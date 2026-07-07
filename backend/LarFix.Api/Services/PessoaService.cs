using LarFix.Api.Data;
using LarFix.Api.DTOs.Requests;
using LarFix.Api.DTOs.Responses;
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
}