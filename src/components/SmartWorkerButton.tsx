import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SmartWorkerButtonProps {
  children: React.ReactNode;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function SmartWorkerButton({ 
  children, 
  onSuccess, 
  onError, 
  className,
  variant = "default" 
}: SmartWorkerButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('smart-worker', {
        body: {}
      });

      if (error) {
        const errorMessage = error.message || 'Error al ejecutar smart-worker';
        onError?.(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      onSuccess?.(data);
      toast({
        title: "Éxito",
        description: "Smart worker ejecutado correctamente"
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      onError?.(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant={variant}
      className={className}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}