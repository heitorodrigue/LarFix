using System.ComponentModel.DataAnnotations;

namespace LarFix.Api.DTOs.Requests;

public class PessoaCreateRequest
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
    public string Nome { get; set; } = string.Empty;
    
    [Range(0, 120, ErrorMessage = "A idade deve estar entre 0 e 120 anos.")]
    public int Idade { get; set; }
}