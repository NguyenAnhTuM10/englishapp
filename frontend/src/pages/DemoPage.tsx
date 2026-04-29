import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/shared/api/client';

interface DemoPing {
  id: string;
  message: string;
  createdAt: string;
}

const schema = z.object({
  message: z.string().min(1, 'Message is required'),
});
type FormValues = z.infer<typeof schema>;

export function DemoPage() {
  const queryClient = useQueryClient();

  const { data: pings = [], isLoading } = useQuery({
    queryKey: ['demo-pings'],
    queryFn: async () => {
      const res = await apiClient.get<DemoPing[]>('/api/demo/pings');
      return res.data;
    },
  });

  const { mutate: sendPing, isPending } = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await apiClient.post<DemoPing>('/api/demo/pings', values);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demo-pings'] });
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">Full-Stack Integration Demo</h1>

      <form onSubmit={handleSubmit((v) => sendPing(v))} className="mb-8 flex gap-2">
        <div className="flex-1">
          <Input placeholder="Enter a ping message..." {...register('message')} />
          {errors.message && (
            <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Send Ping'}
        </Button>
      </form>

      <div className="space-y-2">
        {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
        {pings.length === 0 && !isLoading && (
          <p className="text-sm text-muted-foreground">No pings yet. Send the first one!</p>
        )}
        {pings.map((ping) => (
          <div key={ping.id} className="rounded-md border bg-card p-3">
            <p className="text-sm font-medium">{ping.message}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(ping.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
