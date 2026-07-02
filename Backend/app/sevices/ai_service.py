import random


def get_ai_reply(messages: list[dict]) -> str:
    last_message = messages[-1]["content"].lower()

    if "period" in last_message or "cycle" in last_message:
        replies = [
            "Your menstrual cycle typically lasts 21–35 days. Tracking regularly helps predict your next period accurately.",
            "Irregular cycles can be caused by stress, diet, or hormonal changes. If you're concerned, consult a healthcare provider.",
            "The average period lasts 3–7 days. Keep logging your flow levels to spot patterns.",
        ]
        return random.choice(replies)

    if "symptom" in last_message or "cramp" in last_message or "pain" in last_message:
        replies = [
            "Mild cramps are normal during periods. Staying warm, gentle exercise, and hydration can help.",
            "Over-the-counter pain relief like ibuprofen may help with period pain. Always follow the dosage instructions.",
            "If your pain is severe or disrupts daily life, please see a doctor.",
        ]
        return random.choice(replies)

    if "diet" in last_message or "food" in last_message or "eat" in last_message:
        replies = [
            "Eating iron-rich foods like spinach, beans, and lean meat can help during your period.",
            "Stay hydrated and consider foods rich in magnesium like nuts and dark chocolate.",
            "A balanced diet with plenty of fruits, vegetables, and whole grains supports overall menstrual health.",
        ]
        return random.choice(replies)

    return "I'm here to help with questions about menstrual health, cycle tracking, and wellness. Feel free to ask anything!"
