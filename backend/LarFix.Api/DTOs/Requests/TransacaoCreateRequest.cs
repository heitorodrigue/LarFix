namespace LarFix.Api.DTOs.Requests;

public class TransacaoCreateRequest
{
    public string Descricao { get; set; } = string.Empty;

    public decimal Valor { get; set; }

    public string Tipo { get; set; } = string.Empty;

    public int PessoaId { get; set; }
}