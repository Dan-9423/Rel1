import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { Globe, Mail, Phone, Instagram } from 'lucide-react';

interface AccountEntry {
  dueDate: string;
  provider: string;
  invoice: string;
  value: number;
}

export default function ContasSemanais() {
  const [companyData, setCompanyData] = useState({
    name: 'MEGAFIX',
    partner: '',
    cnpj: '',
  });

  const [accountsPayable, setAccountsPayable] = useState<AccountEntry[]>([
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
  ]);

  const [accountsReceivable, setAccountsReceivable] = useState<AccountEntry[]>([
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
    { dueDate: '', provider: '', invoice: '', value: 0 },
  ]);

  const totalPayable = accountsPayable.reduce((sum, entry) => sum + entry.value, 0);
  const totalReceivable = accountsReceivable.reduce((sum, entry) => sum + entry.value, 0);
  const balance = totalReceivable - totalPayable;

  const handleExportPDF = () => {
    // PDF export logic will be implemented here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contas Semanais</h1>
        <Button onClick={handleExportPDF}>Exportar PDF</Button>
      </div>

      {/* PDF Template Preview */}
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-[#0030B9] text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="w-48">
              <Logo />
            </div>
            <h2 className="text-3xl font-bold">RESUMO DE CONTAS</h2>
            <div className="w-48" /> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Company Info */}
          <div className="grid grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src="https://placehold.co/100x100" 
                    alt="Company Logo" 
                    className="w-16 h-16 object-contain"
                  />
                  <div className="space-y-2">
                    <Label>EMPRESA:</Label>
                    <Input 
                      value={companyData.name}
                      onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                    />
                    <Label>SÓCIO:</Label>
                    <Input 
                      value={companyData.partner}
                      onChange={(e) => setCompanyData({ ...companyData, partner: e.target.value })}
                    />
                    <Label>CNPJ:</Label>
                    <Input 
                      value={companyData.cnpj}
                      onChange={(e) => setCompanyData({ ...companyData, cnpj: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Pagamentos totais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalPayable)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Recebimentos totais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalReceivable)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Saldo total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(balance)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tables */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-[#0030B9] text-white rounded-t-lg">
                <CardTitle>CONTAS A PAGAR (TOP 5)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>VENCIMENTO</TableHead>
                      <TableHead>FORNECEDOR</TableHead>
                      <TableHead>NOTA FISCAL</TableHead>
                      <TableHead>VALOR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accountsPayable.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Input
                            type="date"
                            value={entry.dueDate}
                            onChange={(e) => {
                              const newEntries = [...accountsPayable];
                              newEntries[index].dueDate = e.target.value;
                              setAccountsPayable(newEntries);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={entry.provider}
                            onChange={(e) => {
                              const newEntries = [...accountsPayable];
                              newEntries[index].provider = e.target.value;
                              setAccountsPayable(newEntries);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={entry.invoice}
                            onChange={(e) => {
                              const newEntries = [...accountsPayable];
                              newEntries[index].invoice = e.target.value;
                              setAccountsPayable(newEntries);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={entry.value}
                            onChange={(e) => {
                              const newEntries = [...accountsPayable];
                              newEntries[index].value = Number(e.target.value);
                              setAccountsPayable(newEntries);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-bold">
                        TOTAL
                      </TableCell>
                      <TableCell className="font-bold">
                        {formatCurrency(totalPayable)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-[#0030B9] text-white rounded-t-lg">
                <CardTitle>CONTAS A RECEBER (TOP 5)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>VENCIMENTO</TableHead>
                      <TableHead>FORNECEDOR</TableHead>
                      <TableHead>NOTA FISCAL</TableHead>
                      <TableHead>VALOR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accountsReceivable.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Input
                            type="date"
                            value={entry.dueDate}
                            onChange={(e) => {
                              const newEntries = [...accountsReceivable];
                              newEntries[index].dueDate = e.target.value;
                              setAccountsReceivable(newEntries);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={entry.provider}
                            onChange={(e) => {
                              const newEntries = [...accountsReceivable];
                              newEntries[index].provider = e.target.value;
                              setAccountsReceivable(newEntries);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={entry.invoice}
                            onChange={(e) => {
                              const newEntries = [...accountsReceivable];
                              newEntries[index].invoice = e.target.value;
                              setAccountsReceivable(newEntries);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={entry.value}
                            onChange={(e) => {
                              const newEntries = [...accountsReceivable];
                              newEntries[index].value = Number(e.target.value);
                              setAccountsReceivable(newEntries);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-bold">
                        TOTAL
                      </TableCell>
                      <TableCell className="font-bold">
                        {formatCurrency(totalReceivable)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F47400] text-white p-4 rounded-b-lg">
          <div className="flex justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>www.dcadvisors.com.br</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>contato@dcadvisors.com.br</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>(11) 99456-1052</span>
            </div>
            <div className="flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              <span>@d.c.advisors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}