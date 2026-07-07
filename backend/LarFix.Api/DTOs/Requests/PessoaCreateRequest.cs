namespace LarFix.Api.DTOs.Requests;

public class PessoaCreateRequest
{
    public string Nome { get; set; } = string.Empty;

    public int Idade { get; set; }
}