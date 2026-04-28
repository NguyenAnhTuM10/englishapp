import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/shared/api/client';

interface HealthResponse {
  status: string;
}

export function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await apiClient.get<HealthResponse>('/api/health');
      return res.data;
    },
    retry: false,
  });

  const handleClick = () => {
    alert('shadcn Button works!');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold tracking-tight">English Learning Platform</h1>
      <p className="text-lg text-muted-foreground">Đồ án tốt nghiệp - Coming soon</p>
      <Button onClick={handleClick}>Click me</Button>
      <div className="text-sm text-muted-foreground">
        {isLoading && <span>Checking backend...</span>}
        {isError && <span>Backend: not reachable</span>}
        {data && <span>Backend status: {data.status}</span>}
      </div>
    </div>
  );
}
