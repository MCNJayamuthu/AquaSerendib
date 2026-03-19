import React, { useEffect, useState } from "react";
import { Mail, Clock, Inbox } from "lucide-react";

interface Message {
  id: string;
  email: string;
  message: string;
  created_at: string;
}

const AdminSupportMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/support");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aqua-mid"></div>
      </div>
    );
  }

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-aqua-deep mb-2">
          Support Messages
        </h1>
        <p className="text-gray-600">
          View and manage customer support inquiries
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
          <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Messages Yet
          </h3>
          <p className="text-gray-500">
            Support messages will appear here when customers reach out
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-aqua-pale to-aqua-light/50">
                  <th className="p-5 text-left font-semibold text-aqua-darker">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                  </th>
                  <th className="p-5 text-left font-semibold text-aqua-darker">
                    Message
                  </th>
                  <th className="p-5 text-left font-semibold text-aqua-darker">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Date
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {messages.map((m, index) => (
                  <tr
                    key={m.id}
                    className={`
                      border-t border-gray-100 transition-colors
                      ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                      hover:bg-aqua-pale/30
                    `}
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-aqua-mid/20 rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5 text-aqua-deep" />
                        </div>
                        <span className="font-medium text-gray-700">
                          {m.email}
                        </span>
                      </div>
                    </td>

                    <td className="p-5">
                      <p className="text-gray-700 line-clamp-2">{m.message}</p>
                    </td>

                    <td className="p-5">
                      <span className="text-sm text-gray-500">
                        {new Date(m.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSupportMessages;
