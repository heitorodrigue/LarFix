using LarFix.Api.DTOs.Requests;
using LarFix.Api.DTOs.Responses;

namespace LarFix.Api.Services.Interfaces;
public interface IPessoaService
{
    Task<PessoaResponse> CriarAsync(PessoaCreateRequest request);
    /// <summary>
    /// Retorna todas as pessoas cadastradas.
    /// Utiliza IEnumerable para expor apenas uma coleção,
    /// sem acoplar o contrato à implementação concreta.
    /// </summary>
    Task<IEnumerable<PessoaResponse>> ListarAsync();
    Task<bool> ExcluirAsync(int id);
}