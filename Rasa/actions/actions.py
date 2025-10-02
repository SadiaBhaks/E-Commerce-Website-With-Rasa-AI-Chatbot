
import requests
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

BASE_URL = "http://localhost:4000/api"  


class ActionShowItems(Action):
    def name(self) -> Text:
        return "action_show_items"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        try:
            response = requests.get(f"{BASE_URL}/items")
            response.raise_for_status()
            items = response.json()

            # Separate coffee and tea for better readability
            coffee_items = [item['name'] for item in items if 'coffee' in item['name'].lower() or 'latte' in item['name'].lower() or 'mocha' in item['name'].lower() or 'espresso' in item['name'].lower()]
            tea_items = [item['name'] for item in items if 'tea' in item['name'].lower()]

            message = ""
            if coffee_items:
                message += f"☕ Coffee items: {', '.join(coffee_items)}\n"
            if tea_items:
                message += f"🍵 Tea items: {', '.join(tea_items)}"

            dispatcher.utter_message(text=message.strip())
        except requests.exceptions.RequestException as e:
            dispatcher.utter_message(text=f"⚠️ Error fetching items: {e}")

        return []


#  Get details of a specific product
class ActionProductDetails(Action):
    def name(self) -> Text:
        return "action_product_details"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        product_name = tracker.get_slot("product")
        if not product_name:
            dispatcher.utter_message(text="Which product would you like details for?")
            return []

        try:
            response = requests.get(f"{BASE_URL}/items") 
            response.raise_for_status()
            items = response.json()

           
            item = next((i for i in items if i["name"].lower() == product_name.lower()), None)
            if item:
                dispatcher.utter_message(
                    text=(
                        f"{item['name']}: {item['description']}\n"
                        f"Price: ${item['price']}, Stock: {item['stock']}"
                    )
                )
            else:
                dispatcher.utter_message(
                    text=f"Sorry, I couldn't find a product named '{product_name}'."
                )

        except requests.exceptions.RequestException as e:
            dispatcher.utter_message(
                text=f"⚠️ Error fetching product details: {str(e)}"
            )
        return []


# Add a new item (for admin/testing)
class ActionAddItem(Action):
    def name(self) -> Text:
        return "action_add_item"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

       
        product_name = tracker.get_slot("product") or "Test Tea"
        payload = {
            "name": product_name,
            "description": "Special test tea",
            "price": 4.99,
            "stock": 50,
            "image_url": "https://source.unsplash.com/400x300/?tea"
        }

        try:
            response = requests.post(f"{BASE_URL}/items", json=payload)
            response.raise_for_status()
            item = response.json()
            dispatcher.utter_message(
                text=f"✅ Added new item: {item['name']} (id {item['id']})"
            )

        except requests.exceptions.RequestException as e:
            dispatcher.utter_message(
                text=f"⚠️ Failed to add item. Error: {str(e)}"
            )
        return []
