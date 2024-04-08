using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Workers_management.Data.Migrations
{
    public partial class _1231 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "workerRoles");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "workerRoles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
