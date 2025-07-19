import SwiftUI

struct ReasonSelectionView: View {
    @Binding var navigationPath: NavigationPath
    @State private var selectedReason: String? = nil
    
    let reasons = [
        "improve energy",
        "better skin",
        "reduce headaches",
        "better focus",
        "lose weight",
        "just curious"
    ]
    
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
                    
                    // Progress indicator (4/8 filled)
                    ProgressView(value: 4.0, total: 8.0)
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
                        Text("you're here for a reason")
                            .font(.system(size: 28, weight: .bold, design: .default))
                            .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
                            .multilineTextAlignment(.center)
                        
                        // Subtitle
                        Text("what is that reason?")
                            .font(.system(size: 17, weight: .regular, design: .default))
                            .foregroundStyle(Color(red: 0.43, green: 0.43, blue: 0.45))
                            .multilineTextAlignment(.center)
                            .lineLimit(nil)
                    }
                    .padding(.horizontal, 20)
                    
                    // Selection options
                    VStack(spacing: 12) {
                        ForEach(reasons, id: \.self) { reason in
                            ReasonOptionButton(
                                text: reason,
                                isSelected: selectedReason == reason,
                                action: {
                                    selectedReason = reason
                                }
                            )
                        }
                    }
                    .padding(.horizontal, 20)
                }
                
                Spacer()
                
                // Bottom section with continue button
                VStack(spacing: 0) {
                    Button(action: {
                        navigationPath.append(OnboardingScreen.didYouKnow)
                    }) {
                        Text("continue")
                            .font(.system(size: 17, weight: .medium, design: .default))
                            .foregroundStyle(.white)
                            .frame(maxWidth: .infinity)
                            .frame(height: 50)
                            .background(selectedReason != nil ? Color(red: 0.0, green: 0.48, blue: 1.0) : Color.gray)
                            .cornerRadius(12)
                    }
                    .disabled(selectedReason == nil)
                    .padding(.horizontal, 20)
                    .padding(.bottom, 34)
                }
            }
        }
    }
}

struct ReasonOptionButton: View {
    let text: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 16) {
                // Radio button circle
                ZStack {
                    Circle()
                        .stroke(isSelected ? Color(red: 0.0, green: 0.48, blue: 1.0) : Color.gray.opacity(0.3), lineWidth: 2)
                        .frame(width: 20, height: 20)
                    
                    if isSelected {
                        Circle()
                            .fill(Color(red: 0.0, green: 0.48, blue: 1.0))
                            .frame(width: 10, height: 10)
                    }
                }
                
                // Option text
                Text(text)
                    .font(.system(size: 16, weight: .medium, design: .default))
                    .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
                    .multilineTextAlignment(.leading)
                
                Spacer()
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 16)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(isSelected ? Color(red: 0.0, green: 0.48, blue: 1.0).opacity(0.1) : Color.white.opacity(0.6))
                    .stroke(isSelected ? Color(red: 0.0, green: 0.48, blue: 1.0) : Color.clear, lineWidth: 1)
            )
        }
        .buttonStyle(PlainButtonStyle())
    }
}

#Preview {
    ReasonSelectionView(navigationPath: .constant(NavigationPath()))
} 