FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS BASE
WORKDIR /app

COPY . .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet FAIR_SHARE_ALLOCATION_API.dll