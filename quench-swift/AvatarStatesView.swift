import SwiftUI

struct AvatarStatesView: View {
    @Binding var navigationPath: NavigationPath
    @State private var hydrationLevel: Double = 0.0
    
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
                    
                    // Progress indicator (3/8 filled)
                    ProgressView(value: 3.0, total: 8.0)
                        .progressViewStyle(.linear)
                        .tint(Color(red: 0.0, green: 0.48, blue: 1.0))
                        .scaleEffect(x: 1, y: 0.8)
                }
                .padding(.horizontal, 20)
                .padding(.top, 20)
                
                Spacer()
                
                // Center section with avatar and text
                VStack(spacing: 24) {
                    // Text content
                    VStack(spacing: 12) {
                        // Main heading
                        Text("see how your buddy changes")
                            .font(.system(size: 28, weight: .bold, design: .default))
                            .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
                            .multilineTextAlignment(.center)
                        
                        // Subtitle
                        Text("your avatar reflects your hydration level")
                            .font(.system(size: 17, weight: .regular, design: .default))
                            .foregroundStyle(Color(red: 0.43, green: 0.43, blue: 0.45))
                            .multilineTextAlignment(.center)
                            .lineLimit(nil)
                    }
                    .padding(.horizontal, 20)
                    
                    // Avatar that changes based on slider
                    Image(getAvatarImageName(for: hydrationLevel))
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 120, height: 120)
                    
                    // Current state label
                    Text(getStateLabel(for: hydrationLevel))
                        .font(.system(size: 15, weight: .medium, design: .default))
                        .foregroundStyle(getStateColor(for: hydrationLevel))
                        .multilineTextAlignment(.center)
                    
                    // Slider section
                    VStack(spacing: 12) {
                        // Slider
                        Slider(value: $hydrationLevel, in: 0...1, step: 0.2)
                            .tint(Color(red: 0.0, green: 0.48, blue: 1.0))
                            .padding(.horizontal, 20)
                        
                        // Slider labels
                        HStack {
                            Text("fully hydrated")
                                .font(.system(size: 15, weight: .medium, design: .default))
                                .foregroundStyle(Color(red: 0.0, green: 0.48, blue: 1.0))
                            
                            Spacer()
                            
                            Text("dehydrated")
                                .font(.system(size: 15, weight: .medium, design: .default))
                                .foregroundStyle(Color.red)
                        }
                        .padding(.horizontal, 20)
                    }
                }
                
                Spacer()
                
                // Bottom section with continue button
                VStack(spacing: 0) {
                    Button(action: {
                        navigationPath.append(OnboardingScreen.reasonSelection)
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
    
    // Helper function to get avatar image name based on hydration level
    private func getAvatarImageName(for level: Double) -> String {
        switch level {
        case 0.0...0.1:
            return "quench-transparent-default"
        case 0.1...0.3:
            return "quench-avatar-down-10"
        case 0.3...0.5:
            return "quench-avatar-down-20"
        case 0.5...0.7:
            return "quench-avatar-down-40"
        case 0.7...0.9:
            return "quench-avatar-60-dehydrated"
        case 0.9...1.0:
            return "quench-dehydrsted-down-80"
        default:
            return "quench-transparent-default"
        }
    }
    
    // Helper function to get state label text
    private func getStateLabel(for level: Double) -> String {
        switch level {
        case 0.0...0.1:
            return "fully hydrated"
        case 0.1...0.3:
            return "slightly thirsty"
        case 0.3...0.5:
            return "getting thirsty"
        case 0.5...0.7:
            return "quite thirsty"
        case 0.7...0.9:
            return "very thirsty"
        case 0.9...1.0:
            return "severely dehydrated"
        default:
            return "fully hydrated"
        }
    }
    
    // Helper function to get state color
    private func getStateColor(for level: Double) -> Color {
        switch level {
        case 0.0...0.1:
            return Color(red: 0.0, green: 0.48, blue: 1.0)
        case 0.1...0.3:
            return Color(red: 0.0, green: 0.48, blue: 1.0)
        case 0.3...0.5:
            return Color.orange
        case 0.5...0.7:
            return Color.orange
        case 0.7...0.9:
            return Color.red
        case 0.9...1.0:
            return Color.red
        default:
            return Color(red: 0.0, green: 0.48, blue: 1.0)
        }
    }
}

#Preview {
    AvatarStatesView(navigationPath: .constant(NavigationPath()))
} 
