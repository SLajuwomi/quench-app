import SwiftUI

struct CurrentWaterIntakeView: View {
    @Binding var navigationPath: NavigationPath
    @State private var waterIntake: Double = 4.0
    
    var body: some View {
        ZStack {
            // Light blue background
            Color(red: 0.9, green: 0.95, blue: 1.0)
                .ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Top section with back button and progress indicator
                HStack(spacing: 16) {
                    // Back button
                    Button(action: {
                        navigationPath.removeLast()
                    }) {
                        Image(systemName: "chevron.backward")
                            .font(.system(size: 18, weight: .medium))
                            .foregroundStyle(Color.gray)
                    }
                    
                    // Progress indicator (6/8 filled)
                    ProgressView(value: 6.0, total: 8.0)
                        .progressViewStyle(.linear)
                        .tint(Color(red: 0.0, green: 0.48, blue: 1.0))
                        .scaleEffect(x: 1, y: 0.8)
                }
                .padding(.horizontal, 20)
                .padding(.top, 20)
                
                Spacer()
                
                // Center section with content
                VStack(spacing: 24) {
                    // Small avatar at top
                    Image("quench-transparent-default")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 120, height: 120)
                    
                    // Text content
                    VStack(spacing: 12) {
                        // Main heading
                        Text("how much water do you drink daily?")
                            .font(.system(size: 28, weight: .bold, design: .default))
                            .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
                            .multilineTextAlignment(.center)
                        
                        // Subtitle
                        Text("you can tell the truth")
                            .font(.system(size: 17, weight: .regular, design: .default))
                            .foregroundStyle(Color(red: 0.43, green: 0.43, blue: 0.45))
                            .multilineTextAlignment(.center)
                            .lineLimit(nil)
                    }
                    .padding(.horizontal, 20)
                    
                    // Large number display
                    VStack(spacing: 16) {
                        Text(getDisplayText(for: waterIntake))
                            .font(.system(size: 48, weight: .bold, design: .default))
                            .foregroundStyle(Color(red: 0.0, green: 0.48, blue: 1.0))
                            .multilineTextAlignment(.center)
                        
                        // Slider section
                        VStack(spacing: 12) {
                            // Slider
                            Slider(value: $waterIntake, in: 0...12, step: 1)
                                .tint(Color(red: 0.0, green: 0.48, blue: 1.0))
                                .padding(.horizontal, 20)
                            
                            // Slider labels
                            HStack {
                                Text("0 cups")
                                    .font(.system(size: 15, weight: .medium, design: .default))
                                    .foregroundStyle(Color(red: 0.43, green: 0.43, blue: 0.45))
                                
                                Spacer()
                                
                                Text("12+ cups")
                                    .font(.system(size: 15, weight: .medium, design: .default))
                                    .foregroundStyle(Color(red: 0.43, green: 0.43, blue: 0.45))
                            }
                            .padding(.horizontal, 20)
                        }
                        
                        // Encouraging message
                        Text(getEncouragingMessage(for: waterIntake))
                            .font(.system(size: 16, weight: .medium, design: .default))
                            .foregroundStyle(getMessageColor(for: waterIntake))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 20)
                            .padding(.top, 8)
                    }
                }
                
                Spacer()
                
                // Bottom section with continue button
                VStack(spacing: 0) {
                    Button(action: {
                        navigationPath.append(OnboardingScreen.impactVisualization)
                    }) {
                        Text("continue")
                            .font(.system(size: 17, weight: .medium, design: .default))
                            .foregroundStyle(.white)
                            .frame(maxWidth: .infinity)
                            .frame(height: 50)
                            .background(Color(red: 0.0, green: 0.48, blue: 1.0))
                            .cornerRadius(12)
                    }
                    .padding(.horizontal, 20)
                    .padding(.bottom, 34)
                }
            }
        }
    }
    
    // Helper function to get display text for water intake
    private func getDisplayText(for intake: Double) -> String {
        let cups = Int(intake)
        if cups == 0 {
            return "0 cups"
        } else if cups == 1 {
            return "1 cup"
        } else if cups >= 12 {
            return "12+ cups"
        } else {
            return "\(cups) cups"
        }
    }
    
    // Helper function to get encouraging message based on intake
    private func getEncouragingMessage(for intake: Double) -> String {
        let cups = Int(intake)
        
        switch cups {
        case 0...1:
            return "let's work on building that habit together!"
        case 2...3:
            return "you're getting started - that's great!"
        case 4...5:
            return "not bad! there's room for improvement"
        case 6...7:
            return "you're doing pretty well!"
        case 8...9:
            return "excellent! you're staying well hydrated"
        case 10...11:
            return "amazing! you're a hydration champion"
        case 12...:
            return "wow! you're absolutely crushing it!"
        default:
            return "every drop counts!"
        }
    }
    
    // Helper function to get message color based on intake
    private func getMessageColor(for intake: Double) -> Color {
        let cups = Int(intake)
        
        switch cups {
        case 0...3:
            return Color(red: 0.43, green: 0.43, blue: 0.45) // Gray - encouraging
        case 4...7:
            return Color.orange // Orange - good progress
        case 8...:
            return Color(red: 0.0, green: 0.48, blue: 1.0) // Blue - excellent
        default:
            return Color(red: 0.43, green: 0.43, blue: 0.45)
        }
    }
}

#Preview {
    CurrentWaterIntakeView(navigationPath: .constant(NavigationPath()))
} 