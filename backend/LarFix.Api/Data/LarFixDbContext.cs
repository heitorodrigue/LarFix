using LarFix.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LarFix.Api.Data;

public class LarFixDbContext : DbContext
{
    public LarFixDbContext(DbContextOptions<LarFixDbContext> options)
        : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas => Set<Pessoa>();

    public DbSet<Transacao> Transacoes => Set<Transacao>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Transacao>()
            .HasOne(t => t.Pessoa)
            .WithMany(p => p.Transacoes)
            .HasForeignKey(t => t.PessoaId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}