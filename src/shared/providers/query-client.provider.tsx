import { type PropsWithChildren } from 'react';
import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const QueryClientProvider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <QueryProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryProvider>
  );
};

export default QueryClientProvider;
