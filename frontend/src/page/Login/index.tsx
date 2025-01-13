import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginApi } from '@/apis/hooks/authApi.hook';
import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { LoginSchema, LoginSchemaType } from './schemas';
import { useLoadingStore } from '@/store/loading.store';
import { paths } from '@/routes/paths';
import useAuthStore from '@/store/auth.store';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [login, { loading, error }] = useLoginApi();
  const { isAuthenticated } = useAuthStore();
  const { login: handleLoginSuccess } = useAuth();
  const { toast } = useToast();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const handleLogin = async (data: LoginSchemaType) => {
    try {
      const { email, password } = data;
      const response = await login({ variables: { email, password } });

      if (!response.data) return;

      const { token, user } = response.data.login;

      handleLoginSuccess(user, token);

      navigate(paths.admin.index);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const submitForm = (data: LoginSchemaType) => {
    handleLogin(data);
  };

  useEffect(() => {
    if (!error) return;
    toast({
      title: 'Login Error',
      description: error.message,
      variant: 'destructive',
    });
  }, [error, toast]);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  useEffect(() => {
    if (!isAuthenticated()) return;
    navigate(paths.admin.index);
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(submitForm)} noValidate>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" isRequired>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoFocus
                    {...register('email')}
                    placeholder="email@example.com"
                    error={errors.email}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" isRequired>
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    placeholder="********"
                    error={errors.password}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
