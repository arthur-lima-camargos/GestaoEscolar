using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace GestaoEscolarApi.src.Data
{
    public class GestaoEscolarContextFactory : IDesignTimeDbContextFactory<GestaoEscolarContext>
    {
        public GestaoEscolarContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<GestaoEscolarContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            optionsBuilder.UseSqlServer(connectionString);

            return new GestaoEscolarContext(optionsBuilder.Options);
        }
    }
}
