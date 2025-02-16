import { StyleSheet, Text, View, useColorScheme, ScrollView } from "react-native";

const FAQs = () => {
  const colorScheme = useColorScheme(); 
  const isDarkMode = colorScheme === "dark"; 
  
  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.header, isDarkMode && styles.darkText]}>CabEZ FAQs</Text>
      
      {faqData.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <Text style={[styles.question, isDarkMode && styles.darkText]}>{faq.question}</Text>
          <Text style={[styles.answer, isDarkMode && styles.darkText]}>{faq.answer}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const faqData = [
  { question: "How do I book a ride for my child?", answer: "Once registered, your child’s recurring ride is automatically scheduled based on their school timings and route. The assigned CabEZ Pilot details will be shared on the 'Pilot Detail' section and they will pick your student and drop them off at the school." },
  { question: "How can I track my child’s ride?", answer: "You can track your child’s ride in real-time through the app front page. Notifications will also be sent for pick-up, drop-off, and any route deviations." },
  { question: "What safety measures does CabEZ follow?", answer: "CabEZ prioritizes safety with: Verified drivers, real-time GPS tracking, emergency panic buttons, geofencing alerts, and AI-powered driver assessment." },
  { question: "What is All-Women Fleet for Girl Children and how do I enroll?", answer: "CabEZ offers an exclusive all-women fleet for girl students, driven by a certified female driver. Submit a request through the Contact Us page in the app or email cabez.care@gmail.com." },
  { question: "Are the vehicles safe?", answer: "All vehicles are regularly maintained, cleaned daily, and equipped with water, snacks, and a first-aid kit." },
  { question: "What is the Decorum & Misbehavior Policy?", answer: "Any misbehavior will result in appropriate action, including warnings, suspension, or removal from the service." },
  { question: "What happens if a driver is unavailable?", answer: "An alternative verified driver will be assigned, and details will be shared with parents 16 hours prior to pickup." },
  { question: "How do I make payments for the service?", answer: "Payments can be made via UPI, cards, or net banking. Fees are due by the 5th, with late fees applying after that." },
  { question: "What should I do if my child misses the cab?", answer: "Contact support through the app for assistance. Alternative arrangements may be possible but not guaranteed." },
  { question: "Can I change my child’s pick-up/drop-off location?", answer: "Yes, requests can be made via the app, subject to feasibility and a 24-hour processing time." },
  { question: "How can I contact customer support?", answer: "Reach out via the Help & Support section in the app or email support@cabez.in." },
  { question: "What happens in case of a service disruption?", answer: "CabEZ will notify parents and provide alternative solutions in case of disruptions like breakdowns or driver unavailability." },
  { question: "Can I cancel my subscription?", answer: "Yes, cancellations can be requested via the app, but refunds follow the cancellation policy." },
  { question: "What happens if I miss a payment and my cab service is canceled?", answer: "Re-registration is required, but availability is not guaranteed since seats are reassigned quickly." },
  { question: "How do I update my personal details?", answer: "Update your profile and emergency contacts in the Account Settings section of the app." },
];

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  faqItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  answer: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  darkContainer: {
    backgroundColor: "#1E1E1E",
    borderColor: "#333",
  },
  darkText: {
    color: "#FFF",
  },
});

export default FAQs;
