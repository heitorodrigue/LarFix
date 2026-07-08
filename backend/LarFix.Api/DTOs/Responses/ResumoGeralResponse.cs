namespace LarFix.Api.DTOs.Responses;

public class ResumoGeralResponse
{
    public List<PessoaResumoResponse> Pessoas { get; set; } = [];

    public decimal TotalReceitas { get; set; }

    public decimal TotalDespesas { get; set; }

    public decimal Saldo { get; set; }
}