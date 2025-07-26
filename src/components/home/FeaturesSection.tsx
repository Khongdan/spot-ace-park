import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Search, 
  Calendar, 
  Shield,
  Smartphone,
  TrendingUp,
  Users
} from "lucide-react";

const FeaturesSection = () => {
  const userFeatures = [
    {
      icon: MapPin,
      title: "Bản đồ tương tác",
      description: "Xem tất cả bãi đỗ xe xung quanh bạn trên bản đồ trực quan với thông tin chi tiết."
    },
    {
      icon: Search,
      title: "Tìm kiếm thông minh",
      description: "Lọc theo khu vực, giá cả, đánh giá và khoảng cách để tìm bãi xe phù hợp nhất."
    },
    {
      icon: Calendar,
      title: "Đặt chỗ trước",
      description: "Đặt trước chỗ đỗ xe theo khung giờ cụ thể, thanh toán trực tuyến tiện lợi."
    },
    {
      icon: Clock,
      title: "Thời gian thực",
      description: "Cập nhật số chỗ trống và giá cả theo thời gian thực, không lo hết chỗ."
    },
    {
      icon: DollarSign,
      title: "Giá động thông minh",
      description: "Hệ thống AI tự động điều chỉnh giá theo nhu cầu, thời tiết và sự kiện."
    },
    {
      icon: Smartphone,
      title: "Ứng dụng di động",
      description: "Quản lý đặt chỗ, xem lịch sử và nhận thông báo mọi lúc mọi nơi."
    }
  ];

  const adminFeatures = [
    {
      icon: TrendingUp,
      title: "Dashboard phân tích",
      description: "Biểu đồ doanh thu, tỷ lệ lấp đầy và thống kê chi tiết theo thời gian thực."
    },
    {
      icon: Users,
      title: "Quản lý người dùng",
      description: "Theo dõi hoạt động người dùng, xử lý khiếu nại và quản lý tài khoản."
    },
    {
      icon: Shield,
      title: "Bảo mật cao",
      description: "Hệ thống bảo mật nhiều lớp, mã hóa dữ liệu và tuân thủ quy định."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* User Features */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Tính năng cho người dùng
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trải nghiệm đỗ xe thông minh với công nghệ AI tiên tiến
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {userFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-card border-0"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Admin Features */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Tính năng quản trị
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Công cụ quản lý toàn diện cho chủ bãi đỗ xe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {adminFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-card border-0 text-center"
            >
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-hero rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Sẵn sàng bắt đầu?</h3>
          <p className="text-xl mb-8 text-white/90">
            Tham gia hệ thống quản lý bãi đỗ xe thông minh ngay hôm nay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="bg-white text-primary border-white hover:bg-white/90">
              Dùng thử miễn phí
            </Button>
            <Button variant="secondary" size="lg">
              Liên hệ tư vấn
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;