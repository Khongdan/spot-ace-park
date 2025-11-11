import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Session } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate("/");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        toast.success("Đăng nhập thành công!");
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;
        toast.success("Đăng ký thành công!");
      }
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] overflow-hidden">
      <div className="relative w-[500px] h-[500px] flex items-center justify-center auth-ring">
        <i className="auth-ring-item" style={{ "--clr": "#00ff0a" } as React.CSSProperties}></i>
        <i className="auth-ring-item" style={{ "--clr": "#ff0057" } as React.CSSProperties}></i>
        <i className="auth-ring-item" style={{ "--clr": "#fffd44" } as React.CSSProperties}></i>
        
        <div className="absolute w-[300px] h-full flex flex-col items-center justify-center gap-5">
          <h2 className="text-4xl font-bold text-white">
            {isLogin ? "Login" : "Signup"}
          </h2>
          
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            {!isLogin && (
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  className="auth-input"
                />
              </div>
            )}
            
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="auth-input"
              />
            </div>
            
            <div className="relative w-full">
              <input
                type="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="auth-input"
              />
            </div>
            
            <div className="relative w-full">
              <input
                type="submit"
                value={loading ? "Đang xử lý..." : isLogin ? "Sign in" : "Sign up"}
                disabled={loading}
                className="auth-submit"
              />
            </div>
          </form>
          
          <div className="relative w-full flex items-center justify-between px-5">
            <a href="#" className="text-white text-sm no-underline hover:underline">
              Quên mật khẩu
            </a>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-white text-sm no-underline hover:underline bg-transparent border-none cursor-pointer"
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;