using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Workers_management.Data.Migrations
{
    public partial class _2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_workerRoles_RolesName_RoleNameId",
                table: "workerRoles");

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Workers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Workers");

            migrationBuilder.AddForeignKey(
                name: "FK_workerRoles_RolesName_RoleNameId",
                table: "workerRoles",
                column: "RoleNameId",
                principalTable: "RolesName",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
