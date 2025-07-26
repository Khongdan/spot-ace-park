import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Menu, X, MapPin, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Car className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            ParkingSmart
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/map" 
            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <MapPin className="h-4 w-4" />
            <span>Bản đồ</span>
          </Link>
          <Link 
            to="/bookings" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Đặt chỗ của tôi
          </Link>
          <Link 
            to="/profile" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Hồ sơ
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            Đăng nhập
          </Button>
          <Button variant="hero" size="sm">
            Đăng ký
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/map" 
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin className="h-4 w-4" />
              <span>Bản đồ</span>
            </Link>
            <Link 
              to="/bookings" 
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Đặt chỗ của tôi
            </Link>
            <Link 
              to="/profile" 
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hồ sơ
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="ghost" size="sm" className="justify-start">
                Đăng nhập
              </Button>
              <Button variant="hero" size="sm">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;