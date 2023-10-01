import React, { useState, useEffect } from "react";
import { Newsletter } from "../../../../api/newsletter";
import { useAuth } from "../../../../hooks";
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";
import { EmailItem } from "../EmailItem";
import './ListEmails.scss'


const newsletterController = new Newsletter();

export const ListEmails = () => {
  const [emails, setEmails] = useState(null);
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)

  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
      const response = await newsletterController.getEmails(accessToken, page);
        setEmails(response.payload.docs);
        setPagination({
          limit: response.payload.limit,
          page: response.payload.page,
          pages: response.payload.totalPages,
          total: response.total,
        })
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  const changePage = (_, data) => {
    setPage(data.activePage)
  }


  if (!emails) return <Loader active inline="centered" />;
  if (size(emails) === 0) return "No hay emails registrados";

  return (
    <div className="list-email">
      {map(emails, (email) => (
        <EmailItem key={email._id} email={email} />
      ))}

      <div className="list-emails__pagination">
        <Pagination 
          totalPages={pagination.pages} 
          defaultActivePage={pagination.page}
          ellipsisItem={false}
          firstItem={false}
          lastItem={false}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};
