import SwiftUI

enum OnboardingScreen: String, CaseIterable {
    case welcome = "welcome"
    case meetQuench = "meetQuench"
    case avatarStates = "avatarStates"
    case reasonSelection = "reasonSelection"
    case didYouKnow = "didYouKnow"
    case currentWaterIntake = "currentWaterIntake"
    case impactVisualization = "impactVisualization"
    case goalCalculation = "goalCalculation"
}

struct OnboardingFlow: View {
    @State private var navigationPath = NavigationPath()
    
    var body: some View {
        NavigationStack(path: $navigationPath) {
            ContentView(navigationPath: $navigationPath)
                .navigationBarHidden(true)
                .navigationDestination(for: OnboardingScreen.self) { screen in
                    switch screen {
                    case .welcome:
                        ContentView(navigationPath: $navigationPath)
                            .navigationBarHidden(true)
                    case .meetQuench:
                        MeetQuenchView(navigationPath: $navigationPath)
                            .navigationBarHidden(true)
                    case .avatarStates:
                        AvatarStatesView(navigationPath: $navigationPath)
                            .navigationBarHidden(true)
                    case .reasonSelection:
                        ReasonSelectionView(navigationPath: $navigationPath)
                            .navigationBarHidden(true)
                    case .didYouKnow:
                        DidYouKnowView(navigationPath: $navigationPath)
                            .navigationBarHidden(true)
                    case .currentWaterIntake:
                        CurrentWaterIntakeView(navigationPath: $navigationPath)
                            .navigationBarHidden(true)
                    case .impactVisualization:
                        ImpactVisualizationView(navigationPath: $navigationPath)
                            .navigationBarHidden(true)
                    case .goalCalculation:
                        GoalCalculationView(navigationPath: $navigationPath)
                            .navigationBarHidden(true)
                    }
                }
        }
    }
}

#Preview {
    OnboardingFlow()
} 