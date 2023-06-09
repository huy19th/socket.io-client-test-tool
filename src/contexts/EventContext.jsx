import { createContext, useState } from "react";
import { beautifyStringIfValidJSON } from "../ultils";

export const EventContext = createContext({
    events: [],
    messages: {},
    EventSettings: class {
        static save() { };
        static add(event) { };
        static delete(index) { };
        static update(index, event) { };
    },
    MessageSettings: class {
        static save() { };
        static addMessage(eventName) { };
        static updateEventName(oldEventName, newEventName) { };
        static deleteEventMessages(eventName) { };
        static addArg(eventName, messageIndex) { };
        static deleteArg(eventName, messageIndex, index) { };
        static updateArg(eventName, messageIndex, index, event) { };
        static beautify(eventName, messageIndex) { };
        static deleteMessage(eventName, messageIndex) { };
    }
});

export function EventContextProvider({ children }) {

    const [events, setEvents] = useState(JSON.parse(localStorage.getItem("events")) || []);

    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages")) || {});

    class EventSettings {
        static save() {
            setEvents([...events]);
            localStorage.setItem("events", JSON.stringify(events));
        }
        static add(event) {
            events.push(event);
            this.save();
        }
        static delete(index) {
            MessageSettings.deleteEventMessages(events[index]);
            events.splice(index, 1);
            this.save();
        }
        static update(index, { target: { value } }) {
            MessageSettings.updateEventName(events[index], value);
            events[index] = value;
            this.save();
        }
    }

    class MessageSettings {
        static save() {
            setMessages({ ...messages });
            localStorage.setItem("messages", JSON.stringify(messages));
        }
        static addMessage(eventName) {
            messages[eventName] = messages[eventName] ? [...messages[eventName], [""]] : [[""]];
            this.save();
        }
        static updateEventName(oldEventName, newEventName) {
            messages[newEventName] = messages[oldEventName];
            delete messages[oldEventName];
            this.save();
        }
        static deleteEventMessages(eventName) {
            delete messages[eventName];
            this.save();
        }
        static addArg(eventName, messageIndex) {
            messages[eventName][messageIndex].push("");
            this.save();
        }
        static deleteArg(eventName, messageIndex, index) {
            messages[eventName][messageIndex].splice(index, 1);
            this.save();
        }
        static updateArg(eventName, messageIndex, { target: { value } }, index) {
            messages[eventName][messageIndex][index] = value;
            this.save();
        }
        static beautify(eventName, messageIndex) {
            let eventMessages = messages[eventName];
            let currentMessage = eventMessages[messageIndex];
            currentMessage = currentMessage.map(arg => beautifyStringIfValidJSON(arg));
            eventMessages.splice(messageIndex, 1, currentMessage);
            this.save();
        }
        static deleteMessage(eventName, messageIndex) {
            messages[eventName].splice(messageIndex, 1);
            this.save();
        }
    }

    return (
        <EventContext.Provider
            value={{
                events,
                messages,
                EventSettings,
                MessageSettings
            }}
        >
            {children}
        </EventContext.Provider>
    )
}