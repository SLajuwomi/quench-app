import SwiftUI

struct MeetQuenchView: View {
    @Binding var navigationPath: NavigationPath
    
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
                    
                    // Progress indicator (2/8 filled)
                    ProgressView(value: 2.0, total: 8.0)
                        .progressViewStyle(.linear)
                        .tint(Color(red: 0.0, green: 0.48, blue: 1.0))
                        .scaleEffect(x: 1, y: 0.8)
                }
                .padding(.horizontal, 20)
                .padding(.top, 20)
                
                Spacer()
                
                // Center section with avatar and text
                VStack(spacing: 24) {
                    // Avatar
                    Image("quench-transparent-default")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 120, height: 120)
                    
                    // Text content
                    VStack(spacing: 12) {
                        // Main heading
                        Text("meet quench")
                            .font(.system(size: 28, weight: .bold, design: .default))
                            .foregroundColor(Color(red: 0.11, green: 0.11, blue: 0.12))
                            .multilineTextAlignment(.center)
                        
                        // Subtitle
                        Text("your personal hydration buddy who will help you stay healthy and hydrated throughout the day")
                            .font(.system(size: 17, weight: .regular, design: .default))
                            .foregroundColor(Color(red: 0.43, green: 0.43, blue: 0.45))
                            .multilineTextAlignment(.center)
                            .lineLimit(nil)
                    }
                    .padding(.horizontal, 20)
                }
                
                Spacer()
                
                // Bottom section with continue button
                VStack(spacing: 0) {
                    Button(action: {
                        navigationPath.append(OnboardingScreen.avatarStates)
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
}

#Preview {
    MeetQuenchView(navigationPath: .constant(NavigationPath()))
} 