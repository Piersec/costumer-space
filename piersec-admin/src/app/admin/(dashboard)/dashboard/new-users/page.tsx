import CustomersTable from "@/components/customers-adm/customers-table";
import CreateCompanyDialog from "@/components/customers-adm/create-company-dialog";

import { getCompanies } from "@/app/actions/customers";

export default async function CustomersPage() {
  const companies = await getCompanies();

  return (
    <div className="space-y-6 mx-80 mt-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>

          <p className="text-muted-foreground">
            Gerencie empresas e acessos do portal.
          </p>
        </div>

        <CreateCompanyDialog />
      </div>

      <CustomersTable />
    </div>
  );
}
