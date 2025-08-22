# SpeedType - Modern Typing Speed Test 🚀

A beautiful, interactive typing speed test application built with React, featuring stunning animations, particle effects, and comprehensive performance analytics.

![SpeedType Demo](https://img.shields.io/badge/Status-Active-brightgreen) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![Vite](https://img.shields.io/badge/Vite-5.4.2-purple) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4.1-cyan)

## ✨ Features

### 🎯 Core Functionality
- **Real-time typing test** with multiple duration options (15s, 30s, 60s, 120s)
- **Live statistics** tracking WPM, accuracy, and streaks
- **Interactive text highlighting** showing correct/incorrect characters
- **Comprehensive results analysis** with performance levels

### 🎨 Modern UI/UX
- **Stunning gradient backgrounds** with animated particle effects
- **Glass morphism design** with backdrop blur effects
- **Smooth animations** and transitions throughout
- **Responsive design** that works on all devices
- **Dark theme** with colorful accents

### 📊 Advanced Analytics
- **Performance levels**: Beginner, Intermediate, Advanced, Expert
- **Detailed metrics**: WPM, accuracy percentage, error count, best streak
- **Visual progress bars** for different performance aspects
- **Real-time progress tracking** during tests

### 🔄 Smart Features
- **Improved share functionality** with multiple fallback methods
- **Web Share API** support for mobile devices
- **Clipboard API** with legacy browser support
- **Auto-restart** and manual restart options
- **Multiple sample texts** for varied practice

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1 (JSX)
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.344.0
- **Linting**: ESLint 9.9.1

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/karthikeyabommireddy/Typing_Speed_Test.git
   cd Typing_Speed_Test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
typing_speed_test/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ParticleBackground.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── TestResults.jsx
│   │   └── TypingTest.jsx
│   ├── utils/              # Utility functions
│   │   ├── calculations.js # WPM and accuracy calculations
│   │   └── sampleTexts.js  # Sample texts for typing tests
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── README.md             # This file
```

## 🎮 How to Use

1. **Select Duration**: Choose your preferred test duration (15s, 30s, 60s, or 120s)
2. **Start Typing**: Click in the input field and start typing the displayed text
3. **Monitor Progress**: Watch your real-time stats including WPM, accuracy, and streak
4. **View Results**: See comprehensive analysis of your performance
5. **Share Results**: Use the share button to copy your results to clipboard
6. **Try Again**: Click restart to take another test

## 🔧 Configuration

### Customizing Sample Texts
Edit `src/utils/sampleTexts.js` to add your own practice texts:

```javascript
const sampleTexts = [
  "Your custom text here...",
  // Add more texts
];
```

### Adjusting Test Durations
Modify the duration options in `src/components/TypingTest.jsx`:

```javascript
{[15, 30, 60, 120].map((duration) => (
  // Add or remove duration options
))}
```

### Styling Customization
The project uses Tailwind CSS. Modify `tailwind.config.js` or component classes to customize the appearance.

## 🎨 Design Features

### Particle Background System
- Dynamic particle animation with WebGL acceleration
- Responsive particle count based on screen size
- Interactive connections between nearby particles
- Smooth 60fps animations

### Glass Morphism UI
- Backdrop blur effects for modern appearance
- Semi-transparent elements with subtle borders
- Gradient overlays for depth and visual interest

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

## 📈 Performance Levels

- **Beginner**: 0-39 WPM (Orange/Red theme)
- **Intermediate**: 40-59 WPM (Green/Blue theme)
- **Advanced**: 60-79 WPM (Blue/Purple theme)
- **Expert**: 80+ WPM (Purple/Pink theme)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile browsers**: iOS Safari, Chrome Mobile
- **Features**: ES6+, CSS Grid, Flexbox, Canvas API

## 🎯 Future Enhancements

- [ ] User accounts and progress tracking
- [ ] Multiplayer typing races
- [ ] Custom text upload
- [ ] Keyboard heatmap
- [ ] Detailed typing analytics
- [ ] Typing lessons and tutorials
- [ ] Achievement system
- [ ] Leaderboards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Karthikeya Bommireddy**
- GitHub: [@karthikeyabommireddy](https://github.com/karthikeyabommireddy)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- Vite for the lightning-fast build tool

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the maintainer.

---

**Made with ❤️ and lots of ☕ by Karthikeya**

*Test your typing speed with style!* ⌨️✨
