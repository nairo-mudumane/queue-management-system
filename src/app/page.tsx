'use client';

import { useMutation, useQuery } from 'convex/react';
import { Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

export default function Home() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const createClient = useMutation(api.clients.createClient);
  const deleteClient = useMutation(api.clients.deleteClient);
  const clients = useQuery(api.clients.getClients);

  useEffect(() => {
    if (!clients) setIsFetching(true);
    else setIsFetching(false);
  }, [clients]);

  const onDeleteClient = async (clientId: Id<'clients'>) => {
    await deleteClient({ clientId });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const now = new Date().toISOString();
    await createClient({
      name,
      createdAt: now,
      updatedAt: now,
      // deletedAt: null,
    });

    setName('');
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen w-screen gap-6 flex-col flex items-center justify-center">
      {isFetching ? (
        <p>Carregando...</p>
      ) : (
        <div className="gap-6 grid grid-cols-2 min-w-md">
          {clients?.map((client) => (
            <Card key={client._id} className="w-full">
              <CardContent className="space-y-4">
                <CardTitle>{client.name}</CardTitle>

                <Button
                  variant="outline"
                  onClick={() => onDeleteClient(client._id)}
                >
                  <span>Apagar</span>
                  <Trash2Icon />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <form
        className="bg-white rounded-md space-y-4 shadow p-4 min-w-md"
        onSubmit={onSubmit}
      >
        <h2 className="text-center font-bold text-2xl">Adicionar cliente</h2>
        <Label htmlFor="name">Nome</Label>
        <Input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />

        <Button
          type="submit"
          className="w-max ml-auto block"
          disabled={isLoading}
        >
          {isLoading ? 'Carregando' : 'Enviar'}
        </Button>
      </form>
    </main>
  );
}
