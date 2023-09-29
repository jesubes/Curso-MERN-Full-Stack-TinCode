import React, { useState, useEffect } from "react";
import { Newsletter } from "../../../../api/newsletter";
import { useAuth } from "../../../../hooks";
import { Loader } from "semantic-ui-react";
import { map, size } from "lodash";
import { EmailItem } from "../EmailItem";

const newsletterController = new Newsletter();

export const ListEmails = () => {
  const [emails, setEmails] = useState(null);

  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await newsletterController.getEmails(accessToken);
        setEmails(response.payload.docs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!emails) return <Loader active inline="centered" />;
  if (size(emails) === 0) return "No hay emails registrados";

  return (
    <div className="list-email">
      {map(emails, (email) => (
        <EmailItem key={email._id} email={email} />
      ))}

      <div>
        {/* paginacion */}
      </div>
    </div>
  );
};
