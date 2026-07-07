using LarFix.Api.DTOs.Requests;
using LarFix.Api.DTOs.Responses;

namespace LarFix.Api.Services.Interfaces;

/// <summary>
/// Define as operações de gerenciamento de transações.
/// </summary>
public interface ITransacaoService
{
    Task<TransacaoResponse> CriarAsync(TransacaoCreateRequest request);

    Task<IEnumerable<TransacaoResponse>> ListarAsync();
}