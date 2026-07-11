import React, { useEffect, useState } from "react";
import { useFetchClients } from "../../Hooks/ClientsHooks/useFetchClients";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function ClientSearch() {
  const { clientsList } = useFetchClients();

  const [query, setQuery] = useState("");

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setQuery(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 0) {
        clientsList(query);
      } else {
        clientsList();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="input">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        className="search_client"
        placeholder="Buscar empresa..."
        type="text"
        value={query}
        onChange={handleQuery}
      />
    </div>
  );
}
