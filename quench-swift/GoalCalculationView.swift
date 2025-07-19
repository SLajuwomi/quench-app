import SwiftUI

struct GoalCalculationView: View {
    @Binding var navigationPath: NavigationPath
    @State private var weight: String = ""
    @State private var activityLevel: String = ""
    @State private var age: String = ""
    
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
                    
                    // Progress indicator (8/8 filled - complete!)
                    ProgressView(value: 8.0, total: 8.0)
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
                        Text("let's set your daily goal")
                            .font(.system(size: 28, weight: .bold, design: .default))
                            .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
                            .multilineTextAlignment(.center)
                        
                        // Subtitle
                        Text("we'll calculate a personalized target")
                            .font(.system(size: 17, weight: .regular, design: .default))
                            .foregroundStyle(Color(red: 0.43, green: 0.43, blue: 0.45))
                            .multilineTextAlignment(.center)
                            .lineLimit(nil)
                    }
                    .padding(.horizontal, 20)
                    
                    // Input fields
                    VStack(spacing: 20) {
                        // Weight input
                        InputField(
                            title: "weight",
                            placeholder: "Enter your weight",
                            suffix: "lbs",
                            text: $weight
                        )
                        
                        // Activity level input
                        InputField(
                            title: "activity level",
                            placeholder: "Hours of exercise per day",
                            suffix: "hours per day",
                            text: $activityLevel
                        )
                        
                        // Age input
                        InputField(
                            title: "age",
                            placeholder: "Enter your age",
                            suffix: "years",
                            text: $age
                        )
                    }
                    .padding(.horizontal, 20)
                }
                
                Spacer()
                
                // Bottom section with get started button
                VStack(spacing: 0) {
                    Button(action: {
                        // Get started action - leads to main app
                    }) {
                        Text("get started")
                            .font(.system(size: 17, weight: .medium, design: .default))
                            .foregroundStyle(.white)
                            .frame(maxWidth: .infinity)
                            .frame(height: 50)
                            .background(allFieldsCompleted() ? Color(red: 0.0, green: 0.48, blue: 1.0) : Color.gray)
                            .cornerRadius(12)
                    }
                    .disabled(!allFieldsCompleted())
                    .padding(.horizontal, 20)
                    .padding(.bottom, 34)
                }
            }
        }
    }
    
    // Helper function to check if all fields are completed
    private func allFieldsCompleted() -> Bool {
        return !weight.isEmpty && !activityLevel.isEmpty && !age.isEmpty
    }
}

struct InputField: View {
    let title: String
    let placeholder: String
    let suffix: String
    @Binding var text: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            // Field title
            Text(title)
                .font(.system(size: 16, weight: .medium, design: .default))
                .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
            
            // Input field with suffix
            HStack(spacing: 12) {
                // Text field
                TextField(placeholder, text: $text)
                    .font(.system(size: 16, weight: .regular, design: .default))
                    .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
                    .textFieldStyle(PlainTextFieldStyle())
                    .keyboardType(title == "age" || title == "weight" ? .numberPad : .decimalPad)
                
                // Suffix label
                Text(suffix)
                    .font(.system(size: 14, weight: .medium, design: .default))
                    .foregroundStyle(Color(red: 0.43, green: 0.43, blue: 0.45))
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 16)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color.white.opacity(0.8))
                    .stroke(Color.gray.opacity(0.2), lineWidth: 1)
            )
        }
    }
}

#Preview {
    GoalCalculationView(navigationPath: .constant(NavigationPath()))
} 