function KnowMore() {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-600">The Local Shop</span>
          </h1>
          <p className="text-xl text-gray-600">
            Your campus marketplace for convenient, student-to-student commerce
          </p>
        </div>
  
        {/* Problem & Solution Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Problems Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full border-l-4 border-red-500">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Problems We Faced</h2>
            <ul className="space-y-3">
              {[
                "🚫 No centralized platform for campus shops",
                "🕒 Limited shop hours conflicting with class schedules",
                "📱 Difficulty finding authentic student-run businesses",
                "💸 Cash-only transactions causing inconvenience"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Solutions Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Our Solution</h2>
            <ul className="space-y-3">
              {[
                "✅ One-stop platform for all campus shops",
                "⏰ 24/7 online ordering with flexible pickup",
                "🎓 Verified student sellers only",
                "💳 Secure digital payments + cash options"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        {/* How It Works */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">🛒 How The Local Shop Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Browse Shops", desc: "Discover products from verified campus vendors" },
              { step: "2", title: "Order Online", desc: "Pay digitally or reserve for cash pickup" },
              { step: "3", title: "Collect On-Campus", desc: "Show your QR code at the shop location" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Team Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">👨‍💻 Meet the Student Developers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: "Sourabh Chakraborty", role: "Frontend Lead" },
              { name: "Parth Singh", role: "Backend Lead" },
              { name: "Manikant Nath Tiwari", role: "UI/UX Designer" },
              { name: "Pankaj Maurya", role: "Database Architect" },
              { name: "Rohit Kumar Yadav", role: "Testing & Deployment" }
            ].map((member, index) => (
              <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700 mx-auto mb-3">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* CTA Section */}
        <div className="text-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Start Shopping
          </button>
          <button className="border-2 border-gray-300 hover:bg-gray-50 font-bold py-3 px-6 rounded-lg transition-colors">
            Register Your Shop
          </button>
        </div>
      </div>
    );
  }
  
  export default KnowMore;