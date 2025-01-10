﻿// <auto-generated />
using System;
using Altinn.Studio.Designer.Repository.ORMImplementation.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Altinn.Studio.Designer.Migrations
{
    [DbContext(typeof(DesignerdbContext))]
    [Migration("20250107121305_AddBuidsTableAndDeploymentsColumns")]
    partial class AddBuidsTableAndDeploymentsColumns
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseSerialColumns(modelBuilder);

            modelBuilder.Entity("Altinn.Studio.Designer.Repository.ORMImplementation.Models.AppScopesDbObject", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("App")
                        .IsRequired()
                        .HasColumnType("character varying")
                        .HasColumnName("app");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("timestamptz")
                        .HasColumnName("created");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("character varying")
                        .HasColumnName("created_by");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("character varying")
                        .HasColumnName("last_modified_by");

                    b.Property<string>("Org")
                        .IsRequired()
                        .HasColumnType("character varying")
                        .HasColumnName("org");

                    b.Property<string>("Scopes")
                        .IsRequired()
                        .HasColumnType("jsonb")
                        .HasColumnName("scopes");

                    b.Property<uint>("Version")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("xid")
                        .HasColumnName("xmin");

                    b.HasKey("Id")
                        .HasName("app_scopes_pkey");

                    b.HasIndex(new[] { "Org", "App" }, "idx_app_scopes_org_app")
                        .IsUnique();

                    b.ToTable("app_scopes", "designer");
                });

            modelBuilder.Entity("Altinn.Studio.Designer.Repository.ORMImplementation.Models.BuildDbObject", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<int>("BuildType")
                        .HasColumnType("integer")
                        .HasColumnName("build_type");

                    b.Property<string>("ExternalId")
                        .HasColumnType("character varying")
                        .HasColumnName("external_id");

                    b.Property<DateTimeOffset?>("Finished")
                        .HasColumnType("timestamptz")
                        .HasColumnName("finished");

                    b.Property<string>("Result")
                        .HasColumnType("character varying")
                        .HasColumnName("result");

                    b.Property<DateTimeOffset?>("Started")
                        .HasColumnType("timestamptz")
                        .HasColumnName("started");

                    b.Property<string>("Status")
                        .HasColumnType("character varying")
                        .HasColumnName("status");

                    b.HasKey("Id");

                    b.HasIndex("BuildType");

                    b.HasIndex("ExternalId", "BuildType")
                        .IsUnique();

                    b.ToTable("builds", "designer");
                });

            modelBuilder.Entity("Altinn.Studio.Designer.Repository.ORMImplementation.Models.Deployment", b =>
                {
                    b.Property<long>("Sequenceno")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGSERIAL")
                        .HasColumnName("sequenceno");

                    NpgsqlPropertyBuilderExtensions.UseSerialColumn(b.Property<long>("Sequenceno"));

                    b.Property<string>("App")
                        .HasColumnType("character varying")
                        .HasColumnName("app");

                    b.Property<string>("Buildid")
                        .HasColumnType("character varying")
                        .HasColumnName("buildid");

                    b.Property<string>("Buildresult")
                        .HasColumnType("character varying")
                        .HasColumnName("buildresult");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamptz")
                        .HasColumnName("created");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("character varying")
                        .HasColumnName("created_by");

                    b.Property<string>("Entity")
                        .HasColumnType("text")
                        .HasColumnName("entity");

                    b.Property<string>("EnvName")
                        .HasColumnType("character varying")
                        .HasColumnName("envname");

                    b.Property<long?>("InternalBuildId")
                        .HasColumnType("bigint")
                        .HasColumnName("internal_build_id");

                    b.Property<string>("Org")
                        .HasColumnType("character varying")
                        .HasColumnName("org");

                    b.Property<string>("Tagname")
                        .HasColumnType("character varying")
                        .HasColumnName("tagname");

                    b.HasKey("Sequenceno")
                        .HasName("deployments_pkey");

                    b.HasIndex("InternalBuildId");

                    b.HasIndex(new[] { "Org", "App" }, "idx_deployments_org_app");

                    b.ToTable("deployments", "designer");
                });

            modelBuilder.Entity("Altinn.Studio.Designer.Repository.ORMImplementation.Models.Release", b =>
                {
                    b.Property<long>("Sequenceno")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGSERIAL")
                        .HasColumnName("sequenceno");

                    NpgsqlPropertyBuilderExtensions.UseSerialColumn(b.Property<long>("Sequenceno"));

                    b.Property<string>("App")
                        .HasColumnType("character varying")
                        .HasColumnName("app");

                    b.Property<string>("Buildid")
                        .HasColumnType("character varying")
                        .HasColumnName("buildid");

                    b.Property<string>("Buildresult")
                        .HasColumnType("character varying")
                        .HasColumnName("buildresult");

                    b.Property<string>("Buildstatus")
                        .HasColumnType("character varying")
                        .HasColumnName("buildstatus");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamptz")
                        .HasColumnName("created");

                    b.Property<string>("Entity")
                        .HasColumnType("text")
                        .HasColumnName("entity");

                    b.Property<string>("Org")
                        .HasColumnType("character varying")
                        .HasColumnName("org");

                    b.Property<string>("Tagname")
                        .HasColumnType("character varying")
                        .HasColumnName("tagname");

                    b.HasKey("Sequenceno")
                        .HasName("releases_pkey");

                    b.HasIndex(new[] { "Org", "App" }, "idx_releases_org_app");

                    b.ToTable("releases", "designer");
                });

            modelBuilder.Entity("Altinn.Studio.Designer.Repository.ORMImplementation.Models.Deployment", b =>
                {
                    b.HasOne("Altinn.Studio.Designer.Repository.ORMImplementation.Models.BuildDbObject", "Build")
                        .WithMany()
                        .HasForeignKey("InternalBuildId")
                        .HasConstraintName("fk_deployments_builds_buildid");

                    b.Navigation("Build");
                });
#pragma warning restore 612, 618
        }
    }
}
