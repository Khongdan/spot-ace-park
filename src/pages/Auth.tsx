import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Session } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    phone: "",
    password: "",
    fullName: "",
  });

  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    const handleRegisterClick = () => {
      container?.classList.add('active');
    };

    const handleLoginClick = () => {
      container?.classList.remove('active');
    };

    registerBtn?.addEventListener('click', handleRegisterClick);
    loginBtn?.addEventListener('click', handleLoginClick);

    return () => {
      registerBtn?.removeEventListener('click', handleRegisterClick);
      loginBtn?.removeEventListener('click', handleLoginClick);
    };
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = `${loginData.phone}@parking.app`;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: loginData.password,
      });

      if (error) throw error;
      
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
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = `${signupData.phone}@parking.app`;
      
      const { error } = await supabase.auth.signUp({
        email: email,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.fullName,
            phone: signupData.phone,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
      toast.success("Đăng ký thành công!");
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSignup}>
          <h1>Tạo Tài Khoản</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>hoặc sử dụng số điện thoại để đăng ký</span>
          <input
            type="text"
            placeholder="Họ và tên"
            value={signupData.fullName}
            onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Số điện thoại"
            value={signupData.phone}
            onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={signupData.password}
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Đăng Nhập</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>hoặc sử dụng số điện thoại của bạn</span>
          <input
            type="tel"
            placeholder="Số điện thoại"
            value={loginData.phone}
            onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          <a href="#">Quên mật khẩu?</a>
          <button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng Nhập"}
          </button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Chào Mừng Trở Lại!</h1>
            <p>Nhập thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
            <button
              type="button"
              className="hidden"
              id="login"
            >
              Đăng Nhập
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Xin Chào, Bạn!</h1>
            <p>Đăng ký với thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
            <button
              type="button"
              className="hidden"
              id="register"
            >
              Đăng Ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
