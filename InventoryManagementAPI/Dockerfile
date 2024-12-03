# Use an official .NET runtime as a base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["InventoryManagementAPI.csproj", "./"]
RUN dotnet restore "./InventoryManagementAPI.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet publish "InventoryManagementAPI.csproj" -c Release -o /app/publish

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "InventoryManagementAPI.dll"]
