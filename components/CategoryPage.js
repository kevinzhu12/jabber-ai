import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Markdown from "react-markdown";
import { Button } from "./ui/button";
import { useState } from "react";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";

const MyWrapper = ({ children }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 5 }}>
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
  );
};

const CategoryPage = ({ title, notes, newNotes, excitedNotes }) => {
  console.log(notes);
  const [hoveredClose, setHoveredClose] = useState(null);
  const [hoverCard, setHoverCard] = useState(null);
  const noteColors = [
    ["bg-rose-200", "bg-rose-400"],
    ["bg-sky-200", "bg-sky-400"],
    ["bg-violet-200", "bg-violet-400"],
    ["bg-pink-200", "bg-pink-400"],
    ["bg-emerald-200", "bg-emerald-400"],
  ];

  const deleteNote = (deleteKey) => {
    newNotes(notes.filter((_, key) => key !== deleteKey));
  };

  return (
    <div className="">
      <div className=" px-6 py-4 bg-slate-900 h-20 ">
        <p className="gradient-text text-5xl font-bold">{title}</p>
      </div>
      <div className="flex flex-col overflow-y-auto max-h-screen m-5">
        <MyWrapper>
          {notes.map((note, key) => {
            // Generate a random index for each note
            const randomIndex = Math.floor(Math.random() * noteColors.length);
            return (
              <Card
                key={key}
                className={`h-fit w-68 m-5 transition duration-300 ease-in-out ${
                  excitedNotes.includes(note)
                    ? "bg-custom-card-gradient less-intense-ping"
                    : noteColors[randomIndex][0]
                } ${
                  !excitedNotes.includes(note)
                    ? `hover:${noteColors[randomIndex][1]}`
                    : ""
                } focus:ring focus:ring-yellow-500 flex justify-center rounded-md`}
              >
                <CardContent>
                  <p className="p-2 markdown">
                    <Markdown>{note}</Markdown>
                  </p>
                </CardContent>
                {hoveredClose === key ? (
                  <IoIosCloseCircle
                    className="relative min-w-7 min-h-7 max-h-7 max-w-7 top-6 right-4 cursor-pointer"
                    onMouseEnter={() => setHoveredClose(key)}
                    onMouseLeave={() => setHoveredClose(null)}
                    onClick={() => deleteNote(key)}
                  />
                ) : (
                  <IoIosCloseCircleOutline
                    className="relative min-w-7 min-h-7 max-h-7 max-w-7  top-6 right-4 cursor-pointer"
                    onMouseEnter={() => setHoveredClose(key)}
                    onMouseLeave={() => setHoveredClose(null)}
                    onClick={() => deleteNote(key)}
                  />
                )}
              </Card>
            );
          })}
        </MyWrapper>
      </div>
    </div>
  );
};

export default CategoryPage;