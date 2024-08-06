"use client";

import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { setSearchQuery } from "@/store/action/recipe-slice";
import { fetchSearchRecipe } from "@/store/action/recipe-slice";
import { useAppDispatch } from "@/store";

const Searchbar: React.FC = () => {
  const [error, setError] = useState("");
  const [queryText, setQueryText] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (queryText.trim().length > 0) {
      dispatch(fetchSearchRecipe({ queryText, nextPageLink: null }));
      dispatch(setSearchQuery(queryText));
      setQueryText("");
      router.push("/recipes/search");
    } else {
      setError("Please enter search term.");
    }
  };

  const handleChange = (event: any) => {
    setQueryText(event.target.value);
    if (event.target.value.length === 0) {
      setError("Please enter search term.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        id="query"
        name="query"
        onChange={handleChange}
        placeholder="Search recipe here ..."
        value={queryText}
      />
      <button type="submit" className="search-btn" aria-label="Search">
        <BsSearch className="text-white" size={16} />
      </button>
      {error && <span className="error-message">{error}</span>}
    </form>
  );
};

export default Searchbar;
