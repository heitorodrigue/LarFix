using LarFix.Api.DTOs.Requests;
using LarFix.Api.DTOs.Responses;

namespace LarFix.Api.Services.Interfaces;
public interface IPessoaService
{
    Task<PessoaResponse> CriarAsync(PessoaCreateRequest request);
    Task<IEnumerable<PessoaResponse>> ListarAsync();
    Task<bool> ExcluirAsync(int id);

    Task<ResumoGeralResponse> ObterResumoAsync();
}