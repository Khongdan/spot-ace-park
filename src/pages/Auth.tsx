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
    phone: "",
    password: "",
    fullName: "",
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // Check user role and redirect accordingly
        setTimeout(() => {
          checkUserRoleAndRedirect(session.user.id);
        }, 0);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkUserRoleAndRedirect(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkUserRoleAndRedirect = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
    
    if (data?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert phone to email format for Supabase auth
      const email = `${formData.phone}@parking.app`;
      
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: formData.password,
        });

        if (error) throw error;
        
        // Check role and show appropriate message
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();
        
        if (roleData?.role === 'admin') {
          toast.success("Đăng nhập Admin thành công!");
        } else {
          toast.success("Đăng nhập thành công!");
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              phone: formData.phone,
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

  // Generate 50 animated spans
  const spans = Array.from({ length: 50 }, (_, i) => (
    <span key={i} style={{ "--i": i } as React.CSSProperties}></span>
  ));

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f293d] overflow-hidden">
      <div className="auth-container">
        {spans}
        
        <div className="auth-login-box">
          <h1 className="text-5xl font-semibold text-[#0ef] text-center mb-8">
            {isLogin ? "Login" : "Signup"}
          </h1>
          
          <form onSubmit={handleSubmit} className="w-full px-12">
            {!isLogin && (
              <div className="auth-input-box">
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
                <label>Họ và tên</label>
              </div>
            )}
            
            <div className="auth-input-box">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
              <label>Số điện thoại</label>
            </div>
            
            <div className="auth-input-box">
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <label>Mật khẩu</label>
            </div>

            <p className="my-4 text-[#ecf0f1] text-sm text-center">
              Quên mật khẩu?{" "}
              <a href="#" className="no-underline text-[#78b8d7] font-bold hover:underline">
                Nhấn vào đây
              </a>
            </p>
            
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Đang xử lý..." : isLogin ? "Login" : "Signup"}
            </button>
            
            <p className="mt-4 text-[#ecf0f1] text-sm text-center">
              {isLogin ? "Tạo tài khoản mới" : "Đã có tài khoản?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="no-underline text-[#78b8d7] font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                Nhấn vào đây
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;