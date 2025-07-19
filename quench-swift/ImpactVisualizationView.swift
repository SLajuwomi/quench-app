import SwiftUI

struct ImpactVisualizationView: View {
    @Binding var navigationPath: NavigationPath
    // This would typically come from the previous screen's data
    @State private var dailyIntake: Double = 2.0
    
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
                    
                    // Progress indicator (7/8 filled)
                    ProgressView(value: 7.0, total: 8.0)
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
                    
                    // Main heading
                    Text("this affects your body...")
                        .font(.system(size: 28, weight: .bold, design: .default))
                        .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 20)
                    
                    // Impact breakdown cards
                    VStack(spacing: 16) {
                        // First row of cards
                        HStack(spacing: 12) {
                            ImpactCard(
                                title: "daily",
                                value: getDisplayText(for: dailyIntake),
                                isHighlighted: false
                            )
                            
                            ImpactCard(
                                title: "weekly",
                                value: getDisplayText(for: dailyIntake * 7),
                                isHighlighted: false
                            )
                        }
                        
                        // Second row of cards
                        HStack(spacing: 12) {
                            ImpactCard(
                                title: "monthly",
                                value: getDisplayText(for: dailyIntake * 30),
                                isHighlighted: false
                            )
                            
                            ImpactCard(
                                title: "recommended",
                                value: "8 cups daily",
                                isHighlighted: true
                            )
                        }
                    }
                    .padding(.horizontal, 20)
                    
                    // Health impact section
                    VStack(spacing: 12) {
                        Text("health impact")
                            .font(.system(size: 18, weight: .bold, design: .default))
                            .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
                            .multilineTextAlignment(.center)
                        
                        Text(getHealthImpactMessage(for: dailyIntake))
                            .font(.system(size: 16, weight: .medium, design: .default))
                            .foregroundStyle(getHealthImpactColor(for: dailyIntake))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 20)
                    }
                    .padding(.top, 8)
                }
                
                Spacer()
                
                // Bottom section with continue button
                VStack(spacing: 0) {
                    Button(action: {
                        navigationPath.append(OnboardingScreen.goalCalculation)
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
    
    // Helper function to get display text for cup count
    private func getDisplayText(for intake: Double) -> String {
        let cups = Int(intake)
        if cups == 1 {
            return "1 cup"
        } else {
            return "\(cups) cups"
        }
    }
    
    // Helper function to get health impact message
    private func getHealthImpactMessage(for intake: Double) -> String {
        let cups = Int(intake)
        
        switch cups {
        case 0...3:
            return "may cause fatigue, headaches"
        case 4...7:
            return "room for improvement"
        case 8...:
            return "great hydration habits!"
        default:
            return "room for improvement"
        }
    }
    
    // Helper function to get health impact color
    private func getHealthImpactColor(for intake: Double) -> Color {
        let cups = Int(intake)
        
        switch cups {
        case 0...3:
            return Color.red
        case 4...7:
            return Color.orange
        case 8...:
            return Color.green
        default:
            return Color.orange
        }
    }
}

struct ImpactCard: View {
    let title: String
    let value: String
    let isHighlighted: Bool
    
    var body: some View {
        VStack(spacing: 8) {
            // Title
            Text(title)
                .font(.system(size: 14, weight: .medium, design: .default))
                .foregroundStyle(Color(red: 0.43, green: 0.43, blue: 0.45))
                .multilineTextAlignment(.center)
            
            // Value
            Text(value)
                .font(.system(size: 18, weight: .bold, design: .default))
                .foregroundStyle(isHighlighted ? Color(red: 0.0, green: 0.48, blue: 1.0) : Color(red: 0.11, green: 0.11, blue: 0.12))
                .multilineTextAlignment(.center)
                .lineLimit(nil)
        }
        .frame(maxWidth: .infinity)
        .frame(height: 80)
        .padding(.horizontal, 12)
        .padding(.vertical, 16)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(isHighlighted ? Color(red: 0.0, green: 0.48, blue: 1.0).opacity(0.1) : Color.white.opacity(0.6))
                .stroke(isHighlighted ? Color(red: 0.0, green: 0.48, blue: 1.0) : Color.clear, lineWidth: 1)
        )
    }
}

#Preview {
    ImpactVisualizationView(navigationPath: .constant(NavigationPath()))
} 
