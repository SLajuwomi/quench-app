import SwiftUI

struct DidYouKnowView: View {
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
                    
                    // Progress indicator (5/8 filled)
                    ProgressView(value: 5.0, total: 8.0)
                        .progressViewStyle(.linear)
                        .tint(Color(red: 0.0, green: 0.48, blue: 1.0))
                        .scaleEffect(x: 1, y: 0.8)
                }
                .padding(.horizontal, 20)
                .padding(.top, 20)
                
                Spacer()
                
                // Center section with content
                VStack(spacing: 24) {
                    // Main heading
                    Text("did you know?")
                        .font(.system(size: 28, weight: .bold, design: .default))
                        .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
                        .multilineTextAlignment(.center)
                    
                    // Fact cards
                    VStack(spacing: 16) {
                        // First row of fact cards
                        HStack(spacing: 12) {
                            // Body water fact
                            FactCard(
                                icon: "💧",
                                text: "your body is 60% water"
                            )
                            
                            // Brain water fact
                            FactCard(
                                icon: "🧠",
                                text: "your brain is 75% water"
                            )
                        }
                        
                        // Second row of fact cards
                        HStack(spacing: 12) {
                            // Dehydration effects fact
                            FactCard(
                                icon: "😴",
                                text: "dehydration causes fatigue and headaches"
                            )
                            
                            // Hydration benefits fact
                            FactCard(
                                icon: "💪",
                                text: "proper hydration boosts energy and focus"
                            )
                        }
                    }
                    .padding(.horizontal, 20)
                    
                    // Bottom encouragement text
                    Text("we're here to help you stay hydrated")
                        .font(.system(size: 17, weight: .regular, design: .default))
                        .foregroundStyle(Color(red: 0.43, green: 0.43, blue: 0.45))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 20)
                }
                
                Spacer()
                
                // Bottom section with continue button
                VStack(spacing: 0) {
                    Button(action: {
                        navigationPath.append(OnboardingScreen.currentWaterIntake)
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

struct FactCard: View {
    let icon: String
    let text: String
    
    var body: some View {
        VStack(spacing: 8) {
            // Icon
            Text(icon)
                .font(.system(size: 24))
            
            // Fact text
            Text(text)
                .font(.system(size: 14, weight: .medium, design: .default))
                .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
                .multilineTextAlignment(.center)
                .lineLimit(nil)
        }
        .frame(maxWidth: .infinity)
        .frame(height: 100)
        .padding(.horizontal, 12)
        .padding(.vertical, 16)
        .background(Color.white.opacity(0.6))
        .cornerRadius(12)
    }
}

#Preview {
    DidYouKnowView(navigationPath: .constant(NavigationPath()))
} 