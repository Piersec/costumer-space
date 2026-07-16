const companies = [
  {
    name: "Empresa XPTO",
    domain: "empresa.com.br",
    users: 12,
    sites: 3,
    status: "Ativo",
  },
];

export default function CustomersTable() {
  return (
    <div
      className="
border
rounded-xl
bg-card
overflow-hidden
"
    >
      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="text-left p-4">Empresa</th>

            <th className="text-left p-4">Domínio</th>

            <th className="text-left p-4">Usuários</th>

            <th className="text-left p-4">Sites</th>

            <th className="text-left p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr key={company.name} className="border-b last:border-0">
              <td className="p-4 font-medium">{company.name}</td>

              <td className="p-4 text-muted-foreground">{company.domain}</td>

              <td className="p-4">{company.users}</td>

              <td className="p-4">{company.sites}</td>

              <td className="p-4">
                <span
                  className="
px-3
py-1
rounded-full
text-xs
bg-green-500/10
text-green-600
"
                >
                  {company.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
