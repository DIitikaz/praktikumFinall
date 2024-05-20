
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using Workers_management.Core.models;

namespace Workers_management.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Worker> Workers { get; set; }
        public DbSet<WorkerRole> workerRoles { get; set; }
        public DbSet<RoleName> RolesName { get; set; }
        public DbSet<UserModel> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=workwers_Managment_db");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WorkerRole>()
                .HasKey(e => new { e.RoleNameId, e.WorkerId });

            // Seeding an initial admin user
            modelBuilder.Entity<UserModel>().HasData(
                new UserModel { Id = 1, Name = "admin", Password = "123456" }
            );
            modelBuilder.Entity<RoleName>().HasData(
               new RoleName { Id = 1, Name = "Teacher" },
               new RoleName { Id = 2, Name = "Officer" },
               new RoleName { Id = 3, Name = "Principal" }
           );
        }
    }
}
