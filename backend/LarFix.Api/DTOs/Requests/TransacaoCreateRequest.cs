using System.ComponentModel.DataAnnotations;

namespace LarFix.Api.DTOs.Requests;

public class TransacaoCreateRequest
{
    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [StringLength(150)]
    public string Descricao { get; set; } = string.Empty;

    [Range(typeof(decimal), "0,01", "999999999", ErrorMessage = "O valor deve ser maior que zero.")]
    public decimal Valor { get; set; }

    [Required(ErrorMessage = "O tipo da transação é obrigatório.")]
    public string Tipo { get; set; } = string.Empty;
    
    [Range(1, int.MaxValue, ErrorMessage = "A pessoa é obrigatória.")]
    public int PessoaId { get; set; }
}