import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Building2, Users, Key, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { addWeeks } from "date-fns";

const Login = ({ setisLoggeIn }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [, setUserType] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [registerData, setRegisterData] = useState({
    full_name: "",
    email: "",
    phoneNumber: "",
    password: "",
    terms: false,
  });

  // let data = {};
  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!loginData.email || !loginData.password) {
  //     toast({
  //       title: "Missing Information",
  //       description: "Please fill in all required fields.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/api/login/",
  //       {
  //         email: loginData.email,

  //         password: loginData.password,
  //       },
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );
  //     console.log("Login Success:", response);
  //     setisLoggeIn(true);
  //     data = response.data;
  //     localStorage.setItem("token", response.data.token);

  //     toast({
  //       title: "Login Successful",
  //       description: "Welcome back! Redirecting to dashboard...",
  //     });
  //     setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 1000);
  //   } catch (error) {
  //     toast(error);
  //   }

  //   // Simulate login and redirect based on user type
  // };

//  const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!loginData.email || !loginData.password) {
//     toast({
//       title: "Missing Information",
//       description: "Please fill in all required fields.",
//       variant: "destructive",
//     });
//     return;
//   }

//   try {
//     const response = await axios.post(
//       "http://127.0.0.1:8000/api/login/",
//       {
//         email: loginData.email,
//         password: loginData.password,
//       },
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     console.log("Login Success:", response.data);

//     // ✅ Tokens aur user localStorage me save
//     localStorage.setItem("access_token", response.data.access);
//     localStorage.setItem("refresh_token", response.data.refresh);
//     localStorage.setItem("user", JSON.stringify(response.data.user));

//     setisLoggeIn(true);

//     toast({
//       title: "Login Successful",
//       description: "Welcome back! Redirecting to dashboard...",
//     });

//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 1000);
//   } catch (error: any) {
//     console.error(error);
//     toast({
//       title: "Login Failed",
//       description: error.response?.data?.error || "Invalid credentials",
//       variant: "destructive",
//     });
//   }
// };

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!loginData.email || !loginData.password) {
    toast({
      title: "Missing Information",
      description: "Please fill in all required fields.",
      variant: "destructive",
    });
    return;
  }

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/login/",
      {
        email: loginData.email,
        password: loginData.password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("API Response:", response.data);

    // Token store करें
    if (response.data.token) {
      localStorage.setItem("access_token", response.data.token);
    } else if (response.data.access) {
      localStorage.setItem("access_token", response.data.access);
    } else if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }

    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    setisLoggeIn(true);

    toast({
      title: "Login Successful",
      description: "Welcome back! Redirecting to dashboard...",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

  } catch (error: any) {
    console.error("Login error:", error);
    toast({
      title: "Login Failed",
      description: error.response?.data?.error || "Invalid credentials",
      variant: "destructive",
    });
  }
};

  // register post method
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !registerData.full_name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.phoneNumber
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!registerData.terms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
          full_name: registerData.full_name,
          email: registerData.email,
          phoneNumber: registerData.phoneNumber,
          password: registerData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Register Success:", response.data);
      setRegisterData(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast(response.data.message);
    } catch (error) {
      if (error.response) {
        console.log("Error Response:", error.response.data);
        console.log("Status:", error.response.status);
      } else {
        console.log("Error:", error.message);
      }
    }

    toast({
      title: "Account Created",
      description: "Welcome! Your account has been created successfully.",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "Redirecting to Google authentication...",
    });
  };

  const handleOTPLogin = () => {
    toast({
      title: "OTP Login",
      description: "Redirecting to OTP verification...",
    });
  };

  const handleBiometricLogin = () => {
    toast({
      title: "Biometric Login",
      description: "Please authenticate using your biometric data.",
    });
  };

  const handleVoiceLogin = () => {
    toast({
      title: "Voice Login",
      description: "Voice authentication feature coming soon.",
    });
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        <div className="text-center text-white mb-8">
          <Building2 className="mx-auto h-16 w-16 mb-4 animate-pulse" />
          <h1 className="text-4xl font-bold mb-2">RealEstate Pro</h1>
          <p className="text-xl opacity-90">
            Your Property Journey Starts Here
          </p>
        </div>

        <Card className="glass backdrop-blur-xl border-white/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your real estate dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-white/90"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="bg-white/90 pr-10"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={loginData.remember}
                        onCheckedChange={(checked) =>
                          setLoginData({ ...loginData, remember: !!checked })
                        }
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-hero text-lg py-6"
                      size="lg"
                    >
                      <Key className="mr-2 h-5 w-5" />
                      Sign In
                    </Button>
                  </div>
                </form>

                <div className="text-center">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullname">fullname</Label>
                        <Input
                          id="fullname"
                          placeholder="John"
                          className="bg-white/90"
                          value={registerData.full_name}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              full_name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="regEmail">Email</Label>
                      <Input
                        id="regEmail"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-white/90"
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="bg-white/90"
                        value={registerData.phoneNumber}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="regPassword">Password</Label>
                      <div className="relative">
                        <Input
                          id="regPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          className="bg-white/90 pr-10"
                          value={registerData.password}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={registerData.terms}
                        onCheckedChange={(checked) =>
                          setRegisterData({ ...registerData, terms: !!checked })
                        }
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-hero text-lg py-6"
                      size="lg"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Create Account
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="text-center text-sm text-muted-foreground mb-4">
                Or continue with
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="bg-white/90 hover:bg-white"
                  onClick={handleGoogleLogin}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>

                <Button
                  variant="outline"
                  className="bg-white/90 hover:bg-white"
                  onClick={handleOTPLogin}
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  OTP
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="text-sm text-muted-foreground">
                Advanced Login Options
              </div>
              <div className="flex justify-center mt-2 space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={handleBiometricLogin}
                >
                  🔐 Biometric Login
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={handleVoiceLogin}
                >
                  🎤 Voice Login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-white/80 text-sm">
          <Link to="/" className="hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
